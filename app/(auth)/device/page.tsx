"use client";
import styles from "./styles.module.scss";
import { Button, Checkbox, FormControlLabel, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";

import UsbIcon from "@mui/icons-material/Usb";
import UsbOffIcon from "@mui/icons-material/UsbOff";
import { redirect } from "next/navigation";
import useSerial from "../../../src/hooks/useSerial";
import { SerialPortState } from "../../../src/stores/useSerialStore";

type Steps = "BEFORE" | "ING" | "FAILED" | "SUCCESS";

export default function page() {
  const [step, setStep] = useState<Steps>("BEFORE");

  const {
    func: { requestPort },
    state: { portList: portState },
  } = useSerial();

  return (
    <div className="pageWrap">
      <article className="contentWrap" style={{ height: 720 }}>
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
          gap="40px"
        >
          {step === "BEFORE" ? (
            <Before setStep={setStep} requestPort={requestPort} />
          ) : step === "ING" ? (
            <Ing setStep={setStep} portState={portState} />
          ) : step === "FAILED" ? (
            <Failed setStep={setStep} />
          ) : step === "SUCCESS" ? (
            redirect("/device/list")
          ) : undefined}
        </Stack>
      </article>
    </div>
  );
}

function Before({ setStep, requestPort }) {
  const {
    state: { portList },
  } = useSerial();

  const handleDetectDevice = async () => {
    const result = await requestPort();
    if (!result) {
      setStep("BEFORE");
    } else {
      setStep("ING");
    }
  };

  return (
    <>
      <div className={styles.icon}>
        <UsbIcon
          sx={{
            color: "var(--grey4)",
            fontSize: "80px",
          }}
        />
      </div>
      <div className={styles.title}>Please plug devices into the USB ports</div>
      <div className={styles.title}>
        현재 연결된 USB ports 개수 {portList.length}개
      </div>
      <Stack justifyContent="center" alignItems="center" gap="16px">
        <Button
          variant="contained"
          sx={{ width: 200, background: "var(--primary-gradient)" }}
          onClick={() => handleDetectDevice()}
        >
          Detect Device
        </Button>
      </Stack>
    </>
  );
}

function Ing({
  setStep,
  portState,
}: {
  setStep: (step: Steps) => void;
  portState: SerialPortState[];
}) {
  const [uiState, setUiState] = useState<"loading" | "error">("loading");
  const timeoutIdRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const isSuccessToGoDetail = portState.some(
      (port) => port.isReadyUp && port.modelVersion
    );

    if (isSuccessToGoDetail) {
      setStep("SUCCESS");
      clearTimeout(timeoutIdRef.current);
    }
  }, [portState]);

  useEffect(() => {
    timeoutIdRef.current = setTimeout(() => {
      setUiState("error");
      setStep("FAILED");
    }, 20000);

    return () => {
      clearTimeout(timeoutIdRef.current);
    };
  }, []);

  if (uiState === "loading") {
    return (
      <>
        <div className={styles.icon}>
          <div className={styles.loader}></div>
        </div>
        <div className={styles.title}>Detecting devices...</div>
        <Stack justifyContent="center" alignItems="center" gap="16px">
          <Button
            variant="outlined"
            sx={{ width: 200 }}
            onClick={() => setStep("BEFORE")}
          >
            Cancel
          </Button>
          <FormControlLabel
            value="AutoConnect"
            control={<Checkbox />}
            label="Auto-Connect"
            disabled
          />

          {/* TODO: 아래 버튼 임시, 삭제 필요 */}
          <Stack direction="row" gap="8px">
            <Button sx={{ width: 200 }} onClick={() => setStep("FAILED")}>
              Failed (temporary)
            </Button>
            <Button sx={{ width: 200 }} onClick={() => setStep("SUCCESS")}>
              Success (temporary)
            </Button>
          </Stack>
        </Stack>
      </>
    );
  }
}

function Failed({ setStep }) {
  return (
    <>
      <div className={styles.icon}>
        <UsbOffIcon
          sx={{
            color: "var(--grey4)",
            fontSize: "80px",
          }}
        />
      </div>
      <div className={styles.title}>No devices detetcted</div>
      <Stack justifyContent="center" alignItems="center" gap="16px">
        <Button
          variant="outlined"
          sx={{ width: 200 }}
          onClick={() => setStep("ING")}
        >
          Retry
        </Button>
        <FormControlLabel
          value="AutoConnect"
          control={<Checkbox />}
          label="Auto-Connect"
        />
      </Stack>
    </>
  );
}
