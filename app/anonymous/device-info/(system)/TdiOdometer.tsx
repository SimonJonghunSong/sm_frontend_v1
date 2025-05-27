import { SetStateAction, Dispatch, useRef, useMemo } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import { FormField } from "../page";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import NumericInputField from "../(components)/NumericInputField";
import SwitchField from "../(components)/SwitchField";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";
import RangeThresholdField from "../(components)/RangeThresholdField";
import EditDot from "../(components)/EditDot";

const fieldIds = INCLUDE_FIELDS[SECTIONS.TdiOdometer.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const TdiOdometer = ({ formData, onChange, setFormData }: Props) => {
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
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" gap="4px" alignItems="center">
          <h1 data-section-id={SECTIONS.TdiOdometer.en}>
            {SECTIONS.TdiOdometer[lang]}
          </h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {FIELD_VALIDATIONS["4200"].tooltip[lang]}
              </span>
            }
          />
          <InputBox.Number>4200</InputBox.Number>
          {isDirtyFields.includes("4200") && <EditDot />}
        </Stack>
        <SwitchPrimary
          onChange={(e) => handleChange("4200", e.target.checked ? "01" : "00")}
          checked={formData["4200"].realValue === "01"}
        />
      </Stack>

      {formData["4200"]?.realValue === "01" && (
        <Stack direction={"row"} gap={"24px"}>
          <Stack gap={"24px"} flex={1}>
            <NumericInputField
              id="4201"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("4201")}
            />
            <NumericInputField
              id="4202"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("4202")}
            />

            <RangeThresholdField
              id={["4203", "4204"]}
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              titleId="4203~4"
              helperText={
                lang === "en"
                  ? "Maximum RPM must be a higher than minimum RPM."
                  : lang === "es"
                  ? "El RPM máximo debe ser mayor que el RPM mínimo."
                  : "O RPM máximo deve ser maior que o RPM mínimo."
              }
              isDirty={
                isDirtyFields.includes("4203") || isDirtyFields.includes("4204")
              }
            />

            <NumericInputField
              id="4205"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("4205")}
            />
          </Stack>
          <Stack gap={"24px"} flex={1}>
            {!!formData["4206"] && (
              <Stack gap={"16px"} style={{ width: "100%" }}>
                <SwitchField
                  id="4206"
                  formData={formData}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  isDirty={isDirtyFields.includes("4206")}
                />

                {formData["4206"].realValue === "01" && (
                  <>
                    <NumericInputField
                      id="4207"
                      formData={formData}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                      isDirty={isDirtyFields.includes("4207")}
                    />
                    <NumericInputField
                      id="4208"
                      formData={formData}
                      onChange={handleChange}
                      style={{ width: "100%" }}
                      isDirty={isDirtyFields.includes("4208")}
                    />
                  </>
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

export default TdiOdometer;

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
