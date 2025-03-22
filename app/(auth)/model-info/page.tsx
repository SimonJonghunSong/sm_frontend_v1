"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import useModelInfoStore from "@/src/stores/useModelInfo";
import {
  deleteJsonDataFromIDB,
  getJsonDataFromIDB,
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

const SIDE_BAR = "Side Bar";
const DELETE_MODEL = "Delete Model";
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
  const t = useTranslations();
  const router = useRouter();

  const { toggle, renderConfirmModal } = useConfirmDialog({
    onYes: () => {
      deleteJsonDataFromIDB(getModelName());
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

  useEffect(() => {
    const fetchJsonData = async () => {
      const jsonData = (await getJsonDataFromIDB(
        getModelName()
      )) as ModelConfig[];

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

      setSideBarList(menuSectionList);
      setAllMenuContentList(menuContentList);
      setTab(menuSectionList[0].textEn);
    };
    fetchJsonData();
  }, [getModelName]);

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
        showHiddenParameters={showHiddenParameters}
        allMenuContentList={allMenuContentList}
      />
      {renderConfirmModal()}
    </div>
  );
};

export default ModelInfoPage;

const ContentByTab = ({
  tab,
  showHiddenParameters,
  allMenuContentList,
}: {
  tab: string;
  showHiddenParameters: boolean;
  allMenuContentList: ModelConfig[];
}) => {
  const [menuContentList, setMenuContentList] = useState<ModelConfig[]>([]);
  const { lang } = useLangStore();

  useEffect(() => {
    setMenuContentList(
      allMenuContentList.filter((content) => content.Depth2 === tab)
    );
  }, [tab]);

  return (
    <article className="contentWrap">
      <Stack
        flexWrap="wrap"
        direction="row"
        gap={tab === "Device Status" ? "0 40px" : "48px 40px"}
      >
        {menuContentList.map((item, idx) => {
          const isSectionTitle = item.Depth3 === "Section1";
          const isButton = item.UI_INPUT_TYPE === "button";
          const isDropdown = item.UI_INPUT_TYPE === "dropdown";
          const isEditHidden = item.UI_INPUT_TYPE === "edit_hidden";
          const isInput = item.UI_INPUT_TYPE === "edit";
          const isCheckbox = item.UI_INPUT_TYPE === "checkbox";
          const isHiddenParameter = item["hidden-param"] === "true";

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
                    {getLocalizedText(item, lang)}
                  </Button>
                </div>
              </Stack>
            );
          }
          if (isDropdown) {
            return (
              <Stack
                direction={tab === "Device Status" ? "row" : "column"}
                alignItems={tab === "Device Status" ? "center" : "flex-start"}
                gap={tab === "Device Status" ? "8px" : "12px"}
                height={tab === "Device Status" ? "56px" : undefined}
                width="calc(50% - 20px)"
                borderBottom={
                  tab === "Device Status" ? "1px solid var(--grey3)" : undefined
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
                    <Select
                      value={item.DEFAULT_VALUE}
                      onChange={(e) => {
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
                              value={item.DEFAULT_VAL_INDEX?.split(", ")[index]}
                            >
                              {itemContent}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </div>
                </Stack>
              </Stack>
            );
          }
          if (isInput || isEditHidden) {
            return (
              <InputBox style={{ width: "calc(50% - 20px)" }}>
                <InputBox.Head>
                  <InputBox.Title
                    style={
                      isHiddenParameter ? { color: "var(--error)" } : undefined
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
                </InputBox.Head>
                <InputBox.Body>
                  {isEditHidden ? (
                    <PasswordTextField
                      value={item.DEFAULT_VALUE}
                      onChange={(newValue) => {
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
                  )}
                </InputBox.Body>
              </InputBox>
            );
          }

          if (isCheckbox) {
            return (
              <Stack
                direction={tab === "Device Status" ? "row" : "column"}
                alignItems={tab === "Device Status" ? "center" : "flex-start"}
                gap={tab === "Device Status" ? "8px" : "12px"}
                height={tab === "Device Status" ? "56px" : undefined}
                width="calc(50% - 20px)"
                borderBottom={
                  tab === "Device Status" ? "1px solid var(--grey3)" : undefined
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

          return (
            <Stack
              direction={tab === "Device Status" ? "row" : "column"}
              alignItems={tab === "Device Status" ? "center" : "flex-start"}
              gap={tab === "Device Status" ? "8px" : "12px"}
              height={tab === "Device Status" ? "56px" : undefined}
              width="calc(50% - 20px)"
              borderBottom={
                tab === "Device Status" ? "1px solid var(--grey3)" : undefined
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
  );
};
