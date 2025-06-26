import { SetStateAction, Dispatch, useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import { FormField } from "../page";
import { hasFormDataFields } from "../(utils)/@index";
import NumericInputField from "../(components)/NumericInputField";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";
import EditDot from "../(components)/EditDot";
import SwitchField from "../(components)/SwitchField";
import SelectField from "../(components)/SelectField";

const fieldsIds = INCLUDE_FIELDS[SECTIONS.OBD.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const OBD = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = Object.keys(formData).filter((key) => {
    return (
      fieldsIds.includes(key) &&
      formData[key].beforeValue !== formData[key].realValue
    );
  });

  if (!hasFormDataFields(formData, fieldsIds)) return null;

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
          if (fieldsIds.includes(key)) {
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
          <h1 data-section-id={SECTIONS.OBD.en}>{SECTIONS.OBD[lang]}</h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {FIELD_VALIDATIONS["2000"].tooltip[lang]}
              </span>
            }
          />
          <InputBox.Number>2000</InputBox.Number>
          {isDirtyFields.includes("2000") && <EditDot />}
        </Stack>
        <SwitchPrimary
          onChange={(e) => handleChange("2000", e.target.checked ? "01" : "00")}
          checked={formData["2000"].realValue === "01"}
        />
      </Stack>

      {formData["2000"].realValue === "01" && (
        <Stack direction={"row"} gap={"24px"}>
          <Stack gap={"24px"} flex={1}>
            <NumericInputField
              id="2002"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("2002")}
              style={{ width: "100%" }}
            />
            <NumericInputField
              id="2006"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("2006")}
              style={{ width: "100%" }}
            />
            <SwitchField
              id="2007"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("2007")}
            />
            <NumericInputField
              id="2008"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("2008")}
              style={{ width: "100%" }}
            />
            <NumericInputField
              id="2009"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("2009")}
              style={{ width: "100%" }}
            />
            <NumericInputField
              id="2010"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("2010")}
              style={{ width: "100%" }}
            />
          </Stack>

          <Stack gap={"24px"} flex={1}>
            <SwitchField
              id="2011"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("2011")}
            />
            <SelectField
              id="2012"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("2012")}
            />
            <SwitchField
              id="2014"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("2014")}
            />
            <SwitchField
              id="2015"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("2015")}
            />
            <NumericInputField
              id="2016"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("2016")}
              style={{ width: "100%" }}
            />
            <NumericInputField
              id="2017"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("2017")}
              style={{ width: "100%" }}
            />
          </Stack>
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

export default OBD;

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
