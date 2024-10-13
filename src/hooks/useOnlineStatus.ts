import { useEffect } from "react";
import useNetworkMonitorStore from "../../utils/useNetworkMonitorStore";
import {
  MANUAL_STATUS_UPDATED,
  NETWORK_STATUS_CHANGED,
} from "../constants/actionTypes";

const useOnlineStatus = () => {
  const { isOnline, setIsOnline } = useNetworkMonitorStore();

  // 초기 온라인 상태 설정
  useEffect(() => {
    if (isOnline === undefined) {
      setIsOnline(navigator.onLine);
    }

    if (navigator.serviceWorker?.controller) {
      navigator.serviceWorker.controller.postMessage({
        payload:
          isOnline === undefined
            ? navigator.onLine
              ? "online"
              : "offline"
            : isOnline
            ? "online"
            : "offline",
      });
    }
  }, []);

  useEffect(() => {
    const handleServiceWorkerMessage = (event: MessageEvent) => {
      const { type, payload } = event.data || {};

      switch (type) {
        case MANUAL_STATUS_UPDATED:
          setIsOnline(payload);
          break;
        case NETWORK_STATUS_CHANGED:
          if (!payload) {
            setIsOnline(payload);
          }
          break;
        default:
          break;
      }
    };

    const notifyServiceWorker = (status: string) => {
      navigator.serviceWorker?.controller?.postMessage({ payload: status });
    };

    const handleOffline = () => notifyServiceWorker("offline");
    const handleOnline = () => notifyServiceWorker("online");

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    navigator.serviceWorker?.addEventListener(
      "message",
      handleServiceWorkerMessage
    );

    // Flow : window event => service worker => post message => handleServiceWorkerMessage

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("offline", handleOnline);
      navigator.serviceWorker?.removeEventListener(
        "message",
        handleServiceWorkerMessage
      );
    };
  }, [setIsOnline]);
};

export default useOnlineStatus;
