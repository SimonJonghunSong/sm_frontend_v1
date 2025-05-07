import { Dispatch, SetStateAction } from "react";
import { FormField } from "../page";
import { Stack } from "@mui/material";
import Driver from "app/(auth)/device-info/(driver)/Driver";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: FormField;
    }>
  >;
  isReady: boolean;
  write?: (command: string) => Promise<Boolean>;
  port?: SerialPort;
}

export default function DriverTab({
  formData,
  setFormData,
  isReady,
  write,
  port,
}: Props) {
  const handleValueChange = (name, value, alertId = undefined) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        value,
        key: prev[name].key,
        realValue: value,
        list: prev[name].list,
        alert_id: alertId,
      },
    }));
  };

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <Driver
        formData={formData}
        onChange={handleValueChange}
        isReady={isReady}
        write={write}
        port={port}
      />
    </Stack>
  );
}
