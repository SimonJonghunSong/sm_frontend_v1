import { useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import SelectField from "../(components)/SelectField";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import TextInputField from "../(components)/TextInputField";
import { hasFormDataFields } from "../(utils)/@index";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const fieldsId = INCLUDE_FIELDS[SECTIONS.APN.en];

const Network = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const { sendFormData, isLoading } = useSendFormData();

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
      <h1 data-section-id={SECTIONS.APN.en}>{SECTIONS.APN[lang]}</h1>

      <Stack direction={"row"} gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <SelectField
            id="1000"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isRequired
            isDirty={isDirtyFields.includes("1000")}
          />

          <TextInputField
            id="1001"
            formData={formData}
            onChange={handleChange}
            // isRequired
            style={{ width: "100%" }}
            error={!/^[A-Za-z0-9.]*$/.test(formData["1001"].realValue)}
            helperText={
              !/^[A-Za-z0-9.]*$/.test(formData["1001"].realValue)
                ? FIELD_ERRORS["alphaNumericPatternWithSymbols"][lang]
                : undefined
            }
            isDirty={isDirtyFields.includes("1001")}
          />
        </Stack>
        <Stack gap={"24px"} flex={1}>
          <TextInputField
            id="1002"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            error={!/^[A-Za-z0-9]*$/.test(formData["1002"].realValue)}
            helperText={
              !/^[A-Za-z0-9]*$/.test(formData["1002"].realValue)
                ? FIELD_ERRORS["alphaNumericPattern"][lang]
                : undefined
            }
            isDirty={isDirtyFields.includes("1002")}
          />

          <TextInputField
            id="1003"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            error={!/^[A-Za-z0-9.]*$/.test(formData["1003"].realValue)}
            helperText={
              !/^[A-Za-z0-9.]*$/.test(formData["1003"].realValue)
                ? FIELD_ERRORS["alphaNumericPatternWithSymbols"][lang]
                : undefined
            }
            isDirty={isDirtyFields.includes("1003")}
          />
          <TextInputField
            id="1004"
            formData={formData}
            onChange={handleChange}
            type="password"
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1004")}
          />
        </Stack>
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

export default Network;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid #d7d8dc;
  padding-bottom: 36px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
  }
`;
