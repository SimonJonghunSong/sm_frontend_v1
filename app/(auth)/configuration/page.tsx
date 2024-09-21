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

  const { formData, getFormFields, resetData, isDirty } =
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
    const tabId = pageData.info.tab_id;

    const params = (pageData.fields as Field[]).reduce(
      (previousValue, currentValue) => {
        const cur = currentValue;
        let fieldId;
        let value = "";
        if (Number(cur.ID) < 10) {
          fieldId = `0${cur.ID}`;
        } else {
          fieldId = cur.ID;
        }

        if (currentValue.type === "combo" && currentValue.value) {
          value = currentValue.options.find(
            (opt) => opt.value === currentValue.value
          ).realValue;
          if (
            Number(
              currentValue.options.find(
                (opt) => opt.value === currentValue.value
              ).realValue
            ) < 10
          ) {
            value = `0${
              currentValue.options.find(
                (opt) => opt.value === currentValue.value
              ).realValue
            }`;
          }
        } else {
          value = currentValue.value;
        }

        return `${previousValue}${fieldId}#${value};`;
      },
      "" as string
    );
    console.log(`${AT_EDIT_PREFIX}${imei};${tabId};${params}`);
    write({
      data: `${AT_EDIT_PREFIX}${imei};${tabId};${params}`,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  return (
    <form className="contentWrap">
      <Controller />

      <Stack direction="row" justifyContent="space-between">
        <div className="pageTitle">{pageData?.tabName || ""}</div>
        {true && (
          <Button variant="contained" onClick={() => handleSaveSettings()}>
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
    </form>
  );
}
