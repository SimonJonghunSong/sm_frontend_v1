import { useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack, TextField } from "@mui/material";
import { FormField } from "../page";
import NumericInputField from "../(components)/NumericInputField";
import SwitchField from "../(components)/SwitchField";
import { hasFormDataFields } from "../(utils)/@index";
import { SwitchPrimary } from "@/components/switches";
import { FIELD_VALIDATIONS } from "constants/field";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import SelectField from "../(components)/SelectField";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";

const fieldIds = INCLUDE_FIELDS[SECTIONS.Sensor.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}

const Sensor = ({ formData, onChange }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();
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

        // 필드 값들을 사용하여 수행할 작업
        console.log("Form values:", fieldValues);

        sendFormData(fieldValues);
        // 여기에 데이터 제출 로직 추가
      }}
    >
      <h1 data-section-id={SECTIONS.Sensor.en}>{SECTIONS.Sensor[lang]}</h1>

      <Stack flexWrap="wrap" direction={"row"} gap={"24px 16px"}>
        <SelectField
          id="2610"
          formData={formData}
          onChange={handleChange}
          isRequired
          isSwitch
        />

        <SwitchField id="2611" formData={formData} onChange={handleChange} />

        <SwitchField id="2612" formData={formData} onChange={handleChange} />

        {formData["2621"]?.realValue === "01" &&
          formData["2613"] &&
          formData["2614"] && (
            <Stack width={"calc(50% - 8px)"} gap={"8px"}>
              <Stack direction="column" gap="8px">
                <Stack direction="row" gap="4px" alignItems="center">
                  <InputBox.Title>
                    {FIELD_VALIDATIONS["2613"].title[lang]}
                    <span style={{ color: "#FF0000", paddingLeft: "4px" }}>
                      *
                    </span>
                  </InputBox.Title>
                  {FIELD_VALIDATIONS["2613"].tooltip?.[lang] && (
                    <InputBox.Info
                      tooltipText={
                        <span style={{ whiteSpace: "pre-wrap" }}>
                          {FIELD_VALIDATIONS["2613"].tooltip[lang]}
                        </span>
                      }
                    />
                  )}
                  <InputBox.Number>2613~4</InputBox.Number>
                </Stack>

                <Stack direction="row" gap="4px" alignItems="center">
                  <TextField
                    style={{ flex: 1 }}
                    type="number"
                    inputProps={{ min: -55 }}
                    error={
                      Number(formData["2613"]?.realValue) <
                        FIELD_VALIDATIONS["2613"].min ||
                      Number(formData["2613"]?.realValue) >
                        Number(formData["2614"]?.realValue)
                    }
                  />
                  ~
                  <TextField
                    style={{ flex: 1 }}
                    type="number"
                    inputProps={{ max: 125 }}
                    error={
                      Number(formData["2614"]?.realValue) >
                        FIELD_VALIDATIONS["2614"].max ||
                      Number(formData["2614"]?.realValue) <
                        Number(formData["2613"]?.realValue)
                    }
                    helperText={
                      Number(formData["2614"]?.realValue) >
                        FIELD_VALIDATIONS["2614"].max ||
                      Number(formData["2614"]?.realValue) <
                        Number(formData["2613"]?.realValue)
                        ? FIELD_ERRORS["2614"][lang]
                        : ""
                    }
                  />
                </Stack>
              </Stack>
            </Stack>
          )}

        <SwitchField id="2617" formData={formData} onChange={handleChange} />
        <SwitchField id="2617" formData={formData} onChange={handleChange} />

        <NumericInputField
          id="2618"
          formData={formData}
          onChange={handleChange}
          isRequired
        />
        <NumericInputField
          id="2619"
          formData={formData}
          onChange={handleChange}
          isRequired
        />

        <NumericInputField
          id="2620"
          formData={formData}
          onChange={handleChange}
          isRequired
        />

        <SwitchField id="2621" formData={formData} onChange={handleChange} />
      </Stack>

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

export default Sensor;

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
