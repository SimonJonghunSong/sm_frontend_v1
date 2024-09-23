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
import { useSearchParams } from "next/navigation";
import {
  AT_EDIT_PREFIX,
  AT_GET_CIRCULAR_GEOFENCE_255_LIST,
  AT_GET_CIRCULAR_GEOFENCE_999_LIST,
  AT_GET_POLYGON_GEOFENCE_LIST,
  CR,
  POLYGON_GEOFENCE_POINTS,
} from "../../../../src/hooks/useSerial/constant";
import { toast } from "react-toastify";
import {
  getCircularGeofenceData,
  getPolygonGeofenceData,
} from "../../../../src/hooks/useSerial/utils";
import {
  findCircleIndexByNumber,
  generateFormattedIndexes,
} from "../../../../utils/generateFormattedIndexes";
import {
  PolygonData,
  useMapManager,
} from "../../../../src/hooks/useMapManager";
import { PolygonType, CircleType } from "../../../../components/Map/type";
import useSerialStore from "../../../../src/stores/useSerialStore";
import FullLoading from "../../../../components/FullLoading";

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
    renderCell: () => (
      <IconButton onClick={(e) => e.stopPropagation()}>
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

const parseResponseToPolygonData = (
  response: string,
  onError?: () => void
): PolygonData => {
  // PRE로 시작하는 부분은 제거하고, 좌표 부분만 추출
  const coordinatesPart = response.split(";").slice(3); // 63, RRE 등을 제거한 좌표 부분만 가져옴

  // path 데이터를 생성
  const path = coordinatesPart.map((item, index) => {
    const [id, latLngHex] = item.split("#");

    if (!latLngHex || latLngHex.length !== 16) {
      onError?.();
    }

    // latHex: 앞의 8자리, lngHex: 뒤의 8자리
    const latHex = latLngHex.slice(0, 8);
    const lngHex = latLngHex.slice(8, 16);

    // 16진수를 10진수로 변환한 후 1000000으로 나누어 좌표로 변환
    const lat = parseInt(latHex, 16) / 1000000;
    const lng = parseInt(lngHex, 16) / 1000000;

    // LatLng 객체 반환
    return { lat, lng };
  });

  // PolygonData 객체 반환
  return {
    id: 0, // index는 고정 0으로 설정 (필요에 따라 다른 로직 추가 가능)
    path,
  };
};

const parseLatLngRadius = (hexString: string): CircleType => {
  // 문자열에서 16진수 값만 추출
  const hexValue = hexString.split("#")[1];

  // 첫 8자리 (lat)와 그 다음 8자리 (lng)를 10진수로 변환 후 1000000으로 나눔
  const latHex = hexValue.slice(0, 8);
  const lngHex = hexValue.slice(8, 16);
  const lat = parseInt(latHex, 16) / 1000000;
  const lng = parseInt(lngHex, 16) / 1000000;

  // 그 다음 4자리를 반경 (radius)로 변환
  const radiusHex = hexValue.slice(16, 20);
  const radius = parseInt(radiusHex, 16);

  // 결과 반환
  return {
    center: {
      lat,
      lng,
    },
    radius,
  };
};

const center = {
  lat: 37.564823,
  lng: 126.976951,
};

export default function Page() {
  const searchParams = useSearchParams();
  const [fetchedPolygonData, setFetchedPolygonData] = useState<PolygonType>();
  const [fetcheCircleData, setFetchedCircleData] = useState<CircleType>();
  const [isCircularFetchReady, setIsCircularFetchReady] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [isFullLoading, setIsFullLoading] = useState<boolean>(false);
  const mapRef = useRef<google.maps.Map>(null);
  const polygonPointRef = useRef("");
  const mapManager = useMapManager();
  const { setPolygonGeofence, setCircularGeofence } = useSerialStore();
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const currentPort = portList.find(
    ({ port }) => port.imei === searchParams.get("imei")
  );

  const { originData, formData, getFormFields, resetData, getEditDataForPage } =
    useTransformedConfigData({
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
    if (!currentPort.port.readable || !currentPort.port.writable) return;

    setIsFullLoading(true);
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
        edit: { id: groupId },
        delete: {
          id: groupId,
          onDelete: () => {
            const imei = currentPort.port.imei;
            if (type === "polygon") {
              write({
                data: `${AT_EDIT_PREFIX}${imei};53;${String(
                  groupId - 1
                ).padStart(2, "0")}#00000000000000`,
                port: currentPort.port,
                writer: currentPort.writer,
              });
              setPolygonGeofence({
                imei,
                payload: polygonList.map((value, index) =>
                  index === groupId - 1 ? `${groupId}#00000000000000` : value
                ),
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
      // TODO 20개씩 쪼개 보내기
      write({
        data: `AT^REQ;${imei};${
          POLYGON_GEOFENCE_POINTS[(data.row.groupId - 1) as number]
        };${generateFormattedIndexes(polyCount).join()}`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    } else {
      setFetchedPolygonData(undefined);
      const circleIndex = findCircleIndexByNumber(data.row.groupId - 1);
      currentPort.port.iscircularpointfetching = true;
      currentPort.port.circlehandler = (value) => {
        if (value.includes(CR)) {
          const circleData = parseLatLngRadius(value);
          if (mapRef.current) {
            mapRef.current.setCenter({
              lat: circleData.center.lat,
              lng: circleData.center.lng,
            });
          }
          setFetchedCircleData(circleData);
          currentPort.port.iscircularpointfetching = false;
        }
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
              disablePagination
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
