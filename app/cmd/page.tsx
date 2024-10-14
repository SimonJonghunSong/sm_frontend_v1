"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { clearLogs, getLogsByIMEI } from "@/utils/idbLogUtil";
import useSerialStore from "@/src/stores/useSerialStore";
import { Button } from "@mui/material";

const Cmd = () => {
  const [selectedImei, setSelectedImei] = useState<string>();
  const { portList } = useSerialStore();
  const consoleRef = useRef<HTMLDivElement | null>(null);
  const [log, setLog] = useState([]);
  const broadcastChannel = new BroadcastChannel("command_log");
  const get = async (imei: string) => {
    const logs = await getLogsByIMEI(imei);
    setLog(logs);

    setTimeout(() => {
      const div = consoleRef.current;
      if (div) {
        div.scrollTop = div.scrollHeight;
      }
    }, 0);
  };

  useEffect(() => {
    broadcastChannel.onmessage = ({ data }) => {
      if (data.status === "updated" && selectedImei === data.imei) {
        get(data.imei);
      }
    };
    return () => {
      broadcastChannel.close();
    };
  }, []);

  useEffect(() => {
    if (selectedImei) {
      get(selectedImei);
    }
  }, [selectedImei]);

  return (
    <>
      <header>
        <select
          onChange={(e) => {
            setSelectedImei(e.target.value);
          }}
        >
          <option disabled hidden selected>
            Select Device by IMEI
          </option>
          {portList.map(({ port }) => {
            return <option value={port.imei}>{port.imei}</option>;
          })}
        </select>
        <Button
          disabled={!selectedImei}
          onClick={() => {
            if (selectedImei) {
              clearLogs();
              setLog([]);
            }
          }}
        >
          clear log
        </Button>
      </header>
      <div ref={consoleRef} className={styles.consoleWrap}>
        <div>
          {log.map(({ read, write }) => {
            const logString = read ? read.data : write.data;
            const isWrite = !!write;
            const prefix = isWrite ? ">" : "";
            if (!logString) return <></>;
            return (
              <div>
                {isWrite ? (
                  <strong>
                    {prefix} {logString}
                  </strong>
                ) : (
                  <p className={styles.textIndent}>
                    {prefix} {logString}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Cmd;
