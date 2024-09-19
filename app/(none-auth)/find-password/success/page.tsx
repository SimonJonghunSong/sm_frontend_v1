"use client";

import { useRouter } from 'next/navigation';
import { useState } from "react";
import Image from "next/image";
import logo from "/public/images/logo-dark.svg";
import {
  Button,
  } from "@mui/material";

export default function page() {
  const router = useRouter();

  const handleClickLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">Your password has been set!</div>
      <div className="description">
        Please login with the email address
        <br />
        and password you have set
      </div>

      <div className="content">
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ background: "var(--primary-gradient)", mt: 1 }}
          onClick={handleClickLogin}
        >
          Login
        </Button>
      </div>
    </>
  );
}
