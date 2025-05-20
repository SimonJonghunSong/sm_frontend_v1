import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import { Stack, TextField, Typography } from "@mui/material";
import { FIELD_VALIDATIONS } from "constants/field";
import { SwitchPrimary } from "@/components/switches";
import { useState } from "react";
import EditDot from "./EditDot";
interface SpecialRangeNumericFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  style?: React.CSSProperties;
  isRequired?: boolean;
  isSwitch?: boolean;
  switchDisabled?: boolean;
  specialValues?: number[]; // 범위를 벗어나도 허용할 특수 값들의 배열
  min?: number;
  max?: number;
  unit?: string;
  helperText?: string;
  isDirty?: boolean;
}

const SpecialRangeNumericField = ({
  id,
  formData,
  onChange,
  style,
  isRequired,
  isSwitch,
  switchDisabled,
  specialValues = [],
  min,
  max,
  unit,
  helperText,
  isDirty,
}: SpecialRangeNumericFieldProps) => {
  const lang = useLangStore((state) => state.lang);
  const [isChecked, setIsChecked] = useState(
    formData[id]?.realValue !== "00" && formData[id]?.realValue !== "0"
  );

  if (!formData[id]) return null;

  // 유효성 검사 정보 가져오기
  const hasValidation = FIELD_VALIDATIONS[id] !== undefined;

  // 최소/최대값 설정 (props로 받은 값 또는 FIELD_VALIDATIONS에서 가져오기)
  const minValue =
    min !== undefined
      ? min
      : hasValidation && typeof FIELD_VALIDATIONS[id].min === "number"
      ? FIELD_VALIDATIONS[id].min
      : 0;

  const maxValue =
    max !== undefined
      ? max
      : hasValidation && typeof FIELD_VALIDATIONS[id].max === "number"
      ? FIELD_VALIDATIONS[id].max
      : 100;

  // 특수 값에 해당하는지 확인
  const isSpecialValue = specialValues.includes(Number(formData[id].realValue));

  // 최소/최대 범위 검사 - 특수 값인 경우 무시
  const isMinMaxError =
    !isSpecialValue &&
    formData[id].realValue !== "" &&
    (Number(formData[id].realValue) < minValue ||
      Number(formData[id].realValue) > maxValue);

  const isRequiredError = isRequired && formData[id].realValue === "";

  const hasError = isRequiredError || isMinMaxError;

  // 에러 메시지 설정
  const getMinMaxErrorMessage = () => {
    const defaultMessage = {
      en: `Input only between ${minValue} ~ ${maxValue}`,
      es: `Ingrese solo entre ${minValue} y ${maxValue}`,
      pt: `Entrada somente entre ${minValue} ~ ${maxValue}`,
    };

    if (specialValues.length > 0) {
      return {
        en: `Input only between ${minValue} ~ ${maxValue}, ${specialValues.join(
          ", "
        )}`,
        es: `Ingrese solo entre ${minValue} y ${maxValue}, ${specialValues.join(
          ", "
        )}`,
        pt: `Entrada somente entre ${minValue} ~ ${maxValue}, ${specialValues.join(
          ", "
        )}`,
      };
    }

    return defaultMessage;
  };

  const getRequiredErrorMessage = () => {
    return {
      en: "Required",
      es: "Requerido",
      pt: "Obrigatório",
    };
  };

  const errorMessage = isRequiredError
    ? getRequiredErrorMessage()[lang]
    : isMinMaxError
    ? getMinMaxErrorMessage()[lang]
    : undefined;

  return (
    <Stack
      width={"100%"}
      gap={"8px"}
      style={{ ...(isSwitch && { position: "relative" }), ...style }}
    >
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title>
          {hasValidation && FIELD_VALIDATIONS[id].title
            ? FIELD_VALIDATIONS[id].title[lang]
            : `Field ${id}`}
          {isRequired && (
            <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
          )}
        </InputBox.Title>
        {hasValidation && FIELD_VALIDATIONS[id].tooltip?.[lang] && (
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {FIELD_VALIDATIONS[id].tooltip[lang]}
              </span>
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
              onChange(id, e.target.checked ? "" : "0");
            }}
          />
        </Stack>
      )}

      {(!isSwitch || (isSwitch && isChecked)) && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            required={isRequired}
            value={formData[id].realValue}
            type="number"
            error={hasError}
            size="small"
            inputProps={{
              inputMode: "numeric",
            }}
            sx={{
              width: "100%",
            }}
            onChange={(e) => onChange(id, e.target.value)}
          />
          {unit && (
            <Typography variant="body1" component="span">
              {unit}
            </Typography>
          )}
        </Stack>
      )}

      {(hasError || helperText) && (
        <p style={{ color: hasError ? "#FF0000" : "inherit" }}>
          {hasError ? errorMessage : helperText}
        </p>
      )}
    </Stack>
  );
};

export default SpecialRangeNumericField;
