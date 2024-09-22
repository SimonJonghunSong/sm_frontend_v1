import { POLYGON_GEOFENCE_POINTS } from "./constant";

const regex = /(\d{2}#\w+)/g;

type PolygonGeofenceDataType = {
  groupId: number;
  polygonCount: number;
  inAlert: "Disabled" | "Enabled";
  outAlert: "Disabled" | "Enabled";
  polygonSpeedLimit: number;
  type: string;
  polygonPointId: number;
};

export const getGeofenceData = (data: string) => {
  const matches = data.match(regex);
  return matches || [];
};

export const getPolygonGeofenceData = (
  inputArray: string[]
): PolygonGeofenceDataType[] => {
  return inputArray.reduce(
    (acc: PolygonGeofenceDataType[], item: string, index: number) => {
      const [number, value] = item.split("#");

      // '00000000000000' 값을 가지는 항목은 무시
      if (value === "00000000000000") return acc;

      // 필요한 데이터 추출 및 변환
      const groupId = parseInt(number, 10) + 1;
      const polygonCount = parseInt(value.substring(0, 2), 16);
      const inAlert: "Disabled" | "Enabled" =
        value.substring(2, 4) === "00" ? "Disabled" : "Enabled";
      const outAlert: "Disabled" | "Enabled" =
        value.substring(4, 6) === "00" ? "Disabled" : "Enabled";
      const polygonSpeedLimit = parseInt(value.substring(6), 16) / 1000000;
      const type = "polygon";
      const polygonPointId = POLYGON_GEOFENCE_POINTS[index];
      // 변환된 데이터 객체를 accumulator에 추가
      acc.push({
        groupId,
        polygonCount,
        inAlert,
        outAlert,
        polygonSpeedLimit,
        type,
        polygonPointId,
      });

      return acc;
    },
    []
  );
};

type CircularGeofenceDataType = {
  groupId: number;
  lat: number;
  long: number;
  radius: number;
  inAlert: "Disabled" | "Enabled";
  outAlert: "Disabled" | "Enabled";
  type: string;
};

export const getCircularGeofenceData = (
  inputArray: string[]
): CircularGeofenceDataType[] => {
  return inputArray.reduce(
    (acc: CircularGeofenceDataType[], item: string, index: number) => {
      const [number, value] = item.split("#");

      // NoData인 항목은 무시
      if (value === "NoData") return acc;

      // 필요한 데이터 추출 및 변환
      const lat = parseInt(value.substring(0, 8), 16) / 1000000;
      const long = parseInt(value.substring(8, 16), 16) / 1000000;
      const radius = parseInt(value.substring(16, 20), 16); // 17번째부터 20번째까지
      const inAlert: "Disabled" | "Enabled" =
        value.substring(20, 22) === "00" ? "Disabled" : "Enabled"; // 21~22번째 자리
      const outAlert: "Disabled" | "Enabled" =
        value.substring(22, 23) === "00" ? "Disabled" : "Enabled"; // 23번째 자리
      const type = "circular";

      // 변환된 데이터 객체를 accumulator에 추가
      acc.push({
        groupId: index + 1,
        lat,
        long,
        radius,
        inAlert,
        outAlert,
        type,
      });

      return acc;
    },
    []
  );
};
