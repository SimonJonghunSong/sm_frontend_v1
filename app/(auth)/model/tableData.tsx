"use client";

import dayjs from "dayjs";
import { GridColDef } from "@mui/x-data-grid";
import { Stack, IconButton, Box } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { Model } from "@/src/api/services/model/type";
import { SwitchPrimary } from "../../../components/switches";
import useLangStore from "@/utils/useLangStore";
import { featureTransition } from "./admin/page";
import getLocalizedString from "@/utils/getLocalizedString";

export const getAdminColumns: (
  onEditClick: (id: string) => void,
  onDeleteClick: (id: string) => void,
  onHideClick: (id: string) => void
) => GridColDef[] = (onEditClick, onDeleteClick, onHideClick) => [
  {
    field: "col1",
    renderHeader: () => {
      const { lang } = useLangStore();
      return getLocalizedString(lang, "Image", "Imagem", "Imagen");
    },
    minWidth: 200,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      if (params.value) {
        return (
          <Stack
            direction="row"
            gap="4px"
            alignItems="center"
            justifyContent="center"
            height="100%"
          >
            <Box width={96} height={96}>
              <img
                src={params.value}
                alt="thumbnail"
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </Box>
          </Stack>
        );
      }
    },
  },
  {
    field: "col2",
    renderHeader: () => {
      const { lang } = useLangStore();
      return getLocalizedString(
        lang,
        "Model Name",
        "Nome do Modelo",
        "Nombre del Modelo"
      );
    },
    minWidth: 120,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col3",
    renderHeader: () => {
      return "F/W";
    },
    width: 80,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col4",
    renderHeader: () => {
      const { lang } = useLangStore();
      return getLocalizedString(
        lang,
        "Features",
        "Características",
        "Características"
      );
    },
    flex: 1,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => {
      return (
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
              {featureTransition(params.row.lang, item)}
            </span>
          ))}
        </Stack>
      );
    },
  },
  {
    field: "col6",
    renderHeader: () => {
      const { lang } = useLangStore();
      return getLocalizedString(lang, "Hide", "Ocultar", "Ocultar");
    },
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
    renderHeader: () => {
      const { lang } = useLangStore();
      return getLocalizedString(lang, "Date", "Data", "Fecha");
    },
    minWidth: 180,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col8",
    renderHeader: () => {
      const { lang } = useLangStore();
      return getLocalizedString(lang, "Edit", "Editar", "Editar");
    },
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
    renderHeader: () => {
      const { lang } = useLangStore();
      return getLocalizedString(lang, "Delete", "Excluir", "Eliminar");
    },
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

export const getAdminRows = (data?: Model[]) => {
  const { lang } = useLangStore.getState();
  return (data || []).map((item) => ({
    id: item.uid,
    col1: item.image_file,
    col2: item.dev_name,
    col3: item.fw_ver,
    col4: item.supported_features.join(","),
    col6: item.hide,
    col7: dayjs(item.reg_date).format("MMM/DD/YYYY HH:mm"),
    col8: { id: "1" },
    col9: { id: "1" },
    loaded: false,
    lang,
    target_country: item.target_country,
  }));
};

export const getRows = (data?: (Model & { loaded: boolean })[]) =>
  (data || []).map((item, idx) => ({
    id: item.uid,
    col1: item.image_file,
    col2: item.dev_name,
    col3: item.fw_ver,
    col4: item.supported_features.join(","),
    col5: { id: item.uid },
    col7: dayjs(item.reg_date).format("MMM/DD/YYYY HH:mm"),
    loaded: item.loaded,
    hide: item.hide,
    target_country: item.target_country,
  }));
