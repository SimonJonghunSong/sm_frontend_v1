"use client";

import {
  Divider,
  Stack,
} from "@mui/material";
import React from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";
import FineTracking from "./FineTracking";
import ModeConfig from "./ModeConfig";
import ModeSetting from "./ModeSetting";
import ModeSetting2 from "./ModeSetting2";



export default function Page() {
  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Controller />

        <Stack>
          <FineTracking />
          <Divider sx={{ mb: "40px" }} />
          <ModeConfig />
          <Divider sx={{ mb: "40px" }} />
          <ModeSetting />
          <Divider sx={{ mb: "40px" }} />
          <ModeSetting2 />
        </Stack>
      </article>
    </div>
  );
}
