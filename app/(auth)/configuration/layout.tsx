"use client";

import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useTransformedConfigData } from "../../../src/hooks/useTransformConfigData";
import {
  redirect,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { tabNameToHref } from "./components/FieldRenderer";
import useSerial from "../../../src/hooks/useSerial";
import SideMenu from "../../../components/sidemenu/SideMenu";

// 탭 형식 레이아웃
interface IConfigurationPageContext {
  tab: string;
  setTab: Dispatch<SetStateAction<string>>;
}

export const configurationPageContext =
  createContext<IConfigurationPageContext>({
    tab: "",
    setTab: () => {},
  });

const ConfigurationLayout = ({ children }) => {
  // util
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const imei = searchParams.get("imei");

  // data
  const {
    state: { portList },
  } = useSerial();

  if (!portList?.length) {
    redirect("/404");
  } else if (!searchParams.get("imei")) {
    redirect("/device");
  }

  const { originData } = useTransformedConfigData({
    data: portList.find(({ port }) => port.imei === imei).packageToJson
      .synctrak,
    blacklist: ["info", "Circular Geofence", "Polygon Geofence"],
  });

  // state
  const defaultTabName =
    searchParams.get("tab") || Object.keys(originData?.[1])?.[0];
  const [tab, setTab] = useState(
    pathname !== "/configuration" ? "" : defaultTabName
  );

  // event
  const handleTabClick = (name: string) => {
    if (pathname !== "/configuration") {
      router.push(`/configuration?imei=${imei}`);
    } else if (name === "Geofence") {
      router.replace(`/configuration/geofence?imei=${imei}`);
    } else {
      router.replace(`/configuration?tab=${name}&imei=${imei}`);
    }

    setTab(name);
  };

  useEffect(() => {
    if (pathname !== "/configuration") {
      setTab("");
    } else {
      setTab(defaultTabName);
    }
  }, [pathname]);

  return (
    <configurationPageContext.Provider value={{ tab, setTab }}>
      <div className="pageWrap">
        <SideMenu
          queries={{ imei }}
          configuration
          sideMenuItems={[...originData, { Geofence: {} }]
            .map((item) => {
              const [key] = Object.entries(item)[0];

              return {
                name: key as unknown as string,
                href: `/configuration/${tabNameToHref(
                  key as unknown as string
                )}`,
                isActive: tab === key,
                onClick: handleTabClick,
              };
            })
            .filter((item) => item.name !== "info")}
        />
        {children}
      </div>
    </configurationPageContext.Provider>
  );
};

export default ConfigurationLayout;
