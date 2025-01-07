"use client";

import {
  Divider,
  Stack,
} from "@mui/material";
import React from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";

import Rf from "./Rf";
import SerialNoOfPresenceDevice from "./SerialNoOfPresenceDevice";
import LoRaWan from "./LoRaWan";


export default function Page() {
  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Controller />

        <Stack>
          <Rf />
          <Divider sx={{mb:"40px"}}/>
          <SerialNoOfPresenceDevice />
          <Divider sx={{mb:"40px"}}/>
          <LoRaWan />
          <Divider sx={{mb:"40px"}}/>
        </Stack>
      </article>
    </div>
  );
}
