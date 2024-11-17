"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Button, Divider, Stack } from "@mui/material";
import logo from "/public/images/logo-dark.svg";

export default function page() {
  const router = useRouter();
  const t = useTranslations("login");
  const handleResend = (e) => {
    e.preventDefault();
    router.push("/find-password/result");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/login");
  };

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
