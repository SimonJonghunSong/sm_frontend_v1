"use client";

import { useSearchParams } from "next/navigation";
import useSerial, { delayPromise } from "../../../src/hooks/useSerial";
import { useTransformedConfigData } from "../../../src/hooks/useTransformConfigData";
import { Button, Stack } from "@mui/material";
import FieldRenderer from "./components/FieldRenderer";
import Controller from "./components/Controller";
import { useContext, useMemo } from "react";
import { toast } from "react-toastify";
import { configurationPageContext } from "./layout";
import {
  AT_EDIT_PREFIX,
  AT_GET_JSON,
} from "../../../src/hooks/useSerial/constant";
import useSerialStore from "../../../src/stores/useSerialStore";

export default function page() {
  const searchParams = useSearchParams();
  const { setPackageFetchingStart } = useSerialStore();
  const { tab } = useContext(configurationPageContext);

  // data
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const currentPort = portList.find(
    ({ port }) => port.imei === searchParams.get("imei")
  );

  console.log(currentPort.isPackageFetching, ": currentPort.isPackageFetching");

  const { formData, getFormFields, resetData, getEditDataForPage } =
    useTransformedConfigData({
      data: portList.find(({ port }) => port.imei === searchParams.get("imei"))
        .packageToJson.synctrak,
      blacklist: ["info"],
    });

  const pageData = useMemo(() => {
    return (formData || []).find((item) => item.tabName === tab);
  }, [formData, tab]);

  const getJsonPacket = async () => {
    currentPort.port.grpNo = currentPort.jsonPackageCount;
    setPackageFetchingStart({ imei: currentPort.port.imei });

    const commands = Array.from(
      { length: currentPort.jsonPackageCount },
      (_, i) => `${AT_GET_JSON}${i + 1}`
    );

    for (const command of commands) {
      await delayPromise(300); // 300ms 지연

      write({
        data: command,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    }
  };

  const handleSaveSettings = async () => {
    const imei = searchParams.get("imei");

    currentPort.port.onprev = () => {
      console.log("onprev");
    };

    getEditDataForPage(tab).forEach((item) => {
      console.log(">>>>>>", `${AT_EDIT_PREFIX}${imei};${item}`);

      write({
        data: `${AT_EDIT_PREFIX}${imei};${item}`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    });
  };

  return (
    <form className="contentWrap">
      <Controller />

      <Stack direction="row" justifyContent="space-between">
        <div className="pageTitle">{pageData?.tabName || ""}</div>
        {true && (
          <Button
            variant="contained"
            // disabled={!getEditDataForPage(tab).length}
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
