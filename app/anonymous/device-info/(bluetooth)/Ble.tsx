import { useRef } from "react";
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

const fieldIds = INCLUDE_FIELDS[SECTIONS.Ble.en];

const checkboxOptions = {
  "4028": {
    optionString: "b0, b2, b4, b7, b8, b9, b10",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "ELA, ConMet, ELA+ConMet, Otodata, ELA+Otodata, ConMet+Otodata, ELA+ConMet+Otodata",
      TEXT_PT_ITEM_CONTENT:
        "ELA, ConMet, ELA+ConMet, Otodata, ELA+Otodata, ConMet+Otodata, ELA+ConMet+Otodata",
      TEXT_ES_ITEM_CONTENT:
        "ELA, ConMet, ELA+ConMet, Otodata, ELA+Otodata, ConMet+Otodata, ELA+ConMet+Otodata",
    },
  },
};

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}

const Ble = ({ formData, onChange }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();
  if (!formData["4021"] || !hasFormDataFields(formData, fieldIds)) return null;

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
        sendFormData(fieldValues);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Stack direction="row" alignItems="center" gap="16px">
          <h1 data-section-id={SECTIONS.Ble.en}>
            {t("configuration.ble.ble")}
          </h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                <p>{FIELD_VALIDATIONS["4021"].tooltip[lang]}</p>
              </span>
            }
          />
          <InputBox.Number>4021</InputBox.Number>
        </Stack>

        <SwitchPrimary
          checked={formData["4021"]?.realValue === "01"}
          onChange={(e) => onChange("4021", e.target.checked ? "01" : "00")}
        />
      </Stack>

      {formData["4021"]?.realValue === "01" && (
        <Stack direction={"row"} gap={"24px"}>
          <Stack gap={"24px"} flex={1}>
            <NumericInputField
              id="4020"
              formData={formData}
              onChange={handleChange}
              isSwitch
              style={{ width: "100%" }}
            />

            <SelectField
              id="4028"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
            />

            <SwitchField
              id="4025"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
            />

            <NumericInputField
              id="4012"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            <NumericInputField
              id="4026"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
            <NumericInputField
              id="4027"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
            />
          </Stack>

          <Stack gap={"24px"} flex={1}>
            <NumericInputField
              id="4000"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
            />

            <NumericInputField
              id="4010"
              formData={formData}
              onChange={handleChange}
              isSwitch
              style={{ width: "100%" }}
            />

            <NumericInputField
              id="4011"
              formData={formData}
              onChange={handleChange}
              isSwitch
              style={{ width: "100%" }}
            />

            <NumericInputField
              id="4013"
              formData={formData}
              onChange={handleChange}
              isSwitch
              style={{ width: "100%" }}
            />

            <NumericInputField
              id="4014"
              formData={formData}
              onChange={handleChange}
              isSwitch
              style={{ width: "100%" }}
            />
          </Stack>
        </Stack>
      )}

      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          disabled={isLoading}
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
