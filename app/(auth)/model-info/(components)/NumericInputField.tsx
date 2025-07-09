import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import { Stack, TextField } from "@mui/material";
import { FIELD_VALIDATIONS } from "constants/field";
import { SwitchPrimary } from "@/components/switches";
import { useState } from "react";
import EditDot from "./EditDot";

interface InputFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, selectValue?: string) => void;
  style?: React.CSSProperties;
  isRequired?: boolean;
  isSwitch?: boolean;
  switchDisabled?: boolean;
  customError?: boolean;
  customErrorMessage?: string;
  isUnderbarId?: boolean; // 1670 같은 중복으로 인해서 추가된 속성
  isDirty?: boolean;
  isForceRender?: boolean;
  min?: number;
  max?: number;
  tooltip?: string;
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
  isDirty = false,
  isForceRender = false,
  min,
  max,
  tooltip,
}: InputFieldProps) => {
  const lang = useLangStore((state) => state.lang);
  const [isChecked, setIsChecked] = useState(
    Number(formData[id]?.realValue) !== 0
  );

  const [beforeValue, setBeforeValue] = useState(formData[id]?.realValue);

  if (!isForceRender && !formData[id]) return null;

  const realId = isUnderbarId ? `${id}_${1}` : id;
  const minValue = typeof min === "number" ? min : FIELD_VALIDATIONS[realId].min;
  const maxValue = typeof max === "number" ? max : FIELD_VALIDATIONS[realId].max;
  const tooltipText = tooltip ?? FIELD_VALIDATIONS[realId].tooltip?.[lang];
  const isMinMaxError =
    typeof minValue === "number" &&
    typeof maxValue === "number" &&
    (Number(formData?.[id]?.realValue) < minValue ||
      Number(formData?.[id]?.realValue) > maxValue);

  const isRequiredError = isRequired && !formData?.[id]?.realValue;

  const hasError = isRequiredError || customError || isMinMaxError;

  const errorMessage = isRequiredError
    ? getRequiredErrorMessage(lang)
    : customError && customErrorMessage
    ? customErrorMessage
    : isMinMaxError
    ? getMinMaxErrorMessage(
        lang,
        minValue,
        maxValue
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
        {tooltipText && (
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>{tooltipText}</span>
            }
          />
        )}
        <InputBox.Number>{id}</InputBox.Number>
        {isDirty && <EditDot />}
      </Stack>

      {isSwitch && (
        <Stack sx={{ position: "absolute", right: 0, top: 0 }}>
          <SwitchPrimary
            disabled={switchDisabled}
            checked={isChecked}
            onChange={(e) => {
              setIsChecked(e.target.checked);

              if (!e.target.checked) {
                setBeforeValue(formData[id]?.realValue);
              }

              onChange(id, e.target.checked ? beforeValue : "0");
            }}
          />
        </Stack>
      )}

      {(!isSwitch || (isSwitch && isChecked)) && (
        <Stack>
          <TextField
            required={isRequired}
            value={formData?.[id]?.realValue}
            type="number"
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            error={hasError}
            helperText={errorMessage}
            inputProps={
              typeof minValue === "number" && typeof maxValue === "number"
                ? {
                    min: minValue,
                    max: maxValue,
                    inputMode: "numeric",
                    step: "any",
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
