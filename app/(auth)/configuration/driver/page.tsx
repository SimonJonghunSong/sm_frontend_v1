"use client";

import {
  Divider,
  Stack,
} from "@mui/material";
import React from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";
import DriverId1to100 from "./DriverId1to100";
import DriverId101to200 from "./DriverId101to200";
import DriverId201to300 from "./DriverId201to300";



export default function Page() {
  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Controller />

        <Stack>
          <DriverId1to100 />
          <Divider sx={{ mb: "40px" }} />
          <DriverId101to200 />
          <Divider sx={{ mb: "40px" }} />
          <DriverId201to300 />
          <Divider sx={{ mb: "40px" }} />
        </Stack>
      </article>
    </div>
  );
}
