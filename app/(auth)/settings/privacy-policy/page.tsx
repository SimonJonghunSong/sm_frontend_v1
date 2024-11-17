"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Stack } from "@mui/material";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import useLangStore from "@/utils/useLangStore";

export default function PrivacyPolicyPage() {
  const t = useTranslations("settings");
  const { lang } = useLangStore();

  return (
    <div className="pageWrap">
      <SideMenu sideMenuItems={sideMenuItems(lang)} />
      <article className="contentWrap">
        <div className="pageTitle">{t("side_bar.privacy_policy")}</div>
        <Stack height="300px">(Add privacy poilcy)</Stack>
      </article>
    </div>
  );
}
