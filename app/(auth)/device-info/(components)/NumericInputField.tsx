import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import { Stack, TextField } from "@mui/material";
import { FIELD_VALIDATIONS } from "constants/field";

interface InputFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  style?: React.CSSProperties;
  isRequired?: boolean;
}

const NumericInputField = ({
  id,
  formData,
  onChange,
  style,
  isRequired,
}: InputFieldProps) => {
  const lang = useLangStore((state) => state.lang);

  if (!formData[id]) return null;

  const isMinMaxError =
    typeof FIELD_VALIDATIONS[id].min === "number" &&
    typeof FIELD_VALIDATIONS[id].max === "number" &&
    (Number(formData[id].realValue) < FIELD_VALIDATIONS[id].min ||
      Number(formData[id].realValue) > FIELD_VALIDATIONS[id].max);

  return (
    <Stack width={"calc(50% - 8px)"} gap={"8px"} style={style}>
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title>
          {FIELD_VALIDATIONS[id].title[lang]}
          {isRequired && (
            <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
          )}
        </InputBox.Title>
        {FIELD_VALIDATIONS[id].tooltip?.[lang] && (
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {FIELD_VALIDATIONS[id].tooltip[lang]}
              </span>
            }
          />
        )}
        <InputBox.Number>{id}</InputBox.Number>
      </Stack>

      <Stack>
        <TextField
          value={formData[id].realValue}
          type="number"
          error={isMinMaxError}
          helperText={
            isMinMaxError
              ? getMinMaxErrorMessage(
                  lang,
                  FIELD_VALIDATIONS[id].min,
                  FIELD_VALIDATIONS[id].max
                )
              : undefined
          }
          inputProps={
            typeof FIELD_VALIDATIONS[id].min === "number" &&
            typeof FIELD_VALIDATIONS[id].max === "number"
              ? {
                  min: FIELD_VALIDATIONS[id].min,
                  max: FIELD_VALIDATIONS[id].max,
                  inputMode: "numeric",
                }
              : undefined
          }
          onChange={(e) => onChange(id, e.target.value)}
        />
      </Stack>
    </Stack>
  );
};

export default NumericInputField;

const getMinMaxErrorMessage = (lang: string, min: number, max: number) => {
  const errorMessage = {
    en: `Input only between ${min.toLocaleString()} ~ ${max.toLocaleString()}`,
    es: `Ingrese solo entre ${min.toLocaleString()} y ${max.toLocaleString()}`,
    pt: `Entrada somente entre ${min.toLocaleString()} ~ ${max.toLocaleString()}`,
  };

  return errorMessage[lang];
};
