"use client";

import SideMenu from "@/components/sidemenu/SideMenu";
import { sideMenuItems } from "./sideMenuItems";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
// import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { useEffect, useState } from "react";
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
import { AT_GET_JSON, AT_REQ } from "@/src/hooks/useSerial/constant";
import useModal from "@/utils/useModal";
import SearchModal from "app/(auth)/device-info/(components)/SearchModal";
import { Button } from "@mui/material";
import Modal from "@/components/Modal";
import {
  formDataToSearchSectionData,
  SearchField,
} from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import useDeviceSearchModalStore from "@/src/stores/useDeviceSearchModal";
import Controller from "app/(auth)/configuration/components/Controller";
import useSerialStore from "@/src/stores/useSerialStore";
import FullLoading from "@/components/FullLoading";
import GeofenceTab from "./(tabs)/GeofenceTab";
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
  alert_id: string | null;
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
  if (!field.list) return null;

  return Object.values(field.list[0]).map((item) =>
    Number(item.split(";")[0]) < 10
      ? `0${item.split(";")[0]}`
      : item.split(";")[0]
  );
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

  return [
    `${tabId}${fieldId}`,
    {
      key,
      value: fieldData.value,
      realValue,
      list: optionsValueList,
      alert_id: fieldData.alert_id,
    },
  ];
};

const transformOriginData = (originData: any[]): FormData => {
  return originData.reduce((acc: FormData, item) => {
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
      }
    });

    return acc;
  }, {});
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

export default function DeviceInfoPage() {
  const [isReady, setIsReady] = useState(false);
  // data
  const [searchSectionData, setSearchSectionData] = useState<{
    [key: string]: SearchField;
  }>(null);
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const { getCurrentImei } = useSerialConfigurationStore();
  const { toggleOpen } = useCmdStore();
  const imei = getCurrentImei();

  const { lang } = useLangStore();

  const port = portList.find(({ port }) => port.imei === imei);

  const originData = portList.find(({ port }) => port.imei === imei)
    .packageToJson.synctrak;

  const [tab, setTab] = useState("Network");
  const [formData, setFormData] = useState<{
    [key: string]: FormField | null;
  }>(null);
  const [commandData, setCommandData] = useState<string[]>([]);

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

  console.log("formData", formData);

  // ! Driver 탭
  // 운전자 ID 설정 (파라미터 1800-1899, 3800-3899, 3900-3999)
  // 파라미터 범위: 1800번부터 1899번까지는 각각 운전자 ID 1번부터 100번까지를 저장하는 데 사용됩니다.
  // 기능 활성화: 1-Wire 라인에 대한 운전자 ID 기능이 활성화되면, 장치는 ID가 스캔될 때마다 이 파라미터들에 저장된 목록과 대조하여 등록된 ID인지 확인합니다.
  // 저장 용량: 장치에는 총 100개 또는 300개의 운전자 ID를 로컬에 저장할 수 있습니다.
  // 데이터 없음 응답: 요청 시 해당 파라미터에 저장된 운전자 ID가 없으면 장치는 "NoData"로 응답합니다.
  // ID 삭제: 기존에 저장된 운전자 ID를 지우려면 해당 파라미터 값을 "0000000000000000" (16개의 0)으로 설정합니다.
  // ID 형식: 운전자 ID는 16진수(HEX) 값이며, CRC + ID 번호 + 패밀리 코드 순서로 구성됩니다.
  // 예시: [CRC] [ID Number] [Family Code] -> [FE] [000012B9FB8B] [01] -> 입력 값: FE000012B9FB8B01

  const renderContent = () => {
    switch (tab) {
      case "Network":
        return <NetworkTab formData={formData} setFormData={setFormData} />;
      case "System":
        return <SystemTab formData={formData} setFormData={setFormData} />;
      case "Report":
        return <ReportTab formData={formData} setFormData={setFormData} />;
      case "Tracking":
        return <TrackingTab formData={formData} setFormData={setFormData} />;
      case "Bluetooth":
        return <BluetoothTab formData={formData} setFormData={setFormData} />;
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
                port: port.port,
                writer: port.writer,
              })
            }
            port={port.port}
          />
        );
      case "Commands":
        return (
          <DriverTab
            formData={formData}
            setFormData={setFormData}
            isReady={isReady}
            port={port.port}
          />
        );
      case "Geofence":
        return <GeofenceTab formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (originData) {
      const formDataValues = transformOriginData(originData);

      setFormData(formDataValues);
      setSearchSectionData(formDataToSearchSectionData(formDataValues, lang));
      setCommandData(extractCommandData(originData));
    }
  }, [originData]);

  useEffect(() => {
    if (port.port.readable && port.port.writable) {
      setIsReady(true);
    }
  }, [port.port.readable, port.port.writable]);

  const [isLoading, setIsLoading] = useState(false);
  const currentPort = portList.find(({ port }) => port.imei === imei);
  const { setPackageFetchingStart } = useSerialStore();

  const handleRefreshJsonPacket = async () => {
    setIsLoading(true);
    currentPort.port.grpNo = currentPort.jsonPackageCount;
    setPackageFetchingStart({ imei: currentPort.port.imei });

    const commands = Array.from(
      { length: currentPort.jsonPackageCount },
      (_, i) => `${AT_GET_JSON}${i + 1}`
    );
    currentPort.port.isjsonpackagefetching = true;
    for (const command of commands) {
      await delayPromise(100); // 100ms 지연

      write({
        data: command,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    if (isReady) {
      console.log("Test ::::");
      handleRefreshJsonPacket();
    }
  }, [isReady]);

  return (
    <>
      {isLoading && <FullLoading />}
      <div className="pageWrap">
        <SideMenu
          sideMenuItems={sideMenuItems({ onClick: handleTabChange, tab })}
        />
        {renderContent()}
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
            onClose={({ key, tab, type }) => {
              toggleSearchModal();
              setTab(tab);
              setTimeout(() => {
                let targetElement = document.querySelector(
                  `[data-section-id="${key}"]`
                );

                if (type === "param") {
                  targetElement = document.querySelector(
                    `[data-param-id="${key}"]`
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
