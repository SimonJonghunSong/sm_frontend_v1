import { SetStateAction, Dispatch, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Divider, Stack, Typography } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import SelectField from "../(components)/SelectField";
import NumericInputField from "../(components)/NumericInputField";
import getMinMaxLengthError from "app/(auth)/device-info/(utils)/getMinMaxLengthError";
import hasFormDataFields from "app/(auth)/device-info/(utils)/hasFormDataFields";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";

const fieldIds = INCLUDE_FIELDS[SECTIONS.ErbList.en];

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

const error = {};

const ErbList = ({ formData, onChange, setFormData }: Props) => {
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
        <Stack direction="row" gap={"4px"}>
          <h1 data-section-id={SECTIONS.ErbList.en}>
            {SECTIONS.ErbList[lang]}
          </h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {tooltipText[lang]}
              </span>
            }
          />
        </Stack>
      </Stack>

      <Stack flexWrap="wrap" direction={"row"} gap={"32px 16px"}>
        <Stack direction="column" gap={"16px"} flex={1}>
          <h3>{t("configuration.rf.rf_device")} 1</h3>
          <NumericInputField
            id="2511"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2511",
              formData,
              min: 9,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2511")}
          />
          <NumericInputField
            id="2512"
            formData={formData}
            onChange={handleChange}
            isSwitch
            isDirty={isDirtyFields.includes("2512")}
          />
          <SelectField
            id="2513"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2513")}
          />
          <NumericInputField
            id="2514"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2514",
              formData,
              min: 6,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2514")}
          />
          <SelectField
            id="2515"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2515")}
          />
          <Divider />
          <h3>{t("configuration.rf.rf_device")} 2</h3>
          <NumericInputField
            id="2516"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2516",
              formData,
              min: 9,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2516")}
          />
          <NumericInputField
            id="2517"
            formData={formData}
            onChange={handleChange}
            isSwitch
            isDirty={isDirtyFields.includes("2517")}
          />
          <SelectField
            id="2518"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2518")}
          />
          <NumericInputField
            id="2519"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2519",
              formData,
              min: 6,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2519")}
          />
          <SelectField
            id="2520"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2520")}
          />

          <Divider />
          <h3>{t("configuration.rf.rf_device")} 3</h3>
          <NumericInputField
            id="2521"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2521",
              formData,
              min: 9,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2521")}
          />
          <NumericInputField
            id="2522"
            formData={formData}
            onChange={handleChange}
            isSwitch
            isDirty={isDirtyFields.includes("2522")}
          />
          <SelectField
            id="2523"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2523")}
          />
          <NumericInputField
            id="2524"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2524",
              formData,
              min: 6,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2524")}
          />
          <SelectField
            id="2525"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2525")}
          />
          <Divider />
          <h3>{t("configuration.rf.rf_device")} 4</h3>
          <NumericInputField
            id="2526"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2526",
              formData,
              min: 9,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2526")}
          />
          <NumericInputField
            id="2527"
            formData={formData}
            onChange={handleChange}
            isSwitch
            isDirty={isDirtyFields.includes("2527")}
          />
          <SelectField
            id="2528"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2528")}
          />
          <NumericInputField
            id="2529"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2529",
              formData,
              min: 6,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2529")}
          />
          <SelectField
            id="2530"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2530")}
          />
          <Divider />
          <h3>{t("configuration.rf.rf_device")} 5</h3>
          <NumericInputField
            id="2531"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2531",
              formData,
              min: 9,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2531")}
          />
          <NumericInputField
            id="2532"
            formData={formData}
            onChange={handleChange}
            isSwitch
            isDirty={isDirtyFields.includes("2532")}
          />
          <SelectField
            id="2533"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2533")}
          />
          <NumericInputField
            id="2534"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2534",
              formData,
              min: 6,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2534")}
          />
          <SelectField
            id="2535"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2535")}
          />
        </Stack>
        <Stack direction="column" gap={"16px"} flex={1}>
          <h3>{t("configuration.rf.rf_device")} 6</h3>
          <NumericInputField
            id="2536"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2536",
              formData,
              min: 9,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2536")}
          />
          <NumericInputField
            id="2537"
            formData={formData}
            onChange={handleChange}
            isSwitch
            isDirty={isDirtyFields.includes("2537")}
          />
          <SelectField
            id="2538"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2538")}
          />
          <NumericInputField
            id="2539"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2539",
              formData,
              min: 6,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2539")}
          />
          <SelectField
            id="2540"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2540")}
          />
          <Divider />
          <h3>{t("configuration.rf.rf_device")} 7</h3>
          <NumericInputField
            id="2541"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2541",
              formData,
              min: 9,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2541")}
          />
          <NumericInputField
            id="2542"
            formData={formData}
            onChange={handleChange}
            isSwitch
            isDirty={isDirtyFields.includes("2542")}
          />
          <SelectField
            id="2543"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2543")}
          />
          <NumericInputField
            id="2544"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2544",
              formData,
              min: 6,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2544")}
          />
          <SelectField
            id="2545"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2545")}
          />
          <Divider />
          <h3>{t("configuration.rf.rf_device")} 8</h3>
          <NumericInputField
            id="2546"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2546",
              formData,
              min: 9,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2546")}
          />
          <NumericInputField
            id="2547"
            formData={formData}
            onChange={handleChange}
            isSwitch
            isDirty={isDirtyFields.includes("2547")}
          />
          <SelectField
            id="2548"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2548")}
          />
          <NumericInputField
            id="2549"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2549",
              formData,
              min: 6,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2549")}
          />
          <SelectField
            id="2550"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2550")}
          />
          <Divider />
          <h3>{t("configuration.rf.rf_device")} 9</h3>
          <NumericInputField
            id="2551"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2551",
              formData,
              min: 9,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2551")}
          />
          <NumericInputField
            id="2552"
            formData={formData}
            onChange={handleChange}
            isSwitch
            isDirty={isDirtyFields.includes("2552")}
          />
          <SelectField
            id="2553"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2553")}
          />
          <NumericInputField
            id="2554"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2554",
              formData,
              min: 6,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2554")}
          />
          <SelectField
            id="2555"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2555")}
          />
          <Divider />
          <h3>{t("configuration.rf.rf_device")} 10</h3>
          <NumericInputField
            id="2556"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2556",
              formData,
              min: 9,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2556")}
          />
          <NumericInputField
            id="2557"
            formData={formData}
            onChange={handleChange}
            isSwitch
            isDirty={isDirtyFields.includes("2557")}
          />
          <SelectField
            id="2558"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2558")}
          />
          <NumericInputField
            id="2559"
            formData={formData}
            onChange={handleChange}
            isSwitch
            {...getMinMaxLengthError({
              id: "2559",
              formData,
              min: 6,
              max: 10,
            })}
            isDirty={isDirtyFields.includes("2559")}
          />
          <SelectField
            id="2560"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("2560")}
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

export default ErbList;

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

  h3 {
    font-weight: 500;
    font-size: 15px;
    line-height: 14px;
    color: #6f6f6f;
    width: calc(50% - 8px);
  }
`;
