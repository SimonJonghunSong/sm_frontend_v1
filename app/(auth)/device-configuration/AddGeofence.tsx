"use client";

import { useState, useEffect, useRef } from "react";
import {
  Stack,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
} from "@mui/material";
import Maps from "@/components/Map";
import InputBox from "@/components/inputbox/InputBox";
import { useMapManager } from "@/src/hooks/useMapManager";
import useSerial from "@/src/hooks/useSerial";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import {
  getCircularGeofenceData,
  getPolygonGeofenceData,
} from "@/src/hooks/useSerial/utils";
import CircularType from "./components/CircularType";
import PolygonType from "./components/PolygonType";
import { toast } from "react-toastify";
import { delayPromise } from "@/src/hooks/useSerial";
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
import { findCircleIndexByNumber } from "@/utils/generateFormattedIndexes";
import type { PolygonData } from "@/src/hooks/useMapManager";
import DataTable from "@/components/dataTable";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

interface AddGeofenceProps {
  imei: string;
  onBack: () => void;
}

const center = {
  lat: 37.564823,
  lng: 126.976951,
};

const AddGeofence = ({ imei, onBack }: AddGeofenceProps) => {
  const [type, setType] = useState<"circular" | "polygon">("circular");
  const [groupId, setGroupId] = useState<number>();
  const [isFullLoading, setIsFullLoading] = useState(false);
  const [enterAlert, setEnterAlert] = useState(false);
  const [exitAlert, setExitAlert] = useState(false);
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
    if (paramsType !== type) {
      if (mapManager.circles.length > 0) {
        mapManager.removeCircle(mapManager.circles[0].id);
      }
      setType(paramsType as "circular" | "polygon");
      // 그룹 ID 초기화
      setGroupId(undefined);
    }
  };

  // 지도에 도형이 그려질 때마다 기존 도형을 제거하는 함수
  const handleOverlayComplete = (
    overlay: google.maps.drawing.OverlayCompleteEvent
  ) => {
    // 모든 기존 도형 제거
    if (mapManager.polygons.length > 0) {
      mapManager.removePolygon(mapManager.polygons[0].id);
    }
    if (mapManager.circles.length > 0) {
      mapManager.removeCircle(mapManager.circles[0].id);
    }

    // mapManager의 completeOverlay 함수 호출
    mapManager.completeOverlay(overlay);
  };

  const handleAlertStateChange = (enterAlert: boolean, exitAlert: boolean) => {
    setEnterAlert(enterAlert);
    setExitAlert(exitAlert);
  };

  const handleAdd = () => {
    if (!groupId) {
      toast.error("Please select a Group ID");
      return;
    }

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
        addPolygonData();
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
          // 지오펜스 추가 후 리스트로 돌아갈 때 데이터 리페칭을 위한 플래그 설정
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

  const addPolygonData = () => {
    const imei = currentPort.port.imei;
    currentPort.port.oneditsuccess = () => {
      // 지오펜스 추가 후 리스트로 돌아갈 때 데이터 리페칭을 위한 플래그 설정
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

  // 지도에 원이 그려졌을 때 그룹 ID가 선택되어 있지 않으면 자동으로 첫 번째 사용 가능한 ID 선택
  useEffect(() => {
    if (type === "circular" && mapManager.circles.length > 0 && !groupId) {
      const availableIds = Array.from(
        { length: Number(circularGeofenceMax) || 0 },
        (_, i) => i + 1
      ).filter(
        (id) => !circularData.map(({ groupId }) => groupId).includes(id)
      );

      if (availableIds.length > 0) {
        setGroupId(availableIds[0]);
      }
    }
  }, [
    mapManager.circles.length,
    type,
    groupId,
    circularGeofenceMax,
    circularData,
  ]);

  // 지도에 폴리곤이 그려졌을 때 그룹 ID가 선택되어 있지 않으면 자동으로 첫 번째 사용 가능한 ID 선택
  useEffect(() => {
    if (type === "polygon" && mapManager.polygons.length > 0 && !groupId) {
      const availableIds = Array.from(
        { length: Number(polygonGeofenceMax) || 0 },
        (_, i) => i + 1
      ).filter((id) => !polygonData.map(({ groupId }) => groupId).includes(id));

      if (availableIds.length > 0) {
        setGroupId(availableIds[0]);
      }
    }
  }, [
    mapManager.polygons.length,
    type,
    groupId,
    polygonGeofenceMax,
    polygonData,
  ]);

  return (
    <Stack direction="column" gap="20px">
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
                  ? Number(mapManager.circles[0].radius.toFixed(6))
                  : undefined
              }
              groupId={groupId}
              onChangeGroupId={setGroupId}
              onAlertStateChange={handleAlertStateChange}
              initialEnterAlert={enterAlert}
              initialExitAlert={exitAlert}
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
              onChangeGroupId={setGroupId}
              onAlertStateChange={handleAlertStateChange}
              initialEnterAlert={enterAlert}
              initialExitAlert={exitAlert}
            />
          )}
          <Button variant="contained" onClick={handleAdd}>
            Add
          </Button>
          <Button variant="outlined" onClick={onBack}>
            Back to List
          </Button>
        </Stack>
        <Stack gap="20px" sx={{ width: "50%", height: "600px" }}>
          <Maps
            apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
            zoom={13}
            center={center}
            drawingModes={
              [
                type === "circular" ? "circle" : "polygon",
              ] as google.maps.drawing.OverlayType[]
            }
            onOverlayComplete={handleOverlayComplete}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default AddGeofence;
