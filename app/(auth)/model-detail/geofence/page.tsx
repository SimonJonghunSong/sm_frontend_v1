"use client";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import sampleMap from "/public/images/sample-map2.png";

import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import React, { Dispatch, SetStateAction, useState } from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../../components/dataTable";
import Image from "next/image";

const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "No",
    width: 60,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col2",
    headerName: "Type",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col3",
    headerName: "Group",
    width: 70,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col8",
    headerName: "Edit",
    width: 60,
    headerAlign: "center",
    align: "center",
    renderCell: () => (
      <IconButton onClick={(e) => e.stopPropagation()}>
        <EditOutlinedIcon />
      </IconButton>
    ),
  },
  {
    field: "col9",
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
    col2: "Circular",
    col3: "1",
    col8: { id: "1" },
    col9: { id: "1" },
  },
  {
    id: 1,
    col1: "2",
    col2: "Polygon",
    col3: "2",
    col8: { id: "1" },
    col9: { id: "1" },
  },
  {
    id: 2,
    col1: "3",
    col2: "Polygon",
    col3: "3",
    col8: { id: "1" },
    col9: { id: "1" },
  },
  {
    id: 3,
    col1: "4",
    col2: "Circular",
    col3: "4",
    col8: { id: "1" },
    col9: { id: "1" },
  },
  {
    id: 4,
    col1: "5",
    col2: "Circular",
    col3: "5",
    col8: { id: "1" },
    col9: { id: "1" },
  },
];

export default function Page() {
  const [roleFilter, setRoleFilter] = useState<string>("All");

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };
  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Controller />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ width: "calc(50% - 20px)" }}
        >
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                <div className="pageTitle" style={{ marginBottom: 0 }}>
                  Geofence
                </div>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1700</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </InputBox>
          <SwitchPrimary />
        </Stack>
        <Stack direction="row" gap="40px" mb="40px">
          <Stack
            gap="20px"
            sx={{ width: "50%", height: "500px", overflowY: "scroll" }}
          >
            <Stack
              direction="row"
              gap="8px"
              justifyContent="space-between"
              mb="16px"
            >
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

              <Button
                variant="contained"
                color="secondary"
                href="/model-detail/geofence/add"
              >
                Add
              </Button>
            </Stack>
            <DataTable
              noDataMessage="No registered geofence"
              disablePagination
              rows={rows}
              columns={columns}
              footerButton={
                <Button variant="text" color="info">
                  Delete
                </Button>
              }
            />
          </Stack>

          <Stack gap="20px" sx={{ width: "50%" }}>
            <Box>
              <Image
                src={sampleMap}
                alt="sampleMap"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </Box>
          </Stack>
        </Stack>
      </article>
    </div>
  );
}
