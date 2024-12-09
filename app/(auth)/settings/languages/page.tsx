"use client";

import {
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import useLangStore, { Lang } from "@/utils/useLangStore";
import { useTranslations } from "next-intl";
import useAuthStore from "@/utils/useAuthStore";
import useSuccessDialog from "@/src/hooks/useSuccessDialog";

export default function LanguagePage() {
  const t = useTranslations();
  const { setLang, lang } = useLangStore();
  const { userRole } = useAuthStore();
  const [localLang, setLocalLang] = useState<Lang>(lang);
  const isDirty = lang !== localLang;
  const { toggle, renderSuccessModal } = useSuccessDialog({
    description: t("popup.settings.my_info.saved_successfully!"),
  });

  const isRoot = userRole?.toUpperCase() === "ROOT";
  const isCustomer = userRole?.toUpperCase() === "CUSTOMER";
  const isGuest = userRole?.toUpperCase() === "GUEST";

  const handleSave = (lang: Lang) => {
    setLang(lang);
    toggle();
  };

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
        <div className="pageTitle">{t("settings.languages.languages")}</div>
        <Stack height="300px">
          <FormControl>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={lang}
              value={localLang}
              name="radio-buttons-group"
              onChange={(e) => {
                if (e.target.value) {
                  setLocalLang(e.target.value as Lang);
                }
              }}
              row
              sx={{ gap: "24px" }}
            >
              <FormControlLabel
                value="en"
                control={<Radio />}
                label={"English"}
              />
              <FormControlLabel
                value="es"
                control={<Radio />}
                label={"Español"}
              />
              <FormControlLabel
                value="pt"
                control={<Radio />}
                label={"Português"}
              />
            </RadioGroup>
          </FormControl>
        </Stack>
        <Stack
          direction="row"
          gap="8px"
          justifyContent="flex-end"
          marginTop="40px"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => handleSave(localLang)}
            disabled={!isDirty}
          >
            {t("settings.my_info.save")}
          </Button>
        </Stack>
      </article>
      {renderSuccessModal()}
    </div>
  );
}
