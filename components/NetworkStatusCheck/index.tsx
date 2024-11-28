"use client";

import useServiceWorkerMessage from "@/src/hooks/useServiceWorkerMessage";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

const FORCE_ONLINE_MODE_PATHS = ["/login"];

export default function NetworkStatusCheck() {
  const { sendMessage } = useServiceWorkerMessage();
  const { isOnline, isSelfOffline, setIsOnline } = useNetworkMonitor();
  const pathname = usePathname();

  // 실제 네트워크 이벤트 감지
  useEffect(() => {
    const handleNetworkOff = () => {
      if (isOnline) {
        setIsOnline(false);
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

  return null;
}
