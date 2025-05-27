import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import { FormField } from "../page";
import NumericInputField from "../(components)/NumericInputField";
import SwitchField from "../(components)/SwitchField";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";
import { hasFormDataFields } from "../(utils)/@index";
import SelectField from "../(components)/SelectField";

const fieldIds = INCLUDE_FIELDS[SECTIONS.Power.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const Power = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
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
      <h1 data-section-id={SECTIONS.Power.en}>{SECTIONS.Power[lang]}</h1>

      <Stack direction={"row"} gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <SelectField
            id="1930"
            isSwitch
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1930")}
          />
          <SwitchField
            id="1931"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1931")}
          />
          <NumericInputField
            id="1933"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1933")}
          />

          <NumericInputField
            id="1934"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1934")}
          />

          <NumericInputField
            id="1935"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1935")}
          />
        </Stack>
        <Stack gap={"24px"} flex={1}>
          <NumericInputField
            id="1939"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1939")}
          />

          <NumericInputField
            id="1940"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1940")}
          />

          <NumericInputField
            id="1941"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1941")}
          />

          <NumericInputField
            id="1942"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1942")}
          />

          <NumericInputField
            id="1943"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1943")}
          />

          {!!formData["1944"] && (
            <Stack gap={"16px"} style={{ width: "100%" }}>
              <SwitchField
                id="1944"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("1944")}
              />

              {formData["1944"]?.realValue === "01" && (
                <>
                  <NumericInputField
                    id="1945"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1945")}
                  />
                  <NumericInputField
                    id="1946"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isDirty={isDirtyFields.includes("1946")}
                  />
                </>
              )}
            </Stack>
          )}

          {!!formData["1949"] && (
            <Stack gap={"16px"} style={{ width: "100%" }}>
              <SwitchField
                id="1949"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("1949")}
              />

              {formData["1949"]?.realValue === "01" && (
                <>
                  {/* // TODO Checkbox 추가 Power Saving Mode1 Power Saving Mode2 문서에 없음 ㅡㅡ*/}

                  {/* <NumericInputField
                    id="1950"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                  /> */}
                </>
              )}
            </Stack>
          )}

          {!!formData["1952"] && (
            <Stack gap={"32px"} style={{ width: "100%" }}>
              <SwitchField
                id="1952"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("1952")}
              />

              {formData["1952"]?.realValue === "01" && (
                <>
                  <NumericInputField
                    id="1953"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isSwitch
                    isDirty={isDirtyFields.includes("1953")}
                  />
                  <NumericInputField
                    id="1954"
                    formData={formData}
                    onChange={handleChange}
                    style={{ width: "100%" }}
                    isSwitch
                    isDirty={isDirtyFields.includes("1954")}
                  />
                </>
              )}
            </Stack>
          )}

          <NumericInputField
            id="1959"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("1959")}
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

export default Power;

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
