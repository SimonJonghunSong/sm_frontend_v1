"use client";

import "../../styles/variable.css";
import "../../styles/reset.css";
import "../../styles/global.css";
import { useEffect, useState } from "react";
import AuthCheck from "./AuthCheck";
import GlobalLoading from "@/components/GlobalLoading";

const NoneAuthLayout = ({ children }) => {
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return;

  return (
    <div className="noneAuthWrap">
      <AuthCheck />
      {children}
      <GlobalLoading />
    </div>
  );
};

export default NoneAuthLayout;
