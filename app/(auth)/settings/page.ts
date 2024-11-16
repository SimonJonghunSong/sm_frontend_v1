"use client";

import useNetworkMonitor from "@/utils/useNetworkMonitorStore";
import { redirect } from "next/navigation";

export default function page() {
  const { isOnline } = useNetworkMonitor();

  redirect(!isOnline ? "/settings/languages" : "/settings/my-info");
}
