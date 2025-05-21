import { Button, IconButton, MenuItem, Select, Stack } from "@mui/material";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import styled from "styled-components";
import InputBox from "@/components/inputbox/InputBox";
import { SECTIONS } from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import Maps from "@/components/Map";
import { useEffect, useRef, useState } from "react";
import { useMapManager } from "@/src/hooks/useMapManager";
import DataTable from "@/components/dataTable";
import {
  getCircularGeofenceData,
  getPolygonGeofenceData,
} from "@/src/hooks/useSerial/utils";
import useSerialStore, { SerialPortState } from "@/src/stores/useSerialStore";
import useGefence from "@/src/hooks/useGefence";
import {
  AT_EDIT_PREFIX,
  CR,
  POLYGON_GEOFENCE_POINTS,
} from "@/src/hooks/useSerial/constant";
import {
  findCircleIndexByNumber,
  generateFormattedIndexes,
} from "@/utils/generateFormattedIndexes";
import { chunkDataByNumberAndWrite } from "@/src/functions";
import {
  parseResponseToPolygonData,
  parseLatLngRadius,
} from "app/(auth)/configuration/geofence/utils";
import { CircleType, PolygonType } from "@/components/Map/type";
import { useTranslations } from "next-intl";
import FullLoading from "@/components/FullLoading";
import { FormField } from "../page";

interface Props {
  formData: {
    [key: string]: FormField;
  };
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

const columns: GridColDef[] = [
  {
    field: "no",
    headerName: "No",
    width: 60,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "type",
    headerName: "Type",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "groupId",
    headerName: "ID",
    width: 70,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "edit",
    headerName: "Edit",
    width: 60,
    headerAlign: "center",
    align: "center",
    renderCell: (e) => (
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          e.value.onEdit();
        }}
      >
        <EditOutlinedIcon />
      </IconButton>
    ),
  },
  {
    field: "delete",
    headerName: "Delete",
    width: 80,
    headerAlign: "center",
    align: "center",
    renderCell: (e) => (
      <IconButton
        onClick={(event) => {
          event.stopPropagation();
          e.value.onDelete();
        }}
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
    ),
  },
];

const tooltipText = {
  en: "When geofences are set in the form of a polygon or circular shape on the map, the configured actives will be triggered when the device enters or exits the boundary.",
  pt: "Quando os geofences são configurados na forma de um polígono ou forma circular no mapa, as ações configuradas serão acionadas quando o dispositivo entrar ou sair do limite.",
  es: "Cuando las geocercas se configuran en forma de polígono o círculo en el mapa, las acciones configuradas se activarán cuando el dispositivo ingrese o salga del límite.",
};

const Geofence = ({
  currentPort,
  isReady,
  write,
  polygonGeofenceMax,
  circularGeofenceMax,
  onAfterFetch,
  onAdd,
  onEdit,
}: Props) => {
  const [typeFilter, setTypeFilter] = useState<"All" | "Polygon" | "Circular">(
    "All"
  );
  const [isFullLoading, setIsFullLoading] = useState(true);
  const t = useTranslations();
  const lang = useLangStore((state) => state.lang);
  const mapRef = useRef<google.maps.Map>(null);
  const mapManager = useMapManager();
  const [fetchedPolygonData, setFetchedPolygonData] = useState<PolygonType>();
  const [fetcheCircleData, setFetchedCircleData] = useState<CircleType>();
  const { setPolygonGeofence, setCircularGeofence } = useSerialStore(
    (state) => state
  );

  const isConnectedHardware =
    !!currentPort.port.writable && !!currentPort.port.readable;

  const polygonPointRef = useRef("");
  const circlePointRef = useRef("");

  const { isFetching } = useGefence({
    port: currentPort,
    isReady,
    write,
    polygonGeofenceMax,
    circularGeofenceMax,
    imei: currentPort.imei,
    onAfterFetch,
  });

  const polygonList = currentPort.polygonGeofenceData;
  const circularList = currentPort.circularGeofenceData;

  const polygonData = getPolygonGeofenceData(polygonList);
  const circularData = getCircularGeofenceData(circularList);

  const syncGeofenceConfig = () => {
    const submitButton = document.getElementById("geofence-config-submit");
    if (submitButton) {
      submitButton.click();
    }
  };

  const rows = [
    ...(typeFilter === "Circular" ? [] : polygonData),
    ...(typeFilter === "Polygon" ? [] : circularData),
  ].map(({ type, groupId }, index) => {
    return {
      id: index + 1,
      no: index + 1,
      type: type === "polygon" ? "Polygon" : "Circular",
      groupId,
      edit: {
        id: groupId,
        onEdit: () => {
          if (!isConnectedHardware) return;

          syncGeofenceConfig();

          if (type === "polygon") {
            onEdit(groupId, "polygon");
          } else {
            onEdit(groupId, "circular");
          }
        },
      },
      delete: {
        id: groupId,
        onDelete: () => {
          const imei = currentPort.port.imei;
          if (type === "polygon") {
            const zeroLength = polygonList[groupId - 1].split("#")[1].length;

            currentPort.port.oneditsuccess = () => {
              setPolygonGeofence({
                imei,
                payload: polygonList.map((value, index) =>
                  index === groupId - 1
                    ? `${groupId}#${"0".repeat(zeroLength)}`
                    : value
                ),
              });
            };

            write({
              data: `${AT_EDIT_PREFIX}${imei};53;${String(groupId - 1).padStart(
                2,
                "0"
              )}#${"0".repeat(zeroLength)}`,
              port: currentPort,
              writer: currentPort.writer,
            });
          } else {
            const circleIndex = findCircleIndexByNumber(groupId - 1);

            currentPort.port.iscircularpointfetching = true;
            currentPort.port.circlehandler = (value) => {
              circlePointRef.current += value;
              if (value.includes(CR)) {
                currentPort.port.iscircularpointfetching = false;

                const [id, circleInfo] = circlePointRef.current.split("#");

                const removedCircleInfo =
                  circleInfo.slice(0, 20) + "0000" + circleInfo.slice(24);

                currentPort.port.oneditsuccess = () => {
                  setCircularGeofence({
                    imei,
                    payload: circularList.map((value, index) =>
                      index === groupId - 1 ? `${id}#NoData` : value
                    ),
                  });
                };

                circlePointRef.current = "";

                write({
                  data: `${AT_EDIT_PREFIX}${imei};${circleIndex}#${removedCircleInfo}`,
                  port: currentPort,
                  writer: currentPort.writer,
                });
              }
            };
            currentPort.port.onprev = () => {
              currentPort.port.circlehandler = null;
              currentPort.port.iscircularpointfetching = false;
            };

            write({
              data: `AT^REQ;${imei};${circleIndex}`,
              port: currentPort,
              writer: currentPort.writer,
            });
          }
        },
      },
    };
  });

  const handleRowClick = (data: GridRowParams<any>) => {
    const imei = currentPort.port.imei;

    if (data.row.type === "Polygon") {
      setFetchedCircleData(undefined);
      const polyCount = polygonData.find(
        ({ groupId }) => groupId === data.row.groupId
      ).polygonCount;
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
            setFetchedPolygonData(undefined);
          });

          if (polygonData) {
            setFetchedPolygonData({ paths: polygonData.path });
            if (mapRef.current) {
              mapRef.current.setCenter({
                lat: polygonData.path[0].lat,
                lng: polygonData.path[0].lng,
              });
            }
          }
          polygonPointRef.current = "";
        }
      };
      currentPort.port.onprev = () => {
        currentPort.port.polygonhandler = null;
        currentPort.port.ispolygonpointfetching = false;
      };

      chunkDataByNumberAndWrite(
        {
          write: write as any,
          port: currentPort.port,
          writer: currentPort.writer,
        },

        {
          chuckString: ",",
          prefix: `AT^REQ;${imei};${
            POLYGON_GEOFENCE_POINTS[(data.row.groupId - 1) as number]
          };`,
          target: generateFormattedIndexes(polyCount).join(),
        }
      );
    } else {
      setFetchedPolygonData(undefined);
      const circleIndex = findCircleIndexByNumber(data.row.groupId - 1);
      currentPort.port.ispolygonpointfetching = false;
      currentPort.port.iscircularpointfetching = true;
      currentPort.port.circlehandler = (value) => {
        circlePointRef.current += value;
        if (value.includes(CR)) {
          const circleData = parseLatLngRadius(circlePointRef.current);
          if (mapRef.current) {
            mapRef.current.setCenter({
              lat: circleData.center.lat,
              lng: circleData.center.lng,
            });

            circlePointRef.current = "";
          }
          setFetchedCircleData(circleData);
          currentPort.port.iscircularpointfetching = false;
        }
      };
      currentPort.port.onprev = () => {
        currentPort.port.circlehandler = null;
        currentPort.port.iscircularpointfetching = false;
      };

      write({
        data: `AT^REQ;${imei};${circleIndex}`,
        port: currentPort,
        writer: currentPort.writer,
      });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setIsFullLoading(false);
    }, 15000);
  }, []);

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {isFetching && isFullLoading && <FullLoading />}
      <Stack direction="row" gap={"4px"} alignItems="center">
        <h1 data-section-id={SECTIONS.GeofenceConfig.en}>
          {t("configuration.geofence.geofence")}
        </h1>
        <InputBox.Info
          tooltipText={
            <span style={{ whiteSpace: "pre-wrap" }}>{tooltipText[lang]}</span>
          }
        />
      </Stack>

      <Stack direction="row" gap={"24px"}>
        <Stack gap={"8px"} flex={1}>
          <Stack direction="row" gap="8px" justifyContent="space-between">
            <Select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as any)}
              sx={{ minWidth: 160 }}
            >
              <MenuItem value={"All"}>{t("configuration.driver.all")}</MenuItem>
              <MenuItem value={"Polygon"}>
                {t("configuration.geofence.polygon")}
              </MenuItem>
              <MenuItem value={"Circular"}>
                {t("configuration.geofence.circular")}
              </MenuItem>
            </Select>

            <Button
              variant="contained"
              color="secondary"
              disabled={!isConnectedHardware}
              onClick={() => {
                if (!isConnectedHardware) return;
                syncGeofenceConfig();
                onAdd?.();
              }}
            >
              {t("model.add_model_pop_up.add")}
            </Button>
          </Stack>

          <DataTable
            noDataMessage={t("configuration.geofence.no_registered_geofence")}
            onRowClick={handleRowClick}
            disableRowClick={!isConnectedHardware}
            rows={rows}
            columns={columns}
          />
        </Stack>

        <Stack gap={"24px"} flex={1}>
          <Stack gap="20px" sx={{ width: "100%", height: "500px" }}>
            <Maps
              ref={mapRef}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
              zoom={13}
              drawingModes={[] as google.maps.drawing.OverlayType[]}
              onOverlayComplete={mapManager.completeOverlay}
              polygons={fetchedPolygonData ? [fetchedPolygonData] : undefined}
              circles={fetcheCircleData ? [fetcheCircleData] : undefined}
            />
          </Stack>
        </Stack>
      </Stack>
    </Form>
  );
};

export default Geofence;

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
    font-size: 20px;
    line-height: 100%;
  }
`;
