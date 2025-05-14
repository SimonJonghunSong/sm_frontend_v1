import { Dispatch, SetStateAction } from "react";
import { FormField } from "../page";
import { Stack } from "@mui/material";
import {
  Accessories,
  MDSM7,
  SerialRs232,
  WireSettings,
} from "../(accessories)/@index";

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

export default function AccessoriesTab({ formData, setFormData }: Props) {
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
      <WireSettings formData={formData} onChange={handleValueChange} />

      <SerialRs232 formData={formData} onChange={handleValueChange} />

      <Accessories formData={formData} onChange={handleValueChange} />

      <MDSM7 formData={formData} onChange={handleValueChange} />
    </Stack>
  );
}
