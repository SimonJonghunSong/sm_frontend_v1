import { Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import { FIELD_VALIDATIONS } from "constants/field";
import { SwitchPrimary } from "@/components/switches";

interface SwitchFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  style?: React.CSSProperties;
  customChecked?: boolean;
}

const SwitchField = ({
  id,
  formData,
  onChange,
  style,
  customChecked,
}: SwitchFieldProps) => {
  const lang = useLangStore((state) => state.lang);

  if (!formData[id]) return null;

  return (
    <Stack
      width={"calc(50% - 8px)"}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      style={style}
    >
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title>{FIELD_VALIDATIONS[id].title[lang]}</InputBox.Title>
        <InputBox.Info
          tooltipText={
            <span style={{ whiteSpace: "pre-wrap" }}>
              {FIELD_VALIDATIONS[id].tooltip[lang]}
            </span>
          }
        />
        <InputBox.Number>{id}</InputBox.Number>
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
