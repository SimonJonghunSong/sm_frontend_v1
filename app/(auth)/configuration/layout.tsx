"use client";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import { useTransformedConfigData } from "@/src/hooks/useTransformConfigData";
import { redirect, usePathname, useRouter } from "next/navigation";
import useSerial from "@/src/hooks/useSerial";
import SideMenu from "@/components/sidemenu/SideMenu";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";

const EXCLUDE_CONFIG_PATHS = [
  "/configuration/device-status",
  "/configuration/edit-profile",
  "/configuration/fw-update",
];

// 탭 형식 레이아웃

const ConfigurationLayout = ({ children }) => {
  const router = useRouter();
  const { getCurrentImei, getTab, setTab } = useSerialConfigurationStore();
  const pathname = usePathname();
  const imei = getCurrentImei();
  const tab = getTab();

  // data
  const {
    state: { portList },
  } = useSerial();

  if (!portList?.length) {
    redirect("/404");
  } else if (
    !imei ||
    !portList.find(({ port }) => port.imei === imei).packageToJson
  ) {
    redirect("/device");
  }

  const { formData } = useTransformedConfigData({
    data: portList.find(({ port }) => port.imei === imei).packageToJson
      .synctrak,
    blacklist: ["info", "Circular Geofence", "Polygon Geofence"],
  });

  // state
  const defaultTabName = tab || formData[0].tabName;

  // event
  const handleTabClick = (name: string) => {
    if (name === "Geofence") {
      setTab("geofence");
      router.push("/configuration/geofence");
    } else if (pathname !== "/configuration") {
      setTab(name);
      router.push("/configuration");
    } else {
      setTab(name);
    }
  };

  useEffect(() => {
    if (pathname !== "/configuration") {
      setTab("geofence");
    } else {
      setTab(defaultTabName);
    }
  }, [pathname]);

  useEffect(() => {
    setTab(defaultTabName);
  }, [imei]);

  return (
    <>
      <div className="pageWrap">
        <SideMenu
          queries={{ imei }}
          configuration
          sideMenuItems={[
            {
              name: "Device Status",
              href: `/configuration/device-status`,
              isActive: pathname === "/configuration/device-status",
            },
            ...formData.map((item) => {
              const key = item.tabName;

              return {
                name: key,
                isActive: pathname === "/configuration" && tab === key,
                href: "/configuration",
                offlineEnable: true,
                onClick: handleTabClick,
              };
            }),
            {
              name: "Geofence",
              href: "/configuration/geofence",
              offlineEnable: true,
              isActive:
                !EXCLUDE_CONFIG_PATHS.includes(pathname) && tab === "geofence",
              onClick: handleTabClick,
            },
          ]}
        />
        {children}
      </div>
      <ToastContainer />
    </>
  );
};

export default ConfigurationLayout;
