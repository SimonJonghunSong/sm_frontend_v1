import { Lang } from "@/utils/useLangStore";
import AlertConfig1 from "app/(auth)/device-info/(report)/AlertConfig1";
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

  // Report
  AlertConfig: {
    en: "Alert Config",
    es: "Configuración de Alertas",
    pt: "Configuração de Alertas",
  },
  AlertConfig1: {
    en: "Alert Config 1",
    es: "Configuración de Alertas 1",
    pt: "Configuração de Alertas 1",
  },
  AlertConfig2: {
    en: "Alert Config 2",
    es: "Configuración de Alertas 2",
    pt: "Configuração de Alertas 2",
  },
  AntiTheft: {
    en: "Anti Theft",
    es: "Antiterrorismo",
    pt: "Antiterrorismo",
  },
  OBD: {
    en: "OBD",
    es: "OBD",
    pt: "OBD",
  },
  ObdPid: {
    en: "OBD PID",
    es: "PID OBD",
    pt: "PID OBD",
  },
  Report: {
    en: "Report",
    es: "Reporte",
    pt: "Relatório",
  },
  ReportSchdule: {
    en: "Report Schedule",
    es: "Programación de Reporte",
    pt: "Programação de Relatório",
  },

  // Accessories
  Accessories: {
    en: "Accessories",
    es: "Accesorios",
    pt: "Acessórios",
  },
  MDSM7: {
    en: "MDSM-7",
    es: "MDSM-7",
    pt: "MDSM-7",
  },
  SerialRs232: {
    en: "Serial RS232",
    es: "RS232",
    pt: "RS232",
  },
  WireSettings: {
    en: "Wire Settings",
    es: "Configuración de Cable",
    pt: "Configuração de Cabo",
  },

  // Input/Output
  InputOutput: {
    en: "Input/Output",
    es: "Entrada/Salida",
    pt: "Entrada/Saída",
  },
};

const alertConfig1Fields = [
  "1300",
  "1301",
  "1302",
  "1304",
  "1306",
  "1308",
  "1311",
  "1313",
  "1314",
  "1321",
  "1325",
  "1326",
  "1328",
  "1329",
  "1330",
  "1331",
  "1332",
  "1333",
  "1334",
  "1335",
  "1336",
  "1337",
  "1338",
  "1339",
  "1340",
  "1340",
  "1341",
  "1342",
  "1350",
  "1351",
  "1352",
  "1354",
  "1355",
  "1356",
  "1357",
  "1360",
  "1365",
  "1366",
  "1367",
  "1368",
  "1371",
  "1372",
  "1373",
  "1377",
];

const alertConfig2Fields = [
  "1400",
  "1401",
  "1402",
  "1403",
  "1404",
  "1405",
  "1406",
  "1407",
  "1413",
  "1414",
  "1415",
  "1416",
  "1417",
  "1418",
  "1419",
  "1420",
  "1421",
  "1422",
  "1423",
  "1424",
  "1425",
  "1426",
  "1427",
  "1428",
  "1429",
  "1430",
  "1431",
  "1432",
  "1433",
  "1434",
  "1435",
  "1437",
  "1438",
  "1443",
  "1444",
  "1445",
  "1446",
  "1447",
  "1453",
  "1454",
  "1455",
  "1456",
  "1457",
  "1458",
  "1459",
  "1460",
  "1461",
  "1462",
  "1463",
  "1464",
  "1465",
  "1466",
  "1467",
  "1468",
  "1469",
  "1471",
  "1472",
  "1473",
  "1474",
  "1475",
  "1476",
  "1477",
  "1478",
  "1481",
];

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

  // Report
  [SECTIONS.AlertConfig.en]: [...alertConfig1Fields, ...alertConfig2Fields],
  [SECTIONS.AlertConfig1.en]: alertConfig1Fields,
  [SECTIONS.AlertConfig2.en]: alertConfig2Fields,
  [SECTIONS.AntiTheft.en]: ["1050", "1051"],
  [SECTIONS.OBD.en]: ["2000", "2002"],
  [SECTIONS.ObdPid.en]: [
    "2100",
    "2101",
    "2102",
    "2103",
    "2104",
    "2105",
    "2106",
    "2107",
    "2108",
    "2109",
    "2110",
    "2111",
    "2112",
    "2113",
    "2114",
    "2115",
    "2116",
    "2117",
    "2118",
    "2119",
    "2120",
    "2121",
    "2122",
    "2123",
    "2124",
    "2125",
    "2126",
    "2127",
    "2128",
    "2129",
    "2130",
    "2131",
    "2132",
    "2133",
    "2134",
    "2135",
    "2136",
    "2137",
    "2138",
    "2139",
    "2140",
    "2141",
    "2142",
    "2143",
    "2144",
    "2145",
    "2146",
    "2147",
    "2148",
    "2149",
    "2150",
    "2151",
    "2152",
    "2153",
    "2154",
    "2155",
    "2156",
    "2157",
    "2158",
    "2159",
  ],
  [SECTIONS.Report.en]: [
    "1055",
    "1058",
    "1064",
    "1069",
    "1072",
    "1073",
    "1074",
    "1075",
    "1079",
    "1097",
    "1099",
  ],
  [SECTIONS.ReportSchdule.en]: [
    "1637",
    "1638", // TODO
    "1639", // TODO
    "1640",
    "1649", // TODO
    "1650", // TODO
    "1651", // TODO
    "1652", // TODO
    "1653",
    "1655", // TODO
    "1656",
  ],

  // Accessories
  [SECTIONS.Accessories.en]: [
    "0610",
    "2300",
    "2301",
    "2302",
    "2303",
    "2304",
    "2305",
    "2306",
    "2307",
    "2308",
    "2309",
    "2310",
    "2311",
    "2312",
    "2313",
    "2314",
    "2315",
    "2316",
    "2330",
    "2331",
    "2332",
    "2333",
    "2334",
    "2336",
  ],
  [SECTIONS.MDSM7.en]: [
    "2350",
    "2351",
    "2352",
    "2353",
    "2355",
    "2354",
    "2356",
    "2357",
    "2359",
    "2358",
    "2360",
    "2361",
    "2363",
    "2362",
    "2364",
    "2365",
    "2367",
    "2366",
    "2368",
    "2371",
    "2370",
    "2372",
  ],
  [SECTIONS.SerialRs232.en]: ["1950", "1951", "1956", "1957", "1958"],
  [SECTIONS.WireSettings.en]: [
    "1970",
    "1971",
    "1972",
    "1973",
    "1974",
    "1975",
    "1999",
    "1981",
    "1982",
    "1983",
    "1984",
    "1985",
    "1986",
    "1987",
    "1988",
    "1989",
    "1990",
    "1991",
    "1992",
    "1993",
    "1994",
    "1995",
    "1996",
    "1997",
    "1998",
    "2313",
    "2350",
  ],

  // Input/Output
  [SECTIONS.InputOutput.en]: [
    "1720", // Input 1 Type
    "1721", // Input 1 Chat
    "1722", // Input 2 Type
    "1723", // Input 2 Chat
    "1724", // Input 3 Type
    "1725", // Input 3 Chat
    "1726", // Input 4 Type
    "1727", // Input 4 Chat

    "1760", // Output 1 Type
    "1761", // Output 1 Active
    "1762", // Output 2 Type
    "1763", // Output 2 Active
    "1764", // Output 3 Type
    "1765", // Output 3 Active
    "1766", // Output 4 Type
    "1767", // Output 4 Active

    "1775", // Pulse 1 Number
    "1776", // Pulse 1 On
    "1777", // Pulse 1 Off

    "1780", // Pulse 2 Number
    "1781", // Pulse 2 On
    "1782", // Pulse 2 Off

    "1783", // Pulse 3 Number
    "1784", // Pulse 3 On
    "1785", // Pulse 3 Off
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

export const REPORT_SECTION: Record<Lang, Record<string, SearchField>> = {
  en: {
    [SECTIONS.AlertConfig.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.AlertConfig.en],
      searchText: `${MENUS.Report.en} > ${SECTIONS.AlertConfig.en}`,
      tab: "Report",
      key: SECTIONS.AlertConfig.en,
    },
    [SECTIONS.AntiTheft.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.AntiTheft.en],
      searchText: `${MENUS.Report.en} > ${SECTIONS.AntiTheft.en}`,
      tab: "Report",
      key: SECTIONS.AntiTheft.en,
    },
    [SECTIONS.OBD.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.OBD.en],
      searchText: `${MENUS.Report.en} > ${SECTIONS.OBD.en}`,
      tab: "Report",
      key: SECTIONS.OBD.en,
    },
    [SECTIONS.ObdPid.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.ObdPid.en],
      searchText: `${MENUS.Report.en} > ${SECTIONS.ObdPid.en}`,
      tab: "Report",
      key: SECTIONS.ObdPid.en,
    },
    [SECTIONS.Report.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Report.en],
      searchText: `${MENUS.Report.en} > ${SECTIONS.Report.en}`,
      tab: "Report",
      key: SECTIONS.Report.en,
    },
    [SECTIONS.ReportSchdule.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.ReportSchdule.en],
      searchText: `${MENUS.Report.en} > ${SECTIONS.ReportSchdule.en}`,
      tab: "Report",
      key: SECTIONS.ReportSchdule.en,
    },
  },
  es: {
    [SECTIONS.AlertConfig.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.AlertConfig.en],
      searchText: `${MENUS.Report.es} > ${SECTIONS.AlertConfig.es}`,
      tab: "Report",
      key: SECTIONS.AlertConfig.en,
    },
    [SECTIONS.AntiTheft.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.AntiTheft.en],
      searchText: `${MENUS.Report.es} > ${SECTIONS.AntiTheft.es}`,
      tab: "Report",
      key: SECTIONS.AntiTheft.en,
    },
    [SECTIONS.OBD.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.OBD.en],
      searchText: `${MENUS.Report.es} > ${SECTIONS.OBD.es}`,
      tab: "Report",
      key: SECTIONS.OBD.en,
    },
    [SECTIONS.ObdPid.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.ObdPid.en],
      searchText: `${MENUS.Report.es} > ${SECTIONS.ObdPid.es}`,
      tab: "Report",
      key: SECTIONS.ObdPid.en,
    },
    [SECTIONS.Report.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Report.en],
      searchText: `${MENUS.Report.es} > ${SECTIONS.Report.es}`,
      tab: "Report",
      key: SECTIONS.Report.en,
    },
    [SECTIONS.ReportSchdule.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.ReportSchdule.en],
      searchText: `${MENUS.Report.es} > ${SECTIONS.ReportSchdule.es}`,
      tab: "Report",
      key: SECTIONS.ReportSchdule.en,
    },
  },
  pt: {
    [SECTIONS.AlertConfig.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.AlertConfig.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.AlertConfig.pt}`,
      tab: "Report",
      key: SECTIONS.AlertConfig.en,
    },
    [SECTIONS.AlertConfig1.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.AlertConfig1.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.AlertConfig1.pt}`,
      tab: "Report",
      key: SECTIONS.AlertConfig1.en,
    },
    [SECTIONS.AlertConfig2.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.AlertConfig2.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.AlertConfig2.pt}`,
      tab: "Report",
      key: SECTIONS.AlertConfig2.en,
    },
    [SECTIONS.AntiTheft.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.AntiTheft.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.AntiTheft.pt}`,
      tab: "Report",
      key: SECTIONS.AntiTheft.en,
    },
    [SECTIONS.OBD.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.OBD.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.OBD.pt}`,
      tab: "Report",
      key: SECTIONS.OBD.en,
    },
    [SECTIONS.ObdPid.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.ObdPid.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.ObdPid.pt}`,
      tab: "Report",
      key: SECTIONS.ObdPid.en,
    },
    [SECTIONS.Report.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Report.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.Report.pt}`,
      tab: "Report",
      key: SECTIONS.Report.en,
    },
    [SECTIONS.ReportSchdule.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.ReportSchdule.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.ReportSchdule.pt}`,
      tab: "Report",
      key: SECTIONS.ReportSchdule.en,
    },
  },
};

export const ACCESSORIES_SECTION: Record<Lang, Record<string, SearchField>> = {
  en: {
    [SECTIONS.Accessories.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Accessories.en],
      searchText: `${MENUS.Accessories.en} > ${SECTIONS.Accessories.en}`,
      tab: "Accessories",
      key: SECTIONS.Accessories.en,
    },
    [SECTIONS.MDSM7.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.MDSM7.en],
      searchText: `${MENUS.Accessories.en} > ${SECTIONS.MDSM7.en}`,
      tab: "Accessories",
      key: SECTIONS.MDSM7.en,
    },
    [SECTIONS.SerialRs232.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.SerialRs232.en],
      searchText: `${MENUS.Accessories.en} > ${SECTIONS.SerialRs232.en}`,
      tab: "Accessories",
      key: SECTIONS.SerialRs232.en,
    },
    [SECTIONS.WireSettings.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.WireSettings.en],
      searchText: `${MENUS.Accessories.en} > ${SECTIONS.WireSettings.en}`,
      tab: "Accessories",
      key: SECTIONS.WireSettings.en,
    },
  },
  es: {
    [SECTIONS.Accessories.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Accessories.en],
      searchText: `${MENUS.Accessories.es} > ${SECTIONS.Accessories.es}`,
      tab: "Accessories",
      key: SECTIONS.Accessories.en,
    },
    [SECTIONS.MDSM7.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.MDSM7.en],
      searchText: `${MENUS.Accessories.es} > ${SECTIONS.MDSM7.es}`,
      tab: "Accessories",
      key: SECTIONS.MDSM7.en,
    },
    [SECTIONS.SerialRs232.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.SerialRs232.en],
      searchText: `${MENUS.Accessories.es} > ${SECTIONS.SerialRs232.es}`,
      tab: "Accessories",
      key: SECTIONS.SerialRs232.en,
    },
    [SECTIONS.WireSettings.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.WireSettings.en],
      searchText: `${MENUS.Accessories.es} > ${SECTIONS.WireSettings.es}`,
      tab: "Accessories",
      key: SECTIONS.WireSettings.en,
    },
  },
  pt: {
    [SECTIONS.Accessories.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Accessories.en],
      searchText: `${MENUS.Accessories.pt} > ${SECTIONS.Accessories.pt}`,
      tab: "Accessories",
      key: SECTIONS.Accessories.en,
    },
    [SECTIONS.MDSM7.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.MDSM7.en],
      searchText: `${MENUS.Accessories.pt} > ${SECTIONS.MDSM7.pt}`,
      tab: "Accessories",
      key: SECTIONS.MDSM7.en,
    },
    [SECTIONS.SerialRs232.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.SerialRs232.en],
      searchText: `${MENUS.Accessories.pt} > ${SECTIONS.SerialRs232.pt}`,
      tab: "Accessories",
      key: SECTIONS.SerialRs232.en,
    },
    [SECTIONS.WireSettings.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.WireSettings.en],
      searchText: `${MENUS.Accessories.pt} > ${SECTIONS.WireSettings.pt}`,
      tab: "Accessories",
      key: SECTIONS.WireSettings.en,
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
    ...REPORT_SECTION.en,
    ...ACCESSORIES_SECTION.en,
  },
  es: {
    ...NETWORK_SECTION.es,
    ...SYSTEM_SECTION.es,
    ...REPORT_SECTION.es,
    ...ACCESSORIES_SECTION.es,
  },
  pt: {
    ...NETWORK_SECTION.pt,
    ...SYSTEM_SECTION.pt,
    ...REPORT_SECTION.pt,
    ...ACCESSORIES_SECTION.pt,
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
