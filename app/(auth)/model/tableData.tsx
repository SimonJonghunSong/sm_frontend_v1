"use client";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { Stack, Button, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import { SwitchPrimary } from "../../../components/switches";
import { Model } from "@/src/api/services/model/type";
import dayjs from "dayjs";
import { FormState } from "app/(auth)/model/admin/page";

export const getAdminColumns: (
  onEditClick: (id: string) => void,
  onDeleteClick: (id: string) => void,
  onHideClick: (id: string) => void
) => GridColDef[] = (onEditClick, onDeleteClick, onHideClick) => [
  {
    field: "col1",
    headerName: "Image",
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    renderCell: (params) =>
      params.value && (
        <Stack
          direction="row"
          gap="4px"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <Image src={params.value} alt="thumbnail" width={96} height={96} />
        </Stack>
      ),
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
      <Stack
        direction="row"
        gap="4px"
        justifyContent="center"
        alignItems="center"
        flexWrap="wrap"
        height="100%"
      >
        {params?.value.split(",").map((item) => (
          <span key={item} className="chip">
            {item}
          </span>
        ))}
      </Stack>
    ),
  },
  {
    field: "col6",
    headerName: "Hide",
    width: 80,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <SwitchPrimary
        checked={params.value}
        onClick={() => onHideClick(params.id as string)}
      />
    ),
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
    renderCell: (params) => (
      <IconButton
        onClick={() => {
          onEditClick(params.id as string);
        }}
      >
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
    renderCell: (params) => (
      <IconButton
        onClick={() => {
          onDeleteClick(params.id as string);
        }}
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
    ),
  },
];

const MOCK_MODEL_IMAGES = [
  "/images/ST4215U,ST8310UM.png",
  "/images/ST4305,ST8300 series.png",
  "/images/ST4315,ST8310U series.png",
  "/images/ST4345.png",
  "/images/ST4915.png",
  "/images/ST4955.png",
  "/images/ST6560.png",
];

export const getAdminRows = (data?: Model[]) =>
  (data || []).map((item, idx) => ({
    id: item.uid,
    col1: MOCK_MODEL_IMAGES[idx % 7],
    col2: item.dev_name,
    col3: item.fw_ver,
    col4: item.supported_features.join(","),
    col6: item.hide,
    col7: dayjs(item.reg_date).format("MMM/DD/YYYY HH:mm"),
    col8: { id: "1" },
    col9: { id: "1" },
    loaded: false,
  }));

export const getRows = (data?: (Model & { loaded: boolean })[]) =>
  (data || []).map((item, idx) => ({
    id: item.uid,
    col1: MOCK_MODEL_IMAGES[idx % 7],
    col2: item.dev_name,
    col3: item.fw_ver,
    col4: item.supported_features.join(","),
    col5: { id: item.uid },
    col7: dayjs(item.reg_date).format("MMM/DD/YYYY HH:mm"),
    loaded: item.loaded,
  }));
