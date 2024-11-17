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

export default function LanguagePage() {
  const t = useTranslations("settings");
  const { setLang, lang } = useLangStore();
  const [localLang, setLocalLang] = useState<Lang>(lang);

  const handleSave = (lang: Lang) => {
    setLang(lang);
  };

  return (
    <div className="pageWrap">
      <SideMenu sideMenuItems={sideMenuItems(lang)} />
      <article className="contentWrap">
        <div className="pageTitle">{t("languages.languages")}</div>
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
                label={t("languages.english")}
              />
              <FormControlLabel
                value="es"
                control={<Radio />}
                label={t("languages.spanish")}
              />
              <FormControlLabel
                value="pt"
                control={<Radio />}
                label={t("languages.portuguese")}
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
          >
            Save
          </Button>
        </Stack>
      </article>
    </div>
  );
}
