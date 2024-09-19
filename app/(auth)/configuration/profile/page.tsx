"use client";

import {
  Divider,
  Stack,
} from "@mui/material";
import React from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";
import ProfileSettings from "./ProfileSettings";
import ProfileSettings2 from "./ProfileSettings2";



export default function Page() {
  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Controller />

        <Stack>
          <ProfileSettings />
          <Divider sx={{ mb: "40px" }} />
          <ProfileSettings2 />
        </Stack>
      </article>
    </div>
  );
}
