"use client";

import ErrorDialog from "@/components/ErrorDialog";
import useServiceWorkerMessage from "@/src/hooks/useServiceWorkerMessage";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FORCE_ONLINE_MODE_PATHS = ["/login"];
export const DISABLED_OFFLINE_MODE_PATHS = ["/account", "/model/admin"];

export default function NetworkStatusCheck() {
  const { sendMessage } = useServiceWorkerMessage();
  const { isOnline, isSelfOffline, setIsOnline } = useNetworkMonitor();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations();

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
    sendMessage({
      type: "SYNC_NETWORK_STATE",
      data: isOnline,
    });
  }, [isOnline]);

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
