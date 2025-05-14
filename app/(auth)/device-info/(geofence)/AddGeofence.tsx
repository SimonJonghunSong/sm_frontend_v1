import {
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import styled from "styled-components";
import InputBox from "@/components/inputbox/InputBox";
import { SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import Maps from "@/components/Map";
import { useReducer, useRef, useState } from "react";
import { useMapManager } from "@/src/hooks/useMapManager";
import DataTable from "@/components/dataTable";
import { SerialPortState } from "@/src/stores/useSerialStore";
import { useTranslations } from "next-intl";
import { SwitchPrimary } from "@/components/switches";
import { FormField } from "../page";
import { findCircleIndexByNumber } from "@/utils/generateFormattedIndexes";
import {
  convertCircleCoordinatesToHexString,
  convertCoordinatesToHexString,
} from "@/utils/coordinateToHex";
import {
  AT_EDIT_PREFIX,
  POLYGON_GEOFENCE_POINTS,
} from "@/src/hooks/useSerial/constant";
import { chunkDataByNumberAndWrite } from "@/src/functions";
import { delayPromise } from "@/src/hooks/useSerial";

interface Props {
  formData: {
    [key: string]: FormField;
  };
  currentPort: SerialPortState;
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
  circularGeofenceKeys: string[];
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

const circleReducer = (state: any, action: any) => {
  switch (action.type) {
    case "setId":
      return { ...state, id: action.payload };
    case "setEnterAlert":
      return { ...state, enterAlert: action.payload };
    case "setExitAlert":
      return { ...state, exitAlert: action.payload };
    case "setShowOutputActive":
      return { ...state, showOutputActive: action.payload };
    case "setOutputActive":
      return { ...state, outputActive: action.payload };
    case "setOutputKeepActive":
      return { ...state, outputKeepActive: action.payload };
    case "setOutputActiveDelay":
      return { ...state, outputActiveDelay: action.payload };
    case "setBuzzerSpeedLimit":
      return { ...state, buzzerSpeedLimit: action.payload };
    case "setAntiJamming":
      return { ...state, antiJamming: action.payload };
  }
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
    case "setSpeedLimitDebounce":
      return { ...state, speedLimitDebounce: action.payload };
  }
};

const AddGeofence = ({
  formData,
  currentPort,
  write,
  polygonGeofenceMax,
  circularGeofenceMax,
  circularGeofenceKeys,
  polygonGeofenceKeys,
  onSuccess,
  onCancel,
}: Props) => {
  const [typeFilter, setTypeFilter] = useState<"Polygon" | "Circular">(
    circularGeofenceMax === 0 ? "Polygon" : "Circular"
  );

  const [circleState, circleDispatch] = useReducer(circleReducer, {
    id: 1,
    enterAlert: false,
    exitAlert: false,
    showOutputActive: false,
    outputActive: "00",
    outputKeepActive: false,
    outputActiveDelay: 0,
    buzzerSpeedLimit: 0,
    antiJamming: false,
  });
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

  /** Circular Geofence */
  const handleAddCirGeo = () => {
    const circleIndex = findCircleIndexByNumber(circleState.id - 1);
    const circle = mapManager.circles[0];
    const coordinateToHexString = convertCircleCoordinatesToHexString({
      lat: circle.center.lat,
      lng: circle.center.lng,
      radius: circle.radius,
    });

    const enterAlertHexString = circleState.enterAlert ? "01" : "00";
    const exitAlertHexString = circleState.exitAlert ? "01" : "00";

    const getOutputActiveHexString = () => {
      if (
        !formData["9001"] ||
        formData["9001"].realValue === "00" ||
        !circularGeofenceKeys.includes("OUT_ACT")
      )
        return "";

      if (circleState.outputActive === "00") return "00";

      if (circleState.outputKeepActive) {
        if (circleState.outputActive === "01") return "06";
        if (circleState.outputActive === "02") return "07";
        if (circleState.outputActive === "03") return "08";
        if (circleState.outputActive === "04") return "09";
        if (circleState.outputActive === "05") return "0A";
      }

      return circleState.outputActive;
    };

    const getOutputActiveDelayHexString = () => {
      if (
        !formData["9001"] ||
        formData["9001"].realValue === "00" ||
        !circularGeofenceKeys.includes("OUT_ACT_DELAY")
      )
        return "";
      return Math.floor(circleState.outputActiveDelay * 1000000)
        .toString(16)
        .padStart(8, "0")
        .toUpperCase();
    };

    const getBuzzerSpeedLimitHexString = () => {
      if (
        !formData["9002"] ||
        formData["9002"].realValue === "00" ||
        !circularGeofenceKeys.includes("BUZZER_SPEED_LIMIT")
      )
        return "";

      if (
        circularGeofenceKeys.includes("SPEED_2") &&
        circularGeofenceKeys.includes("SPEED_1")
      ) {
        return (
          Math.floor(circleState.buzzerSpeedLimit * 1000000)
            .toString(16)
            .padStart(8, "0")
            .toUpperCase() +
          Math.floor(circleState.buzzerSpeedLimit * 1000000)
            .toString(16)
            .padStart(8, "0")
            .toUpperCase() +
          "00" // 01로 하면 무조건 에러 남
        );
      }

      return (
        Math.floor(circleState.buzzerSpeedLimit * 1000000)
          .toString(16)
          .padStart(8, "0")
          .toUpperCase() + "00" // 01로 하면 무조건 에러 남
      );
    };

    const getSpeedLimitDebounceHexString = () => {
      if (
        !formData["9002"] ||
        formData["9002"].realValue === "00" ||
        !circularGeofenceKeys.includes("SPEED_LIMIT_DEBOUNCE")
      )
        return "";

      return "0000"; // 01로 하면 무조건 에러 남
    };

    const getAntiJammingHexString = () => {
      if (
        !circularGeofenceKeys.includes("ANTI_JAM") ||
        !formData["9002"] ||
        formData["9002"].realValue === "00"
      )
        return "";
      return circleState.antiJamming ? "01" : "00";
    };

    const enterExitHexString = `${enterAlertHexString}${exitAlertHexString}`;
    const outputActiveHexString = getOutputActiveHexString();
    const outputActiveDelayHexString = getOutputActiveDelayHexString();
    const buzzerSpeedLimitHexString = getBuzzerSpeedLimitHexString();
    const antiJammingHexString = getAntiJammingHexString();
    const speedLimitDebounceHexString = getSpeedLimitDebounceHexString();

    const restString = `${enterExitHexString}${outputActiveHexString}${outputActiveDelayHexString}${buzzerSpeedLimitHexString}${antiJammingHexString}${speedLimitDebounceHexString}`;

    currentPort.port.oneditsuccess = () => {
      onSuccess();
      onCancel();
    };

    write({
      data: `${AT_EDIT_PREFIX}${currentPort.imei};${circleIndex}#${coordinateToHexString}${restString}`,
      port: currentPort,
      writer: currentPort.writer,
    });
  };

  const renderOutputActive = () => {
    if (!formData["9001"] || formData["9001"].realValue === "00") return null;
    if (!circularGeofenceKeys.includes("OUT_ACT")) return null;

    return (
      <>
        <Stack gap={"8px"}>
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
                    {tooltipText.outputActive[lang]}
                  </span>
                }
              />
            </Stack>
            <SwitchPrimary
              checked={circleState.showOutputActive}
              onChange={(e) =>
                circleDispatch({
                  type: "setShowOutputActive",
                  payload: e.target.checked,
                })
              }
            />
          </Stack>

          {circleState.showOutputActive && (
            <Select
              value={circleState.outputActive}
              onChange={(e) =>
                circleDispatch({
                  type: "setOutputActive",
                  payload: e.target.value,
                })
              }
            >
              <MenuItem value={"00"}>
                {t("account.add_account_pop_up.select")}
              </MenuItem>
              <MenuItem value={"01"}>
                {t("configuration.geofence.output_1")}
              </MenuItem>
              <MenuItem value={"02"}>
                {t("configuration.geofence.output_2")}
              </MenuItem>
              <MenuItem value={"03"}>
                {t("configuration.geofence.output_3")}
              </MenuItem>
              <MenuItem value={"04"}>
                {t("configuration.geofence.output_4")}
              </MenuItem>
              <MenuItem value={"05"}>
                {t("configuration.geofence.all_outputs")}
              </MenuItem>
            </Select>
          )}
        </Stack>

        {circleState.showOutputActive && circleState.outputActive !== "00" && (
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
                      {tooltipText.outputKeepActive[lang]}
                    </span>
                  }
                />
              </Stack>
              <SwitchPrimary
                checked={circleState.outputKeepActive}
                onChange={(e) =>
                  circleDispatch({
                    type: "setOutputKeepActive",
                    payload: e.target.checked,
                  })
                }
              />
            </Stack>
          </Stack>
        )}
      </>
    );
  };

  const renderOutputActiveDelay = () => {
    if (!circularGeofenceKeys.includes("OUT_ACT_DELAY")) return null;
    if (!formData["9001"] || formData["9001"].realValue === "00") return null;
    return (
      <Stack gap="8px">
        <Stack direction="row" gap="4px" alignItems="center">
          <InputBox.Title>
            {t("configuration.geofence.output_active_delay")}
          </InputBox.Title>

          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {tooltipText.outputActiveDelay[lang]}
              </span>
            }
          />
        </Stack>

        <TextField
          type="number"
          value={circleState.outputActiveDelay}
          onChange={(e) =>
            circleDispatch({
              type: "setOutputActiveDelay",
              payload: e.target.value,
            })
          }
          helperText={
            (circleState.outputActiveDelay > 3600 ||
              circleState.outputActiveDelay < 0) &&
            circleState.outputActiveDelay !== ""
              ? lang === "en"
                ? `Input only between 0 ~ 3,600`
                : lang === "pt"
                ? `Entrada somente entre 0 ~ 3,600`
                : `Entrada solo entre 0 ~ 3,600`
              : ""
          }
          error={
            circleState.outputActiveDelay > 3600 ||
            circleState.outputActiveDelay < 0
          }
          inputProps={{
            min: 0,
            max: 3600,
          }}
        />
      </Stack>
    );
  };

  const renderBuzzerSpeedLimit = () => {
    if (!circularGeofenceKeys.includes("BUZZER_SPEED_LIMIT")) return null;
    if (!formData["9002"] || formData["9002"].realValue === "00") return null;

    return (
      <Stack gap="8px">
        <Stack direction="row" gap="4px" alignItems="center">
          <InputBox.Title>
            {t("configuration.geofence.buzzer_speed_limit")}
          </InputBox.Title>

          <InputBox.Info
            tooltipText={
              <span style={{ whiteSpace: "pre-wrap" }}>
                {tooltipText.buzzerSpeedLimit[lang]}
              </span>
            }
          />
        </Stack>

        <TextField
          type="number"
          value={circleState.buzzerSpeedLimit}
          onChange={(e) =>
            circleDispatch({
              type: "setBuzzerSpeedLimit",
              payload: e.target.value,
            })
          }
          helperText={
            (circleState.buzzerSpeedLimit > 300 ||
              circleState.buzzerSpeedLimit < 0) &&
            circleState.buzzerSpeedLimit !== ""
              ? lang === "en"
                ? `Input only between 0 ~ 300`
                : lang === "pt"
                ? `Entrada somente entre 0 ~ 300`
                : `Entrada solo entre 0 ~ 300`
              : ""
          }
          error={
            circleState.buzzerSpeedLimit > 300 ||
            circleState.buzzerSpeedLimit < 0
          }
          inputProps={{
            min: 0,
            max: 300,
          }}
        />
      </Stack>
    );
  };

  const renderAntiJamming = () => {
    if (
      !circularGeofenceKeys.includes("ANTI_JAM") ||
      !formData["9002"] ||
      formData["9002"].realValue === "00"
    )
      return null;

    return (
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

        <SwitchPrimary
          checked={circleState.antiJamming}
          onChange={(e) =>
            circleDispatch({
              type: "setAntiJamming",
              payload: e.target.checked,
            })
          }
        />
      </Stack>
    );
  };

  const renderCircularGeofence = () => {
    if (typeFilter !== "Circular") return null;
    return (
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
              {circularGeofenceMax !== 0 && (
                <MenuItem value={"Circular"}>
                  {t("configuration.geofence.circular")}
                </MenuItem>
              )}
              {polygonGeofenceMax !== 0 && (
                <MenuItem value={"Polygon"}>
                  {t("configuration.geofence.polygon")}
                </MenuItem>
              )}
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

            <Select
              value={circleState.id}
              onChange={(e) =>
                circleDispatch({
                  type: "setId",
                  payload: e.target.value,
                })
              }
            >
              {new Array(circularGeofenceMax).fill(0).map((_, index) => (
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
            <SwitchPrimary
              checked={circleState.enterAlert}
              onChange={(e) =>
                circleDispatch({
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
              checked={circleState.exitAlert}
              onChange={(e) =>
                circleDispatch({
                  type: "setExitAlert",
                  payload: e.target.checked,
                })
              }
            />
          </Stack>
          {renderOutputActive()}
          {renderOutputActiveDelay()}
          {renderBuzzerSpeedLimit()}
          {renderAntiJamming()}
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <Stack gap="20px" sx={{ width: "100%", height: "500px" }}>
            <Maps
              ref={mapRef}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
              zoom={13}
              editableDrawing
              disableDrawing={!!mapManager.circles?.[0]?.center}
              drawingModes={
                [
                  !!mapManager.circles?.[0]?.center ? undefined : "circle",
                ] as google.maps.drawing.OverlayType[]
              }
              onOverlayComplete={mapManager.completeOverlay}
              polygons={undefined}
              circles={[
                {
                  center: mapManager.circles?.[0]?.center,
                  radius: mapManager.circles?.[0]?.radius,
                },
              ]}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  };

  /** Polygon Geofence */
  const handleAddPolygonGeo = () => {
    const imei = currentPort.port.imei;

    const pointId = POLYGON_GEOFENCE_POINTS[polygonState.id - 1];
    const coordinateToHexString = convertCoordinatesToHexString(
      mapManager.polygons[0].path
    );

    currentPort.port.oneditsuccess = async () => {
      await delayPromise(100);

      const enterAlertHexString = polygonState.enterAlert ? "01" : "00";
      const exitAlertHexString = polygonState.exitAlert ? "01" : "00";
      const enterExitHexString = `${enterAlertHexString}${exitAlertHexString}`;

      const isPolygonSpeedLimitDisabled =
        !formData["9000"] || formData["9000"]?.realValue === "00";

      const buzzerSpeedLimitHex = Math.floor(
        polygonState.buzzerSpeedLimit * 1000000
      )
        .toString(16)
        .padStart(8, "0")
        .toUpperCase();

      const speedLimitDebounceHex = Math.floor(polygonState.speedLimitDebounce)
        .toString(16)
        .padStart(4, "0")
        .toUpperCase();

      const getPolygonSpeedLimitHex =
        !isPolygonSpeedLimitDisabled &&
        polygonGeofenceKeys.includes("Polygon Speed Limit")
          ? buzzerSpeedLimitHex
          : "";

      const getSpeedLimitDebounceHex =
        !isPolygonSpeedLimitDisabled &&
        polygonGeofenceKeys.includes("Speed Limit Debounce")
          ? speedLimitDebounceHex
          : "";

      currentPort.port.oneditsuccess = () => {
        onSuccess();
        onCancel();
      };

      write({
        data: `${AT_EDIT_PREFIX}${imei};53;${String(
          polygonState.id - 1
        ).padStart(2, "0")}#${mapManager.polygons[0].path.length
          .toString(16)
          .padStart(
            2,
            "0"
          )}${enterExitHexString}${getPolygonSpeedLimitHex}${getSpeedLimitDebounceHex}`,
        port: currentPort,
        writer: currentPort.writer,
      });
    };

    // 20개 이상이면 쪼개서 보내는 로직
    chunkDataByNumberAndWrite(
      {
        write: write as any,
        port: currentPort.port,
        writer: currentPort.writer,
      },
      {
        prefix: `${AT_EDIT_PREFIX}${imei};${pointId};`,
        target: coordinateToHexString,
      }
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
    if (typeFilter !== "Polygon") return null;

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
              {circularGeofenceMax !== 0 && (
                <MenuItem value={"Circular"}>
                  {t("configuration.geofence.circular")}
                </MenuItem>
              )}
              {polygonGeofenceMax !== 0 && (
                <MenuItem value={"Polygon"}>
                  {t("configuration.geofence.polygon")}
                </MenuItem>
              )}
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

            <Select
              value={polygonState.id}
              onChange={(e) =>
                polygonDispatch({
                  type: "setId",
                  payload: e.target.value,
                })
              }
            >
              {new Array(polygonGeofenceMax).fill(0).map((_, index) => (
                <MenuItem value={index + 1}>{index + 1}</MenuItem>
              ))}
            </Select>
          </Stack>

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
              polygons={
                typeFilter === "Polygon"
                  ? [
                      {
                        paths: mapManager.polygons?.[0]?.path,
                      },
                    ]
                  : undefined
              }
              circles={undefined}
            />
          </Stack>
        </Stack>
      </Stack>
    );
  };

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        if (typeFilter === "Circular") {
          handleAddCirGeo();
        } else {
          handleAddPolygonGeo();
        }
      }}
    >
      <h1 data-section-id={SECTIONS.GeofenceConfig.en}>
        {t("configuration.geofence.add_geofence_(circular)")}
      </h1>

      {renderCircularGeofence()}

      {renderPolygonGeofence()}

      <Stack justifyContent={"flex-end"} direction="row" gap="8px">
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          {t("common.popup.cancel")}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={
            typeFilter === "Polygon"
              ? !mapManager.polygons?.[0]?.path
              : !mapManager.circles?.[0]?.center
          }
        >
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
