"use client";

import SideMenu from "@/components/sidemenu/SideMenu";
import { sideMenuItems } from "./sideMenuItems";
import useSerial from "@/src/hooks/useSerial";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import { useEffect, useState } from "react";
import NetworkTab from "app/(auth)/device-info/components/NetworkTab";

export default function DeviceInfoPage() {
  // data
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const { getCurrentImei } = useSerialConfigurationStore();
  const imei = getCurrentImei();
  const currentPort = portList.find(({ port }) => port.imei === imei);

  const originData = portList.find(({ port }) => port.imei === imei)
    .packageToJson.synctrak;

  const [tab, setTab] = useState("Network");
  const [formData, setFormData] = useState<{
    [key: string]: { value: string; realValue: string } | null;
  }>(null);

  const handleTabChange = (tab: string) => {
    console.log("tab :::", tab);
    setTab(tab);
  };

  const renderContent = () => {
    switch (tab) {
      case "Network":
        return <NetworkTab formData={formData} setFormData={setFormData} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    if (!formData) {
      setFormData(
        originData.reduce((acc, item) => {
          const fields: any = Object.values(item)?.[0];
          if (!fields?.length) {
            return acc;
          }

          const tabId = fields[0].info?.[0]?.tab_id;

          console.log("tabInfo :::", fields[0].info);

          if (!tabId) {
            return acc;
          }

          fields.forEach((field) => {
            const key = Object.keys(field)[0];
            if (key === "info") {
              return;
            }

            const fieldId =
              Number(Object.values(field)?.[0]?.[0]?.ID) < 10
                ? `0${Object.values(field)?.[0]?.[0]?.ID}`
                : Object.values(field)?.[0]?.[0]?.ID;
            const fieldValue = Object.values(field)?.[0]?.[0]?.value;
            const fieldList = Object.values(field)?.[0]?.[0]?.list;
            let realValue = fieldList
              ? Object.values(fieldList[0])?.findIndex((item: string) =>
                  item?.includes(`${fieldValue};`)
                )
              : fieldValue;

            if (fieldList && Number(realValue) < 10) {
              realValue = `0${realValue}`;
            }

            if (!fieldId) {
              return acc;
            }

            console.log("`${tabId}${fieldId}` ::::", `${tabId}${fieldId}`);
            console.log("key :::", key);
            console.log("fieldList :::", fieldList);

            acc[`${tabId}${fieldId}`] = {
              value: fieldValue,
              realValue,
            };
          });

          return acc;
        }, {} as { [key: string]: { value: string; realValue: string } })
      );
    }
  }, [originData]);

  return (
    <div className="pageWrap">
      <SideMenu
        sideMenuItems={sideMenuItems({ onClick: handleTabChange, tab })}
      />
      {renderContent()}
    </div>
  );
}
