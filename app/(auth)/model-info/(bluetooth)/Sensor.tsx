import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import { FormField } from "../page";
import NumericInputField from "../(components)/NumericInputField";
import SwitchField from "../(components)/SwitchField";
import { hasFormDataFields } from "../(utils)/@index";
import useLangStore from "@/utils/useLangStore";
import SelectField from "../(components)/SelectField";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";
import RangeThresholdField from "../(components)/RangeThresholdField";

const fieldIds = INCLUDE_FIELDS[SECTIONS.Sensor.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, selectValue?: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const Sensor = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = useMemo(
    () =>
      Object.keys(formData).filter(
        (key) =>
          fieldIds.includes(key) &&
          formData[key].beforeValue !== formData[key].realValue
      ),
    [formData]
  );

  if (!hasFormDataFields(formData, fieldIds)) return null;

  const handleChange = (id: string, value: string, selectValue?: string) => {
    onChange(id, value, selectValue);
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
        console.log("Form values:", fieldValues);

        sendFormData(fieldValues, setFormData);
      }}
    >
      <h1 data-section-id={SECTIONS.Sensor.en}>{SECTIONS.Sensor[lang]}</h1>

      <Stack direction={"row"} gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <SelectField
            id="2610"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("2610")}
          />
          <SwitchField
            id="2611"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2611")}
          />
          <SwitchField
            id="2612"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2612")}
          />
          {formData["2612"]?.realValue === "01" && (
            <>
              <RangeThresholdField
                id={["2613", "2614"]}
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                titleId="2613~4"
                isDirty={
                  isDirtyFields.includes("2613") ||
                  isDirtyFields.includes("2614")
                }
              />
              <RangeThresholdField
                id={["2615", "2616"]}
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                titleId="2615~6"
                helperText={
                  lang === "en"
                    ? "High humidity must be higher than low humidity."
                    : lang === "es"
                    ? "La humedad alta debe ser mayor que la humedad baja."
                    : "A umidade alta deve ser maior que a umidade baixa."
                }
                isDirty={
                  isDirtyFields.includes("2615") ||
                  isDirtyFields.includes("2616")
                }
              />
            </>
          )}

          <SwitchField
            id="2617"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2617")}
          />
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <NumericInputField
            id="2618"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2618")}
          />
          <NumericInputField
            id="2619"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2619")}
          />

          <NumericInputField
            id="2620"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2620")}
          />

          <SwitchField
            id="2621"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2621")}
          />
          <NumericInputField
            id="2622"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2622")}
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
          {t("common.save")}
        </Button>
      </Stack>
    </Form>
  );
};

export default Sensor;

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
