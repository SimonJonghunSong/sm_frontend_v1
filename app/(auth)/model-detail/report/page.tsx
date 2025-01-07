"use client";

import { Button, Divider, Stack } from "@mui/material";
import React, { useState } from "react";
import SideMenu from "../sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";
import Report from "./Report";
import AntiTheft from "./AntiTheft";
import ReportMapping from "./ReportMapping";
import ReportMapping2 from "./ReportMapping2";
import AlertConfig1 from "./AlertConfig1";
import AlertConfig2 from "./AlertConfig2";
import ScheduleReport from "./ScheduleReport";
import AssignHeader from "./AssignHeader";

export default function Page() {
  const [assignHeader, setAssignHeader] = useState(false);
  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Controller />

        <Stack>
          <Report />
          <Divider sx={{ mb: "40px" }} />
          <AntiTheft />
          <Divider sx={{ mb: "40px" }} />
          <ReportMapping />
          <Divider sx={{ mb: "40px" }} />
          <ReportMapping2 />
          <Stack alignItems="center" mb={"40px"}>
            {assignHeader ? (
              <AssignHeader />
            ) : (
              <Button
                variant="contained"
                color="secondary"
                sx={{ width: 200 }}
                onClick={() => setAssignHeader(true)}
              >
                Assign Header
              </Button>
            )}
          </Stack>
          <Divider sx={{ mb: "40px" }} />
          <AlertConfig1 />
          <Divider sx={{ mb: "40px" }} />
          <AlertConfig2 />
          <Divider sx={{ mb: "40px" }} />
          <ScheduleReport />
        </Stack>
      </article>
    </div>
  );
}
