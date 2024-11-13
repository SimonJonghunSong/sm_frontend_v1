"use client";

import "../../styles/variable.css";
import "../../styles/reset.css";
import "../../styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import FullLoading from "@/components/FullLoading";
import AuthCheck from "./AuthCheck";
import GlobalLoading from "@/components/GlobalLoading";

const AuthLayout = ({ children }) => {
  const [hydrated, setHydrated] = useState<boolean>(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated)
    return (
      <div className="mainWrap">
        <Navbar />
        <FullLoading />
      </div>
    );

  return (
    <div className="mainWrap">
      <AuthCheck />
      <Navbar />
      <section>{children}</section>
      <GlobalLoading />
    </div>
  );
};

export default AuthLayout;
