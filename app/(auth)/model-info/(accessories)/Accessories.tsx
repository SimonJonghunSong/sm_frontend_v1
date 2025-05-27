import { Dispatch, SetStateAction, useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import { FormField } from "../page";
import SwitchField from "../(components)/SwitchField";
import NumericInputField from "../(components)/NumericInputField";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import SelectField from "../(components)/SelectField";
import DualCheckboxField from "../(components)/DualCheckboxField";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import useSendFormData from "../(utils)/useSendFormData";

const fieldIds = INCLUDE_FIELDS[SECTIONS.Accessories.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, selectValue?: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const Accessories = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = Object.keys(formData).filter(
    (key) =>
      fieldIds.includes(key) &&
      formData[key].beforeValue !== formData[key].realValue
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
      <h1 data-section-id={SECTIONS.Accessories.en}>
        {SECTIONS.Accessories[lang]}
      </h1>

      <Stack direction="row" gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <SwitchField
            id="0610"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("0610")}
          />
          <SelectField
            id="2300"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("2300")}
          />
          <SelectField
            id="2301"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("2301")}
          />
          <SelectField
            id="2302"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("2302")}
          />
          <SelectField
            id="2303"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
          />
          <NumericInputField
            id="2304"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2304")}
          />
          <NumericInputField
            id="2305"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2305")}
          />

          <SelectField
            id="2306"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("2306")}
          />
          <NumericInputField
            id="2307"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2307")}
          />
          <NumericInputField
            id="2308"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2308")}
          />
          <NumericInputField
            id="2309"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2309")}
          />

          <NumericInputField
            id="2310"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2310")}
          />
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <SwitchField
            id="2311"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2311")}
          />
          <SwitchField
            id="2312"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2312")}
          />

          <DualCheckboxField
            id="2313"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            firstOptionLabel={{
              en: t("configuration.accessories.falling_edge"),
              es: t("configuration.accessories.falling_edge"),
              pt: t("configuration.accessories.falling_edge"),
            }}
            secondOptionLabel={{
              en: t("configuration.accessories.rising_edge"),
              es: t("configuration.accessories.rising_edge"),
              pt: t("configuration.accessories.rising_edge"),
            }}
            isDirty={isDirtyFields.includes("2313")}
          />

          <NumericInputField
            id="2314"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("2314")}
          />

          <DualCheckboxField
            id="2315"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            firstOptionLabel={{
              en: t("configuration.accessories.falling_edge"),
              es: t("configuration.accessories.falling_edge"),
              pt: t("configuration.accessories.falling_edge"),
            }}
            secondOptionLabel={{
              en: t("configuration.accessories.rising_edge"),
              es: t("configuration.accessories.rising_edge"),
              pt: t("configuration.accessories.rising_edge"),
            }}
            isDirty={isDirtyFields.includes("2315")}
          />

          <NumericInputField
            id="2316"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("2316")}
          />
          <NumericInputField
            id="2330"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2330")}
          />
          <NumericInputField
            id="2331"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2331")}
          />
          <NumericInputField
            id="2332"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2332")}
          />
          <NumericInputField
            id="2333"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2333")}
          />
          <NumericInputField
            id="2334"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2334")}
          />
          <NumericInputField
            id="2336"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2336")}
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
    </Form>
  );
};

export default Accessories;

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
