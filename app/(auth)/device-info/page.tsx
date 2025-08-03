"use client";

import SideMenu from "@/components/sidemenu/SideMenu";
import { sideMenuItems } from "./sideMenuItems";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
// import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { useEffect, useRef, useState } from "react";
import NetworkTab from "app/(auth)/device-info/(tabs)/NetworkTab";
import SystemTab from "./(tabs)/SystemTab";
import ReportTab from "./(tabs)/ReportTab";
import TrackingTab from "./(tabs)/TrackingTab";
import BluetoothTab from "./(tabs)/BluetoothTab";
import AccessoriesTab from "./(tabs)/AccessoriesTab";
import RfTab from "app/(auth)/device-info/(tabs)/RfTab";
import InputOutputTab from "app/(auth)/device-info/(tabs)/InputOutputTab";
import DriverTab from "app/(auth)/device-info/(tabs)/DriverTab";
import useCmdStore from "@/src/stores/useCmdStore";
import {
  AT_CMD,
  AT_EDIT_PREFIX,
  AT_GET_JSON,
  AT_REQ,
  CR,
} from "@/src/hooks/useSerial/constant";
import SearchModal from "app/(auth)/device-info/(components)/SearchModal";
import Modal from "@/components/Modal";
import {
  formDataToSearchSectionData,
  INCLUDE_SECTIONS,
  MENUS,
  SearchField,
  SearchFields,
} from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import useDeviceSearchModalStore from "@/src/stores/useDeviceSearchModal";
import Controller from "app/(auth)/device-info/Controller";
import useSerialStore from "@/src/stores/useSerialStore";
import FullLoading from "@/components/FullLoading";
import GeofenceTab from "./(tabs)/GeofenceTab";
import CommandTab from "app/(auth)/device-info/(tabs)/CommandTab";
import { getSearchParamsData } from "@/src/utils/searchParams";
import DeviceStatusTab from "app/(auth)/device-info/(tabs)/DeviceStatusTab";
import useDeviceVersions from "@/src/hooks/useDeviceVersions";
import { ConstructionOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import EditProfileTab from "./(tabs)/EditProfileTab";
import { useTranslations } from "next-intl";
import useAuthStore from "@/utils/useAuthStore";
import { getFieldDefinition } from "@/src/constants/getFieldDefinition";
import { FIELD_VALIDATIONS } from "constants/field";
const SCROLL_TOP_OFFSET = 140;

// Type definitions
interface FieldInfo {
  tab_id: string;
  [key: string]: any;
}

interface FieldValue {
  ID: string;
  value: string;
  list?: Array<{ [key: string]: string }>;
  AssignList?: Array<{ [key: string]: string }>;
  [key: string]: any;
}

interface FieldItem {
  [key: string]: FieldValue[];
}

interface FieldWithInfo {
  info: FieldInfo[];
}

type Field = FieldItem | FieldWithInfo;

export interface FormField {
  key: string;
  value: string;
  realValue: string;
  list: string[] | null;
  labelList: string[] | null;
  alert_id: string | null;
  text_num: string | null;
  beforeValue: string;
  beforeAlertId: string | null;
  beforeTextNum: string | null;
}

interface FormData {
  [key: string]: FormField;
}

// Helper functions
const formatFieldId = (id: string): string => {
  const numId = Number(id);
  return numId < 10 ? `0${id}` : id;
};

const getRealValue = (field: FieldValue): string => {
  // 2611에 대한 특별 처리
  if (field.ID === "11") {
    console.log("=== getRealValue for 2611 ===");
    console.log("field.value:", field.value);
    console.log("field.list:", field.list);
    
    if (!field.list) return "0"; // 기본값 Disable
    
    // JSON의 value 필드와 list의 라벨을 매칭하여 실제 값을 찾음
    const listValues = Object.values(field.list[0]);
    const matchingItem = listValues.find((item: string) => 
      item.includes(`;${field.value};`) || item.endsWith(`;${field.value}`)
    );
    
    if (matchingItem) {
      const realValue = matchingItem.split(";")[0];
      console.log("2611 realValue found:", realValue);
      return realValue;
    } else {
      console.log("2611 no matching item found, using default: 0");
      return "0"; // 기본값 Disable
    }
  }
  
  // 기존 로직 (다른 필드들)
  if (!field.list) return field.value;

  const realValueSource = Object.values(field.list[0])?.find((item: string) =>
    item?.includes(`${field.value};`)
  );

  const realValue = realValueSource?.split(";")[0]
    ? Number(realValueSource.split(";")[0])
    : -1;

  if (realValue === -1) return field.value;
  return realValue < 10 ? `0${realValue}` : realValue.toString();
};

const getList = (field: FieldValue): string[] => {
  if (!field.list && !field.AssignList) return null;

  if (field.AssignList) {
    return Object.values(field.AssignList[0]).map((item) =>
      Number(item.split(";")[0]) < 10
        ? `0${item.split(";")[0]}`
        : item.split(";")[0]
    );
  }

  const result = Object.values(field.list[0]).map((item) => {
    const value = item.split(";")[0];
    // 2611의 경우 한 자리 숫자를 그대로 사용
    if (field.ID === "11") {
      return value;
    }
    return Number(value) < 10 ? `0${value}` : value;
  });

  console.log("getList result for field", field.ID, ":", result);
  return result;
};

const getLabelList = (field: FieldValue): string[] => {
  if (!field.list && !field.AssignList) return null;

  if (field.AssignList) {
    return Object.values(field.AssignList[0]).map((item) => item.split(";")[1]);
  }

  const result = Object.values(field.list[0]).map((item) => item.split(";")[1]);
  console.log("getLabelList result for field", field.ID, ":", result);
  return result;
};

const transformFieldData = (
  field: Field,
  tabId: string
): [string, FormField] | null => {
  const key = Object.keys(field)[0];
  if (key === "info") return null;

  const fieldData = (field as FieldItem)[key][0];
  if (!fieldData?.ID) return null;

  const fieldId = formatFieldId(fieldData.ID);
  const realValue = getRealValue(fieldData);
  const optionsValueList = getList(fieldData);
  const optionLabelList = getLabelList(fieldData);

  // 2611에 대한 상세 로그
  if (fieldId === "2611") {
    console.log("=== 2611 transformFieldData ===");
    console.log("field:", field);
    console.log("fieldData:", fieldData);
    console.log("fieldId:", fieldId);
    console.log("realValue:", realValue);
    console.log("optionsValueList:", optionsValueList);
    console.log("optionLabelList:", optionLabelList);
  }

  return [
    `${tabId}${fieldId}`,
    {
      key,
      value: fieldData.value,
      realValue,
      list: optionsValueList,
      labelList: optionLabelList,
      alert_id: fieldData.alert_id,
      text_num: fieldData.text_num,
      beforeValue: realValue,
      beforeAlertId: fieldData.alert_id,
      beforeTextNum: fieldData.text_num,
    },
  ];
};

const transformOriginData = (originData: any[]): FormData => {
  console.log("=== transformOriginData start ===");
  console.log("originData:", originData);
  
  const formData = originData.reduce((acc: FormData, item) => {
    const key = Object.keys(item)[0];
    const fields = item[key];
    if (!fields || !Array.isArray(fields)) return acc;

    // Find tab_id from the info field
    const infoField = fields.find((f) => "info" in f) as
      | FieldWithInfo
      | undefined;
    if (!infoField) return acc;

    const tabId = infoField.info[0]?.tab_id;
    if (!tabId) return acc;

    fields.forEach((field) => {
      const transformedField = transformFieldData(field, tabId);
      if (transformedField) {
        const [key, value] = transformedField;
        acc[key] = value;
        
        // 2611에 대한 디버깅 로그
        if (key === "2611") {
          console.log("=== 2611 in transformOriginData ===");
          console.log("2611 transformed field:", value);
          console.log("2611 list:", value.list);
          console.log("2611 labelList:", value.labelList);
        }
      }
    });

    return acc;
  }, {});

  console.log("=== formData before 2611 check ===");
  console.log("formData keys:", Object.keys(formData));
  console.log("formData['2611']:", formData["2611"]);

  // 2611이 항상 포함되도록 보장
  if (!formData["2611"]) {
    console.log("=== 2611 not found, adding default ===");
    formData["2611"] = {
      key: "Light Sensor",
      value: "0",
      realValue: "0",
      list: ["0", "1", "2", "3", "4", "5", "6", "7"],
      labelList: ["Disable", "Level 1 (Screw-fastened)", "Level 2", "Level 3", "Level 4", "Level 5", "Level 6", "Level 7"],
      alert_id: null,
      text_num: null,
      beforeValue: "0",
      beforeAlertId: null,
      beforeTextNum: null,
    };
  }

  console.log("=== final formData ===");
  console.log("formData['2611']:", formData["2611"]);
  
  return formData;
};

const extractCommandData = (originData: any[]) => {
  try {
    const cmdItem = originData?.find(
      (item) => Object.values(item)[0][0]?.info?.[0]?.hdr === "CMD"
    );

    if (!cmdItem) return [];

    const entries = Object.entries(cmdItem);
    if (!entries.length) return [];

    const commandData = entries[0][1][1]?.["Command"]?.[0]?.list?.[0];
    if (!commandData) return [];

    return Object.values(commandData)
      .filter((item): item is string => typeof item === "string")
      .map((item) => item.split(";")?.[4])
      .filter(Boolean);
  } catch (error) {
    console.error("Error extracting command data:", error);
    return [];
  }
};

// FormData를 모델명에 따라 patch하는 함수
function patchFormDataByModel(formData: { [key: string]: FormField }, modelName?: string) {
  console.log("=== patchFormDataByModel start ===");
  console.log("modelName:", modelName);
  console.log("formData keys:", Object.keys(formData));
  
  if (!modelName) return formData;
  const patched = { ...formData };
  // 1717 등 patch가 필요한 항목만 교체
  Object.keys(formData).forEach((key) => {
    // key가 1717로 끝나는 경우만 예시로 처리
    if (key.endsWith("1717")) {
      const fieldDef = getFieldDefinition("1717", modelName) || FIELD_VALIDATIONS["1717"];
      patched[key] = {
        ...patched[key],
        list: fieldDef.list ?? null,
        labelList: fieldDef.list ? fieldDef.list.map((item: any) => item.label) : null,
        // title, tooltip 등도 필요시 추가
      };
    }
    // 2611 처리 추가
    if (key.endsWith("2611")) {
      console.log("=== 2611 patch start ===");
      const fieldDef = getFieldDefinition("2611", modelName) || FIELD_VALIDATIONS["2611"];
      
      // 기기에서 받은 데이터가 있으면 우선 사용, 없으면 groupFieldPatch 사용
      const existingList = patched[key].list;
      const existingLabelList = patched[key].labelList;
      
      console.log("2611 patch - existingList:", existingList);
      console.log("2611 patch - existingLabelList:", existingLabelList);
      console.log("2611 patch - fieldDef:", fieldDef);
      
      if (existingList && existingList.length > 0) {
        // 기기에서 받은 데이터가 있으면 그대로 사용
        console.log("Using device JSON data for 2611:", existingList);
      } else if (fieldDef.list) {
        // 기기에서 받은 데이터가 없으면 groupFieldPatch 사용
        console.log("Using groupFieldPatch data for 2611");
        patched[key] = {
          ...patched[key],
          list: fieldDef.list.map((item: any) => item.value),
          labelList: fieldDef.list.map((item: any) => item.label),
        };
        console.log("Patched 2611 list:", patched[key].list);
        console.log("Patched 2611 labelList:", patched[key].labelList);
      }
      console.log("=== 2611 patch end ===");
    }
  });
  
  console.log("=== patchFormDataByModel end ===");
  console.log("patched['2611']:", patched["2611"]);
  
  return patched;
}

export default function DeviceInfoPage() {
  const t = useTranslations();
  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // data
  const [searchSectionData, setSearchSectionData] = useState<{
    [key: string]: SearchFields;
  }>(null);
  const [searchParamData, setSearchParamData] = useState<{
    [key: string]: SearchField;
  }>(null);
  const {
    state: { portList },
    func: { write, getPorts },
  } = useSerial();

  const [isFechedPackage, setIsFechedPackage] = useState(false);
  const isFechedPackageRef = useRef(false);
  const packageCountRef = useRef(0);
  const imeiRef = useRef("");
  const imeiTimerRef = useRef<NodeJS.Timeout | null>(null);
  const egmrTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { userRole } = useAuthStore();
  const { getCurrentImei, resetImei, resetTab } = useSerialConfigurationStore();
  const { toggleOpen } = useCmdStore();
  const imei = getCurrentImei();

  const { lang } = useLangStore();

  const router = useRouter();
  const currentPort = portList.find(({ port }) => port.imei === imei);

  // 연결 해제 시 device list로 이동
  useEffect(() => {
    if (!currentPort || currentPort.isDisconnected) {
      router.replace("/device/list");
    }
  }, [currentPort, router]);

  const originData = portList.find(({ port }) => port.imei === imei)
    ?.packageToJson.synctrak;

  const {
    deviceVersionsObject,
    isLoading: deviceInfoLoading,
    isFetched: isDeviceInfoFetched,
  } = useDeviceVersions({
    isFechedPackage,
    currentPort,
    write,
  });

  const [tab, setTab] = useState("DeviceStatus");
  const [formData, setFormData] = useState<{
    [key: string]: FormField | null;
  }>(null);

  const [profile, setProfile] = useState<string>("");
  const [profileData, setProfileData] = useState<string>("");
  const [commandData, setCommandData] = useState<string[]>([]);

  const handleResetTab = () => {
    setTab("DeviceStatus");
  };

  const handleTabChange = (tab: string) => {
    if (tab === "CMD Tool") {
      toggleOpen();
    } else {
      setTab(tab);
    }
  };

  const { isOpen, onOpen, onClose } = useDeviceSearchModalStore();

  const searchModal = isOpen;
  const toggleSearchModal = isOpen ? onClose : onOpen;

  const [excludeMenus, setExcludeMenus] = useState<string[]>([]);

  const [isLoadingModelImei, setIsLoadingModelImei] = useState(false);
  const [modelImei, setModelImei] = useState<string>("");

  // 기기 변경 감지(useEffect)
  useEffect(() => {
    // currentPort가 바뀌면 IMEI를 초기화
    setModelImei("");
  }, [currentPort?.port?.imei]);

  // modelImei 초기화를 useEffect로 감싸기
  useEffect(() => {
    if (currentPort?.port?.loadedImei) {
      setModelImei(currentPort.port.loadedImei);
    }
  }, [currentPort?.port?.loadedImei]);

  useEffect(() => {
    if (formData && Object.keys(formData)?.length > 0) {
      const excludeMenus = [];

      const hasNetwork = INCLUDE_SECTIONS[MENUS.Network.en].findIndex(
        (item) => {
          return !!formData[item];
        }
      );
      const hasSystem = INCLUDE_SECTIONS[MENUS.System.en].findIndex((item) => {
        return !!formData[item];
      });
      const hasReport = INCLUDE_SECTIONS[MENUS.Report.en].findIndex((item) => {
        return !!formData[item];
      });
      const hasAccessories = INCLUDE_SECTIONS[MENUS.Accessories.en].findIndex(
        (item) => {
          return !!formData[item];
        }
      );
      const hasInputOutput = INCLUDE_SECTIONS[
        MENUS["Input/Output(I/O)"].en
      ].findIndex((item) => {
        return !!formData[item];
      });
      const hasTracking = INCLUDE_SECTIONS[MENUS.Tracking.en].findIndex(
        (item) => {
          return !!formData[item];
        }
      );
      const hasBluetooth = INCLUDE_SECTIONS[MENUS.Bluetooth.en].findIndex(
        (item) => {
          return !!formData[item];
        }
      );
      const hasDriver = INCLUDE_SECTIONS[MENUS.Driver.en].findIndex((item) => {
        return !!formData[item];
      });
      const hasRf = INCLUDE_SECTIONS[MENUS.RF.en].findIndex((item) => {
        return !!formData[item];
      });

      console.log("hasBluetooth ::::", hasBluetooth);

      if (hasNetwork === -1) {
        excludeMenus.push(MENUS.Network.en);
      }
      if (hasSystem === -1) {
        excludeMenus.push(MENUS.System.en);
      }
      if (hasReport === -1) {
        excludeMenus.push(MENUS.Report.en);
      }
      if (hasAccessories === -1) {
        excludeMenus.push(MENUS.Accessories.en);
      }
      if (hasInputOutput === -1) {
        excludeMenus.push(MENUS["Input/Output(I/O)"].en);
      }
      if (hasTracking === -1) {
        excludeMenus.push(MENUS.Tracking.en);
      }
      if (hasBluetooth === -1) {
        excludeMenus.push(MENUS.Bluetooth.en);
      }
      if (hasDriver === -1) {
        excludeMenus.push(MENUS.Driver.en);
      }
      if (hasRf === -1) {
        excludeMenus.push(MENUS.RF.en);
      }
      if (
        !originData?.find(
          (item) => Object.keys(item)[0] === "Circular Geofence"
        ) &&
        !originData?.find((item) => Object.keys(item)[0] === "Polygon Geofence")
      ) {
        excludeMenus.push(MENUS.Geofence.en);
      }

      if (userRole !== "ADMIN") {
        excludeMenus.push(t("configuration.side_bar.show_hidden_parameters"));
      }

      setExcludeMenus(excludeMenus);
    }
  }, [formData, originData, userRole, t]);

  const handleReboot = () => {
    if (!currentPort?.port) return;
    write({
      data: `${AT_CMD}${imei};03;03`,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  const handleLoadImei = () => {
    if (!currentPort?.port) return;

    setIsLoadingModelImei(true);
    imeiRef.current = "";

    // EGMR 타임아웃 타이머 시작
    if (egmrTimeoutRef.current) clearTimeout(egmrTimeoutRef.current);
    egmrTimeoutRef.current = setTimeout(() => {
      // 2초 내 아무 응답이 없으면 TIMEOUT 처리
      currentPort.port.isLoadImei = false;
      currentPort.port.onLoadImei = null;
      currentPort.port.loadedImei = "TIMEOUT ERROR";
      setModelImei("TIMEOUT ERROR");
      setIsLoadingModelImei(false);
    }, 2000);

    currentPort.port.isLoadImei = true;
    currentPort.port.onLoadImei = (data) => {
      imeiRef.current += data;
      // console.log('[IMEI] onLoadImei data:', data);
      // console.log('[IMEI] imeiRef.current:', imeiRef.current);

      // 1. EGMR 명령에 대한 정상 응답 처리
      if (imeiRef.current.includes("+EGMR")) {
        if (egmrTimeoutRef.current) clearTimeout(egmrTimeoutRef.current);
        const match = imeiRef.current.match(/"(\d{15})"/);
        const number = match ? match[1] : "TIMEOUT ERROR";
        if (imeiTimerRef.current) {
          clearTimeout(imeiTimerRef.current);
        }
        console.log('[IMEI] +EGMR 응답, 추출된 IMEI:', number);
        currentPort.port.isLoadImei = false;
        currentPort.port.onLoadImei = null;
        currentPort.port.loadedImei = number;
        setModelImei(number);
        setIsLoadingModelImei(false);
        return;
      }

      // 2. EGMR 명령에 대한 에러 처리 → CGSN 재시도
      if (imeiRef.current.includes("CME ERROR")) {
        if (egmrTimeoutRef.current) clearTimeout(egmrTimeoutRef.current);
        if (imeiTimerRef.current) {
          clearTimeout(imeiTimerRef.current);
        }
        // console.log('[IMEI] +CME ERROR: 100 감지, 1초 후 AT+CGSN 전송');
        setTimeout(() => {
          imeiRef.current = ""; // CGSN 시도 전 반드시 초기화!
          // console.log('[IMEI] AT+CGSN 명령 전송');
          write({
            data: "AT+CGSN",
            port: currentPort.port,
            writer: currentPort.writer,
          });
          imeiTimerRef.current = setTimeout(() => {
            // 2초 내 OK 응답이 없으면 타임아웃 처리
            // console.log('[IMEI] CGSN 타임아웃, TIMEOUT ERROR');
            currentPort.port.isLoadImei = false;
            currentPort.port.onLoadImei = null;
            currentPort.port.loadedImei = "TIMEOUT ERROR";
            setModelImei("TIMEOUT ERROR");
            setIsLoadingModelImei(false);
          }, 2000);
        }, 1000);
        return;
      }

      // 3. CGSN 명령에 대한 OK 응답 처리
      if (imeiRef.current.includes("OK")) {
        const match = imeiRef.current.match(/(\d{15})/);
        const number = match ? match[1] : "TIMEOUT ERROR";
        if (imeiTimerRef.current) {
          clearTimeout(imeiTimerRef.current);
        }
        console.log('[IMEI] CGSN OK 응답, 추출된 IMEI:', number);
        currentPort.port.isLoadImei = false;
        currentPort.port.onLoadImei = null;
        currentPort.port.loadedImei = number;
        setModelImei(number);
        setIsLoadingModelImei(false);
        return;
      }
    };

    write({
      data: `AT+EGMR=0,7`,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  const renderContent = () => {
    if (!currentPort?.port) {
      return <div>No device connected</div>;
    }
    
    switch (tab) {
      case "DeviceStatus":
        return (
          <DeviceStatusTab
            originData={originData}
            formData={formData}
            modelImei={modelImei}
            isLoadingModelImei={isLoadingModelImei}
            buyer={currentPort?.port?.modelinfo ? currentPort.port.modelinfo.split("_")[1] : undefined}
            deviceVersionsObject={deviceVersionsObject}
            handleReboot={handleReboot}
            handleLoadImei={handleLoadImei}
          />
        );
      case "Network":
        return <NetworkTab formData={formData} setFormData={setFormData} />;
      case "System":
        return (
          <SystemTab
            formData={formData}
            setFormData={setFormData}
            port={currentPort?.port}
            originData={originData}
          />
        );
      case "Report":
        return <ReportTab formData={formData} setFormData={setFormData} originData={originData} />;
      case "Tracking":
        return <TrackingTab formData={formData} setFormData={setFormData} />;
      case "Bluetooth":
        return (
          <BluetoothTab
            originData={originData}
            formData={formData}
            setFormData={setFormData}
            isReady={isReady && isFechedPackage && isDeviceInfoFetched}
            write={write}
            port={currentPort}
          />
        );

      case "Accessories":
        return <AccessoriesTab formData={formData} setFormData={setFormData} />;
      case "RF":
        return <RfTab formData={formData} setFormData={setFormData} />;
      case "Input/Output(I/O)":
        return <InputOutputTab formData={formData} setFormData={setFormData} />;
      case "Driver":
        return (
          <DriverTab
            formData={formData}
            setFormData={setFormData}
            isReady={isReady}
            write={(command) =>
              write({
                data: `${AT_REQ}${imei};${command}`,
                port: currentPort?.port,
                writer: currentPort?.writer,
              })
            }
            editWrite={(command) =>
              write({
                data: `${AT_EDIT_PREFIX}${imei};${command}`,
                port: currentPort?.port,
                writer: currentPort?.writer,
              })
            }
            port={currentPort?.port}
          />
        );
      case "Commands":
        return <CommandTab imei={imei} commandData={commandData} />;
      case "Geofence":
        return (
          <GeofenceTab
            originData={originData}
            formData={formData}
            setFormData={setFormData}
            isReady={isReady}
            port={currentPort}
            write={({ data, port, writer }) =>
              write({
                data,
                port: currentPort.port,
                writer: currentPort.writer,
              })
            }
          />
        );
      case "EditProfile":
        return <EditProfileTab currentPort={currentPort} write={write} profileData={profileData} setProfileData={setProfileData} />;
      default:
        return null;
    }
  };

  const handleApply = async () => {
    if (!currentPort?.port) return;
    
    setIsLoading(true);
    const profileLines = profile.split("\n");

    for (let j = 2; j < profileLines.length; j++) {
      await delayPromise(200);
      await write({
        data: `${AT_EDIT_PREFIX};${profileLines[j].split(";;")[1]}`,
        writer: currentPort.writer,
        port: currentPort.port,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (originData) {
      const formDataValues = transformOriginData(originData);
      const modelName = currentPort?.port?.modelinfo?.split('_')[0];
      console.log("modelName=========================", modelName);
      const patchedFormData = patchFormDataByModel(formDataValues, modelName);
      console.log("patchedFormData=========================", patchedFormData);
      setFormData(patchedFormData);
      setSearchSectionData(formDataToSearchSectionData(patchedFormData, lang));
      setSearchParamData(getSearchParamsData(patchedFormData, lang, modelName));
      setCommandData(extractCommandData(originData));
    }
  }, [originData]);

  console.log(originData, "originData");

  useEffect(() => {
    if (currentPort?.port?.readable && currentPort?.port?.writable) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [currentPort?.port?.readable, currentPort?.port?.writable]);

  const { setPackageFetchingStart, deleteSerialPort } = useSerialStore();

  const handleRefreshJsonPacket = async () => {
    if (!currentPort?.port) return;
    
    setIsLoading(true);
    currentPort.port.grpNo = currentPort.jsonPackageCount;
    setPackageFetchingStart({ imei: currentPort.port.imei });

    const commands = Array.from(
      { length: currentPort.jsonPackageCount },
      (_, i) => `${AT_GET_JSON}${i + 1}`
    );
    currentPort.port.isjsonpackagefetching = true;
    currentPort.port.onjsonpacketcountup = (count) => {
      packageCountRef.current += count;
      if (packageCountRef.current === currentPort.jsonPackageCount) {
        setIsFechedPackage(true);
        isFechedPackageRef.current = true;
        setIsLoading(false);
        packageCountRef.current = 0;
      }
    };
    for (const command of commands) {
      await delayPromise(300); // 100ms 지연

      write({
        data: command,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    }

    setTimeout(() => {
      if (!isFechedPackageRef.current) {
        setIsFechedPackage(true);
        isFechedPackageRef.current = true;
        setIsLoading(false);
        currentPort.port.isjsonpackagefetching = false;
      }
    }, 10000);
  };

  const [isPasswordReady, setIsPasswordReady] = useState(false);
  const bufferRef = useRef("");

  useEffect(() => {
    if (isReady) {
      const isLock = currentPort.port.isLock;

      if (isLock && currentPort.isAlreadyUnlock && currentPort.password) {
        if (isPasswordReady) {
          handleRefreshJsonPacket();
          return;
        }

        currentPort.port.onbuffervalue = (value) => {
          bufferRef.current += value;
          if (
            value.includes(CR) ||
            bufferRef.current.trim() === "AT^$PST;UPD;2" ||
            bufferRef.current.trim() === "AT^$PST;UPD;1"
          ) {
            currentPort.port.onbuffervalue = null;

            if (bufferRef.current.trim() === "AT^$PST;UPD;2") {
            }

            if (bufferRef.current.trim() === "AT^$PST;UPD;1") {
              setIsPasswordReady(true);
            }

            bufferRef.current = "";
          }
        };

        write({
          data: `AT^$PSTUPD;${currentPort.password}`,
          writer: currentPort.writer,
          port: currentPort.port,
        });
      } else {
        handleRefreshJsonPacket();
      }
    }
  }, [isReady, isPasswordReady]);

  useEffect(() => {
    // 연결 해제 감지: currentPort가 없거나, 연결이 끊긴 상태
    if (!currentPort?.port) {
      // 팝업 띄우는 로직이 있다면 같이 실행
      // showLostPopup(); // 이미 있다면 생략
      router.replace("/device/list");
    }
  }, [currentPort?.port]);

  useEffect(() => {
    if (!originData) {
      // navigate.replace("/device");
      resetImei();
      resetTab();
      deleteSerialPort({ imei });

      // 에러를 던지지 않고 early return으로 처리
      return;
    }
  }, [originData]);

  return (
    <>
      {(isLoading || deviceInfoLoading) && <FullLoading />}
      <div className="pageWrap">
        <SideMenu
          sideMenuItems={sideMenuItems({
            onClick: handleTabChange,
            tab,
            exclude: excludeMenus,
            t,
          })}
        />
        <Stack flex={1}>
          <Controller
            onModelChange={handleResetTab}
            onApply={() => {
              handleApply();
            }}
            onLoadProfile={(profile) => {
              console.log("=== Profile Data Processing Start ===");
              console.log("Original Profile:", profile);
              setProfile(profile);
              setProfileData(profile);

              const newFormData = { ...formData };
              console.log("Initial formData:", newFormData);

              // Split profile data into lines and process each line
              profile.split("\n").forEach((line) => {
                // Skip empty lines
                if (!line.trim()) return;

                console.log("\nProcessing line:", line);

                // Parse the line
                const parts = line.split(";");
                if (parts.length < 4) return; // Need at least NTW,PRG,empty,prefix
                console.log(parts, "partspartspartsparts");
                // Get the prefix (e.g., "10")
                const prefixValue = parts[2]; // The prefix is the 4th element
                console.log("Prefix value:", prefixValue);

                // Process each pair (e.g., "00#01")
                parts.slice(4).forEach((pair) => {
                  const [id, value] = pair.split("#");
                  if (!id || !value) return;

                  // Create the key (e.g., "1000")
                  const key = `${prefixValue}${id}`;
                  console.log(
                    `Processing pair - ID: ${id}, Value: ${value}, Key: ${key}`
                  );

                  // Update only if the key exists in formData
                  if (newFormData[key]) {
                    console.log(`Updating formData for key ${key}:`, {
                      before: newFormData[key],
                      after: {
                        ...newFormData[key],
                        value,
                        realValue: value,
                      },
                    });

                    newFormData[key] = {
                      ...newFormData[key],
                      value,
                      realValue: value,
                    };
                  } else {
                    console.log(`Key ${key} not found in formData`);
                  }
                });
              });

              console.log("\nFinal formData:", newFormData);
              console.log("=== Profile Data Processing End ===\n");

              setFormData(newFormData);
            }}
            onRefreshJsonPacket={() => {
              handleRefreshJsonPacket();
              getPorts();
            }}
          />
          {renderContent()}
        </Stack>
      </div>

      {searchModal && (
        <Modal
          closeButton
          open
          toggleOpen={toggleSearchModal}
          confirm={() => {}}
          confirmButtonText="Add"
          width="720px"
          hasFooter={false}
        >
          <SearchModal
            sectionData={searchSectionData}
            paramData={searchParamData}
            onClose={({ key, tab, type }) => {
              console.log("key :::", key);

              toggleSearchModal();
              setTab(tab);
              setTimeout(() => {
                // if (type === "param" && tab === "Commands") {
                //   const targetElement = document.querySelector(`[data-command-id="${key}"]`) as HTMLElement | null;
                //   if (!targetElement) return;

                //   // 부모를 타고 올라가며 className에 MuiDialog-paper가 포함된 div를 찾음
                //   let scrollParent = targetElement.parentElement as HTMLElement | null;
                //   while (scrollParent) {
                //     if (
                //       scrollParent.className &&
                //       typeof scrollParent.className === "string" &&
                //       scrollParent.className.includes("MuiDialog-paper")
                //     ) {
                //       break;
                //     }
                //     scrollParent = scrollParent.parentElement as HTMLElement | null;
                //   }

                //   if (scrollParent) {
                //     let offset = 0;
                //     let el: HTMLElement | null = targetElement;
                //     while (el && el !== scrollParent) {
                //       offset += el.offsetTop;
                //       el = el.offsetParent as HTMLElement | null;
                //     }
                //     scrollParent.scrollTo({
                //       top: offset - 40, // 필요시 조정
                //       behavior: "smooth",
                //     });
                //     return;
                //   }

                //   // Fallback: 섹션 헤더로 스크롤 (이전과 동일)
                //   const sectionMap: { [id: string]: string } = {
                //     // NetworkCommands
                //     "0101": "NetworkCommands", "0102": "NetworkCommands", "0103": "NetworkCommands", "0104": "NetworkCommands", "0901": "NetworkCommands", "0902": "NetworkCommands", "0903": "NetworkCommands", "0904": "NetworkCommands", "0905": "NetworkCommands", "0907": "NetworkCommands", "0105": "NetworkCommands", "0121": "NetworkCommands", "0121-01": "NetworkCommands", "0201": "NetworkCommands", "0202": "NetworkCommands", "0203": "NetworkCommands", "0107": "NetworkCommands", "0108": "NetworkCommands", "0109": "NetworkCommands", "0112": "NetworkCommands", "0113": "NetworkCommands", "0114": "NetworkCommands", "0115": "NetworkCommands", "0116": "NetworkCommands", "0117": "NetworkCommands", "0118": "NetworkCommands", "0119": "NetworkCommands", "0204": "NetworkCommands", "0205": "NetworkCommands", "0504": "NetworkCommands", "0714": "NetworkCommands", "0715": "NetworkCommands", "0122": "NetworkCommands", "0735": "NetworkCommands", "0736": "NetworkCommands", "0521": "NetworkCommands", "0522": "NetworkCommands", "0922": "NetworkCommands", "1020": "NetworkCommands", "1021": "NetworkCommands", "1022": "NetworkCommands", "1023": "NetworkCommands",
                //     // SystemCommands
                //     "0303": "SystemCommands", "0304": "SystemCommands", "0721": "SystemCommands", "0302": "SystemCommands", "0731": "SystemCommands", "0732": "SystemCommands", "0524": "SystemCommands", "0737": "SystemCommands", "0771": "SystemCommands", "0772": "SystemCommands", "0509": "SystemCommands", "0510": "SystemCommands", "0511": "SystemCommands", "0512": "SystemCommands", "0724": "SystemCommands", "0530": "SystemCommands", "0533": "SystemCommands", "0584": "SystemCommands", "0584-1": "SystemCommands", "0712": "SystemCommands", "0713": "SystemCommands", "0753": "SystemCommands", "0754": "SystemCommands", "0580": "SystemCommands", "0581": "SystemCommands", "0582": "SystemCommands", "0583": "SystemCommands", "0110": "SystemCommands", "0111": "SystemCommands", "0908": "SystemCommands", "0909": "SystemCommands", "0916": "SystemCommands", "0921": "SystemCommands",
                //     // GeofenceCommands (예시)
                //     "0506": "GeofenceCommands", "0515": "GeofenceCommands", "0517": "GeofenceCommands", "0519": "GeofenceCommands", "0518": "GeofenceCommands", "0725": "GeofenceCommands", "0726": "GeofenceCommands", "0526": "GeofenceCommands", "0727": "GeofenceCommands", "0734": "GeofenceCommands",
                //     // ... (다른 섹션도 필요시 추가)
                //   };
                //   const sectionKey = sectionMap[key];
                //   if (sectionKey) {
                //     const sectionHeader = document.querySelector(`[data-section-id="${sectionKey}"]`);
                //     if (sectionHeader) {
                //       const rect = sectionHeader.getBoundingClientRect();
                //       const scrollTop = document.documentElement.scrollTop;
                //       window.scrollTo({
                //         top: rect.top + scrollTop - SCROLL_TOP_OFFSET,
                //         behavior: "smooth",
                //       });
                //     }
                //   }
                //   return;
                // }
                let targetElement = document.querySelector(
                  `[data-section-id="${key}"]`
                );

                if (type === "param") {
                  const allDivs = document.querySelectorAll(".pageWrap div");
                  targetElement = Array.from(allDivs).find(
                    (div) => div.textContent === key
                  );
                }

                if (targetElement) {
                  const rect = targetElement.getBoundingClientRect();
                  const scrollTop = document.documentElement.scrollTop;
                  window.scrollTo({
                    top: rect.top + scrollTop - SCROLL_TOP_OFFSET, // 100px offset
                    behavior: "smooth",
                  });
                  console.log("targetElement ::::", targetElement);
                }
              }, 100);
            }}
          />
        </Modal>
      )}
    </>
  );
}
