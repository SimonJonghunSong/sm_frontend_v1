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
} from "@/src/hooks/useSerial/constant";
import SearchModal from "app/(auth)/device-info/(components)/SearchModal";
import Modal from "@/components/Modal";
import {
  formDataToSearchSectionData,
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
import { getSearchParamsData } from "@/src/utils/\bsearchParams";
import DeviceStatusTab from "app/(auth)/device-info/(tabs)/DeviceStatusTab";
import useDeviceVersions from "@/src/hooks/useDeviceVersions";
import { Stack } from "@mui/material";
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
    func: { write },
  } = useSerial();
  const [isFechedPackage, setIsFechedPackage] = useState(false);
  const packageCountRef = useRef(0);

  const { getCurrentImei } = useSerialConfigurationStore();
  const { toggleOpen } = useCmdStore();
  const imei = getCurrentImei();

  const { lang } = useLangStore();

  const currentPort = portList.find(({ port }) => port.imei === imei);

  const originData = portList.find(({ port }) => port.imei === imei)
    .packageToJson.synctrak;

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

  const handleReboot = () => {
    write({
      data: `${AT_CMD}${imei};03;03`,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  const renderContent = () => {
    switch (tab) {
      case "DeviceStatus":
        return (
          <DeviceStatusTab
            originData={originData}
            formData={formData}
            deviceVersionsObject={deviceVersionsObject}
            handleReboot={handleReboot}
          />
        );
      case "Network":
        return <NetworkTab formData={formData} setFormData={setFormData} />;
      case "System":
        return <SystemTab formData={formData} setFormData={setFormData} />;
      case "Report":
        return <ReportTab formData={formData} setFormData={setFormData} />;
      case "Tracking":
        return <TrackingTab formData={formData} setFormData={setFormData} />;
      case "Bluetooth":
        return (
          <BluetoothTab
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
                port: currentPort.port,
                writer: currentPort.writer,
              })
            }
            editWrite={(command) =>
              write({
                data: `${AT_EDIT_PREFIX}${imei};${command}`,
                port: currentPort.port,
                writer: currentPort.writer,
              })
            }
            port={currentPort.port}
          />
        );
      case "Commands":
        return <CommandTab imei={imei} />;
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
      default:
        return null;
    }
  };

  const handleApply = async () => {
    setIsLoading(true);
    const profileLines = profile.split("\n");

    for (let j = 2; j < profileLines.length; j++) {
      await delayPromise(100);
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

      setFormData(formDataValues);
      setSearchSectionData(formDataToSearchSectionData(formDataValues, lang));
      setSearchParamData(getSearchParamsData(formDataValues, lang));
      setCommandData(extractCommandData(originData));
    }
  }, [originData]);

  useEffect(() => {
    if (currentPort.port.readable && currentPort.port.writable) {
      setIsReady(true);
    }
  }, [currentPort.port.readable, currentPort.port.writable]);

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
    currentPort.port.onjsonpacketcountup = (count) => {
      packageCountRef.current += count;
      if (packageCountRef.current === currentPort.jsonPackageCount) {
        setIsFechedPackage(true);
        setIsLoading(false);
        packageCountRef.current = 0;
      }
    };
    for (const command of commands) {
      await delayPromise(100); // 100ms 지연

      write({
        data: command,
        port: currentPort.port,
        writer: currentPort.writer,
      });
    }

    setTimeout(() => {
      setIsFechedPackage(true);
      setIsLoading(false);
      currentPort.port.isjsonpackagefetching = false;
    }, 10000);
  };

  useEffect(() => {
    if (isReady) {
      handleRefreshJsonPacket();
    }
  }, [isReady]);

  return (
    <>
      {(isLoading || deviceInfoLoading) && <FullLoading />}
      <div className="pageWrap">
        <SideMenu
          sideMenuItems={sideMenuItems({ onClick: handleTabChange, tab })}
        />
        <Stack flex={1}>
          <Controller
            onApply={() => {
              handleApply();
            }}
            onLoadProfile={(profile) => {
              console.log("=== Profile Data Processing Start ===");
              console.log("Original Profile:", profile);
              setProfile(profile);

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
            onRefreshJsonPacket={handleRefreshJsonPacket}
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
