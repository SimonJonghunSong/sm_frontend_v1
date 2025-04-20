"use client";

import ErrorDialog from "@/components/ErrorDialog";
import useServiceWorkerMessage from "@/src/hooks/useServiceWorkerMessage";
import { olineChangeWithLogin } from "@/utils/idbLoginUtil";
import useAuthStore from "@/utils/useAuthStore";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const FORCE_ONLINE_MODE_PATHS = [
  "/login",
  "/find-id",
  "/find-password",
  "/find-password/result",
  "/find-password/set-password",
  "/find-password/success",
];

export const DISABLED_OFFLINE_MODE_PATHS = ["/account", "/model/admin"];

export default function NetworkStatusCheck() {
  const { sendMessage } = useServiceWorkerMessage();
  const { isOnline, isSelfOffline, setIsOnline } = useNetworkMonitor();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();
  const { userId, setUserId, setUserRole, setToken, setRefreshToken } =
    useAuthStore();

  const [forceOfflineChangeModalOpen, setForceOfflineChangeModalOpen] =
    useState(false);

  // 실제 네트워크 이벤트 감지
  useEffect(() => {
    const handleNetworkOff = () => {
      if (isOnline) {
        setIsOnline(false);

        setForceOfflineChangeModalOpen(true);
      }
    };
    const handleNetworkOn = () => {
      if (!isSelfOffline) {
        setIsOnline(true);
      }
    };

    window.addEventListener("online", handleNetworkOn);
    window.addEventListener("offline", handleNetworkOff);

    return () => {
      window.removeEventListener("online", handleNetworkOn);
      window.removeEventListener("offline", handleNetworkOff);
    };
  }, [isOnline, isSelfOffline]);

  // 로그인 페이지 접근시 온라인으로 전환(인터넷 연결 있을시)
  // useEffect(() => {
  //   if (FORCE_ONLINE_MODE_PATHS.findIndex((path) => path === pathname) > -1) {
  //     setIsOnline(navigator.onLine);
  //   }
  // }, [pathname]);

  // Sync Service Worker
  useEffect(() => {
    if (FORCE_ONLINE_MODE_PATHS.includes(pathname)) {
      sendMessage({
        type: "SYNC_NETWORK_STATE",
        data: true,
      });
    } else {
      sendMessage({
        type: "SYNC_NETWORK_STATE",
        data: isOnline,
      });
    }
  }, [isOnline, pathname]);

  const syncLogin = async (userId: string) => {
    const response = await olineChangeWithLogin(userId);

    console.log("response :::", response);

    setToken(response.data.parameter.accessToken);
    setRefreshToken(response.data.parameter.refreshToken);
    setUserRole(response.data.parameter.role);
    setUserId(response.data.parameter.email);
  };

  // 온라인 로그인 싱크
  const onlineChangeRef = useRef(false);
  useEffect(() => {
    if (onlineChangeRef.current && isOnline && userId) {
      syncLogin(userId);
      onlineChangeRef.current = false;
    }

    if (!isOnline) {
      onlineChangeRef.current = true;
    }
  }, [isOnline, userId]);

  return (
    <>
      {forceOfflineChangeModalOpen && (
        <ErrorDialog
          text={t(
            "popup.common.common.internet_disconnected_please_check_your_internet_connection"
          )}
          onClose={() => {
            if (DISABLED_OFFLINE_MODE_PATHS.includes(pathname)) {
              router.replace("/");
            } else {
              setForceOfflineChangeModalOpen(false);
            }
          }}
        />
      )}
    </>
  );
}
