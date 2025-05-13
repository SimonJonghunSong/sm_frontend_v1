import { Dispatch, SetStateAction } from "react";
import { FormField } from "../page";
import { Stack } from "@mui/material";
import { Ble, Sensor } from "../(bluetooth)/@index";
import BleRegistration from "../(bluetooth)/BleRegistration";
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
  // isReady: boolean;
  // write: any;
  // port: SerialPortState;
}

export default function BluetoothTab({
  formData,
  setFormData,
}: // isReady,
// write,
// port,
Props) {
  const handleValueChange = (name, value, alertId = undefined) => {
    setFormData((prev) => ({
      ...prev,
      [name]: {
        value,
        key: name,
        realValue: value,
        list: prev[name].list,
        alert_id: alertId,
      },
    }));
  };

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <Ble formData={formData} onChange={handleValueChange} />

      {/* <BleRegistration
        formData={formData}
        onChange={handleValueChange}
        isReady={isReady}
        write={write}
        port={port}
      /> */}

      <Sensor formData={formData} onChange={handleValueChange} />
    </Stack>
  );
}
