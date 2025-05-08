import { Lang } from "@/utils/useLangStore";
import { FormField } from "app/(auth)/device-info/page";

export const MENUS = {
  DeviceStatus: {
    en: "Device Status",
    es: "Estado del Dispositivo",
    pt: "Estado do Dispositivo",
  },
  Network: {
    en: "Network",
    es: "Red",
    pt: "Rede",
  },
  System: {
    en: "System",
    es: "Sistema",
    pt: "Sistema",
  },
  Report: {
    en: "Report",
    es: "Reporte",
    pt: "Relatório",
  },
  Tracking: {
    en: "Tracking",
    es: "Seguimiento",
    pt: "Rastreamento",
  },
  Bluetooth: {
    en: "Bluetooth",
    es: "Bluetooth",
    pt: "Bluetooth",
  },
  Accessories: {
    en: "Accessories",
    es: "Accesorios",
    pt: "Acessórios",
  },
  RF: {
    en: "RF",
    es: "RF",
    pt: "RF",
  },
  "Input/Output(I/O)": {
    en: "Input/Output(I/O)",
    es: "Entrada/Salida(E/S)",
    pt: "Entrada/Saída(E/S)",
  },
  Driver: {
    en: "Driver",
    es: "Conductor",
    pt: "Motorista",
  },
  Commands: {
    en: "Commands",
    es: "Comandos",
    pt: "Comandos",
  },
};

export const SECTIONS = {
  // Network
  Network: { en: "Network", es: "Red", pt: "Rede" },
  APN: { en: "APN", es: "APN", pt: "APN" },
  MainServer: {
    en: "Main Server",
    es: "Servidor Principal",
    pt: "Servidor Principal",
  },
  BackupServer: {
    en: "Backup Server",
    es: "Servidor de Respaldo",
    pt: "Servidor de Backup",
  },
  AGPSMode: { en: "AGPS Mode", es: "Modo AGPS", pt: "Modo AGPS" },
  MaintenanceServer: {
    en: "Maintenance Server",
    es: "Servidor de Mantenimiento",
    pt: "Servidor de Manutenção",
  },
  NTPServer: { en: "NTP Server", es: "Servidor NTP", pt: "Servidor NTP" },
  Satellite: { en: "Satellite", es: "Satélite", pt: "Satélite" },
  JammingDetection: {
    en: "Jamming Detection",
    es: "Detección de Interferencia",
    pt: "Detecção de Interferência",
  },
  Call: { en: "Call", es: "Llamada", pt: "Chamada" },
  SMS: { en: "SMS", es: "SMS", pt: "SMS" },

  // System
  Ignition: { en: "Ignition", es: "Ignición", pt: "Ignição" },
  BackupBattery: {
    en: "Backup Battery",
    es: "Batería de Respaldo",
    pt: "Bateria de Backup",
  },
  Device: { en: "Device", es: "Dispositivo", pt: "Dispositivo" },
  DriverPattern: {
    en: "Driver Pattern",
    es: "Patrón de Conductor",
    pt: "Padrão de Motorista",
  },
  McuUpdate: {
    en: "MCU Update",
    es: "Actualización de MCU",
    pt: "Atualização de MCU",
  },
  Motion: {
    en: "Motion",
    es: "Movimiento",
    pt: "Movimento",
  },
  Password: {
    en: "Password",
    es: "Contraseña",
    pt: "Senha",
  },
  Power: {
    en: "Power",
    es: "Potencia",
    pt: "Potência",
  },
  TdiOdometer: {
    en: "Tdi Odometer",
    es: "Odómetro TDI",
    pt: "Odômetro TDI",
  },
};

export const INCLUDE_FIELDS = {
  // Network
  [SECTIONS.Network.en]: [
    "1013",
    "1054",
    "1027",
    "1016",
    "1060",
    "1070",
    "1071",
  ],
  [SECTIONS.APN.en]: ["1000", "1002", "1001", "1003", "1004"],
  [SECTIONS.MainServer.en]: [
    "1005",
    "1007",
    "1006",
    "1012",
    "1017",
    "1018",
    "1019",
    "1011",
  ],
  [SECTIONS.BackupServer.en]: [
    "1008",
    "1009",
    "1010",
    "1011",
    "1012",
    "1017",
    "1018",
    "1019",
  ],
  [SECTIONS.AGPSMode.en]: ["1014", "1015"],
  [SECTIONS.MaintenanceServer.en]: ["1020", "1022", "1021", "1023"],
  [SECTIONS.NTPServer.en]: ["1076", "1077"],
  [SECTIONS.Satellite.en]: ["1052", "1053"],
  [SECTIONS.JammingDetection.en]: [
    "1061",
    "1062",
    "1063",
    "1065",
    "1066",
    "1067",
    "1068",
  ],
  [SECTIONS.SMS.en]: ["1025", "1030", "1031", "1032", "1033", "1034"],
  [SECTIONS.Call.en]: [
    "1035",
    "1036",
    "1037",
    "1038",
    "1039",
    "1040",
    "1041",
    "1042",
    "1043",
  ],

  // System
  [SECTIONS.Ignition.en]: [
    "1700",
    "1701",
    "1702",
    "1705",
    "1706",
    "1707",
    "1708",
    "1709",
    "1710",
    "1711",
    "1712",
    "1713",
    "1714",
    "1715",
    "1716",
    "1717",
  ],
  [SECTIONS.BackupBattery.en]: [
    "1932",
    "1936",
    "1937",
    "1938",
    "1939",
    "1947",
    "1948",
    "1973",
    "1974",
  ],
  [SECTIONS.Device.en]: ["2704", "2705", "2706", "2707", "2708", "2709"],
  [SECTIONS.DriverPattern.en]: [
    "1910",
    "1911",
    "1912",
    "1913",
    "1914",
    "1921",
    "1922",
    "1923",
    "1924",
    "1925",
  ],
  [SECTIONS.McuUpdate.en]: ["9900"],
  [SECTIONS.Motion.en]: [
    "1900",
    "1901",
    "1902",
    "1903",
    "1904",
    "1915",
    "1916",
    "1917",
    "1918",
    "1919",
    "1920",
  ],
  [SECTIONS.Password.en]: ["3000", "3001", "3002"],
  [SECTIONS.Power.en]: [
    "1930",
    "1931",
    "1933",
    "1934",
    "1935",
    "1939",
    "1940",
    "1941",
    "1942",
    "1943",
    "1944",
    "1949",
    "1952",
    "1953",
    "1954",
    "1959",
  ],
  [SECTIONS.TdiOdometer.en]: [
    "4200",
    "4201",
    "4202",
    "4203",
    "4204",
    "4205",
    "4206",
  ],
};

export type SearchField = {
  fields: (typeof INCLUDE_FIELDS)[keyof typeof INCLUDE_FIELDS];
  searchText: string;
  tab: string;
  key: string;
};

export const NETWORK_SECTION: Record<Lang, Record<string, SearchField>> = {
  en: {
    [SECTIONS.Network.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Network.en],
      searchText: `${MENUS.Network.en} > ${SECTIONS.Network.en}`,
      tab: "Network",
      key: SECTIONS.Network.en,
    },
    [SECTIONS.APN.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.APN.en],
      searchText: `${MENUS.Network.en} > ${SECTIONS.APN.en}`,
      tab: "Network",
      key: SECTIONS.APN.en,
    },
    [SECTIONS.MainServer.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.MainServer.en],
      searchText: `${MENUS.Network.en} > ${SECTIONS.MainServer.en}`,
      tab: "Network",
      key: SECTIONS.MainServer.en,
    },
    [SECTIONS.BackupServer.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.BackupServer.en],
      searchText: `${MENUS.Network.en} > ${SECTIONS.BackupServer.en}`,
      tab: "Network",
      key: SECTIONS.BackupServer.en,
    },
    [SECTIONS.AGPSMode.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.AGPSMode.en],
      searchText: `${MENUS.Network.en} > ${SECTIONS.AGPSMode.en}`,
      tab: "Network",
      key: SECTIONS.AGPSMode.en,
    },
    [SECTIONS.MaintenanceServer.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.MaintenanceServer.en],
      searchText: `${MENUS.Network.en} > ${SECTIONS.MaintenanceServer.en}`,
      tab: "Network",
      key: SECTIONS.MaintenanceServer.en,
    },
    [SECTIONS.NTPServer.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.NTPServer.en],
      searchText: `${MENUS.Network.en} > ${SECTIONS.NTPServer.en}`,
      tab: "Network",
      key: SECTIONS.NTPServer.en,
    },
    [SECTIONS.Satellite.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Satellite.en],
      searchText: `${MENUS.Network.en} > ${SECTIONS.Satellite.en}`,
      tab: "Network",
      key: SECTIONS.Satellite.en,
    },
    [SECTIONS.JammingDetection.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.JammingDetection.en],
      searchText: `${MENUS.Network.en} > ${SECTIONS.JammingDetection.en}`,
      tab: "Network",
      key: SECTIONS.JammingDetection.en,
    },
    [SECTIONS.SMS.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.SMS.en],
      searchText: `${MENUS.Network.en} > ${SECTIONS.SMS.en}`,
      tab: "Network",
      key: SECTIONS.SMS.en,
    },
    [SECTIONS.Call.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Call.en],
      searchText: `${MENUS.Network.en} > ${SECTIONS.Call.en}`,
      tab: "Network",
      key: SECTIONS.Call.en,
    },
  },
  es: {
    [SECTIONS.Network.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Network.en],
      searchText: `${MENUS.Network.es} > ${SECTIONS.Network.es}`,
      tab: "Network",
      key: SECTIONS.Network.en,
    },
    [SECTIONS.APN.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.APN.en],
      searchText: `${MENUS.Network.es} > ${SECTIONS.APN.es}`,
      tab: "Network",
      key: SECTIONS.APN.en,
    },
    [SECTIONS.MainServer.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.MainServer.en],
      searchText: `${MENUS.Network.es} > ${SECTIONS.MainServer.es}`,
      tab: "Network",
      key: SECTIONS.MainServer.en,
    },
    [SECTIONS.BackupServer.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.BackupServer.en],
      searchText: `${MENUS.Network.es} > ${SECTIONS.BackupServer.es}`,
      tab: "Network",
      key: SECTIONS.BackupServer.en,
    },
    [SECTIONS.AGPSMode.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.AGPSMode.en],
      searchText: `${MENUS.Network.es} > ${SECTIONS.AGPSMode.es}`,
      tab: "Network",
      key: SECTIONS.AGPSMode.en,
    },
    [SECTIONS.MaintenanceServer.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.MaintenanceServer.en],
      searchText: `${MENUS.Network.es} > ${SECTIONS.MaintenanceServer.es}`,
      tab: "Network",
      key: SECTIONS.MaintenanceServer.en,
    },
    [SECTIONS.NTPServer.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.NTPServer.en],
      searchText: `${MENUS.Network.es} > ${SECTIONS.NTPServer.es}`,
      tab: "Network",
      key: SECTIONS.NTPServer.en,
    },
    [SECTIONS.Satellite.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Satellite.en],
      searchText: `${MENUS.Network.es} > ${SECTIONS.Satellite.es}`,
      tab: "Network",
      key: SECTIONS.Satellite.en,
    },
    [SECTIONS.JammingDetection.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.JammingDetection.en],
      searchText: `${MENUS.Network.es} > ${SECTIONS.JammingDetection.es}`,
      tab: "Network",
      key: SECTIONS.JammingDetection.en,
    },
    [SECTIONS.SMS.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.SMS.en],
      searchText: `${MENUS.Network.es} > ${SECTIONS.SMS.es}`,
      tab: "Network",
      key: SECTIONS.SMS.en,
    },
    [SECTIONS.Call.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Call.en],
      searchText: `${MENUS.Network.es} > ${SECTIONS.Call.es}`,
      tab: "Network",
      key: SECTIONS.Call.en,
    },
  },
  pt: {
    [SECTIONS.Network.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Network.en],
      searchText: `${MENUS.Network.pt} > ${SECTIONS.Network.pt}`,
      tab: "Network",
      key: SECTIONS.Network.en,
    },
    [SECTIONS.APN.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.APN.en],
      searchText: `${MENUS.Network.pt} > ${SECTIONS.APN.pt}`,
      tab: "Network",
      key: SECTIONS.APN.en,
    },
    [SECTIONS.MainServer.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.MainServer.en],
      searchText: `${MENUS.Network.pt} > ${SECTIONS.MainServer.pt}`,
      tab: "Network",
      key: SECTIONS.MainServer.en,
    },
    [SECTIONS.BackupServer.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.BackupServer.en],
      searchText: `${MENUS.Network.pt} > ${SECTIONS.BackupServer.pt}`,
      tab: "Network",
      key: SECTIONS.BackupServer.en,
    },
    [SECTIONS.AGPSMode.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.AGPSMode.en],
      searchText: `${MENUS.Network.pt} > ${SECTIONS.AGPSMode.pt}`,
      tab: "Network",
      key: SECTIONS.AGPSMode.en,
    },
    [SECTIONS.MaintenanceServer.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.MaintenanceServer.en],
      searchText: `${MENUS.Network.pt} > ${SECTIONS.MaintenanceServer.pt}`,
      tab: "Network",
      key: SECTIONS.MaintenanceServer.en,
    },
    [SECTIONS.NTPServer.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.NTPServer.en],
      searchText: `${MENUS.Network.pt} > ${SECTIONS.NTPServer.pt}`,
      tab: "Network",
      key: SECTIONS.NTPServer.en,
    },
    [SECTIONS.Satellite.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Satellite.en],
      searchText: `${MENUS.Network.pt} > ${SECTIONS.Satellite.pt}`,
      tab: "Network",
      key: SECTIONS.Satellite.en,
    },
    [SECTIONS.JammingDetection.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.JammingDetection.en],
      searchText: `${MENUS.Network.pt} > ${SECTIONS.JammingDetection.pt}`,
      tab: "Network",
      key: SECTIONS.JammingDetection.en,
    },
    [SECTIONS.SMS.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.SMS.en],
      searchText: `${MENUS.Network.pt} > ${SECTIONS.SMS.pt}`,
      tab: "Network",
      key: SECTIONS.SMS.en,
    },
    [SECTIONS.Call.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Call.en],
      searchText: `${MENUS.Network.pt} > ${SECTIONS.Call.pt}`,
      tab: "Network",
      key: SECTIONS.Call.en,
    },
  },
};

export const SYSTEM_SECTION: Record<Lang, Record<string, SearchField>> = {
  en: {
    [SECTIONS.Ignition.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Ignition.en],
      searchText: `${MENUS.System.en} > ${SECTIONS.Ignition.en}`,
      tab: "System",
      key: SECTIONS.Ignition.en,
    },
    [SECTIONS.BackupBattery.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.BackupBattery.en],
      searchText: `${MENUS.System.en} > ${SECTIONS.BackupBattery.en}`,
      tab: "System",
      key: SECTIONS.BackupBattery.en,
    },
    [SECTIONS.Device.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Device.en],
      searchText: `${MENUS.System.en} > ${SECTIONS.Device.en}`,
      tab: "System",
      key: SECTIONS.Device.en,
    },
    [SECTIONS.DriverPattern.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.DriverPattern.en],
      searchText: `${MENUS.System.en} > ${SECTIONS.DriverPattern.en}`,
      tab: "System",
      key: SECTIONS.DriverPattern.en,
    },
    [SECTIONS.McuUpdate.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.McuUpdate.en],
      searchText: `${MENUS.System.en} > ${SECTIONS.McuUpdate.en}`,
      tab: "System",
      key: SECTIONS.McuUpdate.en,
    },
    [SECTIONS.Motion.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Motion.en],
      searchText: `${MENUS.System.en} > ${SECTIONS.Motion.en}`,
      tab: "System",
      key: SECTIONS.Motion.en,
    },
    [SECTIONS.Password.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Password.en],
      searchText: `${MENUS.System.en} > ${SECTIONS.Password.en}`,
      tab: "System",
      key: SECTIONS.Password.en,
    },
    [SECTIONS.Power.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Power.en],
      searchText: `${MENUS.System.en} > ${SECTIONS.Power.en}`,
      tab: "System",
      key: SECTIONS.Power.en,
    },
    [SECTIONS.TdiOdometer.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.TdiOdometer.en],
      searchText: `${MENUS.System.en} > ${SECTIONS.TdiOdometer.en}`,
      tab: "System",
      key: SECTIONS.TdiOdometer.en,
    },
  },
  es: {
    [SECTIONS.Ignition.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Ignition.en],
      searchText: `${MENUS.System.es} > ${SECTIONS.Ignition.es}`,
      tab: "System",
      key: SECTIONS.Ignition.en,
    },
    [SECTIONS.BackupBattery.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.BackupBattery.en],
      searchText: `${MENUS.System.es} > ${SECTIONS.BackupBattery.es}`,
      tab: "System",
      key: SECTIONS.BackupBattery.en,
    },
    [SECTIONS.Device.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Device.en],
      searchText: `${MENUS.System.es} > ${SECTIONS.Device.es}`,
      tab: "System",
      key: SECTIONS.Device.en,
    },
    [SECTIONS.DriverPattern.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.DriverPattern.en],
      searchText: `${MENUS.System.es} > ${SECTIONS.DriverPattern.es}`,
      tab: "System",
      key: SECTIONS.DriverPattern.en,
    },
    [SECTIONS.McuUpdate.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.McuUpdate.en],
      searchText: `${MENUS.System.es} > ${SECTIONS.McuUpdate.es}`,
      tab: "System",
      key: SECTIONS.McuUpdate.en,
    },
    [SECTIONS.Motion.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Motion.en],
      searchText: `${MENUS.System.es} > ${SECTIONS.Motion.es}`,
      tab: "System",
      key: SECTIONS.Motion.en,
    },
    [SECTIONS.Password.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Password.en],
      searchText: `${MENUS.System.es} > ${SECTIONS.Password.es}`,
      tab: "System",
      key: SECTIONS.Password.en,
    },
    [SECTIONS.Power.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Power.en],
      searchText: `${MENUS.System.es} > ${SECTIONS.Power.es}`,
      tab: "System",
      key: SECTIONS.Power.en,
    },
    [SECTIONS.TdiOdometer.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.TdiOdometer.en],
      searchText: `${MENUS.System.es} > ${SECTIONS.TdiOdometer.es}`,
      tab: "System",
      key: SECTIONS.TdiOdometer.en,
    },
  },
  pt: {
    [SECTIONS.Ignition.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Ignition.en],
      searchText: `${MENUS.System.pt} > ${SECTIONS.Ignition.pt}`,
      tab: "System",
      key: SECTIONS.Ignition.en,
    },
    [SECTIONS.BackupBattery.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.BackupBattery.en],
      searchText: `${MENUS.System.pt} > ${SECTIONS.BackupBattery.pt}`,
      tab: "System",
      key: SECTIONS.BackupBattery.en,
    },
    [SECTIONS.Device.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Device.en],
      searchText: `${MENUS.System.pt} > ${SECTIONS.Device.pt}`,
      tab: "System",
      key: SECTIONS.Device.en,
    },
    [SECTIONS.DriverPattern.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.DriverPattern.en],
      searchText: `${MENUS.System.pt} > ${SECTIONS.DriverPattern.pt}`,
      tab: "System",
      key: SECTIONS.DriverPattern.en,
    },
    [SECTIONS.McuUpdate.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.McuUpdate.en],
      searchText: `${MENUS.System.pt} > ${SECTIONS.McuUpdate.pt}`,
      tab: "System",
      key: SECTIONS.McuUpdate.en,
    },
    [SECTIONS.Motion.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Motion.en],
      searchText: `${MENUS.System.pt} > ${SECTIONS.Motion.pt}`,
      tab: "System",
      key: SECTIONS.Motion.en,
    },
    [SECTIONS.Password.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Password.en],
      searchText: `${MENUS.System.pt} > ${SECTIONS.Password.pt}`,
      tab: "System",
      key: SECTIONS.Password.en,
    },
    [SECTIONS.Power.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Power.en],
      searchText: `${MENUS.System.pt} > ${SECTIONS.Power.pt}`,
      tab: "System",
      key: SECTIONS.Power.en,
    },
    [SECTIONS.TdiOdometer.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.TdiOdometer.en],
      searchText: `${MENUS.System.pt} > ${SECTIONS.TdiOdometer.pt}`,
      tab: "System",
      key: SECTIONS.TdiOdometer.en,
    },
  },
};

/**
 * 검색어 입력시(섹션 검색)
 *
 * 첫 페이지 렌더시 fields값 필터링하여 state로 관리
 * 검색 value를 사용해서 key값 조회 후 기기 데이터에 fields 값에 해당하는 값이 있는지 확인하여 있는 경우 검색에 searchText 노출
 * 클릭시 tab 이동 및 스크롤
 */
export const SEARCH_SECTION = {
  en: {
    ...NETWORK_SECTION.en,
    ...SYSTEM_SECTION.en,
  },
  es: {
    ...NETWORK_SECTION.es,
    ...SYSTEM_SECTION.es,
  },
  pt: {
    ...NETWORK_SECTION.pt,
    ...SYSTEM_SECTION.pt,
  },
};

export const formDataToSearchSectionData = (
  formData: {
    [key: string]: FormField;
  },
  lang: Lang
) => {
  return Object.entries(SEARCH_SECTION[lang]).reduce((acc, [key, value]) => {
    const fields = value.fields;
    const searchText = value.searchText;
    const tab = value.tab;
    const valueKey = value.key;

    console.log("value :::", value);
    console.log("lang :::", lang);
    console.log("fields :::", fields);
    console.log("SEARCH_SECTION[lang] :::", SEARCH_SECTION[lang]);
    console.log("formData :::", formData);

    acc[key] = {
      fields: fields.filter((f) => Object.keys(formData).includes(f)),
      searchText,
      tab,
      key: valueKey,
    };

    return acc;
  }, {});
};

/**
 * 검색어 입력시(필드 검색)
 *
 */
export const SEARCH_FIELD = {};
