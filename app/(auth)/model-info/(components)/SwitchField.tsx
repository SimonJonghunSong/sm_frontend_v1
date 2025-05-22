import { Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import { FIELD_VALIDATIONS } from "constants/field";
import { SwitchPrimary } from "@/components/switches";
import EditDot from "app/(auth)/model-info/(components)/EditDot";

interface SwitchFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  style?: React.CSSProperties;
  customChecked?: boolean;
  isRequired?: boolean;
  isDirty?: boolean;
  isUnderbarId?: boolean;
}

const SwitchField = ({
  id,
  formData,
  onChange,
  style,
  customChecked,
  isRequired,
  isDirty = false,
  isUnderbarId = false,
}: SwitchFieldProps) => {
  const lang = useLangStore((state) => state.lang);

  const realId = isUnderbarId ? `${id}_${1}` : id;
  if (!formData[id]) return null;

  return (
    <Stack
      width={"100%"}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      style={style}
    >
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title>
          {FIELD_VALIDATIONS[realId].title[lang]}
          {isRequired && (
            <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
          )}
        </InputBox.Title>
        <InputBox.Info
          tooltipText={
            <span style={{ whiteSpace: "pre-wrap" }}>
              {FIELD_VALIDATIONS[realId].tooltip[lang]}
            </span>
          }
        />
        <InputBox.Number>{id}</InputBox.Number>
        {isDirty && <EditDot />}
      </Stack>
      <SwitchPrimary
        onChange={(e) => onChange(id, e.target.checked ? "01" : "00")}
        checked={
          typeof customChecked === "boolean"
            ? customChecked
            : formData[id].realValue === "01"
        }
      />
    </Stack>
  );
};

export default SwitchField;
