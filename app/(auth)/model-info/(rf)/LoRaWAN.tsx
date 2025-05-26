import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import SelectField from "../(components)/SelectField";
import NumericInputField from "../(components)/NumericInputField";
import { SwitchPrimary } from "@/components/switches";
import TextInputField from "../(components)/TextInputField";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";
import EditDot from "../(components)/EditDot";

const fieldIds = INCLUDE_FIELDS[SECTIONS.LoRaWAN.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, selectValue?: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}
const tooltipText = {
  en: "The type of presence function.\n• Option\n - Participant\n - Coordinator",
  ps: "O tipo de função de presença.\n• Opção\n - Participante\n - Coordenador",
  es: "El tipo de función de presencia.\n• Opción\n - Participante\n - Coordinador",
};

const error = {};

const LoRaWAN = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const [isChecked, setIsChecked] = useState(true);
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

  // LoRa Device EUI
  const is2582Error = !/^[0-9A-Fa-f]{16}$/.test(formData["2582"]?.value);
  // LoRa Device Address
  const is2585Error = !/^[0-9A-Fa-f]{8}$/.test(formData["2585"]?.value);
  // LoRa Network Session Key
  const is2586Error = !/^[0-9A-Fa-f]{32}$/.test(formData["2586"]?.value);
  // LoRa App. Session Key
  const is2587Error = !/^[0-9A-Fa-f]{32}$/.test(formData["2587"]?.value);

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
          <h1 data-section-id={SECTIONS.LoRaWAN.en}>
            {SECTIONS.LoRaWAN[lang]}
          </h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {tooltipText[lang]}
              </span>
            }
          />
          <InputBox.Number>2581</InputBox.Number>
          {isDirtyFields.includes("2581") && <EditDot />}
        </Stack>

        <SwitchPrimary
          checked={formData["2581"]?.realValue === "01"}
          onChange={(e) => onChange("2581", e.target.checked ? "01" : "00")}
        />
      </Stack>

      {isChecked && (
        <>
          <Stack flexWrap="wrap" direction={"row"} gap={"32px 16px"}>
            <Stack direction="column" gap={"16px"} flex={1}>
              <TextInputField
                id="2582"
                formData={formData}
                onChange={handleChange}
                error={is2582Error && formData["2582"]?.value !== ""}
                helperText={
                  is2582Error && formData["2582"]?.value !== ""
                    ? FIELD_ERRORS["2582"][lang]
                    : undefined
                }
                isDirty={isDirtyFields.includes("2582")}
              />
              <NumericInputField
                id="2583"
                formData={formData}
                onChange={handleChange}
                isSwitch
                isDirty={isDirtyFields.includes("2583")}
              />
              <NumericInputField
                id="2584"
                formData={formData}
                onChange={handleChange}
                isSwitch
                isDirty={isDirtyFields.includes("2584")}
              />
              <TextInputField
                id="2585"
                formData={formData}
                onChange={handleChange}
                error={is2585Error && formData["2585"]?.value !== ""}
                helperText={
                  is2585Error && formData["2585"]?.value !== ""
                    ? FIELD_ERRORS["2585"][lang]
                    : undefined
                }
              />
              <TextInputField
                id="2586"
                formData={formData}
                onChange={handleChange}
                error={is2586Error && formData["2586"]?.value !== ""}
                helperText={
                  is2586Error && formData["2586"]?.value !== ""
                    ? FIELD_ERRORS["2586"][lang]
                    : undefined
                }
                isDirty={isDirtyFields.includes("2586")}
              />
              <TextInputField
                id="2587"
                formData={formData}
                onChange={handleChange}
                error={is2587Error && formData["2587"]?.value !== ""}
                helperText={
                  is2587Error && formData["2587"]?.value !== ""
                    ? FIELD_ERRORS["2587"][lang]
                    : undefined
                }
                isDirty={isDirtyFields.includes("2587")}
              />
            </Stack>
            <Stack direction="column" gap={"16px"} flex={1}>
              <SelectField
                id="2588"
                formData={formData}
                onChange={handleChange}
                isSwitch
                isDirty={isDirtyFields.includes("2588")}
              />
              <NumericInputField
                id="2589"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2589")}
              />
              <NumericInputField
                id="2590"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2590")}
              />
              <NumericInputField
                id="2591"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2591")}
              />
              <NumericInputField
                id="2592"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2592")}
              />
              <NumericInputField
                id="2593"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2593")}
              />
              <SelectField
                id="2594"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2594")}
              />
              <SelectField
                id="2570"
                formData={formData}
                onChange={handleChange}
              />
              <NumericInputField
                id="2595"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2595")}
              />
              <NumericInputField
                id="2596"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2596")}
              />
              <NumericInputField
                id="2597"
                formData={formData}
                onChange={handleChange}
                isDirty={isDirtyFields.includes("2597")}
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
              {t("common.save")}
            </Button>
          </Stack>
        </>
      )}
    </Form>
  );
};

export default LoRaWAN;

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
