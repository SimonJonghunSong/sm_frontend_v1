export const HEALTH_CHECK = "AT^$PSTRdy";
export const AT_GET_IMEI = "AT^CMD;;07;68";
export const AT_GET_MODEL_INFO = "AT^$PSTVer;1234";
export const AT_GET_JSON_PACKAGE_COUNT_COMMAND = "AT^$PSTGetJson";
export const AT_GET_JSON = "AT^$ReqJsonPk;No;";
export const AT_GET_CSV = "AT^$PSTGetCsv";

export const STX = String.fromCharCode(0x02); // Start of Text
export const ETX = String.fromCharCode(0x03); // End of Text
export const CR = String.fromCharCode(0x0d); // End of Text

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
