import { useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack, TextField } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import { FormField } from "../page";
import SelectField from "../(components)/SelectField";
import NumericInputField from "../(components)/NumericInputField";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import TextInputField from "../(components)/TextInputField";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}

const BackupServer = ({ formData, onChange }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);

  if (!formData) return null;

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
          if (
            [
              "1008",
              "1009",
              "1010",
              "1011",
              "1012",
              "1017",
              "1018",
              "1019",
            ].includes(key)
          ) {
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

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h1>Backup Server</h1>
        <Button color="secondary" variant="contained" type="submit">
          {t("notify.send")}
        </Button>
      </Stack>
      <Stack flexWrap="wrap" direction={"row"} gap={"24px 16px"}>
        <TextInputField
          id="1008"
          formData={formData}
          onChange={handleChange}
          error={!/^[A-Za-z0-9\-.]*$/.test(formData["1005"].realValue)}
          helperText={
            !/^[A-Za-z0-9\-.]*$/.test(formData["1005"].realValue)
              ? FIELD_ERRORS["alphaNumericPattern"][lang]
              : undefined
          }
        />

        <SelectField id="1010" formData={formData} onChange={handleChange} />

        <NumericInputField
          id="1006"
          formData={formData}
          onChange={handleChange}
        />

        <Stack width={"calc(50% - 8px)"} gap={"16px"}>
          <Stack justifyContent="space-between" direction="row">
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                {FIELD_VALIDATIONS["1011"].title[lang]}
              </InputBox.Title>
              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {FIELD_VALIDATIONS["1011"].tooltip[lang]}
                  </span>
                }
              />
              <InputBox.Number>1011</InputBox.Number>
            </Stack>

            <SwitchPrimary
              onChange={(e) =>
                handleChange("1011", e.target.checked ? "01" : "00")
              }
              checked={formData["1011"].realValue === "01"}
            />
          </Stack>
        </Stack>

        <NumericInputField
          id="1012"
          formData={formData}
          onChange={handleChange}
        />

        <NumericInputField
          id="1017"
          formData={formData}
          onChange={handleChange}
        />

        <NumericInputField
          id="1018"
          formData={formData}
          onChange={handleChange}
        />

        <NumericInputField
          id="1019"
          formData={formData}
          onChange={handleChange}
        />
      </Stack>
    </Form>
  );
};

export default BackupServer;

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
