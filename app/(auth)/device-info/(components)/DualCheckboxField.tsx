import { useTranslations } from "next-intl";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import { Checkbox, Stack, Typography } from "@mui/material";
import { FIELD_VALIDATIONS } from "constants/field";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import { useState } from "react";

interface DualCheckboxFieldProps {
  id: string;
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  style?: React.CSSProperties;
  firstOptionLabel?: {
    en: string;
    es: string;
    pt: string;
  };
  secondOptionLabel?: {
    en: string;
    es: string;
    pt: string;
  };
  switchDisabled?: boolean;
}

const DualCheckboxField = ({
  id,
  formData,
  onChange,
  style,
  firstOptionLabel,
  secondOptionLabel,
  switchDisabled,
}: DualCheckboxFieldProps) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const [isChecked, setIsChecked] = useState(
    formData[id]?.realValue !== "00" && formData[id]?.realValue !== "0"
  );

  if (!formData[id]) return null;

  const hasValidation = FIELD_VALIDATIONS[id] !== undefined;

  // 현재 값에서 체크 상태 파악
  const isFirstOptionChecked =
    formData[id].realValue === "01" || formData[id].realValue === "03";

  const isSecondOptionChecked =
    formData[id].realValue === "02" || formData[id].realValue === "03";

  // 첫번째 체크박스 변경 처리
  const handleFirstOptionChange = (checked: boolean) => {
    if (checked) {
      if (isSecondOptionChecked) {
        // 두번째 이미 체크됨 -> 모두 체크 (03)
        onChange(id, "03");
      } else {
        // 첫번째만 체크 (01)
        onChange(id, "01");
      }
    } else {
      if (isSecondOptionChecked) {
        // 두번째만 체크 (02)
        onChange(id, "02");
      } else {
        // 모두 체크 해제 (00)
        onChange(id, "00");
      }
    }
  };

  // 두번째 체크박스 변경 처리
  const handleSecondOptionChange = (checked: boolean) => {
    if (checked) {
      if (isFirstOptionChecked) {
        // 첫번째 이미 체크됨 -> 모두 체크 (03)
        onChange(id, "03");
      } else {
        // 두번째만 체크 (02)
        onChange(id, "02");
      }
    } else {
      if (isFirstOptionChecked) {
        // 첫번째만 체크 (01)
        onChange(id, "01");
      } else {
        // 모두 체크 해제 (00)
        onChange(id, "00");
      }
    }
  };

  // 기본 라벨 설정
  const defaultFirstLabel = {
    en: "Option 1",
    es: "Opción 1",
    pt: "Opção 1",
  };

  const defaultSecondLabel = {
    en: "Option 2",
    es: "Opción 2",
    pt: "Opção 2",
  };

  const actualFirstLabel = firstOptionLabel || defaultFirstLabel;
  const actualSecondLabel = secondOptionLabel || defaultSecondLabel;

  return (
    <Stack
      width={"100%"}
      gap={"8px"}
      style={{ position: "relative", ...style }}
    >
      <Stack direction="row" gap="4px" alignItems="center">
        <InputBox.Title>
          {hasValidation && FIELD_VALIDATIONS[id].title
            ? FIELD_VALIDATIONS[id].title[lang]
            : `Option ${id}`}
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
      </Stack>

      <Stack sx={{ position: "absolute", right: 0, top: 0 }}>
        <SwitchPrimary
          disabled={switchDisabled}
          checked={isChecked}
          onChange={(e) => {
            setIsChecked(e.target.checked);
            if (!e.target.checked) {
              onChange(id, "00");
            }
          }}
        />
      </Stack>

      {isChecked && (
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          paddingTop={"8px"}
        >
          <Stack direction="row" gap="4px" alignItems="center">
            <Checkbox
              style={{ margin: 0 }}
              checked={isFirstOptionChecked}
              onChange={(e) => handleFirstOptionChange(e.target.checked)}
            />
            <Typography variant="body2">{actualFirstLabel[lang]}</Typography>
          </Stack>

          <Stack direction="row" gap="4px" alignItems="center">
            <Checkbox
              style={{ margin: 0 }}
              checked={isSecondOptionChecked}
              onChange={(e) => handleSecondOptionChange(e.target.checked)}
            />
            <Typography variant="body2">{actualSecondLabel[lang]}</Typography>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default DualCheckboxField;
