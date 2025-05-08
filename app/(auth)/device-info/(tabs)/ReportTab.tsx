import { Dispatch, SetStateAction } from "react";
import { FormField } from "../page";
import { Stack } from "@mui/material";
import Report from "../(report)/Report";
import {
  AlertConfig,
  AntiTheft,
  OBD,
  ObdPid,
  ReportSchdule,
} from "../(report)/@index";
import ReportMapping from "app/(auth)/device-info/(report)/ReportMapping";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: FormField;
    }>
  >;
}

export default function ReportTab({ formData, setFormData }: Props) {
  const handleValueChange = (name, value, alertId = undefined) => {
    console.log(name, value, alertId);
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
      <Report formData={formData} onChange={handleValueChange} />

      <AntiTheft formData={formData} onChange={handleValueChange} />

      <ReportMapping formData={formData} onChange={handleValueChange} />

      <AlertConfig formData={formData} onChange={handleValueChange} />

      <OBD formData={formData} onChange={handleValueChange} />

      <ObdPid formData={formData} onChange={handleValueChange} />

      <ReportSchdule formData={formData} onChange={handleValueChange} />
    </Stack>
  );
}
