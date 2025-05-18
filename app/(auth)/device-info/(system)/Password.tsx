import { SetStateAction, Dispatch, useRef, useState, useMemo } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import { FormField } from "../page";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import TextInputField from "../(components)/TextInputField";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import { hasFormDataFields } from "app/(auth)/device-info/(utils)/@index";
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";
import { CR } from "@/src/hooks/useSerial/constant";
import EditDot from "../(components)/EditDot";

const fieldIds = INCLUDE_FIELDS[SECTIONS.Password.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  port: SerialPort;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const Password = ({ formData, onChange, port, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const { sendFormData, isLoading } = useSendFormData();
  const responseRef = useRef<string>("");

  const isDirtyFields = Object.keys(formData).filter((key) => {
    return (
      fieldIds.includes(key) &&
      formData[key].beforeValue !== formData[key].realValue
    );
  });

  if (!hasFormDataFields(formData, fieldIds)) return null;

  const handleChange = (id: string, value: string) => {
    onChange(id, value);
  };

  const validateForm = (): boolean => {
    // formRef가 null이면 유효성 검사를 할 수 없음
    if (!formRef.current) return true;

    // 폼 내의 모든 input 요소 중 aria-invalid="true" 속성을 가진 요소 찾기
    const invalidInputs = formRef.current.querySelectorAll(
      '[aria-invalid="true"]'
    );

    if (invalidInputs.length > 0) {
      // 첫 번째 유효하지 않은 입력 필드로 스크롤
      (invalidInputs[0] as HTMLElement).scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      // 포커스 설정
      (invalidInputs[0] as HTMLElement).focus();

      return false;
    }

    return true;
  };

  return (
    <Form
      ref={formRef}
      onSubmit={(e) => {
        e.preventDefault();

        // 폼 유효성 검사 실행
        if (!validateForm()) {
          return; // 유효하지 않은 필드가 있으면 제출을 중단
        }

        // 모든 필드 값을 포함한 객체 생성
        const fieldValues = Object.keys(formData).reduce((acc, key) => {
          // 네트워크 탭에 있는 필드만 포함
          if (fieldIds.includes(key)) {
            acc[key] = {
              id: key,
              value: formData[key].value,
              realValue: formData[key].realValue,
            };
          }
          return acc;
        }, {});

        port.onbuffervalue = (data) => {
          responseRef.current += data;
          if (data.includes(CR)) {
            if (responseRef.current.includes("OK;30;00#01")) {
              port.isLock = true;
            }

            if (responseRef.current.includes("OK;30;00#00")) {
              port.isLock = false;
            }
            responseRef.current = "";
            port.onbuffervalue = null;
          }
        };

        // 필드 값들을 사용하여 수행할 작업
        sendFormData(fieldValues, setFormData);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" gap="4px" alignItems="center">
          <h1 data-section-id={SECTIONS.Password.en}>
            {SECTIONS.Password[lang]}
          </h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {FIELD_VALIDATIONS["3000"].tooltip[lang]}
              </span>
            }
          />
          <InputBox.Number>3000</InputBox.Number>
          {isDirtyFields.includes("3000") && <EditDot />}
        </Stack>
        <SwitchPrimary
          onChange={(e) => handleChange("3000", e.target.checked ? "01" : "00")}
          checked={formData["3000"].realValue === "01"}
        />
      </Stack>

      <Stack flexWrap="wrap" direction={"row"} gap={"24px 16px"}>
        <Stack width={"calc(50% - 8px)"} gap={"8px"}>
          <Stack direction="row" gap="4px" alignItems="center">
            <InputBox.Title>
              {FIELD_VALIDATIONS["3001"].title[lang]}
            </InputBox.Title>
            {FIELD_VALIDATIONS["3001"].tooltip?.[lang] && (
              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {FIELD_VALIDATIONS["3001"].tooltip[lang]}
                  </span>
                }
              />
            )}
            <InputBox.Number>3001</InputBox.Number>
            {isDirtyFields.includes("3001") && <EditDot />}
          </Stack>
          <TextField
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              handleChange("3001", e.target.value);
            }}
            type={showPassword ? "text" : "password"}
            InputProps={{
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
            }}
          />
        </Stack>
        {formData["3000"]?.realValue === "01" && (
          <TextInputField
            id="3002"
            formData={formData}
            onChange={handleChange}
            type="password"
            error={
              formData["3002"]?.realValue.length < 6 ||
              formData["3002"]?.realValue.length > 18
            }
            helperText={
              formData["3002"]?.realValue.length < 6
                ? FIELD_ERRORS["3002"].en
                : formData["3002"]?.realValue.length > 18
                ? FIELD_ERRORS["3002"].en
                : undefined
            }
            isDirty={isDirtyFields.includes("3002")}
          />
        )}
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          disabled={isLoading || isDirtyFields.length === 0}
        >
          {t("notify.send")}
        </Button>
      </Stack>
    </Form>
  );
};

export default Password;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 5px 0px #0000001a;
  border-radius: 8px;
  padding: 24px;
  gap: 16px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 16px;
    line-height: 14px;
  }
`;
