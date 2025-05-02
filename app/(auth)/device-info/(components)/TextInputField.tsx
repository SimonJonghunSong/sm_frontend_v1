import { HTMLInputTypeAttribute, useState } from "react";
import { IconButton, Stack, TextField } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import InputBox from "@/components/inputbox/InputBox";
import { FIELD_VALIDATIONS } from "constants/field";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";

interface TextInputFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  style?: React.CSSProperties;
  isRequired?: boolean;
  error?: boolean;
  helperText?: string;
  type?: HTMLInputTypeAttribute;
}

const TextInputField = ({
  id,
  formData,
  onChange,
  style,
  isRequired = false,
  error = false,
  helperText,
  type = "text",
}: TextInputFieldProps) => {
  const lang = useLangStore((state) => state.lang);

  const [showPassword, setShowPassword] = useState(false);

  if (!formData[id]) return null;

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
      <TextField
        value={formData[id].realValue}
        onChange={(e) => onChange(id, e.target.value)}
        error={error}
        helperText={helperText}
        type={type === "password" ? (showPassword ? "text" : "password") : type}
        InputProps={
          type === "password" && {
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? (
                  <VisibilityOutlinedIcon sx={{ color: "var(--grey5)" }} />
                ) : (
                  <VisibilityOffOutlinedIcon sx={{ color: "var(--grey5)" }} />
                )}
              </IconButton>
            ),
          }
        }
      />
    </Stack>
  );
};

export default TextInputField;
