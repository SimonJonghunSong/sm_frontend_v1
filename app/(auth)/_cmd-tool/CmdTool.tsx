"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import styles from "./styles.module.scss";
import ResponseLog from "./ResponseLog";
import OperationLog from "./OperationLog";
import ConsoleLog from "./ConsoleLog";
import { useTranslations } from "next-intl";

export default function CmdTool({
  setIsCmdModalWide,
}: {
  setIsCmdModalWide?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const t = useTranslations();
  const [value, setValue] = useState("response");

  const [logs, setLogs] = useState<
    {
      type: "req" | "res";
      message: string;
      date: string;
      result: string;
    }[]
  >([]);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setIsCmdModalWide?.(false);
    setValue(newValue);
  };

  return (
    <div className={styles.cmdWrap} style={{ width: "100%" }}>
      <div
        className={styles.cmdTitle}
        style={{
          cursor: "move",
          background: "white",
        }}
      >
        {t("configuration.cmd_tool.command_tool")}
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="notification"
        sx={{
          borderBottom: "1px solid var(--grey4)",
          marginBottom: "16px",
          // marginTop: "40px",
        }}
      >
        <Tab
          value="response"
          label={t("configuration.cmd_tool.response_log")}
        />
        <Tab
          value="operation"
          label={t("configuration.cmd_tool.operation_log")}
        />
        <Tab value="console" label={t("configuration.cmd_tool.console_log")} />
      </Tabs>
      <div className={styles.contentWrap}>
        {value === "response" ? (
          <ResponseLog
            setIsCmdModalWide={setIsCmdModalWide}
            logs={logs}
            setLogs={setLogs}
          />
        ) : value === "operation" ? (
          <OperationLog logs={logs} />
        ) : (
          <ConsoleLog />
        )}
      </div>
    </div>
  );
}
