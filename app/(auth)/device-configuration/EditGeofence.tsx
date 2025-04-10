"use client";

import { useState, useEffect, useRef } from "react";
import { Stack, Button, Select, MenuItem, Box } from "@mui/material";
import Maps from "@/components/Map";
import InputBox from "@/components/inputbox/InputBox";
import { useMapManager } from "@/src/hooks/useMapManager";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import {
  getCircularGeofenceData,
  getPolygonGeofenceData,
} from "@/src/hooks/useSerial/utils";
import CircularType from "./components/CircularType";
import PolygonType from "./components/PolygonType";
import { toast } from "react-toastify";
import {
  AT_EDIT_PREFIX,
  AT_REQ,
  CR,
  POLYGON_GEOFENCE_POINTS,
} from "@/src/hooks/useSerial/constant";
import { chunkDataByNumberAndWrite } from "@/src/functions";
import {
  convertCoordinatesToHexString,
  convertCircleCoordinatesToHexString,
} from "@/utils/coordinateToHex";
import {
  findCircleIndexByNumber,
  generateFormattedIndexes,
} from "@/utils/generateFormattedIndexes";
import FullLoading from "@/components/FullLoading";
import {
  parseLatLngRadius,
  parseResponseToPolygonData,
} from "../configuration/geofence/utils";

interface EditGeofenceProps {
  imei: string;
  groupId: number;
  type: "circular" | "polygon";
  onBack: () => void;
}

const center = {
  lat: 37.564823,
  lng: 126.976951,
};

const EditGeofence = ({ imei, groupId, type, onBack }: EditGeofenceProps) => {
  const [isFullLoading, setIsFullLoading] = useState(true);
  const [enterAlert, setEnterAlert] = useState(false);
  const [exitAlert, setExitAlert] = useState(false);
  const isCircleOutputActiveBuffer = useRef<string>();
  const polygonPointRef = useRef("");
  const circlePointRef = useRef("");
  const mapRef = useRef<google.maps.Map>(null);
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

  const handleAlertStateChange = (enterAlert: boolean, exitAlert: boolean) => {
    setEnterAlert(enterAlert);
    setExitAlert(exitAlert);
  };

  // 저장 버튼 클릭 핸들러
  const handleSave = () => {
    if (
      type === "polygon" &&
      (!mapManager.polygons.length || mapManager.polygons[0].path.length < 3)
    ) {
      toast.error("Please draw a polygon with at least 3 points");
      return;
    }

    if (type === "circular" && !mapManager.circles.length) {
      toast.error("Please draw a circle on the map");
      return;
    }

    const imei = currentPort.port.imei;

    if (type === "polygon") {
      const pointId = POLYGON_GEOFENCE_POINTS[groupId - 1];
      const coordinateToHexString = convertCoordinatesToHexString(
        mapManager.polygons[0].path
      );

      currentPort.port.oneditsuccess = async () => {
        await delayPromise(100);
        updatePolygonData();
      };

      chunkDataByNumberAndWrite(
        { write, port: currentPort.port, writer: currentPort.writer },
        {
          prefix: `${AT_EDIT_PREFIX}${imei};${pointId};`,
          target: coordinateToHexString,
        }
      );
    } else {
      const circleOutputActiveFetchPromise = new Promise<boolean>((resolve) => {
        currentPort.port.iscircleoutputactivefetching = true;
        currentPort.port.circleoutputactivehandler = (value) => {
          isCircleOutputActiveBuffer.current += value;
          if (value.includes(CR)) {
            currentPort.port.iscircleoutputactivefetching = false;
            const isEnable =
              isCircleOutputActiveBuffer.current.split("#")[1] === "01" &&
              !isCircleOutputActiveBuffer.current.includes("USP");
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
          // Set flag for data refetch when returning to list
          currentPort.port.needsGeofenceRefetch = true;
          onBack();
        };

        // Convert alert states to hex string
        const alertHexString = `${enterAlert ? "01" : "00"}${
          exitAlert ? "01" : "00"
        }`;

        write({
          data: `${AT_EDIT_PREFIX}${imei};${circleIndex}#${coordinateToHexString}${
            isOutputActive ? `${alertHexString}0000000000` : alertHexString
          }`,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      });
    }
  };

  const updatePolygonData = () => {
    const imei = currentPort.port.imei;
    currentPort.port.oneditsuccess = () => {
      // Set flag for data refetch when returning to list
      currentPort.port.needsGeofenceRefetch = true;
      onBack();
    };

    const isPolygonSpeedLimitDisabled =
      polygonList[groupId - 1].split("#")[1].length === 6;

    // Convert alert states to hex string
    const alertHexString = `${enterAlert ? "01" : "00"}${
      exitAlert ? "01" : "00"
    }`;

    write({
      data: `${AT_EDIT_PREFIX}${imei};53;${String(groupId - 1).padStart(
        2,
        "0"
      )}#${mapManager.polygons[0].path.length
        .toString(16)
        .padStart(2, "0")}${alertHexString}${
        isPolygonSpeedLimitDisabled ? "" : "00000000"
      }`,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  // Geofence 데이터 로드
  useEffect(() => {
    if (!currentPort.port.readable || !currentPort.port.writable) {
      setIsFullLoading(true);
      return;
    }

    // 폴리곤 데이터 로드
    if (type === "polygon") {
      const polyCount = polygonData.find(
        ({ groupId: id }) => id === groupId
      )?.polygonCount;

      if (!polyCount) {
        toast.error("Cannot find polygon data");
        onBack();
        return;
      }

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
            // 맵에 폴리곤 그리기
            const newPolygon = new google.maps.Polygon({
              paths: polygonData.path,
              map: mapRef.current,
              editable: true,
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

            // alert 상태 파싱
            const alertData = polygonList[groupId - 1].split("#")[1];
            if (alertData.length >= 4) {
              setEnterAlert(alertData.slice(0, 2) === "01");
              setExitAlert(alertData.slice(2, 4) === "01");
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

      // 폴리곤 데이터 요청
      chunkDataByNumberAndWrite(
        { write, port: currentPort.port, writer: currentPort.writer },
        {
          chuckString: ",",
          prefix: `AT^REQ;${imei};${POLYGON_GEOFENCE_POINTS[groupId - 1]};`,
          target: generateFormattedIndexes(polyCount).join(),
        }
      );
    }
    // 원형 데이터 로드
    else {
      const circleIndex = findCircleIndexByNumber(groupId - 1);
      currentPort.port.iscircularpointfetching = true;
      currentPort.port.circlehandler = (value) => {
        if (value.includes(CR)) {
          const circleData = parseLatLngRadius(value);

          // 맵에 원 그리기
          const newCircle = new google.maps.Circle({
            center: circleData.center,
            radius: circleData.radius,
            map: mapRef.current,
            editable: true,
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

          // alert 상태 파싱
          const alertData = circularList[groupId - 1].split("#")[1];

          console.log(
            alertData,
            alertData.slice(20, 22) === "01",
            alertData.slice(22, 24) === "01"
          );
          if (alertData.length >= 24) {
            setEnterAlert(alertData.slice(20, 22) === "01");
            setExitAlert(alertData.slice(22, 24) === "01");
          }

          setIsFullLoading(false);
          currentPort.port.iscircularpointfetching = false;
        }
      };
      currentPort.port.onprev = () => {
        currentPort.port.circlehandler = null;
        currentPort.port.iscircularpointfetching = false;
      };

      // 원형 데이터 요청
      write({
        data: `AT^REQ;${imei};${circleIndex}`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    }
  }, [currentPort.port.readable, currentPort.port.writable]);

  return (
    <Stack gap="40px">
      {isFullLoading && <FullLoading />}
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <h3>
          Edit {type === "circular" ? "Circular" : "Polygon"} Geofence (Group
          ID: {groupId})
        </h3>
        <Button variant="outlined" onClick={onBack}>
          Back to List
        </Button>
      </Stack>

      <Stack direction="row" gap="40px" mb="40px">
        <Stack gap="20px" sx={{ width: "50%" }}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>
                Type<i>*</i>
              </InputBox.Title>
              <InputBox.Info tooltipText="tooptip example" />
            </InputBox.Head>
            <InputBox.Body>
              <Select value={type} sx={{ width: "100%" }} disabled>
                <MenuItem value={"circular"}>Circular</MenuItem>
                <MenuItem value={"polygon"}>Polygon</MenuItem>
              </Select>
            </InputBox.Body>
          </InputBox>

          {type === "circular" ? (
            <CircularType
              max={circularGeofenceMax ? Number(circularGeofenceMax) : 0}
              excludeGroupId={circularData
                .filter((item) => item.groupId !== groupId)
                .map(({ groupId }) => groupId)}
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
                  ? Number(mapManager.circles[0].radius.toFixed(6))
                  : undefined
              }
              groupId={groupId}
              onChangeGroupId={() => {}}
              onAlertStateChange={handleAlertStateChange}
              initialEnterAlert={enterAlert}
              initialExitAlert={exitAlert}
            />
          ) : (
            <PolygonType
              max={polygonGeofenceMax ? Number(polygonGeofenceMax) : 0}
              removePolygonPoint={mapManager.removePolygonPoint}
              excludeGroupId={polygonData
                .filter((item) => item.groupId !== groupId)
                .map(({ groupId }) => groupId)}
              polygon={
                mapManager.polygons.length > 0
                  ? mapManager.polygons[0]
                  : undefined
              }
              groupId={groupId}
              onChangeGroupId={() => {}}
              onAlertStateChange={handleAlertStateChange}
              initialEnterAlert={enterAlert}
              initialExitAlert={exitAlert}
            />
          )}
        </Stack>

        <Stack gap="20px" sx={{ width: "50%", height: "500px" }}>
          <Box flex={1}>
            <Maps
              ref={mapRef}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
              zoom={13}
              center={center}
              drawingModes={
                [
                  type === "circular" ? "circle" : "polygon",
                ] as google.maps.drawing.OverlayType[]
              }
              onOverlayComplete={(event) => {
                // 기존 도형 제거
                if (mapManager.polygons.length > 0) {
                  mapManager.removePolygon(mapManager.polygons[0].id);
                }
                if (mapManager.circles.length > 0) {
                  mapManager.removeCircle(mapManager.circles[0].id);
                }
                mapManager.completeOverlay(event);
              }}
              editableDrawing
              disableDrawing={
                (type === "circular" && mapManager.circles.length > 0) ||
                (type === "polygon" && mapManager.polygons.length > 0)
              }
            />
          </Box>
        </Stack>
      </Stack>

      <Stack direction="row" gap="8px" justifyContent="flex-end">
        <Button variant="outlined" color="secondary" onClick={onBack}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSave}
          disabled={
            (type === "circular" && !mapManager.circles.length) ||
            (type === "polygon" &&
              (!mapManager.polygons.length ||
                mapManager.polygons[0].path.length < 3))
          }
        >
          Save
        </Button>
      </Stack>
    </Stack>
  );
};

export default EditGeofence;
