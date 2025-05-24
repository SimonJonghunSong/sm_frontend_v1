import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import NumericInputField from "../(components)/NumericInputField";
import SwitchField from "../(components)/SwitchField";
import { SwitchPrimary } from "@/components/switches";
import { FIELD_VALIDATIONS } from "constants/field";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import EditDot from "../(components)/EditDot";

const fieldIds = INCLUDE_FIELDS[SECTIONS.DriverPattern.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const DriverPattern = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = useMemo(() => {
    return Object.keys(formData).filter((key) => {
      return (
        fieldIds.includes(key) &&
        formData[key].beforeValue !== formData[key].realValue
      );
    });
  }, [formData]);

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

        // 필드 값들을 사용하여 수행할 작업
        sendFormData(fieldValues, setFormData);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={"4px"} alignItems="center">
          <h1 data-section-id={SECTIONS.DriverPattern.en}>
            {SECTIONS.DriverPattern[lang]}
          </h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {FIELD_VALIDATIONS["1910"].tooltip[lang]}
              </span>
            }
          />
          <InputBox.Number>{1910}</InputBox.Number>
          {isDirtyFields.includes("1910") && <EditDot />}
        </Stack>

        <SwitchPrimary
          checked={formData["1910"]?.realValue === "01"}
          onChange={(e) => {
            onChange("1910", e.target.checked ? "01" : "00");
          }}
        />
      </Stack>

      {formData["1910"]?.realValue === "01" && (
        <Stack direction={"row"} gap={"24px"}>
          <Stack gap={"24px"} flex={1}>
            <NumericInputField
              id="1911"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1911")}
            />

            <NumericInputField
              id="1912"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1912")}
            />

            <NumericInputField
              id="1913"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1913")}
            />

            <NumericInputField
              id="1914"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1914")}
            />
          </Stack>
          <Stack gap={"24px"} flex={1}>
            <NumericInputField
              id="1921"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1921")}
            />

            <NumericInputField
              id="1922"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1922")}
            />

            <NumericInputField
              id="1923"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1923")}
            />

            {!!formData["1924"] && (
              <Stack gap={"16px"} style={{ width: "100%" }}>
                <SwitchField
                  style={{ width: "100%" }}
                  id="1924"
                  formData={formData}
                  onChange={handleChange}
                  isDirty={isDirtyFields.includes("1924")}
                />

                {formData["1924"]?.realValue === "01" && (
                  <NumericInputField
                    style={{ width: "100%" }}
                    id="1925"
                    formData={formData}
                    onChange={handleChange}
                    isDirty={isDirtyFields.includes("1925")}
                  />
                )}
              </Stack>
            )}
          </Stack>
        </Stack>
      )}
      <Stack direction="row" justifyContent="flex-end">
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          disabled={isLoading || !isDirtyFields.length}
        >
          {t("notify.send")}
        </Button>
      </Stack>
    </Form>
  );
};

export default DriverPattern;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
  }
`;
