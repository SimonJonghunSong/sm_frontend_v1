import { MenuItem, Select, Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import InputBox from "@/components/inputbox/InputBox";
import { FormField } from "../page";

interface SelectFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  isRequired?: boolean;
}

const SelectField = ({
  id,
  formData,
  onChange,
  isRequired,
}: SelectFieldProps) => {
  const lang = useLangStore((state) => state.lang);

  if (!formData[id]) return null;
  const hardwareList = formData[id].list;

  return (
    <Stack width={"calc(50% - 8px)"} gap={"8px"}>
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title>
          {FIELD_VALIDATIONS[id].title[lang]}
          {isRequired && (
            <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
          )}
        </InputBox.Title>
        <InputBox.Info
          tooltipText={
            <span style={{ whiteSpace: "pre-wrap" }}>
              {FIELD_VALIDATIONS[id].tooltip[lang]}
            </span>
          }
        />
        <InputBox.Number>{id}</InputBox.Number>
      </Stack>

      <Stack>
        <Select
          value={formData[id].realValue}
          style={{ width: "100%" }}
          onChange={(e) => onChange(id, e.target.value)}
        >
          {FIELD_VALIDATIONS[id].list
            .filter((listItem) => hardwareList.includes(listItem.value))
            .map((item) => (
              <MenuItem key={item.value} value={item.value}>
                {item.label[lang]}
              </MenuItem>
            ))}
        </Select>
      </Stack>
    </Stack>
  );
};

export default SelectField;
