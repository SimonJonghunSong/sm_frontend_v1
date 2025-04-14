import { useState, useCallback, useEffect, useRef } from "react";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import {
  AT_GET_CIRCULAR_GEOFENCE_255_LIST,
  AT_GET_CIRCULAR_GEOFENCE_999_LIST,
  AT_GET_POLYGON_GEOFENCE_LIST,
  CR,
  POLYGON_GEOFENCE_POINTS,
} from "@/src/hooks/useSerial/constant";
import { PolygonType, CircleType } from "@/components/Map/type";
import {
  parseLatLngRadius,
  parseResponseToPolygonData,
} from "app/(auth)/configuration/geofence/utils";
import {
  findCircleIndexByNumber,
  generateFormattedIndexes,
} from "@/utils/generateFormattedIndexes";
import { chunkDataByNumberAndWrite } from "@/src/functions";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";

/**
 * 지오펜스 데이터 페칭을 위한 커스텀 훅
 * 이 훅은 장치의 지오펜스 데이터(원형, 폴리곤)를 가져오고 관리하는 기능을 제공합니다.
 *
 * 데이터 페칭 순서:
 * 1. 폴리곤 지오펜스 데이터 페칭 (fetchGeofenceData)
 * 2. 원형 지오펜스 데이터 페칭 (useEffect)
 * 3. 특정 지오펜스 데이터 조회 (fetchRowData)
 *
 * @param imei - 장치의 IMEI 번호
 * @returns 지오펜스 데이터 페칭 관련 상태와 함수들을 반환
 */
export function useGeofenceFetch(imei: string) {
  // 상태 관리
  const [isLoading, setIsLoading] = useState(false); // 데이터 페칭 진행 상태
  const [isCircularFetchReady, setIsCircularFetchReady] = useState(false); // 원형 데이터 페칭 준비 상태
  const [fetchedPolygonData, setFetchedPolygonData] = useState<PolygonType>(); // 페칭된 폴리곤 데이터
  const [fetchedCircleData, setFetchedCircleData] = useState<CircleType>(); // 페칭된 원형 데이터
  const [error, setError] = useState<string | null>(null); // 에러 상태

  // 데이터 누적을 위한 ref (AT 명령어 응답 데이터 수신용)
  const polygonPointRef = useRef(""); // 폴리곤 포인트 데이터 누적
  const circlePointRef = useRef(""); // 원형 포인트 데이터 누적

  // 시리얼 통신 관련 훅 (AT 명령어 전송용)
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  // 장치 설정 데이터 변환 훅 (지오펜스 최대 개수 확인용)
  const { formData } = useTransformedConfigData({
    data: portList.find(({ port }) => port.imei === imei)?.packageToJson
      .synctrak,
    blacklist: ["info"],
  });

  // 현재 연결된 포트 정보 (AT 명령어 전송 대상)
  const currentPort: any = portList.find(({ port }) => port.imei === imei);

  /**
   * 지오펜스 데이터 페칭 함수
   * 폴리곤 지오펜스 데이터를 먼저 가져오고, 완료되면 원형 지오펜스 데이터를 가져옵니다.
   */
  const fetchGeofenceData = useCallback(() => {
    // 1. 포트 상태 확인 (readable, writable)
    if (!currentPort) {
      console.log("[fetchGeofenceData] currentPort가 없음, 함수 종료");
      return;
    }

    setIsLoading(true);
    setIsCircularFetchReady(false);

    if (!currentPort.port.readable || !currentPort.port.writable) {
      setIsLoading(false);
      setError("Port is not readable or writable");
      return;
    }

    // 2. 폴리곤 지오펜스 최대 개수 확인 (formData에서 tab_id: "53" 확인)
    const polygonGeofenceMax = Number(
      formData.find((item) => item.info.tab_id === "53")?.info.max || 0
    );

    // 3. 폴리곤 지오펜스 최대 개수가 없으면 원형 지오펜스 데이터 페칭으로 넘어감
    if (!polygonGeofenceMax) {
      return setIsCircularFetchReady(true);
    }

    // 4. 폴리곤 지오펜스 데이터 페칭 설정 (polygonfetchcount, ispolygonfetching, polygonmax)
    currentPort.port.polygonfetchcount = 0;
    currentPort.port.ispolygonfetching = true;
    currentPort.port.polygonmax = polygonGeofenceMax;

    // 5. 폴리곤 지오펜스 데이터 페칭 완료 후 콜백
    currentPort.port.onafterpolygongeofence = () => {
      console.log("[onafterpolygongeofence] 콜백 실행");
      currentPort.port.ispolygonfetching = false;
      // 6. 페칭 완료 후 원형 데이터 페칭 트리거
      setIsCircularFetchReady(true);
      currentPort.port.polygongeofence = "";
      console.log("[onafterpolygongeofence] 원형 데이터 페칭 트리거됨");
    };

    // 7. 폴리곤 지오펜스 데이터 요청 (AT_GET_POLYGON_GEOFENCE_LIST 명령어 전송)
    (async () => {
      const commands = AT_GET_POLYGON_GEOFENCE_LIST(imei);

      for (const command of commands) {
        console.log("[fetchGeofenceData] 명령어 실행 전:", command);
        await delayPromise(60); // 60ms 지연

        try {
          write({
            data: command,
            port: currentPort.port,
            writer: currentPort.writer,
          });
        } catch (error) {
          console.error("[fetchGeofenceData] 명령어 write 실패:", error);
        }
      }
      console.log("[fetchGeofenceData] 모든 명령어 실행 완료");
    })();
  }, [imei, currentPort]);

  /**
   * 특정 행의 지오펜스 데이터를 가져오는 함수
   * 사용자가 특정 지오펜스를 선택했을 때 호출됩니다.
   *
   * @param rowType - 지오펜스 타입 ("Polygon" 또는 "Circle")
   * @param groupId - 지오펜스 그룹 ID
   * @param mapRef - Google Maps 참조 객체
   */
  const fetchRowData = useCallback(
    (
      rowType: string,
      groupId: number,
      mapRef: React.RefObject<google.maps.Map>
    ) => {
      if (!currentPort) return;

      if (rowType === "Polygon") {
        // 1. 폴리곤 데이터 초기화
        setFetchedCircleData(undefined);

        // 2. 폴리곤 데이터 파싱
        const polygonData = currentPort.polygonGeofenceData
          ? currentPort.polygonGeofenceData.map(
              (item: string, index: number) => ({
                type: "polygon",
                groupId: index + 1,
                polygonCount: parseInt(
                  item.split("#")[1]?.substring(0, 2) || "0",
                  16
                ),
              })
            )
          : [];

        // 3. 선택된 폴리곤의 포인트 개수 확인
        const polyCount = polygonData.find(
          ({ groupId: id }) => id === groupId
        )?.polygonCount;

        if (!polyCount) return;

        // 4. 폴리곤 포인트 페칭 설정
        currentPort.port.ispolygonpointfetching = true;

        // 5. 응답 데이터 누적 핸들러
        currentPort.port.polygonhandler = (value: string) => {
          polygonPointRef.current += value;

          // 6. 모든 데이터가 수신되었는지 확인
          if (
            polygonPointRef.current.split(CR).length - 1 ===
            Math.ceil(polyCount / 20)
          ) {
            currentPort.port.ispolygonpointfetching = false;

            // 7. 수신된 데이터 처리
            const polygonPoint = polygonPointRef.current
              .split(CR)
              .filter((item) => item !== "");
            const header =
              polygonPoint[0].split(";").slice(0, 3).join(";") + ";";
            const combinedData = polygonPoint
              .map((item) => item.split(";").slice(3).join(";"))
              .join(";");
            const polygonAllData = header + combinedData;

            // 8. 폴리곤 데이터 파싱
            const polygonDataParsed = parseResponseToPolygonData(
              polygonAllData,
              () => {
                polygonPointRef.current = "";
                setFetchedPolygonData(undefined);
              }
            );

            // 9. 파싱된 데이터가 있으면 지도에 표시
            if (polygonDataParsed) {
              setFetchedPolygonData({ paths: polygonDataParsed.path });
              if (mapRef.current) {
                // 10. 지도 중심 위치 조정
                mapRef.current.setCenter({
                  lat: polygonDataParsed.path[0].lat,
                  lng: polygonDataParsed.path[0].lng,
                });
              }
            }
            polygonPointRef.current = "";
          }
        };

        // 11. 이전 화면으로 돌아갈 때 핸들러 정리
        currentPort.port.onprev = () => {
          currentPort.port.polygonhandler = null;
          currentPort.port.ispolygonpointfetching = false;
        };

        // 12. 폴리곤 지오펜스 데이터 요청
        chunkDataByNumberAndWrite(
          { write, port: currentPort.port, writer: currentPort.writer },
          {
            chuckString: ",",
            prefix: `AT^REQ;${imei};${
              POLYGON_GEOFENCE_POINTS[(groupId - 1) as number]
            };`,
            target: generateFormattedIndexes(polyCount).join(),
          }
        );
      } else {
        // 1. 원형 데이터 초기화
        setFetchedPolygonData(undefined);
        // 2. 원형 인덱스 계산
        const circleIndex = findCircleIndexByNumber(groupId - 1);

        // 3. 원형 지오펜스 데이터 페칭 설정
        currentPort.port.iscircularpointfetching = true;
        // 4. 응답 데이터 처리 핸들러
        currentPort.port.circlehandler = (value: string) => {
          circlePointRef.current += value;
          if (value.includes(CR)) {
            // 5. 응답 데이터 처리
            const circleData = parseLatLngRadius(circlePointRef.current);
            if (mapRef.current) {
              // 6. 지도 중심 위치 조정
              mapRef.current.setCenter({
                lat: circleData.center.lat,
                lng: circleData.center.lng,
              });

              circlePointRef.current = "";
            }
            // 7. 파싱된 데이터 저장 및 표시
            setFetchedCircleData(circleData);
            currentPort.port.iscircularpointfetching = false;
          }
        };

        // 8. 이전 화면으로 돌아갈 때 핸들러 정리
        currentPort.port.onprev = () => {
          currentPort.port.circlehandler = null;
          currentPort.port.iscircularpointfetching = false;
        };

        // 9. 원형 지오펜스 데이터 요청
        write({
          data: `AT^REQ;${imei};${circleIndex}`,
          port: currentPort.port,
          writer: currentPort.writer,
        });
      }
    },
    [imei, write, currentPort]
  );

  /**
   * 원형 지오펜스 데이터 페칭 이펙트
   * 폴리곤 지오펜스 데이터 페칭이 완료되면 실행됩니다.
   */
  useEffect(() => {
    console.log("[원형 지오펜스 데이터 페칭] 시작");

    // 1. 원형 지오펜스 최대 개수 확인 (formData에서 tab_id: "50" 확인)
    if (!currentPort || !isCircularFetchReady) return;

    const circularGeofenceMax = Number(
      formData.find((item) => item.info.tab_id === "50")?.info.max || 0
    );
    console.log(
      "[원형 지오펜스 데이터 페칭] circularGeofenceMax:",
      circularGeofenceMax
    );

    // 2. 원형 지오펜스 최대 개수가 없거나 페칭 준비가 안 되었으면 종료
    if (!circularGeofenceMax) {
      setIsLoading(false);
      return;
    }

    if (!currentPort.port.writable || !currentPort.port.readable) {
      setIsLoading(false);
      setError("Port is not readable or writable");
      return;
    }

    // 3. 원형 데이터 페칭 설정 (circularfetchcount, iscircularfetching, circlemax)
    currentPort.port.circularfetchcount = 0;
    currentPort.port.iscircularfetching = true;
    currentPort.port.circlemax = Number(circularGeofenceMax);
    console.log("[원형 지오펜스 데이터 페칭] 페칭 설정:", {
      circularfetchcount: currentPort.port.circularfetchcount,
      iscircularfetching: currentPort.port.iscircularfetching,
      circlemax: currentPort.port.circlemax,
    });

    // 4. 원형 지오펜스 데이터 페칭 완료 후 콜백
    currentPort.port.onaftercirculargeofence = () => {
      console.log("[onaftercirculargeofence] 콜백 실행");
      currentPort.port.iscircularfetching = false;
      setIsLoading(false);
      setIsCircularFetchReady(false);
      currentPort.port.circulargeofence = "";
      console.log("[onaftercirculargeofence] 페칭 완료 처리됨");
    };

    // 5. 원형 지오펜스 데이터 요청 (AT_GET_CIRCULAR_GEOFENCE_LIST 명령어 전송)
    (async () => {
      console.log("[원형 지오펜스 데이터 페칭] 명령어 실행 시작");
      const commands =
        circularGeofenceMax === 255
          ? AT_GET_CIRCULAR_GEOFENCE_255_LIST(imei)
          : AT_GET_CIRCULAR_GEOFENCE_999_LIST(imei);

      for (const command of commands) {
        await delayPromise(60); // 60ms 지연

        try {
          write({
            data: command,
            port: currentPort.port,
            writer: currentPort.writer,
          });
          console.log(
            "[원형 지오펜스 데이터 페칭] 명령어 write 성공:",
            command
          );
        } catch (error) {
          console.error(
            "[원형 지오펜스 데이터 페칭] 명령어 write 실패:",
            error
          );
        }
      }
      console.log("[원형 지오펜스 데이터 페칭] 모든 명령어 실행 완료");
    })();
  }, [
    isCircularFetchReady,
    currentPort.port.readable,
    currentPort.port.writable,
  ]);

  return {
    isLoading,
    error,
    fetchGeofenceData,
    fetchRowData,
    fetchedPolygonData,
    fetchedCircleData,
  };
}
