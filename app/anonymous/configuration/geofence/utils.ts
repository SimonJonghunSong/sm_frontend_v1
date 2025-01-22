import { CircleType } from "../../../../components/Map/type";
import { PolygonData } from "../../../../src/hooks/useMapManager";

/**
 *
 * @param response
 * @param onError
 * @returns
 *
 * @example response: RRE;0000000000;67;00#023d73c20791809c;01#023d73c207914848;02#023d3c7c07914848;03#023d3ae407916e81
 *          returns {
 *                    id: 0,
 *                    path: [
 *                           {lat: -32.234234, lng: 103.324234},
 *                           {lat: -32.234234, lng: 103.324234},
 *                           {lat: -32.234234, lng: 103.324234}
 *                          ]
 *                    }
 */
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

    // lat과 lng의 첫 자리가 '8'인지 여부를 상수로 관리
    const isLatNegative = latHex[0] === "8";
    const isLngNegative = lngHex[0] === "8";

    // 첫 자리가 '8'이면 첫 자리를 '0'으로 변경 후 10진수로 변환
    const lat = parseInt(isLatNegative ? `0${latHex.slice(1)}` : latHex, 16);
    const lng = parseInt(isLngNegative ? `0${lngHex.slice(1)}` : lngHex, 16);

    // 반환할 때 첫 자리가 '8'이면 음수로 처리
    const finalLat = isLatNegative ? lat * -1 : lat;
    const finalLng = isLngNegative ? lng * -1 : lng;

    // lat과 lng를 1000000으로 나누어 좌표로 변환
    return {
      lat: finalLat / 1000000,
      lng: finalLng / 1000000,
    };
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

  // 첫 8자리 (lat)와 그 다음 8자리 (lng)를 추출
  const latHex = hexValue.slice(0, 8);
  const lngHex = hexValue.slice(8, 16);

  // lat과 lng의 첫 자리가 '8'인지 여부를 상수로 관리
  const isLatNegative = latHex[0] === "8";
  const isLngNegative = lngHex[0] === "8";

  // 첫 자리가 '8'이면 첫 자리를 '0'으로 변경 후 10진수로 변환
  const lat = parseInt(isLatNegative ? `0${latHex.slice(1)}` : latHex, 16);
  const lng = parseInt(isLngNegative ? `0${lngHex.slice(1)}` : lngHex, 16);

  // 반환할 때 첫 자리가 '8'이면 음수로 처리
  const finalLat = isLatNegative ? lat * -1 : lat;
  const finalLng = isLngNegative ? lng * -1 : lng;

  // lat과 lng를 1000000으로 나누어 좌표로 변환
  const centerLat = finalLat / 1000000;
  const centerLng = finalLng / 1000000;

  // 그 다음 4자리를 반경 (radius)로 변환
  const radiusHex = hexValue.slice(16, 20);
  const radius = parseInt(radiusHex, 16);

  // 결과 반환
  return {
    center: {
      lat: centerLat,
      lng: centerLng,
    },
    radius,
  };
};
