import { CircleType } from "../../../../components/Map/type";
import { PolygonData } from "../../../../src/hooks/useMapManager";

export const parseResponseToPolygonData = (
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

export const parseLatLngRadius = (hexString: string): CircleType => {
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
