"use client";

import SideMenu from "@/components/sidemenu/SideMenu";
import { sideMenuItems } from "./sideMenuItems";
import useSerial from "@/src/hooks/useSerial";
// import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { useEffect, useState } from "react";
import NetworkTab from "app/(auth)/device-info/(tabs)/NetworkTab";
import SystemTab from "./(tabs)/SystemTab";
import ReportTab from "./(tabs)/ReportTab";
import TrackingTab from "./(tabs)/TrackingTab";

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

export default function DeviceInfoPage() {
  // data
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const { getCurrentImei } = useSerialConfigurationStore();
  const imei = getCurrentImei();

  const originData = portList.find(({ port }) => port.imei === imei)
    .packageToJson.synctrak;

  const [tab, setTab] = useState("Network");
  const [formData, setFormData] = useState<{
    [key: string]: FormField | null;
  }>(null);

  const handleTabChange = (tab: string) => {
    setTab(tab);
  };

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
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!formData && originData) {
      setFormData(transformOriginData(originData));
    }
  }, [originData, formData]);

  return (
    <div className="pageWrap">
      <SideMenu
        sideMenuItems={sideMenuItems({ onClick: handleTabChange, tab })}
      />
      {renderContent()}
    </div>
  );
}
