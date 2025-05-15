import { useRef, useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import NumericInputField from "../(components)/NumericInputField";
import { SwitchPrimary } from "@/components/switches";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import SelectField from "../(components)/SelectField";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";

const fieldIds = INCLUDE_FIELDS[SECTIONS.InstallMode.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, selectValue?: string) => void;
}

const tooltipText = {
  en: "Mode that operates when the device is first installed in the vehicle.\nDevice will report messages in Install Mode.\n• Default : On\n* Off means the device will not Status Report in Install Mode, but it will still enter the mode based on the Ignition parameters.",
  ps: "Modo que opera quando o dispositivo é instalado pela primeira vez no veículo.\nO dispositivo reportará mensagens no Modo de Instalação.\n• Padrão  : Ativado\n* Desligado significa que o dispositivo não enviará Relatório de Status no Modo de Instalação, mas ainda entrará no modo com base nos parâmetros de Ignição.",
  es: "Modo que opera cuando el dispositivo se instala por primera vez en el vehículo.\nEl dispositivo informará mensajes en Modo de Instalación.\n• Predeterminado: Activado\n* Desactivado significa que el dispositivo no enviará el Informe de Estado en Modo de Instalación, pero aún ingresará en el modo basado en los parámetros de Ignición.",
};

const InstallMode = ({ formData, onChange }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const [isChecked, setIsChecked] = useState(true);
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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={"4px"}>
          <h1 data-section-id={SECTIONS.InstallMode.en}>
            {SECTIONS.InstallMode[lang]}
          </h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {tooltipText[lang]}
              </span>
            }
          />
        </Stack>

        <SwitchPrimary
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
      </Stack>

      {isChecked && (
        <>
          <Stack flexWrap="wrap" direction={"row"} gap={"32px 16px"}>
            <SelectField
              id="1602"
              formData={formData}
              onChange={handleChange}
            />

            <NumericInputField
              id="1603"
              formData={formData}
              onChange={handleChange}
            />
          </Stack>

          <Stack direction="row" justifyContent="flex-end">
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isLoading}
            >
              {t("common.save")}
            </Button>
          </Stack>
        </>
      )}
    </Form>
  );
};

export default InstallMode;

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
