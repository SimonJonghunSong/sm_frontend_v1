"use client";

import useServiceWorkerMessage, {
  BoradcaseMessage,
} from "@/src/hooks/useServiceWorkerMessage";
import {
  handleGlobalLoadingOff,
  handleGlobalLoadingOn,
} from "@/src/stores/useGlobalLoading";
import {
  ClientToServiceWorkerResponseAction,
  ServiceWorkerToClientAction,
} from "@/src/worker/types";
import { useEffect, useRef } from "react";

export default function ServiceWorkerRegister() {
  const isReadyServiceWorker = useRef(false);
  const { swToClientBroadcast, sendMessage } = useServiceWorkerMessage();

  useEffect(() => {
    const handleMessage = (e) => {
      const message = e.data as BoradcaseMessage;

      // 클라이언트 요청의 응답으로 돌아온 message
      switch ((message as ClientToServiceWorkerResponseAction).type) {
        case "INIT_INSTALL_CHECK_RESPONSE":
          if (!message.data) {
            handleGlobalLoadingOn();
          }

          break;
        default:
          break;
      }

      // 서비스 워커에서 직접 호출한 message
      switch ((message as ServiceWorkerToClientAction).type) {
        case "INSTALL_START":
          handleGlobalLoadingOn();
          break;
        case "INSTALL_END":
          handleGlobalLoadingOff();
          break;
        default:
          break;
      }
    };

    swToClientBroadcast.addEventListener("message", handleMessage);

    // install 완료 여부 체크
    sendMessage({
      type: "INIT_INSTALL_CHECK",
    });

    return () => {
      swToClientBroadcast.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (!isReadyServiceWorker.current && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register(`/sw.js?v=${process.env.BUILD_TIMESTAMP}`)
        .then((registration) => {
          console.log(
            "Service Worker registered with scope:",
            registration.scope
          );

          return navigator.serviceWorker.ready;
        })
        .then((registration) => {
          console.log("Service Worker is now active and ready:", registration);
        })
        .catch((error) => {
          console.error("Service Worker registration failed:", error);
        });
    }
  }, []);

  return null; // UI를 렌더링하지 않는 컴포넌트
}
