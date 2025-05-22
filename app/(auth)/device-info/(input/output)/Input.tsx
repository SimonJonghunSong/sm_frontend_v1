"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { GridColDef } from "@mui/x-data-grid";
import { MenuItem, Select, Stack, TextField, Tooltip } from "@mui/material";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DataTable from "@/components/dataTable";
import useLangStore from "@/utils/useLangStore";
import { FormField } from "app/(auth)/device-info/page";
import { FIELD_VALIDATIONS } from "constants/field";

const tooltips = {
  input: {},
  type: {
    en: "• Option\n- Falling Edge : Sends an event report when the input signal transitions from high to low.\n- Rising Edge : Sends an event report when the input signal transitions from low to high.\n- Both Edge : Sends both event reports when the input signal transitions from low to high and high to low.\n- Panic Button : Sends an alert report when the Panic Button is pressed.\n* If an SMS number is set, pressing the panic button will send the current location to that number.\n- Call 1 Button : Pressing the Call 1 button will make a call to the number set in 1041.\n* 1035 (MT Call Lock) must be On, and a phone number must be set in 1041(Call MO1).\n- Call 2 Button : Pressing the Call 2 button will make a call to the number set in 1042.\n* 1035 (MT Call Lock) must be On, and a phone number must be set in 1042(Call MO2).\n- ADC(Analog-to-Digital Converter) :Analog Input.\n- Anti-Theft Button :\n- Door Sensor : A sensor that detects when the vehicle's door is opened.\n* To use the Door Sensor, the Anti-theft button must be On.\n- Ignition\n- Immobilizer Off : If the immobilizer(Output) is activated by the jammer, pressing the input will deactivate the immobilizer.\n- Speaker Volume : Adjust the speaker volume during a phone call.\n- 1-Wire \n- Trailer Edge : Both Falling Edge and Rising Edge are triggered by the trailer.\n* Device will activate Output1 if the trailer is disconnected.\n* Device will deactivate Output1 3 minutes after the trailer is reconnected.\n* Output1 can be disabled if it is used by the panic button and was activated by the trailer edge.\n* The expiration time is 12 seconds.\n* If the input type is set to 'Panic Button,' set the Delay Time to 1.\n* If the input type is set to 'Trailer Edge,' the output type should be set to 'GPIO.'  ",
    es: "• Opción\n- Borde Descendente: Envía un informe de evento cuando la señal de entrada pasa de alta a baja.\n- Borde Ascendente: Envía un informe de evento cuando la señal de entrada pasa de baja a alta.\n- Ambos Bordes: Envía ambos informes de evento cuando la señal de entrada pasa de baja a alta y de alta a baja.\n- Botón de Pánico: Envía un informe de alerta cuando se presiona el Botón de Pánico.\n* Si se establece un número de SMS, al presionar el botón de pánico se enviará la ubicación actual a ese número.\n- Botón de Llamada 1: Al presionar el botón de Llamada 1, se realizará una llamada al número configurado en 1041.\n* 1035 (Bloqueo de Llamadas MT) debe estar activado, y se debe configurar un número de teléfono en 1041 (Llamada MO1).\n- Botón de Llamada 2: Al presionar el botón de Llamada 2, se realizará una llamada al número configurado en 1042.\n* 1035 (Bloqueo de Llamadas MT) debe estar activado, y se debe configurar un número de teléfono en 1042 (Llamada MO2).\n- ADC (Convertidor Analógico a Digital): Entrada Analógica.\n- Botón Antirrobo:\n- Sensor de Puerta: Un sensor que detecta cuando se abre la puerta del vehículo.\n* Para usar el Sensor de Puerta, el botón antirrobo debe estar activado.\n- Ignición\n- Desactivar Inmovilizador: Si el inmovilizador (Salida) es activado por un inhibidor, al presionar la entrada se desactivará el inmovilizador.\n- Volumen del Altavoz: Ajusta el volumen del altavoz durante una llamada telefónica.\n- 1-Wire\n* Borde del Remolque: Tanto el Borde Descendente como el Borde Ascendente son activados por el remolque.\n* El dispositivo activará la Salida 1 si el remolque se desconecta.\n* El dispositivo desactivará la Salida 1 3 minutos después de que el remolque se vuelva a conectar.\n* La Salida 1 puede desactivarse si es utilizada por el botón de pánico y fue activada por el borde del remolque.\n* El tiempo de expiración es de 12 segundos.\n* Si el tipo de entrada está configurado como 'Botón de Pánico', configure el Tiempo de Retraso en 1.\n* Si el tipo de entrada está configurado como 'Borde del Remolque', el tipo de salida debe configurarse en 'GPIO'.",
    pt: "• Opção\n- Borda de Queda : Envia um relatório de evento quando o sinal de entrada transita de alto para baixo.\n- Borda de Subida : Envia um relatório de evento quando o sinal de entrada transita de baixo para alto.\n- Ambas as Bordas : Envia ambos os relatórios de evento quando o sinal de entrada transita de baixo para alto e de alto para baixo.\n- Botão de Pânico : Envia um relatório de alerta quando o Botão de Pânico é pressionado.\n* Se um número de SMS estiver configurado, pressionar o botão de pânico enviará a localização atual para esse número.\n- Botão de Chamada 1 : Pressionar o botão de Chamada 1 fará uma chamada para o número configurado em 1041.\n* 1035 (Bloqueio de Chamada MT) deve estar Ligado, e um número de telefone deve ser configurado em 1041 (Chamada MO1).\n- Botão de Chamada 2 : Pressionar o botão de Chamada 2 fará uma chamada para o número configurado em 1042.\n* 1035 (Bloqueio de Chamada MT) deve estar Ligado, e um número de telefone deve ser configurado em 1042 (Chamada MO2).\n- ADC (Conversor Analógico para Digital) : Entrada Analógica.\n- Botão Anti-Roubo\n- Sensor de Porta : Um sensor que detecta quando a porta do veículo é aberta.\n* Para usar o Sensor de Porta, o botão Anti-Roubo deve estar Ligado.\n- Ignição\n- Imobilizador Desligado : Se o imobilizador (Saída) for ativado pelo bloqueador, pressionar a entrada desativará o imobilizador.\n- Volume do Alto-falante : Ajusta o volume do alto-falante durante uma chamada telefônica.\n- 1-Wire\n* Borda do Reboque: Ambas as Bordas de Queda e Subida são acionadas pelo reboque.\n* O dispositivo ativará a Saída1 se o reboque for desconectado.\n* O dispositivo desativará a Saída1 3 minutos após o reboque ser reconectado.\n* A Saída1 pode ser desativada se estiver sendo usada pelo botão de pânico e foi ativada pela borda do reboque.\n* O tempo de expiração é de 12 segundos.\n* Se o tipo de entrada estiver configurado como 'Botão de Pânico', defina o Tempo de Atraso para 1.\n* Se o tipo de entrada estiver configurado como 'Borda do Reboque', o tipo de saída deve ser configurado como 'GPIO.",
  },
  delayTime: {
    en: "How long an input change must last before sending a report. It helps to ignore noise and only responds to actual signal changes.\n• Range : 0~9,999, 0~6(Speaker Volume), 0~9,999(1-Wire)\n• Default : 20, 3(Speaker Volume), 0(1-Wire)",
    es: "Cuánto tiempo debe durar un cambio de entrada antes de enviar un informe. Ayuda a ignorar el ruido y solo responde a cambios de señal reales.\n• Rango: 0~9,999, 0~6(Volumen del Altavoz), 0~9,999(1-Wire)\n• Predeterminado: 20, 3(Volumen del Altavoz), 0(1-Wire)",
    pt: "Quanto tempo uma mudança de entrada deve durar antes de enviar um relatório. Isso ajuda a ignorar ruídos e responde apenas a mudanças reais de sinal.\n• Intervalo : 0~9,999, 0~6(Volume do Alto-falante), 0~9,999(1-Wire)\n• Padrão : 20, 3(Volume do Alto-falante), 0(1-Wire)",
  },
};

interface Props {
  formData: {
    [key: string]: FormField;
  };
  onChange: (id: string, value: string) => void;
}

const rows = [
  {
    id: 1720,
    col1: false,
    col2: "Input 1",
    col3: { id: "1720" },
    col4: { id: "1721" },
  },
  {
    id: 1722,
    col1: true,
    col2: "Input 2",
    col3: { id: "1722" },
    col4: { id: "1723" },
  },
  {
    id: 1724,
    col1: false,
    col2: "Input 3",
    col3: { id: "1724" },
    col4: { id: "1725" },
  },
  {
    id: 1726,
    col1: true,
    col2: "Input 4",
    col3: { id: "1726" },
    col4: { id: "1727" },
  },
];

export default function Input({ formData, onChange }: Props) {
  const lang = useLangStore((state) => state.lang);
  const t = useTranslations();

  const columns: GridColDef[] = [
    // {
    //   field: "col1",
    //   headerName: "",
    //   width: 60,
    //   headerAlign: "center",
    //   align: "center",
    //   renderCell: ({ value }) => <SwitchPrimary checked={value} />,
    // },
    {
      field: "col2",
      headerName: "",
      renderHeader: () => (
        <Stack direction="row" gap="8px">
          <span>{t("configuration.input_output.input")}</span>
          <Tooltip
            title={tooltips.input[lang]}
            placement="top"
            slotProps={{
              tooltip: {
                style: {
                  whiteSpace: "pre-wrap",
                },
              },
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -12],
                    },
                  },
                ],
              },
            }}
          >
            <ErrorOutlineOutlinedIcon
              sx={{ fontSize: "22px", color: "var(--grey5)" }}
            />
          </Tooltip>
        </Stack>
      ),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: "",
      renderHeader: () => (
        <Stack direction="row" gap="8px">
          <span>{t("configuration.input_output.type")}</span>
          <Tooltip
            title={tooltips.type[lang]}
            placement="top"
            slotProps={{
              tooltip: {
                style: {
                  whiteSpace: "pre-wrap",
                },
              },
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -12],
                    },
                  },
                ],
              },
            }}
          >
            <ErrorOutlineOutlinedIcon
              sx={{ fontSize: "22px", color: "var(--grey5)" }}
            />
          </Tooltip>
        </Stack>
      ),
      renderCell: ({ value }) => (
        <Select
          sx={{ width: "100%" }}
          value={formData?.[value.id]?.realValue}
          onChange={(e) => onChange(value.id, e.target.value as string)}
        >
          {(FIELD_VALIDATIONS?.[value.id].list || [])
            .filter((typeId) => formData[value.id].list.includes(typeId.value))
            .map((item) => (
              <MenuItem value={item.value}>{item.label[lang]}</MenuItem>
            ))}
        </Select>
      ),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col4",
      headerName: "",
      renderHeader: () => (
        <Stack direction="row" gap="8px">
          <span>Delay Time</span>
          <Tooltip
            title={tooltips.delayTime[lang]}
            placement="top"
            slotProps={{
              tooltip: {
                style: {
                  whiteSpace: "pre-wrap",
                },
              },
              popper: {
                modifiers: [
                  {
                    name: "offset",
                    options: {
                      offset: [0, -12],
                    },
                  },
                ],
              },
            }}
          >
            <ErrorOutlineOutlinedIcon
              sx={{ fontSize: "22px", color: "var(--grey5)" }}
            />
          </Tooltip>
        </Stack>
      ),
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value, id }) => {
        const isSpeakerVolume = formData?.[id]?.realValue === "16";

        return (
          <Stack
            justifyContent="center"
            alignItems="center"
            sx={{ height: "100%" }}
          >
            <TextField
              type="number"
              sx={{ width: 80 }}
              value={formData?.[value.id]?.realValue}
              onChange={(e) => onChange(value.id, e.target.value as string)}
              inputProps={{
                min: isSpeakerVolume
                  ? 0
                  : FIELD_VALIDATIONS?.[value.id]?.min || 0,
                max: isSpeakerVolume
                  ? 6
                  : FIELD_VALIDATIONS?.[value.id]?.max || 9999,
              }}
              error={
                isSpeakerVolume
                  ? Number(formData?.[value.id]?.realValue) > 6 ||
                    Number(formData?.[value.id]?.realValue) < 0
                  : Number(formData?.[value.id]?.realValue) > 9999 ||
                    Number(formData?.[value.id]?.realValue) < 0
              }
            />
          </Stack>
        );
      },
    },
  ];

  return (
    <DataTable
      minHeight={"none"}
      checkbox={false}
      rowHeight={52}
      rows={rows}
      columns={columns}
      disablePagination
    />
  );
}
