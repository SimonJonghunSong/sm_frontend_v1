"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import sampleMap from "/public/images/sample-map.png";
import { Box, Button, Stack } from "@mui/material";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";

export default function Page() {
  const searchParams = useSearchParams();
  const model = searchParams.get("model");
  const [version] = useState<string>("1.1.1");

  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Controller />

        <div className="pageTitle">Device Information</div>
        <Stack direction="row" gap="40px" mb="56px">
          <Stack sx={{ width: "50%" }}>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Model Name</div>
              <div>{model}</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">F/W Version</div>
              <Stack direction="row" gap="16px" alignItems="center">
                <div>{version}</div>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Modem Version</div>
              <Stack direction="row" gap="16px" alignItems="center">
                <div>{version}</div>
              </Stack>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">BLE Version</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Wifi Version</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">RTC Time</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Operating Time</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Battery Activation Time</div>
              <div>-</div>
            </Stack>
          </Stack>

          <Stack sx={{ width: "50%" }}>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">IMEI</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">ESN</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">GNSS Version</div>
              <div>-</div>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Backup Battery Voltage</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Activate Battery Log</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">GNSS State</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">WWAN State</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Reboot</div>
              <div>
                <Button
                  variant="outlined"
                  color="secondary"
                  disabled
                  sx={{ height: 30 }}
                >
                  Reboot
                </Button>
              </div>
            </Stack>
          </Stack>
        </Stack>

        <Stack direction="row" gap="40px">
          <Stack sx={{ width: "50%" }}>
            <div className="pageTitle">GNSS Information</div>
            <Box>
              <Image
                src={sampleMap}
                alt="sampleMap"
                style={{ display: "block", width: "100%", height: "auto" }}
              />
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Latitued</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Longitude</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Angle</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Speed</div>
              <div>-</div>
            </Stack>
          </Stack>

          <Stack sx={{ width: "50%" }}>
            <div className="pageTitle">Cellular Information</div>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Modem Status</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Network Status</div>
              <div>-</div>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Current Operator</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Signal Level</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Socket Type</div>
              <div>-</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Socket</div>
              <div>-</div>
            </Stack>
          </Stack>
        </Stack>
      </article>
    </div>
  );
}
