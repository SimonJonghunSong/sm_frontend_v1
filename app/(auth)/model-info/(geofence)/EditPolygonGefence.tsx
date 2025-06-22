import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import styled from "styled-components";
import InputBox from "@/components/inputbox/InputBox";
import Maps from "@/components/Map";
import DataTable from "@/components/dataTable";
import { SwitchPrimary } from "@/components/switches";
import { SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import { useMapManager } from "@/src/hooks/useMapManager";
import { useTranslations } from "next-intl";
import { FormField } from "../page";
import useModelInfoStore from "@/src/stores/useModelInfo";
import {
  getModelDataFromIDB,
  upsertPolygonGeofencesToIDB,
} from "@/utils/idbModelUtil";

interface Props {
  id: number;
  formData: {
    [key: string]: FormField;
  };
  polygonGeofenceKeys: string[];
  onSuccess?: () => void;
  onCancel: () => void;
}

const tooltipText = {
  type: {
    en: "Geofence type\n• Option\n- Circular\n- Polygon",
    pt: "Tipo de Geofence\n• Opção\n- Circular\n- Polígono",
    es: "Tipo de Geocerca\n• Opción\n- Circular\n- Poligonal",
  },
  id: {
    en: "Zone identifier number.\nNumber identifier of the zone.\nNúmero identificador de la zona.",
    pt: "Número identificador da zona.\nNúmero identificador da zona.\nNúmero identificador de la zona.",
    es: "Número identificador de la zona.\nNúmero identificador de la zona.\nNúmero identificador de la zona.",
  },
  latitude: {
    en: "The latitude of the center point of the Circular Geofence. ",
    pt: "A latitude do ponto central do Geofence Circular.",
    es: "La latitud del punto central de la geocerca circular.",
  },
  longitude: {
    en: "The longitude of the center point of the Circular Geofence.",
    pt: "A longitude do ponto central do Geofence Circular.",
    es: "La longitud del punto central de la geocerca circular.",
  },
  radius: {
    en: "The distance from the center of the geofence to its edge, defining the size of the circular geofence.\n• Range : 30~65,500",
    pt: "A distância do centro do geofence até a borda, definindo o tamanho do geofence circular.\n• Intervalo: 30~65.500",
    es: "La distancia desde el centro de la geocerca hasta su borde, definiendo el tamaño de la geocerca circular.\n• Rango: 30~65,500",
  },
  enterAlert: {
    en: "Alert when entering the geofence area.\n• Default : Off",
    pt: "Alerta ao entrar na área do geofence.\n• Padrão : Desativado",
    es: "Alerta al entrar en el área de la geocerca.\n• Predeterminado: Desactivado",
  },
  exitAlert: {
    en: "Alert when exiting the geofence area.\n• Default : Off",
    pt: "Alerta ao sair da área do geofence.\n• Padrão : Desativado",
    es: "Alerta al salir del área de la geocerca.\n• Predeterminado: Desactivado",
  },
  antiJamming: {
    en: "Detect and block jamming to ensure geofences work correctly.\n• Default : Off",
    pt: "Detecta e bloqueia interferências para garantir que os geofences funcionem corretamente.\n• Padrão : Desativado",
    es: "Detectar y bloquear interferencias para asegurar que las geocercas funcionen correctamente.\n• Predeterminado: Desactivado",
  },
  outputActive: {
    en: "This setting activates the output when a specific condition is met, such as entering or exiting a geofence area.\n• Option(On)\n- Output 1\n- Output 2\n- Output 3\n- Output 4\n- All Outputs",
    pt: "Esta configuração ativa a saída quando uma condição específica é atendida, como entrar ou sair de uma área de geofence.\n• Opção(Ligado)\n- Saída 1\n- Saída 2\n- Saída 3\n- Saída 4\n- Todas as Saídas",
    es: "Esta configuración activa la salida cuando se cumple una condición específica, como entrar o salir de un área de geocerca.\n• Opción(Activado)\n- Salida 1\n- Salida 2\n- Salida 3\n- Salida 4\n- Todas las salidas",
  },
  outputKeepActive: {
    en: "Output remains continuously active without interruption once it is triggered.\n• Default : Off",
    pt: "A saída permanece continuamente ativa sem interrupção após ser acionada.\n• Padrão : Desativado",
    es: "La salida permanece continuamente activa sin interrupciones una vez que se activa.\n• Predeterminado: Desactivado",
  },
  outputActiveDelay: {
    en: "Delay time before activating the output.\n• Range : 0~3,600\n• Default : 0",
    pt: "Tempo de atraso antes de ativar a saída.\n• Intervalo: 0~3,600\n• Padrão: 0",
    es: "Tiempo de retardo antes de activar la salida.\n• Rango: 0~3,600\n• Predeterminado: 0",
  },
  buzzerSpeedLimit: {
    en: "When the set speed limit is exceeded, a buzzer sound is triggered.\n• Range : 0~300\n• Default : 0",
    pt: "Quando o limite de velocidade definido é excedido, um som de alarme é acionado.\n• Intervalo: 0~300\n• Padrão: 0",
    es: "Cuando se excede el límite de velocidad establecido, se activa un sonido de buzzer.\n• Rango: 0~300\n• Predeterminado: 0",
  },
};

const polygonReducer = (state: any, action: any) => {
  switch (action.type) {
    case "setId":
      return { ...state, id: action.payload };
    case "setEnterAlert":
      return { ...state, enterAlert: action.payload };
    case "setExitAlert":
      return { ...state, exitAlert: action.payload };
    case "setBuzzerSpeedLimit":
      return { ...state, buzzerSpeedLimit: action.payload };
    case "setSpeedLimit":
      return { ...state, speedLimit: action.payload };
    case "setSpeedLimitDebounce":
      return { ...state, speedLimitDebounce: action.payload };
  }
};

const EditPolygonGeofence = ({
  id,
  formData,
  polygonGeofenceKeys,
  onCancel,
}: Props) => {
  const { getModelName, getFwVer, getTargetCountry } = useModelInfoStore();

  const modelName = useMemo(() => getModelName(), [getModelName]);
  const fwVer = useMemo(() => getFwVer(), [getFwVer]);
  const targetCountry = useMemo(() => getTargetCountry(), [getTargetCountry]);

  const [polygonState, polygonDispatch] = useReducer(polygonReducer, {
    id: 1,
    enterAlert: false,
    exitAlert: false,
    buzzerSpeedLimit: 0,
    speedLimitDebounce: 0,
  });

  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const mapRef = useRef<google.maps.Map>(null);
  const mapManager = useMapManager();

  /** Polygon Geofence */
  const handleEditPolygonGeo = async () => {
    await upsertPolygonGeofencesToIDB(modelName, fwVer, targetCountry, [
      {
        id: polygonState.id,
        coordinates: mapManager.polygons[0].path,
        enterAlert: polygonState.enterAlert,
        exitAlert: polygonState.exitAlert,
        buzzerSpeedLimit: polygonState.buzzerSpeedLimit,
        speedLimit: polygonState.speedLimit,
        speedLimitDebounce: polygonState.speedLimitDebounce,
      },
    ]);

    onCancel();
  };

  const renderBuzzerSpeedLimit = () => {
    if (
      !formData["9000"] ||
      formData["9000"].realValue === "00" ||
      !polygonGeofenceKeys.includes("Buzzer Speed Limit")
    )
      return null;
    return (
      <Stack gap="8px">
        <Stack direction="row" gap="4px" alignItems="center">
          <InputBox.Title>
            {t("configuration.geofence.buzzer_speed_limit")}
          </InputBox.Title>
        </Stack>

        <TextField
          type="number"
          value={polygonState.buzzerSpeedLimit}
          onChange={(e) =>
            polygonDispatch({
              type: "setBuzzerSpeedLimit",
              payload: e.target.value,
            })
          }
          helperText={
            (polygonState.buzzerSpeedLimit > 300 ||
              polygonState.buzzerSpeedLimit < 0) &&
            polygonState.buzzerSpeedLimit !== ""
              ? lang === "en"
                ? `Input only between 0 ~ 300`
                : lang === "pt"
                ? `Entrada somente entre 0 ~ 300`
                : `Entrada solo entre 0 ~ 300`
              : ""
          }
          error={
            polygonState.buzzerSpeedLimit > 300 ||
            polygonState.buzzerSpeedLimit < 0
          }
          inputProps={{
            min: 0,
            max: 300,
          }}
        />
      </Stack>
    );
  };

  const renderPolygonSpeedLimit = () => {
    if (
      !formData["9000"] ||
      formData["9000"].realValue === "00" ||
      !polygonGeofenceKeys.includes("Polygon Speed Limit")
    )
      return null;
    return (
      <Stack gap="8px">
        <Stack direction="row" gap="4px" alignItems="center">
          <InputBox.Title>
            {t("configuration.geofence.polygon_speed_limit")}
          </InputBox.Title>
        </Stack>

        <TextField
          type="number"
          value={polygonState.buzzerSpeedLimit}
          onChange={(e) =>
            polygonDispatch({
              type: "setBuzzerSpeedLimit",
              payload: e.target.value,
            })
          }
          helperText={
            (polygonState.buzzerSpeedLimit > 300 ||
              polygonState.buzzerSpeedLimit < 0) &&
            polygonState.buzzerSpeedLimit !== ""
              ? lang === "en"
                ? `Input only between 0 ~ 300`
                : lang === "pt"
                ? `Entrada somente entre 0 ~ 300`
                : `Entrada solo entre 0 ~ 300`
              : ""
          }
          error={
            polygonState.buzzerSpeedLimit > 300 ||
            polygonState.buzzerSpeedLimit < 0
          }
          inputProps={{
            min: 0,
            max: 300,
          }}
        />
      </Stack>
    );
  };

  const renderSpeedLimitDebounce = () => {
    if (
      !formData["9000"] ||
      formData["9000"].realValue === "00" ||
      !polygonGeofenceKeys.includes("Speed Limit Debounce")
    )
      return null;
    return (
      <Stack gap="8px">
        <Stack direction="row" gap="4px" alignItems="center">
          <InputBox.Title>Speed Limit Debounce</InputBox.Title>
        </Stack>

        <TextField
          type="number"
          value={polygonState.speedLimitDebounce}
          onChange={(e) =>
            polygonDispatch({
              type: "setSpeedLimitDebounce",
              payload: e.target.value,
            })
          }
          helperText={
            (polygonState.speedLimitDebounce > 1800 ||
              polygonState.speedLimitDebounce < 0) &&
            polygonState.speedLimitDebounce !== ""
              ? lang === "en"
                ? `Input only between 0 ~ 1,800`
                : lang === "pt"
                ? `Entrada somente entre 0 ~ 1,800`
                : `Entrada solo entre 0 ~ 1,800`
              : ""
          }
          error={
            polygonState.speedLimitDebounce > 1800 ||
            polygonState.speedLimitDebounce < 0
          }
          inputProps={{
            min: 0,
            max: 1800,
          }}
        />
      </Stack>
    );
  };

  const renderPolygonGeofence = () => {
    const rows = mapManager.polygons?.[0]?.path.map(({ lat, lng }, index) => ({
      id: index,
      lat: lat.toFixed(6),
      long: lng.toFixed(6),
      delete: {
        id: index,
        onDelete: () =>
          mapManager.removePolygonPoint(mapManager.polygons?.[0], index),
      },
    }));

    return (
      <Stack direction="row" gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <DataTable
            checkbox={false}
            noDataMessage="No registered geofence"
            disablePagination={false}
            rows={rows || []}
            columns={columns}
            minHeight={"400px"}
          />

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                Enter Alert
                <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
              </InputBox.Title>

              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {tooltipText.enterAlert[lang]}
                  </span>
                }
              />
            </Stack>
            <SwitchPrimary
              checked={polygonState.enterAlert}
              onChange={(e) =>
                polygonDispatch({
                  type: "setEnterAlert",
                  payload: e.target.checked,
                })
              }
            />
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                Exit Alert
                <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
              </InputBox.Title>

              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {tooltipText.exitAlert[lang]}
                  </span>
                }
              />
            </Stack>
            <SwitchPrimary
              checked={polygonState.exitAlert}
              onChange={(e) =>
                polygonDispatch({
                  type: "setExitAlert",
                  payload: e.target.checked,
                })
              }
            />
          </Stack>

          {renderBuzzerSpeedLimit()}
          {renderPolygonSpeedLimit()}
          {renderSpeedLimitDebounce()}
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <Stack gap="20px" sx={{ width: "100%", height: "500px" }}>
            <Maps
              ref={mapRef}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
              zoom={13}
              editableDrawing
              disableDrawing={!!mapManager.polygons?.[0]?.path}
              drawingModes={
                [
                  !!mapManager.polygons?.[0]?.path ? undefined : "polygon",
                ] as google.maps.drawing.OverlayType[]
              }
              onOverlayComplete={mapManager.completeOverlay}
              polygons={[
                {
                  paths: mapManager.polygons?.[0]?.path,
                },
              ]}
              circles={undefined}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  };

  useEffect(() => {
    const fetchPolygonGeofenceById = async (id: number) => {
      const modelData = await getModelDataFromIDB(
        modelName,
        fwVer,
        targetCountry
      );
      return modelData?.geofence?.polygon.find((item) => item.id === id);
    };

    fetchPolygonGeofenceById(id).then((data) => {
      const newPolygon = new google.maps.Polygon({
        paths: data.coordinates,
        map: mapRef.current, // mapRef에 담긴 지도 객체에 폴리곤 추가
        editable: true, // 필요에 따라 편집 가능 여부 설정
      });

      mapManager.shapesRef.current.push({
        overlay: newPolygon,
        type: google.maps.drawing.OverlayType.POLYGON,
      });
      mapManager.addPolygon({ id: 0, path: data.coordinates });
      mapManager.registerEditableHandlers();

      if (mapRef.current) {
        mapRef.current.setCenter({
          lat: data.coordinates[0].lat,
          lng: data.coordinates[0].lng,
        });
      }

      polygonDispatch({
        type: "setEnterAlert",
        payload: data.enterAlert,
      });
      polygonDispatch({
        type: "setExitAlert",
        payload: data.exitAlert,
      });
      polygonDispatch({
        type: "setBuzzerSpeedLimit",
        payload: data?.buzzerSpeedLimit || 0,
      });
      polygonDispatch({
        type: "setSpeedLimit",
        payload: data?.speedLimit || 0,
      });
      polygonDispatch({
        type: "setSpeedLimitDebounce",
        payload: data?.speedLimitDebounce || 0,
      });
    });
  }, [id, modelName, fwVer, targetCountry]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditPolygonGeo();
      }}
    >
      <h1 data-section-id={SECTIONS.GeofenceConfig.en}>
        {t("configuration.geofence.edit_geofence_(polygon)")}
      </h1>

      {renderPolygonGeofence()}

      <Stack justifyContent={"flex-end"} direction="row" gap="8px">
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          {t("common.popup.cancel")}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={!mapManager.polygons?.[0]?.path}
        >
          {t("server.edit_scuti_server_pop_up.save")}
        </Button>
      </Stack>
    </Form>
  );
};

export default EditPolygonGeofence;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  border-bottom: 1px solid #d7d8dc;
  padding-bottom: 36px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 20px;
    line-height: 100%;
  }
`;

const columns: GridColDef[] = [
  {
    field: "lat",
    headerName: "Latitude",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "long",
    headerName: "Longitude",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 80,
    headerAlign: "center",
    align: "center",
    renderCell: (event) => (
      <IconButton
        onClick={() => {
          event.value.onDelete();
        }}
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
    ),
  },
];
