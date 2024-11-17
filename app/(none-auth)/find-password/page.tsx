"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import Image from "next/image";
import logo from "/public/images/logo-dark.svg";
import InputBox from "../../../components/inputbox/InputBox";
import { Button, FormControl, Stack, TextField } from "@mui/material";
import SelectCountry from "../../../components/SelectCountry";
import { findPassword } from "@/src/api/services/auth";
import { useTranslations } from "next-intl";

export default function page() {
  const router = useRouter();
  const t = useTranslations("login");
  const [country, setCountry] = useState<string>();
  const [email, setEmail] = useState<string>();

  const { mutate } = useMutation({
    mutationFn: findPassword,
    onSuccess: () => {
      router.push("/find-password/result");
    },
    onError: ({
      response,
    }: AxiosError<{ response: { code: number; reason: string } }>) => {
      toast(response.data.response.reason, {
        type: "error",
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate({
      country,
      email,
    });
  };

  const handleClickLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">{t("find_pw.forgot_your_password?")}</div>
      <div className="description" style={{ width: 230 }}>
        {t(
          "find_pw.please_enter_your_registered_email_address_to_reset_your_password"
        )}
      </div>

      <div className="content">
        <form onSubmit={handleSubmit}>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>{t("find_pw.country")}</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <FormControl sx={{ width: "100%" }} size="small">
                <SelectCountry
                  setCountryData={(country) => setCountry(country)}
                />
              </FormControl>
            </InputBox.Body>
          </InputBox>
          <InputBox>
            <InputBox.Head>
              <InputBox.Title>{t("find_pw.e-mail")}</InputBox.Title>
            </InputBox.Head>
            <InputBox.Body>
              <TextField
                type="email"
                id="input1"
                variant="outlined"
                size="small"
                fullWidth
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
              {t("find_pw.send_e-mail")}
            </Button>
            <Button
              variant="outlined"
              fullWidth
              sx={{ mt: 2 }}
              onClick={handleClickLogin}
            >
              {t("find_pw.login")}
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
}
