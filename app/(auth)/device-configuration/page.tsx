"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import useModelInfoStore from "@/src/stores/useModelInfo";
import {
  deleteJsonDataFromIDB,
  getJsonDataFromIDB,
} from "@/utils/idbModelUtil";
import { ModelConfigWithData } from "@/src/api/services/model/type";
import SideMenu from "./SideMenu";
import { Button, MenuItem, Select, Stack, TextField } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import useConfirmDialog from "@/src/hooks/useConfirmDialog";
import { useRouter } from "next/navigation";
import InputBox from "@/components/inputbox/InputBox";
import { PasswordTextField } from "./EditHiddenInput";
import { SwitchPrimary } from "@/components/switches";
import TimeHMA from "app/(auth)/model-info/TimeHMA";
import TimeSeHMAButton from "app/(auth)/model-info/TimeSeHMAButton";
import CheckboxEdit from "./CheckboxEdit";
import ModelInfoController from "./Controller";
import CheckboxComp from "app/(auth)/model-info/CheckboxComp";
import CheckboxEditButton from "app/(auth)/model-info/CheckboxEditButton";
import { convertModelConfigToProfile } from "@/src/utils/profileUtil";
import { fileDownload } from "@/utils/fileDownload";
import AssignMenus from "app/(auth)/model-info/AssignMenus";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import useSerial from "@/src/hooks/useSerial";
import { hexToBinaryStringGrouped } from "app/(auth)/device-configuration/utils/functions";
import { useTransformConfigDataWithModelInfo } from "@/src/hooks/useTransformConfigDataWithModelInfo";
import { AT_GET_JSON } from "@/src/hooks/useSerial/constant";
import Commands from "./Commands";
import FullLoading from "@/components/FullLoading";

const SIDE_BAR = "Side Bar";
const DELETE_MODEL = "Delete Model";
const DEVICE_STATUS = "Device Status";
const SHOW_HIDDEN_PARAMETERS = "Show Hidden Parameters";

const menuHeaderMap = {
  Network: ["NTW", "GSM"],
  System: ["IGN", "DPA", "PWR"],
  Report: ["RPT", "RMAP", "ASGNALT", "ASGNSTT", "DBDCFG", "RMC"],
  Tracking: ["PRO", "FTR"],
  "Input/Output(I/O)": ["INP", "OUT"],
  Geofence: ["GEOCONP", "CGF", "PLC", "CGF"],
  BLE: ["BLE", "BEG_BLE", "BLESEN"],
  Accessories: ["TAS", "SRL", "ECU", "WTE"],
  RF: ["RFC", "RFD"],
};

type SupportedLang = "en" | "es" | "pt";
type MultiLangText = {
  TEXT_EN: string;
  TEXT_ES: string;
  TEXT_PT: string;
};

export const getLocalizedText = (
  item: MultiLangText,
  lang: SupportedLang = "en"
): string => {
  const langMap: Record<SupportedLang, keyof MultiLangText> = {
    en: "TEXT_EN",
    es: "TEXT_ES",
    pt: "TEXT_PT",
  };

  return item[langMap[lang]] || item.TEXT_EN; // fallback to English
};

const ModelInfoPage = () => {
  const [tab, setTab] = useState<string>();
  const [isFullLoading, setIsFullLoading] = useState(false);
  const [showHiddenParameters, setShowHiddenParameters] = useState(false);
  const [allMenuContentList, setAllMenuContentList] = useState<
    ModelConfigWithData[]
  >([]);

  const { getCurrentImei } = useSerialConfigurationStore();
  const imei = getCurrentImei();

  // data
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const { formData, getEditDataForPage } = useTransformConfigDataWithModelInfo({
    data: portList.find(({ port }) => port.imei === imei)?.packageToJson
      .synctrak,
    blacklist: ["info"],
  });

  console.log(formData);
  // "Circular Geofence", "Polygon Geofence"
  const [sideBarList, setSideBarList] = useState<
    {
      no: number;
      textEn: string;
      textEs: string;
      textPt: string;
      index: number;
    }[]
  >([]);
  const { getModelName, getFwVer } = useModelInfoStore();
  const modelName = useMemo(() => getModelName(), [getModelName]);
  const fwVer = useMemo(() => getFwVer(), [getFwVer]);

  const t = useTranslations();
  const router = useRouter();

  const { toggle, renderConfirmModal } = useConfirmDialog({
    onYes: () => {
      deleteJsonDataFromIDB(modelName);
      router.push("/model");
    },
    description: t(
      "popup.configuration.side_bar.are_you_sure_you_want_to_delete_this_model_from_loaded_model_list?"
    ),
  });

  const handleExportProfile = () => {
    const profile = convertModelConfigToProfile(
      allMenuContentList,
      modelName,
      fwVer
    );
    const filename = `${modelName}_SB_${fwVer}.profile`;
    const blob = new Blob([profile], { type: "text/plain" });
    fileDownload(blob, filename);
  };

  const handleTabChange = async (tab: string) => {
    switch (tab) {
      case DELETE_MODEL:
        toggle();
        break;
      case SHOW_HIDDEN_PARAMETERS:
        return;
      default:
        setTab(tab);
        // 탭 변경 시 JSON 패킷 새로고침
        const currentPort = portList.find(({ port }) => port.imei === imei);
        if (currentPort) {
          currentPort.port.grpNo = currentPort.jsonPackageCount;
          currentPort.port.isjsonpackagefetching = true;
          currentPort.port.onjsonpacketcountup = (count) => {
            // 패킷 카운트 처리가 필요한 경우 여기에 추가
          };

          const DELAY_MS = 100;

          const commands = Array.from(
            { length: currentPort.jsonPackageCount },
            (_, i) => `${AT_GET_JSON}${i + 1}`
          );
          setIsFullLoading(true);
          for (const command of commands) {
            await new Promise((resolve) => setTimeout(resolve, DELAY_MS)); // 100ms 지연

            await write({
              data: command,
              port: currentPort.port,
              writer: currentPort.writer,
            });
          }
          setIsFullLoading(false);
        }
    }
  };

  useEffect(() => {
    const fetchJsonData = async () => {
      const jsonData =
        ((await getJsonDataFromIDB(modelName)) as ModelConfigWithData[]) || [];

      const menuSectionList = (jsonData || [])
        .filter((item) => item.Depth2 === SIDE_BAR)
        .map((item, index) => {
          return {
            no: item.no,
            textEn: item.TEXT_EN,
            textEs: item.TEXT_ES,
            textPt: item.TEXT_PT,
            index,
          };
        });

      const menuContentList = jsonData.filter(
        (item) => item.Depth2 !== SIDE_BAR
      );

      if (menuSectionList.length > 0) {
        setSideBarList(menuSectionList);
        setAllMenuContentList(menuContentList);
        setTab(menuSectionList[0].textEn);
      }
    };
    fetchJsonData();
  }, [modelName]);

  return (
    <div className="pageWrap">
      {isFullLoading && <FullLoading />}
      <SideMenu
        sideMenuItems={sideBarList}
        activeTab={tab}
        onTabChange={handleTabChange}
        showHiddenParameters={showHiddenParameters}
        setShowHiddenParameters={setShowHiddenParameters}
      />
      <ContentByTab
        tab={tab}
        modelName={modelName}
        fwVer={fwVer}
        showHiddenParameters={showHiddenParameters}
        allMenuContentList={allMenuContentList}
        onExportProfile={handleExportProfile}
        formData={formData}
        onUpdateAllMenuContent={(updatedContent) => {
          setAllMenuContentList(updatedContent);
        }}
        getEditDataForPage={getEditDataForPage}
      />
      {renderConfirmModal()}
    </div>
  );
};

export default ModelInfoPage;

const ContentByTab = ({
  tab,
  modelName,
  fwVer,
  showHiddenParameters,
  allMenuContentList,
  onExportProfile,
  formData,
  onUpdateAllMenuContent,
  getEditDataForPage,
}: {
  tab: string;
  modelName: string;
  fwVer: string;
  showHiddenParameters: boolean;
  allMenuContentList: ModelConfigWithData[];
  onExportProfile: () => void;
  formData: any[];
  onUpdateAllMenuContent: (content: ModelConfigWithData[]) => void;
  getEditDataForPage: (updatedMenuList: ModelConfigWithData[]) => string[];
}) => {
  const t = useTranslations();
  const {
    func: { write },
  } = useSerial();
  const { getCurrentImei } = useSerialConfigurationStore();
  const imei = getCurrentImei();
  const {
    state: { portList },
  } = useSerial();

  const [menuContentList, setMenuContentList] = useState<ModelConfigWithData[]>(
    []
  );

  const [errorList, setErrorList] = useState<Record<number, string>>({});

  const { lang } = useLangStore();

  const handleClearError = (no: number) => {
    setErrorList((prev) => {
      const newErrorList = { ...prev };
      delete newErrorList[no];
      return newErrorList;
    });
  };

  const handleSendClick = async (depth3?: string) => {
    setErrorList({});

    console.log("binaryStringGroupedToHextest ::::");

    // 현재 탭에 맞는 데이터를 가져옴
    let dataToSend = [];

    if (menuContentList.length === 0) {
      // 현재 탭에 맞는 데이터를 다시 필터링
      if (tab === "Device Status") {
        dataToSend = allMenuContentList.filter(
          (content) => content.Depth2 === tab
        );
      } else {
        // 다른 탭들의 경우
        const currentTabHeaders =
          menuHeaderMap[tab as keyof typeof menuHeaderMap] || [];
        const relevantFormData = formData.filter(
          (item) => item.info?.hdr && currentTabHeaders.includes(item.info.hdr)
        );

        const validJsonIds = new Set();
        relevantFormData.forEach((data) => {
          if (data.fields) {
            data.fields.forEach((field) => {
              if (field.ID !== undefined) {
                const fullId = `${data.info?.tab_id}${String(field.ID).padStart(
                  2,
                  "0"
                )}`;
                validJsonIds.add(fullId);
              }
            });
          }
        });

        dataToSend = allMenuContentList.filter((content) => {
          const depth2Matches = content.Depth2 === tab;
          if (content.JSON_ID) {
            return depth2Matches && validJsonIds.has(content.JSON_ID);
          }
          return depth2Matches;
        });
      }
    } else {
      // menuContentList가 비어있지 않은 경우
      if (depth3) {
        // depth3가 hdr인 경우, 해당 hdr에 속한 항목만 필터링
        // formData에서 해당 hdr에 속한 항목 찾기
        const relevantFormData = formData.filter(
          (item) => item.info?.hdr === depth3
        );

        // 해당 hdr에 속한 JSON_ID 목록 생성
        const validJsonIds = new Set();
        relevantFormData.forEach((data) => {
          if (data.fields) {
            data.fields.forEach((field) => {
              if (field.ID !== undefined) {
                const fullId = `${data.info?.tab_id}${String(field.ID).padStart(
                  2,
                  "0"
                )}`;
                validJsonIds.add(fullId);
              }
            });
          }
        });

        // 해당 hdr에 속한 항목만 필터링
        dataToSend = menuContentList.filter(
          (item) => item.JSON_ID && validJsonIds.has(item.JSON_ID)
        );
      } else {
        // depth3가 없는 경우 모든 항목 사용
        dataToSend = menuContentList;
      }
    }

    // 데이터가 여전히 비어있는 경우
    if (dataToSend.length === 0) {
      return;
    }

    // 필수 필드 검증
    const requiredList = dataToSend.filter((item) => item.required === "true");

    const errorNoList = requiredList
      .filter((item) => !item.value && item.UI_INPUT_TYPE !== "checkbox")
      .map((item) => {
        return {
          no: item.no,
          message: t("configuration.please_fill_out_this_field"),
        };
      });

    // 에러가 있을 경우 에러 표기
    if (errorNoList.length !== 0) {
      setErrorList(
        errorNoList.reduce((acc, cur) => {
          return { ...acc, [cur.no]: cur.message };
        }, {} as Record<string, string>)
      );

      setTimeout(() => {
        const errorElement = document.querySelector(
          `[data-error-no='${errorNoList[0].no}']`
        );

        if (errorElement) {
          const rect = errorElement.getBoundingClientRect();
          const offset = window.scrollY + rect.top - 200;

          window.scrollTo({
            top: offset,
            behavior: "smooth",
          });
        }
      }, 10);

      return;
    }

    // AT^PRG 형식으로 데이터 전송
    const currentPort = portList.find(({ port }) => port.imei === imei);

    if (!currentPort) {
      return;
    }

    try {
      // 데이터를 tab_id 기준으로 그룹화
      const groupedByTabId = dataToSend.reduce((acc, item) => {
        if (!item.JSON_ID) return acc;

        const tabId = item.JSON_ID.slice(0, 2);
        if (!acc[tabId]) {
          acc[tabId] = [];
        }
        acc[tabId].push(item);
        return acc;
      }, {} as Record<string, ModelConfigWithData[]>);

      // 각 tab_id 그룹에 대해 처리
      for (const [tabId, items] of Object.entries(groupedByTabId)) {
        // param_id#value 형식의 문자열 배열 생성
        const paramStrings = (items as ModelConfigWithData[]).map((item) => {
          const paramId = item.JSON_ID?.slice(2);
          const value = item.value !== undefined ? item.value : "";
          return `${paramId}#${value}`;
        });

        // 20개씩 나누기
        const chunks = [];
        for (let i = 0; i < paramStrings.length; i += 20) {
          chunks.push(paramStrings.slice(i, i + 20));
        }

        // 각 청크를 AT^PRG 형식으로 전송
        for (const chunk of chunks) {
          const command = `AT^PRG;${imei};${tabId};${chunk.join(";")}`;
          console.log("command :::", command);

          // 아래 로직으로 분리 필요시 주석 해제
          // await write({
          //   data: command,
          //   port: currentPort.port,
          //   writer: currentPort.writer,
          // });
        }
      }

      // 전송 성공 후 menuContentList와 allMenuContentList 업데이트
      const updatedMenuContentList = menuContentList.map((item) => {
        const sentItem = dataToSend.find((sent) => sent.no === item.no);
        if (sentItem) {
          return { ...item, value: sentItem.value };
        }
        return item;
      });

      const resultCommands = getEditDataForPage(updatedMenuContentList);

      for (const chunk of resultCommands) {
        const command = `AT^PRG;${imei};${chunk}`;
        console.log("command :::", command);

        await write({
          data: command,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      }

      setMenuContentList(updatedMenuContentList);

      // allMenuContentList 업데이트
      const updatedAllMenuContentList = allMenuContentList.map((item) => {
        const sentItem = dataToSend.find((sent) => sent.no === item.no);
        if (sentItem) {
          return { ...item, value: sentItem.value };
        }
        return item;
      });
      console.log(updatedAllMenuContentList, "updatedAllMenuContentList");
      // 부모 컴포넌트의 allMenuContentList 업데이트
      onUpdateAllMenuContent(updatedAllMenuContentList);
    } catch (error) {
      // 에러 발생 시 조용히 처리
    }
  };

  const renderErrorMessage = (item: ModelConfigWithData) => {
    const message = errorList[item.no];
    const hasError = !!message;

    if (!hasError) {
      return null;
    }

    return (
      <p
        key={message}
        data-error-no={item.no}
        style={{ color: "var(--error)", paddingTop: 4 }}
      >
        {message}
      </p>
    );
  };

  useEffect(() => {
    if (tab && formData) {
      if (tab === "Device Status") {
        // Device Status 탭은 JSON_ID 체크 없이 Depth2만 확인
        const filteredContent = allMenuContentList.filter(
          (content) => content.Depth2 === tab
        );
        setMenuContentList(filteredContent);
      } else {
        // 다른 탭들은 기존 로직 유지
        const currentTabHeaders =
          menuHeaderMap[tab as keyof typeof menuHeaderMap] || [];

        const relevantFormData = formData.filter(
          (item) => item.info?.hdr && currentTabHeaders.includes(item.info.hdr)
        );
        // 모든 필드를 포함하도록 수정
        const validJsonIds = new Set();

        // formData에서 모든 필드의 ID를 수집
        relevantFormData.forEach((data) => {
          if (data.fields) {
            data.fields.forEach((field) => {
              if (field.ID !== undefined) {
                const fullId = `${data.info?.tab_id}${String(field.ID).padStart(
                  2,
                  "0"
                )}`;
                validJsonIds.add(fullId);
              }
            });
          }
        });

        // Depth2가 현재 탭과 일치하는 항목만 필터링
        const filteredContent = allMenuContentList
          .filter((content) => {
            // Depth2가 현재 탭과 일치하는지 확인
            const depth2Matches = content.Depth2 === tab;

            // JSON_ID가 있는 경우에만 유효성 검사
            if (content.JSON_ID) {
              const isValid = validJsonIds.has(content.JSON_ID);
              return depth2Matches && isValid;
            }

            // JSON_ID가 없는 경우 Depth2만 확인
            return depth2Matches;
          })
          .map((content) => {
            // content의 JSON_ID에 해당하는 value를 찾아서 업데이트
            if (content.JSON_ID) {
              // relevantFormData에서 해당하는 필드 찾기
              for (const data of relevantFormData) {
                if (data.fields) {
                  const matchingField = data.fields.find((field) => {
                    const fullId = `${data.info?.tab_id}${String(
                      field.ID
                    ).padStart(2, "0")}`;
                    return fullId === content.JSON_ID;
                  });

                  if (matchingField) {
                    const value =
                      matchingField.type === "combo"
                        ? matchingField.options.find(
                            ({ value }) => value === matchingField.value
                          )?.realValue
                        : matchingField.value;

                    // 10 이하의 숫자는 2자리 형식으로 변환 (01, 02, 03...)
                    const formattedValue =
                      !isNaN(Number(value)) && Number(value) <= 10
                        ? String(value).padStart(2, "0")
                        : value;

                    if (content.UI_INPUT_TYPE === "checkbox") {
                      console.log("content :::", content);
                      return {
                        ...content,
                        value: hexToBinaryStringGrouped(formattedValue),
                      };
                    }

                    return {
                      ...content,
                      value: formattedValue,
                    };
                  }
                }
              }
            }
            return content;
          });

        console.log("filteredContent :::", filteredContent);

        setMenuContentList(filteredContent);
      }
    }
  }, [tab]);

  // Group menuContentList by hdr
  const groupedMenuContent = useMemo(() => {
    if (!menuContentList.length) return [];

    // Create a map to store items grouped by hdr
    const groupedMap = new Map<string, ModelConfigWithData[]>();

    // Group items by hdr
    menuContentList.forEach((item) => {
      // Find the corresponding formData item to get the hdr
      const formDataItem = formData.find((data) =>
        data.fields.some(
          (field) =>
            `${data.info?.tab_id}${String(field.ID).padStart(2, "0")}` ===
            item.JSON_ID
        )
      );

      const hdr = formDataItem?.info?.hdr;

      if (!groupedMap.has(hdr)) {
        groupedMap.set(hdr, []);
      }

      groupedMap.get(hdr)?.push(item);
    });

    // Convert map to array of groups and filter out "Other"
    const result = Array.from(groupedMap.entries())
      .filter(([hdr]) => !!hdr)
      .map(([hdr, items]) => ({
        hdr,
        items,
      }));

    return result;
  }, [menuContentList, formData]);

  return (
    <>
      <article style={{ overflow: "hidden" }} className="contentWrap">
        <Stack>
          <ModelInfoController
            modelName={modelName}
            fwVer={fwVer}
            onExportProfile={onExportProfile}
          />
          <Stack
            flexWrap="wrap"
            direction="row"
            gap={tab == DEVICE_STATUS ? "0 40px" : "40px"}
          >
            {tab === "Device Status" ? (
              // Device Status 탭은 그룹핑 없이 직접 렌더링
              <Stack width="100%" gap="24px">
                <Stack flexWrap="wrap" direction="row" gap={"0 40px"}>
                  {menuContentList.map((item, idx) => {
                    const isDeviceStatus = tab == DEVICE_STATUS;
                    const isButton = item.UI_INPUT_TYPE === "button";
                    const isDropdown = item.UI_INPUT_TYPE === "dropdown";
                    const isDropdownButton =
                      item.UI_INPUT_TYPE === "dropdown_button";
                    const isEditHidden = item.UI_INPUT_TYPE === "edit_hidden";
                    const isInput =
                      item.UI_INPUT_TYPE === "edit" ||
                      item.UI_INPUT_TYPE === "edit_min" ||
                      item.UI_INPUT_TYPE === "edit_max";

                    if (isButton) {
                      return (
                        <Stack
                          direction="row"
                          alignItems="center"
                          gap="8px"
                          height="56px"
                          width="calc(50% - 20px)"
                          borderBottom="1px solid var(--grey3)"
                        >
                          <div className="list-title">
                            {getLocalizedText(item, lang)}
                          </div>
                          <div>
                            <Button
                              variant="outlined"
                              color="secondary"
                              sx={{ height: 30 }}
                            >
                              Send
                            </Button>
                          </div>
                        </Stack>
                      );
                    }
                    if (isDropdown) {
                      return (
                        <Stack
                          direction={isDeviceStatus ? "row" : "column"}
                          alignItems={isDeviceStatus ? "center" : "flex-start"}
                          gap={isDeviceStatus ? "8px" : "12px"}
                          height={isDeviceStatus ? "56px" : undefined}
                          width="calc(50% - 20px)"
                          borderBottom={
                            isDeviceStatus
                              ? "1px solid var(--grey3)"
                              : undefined
                          }
                        >
                          <div className="list-title">
                            <Stack
                              direction="row"
                              alignItems={"center"}
                              gap={"8px"}
                            >
                              {getLocalizedText(item, lang)}
                              {item.required === "true" && <i>*</i>}
                              {item.TEXT_EN_INFO && (
                                <InputBox.Info
                                  tooltipText={
                                    <span style={{ whiteSpace: "pre-wrap" }}>
                                      {lang === "en"
                                        ? item.TEXT_EN_INFO
                                        : lang === "es"
                                        ? item.TEXT_ES_INFO
                                        : item.TEXT_PT_INFO}
                                    </span>
                                  }
                                />
                              )}
                              {item.JSON_ID && (
                                <InputBox.Number>
                                  {item.JSON_ID}
                                </InputBox.Number>
                              )}
                            </Stack>
                          </div>
                          <Stack
                            direction="row"
                            gap="16px"
                            alignItems="center"
                            width={"100%"}
                          >
                            <div style={{ width: "100%" }}>
                              <Stack direction="row" gap="8px">
                                <Select
                                  value={item.value}
                                  onChange={(e) => {
                                    handleClearError(item.no);

                                    setMenuContentList(
                                      menuContentList.map((menuContent) => {
                                        if (item.no === menuContent.no) {
                                          return {
                                            ...menuContent,
                                            value: e.target.value,
                                          };
                                        }
                                        return menuContent;
                                      })
                                    );
                                  }}
                                  sx={{
                                    width:
                                      tab === "Device Status" ? 144 : "100%",
                                  }}
                                >
                                  {(lang === "en"
                                    ? item.TEXT_EN_ITEM_CONTENT
                                    : lang === "es"
                                    ? item.TEXT_ES_ITEM_CONTENT
                                    : item.TEXT_PT_ITEM_CONTENT
                                  )
                                    ?.split(", ")
                                    .map((itemContent, index) => {
                                      return (
                                        <MenuItem
                                          value={
                                            item.DEFAULT_VAL_INDEX?.split(", ")[
                                              index
                                            ]
                                          }
                                        >
                                          {itemContent}
                                        </MenuItem>
                                      );
                                    })}
                                </Select>
                                {isDropdownButton && (
                                  <Button color="secondary" variant="contained">
                                    Send
                                  </Button>
                                )}
                              </Stack>

                              {renderErrorMessage(item)}
                            </div>
                          </Stack>
                        </Stack>
                      );
                    }
                    if (isInput || isEditHidden) {
                      return (
                        <InputBox style={{ width: "calc(50% - 20px)" }}>
                          <InputBox.Head>
                            <InputBox.Title>
                              {getLocalizedText(item, lang)}
                            </InputBox.Title>
                            {item.TEXT_EN_INFO && (
                              <InputBox.Info
                                tooltipText={
                                  <span style={{ whiteSpace: "pre-wrap" }}>
                                    {lang === "en"
                                      ? item.TEXT_EN_INFO
                                      : lang === "es"
                                      ? item.TEXT_ES_INFO
                                      : item.TEXT_PT_INFO}
                                  </span>
                                }
                              />
                            )}
                            {item.JSON_ID && (
                              <InputBox.Number>{item.JSON_ID}</InputBox.Number>
                            )}
                          </InputBox.Head>
                          <InputBox.Body>
                            {isEditHidden ? (
                              <PasswordTextField
                                value={item.value}
                                onChange={(newValue) => {
                                  handleClearError(item.no);

                                  setMenuContentList(
                                    menuContentList.map((menuContent) => {
                                      if (item.no === menuContent.no) {
                                        return {
                                          ...menuContent,
                                          value: newValue,
                                        };
                                      }
                                      return menuContent;
                                    })
                                  );
                                }}
                              />
                            ) : (
                              <>
                                <Stack direction="row" gap="8px">
                                  <TextField
                                    fullWidth
                                    type={
                                      !!item.VALUE_MIN && !!item.VALUE_MIN
                                        ? "number"
                                        : isEditHidden
                                        ? "password"
                                        : "text"
                                    }
                                    inputProps={
                                      !!item.VALUE_MIN && !!item.VALUE_MIN
                                        ? {
                                            min: item.VALUE_MIN || undefined,
                                            max: item.VALUE_MAX || undefined,
                                          }
                                        : undefined
                                    }
                                    value={item.value}
                                    onChange={(e) => {
                                      handleClearError(item.no);

                                      let newValue = e.target.value;

                                      // 숫자 타입일 경우 범위 검증
                                      if (
                                        item.VALUE_MIN !== undefined &&
                                        item.VALUE_MAX !== undefined
                                      ) {
                                        const numValue = Number(newValue);
                                        if (numValue > Number(item.VALUE_MAX)) {
                                          newValue = String(item.VALUE_MAX);
                                        } else if (
                                          numValue < Number(item.VALUE_MIN)
                                        ) {
                                          newValue = String(item.VALUE_MIN);
                                        }
                                      }

                                      setMenuContentList(
                                        menuContentList.map((menuContent) => {
                                          if (item.no === menuContent.no) {
                                            return {
                                              ...menuContent,
                                              value: newValue,
                                            };
                                          }
                                          return menuContent;
                                        })
                                      );
                                    }}
                                  />
                                </Stack>
                              </>
                            )}
                          </InputBox.Body>
                          {renderErrorMessage(item)}
                        </InputBox>
                      );
                    }

                    return (
                      <Stack
                        direction={isDeviceStatus ? "row" : "column"}
                        alignItems={isDeviceStatus ? "center" : "flex-start"}
                        gap={isDeviceStatus ? "8px" : "12px"}
                        height={isDeviceStatus ? "56px" : undefined}
                        width="calc(50% - 20px)"
                        borderBottom={
                          isDeviceStatus ? "1px solid var(--grey3)" : undefined
                        }
                      >
                        <div className="list-title">
                          <Stack
                            direction="row"
                            alignItems={"center"}
                            gap={"8px"}
                          >
                            {getLocalizedText(item, lang)}
                            {item.required === "true" && <i>*</i>}
                            {item.TEXT_EN_INFO && (
                              <InputBox.Info
                                tooltipText={
                                  <span style={{ whiteSpace: "pre-wrap" }}>
                                    {lang === "en"
                                      ? item.TEXT_EN_INFO
                                      : lang === "es"
                                      ? item.TEXT_ES_INFO
                                      : item.TEXT_PT_INFO}
                                  </span>
                                }
                              />
                            )}
                            {item.JSON_ID && (
                              <InputBox.Number>{item.JSON_ID}</InputBox.Number>
                            )}
                            {typeof item.ONOFF_TOGGLE !== "undefined" && (
                              <div style={{ marginLeft: "auto" }}>
                                <SwitchPrimary
                                  checked={item.ONOFF_TOGGLE === "true"}
                                  onChange={(e) => {
                                    handleClearError(item.no);
                                    const isOn = e.target.checked;

                                    setMenuContentList(
                                      menuContentList.map((menuContent) => {
                                        if (item.no === menuContent.no) {
                                          return {
                                            ...menuContent,
                                            ONOFF_TOGGLE: String(isOn),
                                            value: item?.value,
                                          };
                                        }
                                        return menuContent;
                                      })
                                    );
                                  }}
                                />
                              </div>
                            )}
                          </Stack>
                        </div>
                        <div>{item.value || "-"}</div>
                      </Stack>
                    );
                  })}
                </Stack>
              </Stack>
            ) : tab === "Commands" ? (
              <Commands data={formData} imei={imei} />
            ) : (
              // Device Status가 아닌 탭은 그룹핑하여 렌더링
              groupedMenuContent.map((group, groupIndex) => (
                <Stack key={group.hdr} width="100%" gap="24px">
                  <div
                    className="pageTitle"
                    style={{
                      width: "100%",
                      paddingTop: groupIndex === 0 ? 0 : 48,
                      marginBottom: tab === "Device Status" ? 48 : 0,
                    }}
                  >
                    {group.hdr}
                    {tab !== "Device Status" && (
                      <Button
                        color="secondary"
                        variant="contained"
                        onClick={() => handleSendClick(group.hdr)}
                      >
                        Send
                      </Button>
                    )}
                  </div>
                  <Stack
                    flexWrap="wrap"
                    direction="row"
                    gap={tab == DEVICE_STATUS ? "0 40px" : "40px"}
                  >
                    {group.items.map((item, idx) => {
                      const isDeviceStatus = tab == DEVICE_STATUS;
                      const isButton = item.UI_INPUT_TYPE === "button";
                      const isDropdown = item.UI_INPUT_TYPE === "dropdown";
                      const isDropdownButton =
                        item.UI_INPUT_TYPE === "dropdown_button";
                      const isEditHidden = item.UI_INPUT_TYPE === "edit_hidden";
                      const isInput =
                        item.UI_INPUT_TYPE === "edit" ||
                        item.UI_INPUT_TYPE === "edit_min" ||
                        item.UI_INPUT_TYPE === "edit_max";
                      const isCheckbox = item.UI_INPUT_TYPE === "checkbox";
                      const isHiddenParameter = item["hidden-param"] === "true";
                      const isSwitch =
                        item.UI_INPUT_TYPE === undefined &&
                        item.ONOFF_TOGGLE === "true";
                      const isTimeHMA =
                        item.UI_INPUT_TYPE === "time_HMA" ||
                        item.UI_INPUT_TYPE === "time_se_HMA";
                      const isTimeSeHMAButton =
                        item.UI_INPUT_TYPE === "time_se_HM_button";
                      const isCheckboxEdit =
                        item.UI_INPUT_TYPE === "checkbox_edit";
                      const isEditButton = item.UI_INPUT_TYPE === "edit_button";
                      const isCheckboxEditButton =
                        item.UI_INPUT_TYPE === "checkbox_edit_button";
                      const isAssignHeaders =
                        item.Depth3 === "Section1" &&
                        item.TEXT_EN.replaceAll(" ", "").toLowerCase() ===
                          "assignheader";
                      const isAssignHeaderItem =
                        item.Depth3 === "Assign Header-Small" ||
                        item.Depth3 === "Assign Header-Medium" ||
                        item.Depth3 === "Assign Header-Large";

                      if (isHiddenParameter && !showHiddenParameters) {
                        return null;
                      }

                      if (isAssignHeaderItem) {
                        return null;
                      }

                      if (isAssignHeaders) {
                        const smallItems = group.items.filter(
                          (item) => item.Depth3 === "Assign Header-Small"
                        );
                        const mediumItems = group.items.filter(
                          (item) => item.Depth3 === "Assign Header-Medium"
                        );
                        const largeItems = group.items.filter(
                          (item) => item.Depth3 === "Assign Header-Large"
                        );

                        return (
                          <Stack gap={"12px"} width="100%">
                            <div
                              className="pageTitle"
                              style={{
                                width: "100%",
                                paddingTop: idx === 0 ? 0 : 48,
                                marginBottom: tab === "Device Status" ? 48 : 0,
                              }}
                            >
                              {getLocalizedText(item, lang)}
                            </div>
                            <AssignMenus
                              smallItems={smallItems}
                              mediumItems={mediumItems}
                              largeItems={largeItems}
                            />
                          </Stack>
                        );
                      }

                      if (isButton) {
                        return (
                          <Stack
                            direction="row"
                            alignItems="center"
                            gap="8px"
                            height="56px"
                            width="calc(50% - 20px)"
                            borderBottom="1px solid var(--grey3)"
                          >
                            <div
                              className="list-title"
                              style={
                                isHiddenParameter
                                  ? { color: "var(--error)" }
                                  : undefined
                              }
                            >
                              {getLocalizedText(item, lang)}
                            </div>
                            <div>
                              <Button
                                variant="outlined"
                                color="secondary"
                                sx={{ height: 30 }}
                              >
                                Send
                              </Button>
                            </div>
                          </Stack>
                        );
                      }
                      if (isDropdown || isDropdownButton) {
                        return (
                          <Stack
                            direction={isDeviceStatus ? "row" : "column"}
                            alignItems={
                              isDeviceStatus ? "center" : "flex-start"
                            }
                            gap={isDeviceStatus ? "8px" : "12px"}
                            height={isDeviceStatus ? "56px" : undefined}
                            width="calc(50% - 20px)"
                            borderBottom={
                              isDeviceStatus
                                ? "1px solid var(--grey3)"
                                : undefined
                            }
                          >
                            <div
                              className="list-title"
                              style={
                                isHiddenParameter
                                  ? { color: "var(--error)" }
                                  : undefined
                              }
                            >
                              <Stack
                                direction="row"
                                alignItems={"center"}
                                gap={"8px"}
                              >
                                {getLocalizedText(item, lang)}
                                {item.required === "true" && <i>*</i>}
                                {item.TEXT_EN_INFO && (
                                  <InputBox.Info
                                    tooltipText={
                                      <span style={{ whiteSpace: "pre-wrap" }}>
                                        {lang === "en"
                                          ? item.TEXT_EN_INFO
                                          : lang === "es"
                                          ? item.TEXT_ES_INFO
                                          : item.TEXT_PT_INFO}
                                      </span>
                                    }
                                  />
                                )}
                                {item.JSON_ID && (
                                  <InputBox.Number>
                                    {item.JSON_ID}
                                  </InputBox.Number>
                                )}
                              </Stack>
                            </div>
                            <Stack
                              direction="row"
                              gap="16px"
                              alignItems="center"
                              width={"100%"}
                            >
                              <div style={{ width: "100%" }}>
                                <Stack direction="row" gap="8px">
                                  <Select
                                    value={item.value}
                                    onChange={(e) => {
                                      handleClearError(item.no);

                                      setMenuContentList(
                                        menuContentList.map((menuContent) => {
                                          if (item.no === menuContent.no) {
                                            return {
                                              ...menuContent,
                                              value: e.target.value,
                                            };
                                          }
                                          return menuContent;
                                        })
                                      );
                                    }}
                                    sx={{
                                      width:
                                        tab === "Device Status" ? 144 : "100%",
                                    }}
                                  >
                                    {(lang === "en"
                                      ? item.TEXT_EN_ITEM_CONTENT
                                      : lang === "es"
                                      ? item.TEXT_ES_ITEM_CONTENT
                                      : item.TEXT_PT_ITEM_CONTENT
                                    )
                                      ?.split(", ")
                                      .map((itemContent, index) => {
                                        return (
                                          <MenuItem
                                            value={
                                              item.DEFAULT_VAL_INDEX?.split(
                                                ", "
                                              )[index]
                                            }
                                          >
                                            {itemContent}
                                          </MenuItem>
                                        );
                                      })}
                                  </Select>
                                  {isDropdownButton && (
                                    <Button
                                      color="secondary"
                                      variant="contained"
                                    >
                                      Send
                                    </Button>
                                  )}
                                </Stack>

                                {renderErrorMessage(item)}
                              </div>
                            </Stack>
                          </Stack>
                        );
                      }
                      if (isInput || isEditHidden || isEditButton) {
                        return (
                          <InputBox style={{ width: "calc(50% - 20px)" }}>
                            <InputBox.Head>
                              <InputBox.Title
                                style={
                                  isHiddenParameter
                                    ? { color: "var(--error)" }
                                    : undefined
                                }
                              >
                                {getLocalizedText(item, lang)}
                              </InputBox.Title>
                              {item.TEXT_EN_INFO && (
                                <InputBox.Info
                                  tooltipText={
                                    <span style={{ whiteSpace: "pre-wrap" }}>
                                      {lang === "en"
                                        ? item.TEXT_EN_INFO
                                        : lang === "es"
                                        ? item.TEXT_ES_INFO
                                        : item.TEXT_PT_INFO}
                                    </span>
                                  }
                                />
                              )}
                              {item.JSON_ID && (
                                <InputBox.Number>
                                  {item.JSON_ID}
                                </InputBox.Number>
                              )}
                            </InputBox.Head>
                            <InputBox.Body>
                              {isEditHidden ? (
                                <PasswordTextField
                                  value={item.value}
                                  onChange={(newValue) => {
                                    handleClearError(item.no);

                                    setMenuContentList(
                                      menuContentList.map((menuContent) => {
                                        if (item.no === menuContent.no) {
                                          return {
                                            ...menuContent,
                                            value: newValue,
                                          };
                                        }
                                        return menuContent;
                                      })
                                    );
                                  }}
                                />
                              ) : (
                                <>
                                  <Stack direction="row" gap="8px">
                                    <TextField
                                      fullWidth
                                      type={
                                        !!item.VALUE_MIN && !!item.VALUE_MIN
                                          ? "number"
                                          : isEditHidden
                                          ? "password"
                                          : "text"
                                      }
                                      inputProps={
                                        !!item.VALUE_MIN && !!item.VALUE_MIN
                                          ? {
                                              min: item.VALUE_MIN || undefined,
                                              max: item.VALUE_MAX || undefined,
                                            }
                                          : undefined
                                      }
                                      value={item.value}
                                      onChange={(e) => {
                                        handleClearError(item.no);

                                        let newValue = e.target.value;

                                        // 숫자 타입일 경우 범위 검증
                                        if (
                                          item.VALUE_MIN !== undefined &&
                                          item.VALUE_MAX !== undefined
                                        ) {
                                          const numValue = Number(newValue);
                                          if (
                                            numValue > Number(item.VALUE_MAX)
                                          ) {
                                            newValue = String(item.VALUE_MAX);
                                          } else if (
                                            numValue < Number(item.VALUE_MIN)
                                          ) {
                                            newValue = String(item.VALUE_MIN);
                                          }
                                        }

                                        setMenuContentList(
                                          menuContentList.map((menuContent) => {
                                            if (item.no === menuContent.no) {
                                              return {
                                                ...menuContent,
                                                value: newValue,
                                              };
                                            }
                                            return menuContent;
                                          })
                                        );
                                      }}
                                    />

                                    {isEditButton && (
                                      <Button
                                        color="secondary"
                                        variant="contained"
                                        onClick={() => {}}
                                      >
                                        Send
                                      </Button>
                                    )}
                                  </Stack>
                                </>
                              )}
                            </InputBox.Body>
                            {renderErrorMessage(item)}
                          </InputBox>
                        );
                      }

                      if (isCheckbox) {
                        return (
                          <Stack
                            direction={isDeviceStatus ? "row" : "column"}
                            alignItems={
                              isDeviceStatus ? "center" : "flex-start"
                            }
                            gap={isDeviceStatus ? "8px" : "12px"}
                            height={isDeviceStatus ? "56px" : undefined}
                            width="calc(50% - 20px)"
                            borderBottom={
                              isDeviceStatus
                                ? "1px solid var(--grey3)"
                                : undefined
                            }
                          >
                            <div
                              className="list-title"
                              style={
                                isHiddenParameter
                                  ? { color: "var(--error)" }
                                  : undefined
                              }
                            >
                              <Stack
                                direction="row"
                                alignItems={"center"}
                                gap={"8px"}
                              >
                                {getLocalizedText(item, lang)}
                                {item.required === "true" && <i>*</i>}
                                {item.TEXT_EN_INFO && (
                                  <InputBox.Info
                                    tooltipText={
                                      <span style={{ whiteSpace: "pre-wrap" }}>
                                        {lang === "en"
                                          ? item.TEXT_EN_INFO
                                          : lang === "es"
                                          ? item.TEXT_ES_INFO
                                          : item.TEXT_PT_INFO}
                                      </span>
                                    }
                                  />
                                )}
                                {item.JSON_ID && (
                                  <InputBox.Number>
                                    {item.JSON_ID}
                                  </InputBox.Number>
                                )}
                              </Stack>
                            </div>
                            <Stack
                              direction="row"
                              gap="16px"
                              alignItems="center"
                              width={"100%"}
                            >
                              <CheckboxComp
                                value={item.value || ""}
                                optionsString={item.DEFAULT_VAL_INDEX}
                                labelsString={{
                                  TEXT_EN_ITEM_CONTENT:
                                    item.TEXT_EN_ITEM_CONTENT || "",
                                  TEXT_ES_ITEM_CONTENT:
                                    item.TEXT_ES_ITEM_CONTENT || "",
                                  TEXT_PT_ITEM_CONTENT:
                                    item.TEXT_PT_ITEM_CONTENT || "",
                                }}
                                lang={lang}
                                onChange={(newValue) => {
                                  setMenuContentList(
                                    menuContentList.map((menuContent) => {
                                      if (item.no === menuContent.no) {
                                        return {
                                          ...menuContent,
                                          value: newValue,
                                        };
                                      }
                                      return menuContent;
                                    })
                                  );
                                }}
                              />
                            </Stack>
                          </Stack>
                        );
                      }

                      if (isSwitch) {
                        return (
                          <Stack
                            direction={"row"}
                            justifyContent={"space-between"}
                            alignItems={"center"}
                            width="calc(50% - 20px)"
                          >
                            <Stack
                              alignItems={"center"}
                              direction={"row"}
                              gap={"8px"}
                            >
                              <InputBox.Title
                                style={
                                  isHiddenParameter
                                    ? { color: "var(--error)" }
                                    : undefined
                                }
                              >
                                {getLocalizedText(item, lang)}
                                {item.required === "true" && <i>*</i>}
                              </InputBox.Title>
                              {item.TEXT_EN_INFO && (
                                <InputBox.Info
                                  tooltipText={
                                    <span style={{ whiteSpace: "pre-wrap" }}>
                                      {lang === "en"
                                        ? item.TEXT_EN_INFO
                                        : lang === "es"
                                        ? item.TEXT_ES_INFO
                                        : item.TEXT_PT_INFO}
                                    </span>
                                  }
                                />
                              )}
                              {item.JSON_ID && (
                                <InputBox.Number>
                                  {item.JSON_ID}
                                </InputBox.Number>
                              )}
                            </Stack>

                            <SwitchPrimary
                              value={item.value === "01"}
                              onChange={(e) => {
                                handleClearError(item.no);
                                const isOn = e.target.checked ? "01" : "00";

                                setMenuContentList(
                                  menuContentList.map((menuContent) => {
                                    if (item.no === menuContent.no) {
                                      return { ...menuContent, value: isOn };
                                    }
                                    return menuContent;
                                  })
                                );
                              }}
                            />
                          </Stack>
                        );
                      }

                      if (isTimeHMA) {
                        return (
                          <Stack
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            width="calc(50% - 20px)"
                            gap={"12px"}
                          >
                            <Stack
                              width={"100%"}
                              alignItems={"center"}
                              direction={"row"}
                              gap={"8px"}
                            >
                              <InputBox.Title
                                style={
                                  isHiddenParameter
                                    ? { color: "var(--error)" }
                                    : undefined
                                }
                              >
                                {getLocalizedText(item, lang)}
                                {item.required === "true" && <i>*</i>}
                              </InputBox.Title>
                              {item.TEXT_EN_INFO && (
                                <InputBox.Info
                                  tooltipText={
                                    <span style={{ whiteSpace: "pre-wrap" }}>
                                      {lang === "en"
                                        ? item.TEXT_EN_INFO
                                        : lang === "es"
                                        ? item.TEXT_ES_INFO
                                        : item.TEXT_PT_INFO}
                                    </span>
                                  }
                                />
                              )}
                              {item.JSON_ID && (
                                <InputBox.Number>
                                  {item.JSON_ID}
                                </InputBox.Number>
                              )}
                              {typeof item.ONOFF_TOGGLE !== "undefined" && (
                                <div style={{ marginLeft: "auto" }}>
                                  <SwitchPrimary
                                    checked={item.ONOFF_TOGGLE === "true"}
                                    onChange={(e) => {
                                      handleClearError(item.no);
                                      const isOn = e.target.checked;

                                      setMenuContentList(
                                        menuContentList.map((menuContent) => {
                                          if (item.no === menuContent.no) {
                                            return {
                                              ...menuContent,
                                              ONOFF_TOGGLE: String(isOn),
                                              value: item?.value,
                                            };
                                          }
                                          return menuContent;
                                        })
                                      );
                                    }}
                                  />
                                </div>
                              )}
                            </Stack>
                            <TimeHMA
                              style={{
                                visibility:
                                  typeof item.ONOFF_TOGGLE !== "undefined" &&
                                  item.ONOFF_TOGGLE !== "true"
                                    ? "hidden"
                                    : "visible",
                              }}
                              value={item.value}
                              onChange={(value: string) => {
                                setMenuContentList(
                                  menuContentList.map((menuContent) => {
                                    if (item.no === menuContent.no) {
                                      return {
                                        ...menuContent,
                                        value: value,
                                      };
                                    }
                                    return menuContent;
                                  })
                                );
                              }}
                            />
                          </Stack>
                        );
                      }

                      if (isTimeSeHMAButton) {
                        return (
                          <Stack
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            width="calc(50% - 20px)"
                            gap={"12px"}
                          >
                            <Stack
                              width={"100%"}
                              alignItems={"center"}
                              direction={"row"}
                              gap={"8px"}
                            >
                              <InputBox.Title
                                style={
                                  isHiddenParameter
                                    ? { color: "var(--error)" }
                                    : undefined
                                }
                              >
                                {getLocalizedText(item, lang)}
                                {item.required === "true" && <i>*</i>}
                              </InputBox.Title>
                              {item.TEXT_EN_INFO && (
                                <InputBox.Info
                                  tooltipText={
                                    <span style={{ whiteSpace: "pre-wrap" }}>
                                      {lang === "en"
                                        ? item.TEXT_EN_INFO
                                        : lang === "es"
                                        ? item.TEXT_ES_INFO
                                        : item.TEXT_PT_INFO}
                                    </span>
                                  }
                                />
                              )}
                              {item.JSON_ID && (
                                <InputBox.Number>
                                  {item.JSON_ID}
                                </InputBox.Number>
                              )}
                              {typeof item.ONOFF_TOGGLE !== "undefined" && (
                                <div style={{ marginLeft: "auto" }}>
                                  <SwitchPrimary
                                    checked={item.ONOFF_TOGGLE === "true"}
                                    onChange={(e) => {
                                      handleClearError(item.no);
                                      const isOn = e.target.checked;

                                      setMenuContentList(
                                        menuContentList.map((menuContent) => {
                                          if (item.no === menuContent.no) {
                                            return {
                                              ...menuContent,
                                              ONOFF_TOGGLE: String(isOn),
                                              value: item?.value,
                                            };
                                          }
                                          return menuContent;
                                        })
                                      );
                                    }}
                                  />
                                </div>
                              )}
                            </Stack>
                            <TimeSeHMAButton
                              values={(item.value as unknown as string[]) || []}
                              onChange={(value: string[]) => {
                                setMenuContentList(
                                  menuContentList.map((menuContent) => {
                                    if (item.no === menuContent.no) {
                                      return {
                                        ...menuContent,
                                        value: value as unknown as string,
                                      };
                                    }
                                    return menuContent;
                                  })
                                );
                              }}
                            />
                          </Stack>
                        );
                      }

                      if (isCheckboxEdit) {
                        return (
                          <CheckboxEdit
                            title={getLocalizedText(item, lang)}
                            info={
                              lang === "en"
                                ? item.TEXT_EN_INFO
                                : lang === "es"
                                ? item.TEXT_ES_INFO
                                : item.TEXT_PT_INFO
                            }
                            jsonId={item.JSON_ID}
                          />
                        );
                      }

                      if (isCheckboxEditButton) {
                        return (
                          <Stack
                            justifyContent={"flex-start"}
                            alignItems={"center"}
                            width="calc(50% - 20px)"
                            gap={"12px"}
                          >
                            <Stack
                              width={"100%"}
                              alignItems={"center"}
                              direction={"row"}
                              gap={"8px"}
                            >
                              <InputBox.Title
                                style={
                                  isHiddenParameter
                                    ? { color: "var(--error)" }
                                    : undefined
                                }
                              >
                                {getLocalizedText(item, lang)}
                                {item.required === "true" && <i>*</i>}
                              </InputBox.Title>
                              {item.TEXT_EN_INFO && (
                                <InputBox.Info
                                  tooltipText={
                                    <span style={{ whiteSpace: "pre-wrap" }}>
                                      {lang === "en"
                                        ? item.TEXT_EN_INFO
                                        : lang === "es"
                                        ? item.TEXT_ES_INFO
                                        : item.TEXT_PT_INFO}
                                    </span>
                                  }
                                />
                              )}
                              {item.JSON_ID && (
                                <InputBox.Number>
                                  {item.JSON_ID}
                                </InputBox.Number>
                              )}
                              {typeof item.ONOFF_TOGGLE !== "undefined" && (
                                <div style={{ marginLeft: "auto" }}>
                                  <SwitchPrimary
                                    checked={item.ONOFF_TOGGLE === "true"}
                                    onChange={(e) => {
                                      handleClearError(item.no);
                                      const isOn = e.target.checked;

                                      setMenuContentList(
                                        menuContentList.map((menuContent) => {
                                          if (item.no === menuContent.no) {
                                            return {
                                              ...menuContent,
                                              ONOFF_TOGGLE: String(isOn),
                                              value: item?.value,
                                            };
                                          }
                                          return menuContent;
                                        })
                                      );
                                    }}
                                  />
                                </div>
                              )}
                            </Stack>
                            <CheckboxEditButton
                              checkedValue={item?.value?.[0] || ""}
                              inputValue={item?.value?.[1] || ""}
                              VALUE_MIN={item.VALUE_MIN}
                              VALUE_MAX={item.VALUE_MAX}
                              optionsString={item.DEFAULT_VAL_INDEX}
                              lang={lang}
                              labelsString={{
                                TEXT_EN_ITEM_CONTENT:
                                  item.TEXT_EN_ITEM_CONTENT || "",
                                TEXT_ES_ITEM_CONTENT:
                                  item.TEXT_ES_ITEM_CONTENT || "",
                                TEXT_PT_ITEM_CONTENT:
                                  item.TEXT_PT_ITEM_CONTENT || "",
                              }}
                              onChange={(newValue) => {
                                setMenuContentList(
                                  menuContentList.map((menuContent) => {
                                    if (item.no === menuContent.no) {
                                      return {
                                        ...menuContent,
                                        value: newValue as unknown as string,
                                      };
                                    }
                                    return menuContent;
                                  })
                                );
                              }}
                            />
                          </Stack>
                        );
                      }

                      return (
                        <Stack
                          direction={isDeviceStatus ? "row" : "column"}
                          alignItems={isDeviceStatus ? "center" : "flex-start"}
                          gap={isDeviceStatus ? "8px" : "12px"}
                          height={isDeviceStatus ? "56px" : undefined}
                          width="calc(50% - 20px)"
                          borderBottom={
                            isDeviceStatus
                              ? "1px solid var(--grey3)"
                              : undefined
                          }
                        >
                          <div
                            className="list-title"
                            style={
                              isHiddenParameter
                                ? { color: "var(--error)" }
                                : undefined
                            }
                          >
                            <Stack
                              direction="row"
                              alignItems={"center"}
                              gap={"8px"}
                            >
                              {getLocalizedText(item, lang)}
                              {item.required === "true" && <i>*</i>}
                              {item.TEXT_EN_INFO && (
                                <InputBox.Info
                                  tooltipText={
                                    <span style={{ whiteSpace: "pre-wrap" }}>
                                      {lang === "en"
                                        ? item.TEXT_EN_INFO
                                        : lang === "es"
                                        ? item.TEXT_ES_INFO
                                        : item.TEXT_PT_INFO}
                                    </span>
                                  }
                                />
                              )}
                              {item.JSON_ID && (
                                <InputBox.Number>
                                  {item.JSON_ID}
                                </InputBox.Number>
                              )}
                              {typeof item.ONOFF_TOGGLE !== "undefined" && (
                                <div style={{ marginLeft: "auto" }}>
                                  <SwitchPrimary
                                    checked={item.ONOFF_TOGGLE === "true"}
                                    onChange={(e) => {
                                      handleClearError(item.no);
                                      const isOn = e.target.checked;

                                      setMenuContentList(
                                        menuContentList.map((menuContent) => {
                                          if (item.no === menuContent.no) {
                                            return {
                                              ...menuContent,
                                              ONOFF_TOGGLE: String(isOn),
                                              value: item?.value,
                                            };
                                          }
                                          return menuContent;
                                        })
                                      );
                                    }}
                                  />
                                </div>
                              )}
                            </Stack>
                          </div>
                          <div>{item.value || "-"}</div>
                        </Stack>
                      );
                    })}
                  </Stack>
                </Stack>
              ))
            )}
          </Stack>
        </Stack>
      </article>
    </>
  );
};
