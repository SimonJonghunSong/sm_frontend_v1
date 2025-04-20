"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import Maps from "@/components/Map";
import Controller from "../../components/Controller";
import InputBox from "@/components/inputbox/InputBox";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "@/components/dataTable";
import { PolygonData, useMapManager } from "@/src/hooks/useMapManager";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import { useSearchParams } from "next/navigation";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import {
  getPolygonGeofenceData,
  getCircularGeofenceData,
} from "@/src/hooks/useSerial/utils";
import {
  AT_EDIT_PREFIX,
  AT_REQ,
  CR,
  POLYGON_GEOFENCE_POINTS,
} from "@/src/hooks/useSerial/constant";
import {
  convertCircleCoordinatesToHexString,
  convertCoordinatesToHexString,
} from "@/utils/coordinateToHex";
import { findCircleIndexByNumber } from "@/utils/generateFormattedIndexes";
import { chunkDataByNumberAndWrite } from "@/src/functions";
import FullLoading from "@/components/FullLoading";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";

export default function Page() {
  const router = useRouter();
  const { getCurrentImei } = useSerialConfigurationStore();
  const imei = getCurrentImei();
  const [type, setType] = useState("circular");
  const [groupId, setGroupId] = useState<number>(undefined);
  const [isFullLoading, setIsFullLoading] = useState<boolean>(false);
  const isCircleOutputActiveBuffer = useRef<string>();
  const mapManager = useMapManager();
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const currentPort = portList.find(({ port }) => port.imei === imei);

  const polygonList = currentPort.polygonGeofenceData;
  const circularList = currentPort.circularGeofenceData;

  const polygonData = getPolygonGeofenceData(polygonList);
  const circularData = getCircularGeofenceData(circularList);

  const { formData } = useTransformedConfigData({
    data: portList.find(({ port }) => port.imei === imei).packageToJson
      .synctrak,
    blacklist: ["info"],
  });

  const polygonGeofenceMax = formData.find(({ info }) => info.tab_id === "53")
    ?.info.max;
  const circularGeofenceMax = formData.find(({ info }) => info.tab_id === "50")
    ?.info.max;

  const handleTypeChange = (e: SelectChangeEvent<string>) => {
    const paramsType = e.target.value;
    if (paramsType === "circular") {
      const polygonId = mapManager.polygons[0]?.id;

      if (mapManager.polygons.length > 0) {
        mapManager.removePolygon(polygonId);
      }
    } else {
      const circleId = mapManager.circles[0]?.id;

      if (mapManager.circles.length > 0) {
        mapManager.removeCircle(circleId);
      }
    }

    setType(paramsType);
  };

  const handleAdd = () => {
    const imei = currentPort.port.imei;

    if (type === "polygon") {
      const pointId = POLYGON_GEOFENCE_POINTS[groupId - 1];
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
    } else {
      const circleOutputActiveFetchPromise = new Promise<boolean>((resolve) => {
        // 9001: Circular Output Active
        // Determines whether to use the output active & delay item of the circular item. (Supported by LATAM or Brazil only)
        currentPort.port.iscircleoutputactivefetching = true;
        currentPort.port.circleoutputactivehandler = (value) => {
          isCircleOutputActiveBuffer.current += value;
          if (value.includes(CR)) {
            currentPort.port.iscircleoutputactivefetching = false;
            const isEnable =
              isCircleOutputActiveBuffer.current.split("#")[1] === "01" &&
              !isCircleOutputActiveBuffer.current.includes("USP"); //* USP = Unsupported Parameters
            isCircleOutputActiveBuffer.current = undefined;
            resolve(isEnable);
          }
        };
        write({
          data: `${AT_REQ}${imei};90;01`,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      });

      circleOutputActiveFetchPromise.then((isOutputActive) => {
        const circleIndex = findCircleIndexByNumber(groupId - 1);
        const circle = mapManager.circles[0];
        const coordinateToHexString = convertCircleCoordinatesToHexString({
          lat: circle.center.lat,
          lng: circle.center.lng,
          radius: circle.radius,
        });

        currentPort.port.oneditsuccess = () => {
          // toast("Save Success", { type: "success" });
          router.push(`/configuration/geofence`);
        };

        write({
          data: `${AT_EDIT_PREFIX}${imei};${circleIndex}#${coordinateToHexString}${
            isOutputActive ? "01010000000000" : "0101"
          }`,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      });
    }
  };

  const addPolygonData = () => {
    const imei = currentPort.port.imei;
    currentPort.port.oneditsuccess = () => {
      // toast("Save Success", { type: "success" });
      router.push(`/configuration/geofence`);
    };

    const isPolygonSpeedLimitDisabled =
      polygonList[groupId - 1].split("#")[1].length === 6;

    write({
      data: `${AT_EDIT_PREFIX}${imei};53;${String(groupId - 1).padStart(
        2,
        "0"
      )}#${mapManager.polygons[0].path.length
        .toString(16)
        .padStart(2, "0")}0101${isPolygonSpeedLimitDisabled ? "" : "00000000"}`,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  useEffect(() => {
    if (!currentPort.port.writable || !currentPort.port.readable) {
      setIsFullLoading(true);
    } else {
      setIsFullLoading(false);
    }
  }, [
    currentPort.port.writable,
    currentPort.port.readable,
    currentPort.port.ismodelinfofetching,
  ]);

  return (
    <div className="pageWrap" style={{ flex: 1 }}>
      {isFullLoading && <FullLoading />}
      <article className="contentWrap">
        <Controller />
        <div className="pageTitle">Add New</div>

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
                <Select
                  value={type}
                  sx={{ width: "100%" }}
                  onChange={handleTypeChange}
                >
                  <MenuItem value={"circular"}>Circular</MenuItem>
                  <MenuItem value={"polygon"}>Polygon</MenuItem>
                </Select>
              </InputBox.Body>
            </InputBox>
            {type === "circular" ? (
              <CircularType
                max={circularGeofenceMax ? Number(circularGeofenceMax) : 0}
                excludeGroupId={circularData.map(({ groupId }) => groupId)}
                id={
                  mapManager.circles.length > 0
                    ? mapManager.circles[0].id
                    : undefined
                }
                updateCircleRadius={mapManager.updateCircleRadius}
                updateCircleCenter={mapManager.updateCircleCenter}
                lat={
                  mapManager.circles.length > 0
                    ? Number(mapManager.circles[0].center.lat.toFixed(6))
                    : undefined
                }
                long={
                  mapManager.circles.length > 0
                    ? Number(mapManager.circles[0].center.lng.toFixed(6))
                    : undefined
                }
                radius={
                  mapManager.circles.length > 0
                    ? Number(mapManager.circles[0].radius.toFixed(0))
                    : undefined
                }
                groupId={groupId}
                onChangeGroupId={(id: number) => setGroupId(id)}
              />
            ) : (
              <PolygonType
                max={polygonGeofenceMax ? Number(polygonGeofenceMax) : 0}
                removePolygonPoint={mapManager.removePolygonPoint}
                excludeGroupId={polygonData.map(({ groupId }) => groupId)}
                polygon={
                  mapManager.polygons.length > 0
                    ? mapManager.polygons[0]
                    : undefined
                }
                groupId={groupId}
                onChangeGroupId={(id: number) => setGroupId(id)}
              />
            )}
          </Stack>

          <Stack gap="20px" sx={{ width: "50%", height: "500px" }}>
            <Box flex={1}>
              <Maps
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
                zoom={13}
                drawingModes={
                  (type === "circular"
                    ? ["circle"]
                    : ["polygon"]) as google.maps.drawing.OverlayType[]
                }
                onOverlayComplete={mapManager.completeOverlay}
                editableDrawing
                disableDrawing={
                  type === "circular"
                    ? mapManager.circles.length > 0
                    : mapManager.polygons.length > 0
                }
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
            onClick={handleAdd}
            disabled={
              type === "polygon"
                ? (mapManager.polygons[0]?.path.length || 0) < 3
                : mapManager.circles.length === 0
            }
          >
            Add
          </Button>
        </Stack>
      </article>
    </div>
  );
}

function CircularType({
  id,
  lat,
  long,
  radius,
  updateCircleCenter,
  updateCircleRadius,
  max,
  excludeGroupId = [],
  groupId,
  onChangeGroupId,
}: {
  id?: number;
  lat?: number;
  long?: number;
  radius?: number;
  max: number;
  excludeGroupId?: number[];
  updateCircleCenter?: (
    circleId: number,
    newLat: number,
    newLng: number
  ) => void;
  updateCircleRadius?: (circleId: number, newRadius: number) => void;
  groupId?: number;
  onChangeGroupId: (id: number) => void;
}) {
  const allOptions = Array.from({ length: max }, (_, i) => i + 1);

  const filteredOptions = allOptions.filter(
    (number) => !excludeGroupId.includes(number)
  );

  useEffect(() => {
    onChangeGroupId(filteredOptions[0]);
  }, []);

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
          <Select
            value={groupId || filteredOptions[0]}
            onChange={(e) => onChangeGroupId(Number(e.target.value))}
            sx={{ width: "100%" }}
          >
            {filteredOptions.map((grpId) => {
              return (
                <MenuItem key={grpId} value={`${grpId}`}>
                  {grpId}
                </MenuItem>
              );
            })}
          </Select>
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Latitude<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
        </InputBox.Head>
        <InputBox.Body>
          <TextField
            fullWidth
            value={lat}
            disabled={id === undefined}
            onChange={(e) =>
              updateCircleCenter(id, Number(e.target.value), long)
            }
          />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Longitude<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
        </InputBox.Head>
        <InputBox.Body>
          <TextField
            fullWidth
            value={long}
            disabled={id === undefined}
            onChange={(e) =>
              updateCircleCenter(id, lat, Number(e.target.value))
            }
          />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Radius<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
        </InputBox.Head>
        <InputBox.Body>
          <TextField
            fullWidth
            value={radius}
            disabled={id === undefined}
            onChange={(e) => updateCircleRadius(id, Number(e.target.value))}
          />
        </InputBox.Body>
      </InputBox>
    </>
  );
}

function PolygonType({
  polygon,
  removePolygonPoint,
  max,
  excludeGroupId = [],
  groupId,
  onChangeGroupId,
}: {
  polygon?: PolygonData;
  removePolygonPoint?: (polygon: PolygonData, index: number) => void;
  max: number;
  excludeGroupId?: number[];
  groupId?: number;
  onChangeGroupId: (id: number) => void;
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

  const allOptions = Array.from({ length: max }, (_, i) => i + 1);

  const filteredOptions = allOptions.filter(
    (number) => !excludeGroupId.includes(number)
  );

  useEffect(() => {
    onChangeGroupId(filteredOptions[0]);
  }, []);

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
          <Select
            value={groupId}
            onChange={(e) => onChangeGroupId(Number(e.target.value))}
            sx={{ width: "100%" }}
          >
            {filteredOptions.map((grpId) => {
              return (
                <MenuItem key={grpId} value={`${grpId}`}>
                  {grpId}
                </MenuItem>
              );
            })}
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
