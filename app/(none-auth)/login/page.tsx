"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import { useTranslations } from "next-intl";
import logo from "/public/images/logo-dark.svg";
import OfflineErrorDialog from "@/components/OfflineErrorDialog";
import { useOnlineStatus } from "./(hooks)/useOnlineStatus";
import LoginForm from "./(components)/LoginForm";
import {
  ErrorDialog,
  OfflineLoginErrorDialog,
  OfflineRootLoginErrorDialog,
} from "./(dialog)";

export default function LoginPage() {
  const t = useTranslations("login");
  const isNavigatorOnline = useOnlineStatus();

  const [errorDialog, setErrorDialog] = useState(false);
  const [offlineErrorDialog, setOfflineErrorDialog] = useState(false);
  const [offlineLoginErrorDialog, setOfflineLoginErrorDialog] = useState(false);
  const [offlineRootLoginErrorDialog, setOfflineRootLoginErrorDialog] =
    useState(false);
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleContactUsClick = (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    if (!isNavigatorOnline) {
      e.preventDefault();
      setOfflineErrorDialog(true);
    }
  };

  return (
    <>
      <div className="logo">
        <Image src={logo} alt="synctrack" />
      </div>
      <div className="pageTitle">
        {t("login.sign_in_to_your_syncmaster_account!")}
      </div>
      <div className="description">
        {t("login.you_can_log_in_with_your_scuti_id!")}
        <br />
        {t("login.don’t_have_an_account_yet?")}
        <Link
          target="_blank"
          href="https://stsunlab.com/board/board_form?bd_id=CONTACT"
          className="underlineTextButton"
          onClick={handleContactUsClick}
        >
          {t("login.contact_us")}
        </Link>
      </div>

      <Stack justifyContent={"center"} className="content">
        <LoginForm
          isOnline={isNavigatorOnline}
          isAnonymous={isAnonymous}
          onLoginError={() => setErrorDialog(true)}
          onOfflineError={() => setOfflineErrorDialog(true)}
          onOfflineLoginError={() => setOfflineLoginErrorDialog(true)}
          onOfflineRootLoginError={() => setOfflineRootLoginErrorDialog(true)}
        />
      </Stack>

      <Stack direction="row" alignItems="center" pt={1} gap="4px">
        <Checkbox
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
        />
        <span>Anonymous</span>
      </Stack>

      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        gap="4px"
        sx={{
          color: "var(--grey5)",
          position: "absolute",
          bottom: 0,
          width: "100%",
          left: "50%",
          right: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <span>202506222235</span>
      </Stack>

      {errorDialog && <ErrorDialog onClose={() => setErrorDialog(false)} />}
      {offlineErrorDialog && (
        <OfflineErrorDialog onClose={() => setOfflineErrorDialog(false)} />
      )}
      {offlineLoginErrorDialog && (
        <OfflineLoginErrorDialog
          onClose={() => setOfflineLoginErrorDialog(false)}
        />
      )}
      {offlineRootLoginErrorDialog && (
        <OfflineRootLoginErrorDialog
          onClose={() => setOfflineRootLoginErrorDialog(false)}
        />
      )}
    </>
  );
}
