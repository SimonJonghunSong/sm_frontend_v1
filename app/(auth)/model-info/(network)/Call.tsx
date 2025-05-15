import { useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import { FormField } from "../page";
import NumericInputField from "../(components)/NumericInputField";
import SwitchField from "../(components)/SwitchField";
import { hasFormDataFields } from "../(utils)/@index";
import TextInputField from "../(components)/TextInputField";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import useSendFormData from "../(utils)/useSendFormData";
interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, selectValue?: string) => void;
}

const fieldIds = INCLUDE_FIELDS[SECTIONS.Call.en];

const Call = ({ formData, onChange }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const { sendFormData, isLoading } = useSendFormData();

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
        sendFormData(fieldValues);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <h1 data-section-id={SECTIONS.Call.en}>{SECTIONS.Call[lang]}</h1>

      <Stack direction={"row"} gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <SwitchField
            id="1035"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />

          {formData["1035"]?.realValue === "01" && (
            <>
              <TextInputField
                id="1036"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
              />

              <TextInputField
                id="1037"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
              />

              <TextInputField
                id="1038"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
              />

              <TextInputField
                id="1039"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
              />

              <TextInputField
                id="1040"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
              />
            </>
          )}
        </Stack>
        <Stack gap={"24px"} flex={1}>
          <NumericInputField
            id="1041"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />

          <NumericInputField
            id="1042"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />

          <SwitchField id="1043" formData={formData} onChange={handleChange} />
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="flex-end" alignItems="center">
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          disabled={isLoading}
        >
          {t("common.save")}
        </Button>
      </Stack>
    </Form>
  );
};

export default Call;

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
