"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Button, Stack, TextField } from "@mui/material";
import SideMenu from "../sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";

export default function Page() {
  const t = useTranslations();
  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <div className="pageTitle">
          {t("configuration.edit_profile.edit_profile")}
        </div>
        <Stack direction="row" gap="16px">
          <TextField
            multiline
            fullWidth
            rows={1}
            sx={{
              flexGrow: 1,
              height: "600px",
              "& .MuiInputBase-root": {
                padding: "16px 0",
                height: "100% !important",
              },
              "& textarea": {
                height: "100% !important",
              },
            }}
          />
        </Stack>

        <Stack direction="row" justifyContent="flex-end" pt={"40px"}>
          <Button variant="contained" color="secondary" sx={{ width: 200 }}>
            Save
          </Button>
        </Stack>
      </article>
    </div>
  );
}
