import { Dispatch, SetStateAction } from "react";
import { FormField, AssignItem } from "../page";
import { Stack } from "@mui/material";
import Report from "../(report)/Report";
import {
  AlertConfig,
  AntiTheft,
  OBD,
  ObdPid,
  ReportSchdule,
} from "../(report)/@index";
import ReportMapping from "../(report)/ReportMapping";
import ReportMapping2 from "../(report)/ReportMapping2";
import AssignHeader from "../(report)/AssignHeader";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: FormField;
    }>
  >;
  csvData: {
    p1: string;
    p2: string;
    p3: string;
    p4: string;
    p5: string;
    p6: string;
    p7: string;
    p8: string;
    p9: string;
  }[];
}

export default function ReportTab({ formData, setFormData, csvData }: Props) {
  const handleValueChange = (
    name,
    value,
    selectValue = undefined,
    alertId = undefined
  ) => {
    console.log(name, value, selectValue, alertId);

    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: selectValue || value,
        realValue: value,
        alert_id: alertId,
      },
    }));
  };

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <Report
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <AntiTheft
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <ReportMapping
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <ReportMapping2
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <AssignHeader
        formData={formData}
        setFormData={setFormData}
        csvData={csvData}
      />

      <AlertConfig
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <OBD
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <ObdPid
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <ReportSchdule
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />
    </Stack>
  );
}
