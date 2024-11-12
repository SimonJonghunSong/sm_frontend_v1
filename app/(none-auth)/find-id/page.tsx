"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import logo from "/public/images/logo-dark.svg";
import { Box, Button, FormControl, Stack, TextField } from "@mui/material";
import InputBox from "../../../components/inputbox/InputBox";
import SelectCountry from "../../../components/SelectCountry";
import { findId } from "@/src/api/services/auth";

export default function page() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [country, setCountry] = useState<string>();
  const [email, setEmail] = useState<string>();

  const { mutate, data } = useMutation({
    mutationFn: findId,
    onSuccess: () => {
      setStep(2);
    },
    onError: ({
      response,
    }: AxiosError<{ response: { code: number; reason: string } }>) => {
      toast(response.data.response.reason, {
        type: "error",
      });
    },
  });

  const handleFindIdSubmit = (e) => {
    e.preventDefault();
    mutate({
      country,
      email,
    });
  };

  const handleClickLogin = () => {
    router.replace("/login");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClickLogin();
  };

  const handleClickFindPassword = () => {
    router.push("/find-password");
  };

  const renderStepContent = () => {
    if (step === 1) {
      return (
        <>
          <div className="logo">
            <Image src={logo} alt="synctrack" />
          </div>
          <div className="pageTitle">Forgot your ID?</div>
          <div className="description">
            Please enter your registered email
            <br />
            address to find your ID first.
          </div>

          <div className="content">
            <form onSubmit={handleFindIdSubmit}>
              <InputBox>
                <InputBox.Head>
                  <InputBox.Title>Country</InputBox.Title>
                </InputBox.Head>
                <InputBox.Body>
                  <FormControl sx={{ width: "100%" }} size="small">
                    <SelectCountry
                      setCountryData={(data) => setCountry(data)}
                    />
                  </FormControl>
                </InputBox.Body>
              </InputBox>
              <InputBox>
                <InputBox.Head>
                  <InputBox.Title>E-mail</InputBox.Title>
                </InputBox.Head>
                <InputBox.Body>
                  <TextField
                    type="email"
                    id="input1"
                    variant="outlined"
                    size="small"
                    fullWidth
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputBox.Body>
              </InputBox>
              <Stack direction={"column"}>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ background: "var(--primary-gradient)", mt: 2 }}
                >
                  Find ID
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mt: 2 }}
                  onClick={handleClickLogin}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </div>
        </>
      );
    }
    if (step === 2) {
      return (
        <>
          <div className="logo">
            <Image src={logo} alt="synctrack" />
          </div>
          <div className="pageTitle">Your ID has been found!</div>
          <div className="content">
            <form onSubmit={handleSubmit}>
              <Box
                sx={{
                  backgroundColor: "var(--grey4)",
                  borderRadius: "8px",
                  margin: "32px 0",
                  padding: "32px 0",
                  textAlign: "center",
                }}
              >
                {data ? data.data.parameter.user_id : ""}
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
  };

  return <>{renderStepContent()}</>;
}
