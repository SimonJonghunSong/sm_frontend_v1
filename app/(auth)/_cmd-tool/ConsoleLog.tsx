import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.scss";
import { getLogsByIMEI } from "@/utils/idbLogUtil";

export default function ConsoleLog() {
  const consoleRef = useRef<HTMLDivElement | null>(null);
  const [log, setLog] = useState([]);
  const broadcastChannel = new BroadcastChannel("command_log");
  const get = async () => {
    const logs = await getLogsByIMEI("1560001554");
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
  }, []);

  return (
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
  );
}
