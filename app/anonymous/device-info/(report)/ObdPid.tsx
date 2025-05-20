import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack, TextField } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import hasFormDataFields, {
  filterFormDataFields,
} from "../(utils)/hasFormDataFields";
import InputBox from "@/components/inputbox/InputBox";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";
import EditDot from "../(components)/EditDot";

export const OBD_PID = INCLUDE_FIELDS[SECTIONS.OBDPID.en];

const tooltip = {
  en: `Enter PIDs to check vehicle diagnostic data. (Up to 60 PIDs can be added.)\r\n* PIDs are 2 characters (e.g., 01, 1F).\r\n* Supported PIDs : Refer to "B-2. OBDII PIDs table - Universal Reporting Guide OBD" document\r\n* Valid PIDs not supported by the device will show as “FFFFFFFF” in Status Report or Alert Report.\r\n(Invalid PID characters will show as "Error.")`,
  pt: `Insira PIDs para verificar os dados de diagnóstico do veículo. (Até 60 PIDs podem ser adicionados.)\r\n* PIDs são 2 caracteres (por exemplo, 01, 1F).\r\n* Suportados PIDs : Consulte o documento "B-2. Tabela de PIDs OBDII - Guia de Relatórios Universais OBD" document\r\n* PIDs válidos não suportados pelo dispositivo aparecerão como “FFFFFFFF” no Relatório de Status ou Relatório de Alerta.\r\n(Caracteres PID inválidos aparecerão como "Erro.")`,
  es: `Ingrese PIDs para verificar los datos de diagnóstico del vehículo. (Se pueden agregar hasta 60 PIDs)\r\n* Los PIDs son de 2 caracteres (por ejemplo, 01, 1F).\r\n* Suportados PIDs : Consulte el documento "B-2. Tabla de PIDs de OBDII - Guía de Informes Universal OBD" document\r\n* PIDs válidos não suportados pelo dispositivo aparecerão como “FFFFFFFF” no Relatório de Status ou Relatório de Alerta.\r\n(Caracteres PID inválidos aparecerão como "Erro.")`,
};

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const ObdPid = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();

  const existingFields = filterFormDataFields(formData, OBD_PID.map(String));

  const isDirtyFields = useMemo(() => {
    return Object.keys(formData).filter((key) => {
      return (
        OBD_PID.includes(key) &&
        formData[key].beforeValue !== formData[key].realValue
      );
    });
  }, [formData]);

  if (!hasFormDataFields(formData, existingFields)) return null;

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
          if (existingFields.includes(key)) {
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
      <Stack direction="row" alignItems="center" gap="8px">
        <h1 data-section-id={SECTIONS.OBDPID.en}>{SECTIONS.OBDPID[lang]}</h1>
        <InputBox.Info
          tooltipText={
            <span style={{ whiteSpace: "pre-wrap" }}>{tooltip[lang]}</span>
          }
        />
      </Stack>

      <Stack flexWrap="wrap" direction={"row"} gap={"32px 16px"}>
        {existingFields.map((field, index) => (
          <Stack
            key={field}
            direction="row"
            alignItems="center"
            gap="16px"
            width={"calc(50% - 8px)"}
          >
            <Stack direction="row" alignItems="center" gap="8px" flexShrink={0}>
              <h2>PID {index + 1 < 10 ? `0${index + 1}` : index + 1}</h2>
              <InputBox.Number>{field}</InputBox.Number>
              {isDirtyFields.includes(field) && <EditDot />}
            </Stack>
            <TextField
              fullWidth
              value={formData[field].realValue}
              onChange={(e) => handleChange(field, e.target.value)}
            />
          </Stack>
        ))}
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
    </Form>
  );
};

export default ObdPid;

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
