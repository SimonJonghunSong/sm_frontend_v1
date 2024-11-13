"use client";

import useServiceWorkerMessage from "@/src/hooks/useServiceWorkerMessage";
import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import { useEffect } from "react";

export default function NetworkStatusCheck() {
  const { sendMessage } = useServiceWorkerMessage();
  const { isOnline, setIsOnline } = useNetworkMonitor();

  // 실제 네트워크 이벤트 감지
  useEffect(() => {
    const handleNetworkOff = () => {
      if (isOnline) {
        setIsOnline(false);
      }
    };

    window.addEventListener("offline", handleNetworkOff);

    return () => {
      window.removeEventListener("offline", handleNetworkOff);
    };
  }, []);

  // Sync Service Worker
  useEffect(() => {
    sendMessage({
      type: "SYNC_NETWORK_STATE",
      data: isOnline,
    });

    console.log("change~~~~~", isOnline);
  }, [isOnline]);

  return null;
}
