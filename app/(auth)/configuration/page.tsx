"use client";

import { useSearchParams } from "next/navigation";
import useSerial from "../../../src/hooks/useSerial";
import {
  Field,
  useTransformedConfigData,
} from "../../../src/hooks/useTransformConfigData";
import { Button, Stack } from "@mui/material";
import FieldRenderer from "./components/FieldRenderer";
import Controller from "./components/Controller";
import { useContext, useMemo } from "react";
import { configurationPageContext } from "./layout";
import { AT_EDIT_PREFIX } from "../../../src/hooks/useSerial/constant";

export default function page() {
  const searchParams = useSearchParams();
  const { tab } = useContext(configurationPageContext);

  // data
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const currentPort = portList.find(
    ({ port }) => port.imei === searchParams.get("imei")
  );

  const { formData, getFormFields, resetData, getEditDataForPage } =
    useTransformedConfigData({
      data: portList.find(({ port }) => port.imei === searchParams.get("imei"))
        .packageToJson.synctrak,
      blacklist: ["info"],
    });

  const pageData = useMemo(() => {
    return (formData || []).find((item) => item.tabName === tab);
  }, [formData, tab]);

  const handleSaveSettings = () => {
    const imei = searchParams.get("imei");

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
            disabled={!getEditDataForPage(tab).length}
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
