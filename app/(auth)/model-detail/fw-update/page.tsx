"use client";

import React from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import { Box, Button, Stack, TextField } from "@mui/material";

export default function Page() {
  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <div className="pageTitle">F/W Update</div>
        {/* // TODO: 업데이트 가능 분기 (true: 업데이트 가능 / false: 업데이트 없음 레이아웃) */}
        {true ? (
          <>
            <Stack
              sx={{
                width: "100%",
                height: "120px",
                marginBottom: "16px",
                fontSize: 16,
                fontWeight: 500,
                backgroundColor: "var(--primary-light)",
                borderRadius: "8px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Firmware v.X.X.X update available
            </Stack>
            <Button>Firmware Update on Target Device</Button>
            <Stack
              direction="row"
              gap="8px"
              justifyContent="flex-end"
              marginTop="40px"
            >
              <Button
                variant="contained"
                color="secondary"
                sx={{ marginTop: "120px !important" }}
              >
                Download
              </Button>
            </Stack>
          </>
        ) : (
          <Stack
            sx={{
              width: "100%",
              height: "120px",
              marginBottom: "16px",
              fontSize: 16,
              fontWeight: 500,
              borderRadius: "8px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            No update available
          </Stack>
        )}
      </article>
    </div>
  );
}
