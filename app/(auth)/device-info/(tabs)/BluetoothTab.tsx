import { Dispatch, SetStateAction } from "react";
import { FormField } from "../page";
import { Stack } from "@mui/material";
import { Ble, Sensor } from "../(bluetooth)/@index";
import BleRegistration from "app/(auth)/device-info/(bluetooth)/BleRegistration";
import { SerialPortState } from "@/src/stores/useSerialStore";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: FormField;
    }>
  >;
  isReady: boolean;
  write: any;
  port: SerialPortState;
  originData: any;
}

export default function BluetoothTab({
  formData,
  setFormData,
  isReady,
  write,
  port,
  originData,
}: Props) {
  const infoFields = originData?.map(
    (shit) => Object.values(shit)[0][0].info?.[0]
  ) || [];

  const bleRegistrationMax =
    infoFields.find((shit) => shit?.tab_id === "41")?.max * 1 || 0;

  const handleValueChange = (name, value, alertId = undefined) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        ...prev[name],
        value,
        key: name,
        realValue: value,
        alert_id: alertId,
      },
    }));
  };

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <Ble
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
        originData={originData}
      />

      <BleRegistration
        formData={formData}
        onChange={handleValueChange}
        isReady={isReady}
        write={write}
        port={port}
        bleRegistrationMax={bleRegistrationMax}
      />

      <Sensor
        formData={formData}
        onChange={handleValueChange}
        setFormData={setFormData}
      />
    </Stack>
  );
}
