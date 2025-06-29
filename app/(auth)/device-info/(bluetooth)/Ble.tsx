import { Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import { FormField } from "../page";
import NumericInputField from "../(components)/NumericInputField";
import SwitchField from "../(components)/SwitchField";
import { hasFormDataFields } from "../(utils)/@index";
import { SwitchPrimary } from "@/components/switches";
import { FIELD_VALIDATIONS } from "constants/field";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";
import SelectField from "../(components)/SelectField";
import EditDot from "../(components)/EditDot";

const fieldIds = INCLUDE_FIELDS[SECTIONS.Ble.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const Ble = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();

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
          if (fieldIds.includes(key)) {
            acc[key] = {
              id: key,
              value: formData[key].value,
              realValue: formData[key].realValue,
            };
          }
          return acc;
        }, {});
        console.log("fieldValues :::", fieldValues);
        // 필드 값들을 사용하여 수행할 작업
        sendFormData(fieldValues, setFormData);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap="16px">
          <h1 data-section-id={SECTIONS.Ble.en}>
            {t("configuration.ble.ble")}
          </h1>
        </Stack>
      </Stack>

      <Stack direction={"row"} gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <NumericInputField
            id="4020"
            formData={formData}
            onChange={handleChange}
            isSwitch
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4020")}
          />
          <SwitchField
            id="4021"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4021")}
          />

          <SelectField
            id="4028"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4028")}
          />

          <SwitchField
            id="4025"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4025")}
          />

          <NumericInputField
            id="4012"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4012")}
          />
          <NumericInputField
            id="4026"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4026")}
          />
          <NumericInputField
            id="4027"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4027")}
          />
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <NumericInputField
            id="4000"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4000")}
          />

          <NumericInputField
            id="4010"
            formData={formData}
            onChange={handleChange}
            isSwitch
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4010")}
          />

          <NumericInputField
            id="4011"
            formData={formData}
            onChange={handleChange}
            isSwitch
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4011")}
          />
          <NumericInputField
            id="4013"
            formData={formData}
            onChange={handleChange}
            isSwitch
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4013")}
          />
          <NumericInputField
            id="4014"
            formData={formData}
            onChange={handleChange}
            isSwitch
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4014")}
          />
          <SwitchField
            id="4035"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4035")}
          />
          <NumericInputField
            id="4036"
            formData={formData}
            onChange={handleChange}
            isSwitch
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("4036")}
          />
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="flex-end" alignItems="center">
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

export default Ble;

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
