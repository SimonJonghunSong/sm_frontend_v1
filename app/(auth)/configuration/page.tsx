"use client";

import { useContext, useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";
import useSerial from "@/src/hooks/useSerial";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import { Button, Stack } from "@mui/material";
import FieldRenderer from "./components/FieldRenderer";
import Controller from "./components/Controller";
import { AT_EDIT_PREFIX } from "@/src/hooks/useSerial/constant";
import useSerialStore from "@/src/stores/useSerialStore";
import FullLoading from "@/components/FullLoading";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";

export default function page() {
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

    getEditDataForPage(tab).forEach((item) => {
      write({
        data: `${AT_EDIT_PREFIX}${imei};${item}`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    });
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
            disabled={isSaveDisabled}
            onClick={() => handleSaveSettings()}
          >
            Save Settings
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
      <Button onClick={resetData}>Reset Test</Button>
      <Button
        onClick={() => {
          console.log("editData >>>>", getEditDataForPage(tab));
        }}
        disabled={!getEditDataForPage(tab).length}
      >
        Save Test
      </Button>
    </form>
  );
}
