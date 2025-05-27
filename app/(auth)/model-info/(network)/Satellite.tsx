import { Dispatch, SetStateAction, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import { FormField } from "../page";
import NumericInputField from "../(components)/NumericInputField";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import { SwitchPrimary } from "@/components/switches";
import DualCheckboxField from "../(components)/DualCheckboxField";
import { hasFormDataFields } from "../(utils)/@index";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, selectValue?: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const fieldsId = INCLUDE_FIELDS[SECTIONS.Satellite.en];

const tooltipText = {
  en: "When the network status is 'No Network' (e.g., SIM PIN Locked, Cannot Attach Network, No SIM, or SIM Card Locked), the output will activate if this status persists for the set delay time.\nThe output will deactivate once the network status returns to normal.\n* Output control for the satellite modem can detect 'No Network' situations.\n• Default : Off",
  pt: "Quando o status da rede for 'Sem Rede' (por exemplo, SIM com PIN Bloqueado, Não Consegue Conectar à Rede, Sem SIM ou SIM Card Bloqueado), a saída será ativada se esse status persistir pelo tempo de atraso configurado.\nA saída será desativada assim que o status da rede voltar ao normal.\n* O controle de saída para o modem via satélite pode detectar situações de 'Sem Rede'.\n• Padrão  : Desativado",
  es: "Cuando el estado de la red es 'Sin Red' (por ejemplo, SIM con PIN bloqueado, No puede conectar a la red, Sin SIM, o SIM bloqueada), la salida se activará si este estado persiste durante el tiempo de retraso configurado.\nLa salida se desactivará una vez que el estado de la red vuelva a la normalidad.\n• Predeterminado: Desactivado",
};

const Satellite = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore();
  const formRef = useRef<HTMLFormElement>(null);
  const [isChecked, setIsChecked] = useState(false);
  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = useMemo(() => {
    return Object.keys(formData).filter((key) => {
      return (
        fieldsId.includes(key) &&
        formData[key].realValue !== formData[key].beforeValue
      );
    });
  }, [formData]);

  if (!hasFormDataFields(formData, fieldsId)) return null;

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
        sendFormData(fieldValues, setFormData);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Stack direction="row" gap="4px" alignItems="center">
          <h1 data-section-id={SECTIONS.Satellite.en}>
            {SECTIONS.Satellite[lang.lang]}
          </h1>
          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {tooltipText[lang.lang]}
              </span>
            }
          />
        </Stack>

        <SwitchPrimary
          onChange={(e) => setIsChecked(e.target.checked)}
          checked={isChecked}
        />
      </Stack>

      {isChecked && (
        <>
          <Stack direction={"row"} gap={"24px"}>
            <Stack gap={"24px"} flex={1}>
              <DualCheckboxField
                id="1052"
                formData={formData}
                onChange={handleChange}
                hasSwitch={false}
                firstOptionLabel={{
                  en: t("configuration.network.output1"),
                  es: t("configuration.network.output1"),
                  pt: t("configuration.network.output1"),
                }}
                secondOptionLabel={{
                  en: t("configuration.network.output2"),
                  es: t("configuration.network.output2"),
                  pt: t("configuration.network.output2"),
                }}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("1052")}
              />
            </Stack>
            <Stack gap={"24px"} flex={1}>
              <NumericInputField
                id="1053"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("1053")}
              />
            </Stack>
          </Stack>

          <Stack direction="row" justifyContent="flex-end" alignItems="center">
            <Button
              color="secondary"
              variant="contained"
              type="submit"
              disabled={isLoading || isDirtyFields.length === 0}
            >
              {t("common.save")}
            </Button>
          </Stack>
        </>
      )}
    </Form>
  );
};

export default Satellite;

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
