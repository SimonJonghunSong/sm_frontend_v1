"use client";

import "../../styles/variable.css";
import "../../styles/reset.css";
import "../../styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { useRouter } from "next/navigation";
import useAuthStore from "@/utils/useAuthStore";

const AuthLayout = ({ children }) => {
  const router = useRouter();
  const { token, userId } = useAuthStore();

  useEffect(() => {
    if (!token || !userId) {
      router.replace("/login"); // 로그인이 안 되어 있다면 로그인 페이지로 리디렉션
    }
  }, [router]);

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
