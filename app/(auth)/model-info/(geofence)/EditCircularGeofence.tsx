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
import { useEffect, useMemo, useReducer, useRef } from "react";
import { useMapManager } from "@/src/hooks/useMapManager";
import { useTranslations } from "next-intl";
import { SwitchPrimary } from "@/components/switches";
import { FormField } from "../page";
import {
  getModelDataFromIDB,
  upsertCircularGeofencesToIDB,
} from "@/utils/idbModelUtil";
import useModelInfoStore from "@/src/stores/useModelInfo";

interface Props {
  id: number;
  formData: {
    [key: string]: FormField;
  };
  circularGeofenceKeys: string[];
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
    case "setSpeed1":
      return { ...state, speed1: action.payload };
    case "setSpeed2":
      return { ...state, speed2: action.payload };
    case "setBuzzerSpeedLimit":
      return { ...state, buzzerSpeedLimit: action.payload };
    case "setSpeedLimitDebounce":
      return { ...state, speedLimitDebounce: action.payload };
    case "setAntiJamming":
      return { ...state, antiJamming: action.payload };
    default:
      return state;
  }
};

const EditCircularGeofence = ({
  id,
  formData,
  circularGeofenceKeys,
  onCancel,
}: Props) => {
  const { getModelName, getFwVer, getTargetCountry } = useModelInfoStore();

  const modelName = useMemo(() => getModelName(), [getModelName]);
  const fwVer = useMemo(() => getFwVer(), [getFwVer]);
  const targetCountry = useMemo(() => getTargetCountry(), [getTargetCountry]);

  const [circleState, circleDispatch] = useReducer(circleReducer, {
    id: 1,
    enterAlert: false,
    exitAlert: false,
    showOutputActive: false,
    outputActive: "00",
    outputKeepActive: false,
    outputActiveDelay: 0,
    buzzerSpeedLimit: "00",
    speedLimitDebounce: 0,
    speed1: 0,
    speed2: 0,
    antiJamming: false,
  });

  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const mapRef = useRef<google.maps.Map>(null);
  const mapManager = useMapManager();

  /** Circular Geofence */
  const handleEditCirGeo = async () => {
    const circle = mapManager.circles[0];

    await upsertCircularGeofencesToIDB(modelName, fwVer, targetCountry, [
      {
        id: circleState.id,
        latitude: circle.center.lat,
        longitude: circle.center.lng,
        distance: circle.radius,
        enterAlert: circleState.enterAlert,
        exitAlert: circleState.exitAlert,
        showOutputActive: circleState.showOutputActive,
        outputActive: circleState.outputActive,
        outputActiveDelay: circleState.outputActiveDelay,
        outputKeepActive: circleState.outputKeepActive,
        speed1: circleState.speed1,
        speed2: circleState.speed2,
        buzzerSpeedLimit: circleState.buzzerSpeedLimit,
        speedLimitDebounce: circleState.speedLimitDebounce,
        antiJamming: circleState.antiJamming,
      },
    ]);

    onCancel();
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

  const renderSpeeds = () => {
    if (
      !formData["9002"] ||
      formData["9002"].realValue === "00" ||
      (!circularGeofenceKeys.includes("SPEED_1") &&
        !circularGeofenceKeys.includes("SPEED_2")) ||
      circleState.buzzerSpeedLimit === "00"
    )
      return null;

    return (
      <>
        {circularGeofenceKeys.includes("SPEED_1") && (
          <Stack gap="8px">
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                {t("configuration.geofence.speed_1")}
              </InputBox.Title>
            </Stack>
            <TextField
              type="number"
              value={circleState.speed1}
              onChange={(e) =>
                circleDispatch({
                  type: "setSpeed1",
                  payload: e.target.value,
                })
              }
              helperText={
                (circleState.speed1 > 3600 || circleState.speed1 < 0) &&
                circleState.speed1 !== ""
                  ? lang === "en"
                    ? `Input only between 0 ~ 3,600`
                    : lang === "pt"
                    ? `Entrada somente entre 0 ~ 3,600`
                    : `Entrada solo entre 0 ~ 3,600`
                  : ""
              }
              error={circleState.speed1 > 3600 || circleState.speed1 < 0}
              inputProps={{
                min: 0,
                max: 3600,
              }}
            />
          </Stack>
        )}
        {circularGeofenceKeys.includes("SPEED_2") && (
          <Stack gap="8px">
            <Stack direction="row" gap="4px" alignItems="center">
              <InputBox.Title>
                {t("configuration.geofence.speed_2")}
              </InputBox.Title>
            </Stack>
            <TextField
              type="number"
              value={circleState.speed2}
              onChange={(e) =>
                circleDispatch({
                  type: "setSpeed2",
                  payload: e.target.value,
                })
              }
              helperText={
                (circleState.speed2 > 3600 || circleState.speed2 < 0) &&
                circleState.speed2 !== ""
                  ? lang === "en"
                    ? `Input only between 0 ~ 3,600`
                    : lang === "pt"
                    ? `Entrada somente entre 0 ~ 3,600`
                    : `Entrada solo entre 0 ~ 3,600`
                  : ""
              }
              error={circleState.speed2 > 3600 || circleState.speed2 < 0}
              inputProps={{
                min: 0,
                max: 3600,
              }}
            />
          </Stack>
        )}
      </>
    );
  };

  const renderBuzzerSpeedLimit = () => {
    if (!circularGeofenceKeys.includes("BUZZER_SPEED_LIMIT")) return null;
    if (!formData["9002"] || formData["9002"].realValue === "00") return null;

    return (
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
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

        <SwitchPrimary
          checked={circleState.buzzerSpeedLimit === "01"}
          onChange={(e) =>
            circleDispatch({
              type: "setBuzzerSpeedLimit",
              payload: e.target.checked ? "01" : "00",
            })
          }
        />
      </Stack>
    );
  };

  const renderSpeedLimitDebounce = () => {
    if (!circularGeofenceKeys.includes("SPEED_LIMIT_DEBOUNCE")) return null;
    if (!formData["9002"] || formData["9002"].realValue === "00") return null;

    return (
      <Stack gap="8px">
        <Stack direction="row" gap="4px" alignItems="center">
          <InputBox.Title>
            {t("configuration.geofence.speed_limit_debounce")}
          </InputBox.Title>
        </Stack>
        <TextField
          type="number"
          value={circleState.speedLimitDebounce}
          onChange={(e) =>
            circleDispatch({
              type: "setSpeedLimitDebounce",
              payload: e.target.value,
            })
          }
          helperText={
            (circleState.speedLimitDebounce > 1800 ||
              circleState.speedLimitDebounce < 0) &&
            circleState.speedLimitDebounce !== ""
              ? lang === "en"
                ? `Input only between 0 ~ 3,600`
                : lang === "pt"
                ? `Entrada somente entre 0 ~ 3,600`
                : `Entrada solo entre 0 ~ 3,600`
              : ""
          }
          error={
            circleState.speedLimitDebounce > 1800 ||
            circleState.speedLimitDebounce < 0
          }
          inputProps={{
            min: 0,
            max: 1800,
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
    return (
      <Stack direction="row" gap={"24px"}>
        <Stack gap={"24px"} flex={1}>
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
              disabled={!mapManager.circles?.[0]?.center}
              value={mapManager.circles?.[0]?.center?.lat.toFixed(5) || ""}
              inputProps={{
                step: 0.001,
                style: { pointerEvents: 'none' },
                tabIndex: -1,
              }}
              onKeyDown={e => {
                // 모든 키 입력 차단 (상하좌우 포함)
                e.preventDefault();
              }}
              onChange={(e) => {
                const lat = parseFloat(e.target.value);
                mapManager.updateCircleCenter(
                  0,
                  lat,
                  mapManager.circles?.[0]?.center?.lng
                );
              }}
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
              disabled={!mapManager.circles?.[0]?.center}
              value={mapManager.circles?.[0]?.center?.lng.toFixed(5) || ""}
              inputProps={{
                step: 0.001,
                style: { pointerEvents: 'none' },
                tabIndex: -1,
              }}
              onKeyDown={e => {
                // 모든 키 입력 차단 (상하좌우 포함)
                e.preventDefault();
              }}
              onChange={(e) => {
                const lng = parseFloat(e.target.value);
                mapManager.updateCircleCenter(
                  0,
                  mapManager.circles?.[0]?.center?.lat,
                  lng
                );
              }}
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
              disabled={!mapManager.circles?.[0]?.center}
              value={mapManager.circles?.[0]?.radius.toFixed(5) || ""}
              inputProps={{
                step: 5,
                style: { pointerEvents: 'none' },
                tabIndex: -1,
              }}
              onKeyDown={e => {
                // 모든 키 입력 차단 (상하좌우 포함)
                e.preventDefault();
              }}
              onChange={(e) => {
                mapManager.updateCircleRadius(0, parseFloat(e.target.value));
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
          {renderSpeeds()}
          {renderSpeedLimitDebounce()}
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

  useEffect(() => {
    const fetchCircularGeofenceById = async (id: number) => {
      const modelData = await getModelDataFromIDB(
        modelName,
        fwVer,
        targetCountry
      );
      return modelData?.geofence?.circular.find((item) => item.id === id);
    };

    fetchCircularGeofenceById(id).then((data) => {
      const newCircle = new google.maps.Circle({
        center: {
          lat: data?.latitude,
          lng: data?.longitude,
        },
        radius: data?.distance,
        map: mapRef.current, // mapRef에 담긴 지도 객체에 폴리곤 추가
        editable: true, // 필요에 따라 편집 가능 여부 설정
      });
      mapManager.shapesRef.current.push({
        overlay: newCircle,
        type: google.maps.drawing.OverlayType.CIRCLE,
      });

      mapManager.addCircle({
        id: 0,
        radius: data?.distance,
        center: {
          lat: data?.latitude,
          lng: data?.longitude,
        },
      });
      mapManager.registerEditableHandlers();

      if (mapRef.current) {
        mapRef.current.setCenter({
          lat: data?.latitude,
          lng: data?.longitude,
        });
      }

      circleDispatch({
        type: "setId",
        payload: data.id,
      });
      circleDispatch({
        type: "setEnterAlert",
        payload: data?.enterAlert,
      });
      circleDispatch({
        type: "setExitAlert",
        payload: data?.exitAlert,
      });
      circleDispatch({
        type: "setOutputActive",
        payload: data?.outputActive,
      });
      circleDispatch({
        type: "setShowOutputActive",
        payload: data?.showOutputActive,
      });
      circleDispatch({
        type: "setOutputActiveDelay",
        payload: data?.outputActiveDelay,
      });
      circleDispatch({
        type: "setOutputKeepActive",
        payload: data?.outputKeepActive,
      });
      circleDispatch({
        type: "setSpeed1",
        payload: data?.speed1,
      });
      circleDispatch({
        type: "setSpeed2",
        payload: data?.speed2,
      });
      circleDispatch({
        type: "setBuzzerSpeedLimit",
        payload: data?.buzzerSpeedLimit,
      });
      circleDispatch({
        type: "setSpeedLimitDebounce",
        payload: data?.speedLimitDebounce,
      });
      circleDispatch({
        type: "setAntiJamming",
        payload: data?.antiJamming,
      });
    });
  }, [id, modelName, fwVer, targetCountry]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditCirGeo();
      }}
    >
      <h1 data-section-id={SECTIONS.GeofenceConfig.en}>
        {t("configuration.geofence.add_geofence_(circular)")}
      </h1>

      {renderCircularGeofence()}

      <Stack justifyContent={"flex-end"} direction="row" gap="8px">
        <Button variant="outlined" color="secondary" onClick={onCancel}>
          {t("common.popup.cancel")}
        </Button>
        <Button
          type="submit"
          variant="contained"
          color="secondary"
          disabled={
            !mapManager.circles?.[0]?.center ||
            (!circleState.enterAlert && !circleState.exitAlert)
          }
        >
          {t("configuration.ble.save")}
        </Button>
      </Stack>
    </Form>
  );
};

export default EditCircularGeofence;

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
