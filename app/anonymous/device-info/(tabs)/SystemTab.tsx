import { Dispatch, SetStateAction } from "react";
import { FormField } from "../page";
import { Stack } from "@mui/material";
import {
  BackupBattery,
  DriverPattern,
  Ignition,
  Motion,
  Power,
  Password,
  Device,
  TdiOdometer,
  McuUpdate,
} from "../(system)/@index";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: FormField;
    }>
  >;
  port: SerialPort;
  originData: any;
}

export default function SystemTab({
  formData,
  setFormData,
  port,
  originData,
}: Props) {
  const handleValueChange = (name, value, alertId = undefined) => {
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
  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <Ignition
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <Motion
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <DriverPattern
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <Power
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
        originData={originData}
      />

      <BackupBattery
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <Password
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
        port={port}
      />

      <Device
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <TdiOdometer
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <McuUpdate
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />
    </Stack>
  );
}
