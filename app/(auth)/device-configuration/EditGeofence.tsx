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
import CircularType from "./(components)/CircularType";
import PolygonType from "./(components)/PolygonType";
import { toast } from "react-toastify";
import {
  AT_EDIT_PREFIX,
  AT_REQ,
  CR,
  POLYGON_GEOFENCE_POINTS,
  AT_GET_POLYGON_INFO,
  parsePolygonInfo,
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

const EditGeofence = ({ imei, groupId, type, onBack }: EditGeofenceProps) => {
  const [isFullLoading, setIsFullLoading] = useState(true);
  const [enterAlert, setEnterAlert] = useState(false);
  const [exitAlert, setExitAlert] = useState(false);
  const [polygonInfoFetched, setPolygonInfoFetched] = useState(false);
  const [polygonPointsFetched, setPolygonPointsFetched] = useState(false);
  const [polygonInfo, setPolygonInfo] = useState<any>(null);
  const [polyCount, setPolyCount] = useState<number | null>(null);
  const [polygonSpeedLimit, setPolygonSpeedLimit] = useState(false);
  const [circularOutputActive, setCircularOutputActive] = useState(false);
  const [circularBuzzerSpeedLimit, setCircularBuzzerSpeedLimit] =
    useState(false);
  const [loadSettingsComplete, setLoadSettingsComplete] = useState(false);

  // 원형 지오펜스 추가 설정 상태
  const [outputActiveValue, setOutputActiveValue] = useState("00"); // 00, 01, 02, 03
  const [outputKeepActive, setOutputKeepActive] = useState(false);
  const [outputActiveDelay, setOutputActiveDelay] = useState(0);
  const [buzzerSpeedLimitValue, setBuzzerSpeedLimitValue] = useState(0);

  const settingsBuffer = useRef("");
  const isCircleOutputActiveBuffer = useRef<string>();
  const polygonPointRef = useRef("");
  const circlePointRef = useRef("");
  const mapRef = useRef<google.maps.Map>(null);
  const mapManager = useMapManager();
  const polygonInfoRef = useRef("");
  const circleDataBufferRef = useRef("");
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

  // 효과 간 데이터 공유 방지를 위한 클린업 함수들
  const cleanupPolygonHandlers = () => {
    if (currentPort?.port) {
      currentPort.port.onbuffervalue = null;
      currentPort.port.polygonhandler = null;
      currentPort.port.ispolygonfetching = false;
      currentPort.port.ispolygonpointfetching = false;
    }
  };

  // CircularType 핸들러 함수들
  const handleOutputActiveValueChange = (value: string) => {
    setOutputActiveValue(value);
  };

  const handleOutputKeepActiveChange = (value: boolean) => {
    setOutputKeepActive(value);
  };

  const handleOutputActiveDelayChange = (value: number) => {
    setOutputActiveDelay(value);
  };

  const handleBuzzerSpeedLimitChange = (value: number) => {
    setBuzzerSpeedLimitValue(value);
  };

  // 1. 초기 로딩 및 타입 확인 효과 - 한 번만 실행
  useEffect(() => {
    // 초기화
    setIsFullLoading(true);
    setPolygonInfoFetched(false);
    setPolygonPointsFetched(false);
    setLoadSettingsComplete(false);
    settingsBuffer.current = "";

    if (!currentPort?.port?.readable || !currentPort?.port?.writable) {
      return;
    }

    // 원래 핸들러 백업
    const originalBufferValue = currentPort.port.onbuffervalue;

    // 설정 로드용 핸들러
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

            // 초기값으로 false 설정
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

            // 폴리곤 데이터 정보 요청 계속 진행
            const count = polygonData.find(
              ({ groupId: id }) => id === groupId
            )?.polygonCount;

            if (!count) {
              toast.error("Cannot find polygon data");
              onBack();
              return;
            }

            setPolyCount(count);
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

          // Circular 타입은 폴리곤 데이터를 확인하지 않고 바로 진행
        }
      }
    };

    // 타입에 따라 적절한 초기화 요청 보내기
    if (type === "polygon") {
      // 폴리곤 설정 요청 보내기
      write({
        data: `${AT_REQ}${imei};90;00`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    } else {
      // 원형 설정 요청
      write({
        data: `${AT_REQ}${imei};90;01,02`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    }

    return () => {
      cleanupPolygonHandlers();
      currentPort.port.onbuffervalue = originalBufferValue;
    };
  }, []); // 빈 의존성 배열로 최초 마운트 시 한 번만 실행

  // 2. 폴리곤 정보 요청 효과 - polyCount가 설정된 후에만 실행
  useEffect(() => {
    if (
      type !== "polygon" ||
      !polyCount ||
      polygonInfoFetched ||
      !loadSettingsComplete
    ) {
      return;
    }

    if (!currentPort?.port?.readable || !currentPort?.port?.writable) {
      return;
    }

    console.log("폴리곤 정보 요청 시작");

    // 원래 핸들러 백업
    const originalBufferValueHandler = currentPort.port.onbuffervalue;

    // 폴리곤 정보 핸들러
    const handlePolygonInfo = (value: string) => {
      polygonInfoRef.current += value;

      if (value.includes(CR)) {
        console.log("폴리곤 정보 응답:", polygonInfoRef.current);

        const responseParts = polygonInfoRef.current.split(CR);
        const validResponse = responseParts.find(
          (part) => part.includes("RRE;") && part.includes(";53;")
        );

        if (validResponse) {
          console.log("유효한 응답:", validResponse);

          // #을 기준으로 분리하여 오른쪽 부분이 폴리곤 정보
          const responseSections = validResponse.split("#");
          const responseData =
            responseSections.length > 1 ? responseSections[1] : "";

          // 폴리곤 정보 파싱
          const polygonInfoData = parsePolygonInfo(responseData);
          console.log("파싱된 폴리곤 정보:", polygonInfoData);
          console.log(polygonInfoData, ":::::::polygonInfoData");
          if (polygonInfoData) {
            setEnterAlert(polygonInfoData.enterAlert);
            setExitAlert(polygonInfoData.exitAlert);
            setPolygonInfo(polygonInfoData);
          }

          // 정보 요청 완료 표시 - 포인트 요청 효과 트리거
          setPolygonInfoFetched(true);

          // 핸들러 정리
          currentPort.port.onbuffervalue = originalBufferValueHandler;
        }

        polygonInfoRef.current = "";
      }
    };

    // 핸들러 설정
    currentPort.port.onbuffervalue = handlePolygonInfo;

    // 폴리곤 정보 요청
    write({
      data: AT_GET_POLYGON_INFO(imei, groupId - 1),
      port: currentPort.port,
      writer: currentPort.writer,
    });

    // 정리 함수
    return () => {
      currentPort.port.onbuffervalue = originalBufferValueHandler;
    };
  }, [
    type,
    polyCount,
    currentPort?.port?.readable,
    currentPort?.port?.writable,
    polygonInfoFetched,
    loadSettingsComplete,
  ]);

  // 3. 폴리곤 포인트 요청 효과 - 폴리곤 정보가 로드된 후에만 실행
  useEffect(() => {
    if (
      type !== "polygon" ||
      !polygonInfoFetched ||
      !polyCount ||
      polygonPointsFetched
    ) {
      return;
    }

    if (!currentPort?.port?.readable || !currentPort?.port?.writable) {
      return;
    }

    console.log("폴리곤 포인트 요청 시작");

    // 원래 핸들러 백업
    const originalBufferValueHandler = currentPort.port.onbuffervalue;

    // 폴리곤 포인트 핸들러
    const handlePolygonPoints = (value: string) => {
      polygonPointRef.current += value;

      // 모든 응답을 받았는지 확인
      if (
        polygonPointRef.current.split(CR).length - 1 >=
        Math.ceil(polyCount / 20)
      ) {
        console.log(
          "폴리곤 포인트 응답 완료:",
          polygonPointRef.current.split(CR).length - 1
        );

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

          // 포인트 요청 완료 표시
          setPolygonPointsFetched(true);
          setIsFullLoading(false);

          // 핸들러 정리
          currentPort.port.onbuffervalue = originalBufferValueHandler;
        }
      }
    };

    // 핸들러 설정
    currentPort.port.onbuffervalue = handlePolygonPoints;

    // 폴리곤 포인트 데이터 요청
    chunkDataByNumberAndWrite(
      { write, port: currentPort.port, writer: currentPort.writer },
      {
        chuckString: ",",
        prefix: `AT^REQ;${imei};${POLYGON_GEOFENCE_POINTS[groupId - 1]};`,
        target: generateFormattedIndexes(polyCount).join(),
      }
    );

    // 정리 함수
    return () => {
      currentPort.port.onbuffervalue = originalBufferValueHandler;
    };
  }, [
    type,
    polygonInfoFetched,
    polyCount,
    currentPort?.port?.readable,
    currentPort?.port?.writable,
    polygonPointsFetched,
  ]);

  // 4. 원형 데이터 로드 효과 - circular 타입일 때만 실행
  useEffect(() => {
    if (type !== "circular" || !loadSettingsComplete) {
      return;
    }

    if (!currentPort?.port?.readable || !currentPort?.port?.writable) {
      return;
    }

    console.log("원형 데이터 요청 시작");

    const circleIndex = findCircleIndexByNumber(groupId - 1);
    currentPort.port.iscircularpointfetching = true;
    currentPort.port.circlehandler = (value) => {
      circleDataBufferRef.current += value;

      if (circleDataBufferRef.current.includes(CR)) {
        try {
          const circleData = parseLatLngRadius(circleDataBufferRef.current);
          console.log(
            "원형 데이터 파싱 결과:",
            JSON.stringify(circleData, null, 2)
          );
          console.log("좌표:", circleData.center.lat, circleData.center.lng);
          console.log("반경:", circleData.radius);

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

          const circleId = 0;
          mapManager.addCircle({
            id: circleId,
            radius: Number(circleData.radius),
            center: {
              lat: Number(circleData.center.lat),
              lng: Number(circleData.center.lng),
            },
          });

          mapManager.registerEditableHandlers();

          if (mapRef.current) {
            mapRef.current.setCenter({
              lat: circleData.center.lat,
              lng: circleData.center.lng,
            });
          }

          // alert 상태와 다른 설정 값 파싱
          if (circularList[groupId - 1]) {
            const alertData = circularList[groupId - 1].split("#")[1];
            console.log("알림 데이터:", alertData);

            if (alertData?.length >= 24) {
              // alert 상태 설정
              setEnterAlert(alertData.slice(20, 22) === "01");
              setExitAlert(alertData.slice(22, 24) === "01");

              // 추가 설정 파싱 및 설정 (길이에 따라 다른 설정 존재)
              if (alertData.length > 24 && circularOutputActive) {
                // outputActiveValue가 있는 경우 (기본값 "00" 사용)
                setOutputActiveValue(
                  alertData.length >= 26 ? alertData.slice(24, 26) : "00"
                );

                // outputActiveDelay가 있는 경우 (16진수 값을 10진수로 변환, 기본값 0 사용)
                if (alertData.length >= 34) {
                  const delayHex = alertData.slice(26, 34);
                  try {
                    const delayValue = parseInt(delayHex, 16) / 1000000; // 16진수에서 초 단위로 변환
                    setOutputActiveDelay(delayValue);
                  } catch (e) {
                    console.error("딜레이 값 파싱 오류:", e);
                    setOutputActiveDelay(0);
                  }
                }
              }

              // buzzerSpeedLimit 값이 있는 경우
              if (alertData.length > 34 && circularBuzzerSpeedLimit) {
                try {
                  const speedLimitHex = alertData.slice(34, 42);
                  const speedLimitValue = parseInt(speedLimitHex, 16) / 1000000; // 16진수에서 초 단위로 변환
                  setBuzzerSpeedLimitValue(speedLimitValue);
                } catch (e) {
                  console.error("속도 제한 값 파싱 오류:", e);
                  setBuzzerSpeedLimitValue(0);
                }
              }
            }
          } else {
            console.warn(
              "circularList에서 해당 groupId의 데이터를 찾을 수 없습니다:",
              groupId - 1
            );
          }

          setIsFullLoading(false);
          currentPort.port.iscircularpointfetching = false;
          // Clear the buffer after processing
          circleDataBufferRef.current = "";
        } catch (e) {
          console.error("원형 데이터 파싱 중 오류 발생:", e);
          setIsFullLoading(false);
          currentPort.port.iscircularpointfetching = false;
          // Clear the buffer on error as well
          circleDataBufferRef.current = "";
        }
      }
    };

    // 원형 데이터 요청
    setTimeout(() => {
      write({
        data: `AT^REQ;${imei};${circleIndex}`,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    }, 1000);

    // 정리 함수
    return () => {
      currentPort.port.circlehandler = null;
      currentPort.port.iscircularpointfetching = false;
      // Clear the buffer on cleanup
      circleDataBufferRef.current = "";
    };
  }, [
    type,
    currentPort?.port?.readable,
    currentPort?.port?.writable,
    loadSettingsComplete,
  ]);

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
      // 원형 지오펜스 설정에 이미 로드된 값 사용
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

      // 문서에 따라 다양한 상태 조합에 맞게 데이터 형식 구성
      let dataString = "";

      // 1. 기본 정보: 좌표와 알림 상태 (항상 포함)
      const baseData = `${coordinateToHexString}${alertHexString}`;

      // Output Active 값 - 사용자가 설정한 값 사용
      const outActValue = circularOutputActive ? outputActiveValue : "00";

      // Output Active Delay 값 - 사용자가 설정한 값 사용
      const outActDelayValue = Math.floor(outputActiveDelay * 1000000)
        .toString(16)
        .padStart(8, "0")
        .toUpperCase();

      // Buzzer Speed Limit 값 - 사용자가 설정한 값 사용
      const speedLimitValueHex =
        buzzerSpeedLimitValue > 0
          ? Math.floor(buzzerSpeedLimitValue * 1000000)
              .toString(16)
              .padStart(8, "0")
              .toUpperCase()
          : "00000000";

      // BUZZER_SPEED_LIMIT 값
      const buzzerSpeedLimitFlag = circularBuzzerSpeedLimit ? "01" : "00";
      console.log(speedLimitValueHex);
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
                  ? mapManager.circles[0].center.lat
                  : undefined
              }
              long={
                mapManager.circles.length > 0
                  ? mapManager.circles[0].center.lng
                  : undefined
              }
              radius={
                mapManager.circles.length > 0
                  ? mapManager.circles[0].radius
                  : undefined
              }
              groupId={groupId}
              onChangeGroupId={() => {}}
              onAlertStateChange={handleAlertStateChange}
              initialEnterAlert={enterAlert}
              initialExitAlert={exitAlert}
              showOutputActive={circularOutputActive}
              showBuzzerSpeedLimit={circularBuzzerSpeedLimit}
              outputActiveValue={outputActiveValue}
              onOutputActiveValueChange={handleOutputActiveValueChange}
              outputKeepActive={outputKeepActive}
              onOutputKeepActiveChange={handleOutputKeepActiveChange}
              outputActiveDelay={outputActiveDelay}
              onOutputActiveDelayChange={handleOutputActiveDelayChange}
              buzzerSpeedLimit={buzzerSpeedLimitValue}
              onBuzzerSpeedLimitChange={handleBuzzerSpeedLimitChange}
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
              showSpeedLimit={polygonSpeedLimit}
              initialBuzzerSpeedLimit={polygonInfo?.buzzerSpeedLimit || 0}
            />
          )}
        </Stack>

        <Stack gap="20px" sx={{ width: "50%", height: "500px" }}>
          <Box flex={1}>
            <Maps
              ref={mapRef}
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string}
              zoom={13}
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
