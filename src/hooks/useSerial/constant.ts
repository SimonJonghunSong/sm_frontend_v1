export const HEALTH_CHECK = "AT^$PSTRdy";
export const AT_GET_IMEI = "AT^$ReqJsonPk;No;1";
export const AT_GET_MODEL_INFO = "AT^$PSTVer;1234";
export const AT_GET_JSON_PACKAGE_COUNT_COMMAND = "AT^$PSTGetJson";
export const AT_GET_JSON = "AT^$ReqJsonPk;No;";
export const AT_GET_CSV = "AT^$PSTGetCsv";
export const AT_EDIT_PREFIX = "AT^PRG;";
export const AT_GET_DEVICE_VERSIONS = "AT^CMD;4309999001;03;04;";
export const AT_GET_DEVICE_BATTERY_VOLTAGE = "AT^CMD;4309999001;07;22";
export const AT_GET_ASSIGN_MAP_STT = "AT^CMD;4309999001;05;07";
export const AT_GET_ASSIGN_MAP_ALT = "AT^CMD;4309999001;05;08";
export const AT_REQ = "AT^REQ;";
export const AT_CMD = "AT^CMD;";
export const AT_SET_ASSIGN_STT = "AT^PRG;0000000000;10;";
export const AT_SET_ASSIGN_STT_ITEM = "AT^PRG;0000000000;11;";
export const AT_SET_ASSIGN_ALT = "AT^PRG;0000000000;10;";
export const AT_SET_ASSIGN_ALT_ITEM = "AT^PRG;0000000000;12;";
export const AT_GET_POLYGON_GEOFENCE_LIST = (imei: string) => [
  `${AT_REQ}${imei};53;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19`,
  `${AT_REQ}${imei};53;20,21,22,23,24,25,26,27,28,29`,
];

export const AT_GET_POLYGON_INFO = (imei: string, groupId: number) =>
  `${AT_REQ}${imei};53;${groupId.toString().padStart(2, "0")}`;

export const parsePolygonInfo = (response: string) => {
  // For 6-character response like "050101"
  if (response.length === 6) {
    return {
      enterAlert: response.substring(2, 4) === "01",
      exitAlert: response.substring(4, 6) === "01",
    };
  }
  // For 14-character response like "05 01 01 001e8480"
  else if (response.length === 14) {
    const speedLimitHex = response.substring(7, 15);
    // Convert hex to decimal and divide by 1000000 to get speed in km/h
    const speedLimit = parseInt(speedLimitHex, 16) / 1000000;

    return {
      enterAlert: response.substring(2, 4) === "01",
      exitAlert: response.substring(4, 6) === "01",
      buzzerSpeedLimit: speedLimit.toFixed(2), // Format to 2 decimal places
    };
  }

  return null;
};

export const POLYGON_GEOFENCE_POINTS = [
  60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78,
  79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89,
];

// 050101
// 050101 001e8480 06db

export const AT_GET_CIRCULAR_GEOFENCE_10_LIST = (imei: string) => [
  `${AT_REQ}${imei};50;25,26,27,28,29,30,31,32,33,34`,
];

export const AT_GET_CIRCULAR_GEOFENCE_255_LIST = (imei: string) => [
  `${AT_REQ}${imei};50;25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44`,
  `${AT_REQ}${imei};50;45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64`,
  `${AT_REQ}${imei};50;65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84`,
  `${AT_REQ}${imei};50;85,86,87,88,89,90,91,92,93,94,95,96,97,98,99`,
  `${AT_REQ}${imei};51;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19`,
  `${AT_REQ}${imei};51;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39`,
  `${AT_REQ}${imei};51;40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59`,
  `${AT_REQ}${imei};51;60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79`,
  `${AT_REQ}${imei};51;80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99`,
  `${AT_REQ}${imei};52;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19`,
  `${AT_REQ}${imei};52;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39`,
  `${AT_REQ}${imei};52;40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59`,
  `${AT_REQ}${imei};52;60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79`,
];
export const AT_GET_CIRCULAR_GEOFENCE_999_LIST = (imei: string) => [
  ...AT_GET_CIRCULAR_GEOFENCE_255_LIST(imei),
  `${AT_REQ}${imei};91;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19`,
  `${AT_REQ}${imei};91;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39`,
  `${AT_REQ}${imei};91;40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59`,
  `${AT_REQ}${imei};91;60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79`,
  `${AT_REQ}${imei};91;80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99`,
  `${AT_REQ}${imei};92;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19`,
  `${AT_REQ}${imei};92;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39`,
  `${AT_REQ}${imei};92;40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59`,
  `${AT_REQ}${imei};92;60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79`,
  `${AT_REQ}${imei};92;80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99`,
  `${AT_REQ}${imei};93;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19`,
  `${AT_REQ}${imei};93;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39`,
  `${AT_REQ}${imei};93;40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59`,
  `${AT_REQ}${imei};93;60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79`,
  `${AT_REQ}${imei};93;80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99`,
  `${AT_REQ}${imei};94;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19`,
  `${AT_REQ}${imei};94;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39`,
  `${AT_REQ}${imei};94;40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59`,
  `${AT_REQ}${imei};94;60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79`,
  `${AT_REQ}${imei};94;80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99`,
  `${AT_REQ}${imei};95;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19`,
  `${AT_REQ}${imei};95;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39`,
  `${AT_REQ}${imei};95;40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59`,
  `${AT_REQ}${imei};95;60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79`,
  `${AT_REQ}${imei};95;80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99`,
  `${AT_REQ}${imei};96;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19`,
  `${AT_REQ}${imei};96;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39`,
  `${AT_REQ}${imei};96;40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59`,
  `${AT_REQ}${imei};96;60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79`,
  `${AT_REQ}${imei};96;80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99`,
  `${AT_REQ}${imei};97;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19`,
  `${AT_REQ}${imei};97;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39`,
  `${AT_REQ}${imei};97;40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59`,
  `${AT_REQ}${imei};97;60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79`,
  `${AT_REQ}${imei};97;80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99`,
  `${AT_REQ}${imei};98;00,01,02,03,04,05,06,07,08,09,10,11,12,13,14,15,16,17,18,19`,
  `${AT_REQ}${imei};98;20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39`,
  `${AT_REQ}${imei};98;40,41,42,43`,
];

export const STX = String.fromCharCode(0x02); // Start of Text
export const ETX = String.fromCharCode(0x03); // End of Text
export const CR = String.fromCharCode(0x0d); // End of Text
export const ESC = String.fromCharCode(0x1b); // End of Text

export const EXCLUDE_STRING = [
  "AT+CFUN=4",
  "OKAT+QPOWD",
  "AT+QPOWD",
  "OK",
  "POWERED DOWN",
  "RDY",
  "RDYAPP",
  "RDYAT+CFUN=4",
];
