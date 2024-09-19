"use client";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import {
  Stack,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  SelectChangeEvent,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../../components/dataTable";
import useModal from "../../../../utils/useModal";

const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "Point",
    width: 60,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col2",
    headerName: "Active",
    width: 60,
    headerAlign: "center",
    align: "center",
    renderCell: () => <SwitchPrimary />,
  },
  {
    field: "col3",
    headerName: "Sensor",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col4",
    headerName: "ID",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col5",
    headerName: "In Alert",
    width: 80,
    headerAlign: "center",
    align: "center",
    renderCell: () => <SwitchPrimary />,
  },
  {
    field: "col6",
    headerName: "Out Alert",
    width: 90,
    headerAlign: "center",
    align: "center",
    renderCell: () => <SwitchPrimary />,
  },
  {
    field: "col7",
    headerName: "Temperature (°C)",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col8",
    headerName: "Humidity (%)",
    flex: 1,

    headerAlign: "center",
    align: "center",
  },
  {
    field: "col9",
    headerName: "Edit",
    width: 80,
    headerAlign: "center",
    align: "center",
    renderCell: () => (
      <IconButton onClick={(e) => e.stopPropagation()}>
        <EditOutlinedIcon />
      </IconButton>
    ),
  },
  {
    field: "col10",
    headerName: "Delete",
    width: 80,
    headerAlign: "center",
    align: "center",
    renderCell: () => (
      <IconButton onClick={(e) => e.stopPropagation()}>
        <DeleteForeverOutlinedIcon />
      </IconButton>
    ),
  },
];

const rows = [
  {
    id: 0,
    col1: "1",
    col2: { id: "1" },
    col3: "ELA PUCK RHT",
    col4: "abcde123",
    col5: { id: "1" },
    col6: { id: "1" },
    col7: "-55/125",
    col8: "30/70",
    col9: { id: "1" },
    col10: { id: "1" },
  },
];

export default function RegisterBle() {
  const [roleFilter, setRoleFilter] = useState<string>("All");

  const [modal, modalToggle] = useModal();

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  return (
    <>
      <Stack sx={{ width: "calc(50% - 20px)" }}>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              <div className="pageTitle" style={{ marginBottom: 0 }}>
                Register BLE
              </div>
            </InputBox.Title>
            <InputBox.Info tooltipText="tooptip example" />
            <InputBox.Number>41</InputBox.Number>
            {/* <span className="notification"/> */}
          </InputBox.Head>
        </InputBox>
      </Stack>

      <Stack>
        <Stack
          direction="row"
          gap="8px"
          justifyContent="space-between"
          mb="16px"
        >
          <Stack direction="row" gap="8px">
            <Select
              value={roleFilter}
              onChange={(e) => handleSelectChange(e, setRoleFilter)}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value={"All"}>All</MenuItem>
              <MenuItem value={"Admin"}>Admin</MenuItem>
              <MenuItem value={"Customer"}>Customer</MenuItem>
              <MenuItem value={"Guest"}>Guest</MenuItem>
            </Select>
          </Stack>

          <Button variant="contained" color="secondary" onClick={modalToggle}>
            Add
          </Button>
        </Stack>
        <DataTable
          rows={rows}
          columns={columns}
          footerButton={<Button variant="text" color="info">Delete</Button>}
          disablePagination
        />
      </Stack>
    </>
  );
}
