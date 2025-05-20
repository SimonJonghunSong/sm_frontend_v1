import { SetStateAction, Dispatch, useRef, useState, useMemo } from "react";
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

const fieldIds = INCLUDE_FIELDS[SECTIONS.IdleMode.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const tooltipText = {
  en: "Device will report messages in Idle Mode.\n• Default : On\n* Off means the device will not Status Report in Idle Mode, but it will still enter the mode based on the Idle parameters.\n* Idle mode won't fully turn off unless 1611 or 1612 is set to 65,535, even if Idle Mode is off.",
  ps: "O dispositivo reportará mensagens no Modo Ocioso.\n• Padrão  : Ativado\n* Desligado significa que o dispositivo não enviará Relatório de Status no Modo Ocioso, mas ainda entrará no modo com base nos parâmetros Ociosos.\n* O modo Ocioso não será totalmente desligado, a menos que 1611 ou 1612 esteja configurado para 65.535, mesmo que o Modo Ocioso esteja desligado.",
  es: "El dispositivo informará mensajes en Modo Inactivo.\n• Predeterminado: Activado\n* Desactivado significa que el dispositivo no enviará el Informe de Estado en Modo Inactivo, pero aún ingresará en el modo basado en los parámetros de Inactivo.\n* El modo Inactivo no se apagará por completo a menos que 1611 o 1612 estén configurados en 65,535, incluso si el Modo Inactivo está Desactivado.",
};

const IdleMode = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const [isChecked, setIsChecked] = useState(true);
  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = useMemo(() => {
    return Object.keys(formData).filter((key) => {
      return (
        fieldIds.includes(key) &&
        formData[key].value !== formData[key].realValue
      );
    });
  }, [formData]);

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
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap={"4px"}>
          <h1 data-section-id={SECTIONS.IdleMode.en}>
            {SECTIONS.IdleMode[lang]}
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
              id="1610"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("1610")}
            />

            <NumericInputField
              id="1611"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("1611")}
            />
            <NumericInputField
              id="1612"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("1612")}
            />
            <NumericInputField
              id="1613"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("1613")}
            />
            <NumericInputField
              id="1614"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("1614")}
            />
            <NumericInputField
              id="1615"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("1615")}
            />
            <NumericInputField
              id="1616"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("1616")}
            />
            <NumericInputField
              id="1617"
              formData={formData}
              onChange={handleChange}
              isDirty={isDirtyFields.includes("1617")}
            />
          </Stack>

          <Stack direction="row" justifyContent="flex-end">
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isLoading || !isDirtyFields.length}
            >
              {t("notify.send")}
            </Button>
          </Stack>
        </>
      )}
    </Form>
  );
};

export default IdleMode;

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
