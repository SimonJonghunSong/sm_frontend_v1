"use client";

import SideMenu from "@/components/sidemenu/SideMenu";
import { sideMenuItems } from "./sideMenuItems";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { useEffect, useMemo, useRef, useState } from "react";
import NetworkTab from "./(tabs)/NetworkTab";
import SystemTab from "./(tabs)/SystemTab";
import ReportTab from "./(tabs)/ReportTab";
import TrackingTab from "./(tabs)/TrackingTab";
import AccessoriesTab from "./(tabs)/AccessoriesTab";
import RfTab from "./(tabs)/RfTab";
import InputOutputTab from "./(tabs)/InputOutputTab";
import useCmdStore from "@/src/stores/useCmdStore";
import SearchModal from "./(components)/SearchModal";
import Modal from "@/components/Modal";
import {
  formDataToSearchSectionData,
  SearchField,
  SearchFields,
} from "constants/searchField";
import useLangStore from "@/utils/useLangStore";
import useDeviceSearchModalStore from "@/src/stores/useDeviceSearchModal";
import Controller from "./Controller";
import FullLoading from "@/components/FullLoading";
import CommandTab from "./(tabs)/CommandTab";
import { getSearchParamsData } from "@/src/utils/\bsearchParams";
import DeviceStatusTab from "./(tabs)/DeviceStatusTab";
import { useRouter } from "next/navigation";
import { Stack } from "@mui/material";
import { getModelDataFromIDB } from "@/utils/idbModelUtil";
import { ModelConfigWithData } from "@/src/api/services/model/type";
import useModelInfoStore from "@/src/stores/useModelInfo";
import BluetoothTab from "app/(auth)/model-info/(tabs)/BluetoothTab";
const SCROLL_TOP_OFFSET = 140;

export type AssignItem = {
  type: string;
  ID: string;
  value: string;
  text_num: string;
  max: string;
};

type AssignInput = Array<{
  [key: string]: any;
}>;

type AssignOutput = {
  [key: string]: AssignItem;
};

function flattenAssignData(input?: AssignInput): {
  s_assigns: AssignItem[];
  m_assigns: AssignItem[];
  l_assigns: AssignItem[];
} {
  if (!input) return { s_assigns: [], m_assigns: [], l_assigns: [] };

  const result: AssignOutput = {};
  input.forEach((item) => {
    const key = Object.keys(item)[0];
    if (key === "info") return;
    result[key] = item[key][0];
  });

  // 배열로 변환
  const s_assigns: AssignItem[] = [];
  const m_assigns: AssignItem[] = [];
  const l_assigns: AssignItem[] = [];

  Object.entries(result).forEach(([key, value]) => {
    if (key.startsWith("S_ASSIGN")) {
      s_assigns.push(value);
    } else if (key.startsWith("M_ASSIGN")) {
      m_assigns.push(value);
    } else if (key.startsWith("L_ASSIGN")) {
      l_assigns.push(value);
    }
  });

  // ID 기준으로 정렬(숫자 오름차순)
  s_assigns.sort((a, b) => Number(a.ID) - Number(b.ID));
  m_assigns.sort((a, b) => Number(a.ID) - Number(b.ID));
  l_assigns.sort((a, b) => Number(a.ID) - Number(b.ID));

  return { s_assigns, m_assigns, l_assigns };
}

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
  text_num?: string;
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
      text_num: fieldData.text_num,
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
  const [isLoading, setIsLoading] = useState(false);
  // data
  const [searchSectionData, setSearchSectionData] = useState<{
    [key: string]: SearchFields;
  }>(null);
  const [searchParamData, setSearchParamData] = useState<{
    [key: string]: SearchField;
  }>(null);

  const [isFechedPackage, setIsFechedPackage] = useState(false);
  const packageCountRef = useRef(0);

  const { getCurrentImei } = useSerialConfigurationStore();
  const { toggleOpen } = useCmdStore();
  const imei = getCurrentImei();

  const { lang } = useLangStore();

  const [originData, setOriginData] = useState<any[]>([]);
  const [csvData, setCsvData] = useState<any>({});
  const navigate = useRouter();

  console.log("originData :::", originData);
  const { getModelName } = useModelInfoStore();

  const modelName = useMemo(() => getModelName(), [getModelName]);

  const [tab, setTab] = useState("DeviceStatus");
  const [formData, setFormData] = useState<{
    [key: string]: FormField | null;
  }>(null);
  const [profile, setProfile] = useState<string>("");
  const [commandData, setCommandData] = useState<string[]>([]);

  const [stt, setStt] = useState<{
    s_assigns: AssignItem[];
    m_assigns: AssignItem[];
    l_assigns: AssignItem[];
  }>({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });
  const [alt, setAlt] = useState<{
    s_assigns: AssignItem[];
    m_assigns: AssignItem[];
    l_assigns: AssignItem[];
  }>({
    s_assigns: [],
    m_assigns: [],
    l_assigns: [],
  });

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
    console.log("reboot!!!");
  };

  const renderContent = () => {
    switch (tab) {
      case "DeviceStatus":
        return (
          <DeviceStatusTab
            originData={originData}
            formData={formData}
            deviceVersionsObject={{}}
            handleReboot={handleReboot}
          />
        );
      case "Network":
        return <NetworkTab formData={formData} setFormData={setFormData} />;
      case "System":
        return <SystemTab formData={formData} setFormData={setFormData} />;
      case "Report":
        return (
          <ReportTab
            csvData={csvData}
            formData={formData}
            setFormData={setFormData}
            setStt={setStt}
            setAlt={setAlt}
            sttFormData={stt}
            altFormData={alt}
          />
        );
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
      // case "Driver":
      //   return (
      //     <DriverTab
      //       formData={formData}
      //       setFormData={setFormData}
      //       isReady={isReady}
      //       write={(command) =>
      //         write({
      //           data: `${AT_REQ}${imei};${command}`,
      //           port: currentPort.port,
      //           writer: currentPort.writer,
      //         })
      //       }
      //       editWrite={(command) =>
      //         write({
      //           data: `${AT_EDIT_PREFIX}${imei};${command}`,
      //           port: currentPort.port,
      //           writer: currentPort.writer,
      //         })
      //       }
      //       port={currentPort.port}
      //     />
      //   );
      case "Commands":
        return <CommandTab imei={imei} />;
      // case "Geofence":
      //   return (
      //     <GeofenceTab
      //       originData={originData}
      //       formData={formData}
      //       setFormData={setFormData}
      //       isReady={isReady}
      //       port={currentPort}
      //       write={({ data, port, writer }) =>
      //         write({
      //           data,
      //           port: currentPort.port,
      //           writer: currentPort.writer,
      //         })
      //       }
      //     />
      //   );
      default:
        return null;
    }
  };

  const handleApply = async () => {
    setIsLoading(true);
    const profileLines = profile.split("\n");

    console.log("handleApply :::::");

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
    const fetchJsonData = async () => {
      const data = ((await getModelDataFromIDB(modelName)) as any) || [];

      const jsonData = data?.jsonData?.synctrak || [];
      const csvData = data?.csvData;

      console.log("jsonData :::", jsonData);

      if (!jsonData?.length) {
        navigate.replace("/device");
      }

      setOriginData(jsonData);
      setCsvData(csvData);
    };
    fetchJsonData();
  }, []);

  useEffect(() => {
    const sttData = originData.find(
      (item) => Object.keys(item)[0] === "ASSIGN HEADER(STT)"
    );
    const altData = originData.find(
      (item) => Object.keys(item)[0] === "ASSIGN HEADER(ALT)"
    );

    setStt(flattenAssignData(sttData?.["ASSIGN HEADER(STT)"]));
    setAlt(flattenAssignData(altData?.["ASSIGN HEADER(ALT)"]));
  }, [originData]);

  return (
    <>
      {isLoading && <FullLoading />}
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
              console.log("tab :::", tab);

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
