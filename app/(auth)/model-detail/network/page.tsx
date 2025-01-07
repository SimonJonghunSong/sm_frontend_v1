"use client";

import { Divider, Stack } from "@mui/material";
import React from "react";
import SideMenu from "../sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";
import Network1 from "./Network1";
import Network2 from "./Network2";
import JammingDetection from "./JammingDetection";
import ImmobilizerCycle from "./ImmobilizerCycle";
import Sms from "./Sms";
import Call from "./Call";
import useParameterStore from "../../../../utils/useParameterStore";

export default function Page() {
  const { hiddenParameter } = useParameterStore();

  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Controller />

        <Stack>
          <Network1 />
          <Divider sx={{ mb: "40px" }} />
          <Network2 />
          <Divider sx={{ mb: "40px" }} />
          <JammingDetection />
          <Divider sx={{ mb: "40px" }} />
          {!hiddenParameter && (
            <>
              <ImmobilizerCycle />
              <Divider sx={{ mb: "40px" }} />
            </>
          )}
          <Sms />
          <Divider sx={{ mb: "40px" }} />
          <Call />
        </Stack>
      </article>
    </div>
  );
}
