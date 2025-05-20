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
import ReportMapping from "../(report)/ReportMapping";
import ReportMapping2 from "../(report)/ReportMapping2";
import AssignHeader from "../(report)/AssignHeader";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";

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
        ...prev[name],
        value,
        realValue: value,
        alert_id: alertId,
      },
    }));
  };
  const { getCurrentImei } = useSerialConfigurationStore();

  const imei = getCurrentImei();

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

      <AssignHeader formData={formData} imei={imei} setFormData={setFormData} />

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
