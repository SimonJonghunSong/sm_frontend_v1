"use client";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import { MenuItem, Select, Tooltip } from "@mui/material";
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
        <span>Output</span>
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
        <span>Type</span>
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
    width: 180,
    headerAlign: "center",
    align: "center",
    renderCell: () => (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
    <Select value={"select-1"} sx={{ width: "100%" }}>
      <MenuItem value={"select-1"}>GPIO</MenuItem>
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
    width: 180,
    headerAlign: "center",
    align: "center",
    renderCell: () => (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%" }}
      >
    <Select value={"select-1"} sx={{ width: "100%" }}>
      <MenuItem value={"select-1"}>Ground</MenuItem>
    </Select>
      </Stack>
    ),
  },
  {
    field: "col5",
    headerName: "",
    renderHeader: () => (
      <Stack direction="row" gap="8px">
        <span>Pulse No</span>
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
    width: 120,
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
  {
    field: "col6",
    headerName: "",
    renderHeader: () => (
      <Stack direction="row" gap="8px">
        <span>Pulse On</span>
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
    width: 120,
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
  {
    field: "col7",
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
    width: 100,
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
    col2: "Output 1",
    col3: { id: "1" },
    col4: { id: "1" },
    col5: { id: "1" },
    col6: { id: "1" },
    col7: { id: "1" },
  },
  {
    id: 1,
    col1: { id: "1" },
    col2: "Output 1",
    col3: { id: "1" },
    col4: { id: "1" },
    col5: { id: "1" },
    col6: { id: "1" },
    col7: { id: "1" },
  },
  {
    id: 2,
    col1: { id: "1" },
    col2: "Output 1",
    col3: { id: "1" },
    col4: { id: "1" },
    col5: { id: "1" },
    col6: { id: "1" },
    col7: { id: "1" },
  },

];

export default function Output() {
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
