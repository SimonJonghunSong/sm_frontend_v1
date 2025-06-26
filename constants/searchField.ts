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
  Geofence: {
    en: "Geofence",
    es: "Geocerca",
    pt: "Geofence",
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
    pt: "Parâmetros de tensão",
  },
  TdiOdometer: {
    en: "Tdi Odometer",
    es: "Odómetro TDI",
    pt: "Odômetro TDI",
  },

  // Report
  AssignHeader: {
    en: "Assign Header",
    es: "Encabezado de Asignación",
    pt: "Cabeçalho de Atribuição",
  },
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
  OBDPID: {
    en: "OBD PID",
    es: "PID OBD",
    pt: "PID OBD",
  },
  Report: {
    en: "Report",
    es: "Reporte",
    pt: "Relatório",
  },
  ReportMapping: {
    en: "Report Mapping",
    es: "Mapa de Reporte",
    pt: "Mapa de Relatório",
  },
  ReportMapping2: {
    en: "Report Mapping2",
    es: "Mapa de Reporte2",
    pt: "Mapa de Relatório2",
  },
  ReportSchedule: {
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
    en: "1-Wire Settings",
    es: "Configuración 1-Wire",
    pt: "Configurações 1-Wire",
  },

  // Input/Output
  "Input/Output": {
    en: "Input/Output",
    es: "Entrada/Salida",
    pt: "Entrada/Saída",
  },

  // Geofence
  GeofenceConfig: {
    en: "Geofence Config",
    es: "Configuración de Geocerca",
    pt: "Configuração de Geofence",
  },
  Geofence: {
    en: "Geofence",
    es: "Geocerca",
    pt: "Geofence",
  },

  // Tracking
  DisconnectMode: {
    en: "Disconnect Mode",
    es: "Modo de Desconexión",
    pt: "Modo de Desconexão",
  },
  DriveMode: {
    en: "Drive Mode",
    es: "Modo de Conducción",
    pt: "Modo de Condução",
  },
  FineTracking: {
    en: "Fine Tracking",
    es: "Rastreo Fino",
    pt: "Rastreamento Fino",
  },
  IdleMode: {
    en: "Idle Mode",
    es: "Modo de Inactividad",
    pt: "Modo de Inatividade",
  },
  InstallMode: {
    en: "Install Mode",
    es: "Modo de Instalación",
    pt: "Modo de Instalação",
  },
  ModeSettings: {
    en: "Mode Settings",
    es: "Configuración de Modo",
    pt: "Configuração de Modo",
  },
  OperationMode: {
    en: "Operation Mode",
    es: "Modo de Operación",
    pt: "Modo de Operação",
  },
  ParkMode: {
    en: "Park Mode",
    es: "Modo de Estacionamiento",
    pt: "Modo de Estacionamento",
  },
  SpeedingMode: {
    en: "Speeding Mode",
    es: "Modo de Velocidad",
    pt: "Modo de Velocidade",
  },
  TowingMode: {
    en: "Towing Mode",
    es: "Modo de Reboque",
    pt: "Modo de Remolque",
  },

  // Driver
  Driver: {
    en: "Driver",
    es: "Conductor",
    pt: "Motorista",
  },

  // Bluetooth
  Ble: {
    en: "Bluetooth",
    es: "Bluetooth",
    pt: "Bluetooth",
  },
  BleRegistration: {
    en: "BLE Registration",
    es: "Registro BLE",
    pt: "Registro BLE",
  },
  Sensor: {
    en: "Sensor",
    es: "Sensor",
    pt: "Sensor",
  },

  // RF
  ErbList: {
    en: "Erb List",
    es: "Lista de Erb",
    pt: "Lista de Erb",
  },
  LoRaWAN: {
    en: "LoRaWAN",
    es: "LoRaWAN",
    pt: "LoRaWAN",
  },
  PresenceDevice: {
    en: "Presence Device",
    es: "Dispositivo de Presencia",
    pt: "Dispositivo de Presença",
  },
  PresenceFunction: {
    en: "Presence Function",
    es: "Función de Presencia",
    pt: "Função de Presença",
  },
  Rf: {
    en: "RF",
    es: "RF",
    pt: "RF",
  },

  // NetworkCommands
  NetworkCommands: {
    en: "Network Commands",
    es: "Comandos de Red",
    pt: "Comandos de Rede",
  },
  SystemCommands: {
    en: "System Commands",
    es: "Comandos del Sistema",
    pt: "Comandos do Sistema",
  },
  JammingDetectionCommands: {
    en: "Jamming Detection Commands",
    es: "Comandos de Detección de Interferencia",
    pt: "Comandos de Detecção de Interferência",
  },
  ReportCommands: {
    en: "Report Commands",
    es: "Comandos de Reporte",
    pt: "Comandos de Relatório",
  },
  TrackingCommands: {
    en: "Tracking Commands",
    es: "Comandos de Rastreo",
    pt: "Comandos de Rastreamento",
  },
  "I/OCommands": {
    en: "I/O Commands",
    es: "Comandos de Entrada/Salida",
    pt: "Comandos de Entrada/Saída",
  },
  GeofenceCommands: {
    en: "Geofence Commands",
    es: "Comandos de Geocerca",
    pt: "Comandos de Geofence",
  },
  BleCommands: {
    en: "BLE Commands",
    es: "Comandos de Bluetooth",
    pt: "Comandos de Bluetooth",
  },
  AccessoryCommands: {
    en: "Accessory Commands",
    es: "Comandos de Accesorios",
    pt: "Comandos de Acessórios",
  },
  RfCommands: {
    en: "RF Commands",
    es: "Comandos de RF",
    pt: "Comandos de RF",
  },

  // DeviceStatus
  DeviceInformation: {
    en: "Device Information",
    es: "Información del Dispositivo",
    pt: "Informações do Dispositivo",
  },
  GNSSInformation: {
    en: "GNSS Information",
    es: "Información de GNSS",
    pt: "Informações de GNSS",
  },
  CellularInformation: {
    en: "Cellular Information",
    es: "Información de Celular",
    pt: "Informações de Celular",
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
export const modeSettingsFieldsWithUnderbar = [
  "1670",
  "1673",
  "1676",
  "1679",
  "1685",
  "1688",
  "1682",
  "1697",
  "1681",
  "1684",
];
export const modeSettingsFieldsWithoutUnderbar = [
  "1670",
  "1671",
  "1672",
  "1673",
  "1674",
  "1675",
  "1676",
  "1677",
  "1678",
  "1679",
  "1680",
  "1681",
  "1682",
  "1683",
  "1684",
  "1685",
  "1686",
  "1687",
  "1078",
];

const INCLUDE_FIELDS_NETWORK = {
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
  [SECTIONS.BackupServer.en]: ["1008", "1009", "1010", "1017", "1018", "1019"],
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

const INCLUDE_FIELDS_SYSTEM = {
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

const INCLUDE_FIELDS_REPORT = {
  [SECTIONS.AssignHeader.en]: ["1100", "1075"],
  [SECTIONS.AlertConfig1.en]: alertConfig1Fields,
  [SECTIONS.AlertConfig2.en]: alertConfig2Fields,
  [SECTIONS.AlertConfig.en]: [...alertConfig1Fields, ...alertConfig2Fields],
  [SECTIONS.AntiTheft.en]: ["1050", "1051"],
  [SECTIONS.OBD.en]: [
    "2000",
    "2002",
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
    "2014",
  ],
  [SECTIONS.OBDPID.en]: [
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
  [SECTIONS.ReportMapping.en]: [
    "1080",
    "1082",
    "1084",
    "1086",
    "1087",
    "1088",
    "1089",
    "1090",
    "1091",
    "1092",
    "1093",
    "1094",
    "1095",
    "1096",
  ],
  [SECTIONS.ReportMapping2.en]: ["3100", "3101", "3103", "2598"],
  [SECTIONS.ReportSchedule.en]: [
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
};

const INCLUDE_FIELDS_ACCESSORIES = {
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
    "1980",
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
};

const INCLUDE_FIELDS_INPUT_OUTPUT = {
  [SECTIONS["Input/Output"].en]: [
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
    "1786",
  ],
};

const INCLUDE_FIELDS_GEOFENCE = {
  [SECTIONS.GeofenceConfig.en]: ["9000", "9001", "9002"],
};

const INCLUDE_FIELDS_TRACKING = {
  [SECTIONS.DisconnectMode.en]: ["1641"],
  [SECTIONS.DriveMode.en]: ["1600", "1601"],
  [SECTIONS.FineTracking.en]: ["3010", "3011", "3012"],
  [SECTIONS.IdleMode.en]: [
    "1610",
    "1611",
    "1612",
    "1613",
    "1614",
    "1615",
    "1616",
    "1617",
  ],
  [SECTIONS.InstallMode.en]: ["1602", "1603"],
  [SECTIONS.ModeSettings.en]: [
    ...modeSettingsFieldsWithUnderbar,
    ...modeSettingsFieldsWithoutUnderbar,
  ],
  [SECTIONS.OperationMode.en]: ["1698"],
  [SECTIONS.ParkMode.en]: ["1605", "1606"],
  [SECTIONS.SpeedingMode.en]: ["1620", "1621", "1622", "1623", "1624", "1625"],
  [SECTIONS.TowingMode.en]: ["1636"],
};

const INCLUDE_FIELDS_DRIVER = {
  [SECTIONS.Driver.en]: [],
};

const INCLUDE_FIELDS_BLUETOOTH = {
  [SECTIONS.Ble.en]: [
    "4020",
    "4021",
    "4000",
    "4028",
    "4025",
    "4010",
    "4011",
    "4012",
    "4013",
    "4014",
    "4026",
    "4027",
  ],
  [SECTIONS.BleRegistration.en]: [],
  [SECTIONS.Sensor.en]: [
    "2610",
    "2611",
    "2612",
    "2613",
    "2614",
    "2615",
    "2616",
    "2617",
    "2618",
    "2619",
    "2620",
    "2621",
  ],
};

const INCLUDE_FIELDS_RF = {
  [SECTIONS.ErbList.en]: [
    "2511",
    "2512",
    "2513",
    "2514",
    "2515",
    "2516",
    "2517",
    "2518",
    "2519",
    "2520",
    "2521",
    "2522",
    "2523",
    "2524",
    "2525",
    "2526",
    "2527",
    "2528",
    "2529",
    "2530",
    "2531",
    "2532",
    "2533",
    "2534",
    "2535",
    "2536",
    "2537",
    "2538",
    "2539",
    "2540",
    "2541",
    "2542",
    "2543",
    "2544",
    "2545",
    "2546",
    "2547",
    "2548",
    "2549",
    "2550",
    "2551",
    "2552",
    "2553",
    "2554",
    "2555",
    "2556",
    "2557",
    "2558",
    "2559",
    "2560",
  ],
  [SECTIONS.LoRaWAN.en]: [
    "2581",
    "2582",
    "2583",
    "2584",
    "2585",
    "2586",
    "2587",
    "2588",
    "2589",
    "2590",
    "2591",
    "2592",
    "2593",
    "2594",
    "2570",
    "2595",
    "2596",
    "2597",
  ],
  [SECTIONS.PresenceDevice.en]: [
    "2571",
    "2572",
    "2573",
    "2574",
    "2575",
    "2576",
    "2577",
    "2578",
    "2579",
    "2580",
  ],
  [SECTIONS.PresenceFunction.en]: [
    "2561",
    "2563",
    "2562",
    "2564",
    "2565",
    "2566",
    "2567",
    "2568",
    "2569",
    "1642",
  ],
  [SECTIONS.Rf.en]: [
    "2500",
    "2501",
    "2502",
    "2505",
    "2503",
    "2504",
    "2800",
    "2801",
    "2802",
    "2803",
    "2804",
    "2805",
    "2806",
    "2808",
    "2809",
    "2810",
    "2506",
    "2507",
    "2508",
    "2510",
  ],
};

const INCLUDE_FIELDS_COMMANDS = {
  [SECTIONS.NetworkCommands.en]: [],
  [SECTIONS.SystemCommands.en]: [],
  [SECTIONS.JammingDetectionCommands.en]: [],
  [SECTIONS.ReportCommands.en]: [],
  [SECTIONS.TrackingCommands.en]: [],
  [SECTIONS["I/OCommands"].en]: [],
  [SECTIONS.GeofenceCommands.en]: [],
  [SECTIONS.BleCommands.en]: [],
  [SECTIONS.AccessoryCommands.en]: [],
};

export const INCLUDE_FIELDS = {
  // Network
  ...INCLUDE_FIELDS_NETWORK,

  // System
  ...INCLUDE_FIELDS_SYSTEM,

  // Report
  ...INCLUDE_FIELDS_REPORT,

  // Accessories
  ...INCLUDE_FIELDS_ACCESSORIES,

  // Input/Output
  ...INCLUDE_FIELDS_INPUT_OUTPUT,

  // Geofence
  ...INCLUDE_FIELDS_GEOFENCE,

  // Tracking
  ...INCLUDE_FIELDS_TRACKING,

  // Driver
  ...INCLUDE_FIELDS_DRIVER,

  // Bluetooth
  ...INCLUDE_FIELDS_BLUETOOTH,

  // RF
  ...INCLUDE_FIELDS_RF,

  // NetworkCommands
  ...INCLUDE_FIELDS_COMMANDS,
};

export const INCLUDE_SECTIONS = {
  [MENUS.Network.en]: Object.values(INCLUDE_FIELDS_NETWORK).reduce(
    (acc, value) => {
      return [...acc, ...value];
    },
    []
  ),
  [MENUS.System.en]: Object.values(INCLUDE_FIELDS_SYSTEM).reduce(
    (acc, value) => {
      return [...acc, ...value];
    },
    []
  ),
  [MENUS.Report.en]: Object.values(INCLUDE_FIELDS_REPORT).reduce(
    (acc, value) => {
      return [...acc, ...value];
    },
    []
  ),
  [MENUS.Accessories.en]: Object.values(INCLUDE_FIELDS_ACCESSORIES).reduce(
    (acc, value) => {
      return [...acc, ...value];
    },
    []
  ),
  [MENUS["Input/Output(I/O)"].en]: Object.values(
    INCLUDE_FIELDS_INPUT_OUTPUT
  ).reduce((acc, value) => {
    return [...acc, ...value];
  }, []),
  [MENUS.Tracking.en]: Object.values(INCLUDE_FIELDS_TRACKING).reduce(
    (acc, value) => {
      return [...acc, ...value];
    },
    []
  ),
  [MENUS.Driver.en]: Object.values(INCLUDE_FIELDS_DRIVER).reduce(
    (acc, value) => {
      return [...acc, ...value];
    },
    []
  ),
  [MENUS.Bluetooth.en]: Object.values(INCLUDE_FIELDS_BLUETOOTH).reduce(
    (acc, value) => {
      return [...acc, ...value];
    },
    []
  ),
  [MENUS.RF.en]: Object.values(INCLUDE_FIELDS_RF).reduce((acc, value) => {
    return [...acc, ...value];
  }, []),
};

console.log("INCLUDE_SECTIONS :::", INCLUDE_SECTIONS);

export type SearchFields = {
  fields: (typeof INCLUDE_FIELDS)[keyof typeof INCLUDE_FIELDS];
  searchText: string;
  tab: string;
  key: string;
};
export type SearchField = {
  field: string;
  searchText: string;
  tab: string;
  key: string;
};

export const NETWORK_SECTION: Record<Lang, Record<string, SearchFields>> = {
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

export const SYSTEM_SECTION: Record<Lang, Record<string, SearchFields>> = {
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

export const REPORT_SECTION: Record<Lang, Record<string, SearchFields>> = {
  en: {
    [SECTIONS.AssignHeader.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.AssignHeader.en],
      searchText: `${MENUS.Report.en} > ${SECTIONS.AssignHeader.en}`,
      tab: "Report",
      key: SECTIONS.AssignHeader.en,
    },
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
    [SECTIONS.OBDPID.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.OBDPID.en],
      searchText: `${MENUS.Report.en} > ${SECTIONS.OBDPID.en}`,
      tab: "Report",
      key: SECTIONS.OBDPID.en,
    },
    [SECTIONS.Report.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Report.en],
      searchText: `${MENUS.Report.en} > ${SECTIONS.Report.en}`,
      tab: "Report",
      key: SECTIONS.Report.en,
    },
    [SECTIONS.ReportMapping.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.ReportMapping.en],
      searchText: `${MENUS.Report.en} > ${SECTIONS.ReportMapping.en}`,
      tab: "Report",
      key: SECTIONS.ReportMapping.en,
    },
    [SECTIONS.ReportMapping2.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.ReportMapping2.en],
      searchText: `${MENUS.Report.en} > ${SECTIONS.ReportMapping2.en}`,
      tab: "Report",
      key: SECTIONS.ReportMapping2.en,
    },
    [SECTIONS.ReportSchedule.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.ReportSchedule.en],
      searchText: `${MENUS.Report.en} > ${SECTIONS.ReportSchedule.en}`,
      tab: "Report",
      key: SECTIONS.ReportSchedule.en,
    },
  },
  es: {
    [SECTIONS.AssignHeader.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.AssignHeader.en],
      searchText: `${MENUS.Report.es} > ${SECTIONS.AssignHeader.es}`,
      tab: "Report",
      key: SECTIONS.AssignHeader.en,
    },
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
    [SECTIONS.OBDPID.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.OBDPID.en],
      searchText: `${MENUS.Report.es} > ${SECTIONS.OBDPID.es}`,
      tab: "Report",
      key: SECTIONS.OBDPID.en,
    },
    [SECTIONS.Report.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Report.en],
      searchText: `${MENUS.Report.es} > ${SECTIONS.Report.es}`,
      tab: "Report",
      key: SECTIONS.Report.en,
    },
    [SECTIONS.ReportMapping.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.ReportMapping.en],
      searchText: `${MENUS.Report.es} > ${SECTIONS.ReportMapping.es}`,
      tab: "Report",
      key: SECTIONS.ReportMapping.en,
    },
    [SECTIONS.ReportMapping2.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.ReportMapping2.en],
      searchText: `${MENUS.Report.es} > ${SECTIONS.ReportMapping2.es}`,
      tab: "Report",
      key: SECTIONS.ReportMapping2.en,
    },
    [SECTIONS.ReportSchedule.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.ReportSchedule.en],
      searchText: `${MENUS.Report.es} > ${SECTIONS.ReportSchedule.es}`,
      tab: "Report",
      key: SECTIONS.ReportSchedule.en,
    },
  },
  pt: {
    [SECTIONS.AssignHeader.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.AssignHeader.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.AssignHeader.pt}`,
      tab: "Report",
      key: SECTIONS.AssignHeader.en,
    },
    [SECTIONS.AlertConfig.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.AlertConfig.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.AlertConfig.pt}`,
      tab: "Report",
      key: SECTIONS.AlertConfig.en,
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
    [SECTIONS.OBDPID.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.OBDPID.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.OBDPID.pt}`,
      tab: "Report",
      key: SECTIONS.OBDPID.en,
    },
    [SECTIONS.Report.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Report.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.Report.pt}`,
      tab: "Report",
      key: SECTIONS.Report.en,
    },
    [SECTIONS.ReportMapping.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.ReportMapping.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.ReportMapping.pt}`,
      tab: "Report",
      key: SECTIONS.ReportMapping.en,
    },
    [SECTIONS.ReportMapping2.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.ReportMapping2.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.ReportMapping2.pt}`,
      tab: "Report",
      key: SECTIONS.ReportMapping2.en,
    },
    [SECTIONS.ReportSchedule.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.ReportSchedule.en],
      searchText: `${MENUS.Report.pt} > ${SECTIONS.ReportSchedule.pt}`,
      tab: "Report",
      key: SECTIONS.ReportSchedule.en,
    },
  },
};

export const ACCESSORIES_SECTION: Record<Lang, Record<string, SearchFields>> = {
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

export const TRACKING_SECTION: Record<Lang, Record<string, SearchFields>> = {
  en: {
    [SECTIONS.DisconnectMode.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.DisconnectMode.en],
      searchText: `${MENUS.Tracking.en} > ${SECTIONS.DisconnectMode.en}`,
      tab: "Tracking",
      key: SECTIONS.DisconnectMode.en,
    },
    [SECTIONS.DriveMode.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.DriveMode.en],
      searchText: `${MENUS.Tracking.en} > ${SECTIONS.DriveMode.en}`,
      tab: "Tracking",
      key: SECTIONS.DriveMode.en,
    },
    [SECTIONS.FineTracking.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.FineTracking.en],
      searchText: `${MENUS.Tracking.en} > ${SECTIONS.FineTracking.en}`,
      tab: "Tracking",
      key: SECTIONS.FineTracking.en,
    },
    [SECTIONS.IdleMode.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.IdleMode.en],
      searchText: `${MENUS.Tracking.en} > ${SECTIONS.IdleMode.en}`,
      tab: "Tracking",
      key: SECTIONS.IdleMode.en,
    },
    [SECTIONS.InstallMode.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.InstallMode.en],
      searchText: `${MENUS.Tracking.en} > ${SECTIONS.InstallMode.en}`,
      tab: "Tracking",
      key: SECTIONS.InstallMode.en,
    },
    [SECTIONS.ModeSettings.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.ModeSettings.en],
      searchText: `${MENUS.Tracking.en} > ${SECTIONS.ModeSettings.en}`,
      tab: "Tracking",
      key: SECTIONS.ModeSettings.en,
    },
    [SECTIONS.OperationMode.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.OperationMode.en],
      searchText: `${MENUS.Tracking.en} > ${SECTIONS.OperationMode.en}`,
      tab: "Tracking",
      key: SECTIONS.OperationMode.en,
    },
    [SECTIONS.ParkMode.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.ParkMode.en],
      searchText: `${MENUS.Tracking.en} > ${SECTIONS.ParkMode.en}`,
      tab: "Tracking",
      key: SECTIONS.ParkMode.en,
    },
    [SECTIONS.SpeedingMode.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.SpeedingMode.en],
      searchText: `${MENUS.Tracking.en} > ${SECTIONS.SpeedingMode.en}`,
      tab: "Tracking",
      key: SECTIONS.SpeedingMode.en,
    },
    [SECTIONS.TowingMode.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.TowingMode.en],
      searchText: `${MENUS.Tracking.en} > ${SECTIONS.TowingMode.en}`,
      tab: "Tracking",
      key: SECTIONS.TowingMode.en,
    },
  },
  es: {
    [SECTIONS.DisconnectMode.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.DisconnectMode.en],
      searchText: `${MENUS.Tracking.es} > ${SECTIONS.DisconnectMode.es}`,
      tab: "Tracking",
      key: SECTIONS.DisconnectMode.en,
    },
    [SECTIONS.DriveMode.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.DriveMode.en],
      searchText: `${MENUS.Tracking.es} > ${SECTIONS.DriveMode.es}`,
      tab: "Tracking",
      key: SECTIONS.DriveMode.en,
    },
    [SECTIONS.FineTracking.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.FineTracking.en],
      searchText: `${MENUS.Tracking.es} > ${SECTIONS.FineTracking.es}`,
      tab: "Tracking",
      key: SECTIONS.FineTracking.en,
    },
    [SECTIONS.IdleMode.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.IdleMode.en],
      searchText: `${MENUS.Tracking.es} > ${SECTIONS.IdleMode.es}`,
      tab: "Tracking",
      key: SECTIONS.IdleMode.en,
    },
    [SECTIONS.InstallMode.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.InstallMode.en],
      searchText: `${MENUS.Tracking.es} > ${SECTIONS.InstallMode.es}`,
      tab: "Tracking",
      key: SECTIONS.InstallMode.en,
    },
    [SECTIONS.ModeSettings.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.ModeSettings.en],
      searchText: `${MENUS.Tracking.es} > ${SECTIONS.ModeSettings.es}`,
      tab: "Tracking",
      key: SECTIONS.ModeSettings.en,
    },
    [SECTIONS.OperationMode.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.OperationMode.en],
      searchText: `${MENUS.Tracking.es} > ${SECTIONS.OperationMode.es}`,
      tab: "Tracking",
      key: SECTIONS.OperationMode.en,
    },
    [SECTIONS.ParkMode.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.ParkMode.en],
      searchText: `${MENUS.Tracking.es} > ${SECTIONS.ParkMode.es}`,
      tab: "Tracking",
      key: SECTIONS.ParkMode.en,
    },
    [SECTIONS.SpeedingMode.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.SpeedingMode.en],
      searchText: `${MENUS.Tracking.es} > ${SECTIONS.SpeedingMode.es}`,
      tab: "Tracking",
      key: SECTIONS.SpeedingMode.en,
    },
    [SECTIONS.TowingMode.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.TowingMode.en],
      searchText: `${MENUS.Tracking.es} > ${SECTIONS.TowingMode.es}`,
      tab: "Tracking",
      key: SECTIONS.TowingMode.en,
    },
  },
  pt: {
    [SECTIONS.DisconnectMode.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.DisconnectMode.en],
      searchText: `${MENUS.Tracking.pt} > ${SECTIONS.DisconnectMode.pt}`,
      tab: "Tracking",
      key: SECTIONS.DisconnectMode.en,
    },
    [SECTIONS.DriveMode.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.DriveMode.en],
      searchText: `${MENUS.Tracking.pt} > ${SECTIONS.DriveMode.pt}`,
      tab: "Tracking",
      key: SECTIONS.DriveMode.en,
    },
    [SECTIONS.FineTracking.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.FineTracking.en],
      searchText: `${MENUS.Tracking.pt} > ${SECTIONS.FineTracking.pt}`,
      tab: "Tracking",
      key: SECTIONS.FineTracking.en,
    },
    [SECTIONS.IdleMode.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.IdleMode.en],
      searchText: `${MENUS.Tracking.pt} > ${SECTIONS.IdleMode.pt}`,
      tab: "Tracking",
      key: SECTIONS.IdleMode.en,
    },
    [SECTIONS.InstallMode.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.InstallMode.en],
      searchText: `${MENUS.Tracking.pt} > ${SECTIONS.InstallMode.pt}`,
      tab: "Tracking",
      key: SECTIONS.InstallMode.en,
    },
    [SECTIONS.ModeSettings.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.ModeSettings.en],
      searchText: `${MENUS.Tracking.pt} > ${SECTIONS.ModeSettings.pt}`,
      tab: "Tracking",
      key: SECTIONS.ModeSettings.en,
    },
    [SECTIONS.OperationMode.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.OperationMode.en],
      searchText: `${MENUS.Tracking.pt} > ${SECTIONS.OperationMode.pt}`,
      tab: "Tracking",
      key: SECTIONS.OperationMode.en,
    },
    [SECTIONS.ParkMode.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.ParkMode.en],
      searchText: `${MENUS.Tracking.pt} > ${SECTIONS.ParkMode.pt}`,
      tab: "Tracking",
      key: SECTIONS.ParkMode.en,
    },
    [SECTIONS.SpeedingMode.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.SpeedingMode.en],
      searchText: `${MENUS.Tracking.pt} > ${SECTIONS.SpeedingMode.pt}`,
      tab: "Tracking",
      key: SECTIONS.SpeedingMode.en,
    },
    [SECTIONS.TowingMode.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.TowingMode.en],
      searchText: `${MENUS.Tracking.pt} > ${SECTIONS.TowingMode.pt}`,
      tab: "Tracking",
      key: SECTIONS.TowingMode.en,
    },
  },
};

export const DRIVER_SECTION: Record<Lang, Record<string, SearchFields>> = {
  en: {
    [SECTIONS.Driver.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Driver.en],
      searchText: `${MENUS.Driver.en} > ${SECTIONS.Driver.en}`,
      tab: "Driver",
      key: SECTIONS.Driver.en,
    },
  },
  es: {
    [SECTIONS.Driver.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Driver.en],
      searchText: `${MENUS.Driver.es} > ${SECTIONS.Driver.es}`,
      tab: "Driver",
      key: SECTIONS.Driver.en,
    },
  },
  pt: {
    [SECTIONS.Driver.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Driver.en],
      searchText: `${MENUS.Driver.pt} > ${SECTIONS.Driver.pt}`,
      tab: "Driver",
      key: SECTIONS.Driver.en,
    },
  },
};

export const BLUETOOTH_SECTION: Record<Lang, Record<string, SearchFields>> = {
  en: {
    [SECTIONS.Ble.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Ble.en],
      searchText: `${MENUS.Bluetooth.en} > ${SECTIONS.Ble.en}`,
      tab: "Bluetooth",
      key: SECTIONS.Ble.en,
    },
    [SECTIONS.BleRegistration.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.BleRegistration.en],
      searchText: `${MENUS.Bluetooth.en} > ${SECTIONS.BleRegistration.en}`,
      tab: "Bluetooth",
      key: SECTIONS.BleRegistration.en,
    },
    [SECTIONS.Sensor.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Sensor.en],
      searchText: `${MENUS.Bluetooth.en} > ${SECTIONS.Sensor.en}`,
      tab: "Bluetooth",
      key: SECTIONS.Sensor.en,
    },
  },
  es: {
    [SECTIONS.Ble.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Ble.en],
      searchText: `${MENUS.Bluetooth.es} > ${SECTIONS.Ble.es}`,
      tab: "Bluetooth",
      key: SECTIONS.Ble.en,
    },
    [SECTIONS.BleRegistration.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.BleRegistration.en],
      searchText: `${MENUS.Bluetooth.es} > ${SECTIONS.BleRegistration.es}`,
      tab: "Bluetooth",
      key: SECTIONS.BleRegistration.en,
    },
    [SECTIONS.Sensor.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Sensor.en],
      searchText: `${MENUS.Bluetooth.es} > ${SECTIONS.Sensor.es}`,
      tab: "Bluetooth",
      key: SECTIONS.Sensor.en,
    },
  },
  pt: {
    [SECTIONS.Ble.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Ble.en],
      searchText: `${MENUS.Bluetooth.pt} > ${SECTIONS.Ble.pt}`,
      tab: "Bluetooth",
      key: SECTIONS.Ble.en,
    },
    [SECTIONS.BleRegistration.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.BleRegistration.en],
      searchText: `${MENUS.Bluetooth.pt} > ${SECTIONS.BleRegistration.pt}`,
      tab: "Bluetooth",
      key: SECTIONS.BleRegistration.en,
    },
    [SECTIONS.Sensor.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Sensor.en],
      searchText: `${MENUS.Bluetooth.pt} > ${SECTIONS.Sensor.pt}`,
      tab: "Bluetooth",
      key: SECTIONS.Sensor.en,
    },
  },
};

export const RF_SECTION: Record<Lang, Record<string, SearchFields>> = {
  en: {
    [SECTIONS.ErbList.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.ErbList.en],
      searchText: `${MENUS.RF.en} > ${SECTIONS.ErbList.en}`,
      tab: "RF",
      key: SECTIONS.ErbList.en,
    },
    [SECTIONS.LoRaWAN.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.LoRaWAN.en],
      searchText: `${MENUS.RF.en} > ${SECTIONS.LoRaWAN.en}`,
      tab: "RF",
      key: SECTIONS.LoRaWAN.en,
    },
    [SECTIONS.PresenceDevice.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.PresenceDevice.en],
      searchText: `${MENUS.RF.en} > ${SECTIONS.PresenceDevice.en}`,
      tab: "RF",
      key: SECTIONS.PresenceDevice.en,
    },
    [SECTIONS.PresenceFunction.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.PresenceFunction.en],
      searchText: `${MENUS.RF.en} > ${SECTIONS.PresenceFunction.en}`,
      tab: "RF",
      key: SECTIONS.PresenceFunction.en,
    },
    [SECTIONS.Rf.en]: {
      fields: INCLUDE_FIELDS[SECTIONS.Rf.en],
      searchText: `${MENUS.RF.en} > ${SECTIONS.Rf.en}`,
      tab: "RF",
      key: SECTIONS.Rf.en,
    },
  },
  es: {
    [SECTIONS.ErbList.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.ErbList.en],
      searchText: `${MENUS.RF.es} > ${SECTIONS.ErbList.es}`,
      tab: "RF",
      key: SECTIONS.ErbList.en,
    },
    [SECTIONS.LoRaWAN.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.LoRaWAN.en],
      searchText: `${MENUS.RF.es} > ${SECTIONS.LoRaWAN.es}`,
      tab: "RF",
      key: SECTIONS.LoRaWAN.en,
    },
    [SECTIONS.PresenceDevice.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.PresenceDevice.en],
      searchText: `${MENUS.RF.es} > ${SECTIONS.PresenceDevice.es}`,
      tab: "RF",
      key: SECTIONS.PresenceDevice.en,
    },
    [SECTIONS.PresenceFunction.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.PresenceFunction.en],
      searchText: `${MENUS.RF.es} > ${SECTIONS.PresenceFunction.es}`,
      tab: "RF",
      key: SECTIONS.PresenceFunction.en,
    },
    [SECTIONS.Rf.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.Rf.en],
      searchText: `${MENUS.RF.es} > ${SECTIONS.Rf.es}`,
      tab: "RF",
      key: SECTIONS.Rf.en,
    },
  },
  pt: {
    [SECTIONS.ErbList.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.ErbList.en],
      searchText: `${MENUS.RF.pt} > ${SECTIONS.ErbList.pt}`,
      tab: "RF",
      key: SECTIONS.ErbList.en,
    },
    [SECTIONS.LoRaWAN.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.LoRaWAN.en],
      searchText: `${MENUS.RF.pt} > ${SECTIONS.LoRaWAN.pt}`,
      tab: "RF",
      key: SECTIONS.LoRaWAN.en,
    },
    [SECTIONS.PresenceDevice.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.PresenceDevice.en],
      searchText: `${MENUS.RF.pt} > ${SECTIONS.PresenceDevice.pt}`,
      tab: "RF",
      key: SECTIONS.PresenceDevice.en,
    },
    [SECTIONS.PresenceFunction.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.PresenceFunction.en],
      searchText: `${MENUS.RF.pt} > ${SECTIONS.PresenceFunction.pt}`,
      tab: "RF",
      key: SECTIONS.PresenceFunction.en,
    },
    [SECTIONS.Rf.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.Rf.en],
      searchText: `${MENUS.RF.pt} > ${SECTIONS.Rf.pt}`,
      tab: "RF",
      key: SECTIONS.Rf.en,
    },
  },
};

const COMMAND_SECTION: Record<Lang, Record<string, SearchFields>> = {
  en: {
    [SECTIONS.NetworkCommands.en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.en} > ${SECTIONS.NetworkCommands.en}`,
      tab: "Commands",
      key: SECTIONS.NetworkCommands.en,
    },
    [SECTIONS.SystemCommands.en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.en} > ${SECTIONS.SystemCommands.en}`,
      tab: "Commands",
      key: SECTIONS.SystemCommands.en,
    },
    [SECTIONS.JammingDetectionCommands.en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.en} > ${SECTIONS.JammingDetectionCommands.en}`,
      tab: "Commands",
      key: SECTIONS.JammingDetectionCommands.en,
    },
    [SECTIONS.ReportCommands.en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.en} > ${SECTIONS.ReportCommands.en}`,
      tab: "Commands",
      key: SECTIONS.ReportCommands.en,
    },
    [SECTIONS.TrackingCommands.en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.en} > ${SECTIONS.TrackingCommands.en}`,
      tab: "Commands",
      key: SECTIONS.TrackingCommands.en,
    },
    [SECTIONS["I/OCommands"].en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.en} > ${SECTIONS["I/OCommands"].en}`,
      tab: "Commands",
      key: SECTIONS["I/OCommands"].en,
    },
    [SECTIONS.GeofenceCommands.en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.en} > ${SECTIONS.GeofenceCommands.en}`,
      tab: "Commands",
      key: SECTIONS.GeofenceCommands.en,
    },
    [SECTIONS.BleCommands.en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.en} > ${SECTIONS.BleCommands.en}`,
      tab: "Commands",
      key: SECTIONS.BleCommands.en,
    },
    [SECTIONS.AccessoryCommands.en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.en} > ${SECTIONS.AccessoryCommands.en}`,
      tab: "Commands",
      key: SECTIONS.AccessoryCommands.en,
    },
    [SECTIONS.RfCommands.en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.en} > ${SECTIONS.RfCommands.en}`,
      tab: "Commands",
      key: SECTIONS.RfCommands.en,
    },
  },
  es: {
    [SECTIONS.NetworkCommands.es]: {
      fields: INCLUDE_FIELDS[SECTIONS.NetworkCommands.en],
      searchText: `${MENUS.Commands.es} > ${SECTIONS.NetworkCommands.es}`,
      tab: "Commands",
      key: SECTIONS.NetworkCommands.en,
    },
    [SECTIONS.SystemCommands.es]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.es} > ${SECTIONS.SystemCommands.es}`,
      tab: "Commands",
      key: SECTIONS.SystemCommands.en,
    },
    [SECTIONS.JammingDetectionCommands.es]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.es} > ${SECTIONS.JammingDetectionCommands.es}`,
      tab: "Commands",
      key: SECTIONS.JammingDetectionCommands.en,
    },
    [SECTIONS.ReportCommands.es]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.es} > ${SECTIONS.ReportCommands.es}`,
      tab: "Commands",
      key: SECTIONS.ReportCommands.en,
    },
    [SECTIONS.TrackingCommands.es]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.es} > ${SECTIONS.TrackingCommands.es}`,
      tab: "Commands",
      key: SECTIONS.TrackingCommands.en,
    },
    [SECTIONS["I/OCommands"].es]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.es} > ${SECTIONS["I/OCommands"].es}`,
      tab: "Commands",
      key: SECTIONS["I/OCommands"].en,
    },
    [SECTIONS.GeofenceCommands.es]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.es} > ${SECTIONS.GeofenceCommands.es}`,
      tab: "Commands",
      key: SECTIONS.GeofenceCommands.en,
    },
    [SECTIONS.BleCommands.es]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.es} > ${SECTIONS.BleCommands.es}`,
      tab: "Commands",
      key: SECTIONS.BleCommands.en,
    },
    [SECTIONS.AccessoryCommands.es]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.es} > ${SECTIONS.AccessoryCommands.es}`,
      tab: "Commands",
      key: SECTIONS.AccessoryCommands.en,
    },
    [SECTIONS.RfCommands.es]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.es} > ${SECTIONS.RfCommands.es}`,
      tab: "Commands",
      key: SECTIONS.RfCommands.en,
    },
  },
  pt: {
    [SECTIONS.NetworkCommands.pt]: {
      fields: INCLUDE_FIELDS[SECTIONS.NetworkCommands.en],
      searchText: `${MENUS.Commands.pt} > ${SECTIONS.NetworkCommands.pt}`,
      tab: "Commands",
      key: SECTIONS.NetworkCommands.en,
    },
    [SECTIONS.SystemCommands.pt]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.pt} > ${SECTIONS.SystemCommands.pt}`,
      tab: "Commands",
      key: SECTIONS.SystemCommands.en,
    },
    [SECTIONS.JammingDetectionCommands.pt]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.pt} > ${SECTIONS.JammingDetectionCommands.pt}`,
      tab: "Commands",
      key: SECTIONS.JammingDetectionCommands.en,
    },
    [SECTIONS.ReportCommands.pt]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.pt} > ${SECTIONS.ReportCommands.pt}`,
      tab: "Commands",
      key: SECTIONS.ReportCommands.en,
    },
    [SECTIONS.TrackingCommands.pt]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.pt} > ${SECTIONS.TrackingCommands.pt}`,
      tab: "Commands",
      key: SECTIONS.TrackingCommands.en,
    },
    [SECTIONS["I/OCommands"].pt]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.pt} > ${SECTIONS["I/OCommands"].pt}`,
      tab: "Commands",
      key: SECTIONS["I/OCommands"].en,
    },
    [SECTIONS.GeofenceCommands.pt]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.pt} > ${SECTIONS.GeofenceCommands.pt}`,
      tab: "Commands",
      key: SECTIONS.GeofenceCommands.en,
    },
    [SECTIONS.BleCommands.pt]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.pt} > ${SECTIONS.BleCommands.pt}`,
      tab: "Commands",
      key: SECTIONS.BleCommands.en,
    },
    [SECTIONS.AccessoryCommands.pt]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.pt} > ${SECTIONS.AccessoryCommands.pt}`,
      tab: "Commands",
      key: SECTIONS.AccessoryCommands.en,
    },
    [SECTIONS.RfCommands.pt]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.Commands.pt} > ${SECTIONS.RfCommands.pt}`,
      tab: "Commands",
      key: SECTIONS.RfCommands.en,
    },
  },
};

const DEVICE_STATUS_SECTION: Record<Lang, Record<string, SearchFields>> = {
  en: {
    [SECTIONS.DeviceInformation.en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.DeviceStatus.en} > ${SECTIONS.DeviceInformation.en}`,
      tab: "DeviceStatus",
      key: SECTIONS.DeviceInformation.en,
    },
    [SECTIONS.GNSSInformation.en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.DeviceStatus.en} > ${SECTIONS.GNSSInformation.en}`,
      tab: "DeviceStatus",
      key: SECTIONS.GNSSInformation.en,
    },
    [SECTIONS.CellularInformation.en]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.DeviceStatus.en} > ${SECTIONS.CellularInformation.en}`,
      tab: "DeviceStatus",
      key: SECTIONS.CellularInformation.en,
    },
  },
  es: {
    [SECTIONS.DeviceInformation.es]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.DeviceStatus.es} > ${SECTIONS.DeviceInformation.es}`,
      tab: "DeviceStatus",
      key: SECTIONS.DeviceInformation.en,
    },
    [SECTIONS.GNSSInformation.es]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.DeviceStatus.es} > ${SECTIONS.GNSSInformation.es}`,
      tab: "DeviceStatus",
      key: SECTIONS.GNSSInformation.en,
    },
    [SECTIONS.CellularInformation.es]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.DeviceStatus.es} > ${SECTIONS.CellularInformation.es}`,
      tab: "DeviceStatus",
      key: SECTIONS.CellularInformation.en,
    },
  },
  pt: {
    [SECTIONS.DeviceInformation.pt]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.DeviceStatus.pt} > ${SECTIONS.DeviceInformation.pt}`,
      tab: "DeviceStatus",
      key: SECTIONS.DeviceInformation.en,
    },
    [SECTIONS.GNSSInformation.pt]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.DeviceStatus.pt} > ${SECTIONS.GNSSInformation.pt}`,
      tab: "DeviceStatus",
      key: SECTIONS.GNSSInformation.en,
    },
    [SECTIONS.CellularInformation.pt]: {
      fields: ["ALL_SEARCH"],
      searchText: `${MENUS.DeviceStatus.pt} > ${SECTIONS.CellularInformation.pt}`,
      tab: "DeviceStatus",
      key: SECTIONS.CellularInformation.en,
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
    ...TRACKING_SECTION.en,
    ...DRIVER_SECTION.en,
    ...BLUETOOTH_SECTION.en,
    ...RF_SECTION.en,
    ...COMMAND_SECTION.en,
    ...DEVICE_STATUS_SECTION.en,
  },
  es: {
    ...NETWORK_SECTION.es,
    ...SYSTEM_SECTION.es,
    ...REPORT_SECTION.es,
    ...ACCESSORIES_SECTION.es,
    ...TRACKING_SECTION.es,
    ...DRIVER_SECTION.es,
    ...BLUETOOTH_SECTION.es,
    ...RF_SECTION.es,
    ...COMMAND_SECTION.es,
    ...DEVICE_STATUS_SECTION.es,
  },
  pt: {
    ...NETWORK_SECTION.pt,
    ...SYSTEM_SECTION.pt,
    ...REPORT_SECTION.pt,
    ...ACCESSORIES_SECTION.pt,
    ...TRACKING_SECTION.pt,
    ...DRIVER_SECTION.pt,
    ...BLUETOOTH_SECTION.pt,
    ...RF_SECTION.pt,
    ...COMMAND_SECTION.pt,
    ...DEVICE_STATUS_SECTION.pt,
  },
};

export const SEARCH_SECTION_WITHOUT_DEVICE = {
  en: {
    ...NETWORK_SECTION.en,
    ...SYSTEM_SECTION.en,
    ...REPORT_SECTION.en,
    ...ACCESSORIES_SECTION.en,
    ...TRACKING_SECTION.en,
    ...DRIVER_SECTION.en,
    ...BLUETOOTH_SECTION.en,
    ...RF_SECTION.en,
    ...DEVICE_STATUS_SECTION.en,
  },
  es: {
    ...NETWORK_SECTION.es,
    ...SYSTEM_SECTION.es,
    ...REPORT_SECTION.es,
    ...ACCESSORIES_SECTION.es,
    ...TRACKING_SECTION.es,
    ...DRIVER_SECTION.es,
    ...BLUETOOTH_SECTION.es,
    ...RF_SECTION.es,
    ...DEVICE_STATUS_SECTION.es,
  },
  pt: {
    ...NETWORK_SECTION.pt,
    ...SYSTEM_SECTION.pt,
    ...REPORT_SECTION.pt,
    ...ACCESSORIES_SECTION.pt,
    ...TRACKING_SECTION.pt,
    ...DRIVER_SECTION.pt,
    ...BLUETOOTH_SECTION.pt,
    ...RF_SECTION.pt,
    ...DEVICE_STATUS_SECTION.pt,
  },
};

export const formDataToSearchSectionData = (
  formData: {
    [key: string]: FormField;
  },
  lang: Lang,
  withoutDevice = false
) => {
  return Object.entries(
    withoutDevice ? SEARCH_SECTION_WITHOUT_DEVICE[lang] : SEARCH_SECTION[lang]
  ).reduce((acc, [key, value]) => {
    const fields = value.fields;
    const searchText = value.searchText;
    const tab = value.tab;
    const valueKey = value.key;

    acc[key] = {
      fields: fields.filter(
        (f) => Object.keys(formData).includes(f) || f === "ALL_SEARCH"
      ),
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
