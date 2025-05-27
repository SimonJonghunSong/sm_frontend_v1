import { useRef, Dispatch, SetStateAction, useMemo } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import NumericInputField from "../(components)/NumericInputField";
import { hasFormDataFields } from "../(utils)/@index";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";

const fieldIds = INCLUDE_FIELDS[SECTIONS.AntiTheft.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (
    id: string,
    value: string,
    alertId?: string,
    selectValue?: string
  ) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const tooltipText = {
  en: "Theft function uses a buzzer, immobilizer, and server alerts to protect against theft.\r\n• Default : On\r\n• Ignition must be on.\r\n• One of the inputs must be set to 'Anti-Theft Button.'\r\n• If one of the outputs is set to either an immobilizer or a buzzer, it can be automatically activated when an anti-theft violation occurs.",
  es: "La función antirrobo utiliza un zumbidor, inmovilizador y alertas del servidor para proteger contra robos.\r\n• Predeterminado : Activado\r\n• La ignición debe estar encendida.\r\n• Una de las entradas debe estar configurada como 'Botón Antirrobo'.\r\n• Si una de las salidas está configurada como inmovilizador o zumbido, se puede activar automáticamente cuando ocurre un exceso de antirrobo.",
  pt: "A função anti-roubo usa um alarme, imobilizador e alertas do servidor para proteger contra roubo.\r\n• Padrão  : Ativado\r\n• A ignição deve estar ligada.\r\n• Um dos inputs deve ser configurado como 'Botão Anti-Roubo'.\r\n• Se uma das saídas estiver configurada como imobilizador ou alarme, ela pode ser automaticamente ativada quando uma violação anti-roubo ocorrer.",
};

const Report = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = useMemo(() => {
    return Object.keys(formData).filter((key) => {
      return (
        fieldIds.includes(key) &&
        formData[key].realValue !== formData[key].beforeValue
      );
    });
  }, [formData]);

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
      <Stack direction={"row"} alignItems={"center"} gap={"4px"}>
        <h1 data-section-id={SECTIONS.AntiTheft.en}>
          {SECTIONS.AntiTheft[lang]}
        </h1>
        <InputBox.Info
          tooltipText={
            <span style={{ whiteSpace: "pre-wrap" }}>{tooltipText[lang]}</span>
          }
        />
      </Stack>

      <Stack flexWrap="wrap" direction={"row"} gap={"24px"}>
        <NumericInputField
          id="1050"
          formData={formData}
          onChange={handleChange}
          isDirty={isDirtyFields.includes("1050")}
        />

        <NumericInputField
          id="1051"
          formData={formData}
          onChange={handleChange}
          isDirty={isDirtyFields.includes("1051")}
        />
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

export default Report;

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
