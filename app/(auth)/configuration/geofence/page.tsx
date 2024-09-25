"use client";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import Maps from "../../../../components/Map";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import Controller from "../components/Controller";
import InputBox from "../../../../components/inputbox/InputBox";
import { SwitchPrimary } from "../../../../components/switches";
import { GridColDef, GridRowParams } from "@mui/x-data-grid";
import DataTable from "../../../../components/dataTable";
import { useTransformedConfigData } from "../../../../src/hooks/useTransformConfigData";
import useSerial, { delayPromise } from "../../../../src/hooks/useSerial";
import { useRouter, useSearchParams } from "next/navigation";
import {
  AT_EDIT_PREFIX,
  AT_GET_CIRCULAR_GEOFENCE_255_LIST,
  AT_GET_CIRCULAR_GEOFENCE_999_LIST,
  AT_GET_POLYGON_GEOFENCE_LIST,
  CR,
  POLYGON_GEOFENCE_POINTS,
} from "../../../../src/hooks/useSerial/constant";
import {
  getCircularGeofenceData,
  getPolygonGeofenceData,
} from "../../../../src/hooks/useSerial/utils";
import {
  findCircleIndexByNumber,
  generateFormattedIndexes,
} from "../../../../utils/generateFormattedIndexes";
import { useMapManager } from "../../../../src/hooks/useMapManager";
import { PolygonType, CircleType } from "../../../../components/Map/type";
import useSerialStore from "../../../../src/stores/useSerialStore";
import FullLoading from "../../../../components/FullLoading";
import { parseLatLngRadius, parseResponseToPolygonData } from "./utils";
import { chunkDataByNumberAndWrite } from "@/src/functions";

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
    headerName: "Group",
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
      <IconButton onClick={() => e.value.onEdit()}>
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
      <IconButton onClick={() => e.value.onDelete()}>
        <DeleteForeverOutlinedIcon />
      </IconButton>
    ),
  },
];

const center = {
  lat: 37.564823,
  lng: 126.976951,
};

export default function Page() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [fetchedPolygonData, setFetchedPolygonData] = useState<PolygonType>();
  const [fetcheCircleData, setFetchedCircleData] = useState<CircleType>();
  const [isCircularFetchReady, setIsCircularFetchReady] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [isFullLoading, setIsFullLoading] = useState<boolean>(false);
  const mapRef = useRef<google.maps.Map>(null);
  const polygonPointRef = useRef("");
  const circlePointRef = useRef("");
  const mapManager = useMapManager();
  const { setPolygonGeofence, setCircularGeofence } = useSerialStore();
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const currentPort = portList.find(
    ({ port }) => port.imei === searchParams.get("imei")
  );

  const { formData } = useTransformedConfigData({
    data: portList.find(({ port }) => port.imei === searchParams.get("imei"))
      .packageToJson.synctrak,
    blacklist: ["info"],
  });

  const polygonGeofenceMax = formData.find(({ info }) => info.tab_id === "53")
    ?.info.max;
  const circularGeofenceMax = formData.find(({ info }) => info.tab_id === "50")
    ?.info.max;

  const polygonList = currentPort.polygonGeofenceData;
  const circularList = currentPort.circularGeofenceData;

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  useEffect(() => {
    setIsFullLoading(true);

    if (!currentPort.port.readable || !currentPort.port.writable) return;

    if (!polygonGeofenceMax) {
      return setIsCircularFetchReady(true);
    }

    currentPort.port.polygonfetchcount = 0;
    currentPort.port.ispolygonfetching = true;
    currentPort.port.polygonmax = Number(polygonGeofenceMax);
    currentPort.port.onafterpolygongeofence = () => {
      currentPort.port.ispolygonfetching = false;
      setIsCircularFetchReady(true);
      currentPort.port.polygongeofence = "";
    };

    (async () => {
      for (const command of AT_GET_POLYGON_GEOFENCE_LIST(
        searchParams.get("imei")
      )) {
        await delayPromise(200); // 300ms 지연

        write({
          data: command,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      }
    })();
  }, [currentPort.port.readable, currentPort.port.writable]);

  useEffect(() => {
    if (!circularGeofenceMax || !isCircularFetchReady) return;

    currentPort.port.circularfetchcount = 0;
    currentPort.port.iscircularfetching = true;
    currentPort.port.circlemax = Number(circularGeofenceMax);
    currentPort.port.onaftercirculargeofence = () => {
      currentPort.port.iscircularfetching = false;
      setIsFullLoading(false);
      currentPort.port.circulargeofence = "";
    };

    (async () => {
      for (const command of circularGeofenceMax === "255"
        ? AT_GET_CIRCULAR_GEOFENCE_255_LIST(searchParams.get("imei"))
        : AT_GET_CIRCULAR_GEOFENCE_999_LIST(searchParams.get("imei"))) {
        await delayPromise(10); // 10ms 지연

        write({
          data: command,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      }
    })();
  }, [isCircularFetchReady]);

  const polygonData = getPolygonGeofenceData(polygonList);
  const circularData = getCircularGeofenceData(circularList);

  const rows = [...polygonData, ...circularData].map(
    ({ type, groupId }, index) => {
      return {
        id: index + 1,
        no: index + 1,
        type: type === "polygon" ? "Polygon" : "Circular",
        groupId,
        edit: {
          id: groupId,
          onEdit: () => {
            const imei = currentPort.port.imei;
            if (type === "polygon") {
              router.push(
                `/configuration/geofence/edit/polygon?imei=${imei}&grpId=${groupId}`
              );
            } else {
              router.push(
                `/configuration/geofence/edit/circular?imei=${imei}&grpId=${groupId}`
              );
            }
          },
        },
        delete: {
          id: groupId,
          onDelete: () => {
            const imei = currentPort.port.imei;
            if (type === "polygon") {
              currentPort.port.oneditsuccess = () => {
                setPolygonGeofence({
                  imei,
                  payload: polygonList.map((value, index) =>
                    index === groupId - 1 ? `${groupId}#00000000000000` : value
                  ),
                });
              };

              write({
                data: `${AT_EDIT_PREFIX}${imei};53;${String(
                  groupId - 1
                ).padStart(2, "0")}#00000000000000`,
                port: currentPort.port,
                writer: currentPort.writer,
              });
            } else {
              const circleIndex = findCircleIndexByNumber(groupId - 1);
              const [id, circleInfo] = circularList[groupId - 1].split("#");
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

              write({
                data: `${AT_EDIT_PREFIX}${imei};${circleIndex}#${removedCircleInfo}`,
                port: currentPort.port,
                writer: currentPort.writer,
              });
            }
          },
        },
      };
    }
  );

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
          const polygonData = parseResponseToPolygonData(
            polygonPointRef.current.replaceAll("\r", ""),
            () => {
              polygonPointRef.current = "";
              setFetchedPolygonData(undefined);
            }
          );
          if (polygonData) {
            setFetchedPolygonData({ paths: polygonData.path });
            if (mapRef.current) {
              mapRef.current.setCenter({
                lat: polygonData.path[0].lat,
                lng: polygonData.path[0].lng,
              });
            }
            polygonPointRef.current = "";
          }
        }
      };
      currentPort.port.onprev = () => {
        currentPort.port.polygonhandler = null;
        currentPort.port.ispolygonpointfetching = false;
      };
      // TODO 20개씩 쪼개 보내기
      // write({
      //   data: `AT^REQ;${imei};${
      //     POLYGON_GEOFENCE_POINTS[(data.row.groupId - 1) as number]
      //   };${generateFormattedIndexes(polyCount).join()}`,
      //   port: currentPort.port,
      //   writer: currentPort.writer,
      // });
      // 20개 이상이면 쪼개서 보내는 로직
      chunkDataByNumberAndWrite(
        { write, port: currentPort.port, writer: currentPort.writer },
        {
          prefix: `AT^REQ;${imei};${
            POLYGON_GEOFENCE_POINTS[(data.row.groupId - 1) as number]
          };`,
          target: generateFormattedIndexes(polyCount).join(),
        }
      );
    } else {
      setFetchedPolygonData(undefined);
      const circleIndex = findCircleIndexByNumber(data.row.groupId - 1);
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
        port: currentPort.port,
        writer: currentPort.writer,
      });
    }
  };

  return (
    <div className="pageWrap">
      {isFullLoading && <FullLoading />}
      <article className="contentWrap">
        <Controller />

        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-start"
          sx={{ width: "calc(50% - 20px)" }}
        >
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                <div className="pageTitle" style={{ marginBottom: 0 }}>
                  Geofence
                </div>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
              <InputBox.Number>1700</InputBox.Number>
              {/* <span className="notification"/> */}
            </InputBox.Head>
          </InputBox>
          <SwitchPrimary />
        </Stack>
        <Stack direction="row" gap="40px" mb="40px">
          <Stack
            gap="20px"
            sx={{ width: "50%", height: "500px", overflowY: "scroll" }}
          >
            <Stack
              direction="row"
              gap="8px"
              justifyContent="space-between"
              mb="16px"
            >
              <Select
                value={roleFilter}
                onChange={(e) => handleSelectChange(e, setRoleFilter)}
                sx={{ minWidth: 160 }}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Customer"}>Customer</MenuItem>
                <MenuItem value={"Guest"}>Guest</MenuItem>
              </Select>

              <Button
                variant="contained"
                color="secondary"
                href={`/configuration/geofence/add?imei=${currentPort.port.imei}`}
              >
                Add
              </Button>
            </Stack>
            <DataTable
              noDataMessage="No registered geofence"
              disablePagination={false}
              onRowClick={handleRowClick}
              disableRowClick={false}
              rows={rows}
              columns={columns}
              footerButton={
                <Button variant="text" color="info">
                  Delete
                </Button>
              }
            />
          </Stack>

          <Stack gap="20px" sx={{ width: "50%", height: "500px" }}>
            <Box flex={1}>
              <Maps
                ref={mapRef}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
                zoom={13}
                center={center}
                drawingModes={
                  ["circle", "polygon"] as google.maps.drawing.OverlayType[]
                }
                onOverlayComplete={mapManager.completeOverlay}
                polygons={fetchedPolygonData ? [fetchedPolygonData] : undefined}
                circles={fetcheCircleData ? [fetcheCircleData] : undefined}
              />
            </Box>
          </Stack>
        </Stack>
      </article>
    </div>
  );
}
