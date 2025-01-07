"use client";

import { Divider, Stack } from "@mui/material";
import React from "react";
import SideMenu from "../sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";
import Ble from "./Ble";
import BleConfiguration from "./BleConfiguration";
import SensorConfiguration from "./SensorConfiguration";
import RegisterBle from "./RegisterBle";

export default function Tracking() {
  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Controller />

        <Stack>
          <Ble />
          <Divider sx={{ mb: "40px" }} />
          <BleConfiguration />
          <Divider sx={{ mb: "40px" }} />
          <SensorConfiguration />
          <Divider sx={{ mb: "40px" }} />
          <RegisterBle />
        </Stack>
      </article>
    </div>
  );
}
