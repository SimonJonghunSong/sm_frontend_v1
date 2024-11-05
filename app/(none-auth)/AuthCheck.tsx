import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/utils/useAuthStore";

interface AuthCheckProps {}

const AuthCheck = ({}: AuthCheckProps) => {
  const router = useRouter();
  const { token, userId } = useAuthStore();

  useEffect(() => {
    if (token || userId) {
      router.replace("/"); // 로그인이 되어 있으면
    }
  }, [router]);

  return <></>;
};

export default AuthCheck;
