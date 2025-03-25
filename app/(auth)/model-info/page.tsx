"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import useModelInfoStore from "@/src/stores/useModelInfo";
import {
  deleteJsonDataFromIDB,
  getJsonDataFromIDB,
  updateParametersInIDB,
} from "@/utils/idbModelUtil";
import { ModelConfig } from "@/src/api/services/model/type";
import SideMenu from "./SideMenu";
import {
  Button,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import useConfirmDialog from "@/src/hooks/useConfirmDialog";
import { useRouter } from "next/navigation";
import InputBox from "@/components/inputbox/InputBox";
import { PasswordTextField } from "./EditHiddenInput";
import { SwitchPrimary } from "@/components/switches";
import TimeHMA from "app/(auth)/model-info/TimeHMA";
import CheckboxEdit from "./CheckboxEdit";

const SIDE_BAR = "Side Bar";
const DELETE_MODEL = "Delete Model";
const DEVICE_STATUS = "Device Status";
const SHOW_HIDDEN_PARAMETERS = "Show Hidden Parameters";

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
  const [showHiddenParameters, setShowHiddenParameters] = useState(false);
  const [allMenuContentList, setAllMenuContentList] = useState<ModelConfig[]>(
    []
  );
  const [sideBarList, setSideBarList] = useState<
    {
      no: number;
      textEn: string;
      textEs: string;
      textPt: string;
      index: number;
    }[]
  >([]);
  const { getModelName } = useModelInfoStore();
  const modelName = useMemo(() => getModelName(), [getModelName]);
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

  const handleTabChange = (tab: string) => {
    switch (tab) {
      case DELETE_MODEL:
        toggle();
        break;
      case SHOW_HIDDEN_PARAMETERS:
        return;
      default:
        setTab(tab);
    }
  };

  const handleUpdateContentList = (menuContentList: ModelConfig[]) => {
    updateParametersInIDB(modelName, menuContentList);
    setAllMenuContentList((prev) => {
      const updatedMap = new Map(
        menuContentList.map((item) => [item.no, item])
      );

      return prev.map((item) =>
        updatedMap.has(item.no) ? updatedMap.get(item.no)! : item
      );
    });
  };

  useEffect(() => {
    const fetchJsonData = async () => {
      const jsonData =
        ((await getJsonDataFromIDB(modelName)) as ModelConfig[]) || [];

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
        showHiddenParameters={showHiddenParameters}
        allMenuContentList={allMenuContentList}
        handleUpdateContentList={handleUpdateContentList}
      />
      {renderConfirmModal()}
    </div>
  );
};

export default ModelInfoPage;

const ContentByTab = ({
  tab,
  modelName,
  showHiddenParameters,
  allMenuContentList,
  handleUpdateContentList,
}: {
  tab: string;
  modelName: string;
  showHiddenParameters: boolean;
  allMenuContentList: ModelConfig[];
  handleUpdateContentList: (menuContentList: ModelConfig[]) => void;
}) => {
  const t = useTranslations();

  const [menuContentList, setMenuContentList] = useState<ModelConfig[]>([]);
  const [errorList, setErrorList] = useState<Record<number, string>>({});

  console.log(menuContentList);
  const { lang } = useLangStore();

  const { toggle: sendToggle, renderConfirmModal: renderSendConfirmModal } =
    useConfirmDialog({
      onYes: () => {
        handleUpdateContentList(menuContentList);
      },
      description: t(
        "popup.configuration.side_bar.are_you_sure_you_want_to_send_the_data?"
      ),
    });

  const handleClearError = (no: number) => {
    setErrorList((prev) => {
      const newErrorList = { ...prev };
      delete newErrorList[no];
      return newErrorList;
    });
  };

  const handleSendClick = (depth3?: string) => {
    setErrorList({});
    // TODO: 숨긴항목 처리 어떻게 할지?
    const requiredList = menuContentList.filter(
      (item) =>
        item.required === "true" &&
        (typeof depth3 === "undefined" || item.Depth3 === depth3)
    );

    const errorNoList = requiredList
      .filter(
        (item) => !item.DEFAULT_VALUE && item.UI_INPUT_TYPE !== "checkbox"
      )
      .map((item) => {
        return {
          no: item.no,
          message: t("configuration.please_fill_out_this_field"),
        };
      });

    console.log("requiredList :::", requiredList);
    console.log("errorNoList :::", errorNoList);

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
        console.log("errorElement :::", errorElement);

        if (errorElement) {
          const rect = errorElement.getBoundingClientRect();
          const offset = window.scrollY + rect.top - 200; // 100은 header 높이

          window.scrollTo({
            top: offset,
            behavior: "smooth",
          });
        }
      }, 10);

      return;
    }

    sendToggle();
  };

  const renderErrorMessage = (item: ModelConfig) => {
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
    setMenuContentList(
      allMenuContentList.filter((content) => content.Depth2 === tab)
    );
  }, [tab]);

  return (
    <>
      <article className="contentWrap">
        <Stack
          flexWrap="wrap"
          direction="row"
          gap={tab === "Device Status" ? "0 40px" : "48px 40px"}
        >
          {menuContentList.map((item, idx) => {
            const isDeviceStatus = tab == DEVICE_STATUS;
            const isSectionTitle = item.Depth3 === "Section1";
            const isButton = item.UI_INPUT_TYPE === "button";
            const isDropdown = item.UI_INPUT_TYPE === "dropdown";
            const isDropdownButton = item.UI_INPUT_TYPE === "dropdown_button";
            const isEditHidden = item.UI_INPUT_TYPE === "edit_hidden";
            const isInput =
              item.UI_INPUT_TYPE === "edit" ||
              item.UI_INPUT_TYPE === "edit_min" ||
              item.UI_INPUT_TYPE === "edit_max";
            const isCheckbox = item.UI_INPUT_TYPE === "checkbox";
            const isHiddenParameter = item["hidden-param"] === "true";
            const isSwitch =
              item.UI_INPUT_TYPE === undefined && item.ONOFF_TOGGLE === "true";
            const isTimeHMA =
              item.UI_INPUT_TYPE === "time_HMA" ||
              item.UI_INPUT_TYPE === "time_se_HMA";
            const isCheckboxEdit = item.UI_INPUT_TYPE === "checkbox_edit";
            const isEditButton = item.UI_INPUT_TYPE === "edit_button";

            if (isHiddenParameter && !showHiddenParameters) {
              return null;
            }

            if (isSectionTitle) {
              return (
                <div
                  className="pageTitle"
                  style={{
                    width: "100%",
                    paddingTop: idx === 0 ? 0 : 48,
                    marginBottom: tab === "Device Status" ? 48 : 0,
                  }}
                >
                  {getLocalizedText(item, lang)}
                  {!isDeviceStatus && (
                    <Button
                      color="secondary"
                      variant="contained"
                      // 센션 별 저장
                      // onClick={() => handleSendClick(item.TEXT_EN)}

                      // 전체 저장
                      onClick={() => handleSendClick()}
                    >
                      {t("configuration.ble.save")}
                    </Button>
                  )}
                </div>
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
                      isHiddenParameter ? { color: "var(--error)" } : undefined
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
                      {t("configuration.ble.save")}
                    </Button>
                  </div>
                </Stack>
              );
            }
            if (isDropdown || isDropdownButton) {
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
                  <div
                    className="list-title"
                    style={
                      isHiddenParameter ? { color: "var(--error)" } : undefined
                    }
                  >
                    <Stack direction="row" alignItems={"center"} gap={"8px"}>
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
                          value={item.DEFAULT_VALUE}
                          onChange={(e) => {
                            handleClearError(item.no);

                            setMenuContentList(
                              menuContentList.map((menuContent) => {
                                if (item.no === menuContent.no) {
                                  return {
                                    ...menuContent,
                                    DEFAULT_VALUE: e.target.value,
                                  };
                                }
                                return menuContent;
                              })
                            );
                          }}
                          sx={{ width: tab === "Device Status" ? 144 : "100%" }}
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
                                    item.DEFAULT_VAL_INDEX?.split(", ")[index]
                                  }
                                >
                                  {itemContent}
                                </MenuItem>
                              );
                            })}
                        </Select>
                        {isDropdownButton && (
                          <Button color="secondary" variant="contained">
                            {t("configuration.ble.save")}
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
                      <InputBox.Number>{item.JSON_ID}</InputBox.Number>
                    )}
                  </InputBox.Head>
                  <InputBox.Body>
                    {isEditHidden ? (
                      <PasswordTextField
                        value={item.DEFAULT_VALUE}
                        onChange={(newValue) => {
                          handleClearError(item.no);

                          setMenuContentList(
                            menuContentList.map((menuContent) => {
                              if (item.no === menuContent.no) {
                                return {
                                  ...menuContent,
                                  DEFAULT_VALUE: newValue,
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
                            value={item.DEFAULT_VALUE}
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
                                } else if (numValue < Number(item.VALUE_MIN)) {
                                  newValue = String(item.VALUE_MIN);
                                }
                              }

                              setMenuContentList(
                                menuContentList.map((menuContent) => {
                                  if (item.no === menuContent.no) {
                                    return {
                                      ...menuContent,
                                      DEFAULT_VALUE: newValue,
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
                              // 센션 별 저장
                              // onClick={() => handleSendClick(item.TEXT_EN)}

                              // 전체 저장
                              onClick={() => {}}
                            >
                              {t("configuration.ble.save")}
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
                  alignItems={isDeviceStatus ? "center" : "flex-start"}
                  gap={isDeviceStatus ? "8px" : "12px"}
                  height={isDeviceStatus ? "56px" : undefined}
                  width="calc(50% - 20px)"
                  borderBottom={
                    isDeviceStatus ? "1px solid var(--grey3)" : undefined
                  }
                >
                  <div
                    className="list-title"
                    style={
                      isHiddenParameter ? { color: "var(--error)" } : undefined
                    }
                  >
                    <Stack direction="row" alignItems={"center"} gap={"8px"}>
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
                    </Stack>
                  </div>
                  <Stack
                    direction="row"
                    gap="16px"
                    alignItems="center"
                    width={"100%"}
                  >
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px",
                      }}
                    >
                      {item.DEFAULT_VAL_INDEX?.split(", ").map((key, index) => {
                        const label = (
                          lang === "en"
                            ? item.TEXT_EN_ITEM_CONTENT
                            : lang === "es"
                            ? item.TEXT_ES_ITEM_CONTENT
                            : item.TEXT_PT_ITEM_CONTENT
                        )
                          ?.replace(/[\r\n]+/g, " ")
                          .split(", ")[index];
                        const values = item?.DEFAULT_VALUE?.replaceAll(
                          " ",
                          ""
                        ).split("");

                        return (
                          <FormControlLabel
                            key={key}
                            label={label}
                            control={
                              <Checkbox
                                key={key}
                                checked={values?.[index] === "1"}
                                onChange={(e) => {
                                  handleClearError(item.no);

                                  const valIndex =
                                    item?.DEFAULT_VAL_INDEX?.split(", ") ?? [];
                                  const totalBits = valIndex.length;

                                  // 기존 값을 파싱하고 길이 부족한 경우 0으로 채움
                                  const currentBits =
                                    item?.DEFAULT_VALUE?.replaceAll(
                                      " ",
                                      ""
                                    ).split("") ?? [];
                                  while (currentBits.length < totalBits) {
                                    currentBits.push("0");
                                  }

                                  // toggle
                                  currentBits[index] =
                                    currentBits[index] === "1" ? "0" : "1";

                                  // 8비트 단위로 공백 포함하여 재조합
                                  const newValue = currentBits
                                    .map((bit, i) =>
                                      i % 8 === 0 ? " " + bit : bit
                                    )
                                    .join("")
                                    .trim();

                                  setMenuContentList(
                                    menuContentList.map((menuContent) => {
                                      if (item.no === menuContent.no) {
                                        return {
                                          ...menuContent,
                                          DEFAULT_VALUE: newValue,
                                        };
                                      }
                                      return menuContent;
                                    })
                                  );
                                }}
                              />
                            }
                          />
                        );
                      })}
                    </div>
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
                  <Stack alignItems={"center"} direction={"row"} gap={"8px"}>
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
                      <InputBox.Number>{item.JSON_ID}</InputBox.Number>
                    )}
                  </Stack>

                  <SwitchPrimary
                    value={item.DEFAULT_VALUE === "01"}
                    onChange={(e) => {
                      handleClearError(item.no);
                      const isOn = e.target.checked ? "01" : "00";

                      setMenuContentList(
                        menuContentList.map((menuContent) => {
                          if (item.no === menuContent.no) {
                            return { ...menuContent, DEFAULT_VALUE: isOn };
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
                                    value: item?.DEFAULT_VALUE,
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
                    value={item.DEFAULT_VALUE}
                    onChange={(value: string) => {
                      console.log("value22 :::", value);

                      setMenuContentList(
                        menuContentList.map((menuContent) => {
                          if (item.no === menuContent.no) {
                            console.log("test ::::::::", menuContent);

                            return {
                              ...menuContent,
                              DEFAULT_VALUE: value,
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
                <div
                  className="list-title"
                  style={
                    isHiddenParameter ? { color: "var(--error)" } : undefined
                  }
                >
                  {getLocalizedText(item, lang)}
                </div>
                <div>{item.DEFAULT_VALUE || "-"}</div>
              </Stack>
            );
          })}
        </Stack>
      </article>
      {renderSendConfirmModal()}
    </>
  );
};
