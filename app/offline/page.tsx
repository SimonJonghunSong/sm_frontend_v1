"use client";

import "../../styles/variable.css";
import "../../styles/reset.css";
import "../../styles/global.css";
import React from "react";
import styles from "../styles.module.scss";
import { Button } from "@mui/material";

export default function OfflinePage() {
  return (
    <div className={styles.offline}>
      <p>OOPS!</p>
      <span>400 - NO NETWORL CONNECTION</span>
      <Button
        variant="contained"
        sx={{ width: 200, background: "var(--primary-gradient)" }}
        onClick={() => {
          history.back();
        }}
      >
        Go To Back
      </Button>
    </div>
  );
}
