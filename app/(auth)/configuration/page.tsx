"use client";

import { useSearchParams } from "next/navigation";
import useSerial from "../../../src/hooks/useSerial";
import { useTransformedConfigData } from "../../../src/hooks/useTransformConfigData";
import { Button, Stack } from "@mui/material";
import FieldRenderer from "./components/FieldRenderer";
import Controller from "./components/Controller";
import { useContext, useMemo } from "react";
import { configurationPageContext } from "./layout";

export default function page() {
  const searchParams = useSearchParams();
  const { tab } = useContext(configurationPageContext);

  // data
  const {
    state: { portList },
  } = useSerial();

  const { formData, getFormFields, resetData } = useTransformedConfigData({
    data: portList.find(({ port }) => port.imei === searchParams.get("imei"))
      .packageToJson.synctrak,
    blacklist: ["info"],
  });

  const pageData = useMemo(() => {
    return (formData || []).find((item) => item.tabName === tab);
  }, [formData, tab]);

  // usePrompt(isDirty);

  return (
    <form className="contentWrap">
      <Controller />

      <div className="pageTitle">{pageData?.tabName || ""}</div>
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
