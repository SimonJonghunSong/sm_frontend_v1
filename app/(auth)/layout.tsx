"use client";

import "../../styles/variable.css";
import "../../styles/reset.css";
import "../../styles/global.css";
import Navbar from "../../components/navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  let authStore = null;
  if (typeof window !== "undefined") {
    authStore = JSON.parse(localStorage.getItem("syncMasterAuthStore"));
  }

  useEffect(() => {
    if (authStore && !authStore.state.userId) {
      router.replace("/login"); // 로그인이 안 되어 있다면 로그인 페이지로 리디렉션
    }
  }, [router]);

  if (authStore && !authStore.state.userId) {
    return null; // 로그인 상태가 아니면 아무것도 렌더링하지 않음
  }

  // useState, useEffect hook
  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return;

  return (
    <div className="mainWrap">
      <Navbar />
      <section>{children}</section>
    </div>
  );
};

export default AuthLayout;
