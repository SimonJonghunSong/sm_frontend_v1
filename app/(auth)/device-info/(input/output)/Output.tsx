"use client";

import React from "react";
import useLangStore from "@/utils/useLangStore";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { MenuItem, Select, Stack, TextField, Tooltip } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "@/components/dataTable";
import { FormField } from "app/(auth)/device-info/page";
import { FIELD_VALIDATIONS } from "constants/field";
import { SwitchPrimary } from "@/components/switches";

const tooltips = {
  output: {
    en: "Output refers to the function of controlling external devices when specific conditions are met by the tracker.",
    es: "Output se refiere a la función de controlar dispositivos externos cuando se cumplen condiciones específicas por el rastreador.",
    pt: "Output refere-se à função de controlar dispositivos externos quando condições específicas são atendidas pelo rastreador.",
  },
  type: {
    en: "• Option\n- GPIO(Default)\n- Immobilizer\n- Immobilizer Auto : The immobilizer is automatically activated when the vehicle begins to park.\n- Pulse\n- Call LED\n- Buzzer\n- Horn Pulse\n- Buzzer Pulse\n- Disabled\n* In the case of a pulse, the pulse time may vary by approximately dozens of milliseconds (ms).\n* The immobilizer, LED blink line, and buzzer types cannot be set on both Output1 and Output2 simultaneously.\n* Even if an activation command is sent, the output of a disabled type will not be activated.",
    es: "• Opción\n- GPIO(Predeterminado)\n- Immobilizador\n- Immobilizador Auto: El immobilizador se activa automáticamente cuando el vehículo comienza a estacionar.\n- Pulso\n- LED de llamada\n- Buzzer\n- Pulso de claxon\n- Pulso de buzzer\n- Deshabilitado\n* En el caso de un pulso, el tiempo de pulso puede variar en aproximadamente decenas de milisegundos (ms).\n* Los tipos de immobilizador, LED parpadeante y buzzer no pueden estar configurados en ambas salidas (Output1 y Output2) simultáneamente.\n* Incluso si se envía un comando de activación, la salida de un tipo deshabilitado no se activará.",
    pt: "• Opção\n- GPIO(Predeterminado)\n- Immobilizador\n- Immobilizador Auto: O immobilizador é automaticamente ativado quando o veículo começa a estacionar.\n- Pulso\n- LED de chamada\n- Buzzer\n- Pulso de claxon\n- Pulso de buzzer\n- Desabilitado\n* No caso de um pulso, o tempo de pulso pode variar em aproximadamente decenas de milissegundos (ms).\n* Os tipos de immobilizador, LED parpadeante e buzzer não podem ser configurados nas duas saídas (Output1 e Output2) simultaneamente.\n* Mesmo que um comando de ativação seja enviado, a saída de um tipo desabilitado não será ativada.",
  },
  active: {
    en: "When the output is activated, this parameter controls whether the line is left Open or Grounded.\n• Option\n- Open\n- Ground(Default)",
    es: "Cuando se activa la salida, este parámetro controla si la línea se deja abierta o se conecta a tierra.\n• Opción\n- Abierto\n- Tierra(Predeterminado)",
    pt: "Quando a saída é ativada, este parâmetro controla se a linha é deixada aberta ou aterrada.\n• Opção\n- Aberto\n- Terra(Predeterminado)",
  },
  cout: {
    en: "Number of pulses for the output.\n• Range : 0~9,999\n• Default : 0",
    es: "Número de pulsos para la salida.\n• Rango : 0~9,999\n• Predeterminado : 0",
    pt: "Número de pulsos para a saída.\n• Intervalo : 0~9,999\n• Predefinido : 0",
  },
  highPulse: {
    en: "The length of the High Pulse.\n• Range : 0~9,999\n• Units : 100ms\n• Default : 0",
    es: "El tiempo de pulso alto.\n• Rango : 0~9,999\n• Unidades : 100ms\n• Predeterminado : 0",
    pt: "O tempo de pulso alto.\n• Intervalo : 0~9,999\n• Unidades : 100ms\n• Predefinido : 0",
  },
  lowPulse: {
    en: "The length of the Low Pulse.\n• Range : 0~9,999\n• Units : 100ms\n• Default : 0",
    es: "El tiempo de pulso bajo.\n• Rango : 0~9,999\n• Unidades : 100ms\n• Predeterminado : 0",
    pt: "O tempo de pulso baixo.\n• Intervalo : 0~9,999\n• Unidades : 100ms\n• Predefinido : 0",
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
    id: 1760,
    col2: "Output 1",
    col3: { id: "1760" },
    col4: { id: "1761" },
    col5: { id: "1775" },
    col6: { id: "1776" },
    col7: { id: "1777" },
  },
  {
    id: 1762,
    col2: "Output 2",
    col3: { id: "1762" },
    col4: { id: "1763" },
    col5: { id: "1780" },
    col6: { id: "1781" },
    col7: { id: "1782" },
  },
  {
    id: 1764,
    col2: "Output 3",
    col3: { id: "1764" },
    col4: { id: "1765" },
    col5: { id: "1783" },
    col6: { id: "1784" },
    col7: { id: "1785" },
  },
];

export default function Output({ formData, onChange }: Props) {
  const lang = useLangStore((state) => state.lang);

  const columns: GridColDef[] = [
    {
      field: "col2",
      headerName: "",
      renderHeader: () => (
        <Stack direction="row" gap="8px">
          <span>Output</span>
          <Tooltip
            title={tooltips.output[lang]}
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
          <span>Type</span>
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
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value }) => (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Select
            sx={{ width: "100%" }}
            value={formData?.[value.id]?.realValue}
            onChange={(e) => onChange(value.id, e.target.value as string)}
          >
            {FIELD_VALIDATIONS?.[value.id]?.list
              ?.filter((typeId) =>
                formData[value.id].list.includes(typeId.value)
              )
              ?.map((item) => (
                <MenuItem key={item.value} value={item.value}>{item.label[lang]}</MenuItem>
              ))}
          </Select>
        </Stack>
      ),
    },
    {
      field: "col4",
      headerName: "",
      renderHeader: () => (
        <Stack direction="row" gap="8px">
          <span>Active</span>
          <Tooltip
            title={tooltips.active[lang]}
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
      width: 180,
      headerAlign: "center",
      align: "center",
      renderCell: ({ value, row }) => (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <Select
            sx={{ width: "100%" }}
            value={formData?.[value.id]?.realValue}
            onChange={(e) => onChange(value.id, e.target.value as string)}
            disabled={formData?.[row.id]?.realValue === "19"}
          >
            {FIELD_VALIDATIONS?.[value.id]?.list?.map((item) => (
              <MenuItem value={item.value}>{item.label[lang]}</MenuItem>
            ))}
          </Select>
        </Stack>
      ),
    },
    {
      field: "col5",
      headerName: "",
      renderHeader: () => (
        <Stack direction="row" gap="8px">
          <span>Pulse Count</span>
          <Tooltip
            title={tooltips.cout[lang]}
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
      renderCell: ({ value, row }) => {
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
              disabled={formData?.[row.id]?.realValue === "19"}
              inputProps={{
                min: FIELD_VALIDATIONS?.[value.id]?.min || 0,
                max: FIELD_VALIDATIONS?.[value.id]?.max || 9999,
              }}
            />
          </Stack>
        );
      },
    },
    {
      field: "col6",
      headerName: "",
      renderHeader: () => (
        <Stack direction="row" gap="8px">
          <span>High Pulse</span>
          <Tooltip
            title={tooltips.highPulse[lang]}
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
      renderCell: ({ value, row }) => (
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
            disabled={formData?.[row.id]?.realValue === "19"}
            inputProps={{
              min: FIELD_VALIDATIONS?.[value.id]?.min || 0,
              max: FIELD_VALIDATIONS?.[value.id]?.max || 9999,
            }}
          />
        </Stack>
      ),
    },
    {
      field: "col7",
      headerName: "",
      renderHeader: () => (
        <Stack direction="row" gap="8px">
          <span>Low Pulse</span>
          <Tooltip
            title={tooltips.lowPulse[lang]}
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
      renderCell: ({ value, row }) => (
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
            disabled={formData?.[row.id]?.realValue === "19"}
            inputProps={{
              min: FIELD_VALIDATIONS?.[value.id]?.min || 0,
              max: FIELD_VALIDATIONS?.[value.id]?.max || 9999,
            }}
          />
        </Stack>
      ),
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
