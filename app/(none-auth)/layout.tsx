"use client";

import "../../styles/variable.css";
import "../../styles/reset.css";
import "../../styles/global.css";
import { useEffect, useState } from "react";

const NoneAuthLayout = ({ children }) => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return;

  return <div className="noneAuthWrap">{children}</div>;
};

export default NoneAuthLayout;
