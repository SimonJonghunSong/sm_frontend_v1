"use client";

import React, { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import styles from "./styles.module.scss";
import ResponseLog from "./ResponseLog";
import OperationLog from "./OperationLog";
import ConsoleLog from "./ConsoleLog";

export default function CmdTool({
  setIsCmdModalWide,
}: {
  setIsCmdModalWide?: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [value, setValue] = useState("response");

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={styles.cmdWrap}>
      <div className={styles.cmdTitle} style={{ cursor: "move" }}>
        Command Tool
      </div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="notification"
        sx={{
          borderBottom: "1px solid var(--grey4)",
          marginBottom: "16px",
        }}
      >
        <Tab value="response" label="Response Log" />
        <Tab value="operation" label="Operation Log" />
        <Tab value="console" label="Console Log" />
      </Tabs>
      <div
        style={{
          position: "relative",
          display: "flex",
          flexGrow: 1,
        }}
      >
        {value === "response" ? (
          <ResponseLog setIsCmdModalWide={setIsCmdModalWide} />
        ) : value === "operation" ? (
          <OperationLog />
        ) : (
          <ConsoleLog />
        )}
      </div>
    </div>
  );
}
