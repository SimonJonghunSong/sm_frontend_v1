import { useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import { FormField } from "../page";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import TextInputField from "../(components)/TextInputField";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import hasFormDataFields from "app/(auth)/device-info/(utils)/hasFormDataFields";
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";
import EditDot from "../(components)/EditDot";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const fieldsId = INCLUDE_FIELDS[SECTIONS.AGPSMode.en];

const AGPSMode = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const { sendFormData, isLoading } = useSendFormData();

  const allowedChars = /^[A-Za-z0-9\-./:]*$/;
  const urlPattern = /^(https?:\/\/)?([^\s$.?#].[^\s]*)$/i;

  const isDirtyFields = Object.keys(formData).filter((key) => {
    return (
      fieldsId.includes(key) &&
      formData[key].beforeValue !== formData[key].realValue
    );
  });

  if (!hasFormDataFields(formData, fieldsId)) return null;

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
          if (fieldsId.includes(key)) {
            acc[key] = {
              id: key,
              value: formData[key].value,
              realValue: formData[key].realValue,
            };
          }
          return acc;
        }, {});

        // 필드 값들을 사용하여 수행할 작업
        sendFormData(fieldValues, setFormData);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" gap="4px" alignItems="center">
          <h1 data-section-id={SECTIONS.AGPSMode.en}>
            {SECTIONS.AGPSMode[lang]}
          </h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {FIELD_VALIDATIONS["1014"].tooltip[lang]}
              </span>
            }
          />
          <InputBox.Number>1014</InputBox.Number>
          {isDirtyFields.includes("1014") && <EditDot />}
        </Stack>
        <SwitchPrimary
          onChange={(e) => handleChange("1014", e.target.checked ? "01" : "00")}
          checked={formData["1014"].realValue === "01"}
        />
      </Stack>

      {formData["1014"]?.realValue === "01" && (
        <Stack flexWrap="wrap" direction={"row"} gap={"24px 16px"}>
          <TextInputField
            id="1015"
            formData={formData}
            onChange={handleChange}
            error={
              formData["1015"]?.realValue &&
              (!allowedChars.test(formData["1015"]?.realValue) ||
                !urlPattern.test(formData["1015"]?.realValue))
            }
            helperText={
              formData["1015"]?.realValue &&
              (!allowedChars.test(formData["1015"]?.realValue)
                ? FIELD_ERRORS["alphaNumericPatternWithSymbols"][lang]
                : !urlPattern.test(formData["1015"]?.realValue)
                ? FIELD_ERRORS["invalidUrl"][lang]
                : undefined)
            }
            isDirty={isDirtyFields.includes("1015")}
          />
        </Stack>
      )}

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

export default AGPSMode;

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
    font-size: 20px;
    line-height: 100%;
  }
`;
