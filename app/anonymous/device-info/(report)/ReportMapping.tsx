import { SetStateAction, Dispatch, useRef, useMemo } from "react";
import styled from "styled-components";
import { useTranslations } from "next-intl";
import { Button, Stack } from "@mui/material";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "../page";
import SwitchField from "../(components)/SwitchField";
import hasFormDataFields from "../(utils)/hasFormDataFields";
import { INCLUDE_FIELDS, SECTIONS } from "constants/searchField";
import useSendFormData from "../(utils)/useSendFormData";
import CheckboxField from "../(components)/CheckboxField";

const checkboxOptions = {
  "1080": {
    optionString:
      "b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "Report Map, Model, Software Version, Message Type, Date, Time, Cell ID, MCC, MNC, LAC – Local Area Code, RX_LVL, Latitude, Longitude, Speed, Course/Heading, Satellite Count, GPS Fix Status, Input States, Output States, Mode, Status Report Type, Message Number, Reserved, Assign Map",
      TEXT_PT_ITEM_CONTENT:
        "Mapa de Relatório, Modelo, Versão do Software, Tipo de Mensagem, Data, Hora, ID da Célula, MCC, MNC, LAC – Código de Área Local, RX_LVL, Latitude, Longitude, Velocidade, Curso/Rumo, Contagem de Satélites, Status de Fixação do GPS, Estados de Entrada, Estados de Saída, Comprimento dos Dados, Dados, Checksum",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de reportes de alerta, Modelo, Versión de Software, Tipo de Mensaje, Fecha, Hora, ID de Celda, MCC, MNC, LAC – Código de Área Local, RX_LVL, Latitud, Longitud, Velocidad, Curso/Rumbo, Contador de Satélites, Estado de fix GPS, Estado de Entradas, Estados de Salida, Longitud de los Datos, Datos, Checksum",
    },
  },
  "1082": {
    optionString:
      "b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "Report Map, Model, Software Version, Message Type, Date, Time, Cell ID, MCC, MNC, LAC – Local Area Code, RX_LVL, Latitude, Longitude, Speed, Course/Heading, Satellite Count, GPS Fix Status, Input States, Output States, Mode, Status Report Type, Message Number, Reserved, Assign Map",
      TEXT_PT_ITEM_CONTENT:
        "Mapa de Relatório, Modelo, Versão do Software, Tipo de Mensagem, Data, Hora, ID da Célula, MCC, MNC, LAC – Código de Área Local, RX_LVL, Latitude, Longitude, Velocidade, Curso/Rumo, Contagem de Satélites, Status de Fixação do GPS, Estados de Entrada, Estados de Saída, Modo, Tipo de Relatório de Status, Número da Mensagem, Reservado, Atribuir Mapa",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de Informe, Modelo, Versión de Software, Tipo de Mensaje, Fecha, Hora, ID de Celda, MCC, MNC, LAC – Código de Área Local, RX_LVL, Latitud, Longitud, Velocidad, Curso/Rumbo, Contador de Satélites, Estado de Fijación del GPS, Estados de Entrada, Estados de Salida, Modo, Tipo de Informe de Estado, Número de Mensaje, Reservado, Asignar Mapa",
    },
  },
  "1084": {
    optionString:
      "b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "Report Map, Model, Software Version, Message Type, Date, Time, Cell ID, MCC, MNC, LAC – Local Area Code, RX_LVL, Latitude, Longitude, Speed, Course/Heading, Satellite Count, GPS Fix Status, Input States, Output States, Length of Data, Data, Checksum",
      TEXT_PT_ITEM_CONTENT:
        "Mapa de Relatório, Modelo, Versão do Software, Tipo de Mensagem, Data, Hora, ID da Célula, MCC, MNC, LAC – Código de Área Local, RX_LVL, Latitude, Longitude, Velocidade, Curso/Rumo, Contagem de Satélites, Status de Fixação do GPS, Estados de Entrada, Estados de Saída, Comprimento dos Dados, Dados, Checksum",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de reportes de alerta, Modelo, Versión de Software, Tipo de Mensaje, Fecha, Hora, ID de Celda, MCC, MNC, LAC – Código de Área Local, RX_LVL, Latitud, Longitud, Velocidad, Curso/Rumbo, Contador de Satélites, Estado de fix GPS, Estado de Entradas, Estados de Salida, Longitud de los Datos, Datos, Checksum",
    },
  },
  "1087": {
    optionString:
      "b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "Report Map, Model, Software Version, Message Type, Date, Time, Travel Start Latitude, Travel Start Longitude, Travel End Latitude, Travel End Longitude, Driver ID, Travel Distance, Driving Time, Time in Idle Mode, Idle events, Time in Speed Mode, Speed Mode, Maximum Speed, Average Speed, Odometer, Speed Histogram, Reserved, Reserved, Time Eco Up, Time Eco Down, Time Eco INSIDE, Time Over RPM, Time Dead Center",
      TEXT_PT_ITEM_CONTENT:
        "Mapa de Relatório, Modelo, Versão do Software, Tipo de Mensagem, Data, Hora, Latitude de Início da Viagem, Longitude de Início da Viagem, Latitude de Fim da Viagem, Longitude de Fim da Viagem, ID do Motorista, Distância de Viagem, Tempo de Condução, Tempo em Modo de Inatividade, Eventos de Inatividade, Tempo em Modo de Velocidade, Modo de Velocidade, Velocidade Máxima, Velocidade Média, Odômetro, Histograma de Velocidade, Reserved, Reserved, Tempo Eco Subida, Tempo Eco Descida, Tempo Eco Dentro, Tempo Acima do RPM, Tempo Ponto Morto",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de reportes, Modelo, Versión de Software, Tipo de Mensaje, Fecha, Hora, Latitud de Inicio de Viaje, Longitud de Inicio de Viaje, Latitud de Fin de Viaje, Longitud de Fin de Viaje, ID del Conductor, Distancia del Viaje, Tiempo de Conducción, Tiempo en Modo de Inactividad, Eventos de Inactividad, Tiempo en Modo de Velocidad, Modo de Velocidad, Velocidad Máxima, Velocidad Promedio, Odómetro, Histograma de Velocidad, Reserved, Reserved, Tiempo Eco Subida, Tiempo Eco Bajada, Tiempo Eco Dentro, Tiempo Sobre RPM, Tiempo Punto Muerto",
    },
  },
  "1089": {
    optionString:
      "b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "OTR Report Map, Model, Software Version, Message Type, Date, Time, Vehicle ID, DTC Count, MIL Indicator, MIL On Time, MIL On Distance, Trip Distance, Engine Run Time, Run Time, Max Speed, Avg Speed, Max RPM, Avg RPM, RPM Exceeds Count, Max Engine Oil Temp, Avg Coolant Temp, Fuel Level (%), Fuel Level Change (%), Fuel Economy (km/L), Fuel Usage in Idle Mode (%)",
      TEXT_PT_ITEM_CONTENT:
        "Mapa de Relatório OTR, Modelo, Versão do Software, Tipo de Mensagem, Data, Hora, ID do Veículo, Contagem de DTC, Indicador MIL, Tempo com MIL Ligado, Distância com MIL Ligado, Distância da Viagem, Tempo de Funcionamento do Motor, Tempo de Funcionamento, Velocidade Máxima, Velocidade Média, RPM Máxima, RPM Média, Contagem de Excedentes de RPM, Temperatura Máxima do Óleo do Motor, Temperatura Média do Líquido de Arrefecimento, Nível de Combustível (%), Mudança no Nível de Combustível (%), Economia de Combustível (km/L), Uso de Combustível no Modo Inativo (%)",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de reporte OTR, Modelo, Versión de Software, Tipo de Mensaje, Fecha, Hora, ID del Vehículo, Contador de DTC, Indicador MIL, Tiempo con MIL Activado, Distancia con MIL Activado, Distancia del Viaje, Tiempo de Funcionamiento del Motor, Tiempo de Funcionamiento, Velocidad Máxima, Velocidad Promedio, RPM Máximo, RPM Promedio, Contador de Excesos de RPM, Temperatura Máxima del Aceite del Motor, Temperatura Promedio del Refrigerante, Nivel de Combustible (%), Cambio en el Nivel de Combustible (%), Economía de Combustible (km/L), Uso de Combustible en Modo de Inactividad (%)",
    },
  },
  "1091": {
    optionString:
      "b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "OBD Report Map, Model, Software Version, Message Type, Date, Time, Vehicle ID, OBD Type, DTC Count, MIL Indicator, MIL On Time, MIL On Distance, Odometer, Engine Run Time, Fuel Type, Fuel Level (%), PIDs Bitmask (0x01–0x20), PIDs Bitmask (0x21–0x40), PIDs Bitmask (0x41–0x60), PIDs Bitmask (0x61–0x80)",
      TEXT_PT_ITEM_CONTENT:
        "Mapa de Relatório OBD, Modelo, Versão do Software, Tipo de Mensagem, Data, Hora, ID do Veículo, Tipo OBD, Contagem de DTC, Indicador MIL, Tempo com MIL Ligado, Distância com MIL Ligado, Odômetro, Tempo de Funcionamento do Motor, Tipo de Combustível, Nível de Combustível (%), Máscara de PIDs (0x01–0x20), Máscara de PIDs (0x21–0x40), Máscara de PIDs (0x41–0x60), Máscara de PIDs (0x61–0x80)",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de Informe OBD, Modelo, Versión de Software, Tipo de Mensaje, Fecha, Hora, ID del Vehículo, Tipo OBD, Contador de DTC, Indicador MIL, Tiempo con MIL Activado, Distancia con MIL Activado, Odómetro, Tiempo de Funcionamiento del Motor, Tipo de Combustible, Nivel de Combustible (%), Máscara de PIDs (0x01–0x20), Máscara de PIDs (0x21–0x40), Máscara de PIDs (0x41–0x60), Máscara de PIDs (0x61–0x80)",
    },
  },
  "1092": {
    optionString:
      "b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "Report Map, Model, Software Version, Message Type, Date, Time, Cell ID, MCC, MNC, LAC – Local Area Code, RX_LVL, Latitude, Longitude, Speed, Course/Heading, Satellite Count, GPS Fix Status, Input States, Output States, Pack Number, Total Packet Size, Packet Size, Packet Data",
      TEXT_PT_ITEM_CONTENT:
        "Mapa de Relatório, Modelo, Versão do Software, Tipo de Mensagem, Data, Hora, ID da Célula, MCC, MNC, LAC – Código de Área Local, RX_LVL, Latitude, Longitude, Velocidade, Curso/Rumo, Contagem de Satélites, Status de Fixação do GPS, Estados de Entrada, Estados de Saída, Número do Pacote, Tamanho Total do Pacote, Tamanho do Pacote, Dados do Pacote",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de reportes, Modelo, Versión de Software, Tipo de Mensaje, Fecha, Hora, ID de Celda, MCC, MNC, LAC – Código de Área Local, RX_LVL, Latitud, Longitud, Velocidad, Curso/Rumbo, Contador de Satélites, Estado de fix GPS, Estados de Entrada, Estados de Salida, Número de Paquete, Tamaño Total del Paquete, Tamaño del Paquete, Datos del Paquete",
    },
  },
  "1094": {
    optionString: "b0, b1, b2, b3, b4, b5, b6, b7, b8",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "PID Report Map, Model, Software Version, Message Type, Date, Time, PID_DATA Length, PID_DATA, 8-bit PID_DATA Checksum",
      TEXT_PT_ITEM_CONTENT:
        "Mapa de Relatório PID, Modelo, Versão do Software, Tipo de Mensagem, Data, Hora, Comprimento dos DADOS_PID, DADOS_PID, Checksum de DADOS_PID de 8 bits",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de reporte PID, Modelo, Versión de Software, Tipo de Mensaje, Fecha, Hora, Longitud de PID_DATA, PID_DATA, Checksum de PID_DATA de 8 bits",
    },
  },
  "1096": {
    optionString: "b0, b1, b2, b3, b4, b5, b6, b7, b8",
    labelString: {
      TEXT_EN_ITEM_CONTENT:
        "OVD Report Map, Model, Software Version, Message Type, Date, Time, OVD_DATA Length, OVD_DATA, 8-bit OVD_DATA Checksum",
      TEXT_PT_ITEM_CONTENT:
        "Mapa do Relatório OVD, Modelo, Versão do Software, Tipo de Mensagem, Data, Hora, Comprimento do Dado OVD, Dado OVD, Checksum de 8 bits do Dado OVD",
      TEXT_ES_ITEM_CONTENT:
        "Mapa de reporte OVD, Modelo, Versión de Software, Tipo de Mensaje, Fecha, Hora, Longitud de OVD_DATA, OVD_DATA, Checksum de OVD_DATA de 8 bits",
    },
  },
};

const fieldIds = INCLUDE_FIELDS[SECTIONS.ReportMapping.en];

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
  setFormData: Dispatch<SetStateAction<{ [key: string]: FormField }>>;
}

const ReportMapping = ({ formData, onChange, setFormData }: Props) => {
  const t = useTranslations();
  const formRef = useRef<HTMLFormElement>(null);
  const lang = useLangStore((state) => state.lang);
  const { sendFormData, isLoading } = useSendFormData();

  const isDirtyFields = useMemo(() => {
    return Object.keys(formData).filter((key) => {
      return (
        fieldIds.includes(key) &&
        formData[key].beforeValue !== formData[key].realValue
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
      <h1 data-section-id={SECTIONS.ReportMapping.en}>
        {SECTIONS.ReportMapping[lang]}
      </h1>

      <Stack direction={"row"} gap={"32px 16px"}>
        <Stack direction={"column"} gap={"16px"} flex={1}>
          {!!formData["1080"] && (
            <CheckboxField
              id="1080"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["1080"].optionString}
              labelString={checkboxOptions["1080"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("1080")}
            />
          )}
          {!!formData["1082"] && (
            <CheckboxField
              id="1082"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["1082"].optionString}
              labelString={checkboxOptions["1082"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("1082")}
            />
          )}
        </Stack>
        <Stack direction={"column"} gap={"16px"} flex={1}>
          {!!formData["1084"] && (
            <CheckboxField
              id="1084"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["1084"].optionString}
              labelString={checkboxOptions["1084"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("1084")}
            />
          )}
          {!!formData["1086"] && (
            <SwitchField
              id="1086"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1086")}
            />
          )}
          {!!formData["1087"] && Number(formData["1086"].realValue) !== 0 && (
            <CheckboxField
              id="1087"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["1087"].optionString}
              labelString={checkboxOptions["1087"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("1087")}
            />
          )}
          {!!formData["1088"] && (
            <SwitchField
              id="1088"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1088")}
            />
          )}

          {!!formData["1089"] && Number(formData["1088"].realValue) !== 0 && (
            <CheckboxField
              id="1089"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["1089"].optionString}
              labelString={checkboxOptions["1089"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("1089")}
            />
          )}
          {!!formData["1090"] && (
            <SwitchField
              id="1090"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1090")}
            />
          )}
          {!!formData["1091"] && Number(formData["1090"].realValue) !== 0 && (
            <CheckboxField
              id="1091"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["1091"].optionString}
              labelString={checkboxOptions["1091"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("1091")}
            />
          )}
          {!!formData["1092"] && (
            <CheckboxField
              id="1092"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["1092"].optionString}
              labelString={checkboxOptions["1092"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("1092")}
            />
          )}

          {!!formData["1093"] && (
            <SwitchField
              id="1093"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1093")}
            />
          )}

          {!!formData["1094"] && Number(formData["1093"].realValue) !== 0 && (
            <CheckboxField
              id="1094"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["1094"].optionString}
              labelString={checkboxOptions["1094"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("1094")}
            />
          )}
          {!!formData["1095"] && (
            <SwitchField
              id="1095"
              formData={formData}
              onChange={handleChange}
              style={{ width: "100%" }}
              isDirty={isDirtyFields.includes("1095")}
            />
          )}
          {!!formData["1096"] && Number(formData["1095"].realValue) !== 0 && (
            <CheckboxField
              id="1096"
              formData={formData}
              onChange={handleChange}
              optionString={checkboxOptions["1096"].optionString}
              labelString={checkboxOptions["1096"].labelString}
              hasAllCheckbox
              isDirty={isDirtyFields.includes("1096")}
            />
          )}
        </Stack>
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

export default ReportMapping;

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
