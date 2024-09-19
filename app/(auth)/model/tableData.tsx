"use client";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { Stack, Button, IconButton } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid"
import Image from "next/image"
import { SwitchPrimary } from "../../../components/switches";

export const adminColumns: GridColDef[] = [
    {
      field: "col1",
      headerName: "Image",
      minWidth: 200,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => params.value && (
        <Stack direction="row" gap="4px" justifyContent="center" alignItems="center" height="100%">
          <Image src={params.value} alt="thumbnail" width={96} height={96}/>
        </Stack>
      )
    },
    {
      field: "col2",
      headerName: "Model Name",
      minWidth: 120,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: "F/W",
      width: 80,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col4",
      headerName: "Features",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <Stack direction="row" gap="4px" justifyContent="center" alignItems="center" height="100%">
          {params?.value.split(',').map((item) => 
            <span key={item} className="chip">{item}</span>
          )}
        </Stack>
      )
    },
    {
      field: "col6",
      headerName: "Hide",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: () => <SwitchPrimary onClick={(e) => e.stopPropagation()}/>
    },
    {
      field: "col7",
      headerName: "Date",
      minWidth: 180,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col8",
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
  
  export const adminRows = [
    {
      id: 0,
      col1: "/images/ST4215U,ST8310UM.png",
      col2: "ST4215U",
      col3: "1.1.1",
      col4: "LTE,FG,Advanced,OBD,RF",
      col6: "true",
      col7: "Jan/19/2024 18:08",
      col8: { id: "1" },
      col9: { id: "1" },
      loaded: false,
    },
    {
      id: 1,
      col1: "/images/ST4305,ST8300 series.png",
      col2: "ST4305 series",
      col3: "1.1.1",
      col4: "LTE,FG,Advanced,RF",
      col6: "true",
      col7: "Jan/19/2024 18:08",
      col8: { id: "1" },
      col9: { id: "1" },
      loaded: true,
    },
    {
      id: 2,
      col1: "/images/ST4315,ST8310U series.png",
      col2: "ST4315 series",
      col3: "1.1.1",
      col4: "LTE,FG,OBD,RF",
      col6: "true",
      col7: "Jan/19/2024 18:08",
      col8: { id: "1" },
      col9: { id: "1" },
      loaded: true,
    },
    {
      id: 3,
      col1: "/images/ST4345.png",
      col2: "ST4345",
      col3: "1.1.1",
      col4: "LTE,FG,Advanced,OBD,RF",
      col6: "true",
      col7: "Jan/19/2024 18:08",
      col8: { id: "1" },
      col9: { id: "1" },
      loaded: false,
    },
    {
      id: 4,
      col1: "/images/ST4915.png",
      col2: "ST4915",
      col3: "1.1.1",
      col4: "LTE,FG,Advanced,OBD",
      col6: "true",
      col7: "Jan/19/2024 18:08",
      col8: { id: "1" },
      col9: { id: "1" },
      loaded: false,
    },
    {
      id: 5,
      col1: "/images/ST4955.png",
      col2: "ST4955",
      col3: "1.1.1",
      col4: "LTE,FG,Advanced,OBD,RF",
      col6: "true",
      col7: "Jan/19/2024 18:08",
      col8: { id: "1" },
      col9: { id: "1" },
      loaded: false,
    },
    {
      id: 6,
      col1: "/images/ST6560.png",
      col2: "ST6560",
      col3: "1.1.1",
      col4: "LTE,Advanced,OBD",
      col6: "true",
      col7: "Jan/19/2024 18:08",
      col8: { id: "1" },
      col9: { id: "1" },
      loaded: false,
    },
  ];

  export const rows = [
    {
      id: 0,
      col1: "/images/ST4215U,ST8310UM.png",
      col2: "ST4215U",
      col3: "1.1.1",
      col4: "LTE,FG,Advanced,OBD,RF",
      col5: { id: "1" },
      col7: "Jan/19/2024 18:08",
      loaded: false,
    },
    {
      id: 1,
      col1: "/images/ST4305,ST8300 series.png",
      col2: "ST4305 series",
      col3: "1.1.1",
      col4: "LTE,FG,Advanced,OBD",
      col5: { id: "1" },
      col7: "Jan/19/2024 18:08",
      loaded: false,
    },
    {
      id: 2,
      col1: "/images/ST4315,ST8310U series.png",
      col2: "ST4315 series",
      col3: "1.1.1",
      col4: "LTE,FG,Advanced",
      col5: { id: "1" },
      col7: "Jan/19/2024 18:08",
      loaded: true,
    },
    {
      id: 3,
      col1: "/images/ST4345.png",
      col2: "ST4345",
      col3: "1.1.1",
      col4: "LTE,FG,Advanced,OBD,RF",
      col5: { id: "1" },
      col7: "Jan/19/2024 18:08",
      loaded: true,
    },
    {
      id: 4,
      col1: "/images/ST4915.png",
      col2: "ST4915",
      col3: "1.1.1",
      col4: "LTE,FG,Advanced,OBD,RF",
      col5: { id: "1" },
      col7: "Jan/19/2024 18:08",
      loaded: true,
    },
    {
      id: 5,
      col1: "/images/ST4955.png",
      col2: "ST4955",
      col3: "1.1.1",
      col4: "LTE,Advanced,OBD,RF",
      col5: { id: "1" },
      col7: "Jan/19/2024 18:08",
      loaded: false,
    },
    {
      id: 6,
      col1: "/images/ST6560.png",
      col2: "ST6560",
      col3: "1.1.1",
      col4: "LTE,FG,Advanced,OBD,RF",
      col5: { id: "1" },
      col7: "Jan/19/2024 18:08",
      loaded: false,
    },
  ];
  