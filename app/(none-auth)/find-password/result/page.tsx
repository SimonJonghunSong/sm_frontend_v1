"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { Button, Divider, Stack } from "@mui/material";
import logo from "/public/images/logo-dark.svg";
import { findPassword } from "@/src/api/services/auth";
import useSuccessDialog from "@/src/hooks/useSuccessDialog";

export default function page() {
  const router = useRouter();
  const t = useTranslations();
  const { toggle, renderSuccessModal } = useSuccessDialog({
    description: t(
      "popup.login.find_pw.password_reset_link_has_been_resent_to_your_email"
    ),
  });

  const { mutate } = useMutation({
    mutationFn: findPassword,
    onSuccess: toggle,
    onError: ({
      response,
    }: AxiosError<{ response: { code: number; reason: string } }>) => {
      console.error("resend error :::", response);
    },
  });

  const handleResend = () => {
    mutate({
      country: history.state.country,
      email: history.state.email,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.replace("/login");
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const country = searchParams.get("country");
    const email = searchParams.get("email");

    if (country && email) {
      history.replaceState(
        {
          country,
          email,
        },
        null,
        location.pathname
      );
    }
  }, []);

  return (
    <>
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">{t("login.email_sent.check_your_email!")}</div>
      <div className="description" style={{ width: 230 }}>
        {t("login.email_sent.password_reset_link_has_been_sent_to_your_email!")}
      </div>

      <div className="content">
        <form onSubmit={handleSubmit}>
          <Stack direction={"column"}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{ background: "var(--primary-gradient)" }}
            >
              {t("login.email_sent.login")}
            </Button>

            <Divider sx={{ my: 5 }} />
            <div className="description">
              {t("login.email_sent.didn’t_receive_the_link?")}
            </div>
            <Button
              variant="outlined"
              fullWidth
              type="button"
              onClick={handleResend}
            >
              {t("login.email_sent.resend")}
            </Button>
          </Stack>
        </form>
      </div>
      {renderSuccessModal()}
    </>
  );
}
