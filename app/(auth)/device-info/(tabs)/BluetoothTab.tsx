import { Dispatch, SetStateAction } from "react";
import { FormField } from "../page";
import { Stack } from "@mui/material";
import { Ble, Sensor } from "../(bluetooth)/@index";

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

export default function BluetoothTab({ formData, setFormData }: Props) {
  const handleValueChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: { value, realValue: value, list: prev[name].list },
    }));
  };

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <Ble formData={formData} onChange={handleValueChange} />

      {/* TODO BLE Registration 추가 */}

      <Sensor formData={formData} onChange={handleValueChange} />
    </Stack>
  );
}
