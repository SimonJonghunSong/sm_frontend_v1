import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { getLogsByIMEI } from "@/utils/idbLogUtil";
import { Stack } from "@mui/material";
import useSerial from "@/src/hooks/useSerial";

export default function ConsoleLog() {
  const consoleRef = useRef<HTMLDivElement | null>(null);
  const {
    state: { portList },
  } = useSerial();
  const [log, setLog] = useState([]);
  const [selectedIMEI] = useState(portList?.[0]?.imei);
  const broadcastChannel = new BroadcastChannel("command_log");

  const get = async () => {
    const logs = await getLogsByIMEI(selectedIMEI);
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
      if (data === "updated") {
        get();
      }
    };
    return () => {
      broadcastChannel.close();
    };
  }, []);

  useEffect(() => {
    get();
  }, [selectedIMEI]);

  return (
    <Stack gap={2} width="100%">
      <div
        ref={consoleRef}
        className={styles.consoleWrap}
        id="prevent_drag"
        style={{ flex: 1 }}
      >
        <div>
          {log.map(({ read, write }) => {
            const logString = read ? read.data : write.data;
            const isWrite = !!write;
            const prefix = isWrite ? ">" : "";
            if (!logString) return <></>;
            return (
              <div>
                {isWrite ? (
                  <strong style={{ wordBreak: "break-all" }}>
                    {prefix} {logString}
                  </strong>
                ) : (
                  <p
                    className={styles.textIndent}
                    style={{ wordBreak: "break-all" }}
                  >
                    {prefix} {logString}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </Stack>
  );
}
