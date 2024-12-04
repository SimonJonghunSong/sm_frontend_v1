"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useSerial from "@/src/hooks/useSerial";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import { Button, Stack } from "@mui/material";
import FieldRenderer from "./components/FieldRenderer";
import Controller from "./components/Controller";
import { AT_CMD, AT_EDIT_PREFIX, CR } from "@/src/hooks/useSerial/constant";
import useSerialStore from "@/src/stores/useSerialStore";
import FullLoading from "@/components/FullLoading";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { useTranslations } from "next-intl";

export default function page() {
  const t = useTranslations();
  const { getCurrentImei, getTab } = useSerialConfigurationStore();
  const imei = getCurrentImei();
  const tab = getTab();
  const { setJsonPackageOfSerialPortForUpdate } = useSerialStore();
  const [isFullLoading, setIsFullLoading] = useState(false);

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
      toast("Save Success!", { type: "success" });
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
          toast(message, { type: "default" });
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

  return (
    <form className="contentWrap">
      {isFullLoading && <FullLoading />}
      <Controller />

      <Stack direction="row" justifyContent="space-between">
        <div className="pageTitle">{pageData?.tabName || ""}</div>
        {true && (
          <Button
            variant="contained"
            disabled={tab !== "Command String" && isSaveDisabled}
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
