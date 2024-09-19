"use client";

import sampleMap from "/public/images/sample-map.png";
import {
  Box,
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import Controller from "../components/Controller";
import Image from "next/image";
import InputBox from "../../../../components/inputbox/InputBox";

export default function Page() {

  const [version, setVersion] = useState<string>("1.1.1");

  const handleChange = (event: SelectChangeEvent) => {
    setVersion(event.target.value);
  };

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
              <div>ST8300 (M)</div>
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
                <div>
                  <Select
                    value={version}
                    onChange={handleChange}
                    sx={{ width: 144 }}
                  >
                    <MenuItem value={"1.1.1"}>1.1.1</MenuItem>
                    <MenuItem value={"1.1.2"}>1.1.2</MenuItem>
                  </Select>
                </div>
                <span className="chip">latest</span>
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
              <div>B.1.0.6</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Wifi Version</div>
              <div>W.2.1.0</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">MCU Version</div>
              <div>99.1.53</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">RTC Time</div>
              <div>Jan/01/2024 18:04:39</div>
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
              <div>394893248032984029348</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">GPS modem F/W</div>
              <div>1.1.1</div>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Backup Battery Voltage</div>
              <div>10 mV.</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">GNSS State</div>
              <div>BNSS Fixed</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">WWAN State</div>
              <div>Connected with Server</div>
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
              <Image src={sampleMap} alt="sampleMap" style={{display: "block", width: "100%", height: "auto"}}/>
            </Box>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Latitued</div>
              <div>54.7968967</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Longitude</div>
              <div>54.7968967</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Angle</div>
              <div>0.744</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Speed</div>
              <div>0 km/h</div>
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
              <div className="list-title">
                <Stack direction="row" gap="8px" alignItems="center">
                  <span>Modem Status</span>
                  <InputBox.Info tooltipText="example tooltip text"/>
                </Stack>
              </div>
              <div>On</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">
                <Stack direction="row" gap="8px" alignItems="center">
                  <span>Network Status</span>
                  <InputBox.Info tooltipText="example tooltip text"/>
                </Stack>
              </div>
              <div>Activated</div>
            </Stack>

            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">
                <Stack direction="row" gap="8px" alignItems="center">
                  <span>Current Operator</span>
                  <InputBox.Info tooltipText="example tooltip text"/>
                </Stack>
              </div>
              <div>42402</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">
                <Stack direction="row" gap="8px" alignItems="center">
                  <span>Signal Level</span>
                  <InputBox.Info tooltipText="example tooltip text"/>
                </Stack>
              </div>
              <div>Excellent Signal</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">
                <Stack direction="row" gap="8px" alignItems="center">
                  <span>Socket Type</span>
                  <InputBox.Info tooltipText="example tooltip text"/>
                </Stack>
              </div>
              <div>Avl data sending</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">
                <Stack direction="row" gap="8px" alignItems="center">
                  <span>Socket</span>
                  <InputBox.Info tooltipText="example tooltip text"/>
                </Stack>
              </div>
              <div>13.0.0.0 : 27676 (TCP)</div>
            </Stack>
          </Stack>
        </Stack>
      </article>
    </div>
  );
}
