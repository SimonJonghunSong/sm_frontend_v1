import { useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import { FormField } from "../page";
import SwitchField from "../(components)/SwitchField";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import InputBox from "@/components/inputbox/InputBox";
import useSendFormData from "../(utils)/useSendFormData";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}

const fieldIds = INCLUDE_FIELDS[SECTIONS.GeofenceConfig.en];

const tooltipText = {
  en: "Control the option items of the geofence settings.",
  es: "Controlar los elementos de opción de la configuración de geocercas.",
  pt: "Controle os itens de opção das configurações de Geofence.",
};

const GeofenceConfig = ({ formData, onChange }: Props) => {
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
        console.log("Form values:", fieldValues);

        // 여기에 데이터 제출 로직 추가
        sendFormData(fieldValues);
      }}
    >
      <Stack direction="row" gap={"4px"} alignItems="center">
        <h1 data-section-id={SECTIONS.GeofenceConfig.en}>
          {SECTIONS.GeofenceConfig[lang]}
        </h1>
        <InputBox.Info tooltipText={tooltipText[lang]} />
      </Stack>

      <Stack direction="row" gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <SwitchField
            id="9000"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
          <SwitchField
            id="9001"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <SwitchField
            id="9002"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
          />
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          id="geofence-config-submit"
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

export default GeofenceConfig;

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
