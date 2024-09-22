type LatLng = {
  lat: number;
  lng: number;
};

// 좌표 배열을 받아서 변환된 문자열을 반환하는 공통 함수
export const convertCoordinatesToHexString = (
  coordiarray: LatLng[]
): string => {
  return coordiarray
    .map((coord, index) => {
      // Index는 두 자릿수로 포맷 (00, 01, 02...)
      const indexStr = index.toString().padStart(2, "0");

      // lat를 소수점 6자리로 반올림 후 1000000 곱하고 16진수로 변환
      const latHex = Math.round(coord.lat * 1000000)
        .toString(16)
        .toUpperCase()
        .padStart(8, "0");

      // lng를 소수점 6자리로 반올림 후 1000000 곱하고 16진수로 변환
      const lngHex = Math.round(coord.lng * 1000000)
        .toString(16)
        .toUpperCase()
        .padStart(8, "0");

      // XX#YYYYYYYYYYYYYYYY; 형식으로 문자열 생성
      return `${indexStr}#${latHex}${lngHex}`;
    })
    .join(";"); // 각 결과를 ;로 이어붙인 후 마지막에도 ; 추가
};
