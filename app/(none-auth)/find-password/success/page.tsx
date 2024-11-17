"use client";

import Image from "next/image";
import { Button } from "@mui/material";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import logo from "/public/images/logo-dark.svg";

export default function page() {
  const t = useTranslations("login");
  const router = useRouter();

  const handleClickLogin = () => {
    router.push("/login");
  };

  return (
    <>
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">{t("pw_set.your_password_has_been_set!")}</div>
      <div className="description" style={{ width: 230 }}>
        {t(
          "pw_set.please_login_with_the_email_address_and_password_you_have_set"
        )}
      </div>

      <div className="content">
        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ background: "var(--primary-gradient)", mt: 1 }}
          onClick={handleClickLogin}
        >
          {t("pw_set.login")}
        </Button>
      </div>
    </>
  );
}
