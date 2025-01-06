"use client";

import { me } from "@/src/api/services/auth";
import { getModels } from "@/src/api/services/model";
import { getNoti } from "@/src/api/services/notification";
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
import useAuthStore from "@/utils/useAuthStore";
import { useEffect, useRef } from "react";

const getPrefetchApiList = () => {
  return [getModels, getNoti, me];
};

export default function ServiceWorkerRegister() {
  const isReadyServiceWorker = useRef(false);
  const { swToClientBroadcast, sendMessage } = useServiceWorkerMessage();
  const { userRole } = useAuthStore();

  useEffect(() => {
    const handleMessage = (e) => {
      const message = e.data as BoradcaseMessage;

      // 클라이언트 요청의 응답으로 돌아온 message
      switch ((message as ClientToServiceWorkerResponseAction).type) {
        case "INIT_INSTALL_CHECK_RESPONSE":
          console.log("INIT_INSTALL_CHECK_RESPONSE ::::", message.data);

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
          console.log("INSTALL_START ::::");

          handleGlobalLoadingOn();
          break;
        case "INSTALL_END":
          console.log("INSTALL_END ::::");

          getPrefetchApiList().forEach((func) => {
            func?.();
          });
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

          if (navigator.serviceWorker.controller.state === "activated") {
            handleGlobalLoadingOff();
          }

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
