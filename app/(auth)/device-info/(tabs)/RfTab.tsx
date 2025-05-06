import { Stack } from "@mui/material";
import ErbList from "app/(auth)/device-info/(rf)/ErbList";
import LoRaWAN from "app/(auth)/device-info/(rf)/LoRaWAN";
import PresenceDevice from "app/(auth)/device-info/(rf)/PresenceDevice";
import PresenceFunction from "app/(auth)/device-info/(rf)/PresenceFunction";
import Rf from "app/(auth)/device-info/(rf)/Rf";
import { FormField } from "app/(auth)/device-info/page";
import { SetStateAction } from "react";
import { Dispatch } from "react";

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

export default function RfTab({ formData, setFormData }: Props) {
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
      <Rf formData={formData} onChange={handleValueChange} />

      <ErbList formData={formData} onChange={handleValueChange} />

      <PresenceFunction formData={formData} onChange={handleValueChange} />

      <PresenceDevice formData={formData} onChange={handleValueChange} />

      <LoRaWAN formData={formData} onChange={handleValueChange} />
    </Stack>
  );
}
