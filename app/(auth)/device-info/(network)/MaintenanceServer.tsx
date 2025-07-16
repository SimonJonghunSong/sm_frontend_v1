import { Dispatch, SetStateAction, useRef, useEffect } from "react";
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
import useParameterStore from "@/utils/useParameterStore";
import useSerial from "@/src/hooks/useSerial";
import useSerialStore from "@/src/stores/useSerialStore";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const tooltipText = {
  en: "The SCUTI server (maintenance server) in STSUNLAB operates separately for the customer. STSUNLAB provides commands to change the server's settings (e.g., IP, port, interval). These commands should only be used by customers running the maintenance server independently.",
  pt: "O servidor SCUTI (servidor de manutenção) no STSUNLAB opera separadamente para o cliente. A STSUNLAB fornece comandos para alterar as configurações do servidor (por exemplo, IP, porta, intervalo). Esses comandos devem ser usados apenas por clientes que operam o servidor de manutenção de forma independente.",
  es: "El servidor SCUTI (servidor de mantenimiento) en STSUNLAB opera de forma independiente para el cliente. STSUNLAB proporciona comandos para cambiar la configuración del servidor (por ejemplo, IP, puerto, intervalo). Estos comandos solo deben ser utilizados por clientes que operan el servidor de mantenimiento de forma independiente.",
};

const fieldsId = INCLUDE_FIELDS[SECTIONS.MaintenanceServer.en];

const MaintenanceServer = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const formRef = useRef<HTMLFormElement>(null);
  const { sendFormData, isLoading } = useSendFormData();
  const { hiddenParameter } = useParameterStore();
  const { state, func } = useSerial();
  const { portList } = state;

  useEffect(() => {
    if (hiddenParameter && portList.length > 0) {
      const port = portList[0].port;
      const writer = portList[0].writer;

      port.onbuffervalue = (msg: string) => {
        if (msg.startsWith("RRE;")) {
          console.log("[MaintenanceServer] 수신된 응답:", msg);
          // 예: RRE;2023000021;10;20#suntechscuti.com;21#9000;22#24;23#01:00
          const parts = msg.split(";");
          const paramMap: Record<string, string> = {};
          for (let i = 3; i < parts.length; i++) {
            const [at, value] = parts[i].split("#");
            if (at && value) {
              // 20~23을 1020~1023으로 매핑
              const paramId = `102${parseInt(at, 10) - 20}`;
              if (["1020","1021","1022","1023"].includes(paramId)) {
                paramMap[paramId] = value;
              }
            }
          }
          setFormData((prev) => {
            const next = { ...prev };
            ["1020","1021","1022","1023"].forEach((id) => {
              if (paramMap[id]) {
                next[id] = {
                  ...next[id],
                  realValue: paramMap[id],
                };
              }
            });
            return next;
          });
        }
      };

      const command = "AT^REQ;;10;20,21,22,23";
      console.log("[MaintenanceServer] 전송 명령:", command);
      func.write({
        data: command,
        port,
        writer,
      });
    }
    return () => {
      if (portList.length > 0) portList[0].port.onbuffervalue = undefined;
    };
  }, [hiddenParameter, portList, setFormData]);

  const isDirtyFields = Object.keys(formData).filter((key) => {
    return (
      fieldsId.includes(key) &&
      formData[key].beforeValue !== formData[key].realValue
    );
  });

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

  if (hiddenParameter) return null;

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
            error={!/^[A-Za-z0-9\-.]*$/.test(formData["1020"]?.realValue)}
            helperText={
              !/^[A-Za-z0-9\-.]*$/.test(formData["1020"]?.realValue)
                ? FIELD_ERRORS["alphaNumericPatternWithSymbols"][lang]
                : undefined
            }
            isDirty={isDirtyFields.includes("1020")}
            isForceRender
            style={{ width: "100%" }}
          />
          <NumericInputField
            id="1021"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("1021")}
            isForceRender
            style={{ width: "100%" }}
          />
        </Stack>
        <Stack gap={"24px"} flex={1}>
          <NumericInputField
            id="1022"
            formData={formData}
            onChange={handleChange}
            isDirty={isDirtyFields.includes("1022")}
            isForceRender
            style={{ width: "100%" }}
          />
          <TimeHMA
            id="1023"
            formData={formData}
            isSwitch
            value={
              formData?.["1023"]?.realValue
                ? formData?.["1023"]?.realValue.replaceAll(":", "")
                : ""
            }
            onChange={(id, value) => {
              if (!value) {
                handleChange(id, "00:00");
              } else {
                handleChange(id, `${value.slice(0, 2)}:${value.slice(2)}`);
              }
            }}
            isDirty={isDirtyFields.includes("1023")}
            isForceRender
            style={{ width: "100%" }}
          />
        </Stack>
      </Stack>

      <Stack direction="row" justifyContent="flex-end">
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          disabled={isLoading || isDirtyFields.length === 0}
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
