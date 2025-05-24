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
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import TextInputField from "app/(auth)/device-info/(components)/TextInputField";
import getMinMaxLengthError from "app/(auth)/device-info/(utils)/getMinMaxLengthError";
import hasFormDataFields from "app/(auth)/device-info/(utils)/hasFormDataFields";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";
import EditDot from "../(components)/EditDot";

const fieldIds = INCLUDE_FIELDS[SECTIONS.Rf.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}
const tooltipText = {
  en: "Use of RF(Radio Frequency). \n• Default : On",
  ps: "Uso de RF (Frequência de Rádio). \n• Padrão : Ativado",
  es: "Uso de RF (Radio Frecuencia). \n• Predeterminado: Activado",
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

const Rf = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = Object.keys(formData).filter((key) => {
    return (
      fieldIds.includes(key) &&
      formData[key].beforeValue !== formData[key].realValue
    );
  });

  if (!hasFormDataFields(formData, fieldIds)) return null;

  const is2810Error = !/^[A-Za-z0-9]{32}$/.test(formData["2810"]?.value);

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
          <h1 data-section-id={SECTIONS.Rf.en}>{SECTIONS.Rf[lang]}</h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {tooltipText[lang]}
              </span>
            }
          />
          <InputBox.Number>2500</InputBox.Number>
          {isDirtyFields.includes("2500") && <EditDot />}
        </Stack>

        <SwitchPrimary
          onChange={(e) => handleChange("2500", e.target.checked ? "01" : "00")}
          checked={formData["2500"].realValue === "01"}
        />
      </Stack>

      {formData["2500"]?.realValue === "01" && (
        <>
          <Stack flexWrap="wrap" direction={"row"} gap={"32px 16px"}>
            <Stack direction="column" gap={"16px"} flex={1}>
              <SelectField
                id="2501"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2501")}
              />
              <NumericInputField
                id="2502"
                formData={formData}
                onChange={handleChange}
                isSwitch
                isDirty={isDirtyFields.includes("2502")}
              />
              <NumericInputField
                id="2505"
                formData={formData}
                onChange={handleChange}
                {...getMinMaxLengthError({
                  id: "2505",
                  formData,
                  min: 6,
                  max: 10,
                })}
                isDirty={isDirtyFields.includes("2505")}
              />
              <NumericInputField
                id="2503"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2503")}
              />
              <NumericInputField
                id="2504"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2504")}
              />
              <NumericInputField
                id="2800"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2800")}
              />
              <NumericInputField
                id="2801"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2801")}
              />
              <NumericInputField
                id="2802"
                formData={formData}
                onChange={handleChange}
              />
              <NumericInputField
                id="2803"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2803")}
              />
              <NumericInputField
                id="2804"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2804")}
              />
            </Stack>
            <Stack direction="column" gap={"16px"} flex={1}>
              <NumericInputField
                id="2805"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2805")}
              />
              <NumericInputField
                id="2806"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2806")}
              />
              {/* 체크박스 필요 */}
              <SelectField
                id="2808"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2808")}
              />
              <NumericInputField
                id="2809"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2809")}
              />

              <TextInputField
                id="2810"
                formData={formData}
                onChange={handleChange}
                error={is2810Error && formData["2810"]?.value !== ""}
                helperText={
                  is2810Error && formData["2810"]?.value !== ""
                    ? FIELD_ERRORS["2810"][lang]
                    : undefined
                }
                isDirty={isDirtyFields.includes("2810")}
              />

              <NumericInputField
                id="2506"
                formData={formData}
                onChange={handleChange}
                isSwitch
                isDirty={isDirtyFields.includes("2506")}
              />
              <NumericInputField
                id="2507"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2507")}
              />
              <NumericInputField
                id="2508"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2508")}
              />
              <SwitchField
                id="2510"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2510")}
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

export default Rf;

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
