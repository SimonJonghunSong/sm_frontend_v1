import { useEffect, useReducer, useRef, useState } from "react";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import styled from "styled-components";
import InputBox from "@/components/inputbox/InputBox";
import Maps from "@/components/Map";
import DataTable from "@/components/dataTable";
import { SwitchPrimary } from "@/components/switches";
import FullLoading from "@/components/FullLoading";
import { SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import { useMapManager } from "@/src/hooks/useMapManager";
import { getPolygonGeofenceData } from "@/src/hooks/useSerial/utils";
import { useTranslations } from "next-intl";
import { generateFormattedIndexes } from "@/utils/generateFormattedIndexes";
import { convertCoordinatesToHexString } from "@/utils/coordinateToHex";
import {
  AT_EDIT_PREFIX,
  AT_GET_POLYGON_INFO,
  CR,
  parsePolygonInfo,
  POLYGON_GEOFENCE_POINTS,
} from "@/src/hooks/useSerial/constant";
import { chunkDataByNumberAndWrite } from "@/src/functions";
import { delayPromise } from "@/src/hooks/useSerial";
import { parseResponseToPolygonData } from "app/(auth)/configuration/geofence/utils";
import { SerialPortState } from "@/src/stores/useSerialStore";
import { FormField } from "../page";

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
  }
};

const EditPolygonGeofence = ({
  id,
  formData,
  currentPort,
  write,
  onSuccess,
  onCancel,
}: Props) => {
  const [isFullLoading, setIsFullLoading] = useState(false);
  const [polygonInfoFetched, setPolygonInfoFetched] = useState(false);
  const [polygonState, polygonDispatch] = useReducer(polygonReducer, {
    id: 1,
    enterAlert: false,
    exitAlert: false,
    buzzerSpeedLimit: 0,
  });

  const polygonPointRef = useRef("");

  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const mapRef = useRef<google.maps.Map>(null);
  const mapManager = useMapManager();
  const polygonInfoRef = useRef("");
  const polygonList = currentPort.polygonGeofenceData;
  const polygonData = getPolygonGeofenceData(polygonList);

  /** Polygon Geofence */
  const handleEditPolygonGeo = () => {
    const imei = currentPort.port.imei;

    const pointId = POLYGON_GEOFENCE_POINTS[polygonState.id - 1];
    const coordinateToHexString = convertCoordinatesToHexString(
      mapManager.polygons[0].path
    );

    currentPort.port.oneditsuccess = async () => {
      await delayPromise(200);

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

      const getPolygonSpeedLimitHex = isPolygonSpeedLimitDisabled
        ? ""
        : buzzerSpeedLimitHex;

      currentPort.port.oneditsuccess = () => {
        onSuccess();
        onCancel();
      };

      write({
        data: `${AT_EDIT_PREFIX}${imei};53;${String(
          polygonState.id - 1
        ).padStart(2, "0")}#${mapManager.polygons[0].path.length
          .toString(16)
          .padStart(2, "0")}${enterExitHexString}${getPolygonSpeedLimitHex}`,
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
    if (!formData["9000"] || formData["9000"].realValue === "00") return null;
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

          {renderPolygonSpeedLimit()}
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
    if (!currentPort.port.readable && !currentPort.port.writable) return;

    // 원래 핸들러 백업
    const originalBufferValueHandler = currentPort.port.onbuffervalue;

    // 폴리곤 정보 핸들러
    const handlePolygonInfo = (value: string) => {
      polygonInfoRef.current += value;

      if (value.includes(CR)) {
        const responseParts = polygonInfoRef.current.split(CR);
        const validResponse = responseParts.find(
          (part) => part.includes("RRE;") && part.includes(";53;")
        );

        if (validResponse) {
          // #을 기준으로 분리하여 오른쪽 부분이 폴리곤 정보
          const responseSections = validResponse.split("#");
          const responseData =
            responseSections.length > 1 ? responseSections[1] : "";

          // 폴리곤 정보 파싱
          const polygonInfoData = parsePolygonInfo(responseData);

          if (polygonInfoData) {
            polygonDispatch({
              type: "setEnterAlert",
              payload: polygonInfoData.enterAlert,
            });
            polygonDispatch({
              type: "setExitAlert",
              payload: polygonInfoData.exitAlert,
            });
            polygonDispatch({
              type: "setBuzzerSpeedLimit",
              payload: polygonInfoData?.buzzerSpeedLimit || 0,
            });
          }

          // 정보 요청 완료 표시 - 포인트 요청 효과 트리거
          setPolygonInfoFetched(true);

          // 핸들러 정리
          currentPort.port.onbuffervalue = originalBufferValueHandler;
        } else {
        }

        polygonInfoRef.current = "";
      }
    };

    // 핸들러 설정
    currentPort.port.onbuffervalue = handlePolygonInfo;

    setIsFullLoading(true);
    // 폴리곤 정보 요청
    write({
      data: AT_GET_POLYGON_INFO(currentPort.port.imei, Number(id) - 1),
      port: currentPort,
      writer: currentPort.writer,
    });
  }, [currentPort.port.readable, currentPort.port.writable]);

  useEffect(() => {
    if (
      (!currentPort.port.readable && !currentPort.port.writable) ||
      !polygonInfoFetched
    )
      return;

    setIsFullLoading(true);

    const poly = polygonData.find(({ groupId }) => groupId === Number(id));
    const polyCount = poly.polygonCount;

    currentPort.port.ispolygonpointfetching = true;
    currentPort.port.polygonhandler = (value) => {
      polygonPointRef.current += value;
      if (
        polygonPointRef.current.split(CR).length - 1 ===
        Math.ceil(polyCount / 20)
      ) {
        currentPort.port.ispolygonpointfetching = false;
        const polygonPoint = polygonPointRef.current
          .split(CR)
          .filter((item) => item !== "");
        const header = polygonPoint[0].split(";").slice(0, 3).join(";") + ";";
        const combinedData = polygonPoint
          .map((item) => item.split(";").slice(3).join(";"))
          .join(";");
        const polygonAllData = header + combinedData;
        const polygonData = parseResponseToPolygonData(polygonAllData, () => {
          polygonPointRef.current = "";
        });

        if (polygonData) {
          // setFetchedPolygonData({ paths: polygonData.path });
          const newPolygon = new google.maps.Polygon({
            paths: polygonData.path,
            map: mapRef.current, // mapRef에 담긴 지도 객체에 폴리곤 추가
            editable: true, // 필요에 따라 편집 가능 여부 설정
          });

          mapManager.shapesRef.current.push({
            overlay: newPolygon,
            type: google.maps.drawing.OverlayType.POLYGON,
          });
          mapManager.addPolygon({ id: 0, path: polygonData.path });
          mapManager.registerEditableHandlers();

          if (mapRef.current) {
            mapRef.current.setCenter({
              lat: polygonData.path[0].lat,
              lng: polygonData.path[0].lng,
            });
          }
          setIsFullLoading(false);
        }
        polygonPointRef.current = "";
      }
    };
    currentPort.port.onprev = () => {
      currentPort.port.polygonhandler = null;
      currentPort.port.ispolygonpointfetching = false;
    };
    // 20개 이상이면 쪼개서 보내는 로직
    chunkDataByNumberAndWrite(
      {
        write: write as any,
        port: currentPort.port,
        writer: currentPort.writer,
      },
      {
        chuckString: ",",
        prefix: `AT^REQ;${currentPort.port.imei};${
          POLYGON_GEOFENCE_POINTS[(Number(id) - 1) as number]
        };`,
        target: generateFormattedIndexes(polyCount).join(),
      }
    );
  }, [
    currentPort.port.readable,
    currentPort.port.writable,
    polygonInfoFetched,
  ]);

  useEffect(() => {
    // 폴리곤 정보 요청 후 8초 뒤에 로딩 해제
    setTimeout(() => {
      setIsFullLoading(false);
    }, 8000);
  }, []);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        handleEditPolygonGeo();
      }}
    >
      {isFullLoading && <FullLoading />}
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
