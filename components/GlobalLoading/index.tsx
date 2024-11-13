"use client";

import FullLoading from "@/components/FullLoading";
import useGlobalLoadingStore from "@/src/stores/useGlobalLoading";

export default function GlobalLoading() {
  const { isLoading } = useGlobalLoadingStore();

  return isLoading ? <FullLoading /> : null;
}
