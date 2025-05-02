import { Dispatch, SetStateAction } from "react";
import Network from "../(network)/Network";
import { FormField } from "../page";
import APN from "../(network)/APN";
import { Stack } from "@mui/material";
import MainServer from "../(network)/MainServer";
import BackupServer from "../(network)/BackupServer";
import AGPSMode from "../(network)/AGPSMode";
import {
  Call,
  JammingDetection,
  MaintenanceServer,
  NTPServer,
  Satellite,
  Sms,
} from "../(network)/@index";

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

export default function NetworkTab({ formData, setFormData }: Props) {
  const handleValueChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: { value, realValue: value, list: prev[name].list },
    }));
  };

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <Network formData={formData} onChange={handleValueChange} />

      <APN formData={formData} onChange={handleValueChange} />

      <MainServer formData={formData} onChange={handleValueChange} />

      <BackupServer formData={formData} onChange={handleValueChange} />

      <AGPSMode formData={formData} onChange={handleValueChange} />

      <MaintenanceServer formData={formData} onChange={handleValueChange} />

      <NTPServer formData={formData} onChange={handleValueChange} />

      <Satellite formData={formData} onChange={handleValueChange} />

      <JammingDetection formData={formData} onChange={handleValueChange} />

      <Sms formData={formData} onChange={handleValueChange} />

      <Call formData={formData} onChange={handleValueChange} />
    </Stack>
  );
}
