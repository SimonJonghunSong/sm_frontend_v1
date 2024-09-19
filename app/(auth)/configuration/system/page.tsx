"use client";

import {
  Divider,
  Stack,
} from "@mui/material";
import React from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";

import Ignition from "./Ignition";
import Accelerometer from "./Accelerometer";
import Power from "./Power";
import PowwerPassword from "./PowerPassword";


export default function Page() {
  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Controller />

        <Stack>
          <Ignition />
          <Divider sx={{mb:"40px"}}/>
          <Accelerometer />
          <Divider sx={{mb:"40px"}}/>
          <Power />
          <Divider sx={{mb:"40px"}}/>
          <PowwerPassword />
        </Stack>
      </article>
    </div>
  );
}
