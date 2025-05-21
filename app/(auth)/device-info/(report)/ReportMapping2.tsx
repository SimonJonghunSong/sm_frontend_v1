import { SetStateAction, Dispatch, useRef } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import SwitchField from "../(components)/SwitchField";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "app/(auth)/device-info/(utils)/useSendFormData";
import CheckboxField from "app/(auth)/device-info/(components)/CheckboxField";

const checkboxOptions = {
  "3100": {
    optionString:
      "b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "Report Map, Model, Software Version, Total Sensor, Current Sensor, Scans, Date, Time, Time Packet, Latitude, Longitude, Latitude Gap, Longitude Gap, Temperature, Humidity, Barometric Pressure, 1-Wire, 1-Wire Temperature",
      TEXT_PT_ITEM_CONTENT:
        "Mapa do Relatório, Modelo, Versão do Software, Total de Sensores, Sensor Atual, Scans, Data, Hora, Pacote de Tempo, Latitude, Longitude, Diferença de Latitude, Diferença de Longitude, Temperatura, Umidade, Pressão Barométrica, 1-Wire, Temperatura 1-Wire",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de reportes, Modelo, Versión de Software, Sensor Total, Sensor Actual, Escaneos, Fecha, Hora, Paquete de Tiempo, Latitud, Longitud, Diferencia de Latitud, Diferencia de Longitud, Temperatura, Humedad, Presión Barométrica, 1-Wire, Temperatura 1-Wire",
    },
  },
  "3101": {
    optionString: "b0, b1, b2, b3, b4, b5, b6, b7, b8",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "Report Map, Model, Software Version, Total Sensor, Current Sensor, BLE Sensor Scan, Scanned BLE Sensor, BLE Sensor ID, Temp/Hum/Pres",
      TEXT_PT_ITEM_CONTENT:
        "Mapa do Relatório, Modelo, Versão do Software, Total de Sensores, Sensor Atual, Scan de Sensor BLE, Sensor BLE Escaneado, ID do Sensor BLE, Temp/Hum/Pres",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de reportes, Modelo, Versión de Software, Total de sensores, Sensor Actual, Escaneo de Sensor BLE, Sensor BLE Escaneado, ID de Sensor BLE, Temp/Hum/Pres",
    },
  },
  "3103": {
    optionString:
      "b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "Report Map, Model, Software Version, BLE sensor’s Scan Status, Total BLE Data, Current BLE Data, BLE Sensor, Date, Time, Latitude, Longitude, BLE Data Size, BLE Data, BLE Mac Address, BLE RSSI",
      TEXT_PT_ITEM_CONTENT:
        "Mapa do Relatório, Modelo, Versão do Software, Status do Scan do Sensor BLE, Total de Dados BLE, Dados BLE Atuais, Sensor BLE, Data, Hora, Latitude, Longitude, Tamanho dos Dados BLE, Dados BLE, Endereço Mac do BLE, RSSI do BLE",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de reportes, Modelo, Versión de Software, Estado de Escaneo del Sensor BLE, Total de datos de BLE, Datos Actuales de BLE, Sensor BLE, Fecha, Hora, Latitud, Longitud, Tamaño de Datos BLE, Datos BLE, Dirección MAC BLE, RSSI BLE",
    },
  },
  "2598": {
    optionString:
      "b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "Report Map, Model, Software Version, Message Type, Date, Time, Cell ID, MCC, MNC, Local Area Code, RX_LVL, Latitude, Longitude, Speed, Course/Heading, Satellite Count, GPS Fix Status, Input States, Output States, Mode, Status Report Type, Message Number, Reserved, Assign Map",
      TEXT_PT_ITEM_CONTENT:
        "Mapa de Relatório, Modelo, Versão do Software, Tipo de Mensagem, Data, Hora, ID da Célula, MCC, MNC, Código de Área Local, Nível RX, Latitude, Longitude, Velocidade, Rumo/Curso, Contagem de Satélites, Status do Fix GPS, Estados de Entrada, Estados de Saída, Modo, Tipo de Relatório de Status, Número da Mensagem, Reservado, Atribuir Mapa",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de Informe, Modelo, Versión del Software, Tipo de Mensaje, Fecha, Hora, ID de Celda, MCC, MNC, Código de Área Local, Nivel RX, Latitud, Longitud, Velocidad, Curso/Rumbo, Conteo de Satélites, Estado de Fix GPS, Estados de Entrada, Estados de Salida, Modo, Tipo de Informe de Estado, Número de Mensaje, Reservado, Asignar Mapa",
    },
  },
};

const fieldIds = INCLUDE_FIELDS[SECTIONS.ReportMapping2.en];
interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const ReportMapping2 = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = Object.keys(formData).filter((key) => {
    return (
      fieldIds.includes(key) &&
      formData[key].beforeValue !== formData[key].realValue
    );
  });

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
        sendFormData(fieldValues, setFormData);

        // 여기에 데이터 제출 로직 추가
      }}
    >
      <h1 data-section-id={SECTIONS.ReportMapping2.en}>
        {SECTIONS.ReportMapping2[lang]}
      </h1>

      <Stack direction={"row"} gap={"32px 16px"}>
        <Stack direction={"column"} gap={"16px"} flex={1}>
          {!!formData["3100"] && (
            <CheckboxField
              id="3100"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["3100"].optionString}
              labelString={checkboxOptions["3100"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("3100")}
            />
          )}
          {!!formData["3101"] && (
            <CheckboxField
              id="3101"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["3101"].optionString}
              labelString={checkboxOptions["3101"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("3101")}
            />
          )}
        </Stack>
        <Stack direction={"column"} gap={"16px"} flex={1}>
          {!!formData["3103"] && (
            <CheckboxField
              id="3103"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["3103"].optionString}
              labelString={checkboxOptions["3103"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("3103")}
            />
          )}
          {!!formData["2598"] && (
            <CheckboxField
              id="2598"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["2598"].optionString}
              labelString={checkboxOptions["2598"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("2598")}
            />
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
          {t("notify.send")}
        </Button>
      </Stack>
    </Form>
  );
};

export default ReportMapping2;

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
    font-size: 20px;
    line-height: 100%;
  }
`;
