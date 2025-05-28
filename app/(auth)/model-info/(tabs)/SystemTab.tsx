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
  originData: any;
}

export default function SystemTab({
  formData,
  setFormData,
  originData,
}: Props) {
  const handleValueChange = (name, value, selectValue = undefined) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value: selectValue || value,
        realValue: value,
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
