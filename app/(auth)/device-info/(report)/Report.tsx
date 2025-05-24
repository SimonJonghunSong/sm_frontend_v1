import { useRef, Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import SelectField from "../(components)/SelectField";
import NumericInputField from "../(components)/NumericInputField";
import SwitchField from "../(components)/SwitchField";
import TextInputField from "../(components)/TextInputField";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";
import DualCheckboxField from "../(components)/DualCheckboxField";

const fieldIds = INCLUDE_FIELDS[SECTIONS.Report.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const Report = ({ formData, onChange, setFormData }: Props) => {
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

  const is1072Error = !/^[A-Za-z0-9]{32}$/.test(formData["1073"]?.value);

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
      <h1 data-section-id={SECTIONS.Report.en}>{SECTIONS.Report[lang]}</h1>

      <Stack direction={"row"} gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <SelectField
            id="1055"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1055")}
          />
          <DualCheckboxField
            id="1058"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            firstOptionLabel={{
              en: t("configuration.report.server"),
              es: t("configuration.report.server"),
              pt: t("configuration.report.server"),
            }}
            secondOptionLabel={{
              en: t("configuration.report.sms"),
              es: t("configuration.report.sms"),
              pt: t("configuration.report.sms"),
            }}
            isDirty={isDirtyFields.includes("1058")}
          />
          <SwitchField
            id="1064"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1064")}
          />
          <SwitchField
            id="1069"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1069")}
          />
        </Stack>
        <Stack gap={"24px"} flex={1}>
          {!!formData["1072"] && (
            <Stack gap={"16px"} style={{ width: "100%" }}>
              <SwitchField
                id="1072"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("1072")}
              />
              {formData["1072"]?.realValue === "01" && (
                <TextInputField
                  id="1073"
                  formData={formData}
                  error={is1072Error && formData["1073"]?.value !== ""}
                  helperText={
                    is1072Error && formData["1073"]?.value !== ""
                      ? FIELD_ERRORS["1073"][lang]
                      : undefined
                  }
                  onChange={handleChange}
                  style={{ width: "100%" }}
                  isDirty={isDirtyFields.includes("1073")}
                />
              )}
            </Stack>
          )}

          <NumericInputField
            id="1074"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1074")}
          />

          <SelectField
            id="1075"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1075")}
          />

          <SwitchField
            id="1079"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1079")}
          />
          <SwitchField
            id="1097"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1097")}
          />
          <SwitchField
            id="1099"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("1099")}
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

export default Report;

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
