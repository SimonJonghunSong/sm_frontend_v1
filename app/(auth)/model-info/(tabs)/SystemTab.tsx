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
}

export default function SystemTab({ formData, setFormData }: Props) {
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
      <Ignition formData={formData} onChange={handleValueChange} />

      <Motion formData={formData} onChange={handleValueChange} />

      <DriverPattern formData={formData} onChange={handleValueChange} />

      <Power formData={formData} onChange={handleValueChange} />

      <BackupBattery formData={formData} onChange={handleValueChange} />

      <Password formData={formData} onChange={handleValueChange} />

      <Device formData={formData} onChange={handleValueChange} />

      <TdiOdometer formData={formData} onChange={handleValueChange} />

      <McuUpdate formData={formData} onChange={handleValueChange} />
    </Stack>
  );
}
