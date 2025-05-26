import { Dispatch, SetStateAction, useMemo, useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import { FormField } from "../page";
import SwitchField from "../(components)/SwitchField";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import SelectField from "../(components)/SelectField";
import InputBox from "@/components/inputbox/InputBox";
import useLangStore from "@/utils/useLangStore";
import SpecialRangeNumericField from "../(components)/SpecialRangeNumericField";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";

const fieldIds = INCLUDE_FIELDS[SECTIONS.MDSM7.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string, selectValue?: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const tooltips = {
  en: 'MDSM-7 Settings.\n* When MDSM-7’s ignition line is connected, it will automatically power off during parking and power on at the next driving start.\n* At start-up, MDSM-7 sends all parameters to the connected device.\n* If MDSM-7 is already connected and the device receives all parameters at start-up, the settings are transferred to MDSM-7, the parameters are updated, and MDSM-7 will reboot.\n* If MDSM-7 is disconnected or the device fails to receive all parameters at start-up, the parameters are stored in the device and will be applied at the next start-up of MDSM-7.\n* If a different MDSM-7 is connected, the device will change the parameters of the new MDSM-7.\n* If the device is set to "not affect," it will not change the MDSM-7 settings.',
  pt: "Configurações do MDSM-7.\n* Quando a linha de ignição do MDSM-7 estiver conectada, ele desligará automaticamente durante o estacionamento e ligará no próximo início de condução.\n* Na inicialização, o MDSM-7 envia todos os parâmetros para o dispositivo conectado.\n* Se o MDSM-7 já estiver conectado e o dispositivo receber todos os parâmetros na inicialização, as configurações são transferidas para o MDSM-7, os parâmetros são atualizados e o MDSM-7 será reiniciado.\n* Se o MDSM-7 estiver desconectado ou o dispositivo não receber todos os parâmetros na inicialização, os parâmetros são armazenados no dispositivo e serão aplicados na próxima inicialização do MDSM-7.\n* Se um MDSM-7 diferente for conectado, o dispositivo alterará os parâmetros do novo MDSM-7.\n* Se o dispositivo estiver configurado para não afetar, ele não alterará as configurações do MDSM-7.",
  es: "Configuraciones de MDSM-7.\n* Cuando la línea de Activado de MDSM-7 está conectada, se apagará automáticamente durante el estacionamiento y se encenderá al iniciar la conducción.\n* Al arrancar, MDSM-7 envía todos los parámetros al dispositivo conectado.\n* Si MDSM-7 se desconecta o el dispositivo no recibe todos los parámetros al arrancar, los parámetros se almacenan en el dispositivo y se aplicarán en el siguiente arranque de MDSM-7.\n* Si se conecta un MDSM-7 diferente, el dispositivo cambiará los parámetros del nuevo MDSM-7.\n* Si el dispositivo está configurado como sin afectar, no cambiará las configuraciones de MDSM-7.",
};

const MDSM7 = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = useMemo(
    () =>
      Object.keys(formData).filter(
        (key) =>
          fieldIds.includes(key) &&
          formData[key].beforeValue !== formData[key].realValue
      ),
    [formData]
  );

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
      <Stack direction="row" alignItems="center" gap={"4px"}>
        <h1 data-section-id={SECTIONS.MDSM7.en}>{SECTIONS.MDSM7[lang]}</h1>

        <InputBox.Info
          tooltipText={
            <span style={{ whiteSpace: "pre-wrap" }}>{tooltips[lang]}</span>
          }
        />
      </Stack>

      <Stack direction="row" gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <SelectField
            id="2350"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isSwitch
            isDirty={isDirtyFields.includes("2350")}
          />

          <SwitchField
            id="2351"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2351")}
          />

          <SpecialRangeNumericField
            id="2352"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            min={0}
            max={200}
            isSwitch
            specialValues={[255]}
            isDirty={isDirtyFields.includes("2352")}
          />

          <SwitchField
            id="2353"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2353")}
          />
          {formData["2353"]?.realValue === "01" && (
            <>
              <SelectField
                id="2355"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isSwitch
                isDirty={isDirtyFields.includes("2355")}
              />

              <SwitchField
                id="2354"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("2354")}
              />

              <SelectField
                id="2356"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("2356")}
              />
            </>
          )}

          <SwitchField
            id="2357"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2357")}
          />

          {formData["2357"]?.realValue === "01" && (
            <>
              <SelectField
                id="2359"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isSwitch
                isDirty={isDirtyFields.includes("2359")}
              />

              <SwitchField
                id="2358"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("2358")}
              />

              <SelectField
                id="2360"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("2360")}
              />
            </>
          )}
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <SwitchField
            id="2361"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2361")}
          />

          {formData["2361"]?.realValue === "01" && (
            <>
              <SelectField
                id="2363"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isSwitch
                isDirty={isDirtyFields.includes("2363")}
              />

              <SwitchField
                id="2362"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("2362")}
              />

              <SelectField
                id="2364"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("2364")}
              />
            </>
          )}

          <SwitchField
            id="2365"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2365")}
          />

          {formData["2365"]?.realValue === "01" && (
            <>
              <SelectField
                id="2367"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isSwitch
                isDirty={isDirtyFields.includes("2367")}
              />

              <SwitchField
                id="2366"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("2366")}
              />

              <SelectField
                id="2368"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("2368")}
              />
            </>
          )}

          <SwitchField
            id="2369"
            formData={formData}
            onChange={handleChange}
            style={{ width: "100%" }}
            isDirty={isDirtyFields.includes("2369")}
          />

          {formData["2369"]?.realValue === "01" && (
            <>
              <SelectField
                id="2371"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isSwitch
                isDirty={isDirtyFields.includes("2371")}
              />

              <SwitchField
                id="2370"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("2370")}
              />

              <SelectField
                id="2372"
                formData={formData}
                onChange={handleChange}
                style={{ width: "100%" }}
                isDirty={isDirtyFields.includes("2372")}
              />
            </>
          )}
        </Stack>
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

export default MDSM7;

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
