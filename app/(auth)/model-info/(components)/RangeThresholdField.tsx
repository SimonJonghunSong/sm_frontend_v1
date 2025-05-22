import { useTranslations } from "next-intl";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import { Stack, TextField, Typography } from "@mui/material";
import { FIELD_VALIDATIONS } from "constants/field";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import { useState } from "react";
import EditDot from "./EditDot";

interface RangeThresholdFieldProps {
  id: [string, string]; // [minId, maxId]
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  style?: React.CSSProperties;
  isRequired?: boolean;
  isSwitch?: boolean;
  switchDisabled?: boolean;
  unit?: string;
  helperText?: string;
  titleId?: string; // Optional ID for title/label display
  isDirty?: boolean;
}

const RangeThresholdField = ({
  id,
  formData,
  onChange,
  style,
  isRequired,
  isSwitch,
  switchDisabled,
  unit = "",
  helperText,
  titleId,
  isDirty,
}: RangeThresholdFieldProps) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const [minId, maxId] = id;
  const displayId = titleId || minId;

  const [isChecked, setIsChecked] = useState(
    formData[minId]?.realValue !== "00" && formData[minId]?.realValue !== "0"
  );

  if (!formData[minId] || !formData[maxId]) return null;

  const minValue = formData[minId]?.realValue || "";
  const maxValue = formData[maxId]?.realValue || "";

  const hasValidationMin = FIELD_VALIDATIONS[minId] !== undefined;
  const hasValidationMax = FIELD_VALIDATIONS[maxId] !== undefined;
  const hasValidation = hasValidationMin || hasValidationMax;

  // Use either min validation or default
  const minLimit =
    hasValidationMin && typeof FIELD_VALIDATIONS[minId].min === "number"
      ? FIELD_VALIDATIONS[minId].min
      : -100;

  // Use either max validation or default
  const maxLimit =
    hasValidationMax && typeof FIELD_VALIDATIONS[maxId].max === "number"
      ? FIELD_VALIDATIONS[maxId].max
      : 200;

  const isError =
    (minValue !== "" &&
      (Number(minValue) < minLimit || Number(minValue) > maxLimit)) ||
    (maxValue !== "" &&
      (Number(maxValue) < minLimit || Number(maxValue) > maxLimit)) ||
    (minValue !== "" && maxValue !== "" && Number(minValue) > Number(maxValue));

  // Determine specific error type for displaying the correct error message
  const getErrorType = () => {
    if (
      minValue !== "" &&
      (Number(minValue) < minLimit || Number(minValue) > maxLimit)
    ) {
      return "RANGE_MIN";
    }
    if (
      maxValue !== "" &&
      (Number(maxValue) < minLimit || Number(maxValue) > maxLimit)
    ) {
      return "RANGE_MAX";
    }
    if (
      minValue !== "" &&
      maxValue !== "" &&
      Number(minValue) > Number(maxValue)
    ) {
      return "MIN_GREATER_THAN_MAX";
    }
    return null;
  };

  // Get error message based on error type
  const getErrorMessage = () => {
    const errorType = getErrorType();
    if (!errorType) return null;

    if (errorType === "RANGE_MIN" || errorType === "RANGE_MAX") {
      return {
        en: `Input only between ${minLimit} ~ ${maxLimit}`,
        es: `Entrada solo entre ${minLimit} ~ ${maxLimit}`,
        pt: `Entrada somente entre ${minLimit} ~ ${maxLimit}`,
      }[lang];
    }

    if (errorType === "MIN_GREATER_THAN_MAX") {
      return {
        en:
          helperText ||
          "High temperature must be a higher than low temperature.",
        es:
          helperText ||
          "La temperatura alta debe ser mayor que la temperatura baja.",
        pt:
          helperText ||
          "A temperatura alta deve ser maior que a temperatura baixa.",
      }[lang];
    }

    return null;
  };

  const handleMinChange = (value: string) => {
    onChange(minId, value);
  };

  const handleMaxChange = (value: string) => {
    onChange(maxId, value);
  };

  // Get title from validation if available, otherwise use default
  const getTitle = () => {
    if (hasValidationMin && FIELD_VALIDATIONS[minId].title?.[lang]) {
      return FIELD_VALIDATIONS[minId].title[lang];
    } else if (hasValidationMax && FIELD_VALIDATIONS[maxId].title?.[lang]) {
      return FIELD_VALIDATIONS[maxId].title[lang];
    } else if (titleId && FIELD_VALIDATIONS[titleId]?.title?.[lang]) {
      return FIELD_VALIDATIONS[titleId].title[lang];
    }
    return `Threshold ${displayId}`;
  };

  // Get tooltip from validation if available
  const getTooltip = () => {
    if (hasValidationMin && FIELD_VALIDATIONS[minId].tooltip?.[lang]) {
      return FIELD_VALIDATIONS[minId].tooltip[lang];
    } else if (hasValidationMax && FIELD_VALIDATIONS[maxId].tooltip?.[lang]) {
      return FIELD_VALIDATIONS[maxId].tooltip[lang];
    } else if (titleId && FIELD_VALIDATIONS[titleId]?.tooltip?.[lang]) {
      return FIELD_VALIDATIONS[titleId].tooltip[lang];
    }
    return null;
  };

  return (
    <Stack
      width={"100%"}
      gap={"8px"}
      style={{ ...(isSwitch && { position: "relative" }), ...style }}
    >
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title>
          {getTitle()}
          {isRequired && (
            <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
          )}
        </InputBox.Title>
        {getTooltip() && (
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>{getTooltip()}</span>
            }
          />
        )}
        <InputBox.Number>{displayId}</InputBox.Number>
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
                handleMinChange("");
                handleMaxChange("");
              }
            }}
          />
        </Stack>
      )}

      {(!isSwitch || (isSwitch && isChecked)) && (
        <Stack direction="row" alignItems="center" spacing={1}>
          <TextField
            required={isRequired}
            value={minValue}
            type="number"
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            error={isError}
            size="small"
            inputProps={{
              min: minLimit,
              max: maxLimit,
              inputMode: "numeric",
            }}
            style={{ flex: 1 }}
            onChange={(e) => handleMinChange(e.target.value)}
          />
          <Typography variant="body1" component="span" sx={{ mx: 1 }}>
            ~
          </Typography>
          <TextField
            required={isRequired}
            value={maxValue}
            type="number"
            onKeyDown={(e) => {
              if (["e", "E", "+", "-"].includes(e.key)) {
                e.preventDefault();
              }
            }}
            error={isError}
            size="small"
            style={{ flex: 1 }}
            inputProps={{
              min: minLimit,
              max: maxLimit,
              inputMode: "numeric",
            }}
            onChange={(e) => handleMaxChange(e.target.value)}
          />
          {/* {unit && (
            <Typography variant="body1" component="span" sx={{ ml: 1 }}>
              {unit}
            </Typography>
          )} */}
        </Stack>
      )}

      {(isError || helperText) && (
        <Stack direction="row" alignItems="flex-start">
          <p style={{ color: "#FF0000" }}>
            {isError ? getErrorMessage() : helperText}
          </p>
        </Stack>
      )}
    </Stack>
  );
};

export default RangeThresholdField;
