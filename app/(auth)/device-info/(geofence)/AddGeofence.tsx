import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import styled from "styled-components";
import InputBox from "@/components/inputbox/InputBox";
import { SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import Maps from "@/components/Map";
import { useRef, useState } from "react";
import { useMapManager } from "@/src/hooks/useMapManager";
import DataTable from "@/components/dataTable";
import {
  getCircularGeofenceData,
  getPolygonGeofenceData,
} from "@/src/hooks/useSerial/utils";
import useSerialStore, { SerialPortState } from "@/src/stores/useSerialStore";
import { CircleType, PolygonType } from "@/components/Map/type";
import { useTranslations } from "next-intl";
import { SwitchPrimary } from "@/components/switches";

interface Props {
  currentPort: SerialPortState;
  isReady: boolean;
  write: ({
    data,
    port,
    writer,
  }: {
    data: string;
    port: SerialPortState;
    writer: WritableStreamDefaultWriter<string>;
  }) => Promise<Boolean>;

  polygonGeofenceMax: number;
  circularGeofenceMax: number;
  onAfterFetch?: () => void;
  onAdd?: () => void;
  onEdit?: (id: number, type: "polygon" | "circular") => void;
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
};

const AddGeofence = ({
  currentPort,
  isReady,
  write,
  polygonGeofenceMax,
  circularGeofenceMax,
  onAfterFetch,
  onAdd,
  onEdit,
}: Props) => {
  const [typeFilter, setTypeFilter] = useState<"Polygon" | "Circular">(
    "Circular"
  );
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const mapRef = useRef<google.maps.Map>(null);
  const mapManager = useMapManager();
  const [id, setId] = useState<number>(1);
  const [fetchedPolygonData, setFetchedPolygonData] = useState<PolygonType>();
  const [fetcheCircleData, setFetchedCircleData] = useState<CircleType>();
  const polygonList = currentPort.polygonGeofenceData;
  const polygonData = getPolygonGeofenceData(polygonList);

  console.log(mapManager.polygons);
  console.log(mapManager.circles);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h1 data-section-id={SECTIONS.GeofenceConfig.en}>
        {t("configuration.geofence.add_geofence_(circular)")}
      </h1>

      <Stack direction="row" gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
          <Stack gap={"8px"}>
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                {t("configuration.geofence.type")}
                <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
              </InputBox.Title>

              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {tooltipText.type[lang]}
                  </span>
                }
              />
            </Stack>
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
            >
              <MenuItem value={"Circular"}>
                {t("configuration.geofence.circular")}
              </MenuItem>
              <MenuItem value={"Polygon"}>
                {t("configuration.geofence.polygon")}
              </MenuItem>
            </Select>
          </Stack>

          <Stack gap={"8px"}>
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                {t("login.login.id")}
                <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
              </InputBox.Title>

              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {tooltipText.id[lang]}
                  </span>
                }
              />
            </Stack>

            <Select value={id} onChange={(e) => setId(e.target.value as any)}>
              {typeFilter === "Polygon" &&
                new Array(polygonGeofenceMax)
                  .fill(0)
                  .map((_, index) => (
                    <MenuItem value={index + 1}>{index + 1}</MenuItem>
                  ))}
              {typeFilter === "Circular" &&
                new Array(circularGeofenceMax)
                  .fill(0)
                  .map((_, index) => (
                    <MenuItem value={index + 1}>{index + 1}</MenuItem>
                  ))}
            </Select>
          </Stack>

          <Stack gap={"8px"}>
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                {t("configuration.report.latitude")}
                <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
              </InputBox.Title>

              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {tooltipText.latitude[lang]}
                  </span>
                }
              />
            </Stack>
            <TextField
              type="number"
              value={mapManager.circles?.[0]?.center?.lat.toFixed(5) || ""}
            />
          </Stack>

          <Stack gap={"8px"}>
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                {t("configuration.report.longitude")}
                <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
              </InputBox.Title>

              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {tooltipText.longitude[lang]}
                  </span>
                }
              />
            </Stack>
            <TextField
              type="number"
              value={mapManager.circles?.[0]?.center?.lng.toFixed(5) || ""}
            />
          </Stack>

          <Stack gap={"8px"}>
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                Radius
                <span style={{ color: "#FF0000", paddingLeft: "4px" }}>*</span>
              </InputBox.Title>

              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {tooltipText.radius[lang]}
                  </span>
                }
              />
            </Stack>
            <TextField
              type="number"
              value={mapManager.circles?.[0]?.radius.toFixed(5) || ""}
            />
          </Stack>

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
            <SwitchPrimary />
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
            <SwitchPrimary />
          </Stack>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                {t("configuration.geofence.output_active")}
              </InputBox.Title>

              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {tooltipText.antiJamming[lang]}
                  </span>
                }
              />
            </Stack>
            <SwitchPrimary />
          </Stack>

          <Stack gap="8px">
            <Stack
              direction={"row"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Stack direction="row" gap="4px" alignItems="center">
                <InputBox.Title>
                  {t("configuration.geofence.output_keep_active")}
                </InputBox.Title>

                <InputBox.Info
                  tooltipText={
                    <span style={{ whiteSpace: "pre-wrap" }}>
                      {tooltipText.exitAlert[lang]}
                    </span>
                  }
                />
              </Stack>
              <SwitchPrimary />
            </Stack>
            <Select>
              <MenuItem value={0}>
                {t("configuration.geofence.output_keep_active")}
              </MenuItem>
              <MenuItem value={1}>
                {t("configuration.geofence.output_keep_active")}
              </MenuItem>
            </Select>
          </Stack>

          <Stack gap="8px">
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                {t("configuration.geofence.output_active_delay")}
              </InputBox.Title>

              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {tooltipText.antiJamming[lang]}
                  </span>
                }
              />
            </Stack>

            <TextField
              type="number"
              inputProps={{
                min: 0,
                max: 3600,
              }}
            />
          </Stack>

          <Stack gap="8px">
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                {t("configuration.geofence.buzzer_speed_limit")}
              </InputBox.Title>

              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {tooltipText.exitAlert[lang]}
                  </span>
                }
              />
            </Stack>
            <TextField
              type="number"
              inputProps={{
                min: 0,
                max: 3600,
              }}
            />
          </Stack>

          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
          >
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                {t("configuration.geofence.anti_jamming")}
              </InputBox.Title>

              <InputBox.Info
                tooltipText={
                  <span style={{ whiteSpace: "pre-wrap" }}>
                    {tooltipText.antiJamming[lang]}
                  </span>
                }
              />
            </Stack>
            <SwitchPrimary />
          </Stack>
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <Stack gap="20px" sx={{ width: "100%", height: "500px" }}>
            <Maps
              ref={mapRef}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
              zoom={13}
              editableDrawing
              disableDrawing={
                typeFilter === "Polygon"
                  ? !!mapManager.polygons?.[0]?.path
                  : !!mapManager.circles?.[0]?.center
              }
              drawingModes={
                [
                  typeFilter === "Polygon"
                    ? !!mapManager.polygons?.[0]?.path
                      ? undefined
                      : "polygon"
                    : !!mapManager.circles?.[0]?.center
                    ? undefined
                    : "circle",
                ] as google.maps.drawing.OverlayType[]
              }
              onOverlayComplete={mapManager.completeOverlay}
              polygons={
                typeFilter === "Polygon"
                  ? [
                      {
                        paths: mapManager.polygons?.[0]?.path,
                      },
                    ]
                  : undefined
              }
              circles={
                typeFilter === "Circular"
                  ? [
                      {
                        center: mapManager.circles?.[0]?.center,
                        radius: mapManager.circles?.[0]?.radius,
                      },
                    ]
                  : undefined
              }
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack justifyContent={"flex-end"} direction="row" gap="8px">
        <Button variant="outlined" color="secondary">
          {t("common.popup.cancel")}
        </Button>
        <Button variant="contained" color="secondary">
          {t("model.add_model_pop_up.add")}
        </Button>
      </Stack>
    </Form>
  );
};

export default AddGeofence;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 1px 5px 0px #0000001a;
  border-radius: 8px;
  padding: 24px;
  gap: 16px;

  h1 {
    padding: 16px 0;
    font-weight: 700;
    font-size: 16px;
    line-height: 14px;
  }
`;
