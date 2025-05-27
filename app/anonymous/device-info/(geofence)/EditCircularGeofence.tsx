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
import { useEffect, useReducer, useRef, useState } from "react";
import { useMapManager } from "@/src/hooks/useMapManager";
import { SerialPortState } from "@/src/stores/useSerialStore";
import { useTranslations } from "next-intl";
import { SwitchPrimary } from "@/components/switches";
import { FormField } from "../page";
import { findCircleIndexByNumber } from "@/utils/generateFormattedIndexes";
import { convertCircleCoordinatesToHexString } from "@/utils/coordinateToHex";
import { AT_EDIT_PREFIX, CR } from "@/src/hooks/useSerial/constant";
import { parseLatLngRadius } from "app/(auth)/configuration/geofence/utils";
import FullLoading from "@/components/FullLoading";

interface Props {
  id: number;
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
    case "setBuzzerSpeedLimit":
      return { ...state, buzzerSpeedLimit: action.payload };
    case "setAntiJamming":
      return { ...state, antiJamming: action.payload };
    default:
      return state;
  }
};

const EditCircularGeofence = ({
  id,
  formData,
  currentPort,
  write,
  circularGeofenceKeys,
  onSuccess,
  onCancel,
}: Props) => {
  const [isFullLoading, setIsFullLoading] = useState(false);
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

  const infoRef = useRef<string>("");

  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const mapRef = useRef<google.maps.Map>(null);
  const mapManager = useMapManager();

  /** Circular Geofence */
  const handleEditCirGeo = () => {
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

    const restString = `${enterExitHexString}${outputActiveHexString}${outputActiveDelayHexString}${buzzerSpeedLimitHexString}${antiJammingHexString}`;

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

  useEffect(() => {
    setIsFullLoading(true);

    if (!currentPort.port.readable && !currentPort.port.writable) return;

    const circleIndex = findCircleIndexByNumber(Number(id) - 1);
    currentPort.port.iscircularpointfetching = true;
    currentPort.port.circlehandler = (value) => {
      infoRef.current += value;
      if (value.includes(CR)) {
        const circleData = parseLatLngRadius(infoRef.current);

        const newCircle = new google.maps.Circle({
          center: circleData.center,
          radius: circleData.radius,
          map: mapRef.current, // mapRef에 담긴 지도 객체에 폴리곤 추가
          editable: true, // 필요에 따라 편집 가능 여부 설정
        });
        mapManager.shapesRef.current.push({
          overlay: newCircle,
          type: google.maps.drawing.OverlayType.CIRCLE,
        });

        mapManager.addCircle({
          id: 0,
          radius: circleData.radius,
          center: circleData.center,
        });
        mapManager.registerEditableHandlers();

        if (mapRef.current) {
          mapRef.current.setCenter({
            lat: circleData.center.lat,
            lng: circleData.center.lng,
          });
        }

        circleDispatch({
          type: "setEnterAlert",
          payload: circleData.enterAlert,
        });
        circleDispatch({
          type: "setExitAlert",
          payload: circleData.exitAlert,
        });

        if (
          !!formData["9001"] &&
          formData["9001"].realValue === "01" &&
          circularGeofenceKeys.includes("OUT_ACT")
        ) {
          const valueHex = infoRef.current.split("#")[1];
          const outputActiveHex = valueHex.slice(24, 26);
          const outputActiveDelayHex = valueHex.slice(26, 34);

          circleDispatch({
            type: "setOutputActiveDelay",
            payload: parseInt(outputActiveDelayHex, 16) / 1000000,
          });

          let outputActive = outputActiveHex;

          if (outputActiveHex === "06") {
            outputActive = "01";
            circleDispatch({
              type: "setOutputKeepActive",
              payload: true,
            });
          }
          if (outputActiveHex === "07") {
            outputActive = "02";
            circleDispatch({
              type: "setOutputKeepActive",
              payload: true,
            });
          }
          if (outputActiveHex === "08") {
            outputActive = "03";
            circleDispatch({
              type: "setOutputKeepActive",
              payload: true,
            });
          }
          if (outputActiveHex === "09") {
            outputActive = "04";
            circleDispatch({
              type: "setOutputKeepActive",
              payload: true,
            });
          }
          if (outputActiveHex === "0A") {
            outputActive = "05";
            circleDispatch({
              type: "setOutputKeepActive",
              payload: true,
            });
          }

          circleDispatch({
            type: "setOutputActive",
            payload: outputActive,
          });

          if (outputActive === "00") {
            circleDispatch({
              type: "setShowOutputActive",
              payload: false,
            });
          } else {
            circleDispatch({
              type: "setShowOutputActive",
              payload: true,
            });
          }
        }

        if (circularGeofenceKeys.includes("ANTI_JAM")) {
          const valueHex = infoRef.current.split("#")[1];
          const antiJammingHex = valueHex.trim().slice(-2);

          circleDispatch({
            type: "setAntiJamming",
            payload: antiJammingHex === "01",
          });
        }

        setIsFullLoading(false);
        infoRef.current = "";
        currentPort.port.iscircularpointfetching = false;
      }
    };

    write({
      data: `AT^REQ;${currentPort.imei};${circleIndex}`,
      port: currentPort,
      writer: currentPort.writer,
    });
  }, [currentPort.port.readable, currentPort.port.writable]);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditCirGeo();
      }}
    >
      {isFullLoading && <FullLoading />}
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
          disabled={!mapManager.circles?.[0]?.center}
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
