import { Dispatch, SetStateAction } from "react";
import { FormField } from "../page";
import { Stack } from "@mui/material";
import Driver from "app/(auth)/device-info/(driver)/Driver";

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

export default function DriverTab({ formData, setFormData }: Props) {
  const handleValueChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: { value, realValue: value, list: prev?.[name]?.list || [] },
    }));
  };

  return (
    <Stack className="contentWrap" direction="column" gap={"20px"}>
      <Driver formData={formData} onChange={handleValueChange} />
    </Stack>
  );
}
