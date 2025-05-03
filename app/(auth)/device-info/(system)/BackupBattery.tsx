import { useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import NumericInputField from "../(components)/NumericInputField";
import SwitchField from "../(components)/SwitchField";
import { SwitchPrimary } from "@/components/switches";
import { FIELD_VALIDATIONS } from "constants/field";
import SelectField from "../(components)/SelectField";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}

const BackupBattery = ({ formData, onChange }: Props) => {
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
              "1932",
              "1936",
              "1937",
              "1938",
              "1939",
              "1947",
              "1948",
              "1973",
              "1974",
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
      <h1>{t("model.add_model_pop_up.features-item.backup-battery")}</h1>

      <Stack flexWrap="wrap" direction={"row"} gap={"32px 16px"}>
        <SwitchField id="1932" formData={formData} onChange={handleChange} />
        <SwitchField id="1936" formData={formData} onChange={handleChange} />

        <NumericInputField
          id="1937"
          formData={formData}
          onChange={handleChange}
          isRequired
        />

        <NumericInputField
          id="1938"
          formData={formData}
          onChange={handleChange}
          isRequired
        />

        <NumericInputField
          id="1939"
          formData={formData}
          onChange={handleChange}
          isRequired
        />

        <NumericInputField
          id="1947"
          formData={formData}
          onChange={handleChange}
          isRequired
        />

        <SelectField
          id="1948"
          formData={formData}
          onChange={handleChange}
          isRequired
        />

        <SwitchField id="1973" formData={formData} onChange={handleChange} />
        <SwitchField id="1974" formData={formData} onChange={handleChange} />
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Button color="secondary" variant="contained" type="submit">
          {t("notify.send")}
        </Button>
      </Stack>
    </Form>
  );
};

export default BackupBattery;

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
