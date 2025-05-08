import { useRef, useState } from "react";
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
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";
import CheckboxComp from "app/(auth)/device-info/(components)/CheckboxComp";

const fieldIds = INCLUDE_FIELDS[SECTIONS.Motion.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}
const tooltipText = {
  en: "• Default : On",
  ps: "• Padrão  : Ativado",
  es: "• Predeterminado: Activado",
};

const labelsString = {
  TEXT_EN_ITEM_CONTENT: "Motion, Shock, Collision",
  TEXT_ES_ITEM_CONTENT: "Movimiento, Choque, Colisión",
  TEXT_PT_ITEM_CONTENT: "Movimento, Choque, Colisão",
};

const Motion = ({ formData, onChange }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const [isChecked, setIsChecked] = useState(true);
  const { sendFormData } = useSendFormData();

  // TODO 렌더링 조건 추가 유틸로 만들어서 한번에 처리
  if (!formData) return null;

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

        // 필드 값들을 사용하여 수행할 작업
        sendFormData(fieldValues);
        // 여기에 데이터 제출 로직 추가
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={"4px"}>
          <h1 data-section-id={SECTIONS.Motion.en}>{SECTIONS.Motion[lang]}</h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {tooltipText[lang]}
              </span>
            }
          />
        </Stack>

        <SwitchPrimary
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
      </Stack>

      {isChecked && (
        <>
          <Stack direction={"row"} gap={"24px"}>
            <Stack gap={"24px"} flex={1}>
              <Stack gap="4px">
                <Stack direction="row" gap="4px" alignItems="center">
                  <InputBox.Title>
                    {FIELD_VALIDATIONS["1900"].title[lang]}

                    <span style={{ color: "#FF0000", paddingLeft: "4px" }}>
                      *
                    </span>
                  </InputBox.Title>
                  {FIELD_VALIDATIONS["1900"].tooltip?.[lang] && (
                    <InputBox.Info
                      tooltipText={
                        <span style={{ whiteSpace: "pre-wrap" }}>
                          {FIELD_VALIDATIONS["1900"].tooltip[lang]}
                        </span>
                      }
                    />
                  )}
                  <InputBox.Number>1900</InputBox.Number>
                </Stack>
                <CheckboxComp
                  value={formData["1900"]?.realValue}
                  optionsString={"b0, b1, b2"}
                  labelsString={labelsString}
                  hasAllCheckbox={false}
                  lang={lang}
                  onChange={(newValue) => {
                    handleChange("1900", newValue);
                  }}
                />
              </Stack>
              <NumericInputField
                id="1901"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />
              <NumericInputField
                id="1903"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />
              <NumericInputField
                id="1904"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />
            </Stack>
            <Stack gap={"24px"} flex={1}>
              <NumericInputField
                id="1902"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />

              <SwitchField
                id="1915"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
              />

              {formData["1915"]?.realValue === "01" && (
                <>
                  <NumericInputField
                    id="1916"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isRequired
                  />
                  <NumericInputField
                    id="1917"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isRequired
                  />
                </>
              )}

              <NumericInputField
                id="1918"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />

              <SwitchField
                id="1919"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
              />

              {formData["1919"]?.realValue === "01" && (
                <NumericInputField
                  id="1920"
                  formData={formData}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  isRequired
                />
              )}
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="flex-end">
            <Button color="secondary" variant="contained" type="submit">
              {t("notify.send")}
            </Button>
          </Stack>
        </>
      )}
    </Form>
  );
};

export default Motion;

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
