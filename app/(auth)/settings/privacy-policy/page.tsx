"use client";

import {
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";

export default function Server() {


  return (
    <div className="pageWrap">
      <SideMenu sideMenuItems={sideMenuItems} />
      <article className="contentWrap">
        <div className="pageTitle">Privacy Policy</div>
        <Stack height="300px">
            (Add privacy poilcy)
        </Stack>
      </article>
    </div>
  );
}
