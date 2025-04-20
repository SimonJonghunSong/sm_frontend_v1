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
import Controller from "../components/Controller";
import Image from "next/image";
import InputBox from "../../../../components/inputbox/InputBox";
import useSerial from "@/src/hooks/useSerial";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import useDeviceVersions from "@/src/hooks/useDeviceVersions";

export default function Page() {
  const { getCurrentImei } = useSerialConfigurationStore();
  const imei = getCurrentImei();
  const {
    func: { write },
    state: { portList },
  } = useSerial();
  const currentPort = portList.find(({ port }) => port.imei === imei);
  const [version, setVersion] = useState<string>("1.1.1");
  const modelName = currentPort.modelVersion?.split("_")[0] || "";

  const handleChange = (event: SelectChangeEvent) => {
    setVersion(event.target.value);
  };

  const { deviceVersionsObject } = useDeviceVersions({
    isFechedPackage: true,
    currentPort,
    write,
  });

  console.log("deviceVersionsObject :::", deviceVersionsObject);

  return (
    <div className="pageWrap" style={{ width: "100%" }}>
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
              <div>{modelName}</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">F/W Version</div>
              <div>{deviceVersionsObject?.Main || "-"}</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">BLE Version</div>
              <div>{deviceVersionsObject?.BLE || "-"}</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Wifi Version</div>
              <div>{deviceVersionsObject?.WIFI || "-"}</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">MCU Version</div>
              <div>{deviceVersionsObject?.MCU || "-"}</div>
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
              <div>{currentPort.imei || ""}</div>
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
              <div>{deviceVersionsObject?.BATTERY_VOLTAGE || "-"}</div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">GNSS State</div>
              <div>{deviceVersionsObject?.GNSS || "-"}</div>
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
              <div className="list-title">Latitude</div>
              <div>
                {currentPort.packageToJson.synctrak?.[0]?.info?.[0]?.lat || ""}
              </div>
            </Stack>
            <Stack
              direction="row"
              alignItems="center"
              gap="8px"
              height="56px"
              borderBottom="1px solid var(--grey3)"
            >
              <div className="list-title">Longitude</div>
              <div>
                {currentPort.packageToJson.synctrak?.[0]?.info?.[0]?.lng || ""}
              </div>
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
