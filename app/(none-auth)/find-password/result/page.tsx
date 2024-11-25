"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Divider, Stack } from "@mui/material";
import logo from "/public/images/logo-dark.svg";
import { useMutation } from "@tanstack/react-query";
import { findPassword } from "@/src/api/services/auth";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

export default function page() {
  const router = useRouter();
  const t = useTranslations("login");

  const { mutate } = useMutation({
    mutationFn: findPassword,
    onError: ({
      response,
    }: AxiosError<{ response: { code: number; reason: string } }>) => {
      toast(response.data.response.reason, {
        type: "error",
      });
    },
  });

  const handleResend = (e) => {
    mutate(
      {
        country: history.state.country,
        email: history.state.email,
      },
      {
        onSuccess: ({ data }) => {
          const message = (data as any)?.response?.reason;
          toast(message, { type: "success" });
        },
      }
    );

    // router.push("/find-password/result");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/login");
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
      <div className="pageTitle">{t("email_sent.check_your_email!")}</div>
      <div className="description" style={{ width: 230 }}>
        {t("email_sent.password_reset_link_has_been_sent_to_your_email!")}
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
              {t("email_sent.login")}
            </Button>

            <Divider sx={{ my: 5 }} />
            <div className="description">Didn’t receive the link?</div>
            <Button
              variant="outlined"
              fullWidth
              type="button"
              onClick={handleResend}
            >
              {t("email_sent.resend")}
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
}
