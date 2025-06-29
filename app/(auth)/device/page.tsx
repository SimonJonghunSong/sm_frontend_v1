"use client";
import styles from "./styles.module.scss";
import { Button, Checkbox, FormControlLabel, Stack } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import UsbIcon from "@mui/icons-material/Usb";
import UsbOffIcon from "@mui/icons-material/UsbOff";
import { redirect } from "next/navigation";
import useSerial from "@/src/hooks/useSerial";
import { SerialPortState } from "@/src/stores/useSerialStore";
import { useTranslations } from "next-intl";

type Steps = "BEFORE" | "ING" | "FAILED" | "SUCCESS";

export default function page() {
  const [step, setStep] = useState<Steps>("BEFORE");
  const {
    func: { requestPort },
    state: { portList: portState },
  } = useSerial();
  const goDeviceList = () => redirect("device/list");

  useEffect(() => {
    if (portState.some((port) => port.reader && port.writer)) {
      goDeviceList();
    }
  }, []);

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
            goDeviceList()
          ) : undefined}
        </Stack>
      </article>
    </div>
  );
}

function Before({ setStep, requestPort }) {
  const t = useTranslations("device");
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
      <div className={styles.title}>
        {t("device_detecting.please_plug_devices_into_the_usb_ports")}
      </div>
      <Stack justifyContent="center" alignItems="center" gap="16px">
        <Button
          variant="contained"
          sx={{ width: 200, background: "var(--primary-gradient)" }}
          onClick={() => handleDetectDevice()}
        >
          {t("device_detecting.detect_device")}
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
  const t = useTranslations("device");
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
        <div className={styles.title}>
          {t("device_detecting.detecting_devices")}
        </div>
        <Stack justifyContent="center" alignItems="center" gap="16px">
          <Button
            variant="outlined"
            sx={{ width: 200 }}
            onClick={() => setStep("BEFORE")}
          >
            {t("device_detecting.cancel")}
          </Button>
        </Stack>
      </>
    );
  }
}

function Failed({ setStep }) {
  const t = useTranslations("device");
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
      <div className={styles.title}>
        {t("device_detecting.no_devices_detected")}
      </div>
      <Stack justifyContent="center" alignItems="center" gap="16px">
        <Button
          variant="outlined"
          sx={{ width: 200 }}
          onClick={() => window.location.reload()}
        >
          {t("device_detecting.retry")}
        </Button>
      </Stack>
    </>
  );
}
