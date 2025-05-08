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
};

export const INCLUDE_FIELDS = {
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
  },
  es: {
    ...NETWORK_SECTION.es,
  },
  pt: {
    ...NETWORK_SECTION.pt,
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
