import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import { Stack, TextField } from "@mui/material";
import { FIELD_VALIDATIONS } from "constants/field";
import { SwitchPrimary } from "@/components/switches";
import { useState } from "react";

interface InputFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  style?: React.CSSProperties;
  isRequired?: boolean;
  isSwitch?: boolean;
  switchDisabled?: boolean;
  customError?: boolean;
  customErrorMessage?: string;
  isUnderbarId?: boolean; // 1670 같은 중복으로 인해서 추가된 속성
}

const NumericInputField = ({
  id,
  formData,
  onChange,
  style,
  isRequired,
  isSwitch,
  switchDisabled,
  customError,
  customErrorMessage,
  isUnderbarId,
}: InputFieldProps) => {
  const lang = useLangStore((state) => state.lang);
  const [isChecked, setIsChecked] = useState(
    formData[id]?.realValue !== "00" && formData[id]?.realValue !== "0"
  );

  if (!formData[id]) return null;

  const realId = isUnderbarId ? `${id}_${1}` : id;

  const isMinMaxError =
    typeof FIELD_VALIDATIONS[realId].min === "number" &&
    typeof FIELD_VALIDATIONS[realId].max === "number" &&
    (Number(formData[id].realValue) < FIELD_VALIDATIONS[realId].min ||
      Number(formData[id].realValue) > FIELD_VALIDATIONS[realId].max);

  const isRequiredError = isRequired && !formData[id].realValue;

  const hasError = isRequiredError || customError || isMinMaxError;

  const errorMessage = isRequiredError
    ? getRequiredErrorMessage(lang)
    : customError && customErrorMessage
    ? customErrorMessage
    : isMinMaxError
    ? getMinMaxErrorMessage(
        lang,
        FIELD_VALIDATIONS[realId].min,
        FIELD_VALIDATIONS[realId].max
      )
    : undefined;

  return (
    <Stack
      width={"calc(50% - 8px)"}
      gap={"8px"}
      style={{ ...(isSwitch && { position: "relative" }), ...style }}
    >
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title>
          {FIELD_VALIDATIONS[realId].title[lang]}
          {isRequired && (
            <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
          )}
        </InputBox.Title>
        {FIELD_VALIDATIONS[realId].tooltip?.[lang] && (
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {FIELD_VALIDATIONS[realId].tooltip[lang]}
              </span>
            }
          />
        )}
        <InputBox.Number>{id}</InputBox.Number>
      </Stack>

      {isSwitch && (
        <Stack sx={{ position: "absolute", right: 0, top: 0 }}>
          <SwitchPrimary
            disabled={switchDisabled}
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);
              onChange(id, e.target.checked ? "0" : "0");
            }}
          />
        </Stack>
      )}

      {(!isSwitch || (isSwitch && isChecked)) && (
        <Stack>
          <TextField
            required={isRequired}
            value={formData[id].realValue}
            type="number"
            error={hasError}
            helperText={errorMessage}
            inputProps={
              typeof FIELD_VALIDATIONS[realId].min === "number" &&
              typeof FIELD_VALIDATIONS[realId].max === "number"
                ? {
                    min: FIELD_VALIDATIONS[realId].min,
                    max: FIELD_VALIDATIONS[realId].max,
                    inputMode: "numeric",
                  }
                : undefined
            }
            onChange={(e) => onChange(id, e.target.value)}
          />
        </Stack>
      )}
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

const getRequiredErrorMessage = (lang: string) => {
  const errorMessage = {
    en: "Required",
    es: "Requerido",
    pt: "Obrigatório",
  };

  return errorMessage[lang];
};
