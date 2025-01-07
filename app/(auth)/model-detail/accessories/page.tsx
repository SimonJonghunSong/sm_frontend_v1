"use client";

import {
  Divider,
  Stack,
} from "@mui/material";
import React from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";
import WireSettings from "./WireSettings";
import SerialRS232 from "./SerialRS232";
import Accessory from "./Accessory";
import Mdsm7 from "./Mdsm7";

export default function Server() {
  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />
      <article className="contentWrap">
        <Controller />

        <Stack>
          <WireSettings />
          <Divider sx={{mb:"40px"}}/>
          <SerialRS232 />
          <Divider sx={{mb:"40px"}}/>
          <Accessory />
          <Divider sx={{mb:"40px"}}/>
          <Mdsm7 />
          <Divider sx={{mb:"40px"}}/>
        </Stack>
      </article>
    </div>
  );
}
