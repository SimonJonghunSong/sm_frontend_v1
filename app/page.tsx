"use client";

import React, { useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useAuthStore from "../utils/useAuthStore";

export default function Main() {
  const { userId, userRole } = useAuthStore();
  // FIX: 로그인 여부에 따라 홈 화면 분기

  const router = useRouter();

  useLayoutEffect(() => {
    if (userId !== null && userRole !== null) {
      switch (userRole) {
        case "ROOT":
          router.replace("/server");
          return;
        case "ADMIN":
          router.replace("/model");
          return;
        case "CUSTOMER":
          router.replace("/model");
          return;
        case "GUEST":
          router.replace("/model");
          return;

        default:
          break;
      }
    } else {
      router.replace("/login");
    }
  }, [userRole, router]);

  // TODO: 임시로 클라이언트 측에서 분기하는데, 리디렉션 사이에 깜빡임처럼 보이기 때문에 서버사이드 처리가 필요함
  return <></>;
}
