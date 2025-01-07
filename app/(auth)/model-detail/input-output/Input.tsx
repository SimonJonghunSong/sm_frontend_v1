"use client";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { Tooltip } from "@mui/material";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React from "react";
import DataTable from "../../../../components/dataTable";
import { SwitchPrimary } from "../../../../components/switches";

const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "",
    width: 60,
    headerAlign: "center",
    align: "center",
    renderCell: () => <SwitchPrimary />,
  },
  {
    field: "col2",
    headerName: "",
    renderHeader: () => (
      <Stack direction="row" gap="8px">
        <span>IMEI</span>
        <Tooltip
          title={"tooltip text sample"}
          placement="top"
          slotProps={{
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
        <span>Country</span>
        <Tooltip
          title={"tooltip text sample"}
          placement="top"
          slotProps={{
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
    renderCell: () => (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
        <TextField type="number" sx={{ width: 80 }} defaultValue="20"/>
      </Stack>
    ),
  },
];

const rows = [
  {
    id: 0,
    col1: { id: "1" },
    col2: "Falling Edge",
    col3: { id: "1" },
  },
  {
    id: 1,
    col1: { id: "1" },
    col2: "Rising Edge",
    col3: { id: "1" },
  },
  {
    id: 2,
    col1: { id: "1" },
    col2: "Panic Button",
    col3: { id: "1" },
  },
  {
    id: 3,
    col1: { id: "1" },
    col2: "Call 1 Button",
    col3: { id: "1" },
  },
  {
    id: 4,
    col1: { id: "1" },
    col2: "ADC",
    col3: { id: "1" },
  },
  {
    id: 5,
    col1: { id: "1" },
    col2: "Door Sensor",
    col3: { id: "1" },
  },
  {
    id: 6,
    col1: { id: "1" },
    col2: "Ignition",
    col3: { id: "1" },
  },
  {
    id: 7,
    col1: { id: "1" },
    col2: "Immobilizer",
    col3: { id: "1" },
  },
  {
    id: 8,
    col1: { id: "1" },
    col2: "Speaker Volum",
    col3: { id: "1" },
  },
  {
    id: 9,
    col1: { id: "1" },
    col2: "1-Wire",
    col3: { id: "1" },
  },
  {
    id: 10,
    col1: { id: "1" },
    col2: "Trailer Edge",
    col3: { id: "1" },
  },
  {
    id: 11,
    col1: { id: "1" },
    col2: "Immobilizer Lock",
    col3: { id: "1" },
  },
  {
    id: 12,
    col1: { id: "1" },
    col2: "Secure Immobilizer",
    col3: { id: "1" },
  },
];

export default function Input() {
  return (
    <DataTable
      checkbox={false}
      rowHeight={52}
      rows={rows}
      columns={columns}
      disablePagination
    />
  );
}
