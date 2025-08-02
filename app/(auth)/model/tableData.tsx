"use client";

import dayjs from "dayjs";
import { GridColDef } from "@mui/x-data-grid";
import { Stack, IconButton, Box } from "@mui/material";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { Model } from "@/src/api/services/model/type";
import { SwitchPrimary } from "../../../components/switches";
import useLangStore from "@/utils/useLangStore";
import getLocalizedString from "@/utils/getLocalizedString";
import { useTranslations } from "next-intl";

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
      const t = useTranslations();
      
      // feature 이름을 다국어 키로 변환하는 함수
      const getFeatureTranslation = (feature: string) => {
        const featureMap = {
          "Basic": "model.add_model_pop_up.features-item.basic",
          "Advanced": "model.add_model_pop_up.features-item.advanced",
          "Wired": "model.add_model_pop_up.features-item.wired",
          "BOT": "model.add_model_pop_up.features-item.bot",
          "BoxTracker": "model.add_model_pop_up.features-item.box-tracker",
          "OBD": "model.add_model_pop_up.features-item.obd",
          "Wi-Fi": "model.add_model_pop_up.features-item.wi-fi",
          "BLE": "model.add_model_pop_up.features-item.ble",
          "RF": "model.add_model_pop_up.features-item.rf",
          "Digital Inputs/Outputs": "model.add_model_pop_up.features-item.digital-inputs-outputs",
          "RS232": "model.add_model_pop_up.features-item.rs232",
          "1-Wire": "model.add_model_pop_up.features-item.one-wire",
          "Voice Call": "model.add_model_pop_up.features-item.voice-call",
          "Dead Reckoning": "model.add_model_pop_up.features-item.dead-reckoning",
          "Geofence": "model.add_model_pop_up.features-item.geofence",
          "Jamming": "model.add_model_pop_up.features-item.jamming",
          "Motion Sensor": "model.add_model_pop_up.features-item.motion-sensor",
          "Ignition": "model.add_model_pop_up.features-item.ignition",
          "Low-power consumption (eDRX)": "model.add_model_pop_up.features-item.low-power-consumption",
          "Temperature Sensor": "model.add_model_pop_up.features-item.temperature-sensor",
          "Waterproof": "model.add_model_pop_up.features-item.waterproof",
          "Tamper Detection": "model.add_model_pop_up.features-item.tamper-detection",
          "Solar": "model.add_model_pop_up.features-item.solar",
          "J1939 Support": "model.add_model_pop_up.features-item.j1939-support",
          "Engine Diagnostics": "model.add_model_pop_up.features-item.engine-diagnostics",
          "Primary Battery": "model.add_model_pop_up.features-item.primary-battery",
          "Rechargeable Battery": "model.add_model_pop_up.features-item.rechargeable-battery",
          "DPA": "model.add_model_pop_up.features-item.dpa",
          "Backup Battery": "model.add_model_pop_up.features-item.backup-battery"
        };
        return featureMap[feature] || feature;
      };
      
      return (
        <Stack
          direction="row"
          gap="4px"
          justifyContent="center"
          alignItems="center"
          flexWrap="wrap"
          height="100%"
        >
          {params?.value.split(",")
            .sort((a, b) => {
              const aKey = getFeatureTranslation(a.trim());
              const bKey = getFeatureTranslation(b.trim());
              const aTranslated = aKey.startsWith("model.add_model_pop_up.features-item.") 
                ? t(aKey) 
                : a;
              const bTranslated = bKey.startsWith("model.add_model_pop_up.features-item.") 
                ? t(bKey) 
                : b;
              return aTranslated.localeCompare(bTranslated);
            })
            .map((item) => {
              const translationKey = getFeatureTranslation(item.trim());
              return (
                <span key={item} className="chip">
                  {translationKey.startsWith("model.add_model_pop_up.features-item.") 
                    ? t(translationKey) 
                    : item}
                </span>
              );
            })}
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
