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
  const handleValueChange = (name, value, selectValue = undefined) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev?.[name],
        value: selectValue || value,
        realValue: value,
      },
    }));
  };

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <Network
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <APN
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <MainServer
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <BackupServer
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <AGPSMode
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <MaintenanceServer
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <NTPServer
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <Satellite
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <JammingDetection
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <Sms
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />

      <Call
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />
    </Stack>
  );
}
