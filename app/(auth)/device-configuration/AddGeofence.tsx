"use client";

import { useState, useEffect, useRef } from "react";
import {
  Stack,
  Button,
  Select,
  MenuItem,
  SelectChangeEvent,
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
import CircularType from "./(components)/CircularType";
import PolygonType from "./(components)/PolygonType";
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
  const [loadSettingsComplete, setLoadSettingsComplete] = useState(false);
  const [buzzerSpeedLimit, setBuzzerSpeedLimit] = useState<string>("");

  // 설정 상태 추가
  const [polygonSpeedLimit, setPolygonSpeedLimit] = useState(false);
  const [circularBuzzerSpeedLimit, setCircularBuzzerSpeedLimit] =
    useState(false);
  const [circularOutputActive, setCircularOutputActive] = useState(false);
  // Output Active 값 (00~0A)
  const [outputActiveValue, setOutputActiveValue] = useState("00");
  // Output Keep Active (00 또는 01)
  const [outputKeepActive, setOutputKeepActive] = useState(false);
  // Output Active Delay (0~3600)
  const [outputActiveDelay, setOutputActiveDelay] = useState(20); // 기본값 20초
  // Buzzer Speed Limit Value (0~3600)
  const [buzzerSpeedLimitValue, setBuzzerSpeedLimitValue] = useState(0); // 0은 비활성화

  const isCircleOutputActiveBuffer = useRef<string>();
  const settingsBuffer = useRef<string>("");
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

  // 설정 데이터 요청 및 처리를 위한 useEffect
  useEffect(() => {
    if (!currentPort?.port?.readable || !currentPort?.port?.writable) {
      return;
    }

    // 이미 설정을 로드했으면 중복 요청 방지
    if (loadSettingsComplete) {
      return;
    }

    // 기존 핸들러 백업
    const originalBufferValue = currentPort.port.onbuffervalue;

    // 버퍼 초기화
    settingsBuffer.current = "";

    // 설정 요청 결과 처리 핸들러
    currentPort.port.onbuffervalue = (value) => {
      settingsBuffer.current += value;

      if (value.includes(CR)) {
        const responseParts = settingsBuffer.current.split(CR);

        if (type === "polygon") {
          // Polygon 설정 처리
          const validResponse = responseParts.find((part) =>
            part.includes(";90;00")
          );

          if (validResponse) {
            console.log("폴리곤 설정 응답:", validResponse);

            // 초기값으로 모두 false 설정
            setPolygonSpeedLimit(false);

            // RRE로 시작하는 유효한 응답인지 확인
            if (validResponse.startsWith("RRE")) {
              // 응답 파싱하여 필요한 데이터 추출
              // 형식: RRE;0000000000;90;00#01
              const parts = validResponse.split(";");
              if (parts.length >= 4) {
                const paramValue = parts[3].split("#");
                if (paramValue.length >= 2) {
                  // 00#01이면 Polygon Speed Limit => true, 00#00이면 false
                  if (paramValue[0] === "00") {
                    setPolygonSpeedLimit(paramValue[1] === "01");
                  }
                }
              }
            }

            // 완료 표시 및 핸들러 복원
            setLoadSettingsComplete(true);
            currentPort.port.onbuffervalue = originalBufferValue;
          }
        } else {
          // Circular 설정 처리
          // 초기값으로 모두 false 설정
          setCircularOutputActive(false);
          setCircularBuzzerSpeedLimit(false);

          // 유효한 응답 찾기
          const validResponses = responseParts.filter(
            (part) =>
              part.includes(";90;") &&
              (part.includes("01#") || part.includes("02#"))
          );

          if (validResponses.length > 0) {
            // 각 응답을 처리
            validResponses.forEach((response) => {
              // RRE로 시작하는 유효한 응답인지 확인
              if (!response.startsWith("RRE")) return;

              const parts = response.split(";");
              if (parts.length < 4) return;

              // 마지막 부분에 여러 파라미터가 있을 수 있음 (예: 01#01;02#01)
              const paramPairs = parts.slice(3).join(";").split(";");

              // 각 파라미터 쌍을 처리
              paramPairs.forEach((pair) => {
                const paramData = pair.split("#");
                if (paramData.length < 2) return;

                const paramId = paramData[0]; // 01 또는 02
                const paramValue = paramData[1]; // 값 (00 또는 01)

                // 01#01이면 Circular Output Active => true, 01#00이면 false
                if (paramId === "01") {
                  setCircularOutputActive(paramValue === "01");
                }
                // 02#01 Circular Buzzer Speed Limit => true, 02#00이면 false
                else if (paramId === "02") {
                  setCircularBuzzerSpeedLimit(paramValue === "01");
                }
              });
            });

            // 완료 처리
            setLoadSettingsComplete(true);
            currentPort.port.onbuffervalue = originalBufferValue;
          }
        }
      }
    };

    // 타입에 따라 적절한 요청 보내기
    if (type === "polygon") {
      // Polygon 설정 요청
      write({
        data: `${AT_REQ}${imei};90;00`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    } else {
      // Circular 설정 요청
      write({
        data: `${AT_REQ}${imei};90;01,02`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    }

    // 정리 함수
    return () => {
      currentPort.port.onbuffervalue = originalBufferValue;
    };
  }, [
    type,
    currentPort?.port?.readable,
    currentPort?.port?.writable,
    imei,
    write,
    loadSettingsComplete,
  ]);

  // 타입이 변경되면 설정 로드 상태 초기화하여 새로운 요청 트리거
  useEffect(() => {
    setLoadSettingsComplete(false);
  }, [type]);

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

      // 문서에 따라 다양한 상태 조합에 맞게 데이터 형식 구성
      let dataString = "";

      // 1. 기본 정보: 좌표와 알림 상태 (항상 포함)
      const baseData = `${coordinateToHexString}${alertHexString}`;

      // Output Active 값과 Keep Active 값
      const outActValue = circularOutputActive ? outputActiveValue : "00";
      const keepActiveValue = outputKeepActive ? "01" : "00";

      // Output Active Delay 값 계산 (초 단위 값 * 1,000,000을 16진수로 변환)
      // 기본값 사용하지 않고 사용자 입력값 사용
      console.log("Using Output Active Delay:", outputActiveDelay);
      const outActDelayValue = Math.floor(outputActiveDelay * 1000000)
        .toString(16)
        .padStart(8, "0")
        .toUpperCase();

      // Buzzer Speed Limit 값 계산
      // SPEED_1 값: 값이 0이면 "00000000", 그렇지 않으면 값 * 1,000,000을 16진수로 변환
      const speedLimitValueHex =
        buzzerSpeedLimitValue > 0
          ? Math.floor(buzzerSpeedLimitValue * 1000000)
              .toString(16)
              .padStart(8, "0")
              .toUpperCase()
          : "00000000";

      // BUZZER_SPEED_LIMIT 값: 값이 0이면 "00" (disabled), 그렇지 않으면 "01" (enabled)
      const buzzerSpeedLimitFlag = buzzerSpeedLimitValue > 0 ? "01" : "00";

      // 고정 접미사
      const fixedSuffix = "0078";

      // 2. 상태 조합에 따른 추가 데이터
      if (circularOutputActive && circularBuzzerSpeedLimit) {
        // 둘 다 활성화: 모든 값 포함
        dataString = `${baseData}${outActValue}${outActDelayValue}${speedLimitValueHex}${buzzerSpeedLimitFlag}${fixedSuffix}`;
      } else if (circularOutputActive && !circularBuzzerSpeedLimit) {
        // Output Active만 활성화: Output Active 값과 Delay 값 포함
        dataString = `${baseData}${outActValue}${outActDelayValue}`;
      } else if (!circularOutputActive && circularBuzzerSpeedLimit) {
        // Buzzer Speed Limit만 활성화: Buzzer Speed Limit 값만 포함
        dataString = `${baseData}${speedLimitValueHex}${buzzerSpeedLimitFlag}${fixedSuffix}`;
      } else {
        // 둘 다 비활성화: 기본 정보만 포함
        dataString = baseData;
      }

      write({
        data: `${AT_EDIT_PREFIX}${imei};${circleIndex}#${dataString}`,
        port: currentPort.port,
        writer: currentPort.writer,
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

    // Convert alert states to hex string
    const alertHexString = `${enterAlert ? "01" : "00"}${
      exitAlert ? "01" : "00"
    }`;

    // Convert buzzerSpeedLimit to hex string (multiplied by 1000000)
    const speedLimitHexString = polygonSpeedLimit
      ? Math.floor(Number(buzzerSpeedLimit || 0) * 1000000)
          .toString(16)
          .padStart(8, "0")
          .toUpperCase()
      : "00000000";

    // CRC 또는 추가 데이터 문자열 (형식에 맞춰 추가)
    const additionalHexData = "0000";

    write({
      data: `${AT_EDIT_PREFIX}${imei};53;${String(groupId - 1).padStart(
        2,
        "0"
      )}#${mapManager.polygons[0].path.length
        .toString(16)
        .padStart(2, "0")}${alertHexString}${
        polygonSpeedLimit ? speedLimitHexString + additionalHexData : ""
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
              showOutputActive={circularOutputActive}
              showBuzzerSpeedLimit={circularBuzzerSpeedLimit}
              outputActiveValue={outputActiveValue}
              onOutputActiveValueChange={setOutputActiveValue}
              outputKeepActive={outputKeepActive}
              onOutputKeepActiveChange={setOutputKeepActive}
              outputActiveDelay={outputActiveDelay}
              onOutputActiveDelayChange={setOutputActiveDelay}
              buzzerSpeedLimit={buzzerSpeedLimitValue}
              onBuzzerSpeedLimitChange={setBuzzerSpeedLimitValue}
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
              showSpeedLimit={polygonSpeedLimit}
              onBuzzerSpeedLimitChange={setBuzzerSpeedLimit}
              initialBuzzerSpeedLimit={buzzerSpeedLimit}
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
