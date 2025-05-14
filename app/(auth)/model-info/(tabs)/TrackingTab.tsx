import { Dispatch, SetStateAction } from "react";
import { FormField } from "../page";
import { Stack } from "@mui/material";
import {
  DriveMode,
  InstallMode,
  ParkMode,
  IdleMode,
  SpeedingMode,
  TowingMode,
  DisconnectMode,
  OperationMode,
  FineTracking,
  ModeSettings,
} from "../(tracking)/@index";

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

export default function TrackingTab({ formData, setFormData }: Props) {
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
      <DriveMode formData={formData} onChange={handleValueChange} />

      <InstallMode formData={formData} onChange={handleValueChange} />

      <ParkMode formData={formData} onChange={handleValueChange} />

      <IdleMode formData={formData} onChange={handleValueChange} />

      <SpeedingMode formData={formData} onChange={handleValueChange} />

      <TowingMode formData={formData} onChange={handleValueChange} />

      <DisconnectMode formData={formData} onChange={handleValueChange} />

      <OperationMode formData={formData} onChange={handleValueChange} />

      <ModeSettings formData={formData} onChange={handleValueChange} />

      <FineTracking formData={formData} onChange={handleValueChange} />
    </Stack>
  );
}
