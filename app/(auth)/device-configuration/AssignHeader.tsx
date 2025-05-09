import AssignMenus from "@/components/AssignMenus";
import { parseAssigns } from "@/components/AssignMenus/utils";
import FullLoading from "@/components/FullLoading";
import useSerial from "@/src/hooks/useSerial";
import {
  AT_GET_ASSIGN_MAP_ALT,
  AT_SET_ASSIGN_ALT,
  AT_SET_ASSIGN_ALT_ITEM,
  AT_SET_ASSIGN_STT,
  AT_SET_ASSIGN_STT_ITEM,
} from "@/src/hooks/useSerial/constant";
import { AT_GET_ASSIGN_MAP_STT } from "@/src/hooks/useSerial/constant";
import { AT_GET_CSV } from "@/src/hooks/useSerial/constant";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import { Button, Stack, Tab, Tabs } from "@mui/material";
import { useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";

const renderNumber = (value: string) => {
  return Number(isNaN(Number(value)) ? 0 : Number(value)) < 10
    ? `0${value}`
    : value;
};

interface Props {
  imei: string;
}

export default function AssignHeader({ imei }: Props) {
  // utils
  const t = useTranslations();
  const {
    state: { portList },
    func: { write },
  } = useSerial();
  const currentPort = portList.find(({ port }) => port.imei === imei);

  // state
  const [tab, setTab] = useState<string>("stt");
  const [isFullLoading, setIsFullLoading] = useState(false);
  const csvDataRef = useRef("");

  const { formData } = useTransformedConfigData({
    data: portList.find(({ port }) => port.imei === imei).packageToJson
      .synctrak,
    blacklist: ["info", "Circular Geofence", "Polygon Geofence"],
  });

  const pageData = useMemo(() => {
    return (formData || []).find(
      (item) =>
        item.tabName ===
        (tab === "stt" ? "ASSIGN HEADER(STT)" : "ASSIGN HEADER(ALT)")
    );
  }, [formData, tab]);

  // stt
  const [sttData, setSttData] = useState({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });
  const [defaultSttIndexes, setDefaultSttIndexes] = useState({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });
  const [updateSttDatas, setUpdateSttDatas] = useState({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });
  const sttPageSendDisabled = useMemo(() => {
    return (
      updateSttDatas.s_assigns.length === 0 &&
      updateSttDatas.m_assigns.length === 0 &&
      updateSttDatas.l_assigns.length === 0
    );
  }, [updateSttDatas]);

  // alt
  const [altData, setAltData] = useState({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });
  const [defaultAltIndexes, setDefaultAltIndexes] = useState({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });

  const [updateAltDatas, setUpdateAltDatas] = useState({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });
  const altPageSendDisabled = useMemo(() => {
    return (
      updateAltDatas.s_assigns.length === 0 &&
      updateAltDatas.m_assigns.length === 0 &&
      updateAltDatas.l_assigns.length === 0
    );
  }, [updateAltDatas]);

  useEffect(() => {
    if (!currentPort.port.writable || !currentPort.port.readable) {
      return;
    }

    if (currentPort.port.isReadyToUse) {
      setIsFullLoading(true);
      currentPort.port.isCsvFetching = true;
      currentPort.port.onCsvDataFetched = (data) => {
        csvDataRef.current += data;
      };
      currentPort.port.onEndCsvDataFetched = () => {
        currentPort.port.isSttDataFetching = true;
        currentPort.port.onEndCurrentSttDataFetched = (data) => {
          const currentCsvData = data.split(`RES;${imei};05;07;`)[1];
          const currentCsvValuesArray = currentCsvData
            .replaceAll("\r", "")
            .split(";");

          const [currentChecked, sItems, mItems, lItems] =
            currentCsvValuesArray;

          const sItemsArray = sItems.split(",");
          const mItemsArray = mItems.split(",");
          const lItemsArray = lItems.split(",");

          const parseData = parseAssigns(csvDataRef.current);

          setSttData({
            s_assigns: parseData.s_assigns.map((item) =>
              sItemsArray.includes(renderNumber(item.id))
                ? { ...item, value: "1" }
                : item
            ),
            m_assigns: parseData.m_assigns.map((item) =>
              mItemsArray.includes(renderNumber(item.id))
                ? { ...item, value: "1" }
                : item
            ),
            l_assigns: parseData.l_assigns.map((item) =>
              lItemsArray.includes(renderNumber(item.id))
                ? { ...item, value: "1" }
                : item
            ),
          });

          setDefaultSttIndexes({
            s_assigns: sItemsArray.map((item) => parseInt(item)),
            m_assigns: mItemsArray.map((item) => parseInt(item)),
            l_assigns: lItemsArray.map((item) => parseInt(item)),
          });

          currentPort.port.isAltDataFetching = true;
          currentPort.port.onEndCurrentAltDataFetched = (data) => {
            const currentCsvData = data.split(`RES;${imei};05;08;`)[1];
            const currentCsvValuesArray = currentCsvData
              .replaceAll("\r", "")
              .split(";");

            const [currentChecked, sItems, mItems, lItems] =
              currentCsvValuesArray;

            console.log("sItems :::", sItems);
            console.log("mItems :::", mItems);
            console.log("lItems :::", lItems);

            const sItemsArray = sItems.split(",");
            const mItemsArray = mItems.split(",");
            const lItemsArray = lItems.split(",");

            const parseData = parseAssigns(csvDataRef.current);

            setAltData({
              s_assigns: parseData.s_assigns.map((item) =>
                sItemsArray.includes(renderNumber(item.id))
                  ? { ...item, value: "1" }
                  : item
              ),
              m_assigns: parseData.m_assigns.map((item) =>
                mItemsArray.includes(renderNumber(item.id))
                  ? { ...item, value: "1" }
                  : item
              ),
              l_assigns: parseData.l_assigns.map((item) =>
                lItemsArray.includes(renderNumber(item.id))
                  ? { ...item, value: "1" }
                  : item
              ),
            });

            setDefaultAltIndexes({
              s_assigns: sItemsArray.map((item) => parseInt(item)),
              m_assigns: mItemsArray.map((item) => parseInt(item)),
              l_assigns: lItemsArray.map((item) => parseInt(item)),
            });

            setIsFullLoading(false);
          };

          write({
            data: AT_GET_ASSIGN_MAP_ALT,
            port: currentPort.port,
            writer: currentPort.writer,
          });
        };

        write({
          data: AT_GET_ASSIGN_MAP_STT,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      };

      write({
        data: AT_GET_CSV,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    }
  }, [
    currentPort.port.writable,
    currentPort.port.readable,
    currentPort.port.isReadyToUse,
  ]);

  const handleSendStt = () => {
    setIsFullLoading(true);
    let updateDataString = "";

    for (let i = 8; i > 0; i--) {
      updateDataString += updateSttDatas.l_assigns[i - 1] ? "1" : "0";
    }
    for (let i = 8; i > 0; i--) {
      updateDataString += updateSttDatas.m_assigns[i - 1] ? "1" : "0";
    }
    for (let i = 15; i > 0; i--) {
      updateDataString += updateSttDatas.s_assigns[i - 1] ? "1" : "0";
    }

    let updateDataString16 = parseInt(updateDataString, 2).toString(16);

    // updateDataString16 값의 길이가 8이 되도록 앞에 0을 채우고 싶어
    while (updateDataString16.length < 8) {
      updateDataString16 = "0" + updateDataString16;
    }

    console.log("updateSttDatas :::", updateSttDatas);

    const pageSAssigns = pageData?.fields?.filter(
      (item) => item.type === "sAssign"
    );

    const pageMAssigns = pageData?.fields?.filter(
      (item) => item.type === "mAssign"
    );

    const pageLAssigns = pageData?.fields?.filter(
      (item) => item.type === "lAssign"
    );

    const commands = [
      ...pageSAssigns.map(
        (item, idx) =>
          `${renderNumber(item.ID)}#${
            updateSttDatas.s_assigns?.[idx]
              ? Number(updateSttDatas.s_assigns?.[idx].id).toString(16)
                  .length === 1
                ? `0${Number(updateSttDatas.s_assigns?.[idx].id).toString(16)}`
                : Number(updateSttDatas.s_assigns?.[idx].id).toString(16)
              : "00"
          }`
      ),
      ...pageMAssigns.map(
        (item, idx) =>
          `${renderNumber(item.ID)}#${
            updateSttDatas.m_assigns?.[idx]
              ? Number(updateSttDatas.m_assigns?.[idx].id).toString(16)
                  .length === 1
                ? `0${Number(updateSttDatas.m_assigns?.[idx].id).toString(16)}`
                : Number(updateSttDatas.m_assigns?.[idx].id).toString(16)
              : "00"
          }`
      ),
      ...pageLAssigns.map(
        (item, idx) =>
          `${renderNumber(item.ID)}#${
            updateSttDatas.l_assigns?.[idx]
              ? Number(updateSttDatas.l_assigns?.[idx].id).toString(16)
                  .length === 1
                ? `0${Number(updateSttDatas.l_assigns?.[idx].id).toString(16)}`
                : Number(updateSttDatas.l_assigns?.[idx].id).toString(16)
              : "00"
          }`
      ),
    ];

    write({
      data: `${AT_SET_ASSIGN_STT}81#${updateDataString16}`,
      port: currentPort.port,
      writer: currentPort.writer,
    });

    setTimeout(() => {
      write({
        data: `${AT_SET_ASSIGN_STT_ITEM}${commands.slice(0, 20).join(";")}`,
        port: currentPort.port,
        writer: currentPort.writer,
      });

      setTimeout(() => {
        write({
          data: `${AT_SET_ASSIGN_STT_ITEM}${commands.slice(20).join(";")}`,
          port: currentPort.port,
          writer: currentPort.writer,
        });

        const updateItems = {
          s_assigns: updateSttDatas.s_assigns.map((item) => item?.id),
          m_assigns: updateSttDatas.m_assigns.map((item) => item?.id),
          l_assigns: updateSttDatas.l_assigns.map((item) => item?.id),
        };

        setSttData((prev) => ({
          s_assigns: prev.s_assigns.map((item) =>
            updateItems.s_assigns.includes(item.id)
              ? {
                  ...item,
                  value: "1",
                }
              : {
                  ...item,
                  value: "0",
                }
          ),
          m_assigns: prev.m_assigns.map((item) =>
            updateItems.m_assigns.includes(item.id)
              ? {
                  ...item,
                  value: "1",
                }
              : {
                  ...item,
                  value: "0",
                }
          ),
          l_assigns: prev.l_assigns.map((item) =>
            updateItems.l_assigns.includes(item.id)
              ? {
                  ...item,
                  value: "1",
                }
              : {
                  ...item,
                  value: "0",
                }
          ),
        }));

        console.log("updateSttDatas :::", updateSttDatas);

        setDefaultSttIndexes({
          s_assigns: updateSttDatas.s_assigns.map((item) => parseInt(item?.id)),
          m_assigns: updateSttDatas.m_assigns.map((item) => parseInt(item?.id)),
          l_assigns: updateSttDatas.l_assigns.map((item) => parseInt(item?.id)),
        });

        setIsFullLoading(false);
      }, 500);
    }, 500);
  };

  const handleSendAlt = () => {
    setIsFullLoading(true);
    let updateDataString = "";

    for (let i = 8; i > 0; i--) {
      updateDataString += updateAltDatas.l_assigns[i - 1] ? "1" : "0";
    }
    for (let i = 8; i > 0; i--) {
      updateDataString += updateAltDatas.m_assigns[i - 1] ? "1" : "0";
    }
    for (let i = 15; i > 0; i--) {
      updateDataString += updateAltDatas.s_assigns[i - 1] ? "1" : "0";
    }

    let updateDataString16 = parseInt(updateDataString, 2).toString(16);

    // updateDataString16 값의 길이가 8이 되도록 앞에 0을 채우고 싶어
    while (updateDataString16.length < 8) {
      updateDataString16 = "0" + updateDataString16;
    }

    const pageSAssigns = pageData?.fields?.filter(
      (item) => item.type === "sAssign"
    );

    const pageMAssigns = pageData?.fields?.filter(
      (item) => item.type === "mAssign"
    );

    const pageLAssigns = pageData?.fields?.filter(
      (item) => item.type === "lAssign"
    );

    const commands = [
      ...pageSAssigns.map(
        (item, idx) =>
          `${renderNumber(item.ID)}#${
            updateAltDatas.s_assigns?.[idx]
              ? Number(updateAltDatas.s_assigns?.[idx].id).toString(16)
                  .length === 1
                ? `0${Number(updateAltDatas.s_assigns?.[idx].id).toString(16)}`
                : Number(updateAltDatas.s_assigns?.[idx].id).toString(16)
              : "00"
          }`
      ),
      ...pageMAssigns.map(
        (item, idx) =>
          `${renderNumber(item.ID)}#${
            updateAltDatas.m_assigns?.[idx]
              ? Number(updateAltDatas.m_assigns?.[idx].id).toString(16)
                  .length === 1
                ? `0${Number(updateAltDatas.m_assigns?.[idx].id).toString(16)}`
                : Number(updateAltDatas.m_assigns?.[idx].id).toString(16)
              : "00"
          }`
      ),
      ...pageLAssigns.map(
        (item, idx) =>
          `${renderNumber(item.ID)}#${
            updateAltDatas.l_assigns?.[idx]
              ? Number(updateAltDatas.l_assigns?.[idx].id).toString(16)
                  .length === 1
                ? `0${Number(updateAltDatas.l_assigns?.[idx].id).toString(16)}`
                : Number(updateAltDatas.l_assigns?.[idx].id).toString(16)
              : "00"
          }`
      ),
    ];

    write({
      data: `${AT_SET_ASSIGN_ALT}83#${updateDataString16}`,
      port: currentPort.port,
      writer: currentPort.writer,
    });

    setTimeout(() => {
      write({
        data: `${AT_SET_ASSIGN_ALT_ITEM}${commands.slice(0, 20).join(";")}`,
        port: currentPort.port,
        writer: currentPort.writer,
      });

      setTimeout(() => {
        write({
          data: `${AT_SET_ASSIGN_ALT_ITEM}${commands.slice(20).join(";")}`,
          port: currentPort.port,
          writer: currentPort.writer,
        });

        const updateItems = {
          s_assigns: updateAltDatas.s_assigns.map((item) => item?.id),
          m_assigns: updateAltDatas.m_assigns.map((item) => item?.id),
          l_assigns: updateAltDatas.l_assigns.map((item) => item?.id),
        };

        setAltData((prev) => ({
          s_assigns: prev.s_assigns.map((item) =>
            updateItems.s_assigns.includes(item.id)
              ? {
                  ...item,
                  value: "1",
                }
              : {
                  ...item,
                  value: "0",
                }
          ),
          m_assigns: prev.m_assigns.map((item) =>
            updateItems.m_assigns.includes(item.id)
              ? {
                  ...item,
                  value: "1",
                }
              : {
                  ...item,
                  value: "0",
                }
          ),
          l_assigns: prev.l_assigns.map((item) =>
            updateItems.l_assigns.includes(item.id)
              ? {
                  ...item,
                  value: "1",
                }
              : {
                  ...item,
                  value: "0",
                }
          ),
        }));

        console.log("updateAltDatas :::", updateAltDatas);

        setDefaultAltIndexes({
          s_assigns: updateAltDatas.s_assigns.map((item) => parseInt(item?.id)),
          m_assigns: updateAltDatas.m_assigns.map((item) => parseInt(item?.id)),
          l_assigns: updateAltDatas.l_assigns.map((item) => parseInt(item?.id)),
        });

        setIsFullLoading(false);
      }, 500);
    }, 500);
  };

  return (
    <Stack direction="column" gap={"24px"} style={{ width: "100%" }}>
      {isFullLoading && <FullLoading />}
      <Tabs
        value={tab}
        onChange={(e, value) => {
          setTab(value);
        }}
        aria-label="notification"
        sx={{
          borderBottom: "1px solid var(--grey4)",
          marginBottom: "16px",
          // marginTop: "40px",
        }}
      >
        <Tab value="stt" label={"STT"} />
        <Tab value="alt" label={"ALT"} />
      </Tabs>
      <Button
        style={{ alignSelf: "flex-end" }}
        variant="contained"
        disabled={tab === "stt" ? sttPageSendDisabled : altPageSendDisabled}
        onClick={tab === "stt" ? handleSendStt : handleSendAlt}
      >
        {t("configuration.commands.send")}
      </Button>
      {tab === "stt" && (
        <div>
          <AssignMenus
            key={
              defaultSttIndexes.s_assigns.length +
              defaultSttIndexes.m_assigns.length +
              defaultSttIndexes.l_assigns.length
            }
            smallItems={(sttData["s_assigns"] || []).map((item) => ({
              id: item.id,
              name: item.title,
              description: item.description,
              value: item.value,
            }))}
            mediumItems={(sttData["m_assigns"] || []).map((item) => ({
              id: item.id,
              name: item.title,
              description: item.description,
              value: item.value,
            }))}
            largeItems={(sttData["l_assigns"] || []).map((item) => ({
              id: item.id,
              name: item.title,
              description: item.description,
              value: item.value,
            }))}
            defaultSmallIndexes={defaultSttIndexes.s_assigns}
            defaultMediumIndexes={defaultSttIndexes.m_assigns}
            defaultLargeIndexes={defaultSttIndexes.l_assigns}
            onChange={(
              smallDataIndexes,
              mediumDataIndexes,
              largeDataIndexes
            ) => {
              setUpdateSttDatas({
                s_assigns: smallDataIndexes,
                m_assigns: mediumDataIndexes,
                l_assigns: largeDataIndexes,
              });
            }}
          />
        </div>
      )}
      {tab === "alt" && (
        <div>
          <AssignMenus
            key={
              defaultAltIndexes.s_assigns.length +
              defaultAltIndexes.m_assigns.length +
              defaultAltIndexes.l_assigns.length
            }
            smallItems={(altData["s_assigns"] || []).map((item) => ({
              id: item.id,
              name: item.title,
              description: item.description,
              value: item.value,
            }))}
            mediumItems={(altData["m_assigns"] || []).map((item) => ({
              id: item.id,
              name: item.title,
              description: item.description,
              value: item.value,
            }))}
            largeItems={(altData["l_assigns"] || []).map((item) => ({
              id: item.id,
              name: item.title,
              description: item.description,
              value: item.value,
            }))}
            defaultSmallIndexes={defaultAltIndexes.s_assigns}
            defaultMediumIndexes={defaultAltIndexes.m_assigns}
            defaultLargeIndexes={defaultAltIndexes.l_assigns}
            onChange={(
              smallDataIndexes,
              mediumDataIndexes,
              largeDataIndexes
            ) => {
              setUpdateAltDatas({
                s_assigns: smallDataIndexes,
                m_assigns: mediumDataIndexes,
                l_assigns: largeDataIndexes,
              });
            }}
          />
        </div>
      )}
    </Stack>
  );
}
