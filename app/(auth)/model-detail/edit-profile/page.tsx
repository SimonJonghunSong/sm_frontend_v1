"use client";

import React from "react";
import SideMenu from "../sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import { Button, Stack, TextField } from "@mui/material";

export default function Page() {
  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <div className="pageTitle">Edit Profile</div>
        <Stack direction="row" gap="16px">
          <TextField
            multiline
            fullWidth
            rows={1}
            sx={{
              flexGrow: 1,
              height: "120px",
              "& .MuiInputBase-root": {
                padding: "10px 12px",
                height: "100% !important",
              },
              "& textarea": {
                height: "100% !important",
              },
            }}
          />
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
            sx={{ marginTop: "168px !important" }}
          >
            Save
          </Button>
        </Stack>
      </article>
    </div>
  );
}
