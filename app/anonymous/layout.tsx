"use client";

import "../../styles/variable.css";
import "../../styles/reset.css";
import "../../styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import AnonymousNavbar from "@/components/navbar/AnonymousNavbar";
import FullLoading from "@/components/FullLoading";
import GlobalLoading from "@/components/GlobalLoading";
import Footer from "@/components/Footer";
import useSerial from "@/src/hooks/useSerial";

const AuthLayout = ({ children }) => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  const {
    func: { removePorts, getPorts },
    state: { portList },
  } = useSerial();
  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const isRendered = sessionStorage.getItem("isRendered");
    if (!isRendered) {
      removePorts();
      getPorts();
      sessionStorage.setItem("isRendered", "rendered");
    }
  }, [portList]);

  if (!hydrated)
    return (
      <div className="mainWrap">
        <AnonymousNavbar />
        <FullLoading />
      </div>
    );

  return (
    <div className="mainWrap">
      <AnonymousNavbar />
      <section>{children}</section>
      <GlobalLoading />
      <Footer />
    </div>
  );
};

export default AuthLayout;
