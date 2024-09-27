"use client";

import { useSearchParams } from "next/navigation";
import useSerial from "@/src/hooks/useSerial";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import { Button, Stack } from "@mui/material";
import FieldRenderer from "./components/FieldRenderer";
import Controller from "./components/Controller";
import { useContext, useEffect, useMemo, useState } from "react";
import { configurationPageContext } from "./layout";
import { AT_EDIT_PREFIX } from "@/src/hooks/useSerial/constant";
import useSerialStore from "@/src/stores/useSerialStore";
import FullLoading from "@/components/FullLoading";

export default function page() {
  const searchParams = useSearchParams();
  const { setJsonPackageOfSerialPortForUpdate } = useSerialStore();
  const [isFullLoading, setIsFullLoading] = useState(false);
  const { tab } = useContext(configurationPageContext);

  // data
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const currentPort = portList.find(
    ({ port }) => port.imei === searchParams.get("imei")
  );

  const { originData, formData, getFormFields, resetData, getEditDataForPage } =
    useTransformedConfigData({
      data: portList.find(({ port }) => port.imei === searchParams.get("imei"))
        .packageToJson.synctrak,
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
    const imei = searchParams.get("imei");

    currentPort.port.onprev = () => {
      resetData();
    };
    currentPort.port.oneditsuccess = () => {
      setJsonPackageOfSerialPortForUpdate({ imei, payload: originData });
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
