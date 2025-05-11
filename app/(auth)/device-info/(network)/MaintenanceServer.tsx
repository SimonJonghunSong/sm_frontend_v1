import { useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import { SwitchPrimary } from "@/components/switches";
import useLangStore from "@/utils/useLangStore";
import { FIELD_VALIDATIONS } from "constants/field";
import { FormField } from "../page";
import NumericInputField from "../(components)/NumericInputField";
import { FIELD_ERRORS } from "constants/fieldErrorValidations";
import TextInputField from "../(components)/TextInputField";
import TimeHMA from "../(components)/TimeHMA";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import hasFormDataFields from "app/(auth)/device-info/(utils)/hasFormDataFields";
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}

const tooltipText = {
  en: "The SCUTI server (maintenance server) in STSUNLAB operates separately for the customer. STSUNLAB provides commands to change the server's settings (e.g., IP, port, interval). These commands should only be used by customers running the maintenance server independently.",
  pt: "O servidor SCUTI (servidor de manutenção) no STSUNLAB opera separadamente para o cliente. A STSUNLAB fornece comandos para alterar as configurações do servidor (por exemplo, IP, porta, intervalo). Esses comandos devem ser usados apenas por clientes que operam o servidor de manutenção de forma independente.",
  es: "El servidor SCUTI (servidor de mantenimiento) en STSUNLAB opera de forma independiente para el cliente. STSUNLAB proporciona comandos para cambiar la configuración del servidor (por ejemplo, IP, puerto, intervalo). Estos comandos solo deben ser utilizados por clientes que operan el servidor de mantenimiento de forma independiente.",
};

const fieldsId = INCLUDE_FIELDS[SECTIONS.MaintenanceServer.en];

const MaintenanceServer = ({ formData, onChange }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const { sendFormData, isLoading } = useSendFormData();

  if (!hasFormDataFields(formData, fieldsId)) return null;

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
          if (fieldsId.includes(key)) {
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
      <Stack direction="row" gap="4px" alignItems="center">
        <h1 data-section-id={SECTIONS.MaintenanceServer.en}>
          {SECTIONS.MaintenanceServer[lang]}
        </h1>
        <InputBox.Info tooltipText={tooltipText[lang]} />
      </Stack>

      <Stack direction={"row"} gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <TextInputField
            id="1020"
            formData={formData}
            onChange={handleChange}
            isRequired
            error={!/^[A-Za-z0-9\-.]*$/.test(formData["1020"]?.realValue)}
            helperText={
              !/^[A-Za-z0-9\-.]*$/.test(formData["1020"]?.realValue)
                ? FIELD_ERRORS["alphaNumericPatternWithSymbols"][lang]
                : undefined
            }
          />
          <NumericInputField
            id="1021"
            formData={formData}
            onChange={handleChange}
            isRequired
          />
        </Stack>
        <Stack gap={"24px"} flex={1}>
          <NumericInputField
            id="1022"
            formData={formData}
            onChange={handleChange}
            isRequired
          />
          <TimeHMA
            id="1023"
            formData={formData}
            isRequired
            isSwitch
            value={
              formData["1023"]?.realValue
                ? formData["1023"]?.realValue.replaceAll(":", "")
                : ""
            }
            onChange={(id, value) => {
              if (!value) {
                handleChange(id, "00:00");
              } else {
                handleChange(id, `${value.slice(0, 2)}:${value.slice(2)}`);
              }
            }}
          />
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
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

export default MaintenanceServer;

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
