"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/utils/useAuthStore";

export default function page() {
  const router = useRouter();
  const { token, userId } = useAuthStore();

  useEffect(() => {
    console.log(token, userId, "server here");
  }, []);

  useEffect(() => {
    router.replace("/server/scuti");
  }, []);

  return <></>;
}
