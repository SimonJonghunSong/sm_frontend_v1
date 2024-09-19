"use client";

import { Tabs, Tab, Button, Stack, TextField, IconButton } from "@mui/material";
import styles from "./styles.module.scss";
import React, { useState } from "react";
import ResponseLog from "./ResponseLog";
import OperationLog from "./OperationLog";
import ConsoleLog from "./ConsoleLog";
export default function CmdTool() {
  const [value, setValue] = useState("response");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className={styles.cmdWrap}>
      <div className={styles.cmdTitle}>Command Tool</div>
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
      <div style={{position: "relative", display: "flex", flexGrow: 1}}>
        {value === "response" ? (
            <ResponseLog />
        ) : value === "operation" ? (
            <OperationLog />
        ) : (
            <ConsoleLog />
        )}
      </div>
    </div>
  );
}
