import { SetStateAction, Dispatch, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import SelectField from "../(components)/SelectField";
import NumericInputField from "../(components)/NumericInputField";
import SwitchField from "../(components)/SwitchField";
import { SwitchPrimary } from "@/components/switches";
import DualCheckboxField from "app/(auth)/device-info/(components)/DualCheckboxField";
import hasFormDataFields from "app/(auth)/device-info/(utils)/hasFormDataFields";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";
import EditDot from "../(components)/EditDot";

const fieldIds = INCLUDE_FIELDS[SECTIONS.PresenceFunction.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<
    SetStateAction<{
      [key: string]: FormField;
    }>
  >;
}
const tooltipText = {
  en: "The type of presence function.\n• Option\n - Participant\n - Coordinator",
  ps: "O tipo de função de presença.\n• Opção\n - Participante\n - Coordenador",
  es: "El tipo de función de presencia.\n• Opción\n - Participante\n - Coordinador",
};

const error = {};

const PresenceFunction = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const [isChecked, setIsChecked] = useState(true);
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
        <Stack direction="row" alignItems="center" gap={"4px"}>
          <h1 data-section-id={SECTIONS.PresenceFunction.en}>
            {SECTIONS.PresenceFunction[lang]}
          </h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {tooltipText[lang]}
              </span>
            }
          />
          <InputBox.Number>2561</InputBox.Number>
          {isDirtyFields.includes("2561") && <EditDot />}
        </Stack>

        <SwitchPrimary
          checked={formData["2561"]?.realValue !== "00"}
          onChange={(e) => onChange("2561", e.target.checked ? "01" : "00")}
        />
      </Stack>

      {isChecked && (
        <>
          <Stack flexWrap="wrap" direction={"row"} gap={"32px 16px"}>
            <Stack direction="column" gap={"16px"} flex={1}>
              <SelectField
                id="2561"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2561")}
              />
              <NumericInputField
                id="2563"
                formData={formData}
                onChange={handleChange}
                isSwitch
                isDirty={isDirtyFields.includes("2563")}
              />
              <SelectField
                id="2562"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2562")}
              />
              <SwitchField
                id="2564"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2564")}
              />
              <SelectField
                id="2565"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2565")}
              />
            </Stack>
            <Stack direction="column" gap={"16px"} flex={1}>
              <NumericInputField
                id="2566"
                formData={formData}
                onChange={handleChange}
                isSwitch
                isDirty={isDirtyFields.includes("2566")}
              />
              <NumericInputField
                id="2567"
                formData={formData}
                onChange={handleChange}
                isSwitch
                isDirty={isDirtyFields.includes("2567")}
              />
              <NumericInputField
                id="2568"
                formData={formData}
                onChange={handleChange}
                isSwitch
                isDirty={isDirtyFields.includes("2568")}
              />
              <NumericInputField
                id="2569"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2569")}
              />
              <SwitchField
                id="1642"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("1642")}
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
        </>
      )}
    </Form>
  );
};

export default PresenceFunction;

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
