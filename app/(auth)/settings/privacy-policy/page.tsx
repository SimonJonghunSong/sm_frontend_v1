"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Stack } from "@mui/material";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import useLangStore from "@/utils/useLangStore";
import useAuthStore from "@/utils/useAuthStore";

export default function PrivacyPolicyPage() {
  const t = useTranslations("settings");
  const { lang } = useLangStore();

  const { userRole } = useAuthStore();

  const isRoot = userRole?.toUpperCase() === "ROOT";
  const isCustomer = userRole?.toUpperCase() === "CUSTOMER";
  const isGuest = userRole?.toUpperCase() === "GUEST";

  return (
    <div className="pageWrap">
      <SideMenu
        sideMenuItems={
          isRoot
            ? sideMenuItems(lang, userRole).filter(
                ({ key }) => key === "myInfo" || key === "logout"
              )
            : isCustomer || isGuest
            ? sideMenuItems(lang, userRole).filter(
                ({ key }) => key !== "privacyPolicy"
              )
            : sideMenuItems(lang, userRole)
        }
      />
      <article className="contentWrap">
        <div className="pageTitle">{t("side_bar.privacy_policy")}</div>
        <Stack height="300px">(Add privacy poilcy)</Stack>
      </article>
    </div>
  );
}
