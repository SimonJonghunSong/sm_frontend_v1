"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import logo from "/public/images/logo-dark.svg";

import { Button, Divider, Stack } from "@mui/material";

export default function page() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/find-id/result");
  };

  const handleClickLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">Check your email!</div>
      <div className="description">
        Password reset link has been sent
        <br />
        to your email!
      </div>

      <div className="content">
        <form onSubmit={handleClickLogin}>
          <Stack direction={"column"}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ background: "var(--primary-gradient)" }}
            >
              Login
            </Button>

            <Divider sx={{ my: 5 }} />
            <div className="description">Didn’t receive the link?</div>
            <Button variant="outlined" fullWidth onClick={handleSubmit}>
              Resend
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
}
