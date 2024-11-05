import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/utils/useAuthStore";

const AuthCheck = () => {
  const router = useRouter();
  const { token, userId } = useAuthStore();

  useEffect(() => {
    if (!token || !userId) {
      router.replace("/login"); // 로그인이 안 되어 있다면 로그인 페이지로 리디렉션
    }
  }, [router]);

  return <></>;
};

export default AuthCheck;
