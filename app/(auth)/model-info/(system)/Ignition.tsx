import { useRef, useState } from "react";
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
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}
const tooltipText = {
  en: "The ignition function detects whether a vehicle's engine is on or off. \n• Default : On",
  ps: "A função de ignição detecta se o motor de um veículo está ligado ou desligado. \n• Padrão  : Ativado",
  es: "La función de Activado detecta si el motor de un vehículo está Activado o Desactivado. \n• Predeterminado: Activado",
};

const error = {
  1705: {
    en: "Cannot be less than the value of 1708",
    es: "No puede ser menor que el valor de 1708",
    ps: "Não pode ser menor que o valor de 1708",
  },
  1708: {
    en: "Cannot be greater than the value of 1705",
    es: "No puede ser mayor que el valor de 1705",
    ps: "Não pode ser maior que o valor de 1705",
  },
};

const fieldIds = INCLUDE_FIELDS[SECTIONS.Ignition.en];

const Ignition = ({ formData, onChange }: Props) => {
  const { sendFormData, isLoading } = useSendFormData();

  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const [isChecked, setIsChecked] = useState(true);

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
        sendFormData(fieldValues);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={"4px"}>
          <h1 data-section-id={SECTIONS.Ignition.en}>
            {SECTIONS.Ignition[lang]}
          </h1>
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
              <SelectField
                id="1700"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
              <NumericInputField
                id="1702"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />
              <NumericInputField
                id="1701"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />
              <NumericInputField
                id="1705"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
                isSwitch
                switchDisabled={
                  formData["1711"]?.realValue === "00" ||
                  formData["1711"]?.realValue === "0" ||
                  formData["1713"]?.realValue === "00" ||
                  formData["1713"]?.realValue === "0"
                }
                customError={
                  formData["1708"]?.realValue
                    ? Number(formData["1708"]?.realValue) >
                      Number(formData["1705"]?.realValue)
                    : false
                }
                customErrorMessage={error[1705][lang]}
              />
              <NumericInputField
                id="1708"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
                isSwitch
                switchDisabled={
                  formData["1711"]?.realValue === "00" ||
                  formData["1711"]?.realValue === "0" ||
                  formData["1713"]?.realValue === "00" ||
                  formData["1713"]?.realValue === "0"
                }
                customError={
                  formData["1705"]?.realValue
                    ? Number(formData["1705"]?.realValue) <
                      Number(formData["1708"]?.realValue)
                    : false
                }
                customErrorMessage={error[1708][lang]}
              />

              <NumericInputField
                id="1706"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />

              <NumericInputField
                id="1709"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />
            </Stack>
            <Stack gap={"24px"} flex={1}>
              <NumericInputField
                id="1707"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />

              <NumericInputField
                id="1710"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />

              <NumericInputField
                id="1711"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
                isSwitch
                switchDisabled={
                  formData["1705"]?.realValue === "00" ||
                  formData["1705"]?.realValue === "0" ||
                  formData["1708"]?.realValue === "00" ||
                  formData["1708"]?.realValue === "0"
                }
              />

              <NumericInputField
                id="1713"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
                isSwitch
                switchDisabled={
                  formData["1705"]?.realValue === "00" ||
                  formData["1705"]?.realValue === "0" ||
                  formData["1708"]?.realValue === "00" ||
                  formData["1708"]?.realValue === "0"
                }
              />

              <NumericInputField
                id="1712"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />

              <NumericInputField
                id="1714"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />

              <NumericInputField
                id="1715"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />

              <NumericInputField
                id="1716"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isRequired
              />

              <SwitchField
                id="1717"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="flex-end">
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isLoading}
            >
              {t("notify.send")}
            </Button>
          </Stack>
        </>
      )}
    </Form>
  );
};

export default Ignition;

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
