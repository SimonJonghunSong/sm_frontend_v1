"use client";

import { useEffect, useState } from "react";
import useModelInfoStore from "@/src/stores/useModelInfo";
import { getJsonDataFromIDB } from "@/utils/idbModelUtil";
import { ModelConfig } from "@/src/api/services/model/type";
import SideMenu from "./SideMenu";
import { Button, MenuItem, Select, Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";

const SIDE_BAR = "Side Bar";

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
  const [menuContentList, setMenuContentList] = useState<ModelConfig[]>([]);
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
  const { lang } = useLangStore();

  const handleTabChange = (tab: string) => {
    setTab(tab);
  };

  const getMenuContent = (tab: string) => {
    return menuContentList.filter((item) => item.Depth2 === tab);
  };

  useEffect(() => {
    const fetchJsonData = async () => {
      const jsonData = (await getJsonDataFromIDB(
        getModelName()
      )) as ModelConfig[];

      const menuSectionList = jsonData
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
      setMenuContentList(menuContentList);
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
      />
      <article className="contentWrap">
        <Stack flexWrap="wrap" direction="row" gap="0 40px">
          {getMenuContent(tab).map((item, idx) => {
            const isSectionTitle = !item.DEFAULT_VALUE && !item.UI_INPUT_TYPE;
            const isButton = item.UI_INPUT_TYPE === "button";
            const isDropdown = item.UI_INPUT_TYPE === "dropdown";

            if (isSectionTitle) {
              return (
                <div
                  className="pageTitle"
                  style={{
                    width: "100%",
                    paddingTop: idx === 0 ? 0 : 48,
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
                  <div className="list-title">
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
                  <Stack direction="row" gap="16px" alignItems="center">
                    <div>
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
                        sx={{ width: 144 }}
                      >
                        {(lang === "en"
                          ? item.TEXT_EN_ITEM_CONTENT
                          : lang === "es"
                          ? item.TEXT_ES_ITEM_CONTENT
                          : item.TEXT_PT_ITEM_CONTENT
                        )
                          ?.split(",")
                          .map((itemContent, index) => {
                            return (
                              <MenuItem
                                value={item.DEFAULT_VAL_INDEX.split(",")[index]}
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
            return (
              <Stack
                direction="row"
                alignItems="center"
                gap="8px"
                height="56px"
                width="calc(50% - 20px)"
                borderBottom="1px solid var(--grey3)"
              >
                <div className="list-title">{getLocalizedText(item, lang)}</div>
                <div>{item.DEFAULT_VALUE || "-"}</div>
              </Stack>
            );
          })}
        </Stack>
      </article>
    </div>
  );
};

export default ModelInfoPage;
