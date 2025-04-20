"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "@/components/dataTable";
import Maps from "@/components/Map";
import InputBox from "@/components/inputbox/InputBox";
import { useMapManager, PolygonData } from "@/src/hooks/useMapManager";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import {
  CR,
  AT_EDIT_PREFIX,
  POLYGON_GEOFENCE_POINTS,
} from "@/src/hooks/useSerial/constant";
import { getPolygonGeofenceData } from "@/src/hooks/useSerial/utils";
import { convertCoordinatesToHexString } from "@/utils/coordinateToHex";
import { generateFormattedIndexes } from "@/utils/generateFormattedIndexes";
import Controller from "../../../components/Controller";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { parseResponseToPolygonData } from "../../utils";
import FullLoading from "@/components/FullLoading";
import { chunkDataByNumberAndWrite } from "@/src/functions";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { GeoContext } from "../../layout";

export default function Page() {
  const router = useRouter();
  const mapManager = useMapManager();
  const { getCurrentImei } = useSerialConfigurationStore();
  const {
    state: { portList },
    func: { write },
  } = useSerial();
  const { grpId } = useContext(GeoContext);
  const [isFullLoading, setIsFullLoading] = useState(false);
  const polygonPointRef = useRef("");
  const mapRef = useRef<google.maps.Map>(null);
  const currentGrpId = grpId;
  const currentImei = getCurrentImei();
  const currentPort = portList.find(({ port }) => port.imei === currentImei);

  const polygonList = currentPort.polygonGeofenceData;
  const polygonData = getPolygonGeofenceData(polygonList);

  const handleEdit = () => {
    const imei = currentPort.port.imei;

    const pointId = POLYGON_GEOFENCE_POINTS[Number(currentGrpId) - 1];
    const coordinateToHexString = convertCoordinatesToHexString(
      mapManager.polygons[0].path
    );

    currentPort.port.oneditsuccess = async () => {
      await delayPromise(100);
      addPolygonData();
    };

    // 20개 이상이면 쪼개서 보내는 로직
    chunkDataByNumberAndWrite(
      { write, port: currentPort.port, writer: currentPort.writer },
      {
        prefix: `${AT_EDIT_PREFIX}${imei};${pointId};`,
        target: coordinateToHexString,
      }
    );
  };

  const addPolygonData = () => {
    const imei = currentPort.port.imei;
    currentPort.port.oneditsuccess = () => {
      // toast("Save Success", { type: "success" });
      router.push(`/configuration/geofence`);
    };

    const isPolygonSpeedLimitDisabled =
      polygonList[Number(currentGrpId) - 1].split("#")[1].length === 6;

    write({
      data: `${AT_EDIT_PREFIX}${imei};53;${String(
        Number(currentGrpId) - 1
      ).padStart(2, "0")}#${mapManager.polygons[0].path.length
        .toString(16)
        .padStart(2, "0")}0101${isPolygonSpeedLimitDisabled ? "" : "00000000"}`,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  useEffect(() => {
    if (!grpId) {
      router.push(`/configuration/geofence`);
    }
  }, []);

  useEffect(() => {
    setIsFullLoading(true);
    if (!currentPort.port.readable && !currentPort.port.writable) return;

    const polyCount = polygonData.find(
      ({ groupId }) => groupId === Number(currentGrpId)
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
      { write, port: currentPort.port, writer: currentPort.writer },
      {
        chuckString: ",",
        prefix: `AT^REQ;${currentImei};${
          POLYGON_GEOFENCE_POINTS[(Number(currentGrpId) - 1) as number]
        };`,
        target: generateFormattedIndexes(polyCount).join(),
      }
    );
  }, [currentPort.port.readable, currentPort.port.writable]);

  return (
    <div className="pageWrap" style={{ flex: 1 }}>
      {isFullLoading && <FullLoading />}
      <article className="contentWrap">
        <Controller />
        <div className="pageTitle">Edit Polygon Geofence</div>

        <Stack direction="row" gap="40px" mb="40px">
          <Stack gap="20px" sx={{ width: "50%" }}>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Type<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>50/60</InputBox.Number>
              </InputBox.Head>
              <InputBox.Body>
                <Select value={"polygon"} sx={{ width: "100%" }} disabled>
                  <MenuItem value={"circular"}>Circular</MenuItem>
                  <MenuItem value={"polygon"}>Polygon</MenuItem>
                </Select>
              </InputBox.Body>
            </InputBox>

            <PolygonType
              removePolygonPoint={mapManager.removePolygonPoint}
              polygon={
                mapManager.polygons.length > 0
                  ? mapManager.polygons[0]
                  : undefined
              }
              groupId={Number(currentGrpId)}
            />
          </Stack>

          <Stack gap="20px" sx={{ width: "50%", height: "500px" }}>
            <Box flex={1}>
              <Maps
                ref={mapRef}
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
                zoom={13}
                drawingModes={["polygon"] as google.maps.drawing.OverlayType[]}
                onOverlayComplete={mapManager.completeOverlay}
                editableDrawing
                disableDrawing={mapManager.polygons.length > 0}
              />
            </Box>
          </Stack>
        </Stack>
        <Stack
          direction="row"
          gap="8px"
          justifyContent="flex-end"
          marginTop="40px"
        >
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push(`/configuration/geofence`)}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleEdit}
            disabled={(mapManager.polygons[0]?.path.length || 0) < 3}
          >
            Save
          </Button>
        </Stack>
      </article>
    </div>
  );
}

function PolygonType({
  polygon,
  removePolygonPoint,
  groupId,
}: {
  polygon?: PolygonData;
  removePolygonPoint?: (polygon: PolygonData, index: number) => void;
  groupId?: number;
}) {
  const rows = polygon
    ? polygon.path.map(({ lat, lng }, index) => ({
        id: index,
        lat: lat.toFixed(6),
        long: lng.toFixed(6),
        delete: {
          id: index,
          onDelete: () => removePolygonPoint?.(polygon, index),
        },
      }))
    : [];

  return (
    <>
      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Group<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
        </InputBox.Head>
        <InputBox.Body>
          <Select value={groupId} sx={{ width: "100%" }} disabled>
            <MenuItem value={`${groupId}`}>{groupId}</MenuItem>
          </Select>
        </InputBox.Body>
      </InputBox>

      <DataTable
        checkbox={false}
        noDataMessage="No registered geofence"
        disablePagination={false}
        rows={rows}
        columns={columns}
      />
    </>
  );
}

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
