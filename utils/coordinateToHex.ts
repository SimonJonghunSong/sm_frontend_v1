type LatLng = {
  lat: number;
  lng: number;
};

// 좌표 배열을 받아서 변환된 문자열을 반환하는 공통 함수
export const convertCoordinatesToHexStringUpperTo30 = (
  coordiarray: LatLng[],
  defaultIndex?: number
): string => {
  return coordiarray
    .map((coord, index) => {
      // Index를 두 자릿수로 포맷 (00, 01, 02...)
      const indexStr = (index + (defaultIndex || 0))
        .toString()
        .padStart(4, "0");

      // lat을 toFixed(6)으로 소수점 6자리로 고정 후 1000000 곱하고 16진수로 변환
      let latValue = (Number(coord.lat.toFixed(6)) * 1000000)
        .toString(16)
        .toUpperCase()
        .padStart(8, "0");

      // 음수일 경우 첫 번째 자리를 8로 변경
      if (coord.lat < 0) {
        latValue = `8${latValue.slice(1)}`;
      }

      // lng를 toFixed(6)으로 소수점 6자리로 고정 후 1000000 곱하고 16진수로 변환
      let lngValue = (Number(coord.lng.toFixed(6)) * 1000000)
        .toString(16)
        .toUpperCase()
        .padStart(8, "0");

      // 음수일 경우 첫 번째 자리를 8로 변경
      if (coord.lng < 0) {
        lngValue = `8${lngValue.slice(1)}`;
      }

      // XX#YYYYYYYYYYYYYYYY; 형식으로 문자열 생성
      return `${indexStr}#${latValue}${lngValue}`;
    })
    .join(";"); // 각 결과를 ;로 이어붙임
};

// 좌표 배열을 받아서 변환된 문자열을 반환하는 공통 함수
export const convertCoordinatesToHexString = (
  coordiarray: LatLng[]
): string => {
  return coordiarray
    .map((coord, index) => {
      // Index를 두 자릿수로 포맷 (00, 01, 02...)
      const indexStr = index.toString().padStart(2, "0");

      // lat을 toFixed(6)으로 소수점 6자리로 고정 후 1000000 곱하고 16진수로 변환
      let latValue = (Number(coord.lat.toFixed(6)) * 1000000)
        .toString(16)
        .toUpperCase()
        .padStart(8, "0");

      // 음수일 경우 첫 번째 자리를 8로 변경
      if (coord.lat < 0) {
        latValue = `8${latValue.slice(1)}`;
      }

      // lng를 toFixed(6)으로 소수점 6자리로 고정 후 1000000 곱하고 16진수로 변환
      let lngValue = (Number(coord.lng.toFixed(6)) * 1000000)
        .toString(16)
        .toUpperCase()
        .padStart(8, "0");

      // 음수일 경우 첫 번째 자리를 8로 변경
      if (coord.lng < 0) {
        lngValue = `8${lngValue.slice(1)}`;
      }

      // XX#YYYYYYYYYYYYYYYY; 형식으로 문자열 생성
      return `${indexStr}#${latValue}${lngValue}`;
    })
    .join(";"); // 각 결과를 ;로 이어붙임
};

export const convertCircleCoordinatesToHexString = ({
  lat,
  lng,
  radius,
}: {
  lat: number;
  lng: number;
  radius: number;
}): string => {
  // lat을 toFixed(6)으로 소수점 6자리로 고정 후 1000000 곱한 후 16진수로 변환 (8자리 유지)
  let latHex = (Number(lat.toFixed(6)) * 1000000)
    .toString(16)
    .padStart(8, "0")
    .toUpperCase();

  // 음수일 경우 첫 번째 자리를 8로 변경
  if (lat < 0) {
    latHex = `8${latHex.slice(1)}`;
  }

  // lng를 toFixed(6)으로 소수점 6자리로 고정 후 1000000 곱한 후 16진수로 변환 (8자리 유지)
  let lngHex = (Number(lng.toFixed(6)) * 1000000)
    .toString(16)
    .padStart(8, "0")
    .toUpperCase();

  // 음수일 경우 첫 번째 자리를 8로 변경
  if (lng < 0) {
    lngHex = `8${lngHex.slice(1)}`;
  }

  // radius는 정수로 변환 후 16진수로 변환 (4자리 유지)
  const radiusHex = Math.round(radius)
    .toString(16)
    .padStart(4, "0")
    .toUpperCase();

  // lat, lng, radius를 연결해서 반환
  return `${latHex}${lngHex}${radiusHex}`;
};
