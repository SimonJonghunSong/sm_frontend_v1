"use client";

import "../../styles/variable.css";
import "../../styles/reset.css";
import "../../styles/global.css";
import "react-toastify/dist/ReactToastify.css";
import { use, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import FullLoading from "@/components/FullLoading";
import AuthCheck from "./AuthCheck";
import GlobalLoading from "@/components/GlobalLoading";
import Footer from "@/components/Footer";
import Modal from "@/components/Modal";
import { Box, Stack, TextField } from "@mui/material";
import CreateNotiModal from "@/components/CreateNotiModal";

const AuthLayout = ({ children }) => {
  const [hydrated, setHydrated] = useState<boolean>(false);
  const [notiModal, setNotiModal] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (e.shiftKey && e.code === "KeyN") {
        setNotiModal(true);
        console.log("132");
      }
    };
    window.addEventListener("keydown", handler);

    return () => {
      window.removeEventListener("keydown", handler);
    };
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
      <Footer />

      {/* noti modal 임시 */}
      {notiModal && <CreateNotiModal onClose={() => setNotiModal(false)} />}
    </div>
  );
};

export default AuthLayout;
