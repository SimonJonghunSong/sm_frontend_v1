"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "react-toastify";
import useSerial from "@/src/hooks/useSerial";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import { Button, Stack } from "@mui/material";
import FieldRenderer from "./components/FieldRenderer";
import Controller from "./components/Controller";
import {
  AT_CMD,
  AT_EDIT_PREFIX,
  AT_GET_ASSIGN_MAP_ALT,
  AT_GET_ASSIGN_MAP_STT,
  AT_GET_CSV,
  AT_SET_ASSIGN_ALT,
  AT_SET_ASSIGN_ALT_ITEM,
  AT_SET_ASSIGN_STT,
  AT_SET_ASSIGN_STT_ITEM,
  CR,
} from "@/src/hooks/useSerial/constant";
import useSerialStore from "@/src/stores/useSerialStore";
import FullLoading from "@/components/FullLoading";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { useTranslations } from "next-intl";
import AssignMenus from "@/components/AssignMenus";
import { parseAssigns } from "@/components/AssignMenus/utils";

const renderNumber = (value: string) => {
  console.log("renderNumber value :::", value);

  return Number(isNaN(Number(value)) ? 0 : Number(value)) < 10
    ? `0${value}`
    : value;
};

export default function page() {
  const t = useTranslations();
  const { getCurrentImei, getTab } = useSerialConfigurationStore();
  const imei = getCurrentImei();
  const tab = getTab();
  const { setJsonPackageOfSerialPortForUpdate } = useSerialStore();
  const [isFullLoading, setIsFullLoading] = useState(false);
  const csvDataRef = useRef("");

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

  console.log("altData :::", altData);

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

  // data
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const currentPort = portList.find(({ port }) => port.imei === imei);

  const { originData, formData, getFormFields, resetData, getEditDataForPage } =
    useTransformedConfigData({
      data: portList.find(({ port }) => port.imei === imei).packageToJson
        .synctrak,
      blacklist: ["info", "Circular Geofence", "Polygon Geofence"],
    });

  const pageData = useMemo(() => {
    return (formData || []).find((item) => item.tabName === tab);
  }, [formData, tab]);

  const isSaveDisabled = useMemo(
    () => !getEditDataForPage(tab).length,
    [getEditDataForPage]
  );

  const handleSaveSettings = () => {
    currentPort.port.onprev = () => {
      resetData();
    };
    currentPort.port.oneditsuccess = () => {
      setJsonPackageOfSerialPortForUpdate({ imei, payload: originData });
      // toast("Save Success!", { type: "success" });
    };

    if (tab === "Command String") {
      const list = formData.find(({ info }) => info.hdr === "CMD").fields[0]
        .list;
      const index = getEditDataForPage(tab)[0]
        ? Number(getEditDataForPage(tab)[0].split("#")[1])
        : 0;
      const item = list[0][index].split(";")[4];

      let message = "";

      currentPort.port.onbuffervalue = (value) => {
        console.log(value, "value onbuffervalue");
        message += value;
        if (value.includes(CR)) {
          // toast(message, { type: "default" });
        }
      };

      if (list) {
        write({
          data: `${AT_CMD}${imei};${item.slice(0, 2)};${item.slice(2)}`,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      }
    } else {
      getEditDataForPage(tab).forEach((item) => {
        write({
          data: `${AT_EDIT_PREFIX}${imei};${item}`,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      });
    }
  };

  useEffect(() => {
    if (!currentPort.port.writable || !currentPort.port.readable) {
      setIsFullLoading(true);
    } else {
      setIsFullLoading(false);
    }
  }, [
    currentPort.port.writable,
    currentPort.port.readable,
    currentPort.port.ismodelinfofetching,
  ]);

  useEffect(() => {
    if (!currentPort.port.writable || !currentPort.port.readable) {
      return;
    }

    if (currentPort.port.isReadyToUse) {
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

            const sItemsArray = sItems.split(",");
            const mItemsArray = mItems.split(",");
            const lItemsArray = lItems.split(",");

            const parseData = parseAssigns(csvDataRef.current);

            console.log("parseData :::", parseData);

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

  const renderAltAssignMenus = useCallback(() => {
    return (
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
        onChange={(smallDataIndexes, mediumDataIndexes, largeDataIndexes) => {
          setUpdateAltDatas({
            s_assigns: smallDataIndexes,
            m_assigns: mediumDataIndexes,
            l_assigns: largeDataIndexes,
          });
        }}
      />
    );
  }, [altData]);

  const renderSttAssignMenus = useCallback(() => {
    return (
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
        onChange={(smallDataIndexes, mediumDataIndexes, largeDataIndexes) => {
          setUpdateSttDatas({
            s_assigns: smallDataIndexes,
            m_assigns: mediumDataIndexes,
            l_assigns: largeDataIndexes,
          });
        }}
      />
    );
  }, [sttData]);

  const handleSendStt = () => {
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

        setDefaultSttIndexes({
          s_assigns: updateSttDatas.s_assigns.map((item) => parseInt(item?.id)),
          m_assigns: updateSttDatas.m_assigns.map((item) => parseInt(item?.id)),
          l_assigns: updateSttDatas.l_assigns.map((item) => parseInt(item?.id)),
        });
      }, 500);
    }, 500);
  };

  const handleSendAlt = () => {
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

    console.log("updateDataString :::", updateDataString);

    let updateDataString16 = parseInt(updateDataString, 2).toString(16);

    // updateDataString16 값의 길이가 8이 되도록 앞에 0을 채우고 싶어
    while (updateDataString16.length < 8) {
      updateDataString16 = "0" + updateDataString16;
    }

    console.log("updateDataString16 :::", updateDataString16);

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

        setDefaultAltIndexes({
          s_assigns: updateAltDatas.s_assigns.map((item) => parseInt(item?.id)),
          m_assigns: updateAltDatas.m_assigns.map((item) => parseInt(item?.id)),
          l_assigns: updateAltDatas.l_assigns.map((item) => parseInt(item?.id)),
        });
      }, 500);
    }, 500);

    console.log("commands :::", commands);
    console.log("commands :::", commands.slice(0, 20));
    console.log("commands :::", commands.slice(20));
  };

  if (tab === "ASSIGN HEADER(STT)") {
    return (
      <form key={tab} className="contentWrap">
        {isFullLoading && <FullLoading />}
        <Controller />

        <Stack direction="row" justifyContent="space-between">
          <div className="pageTitle">{pageData?.tabName || ""}</div>
          {true && (
            <Button
              variant="contained"
              disabled={sttPageSendDisabled}
              onClick={handleSendStt}
            >
              {t("configuration.commands.send")}
            </Button>
          )}
        </Stack>
        <Stack direction="row" gap="40px" mb="56px">
          {renderSttAssignMenus()}
        </Stack>
      </form>
    );
  }

  if (tab === "ASSIGN HEADER(ALT)") {
    return (
      <form key={tab} className="contentWrap">
        {isFullLoading && <FullLoading />}
        <Controller />

        <Stack direction="row" justifyContent="space-between">
          <div className="pageTitle">{pageData?.tabName || ""}</div>
          {true && (
            <Button
              variant="contained"
              disabled={altPageSendDisabled}
              onClick={handleSendAlt}
            >
              {t("configuration.commands.send")}
            </Button>
          )}
        </Stack>
        <Stack direction="row" gap="40px" mb="56px">
          {renderAltAssignMenus()}
        </Stack>
      </form>
    );
  }

  return (
    <form className="contentWrap">
      {isFullLoading && <FullLoading />}
      <Controller />

      <Stack direction="row" justifyContent="space-between">
        <div className="pageTitle">{pageData?.tabName || ""}</div>
        {true && (
          <Button
            variant="contained"
            disabled={
              (tab !== "Command String" && isSaveDisabled) ||
              currentPort.isDisconnected
            }
            onClick={() => handleSaveSettings()}
          >
            {t("configuration.commands.send")}
          </Button>
        )}
      </Stack>
      <Stack direction="row" gap="40px" mb="56px">
        <Stack sx={{ width: "50%" }}>
          {(pageData?.fields || [])
            .filter((_, idx) => idx % 2 === 0)
            .map((item, idx) => {
              const { value, onChange, isChange } = getFormFields(
                pageData?.tabName,
                item.fieldName
              );

              return (
                <FieldRenderer
                  key={idx.toString()}
                  value={value}
                  onChange={onChange}
                  field={item}
                  isChange={isChange}
                />
              );
            })}
        </Stack>
        <Stack sx={{ width: "50%" }}>
          {(pageData?.fields || [])
            .filter((_, idx) => idx % 2 === 1)
            .map((item, idx) => {
              const { value, onChange, isChange } = getFormFields(
                pageData?.tabName,
                item.fieldName
              );

              return (
                <FieldRenderer
                  key={idx.toString()}
                  value={value}
                  onChange={onChange}
                  field={item}
                  isChange={isChange}
                />
              );
            })}
        </Stack>
      </Stack>
      <Button onClick={resetData}>Reset</Button>
    </form>
  );
}
