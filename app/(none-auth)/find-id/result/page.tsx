"use client";

import { useRouter } from 'next/navigation';
import Image from "next/image";
import logo from "/public/images/logo-dark.svg";
import {
  Box,
  Button,
  Stack,
  } from "@mui/material";

export default function page() {
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClickLogin();
  };

  const handleClickLogin = () => {
    router.push("/login");
  };

  const handleClickFindPassword = () => {
    router.push("/find-password");
  };

  return (
    <>
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">Your ID has been found!</div>
      <div className="content">
        <form onSubmit={handleSubmit}>
          <Box sx={{
            backgroundColor: "var(--grey4)",
            borderRadius: "8px",
            margin: "32px 0",
            padding: "32px 0",
            textAlign: "center"
          }}>
            abc*****
          </Box>
          <Stack direction={"column"}>
            <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ background: "var(--primary-gradient)", mt: 2 }}
                >
                Login
            </Button>
            <Button
                variant="outlined"
                fullWidth
                sx={{ mt: 2 }}
                onClick={handleClickFindPassword}
            >
                Find password
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
}
