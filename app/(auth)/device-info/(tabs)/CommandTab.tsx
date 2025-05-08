import { Stack } from "@mui/material";
import NetworkCommands from "app/(auth)/device-info/(commands)/NetworkCommands";
import { useEffect, useRef, useState } from "react";
import styles from "../../_cmd-tool/styles.module.scss";
import { clearLogsByIMEI, getLogsByIMEI } from "@/utils/idbLogUtil";

interface Props {
  imei: string;
}

export default function CommandTab({ imei }: Props) {
  const [logs, setLogs] = useState<any[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const broadcastChannel = useRef<BroadcastChannel>(
    new BroadcastChannel("command_log")
  );

  const loadLogs = async () => {
    if (imei) {
      const logData = await getLogsByIMEI(imei);
      setLogs(logData);

      // 로그가 업데이트되면 스크롤을 아래로 내립니다
      setTimeout(() => {
        if (logContainerRef.current) {
          logContainerRef.current.scrollTop =
            logContainerRef.current.scrollHeight;
        }
      }, 100);
    }
  };

  useEffect(() => {
    // 페이지 진입 시 해당 IMEI의 로그를 초기화합니다
    const initLogs = async () => {
      if (imei) {
        await clearLogsByIMEI(imei);
        setLogs([]);
      }
    };

    initLogs();

    // 로그 업데이트를 수신하는 이벤트 리스너 설정
    broadcastChannel.current.onmessage = ({ data }) => {
      if (data.status === "updated" && data.imei === imei) {
        loadLogs();
      }
    };

    return () => {
      broadcastChannel.current.close();
    };
  }, [imei]);

  return (
    <Stack
      className="contentWrap"
      direction="column"
      gap={"20px"}
      height={"80vh"}
      padding={"0px !important"}
      overflow={"scroll"}
    >
      {/* 명령 로그 표시 영역 */}
      <div
        className={styles.logWrap}
        style={{
          marginBottom: "20px",
          height: "300px",
          minHeight: "300px",
          width: "100%",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 2,
          padding: "20px",
          background: "white",
        }}
      >
        <div
          style={{
            padding: "10px 16px",
            borderBottom: "1px solid #e0e0e0",
            backgroundColor: "#f5f5f5",
            borderTopLeftRadius: "8px",
            borderTopRightRadius: "8px",
            fontWeight: 500,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Command Log
        </div>
        <div
          ref={logContainerRef}
          className={styles.logContainer}
          style={{
            padding: "16px",
            overflowY: "auto",
            height: "calc(100% - 42px)",
            width: "100%",
            backgroundColor: "#fafafa",
          }}
        >
          {logs.length === 0 ? (
            <div
              style={{
                color: "#757575",
                textAlign: "center",
                marginTop: "30px",
                fontStyle: "italic",
              }}
            >
              No Logs
            </div>
          ) : (
            logs.map((logItem, index) => (
              <div
                key={index}
                style={{
                  wordBreak: "break-word",
                  marginBottom: "12px",
                  padding: "0 0 12px 0",
                  borderBottom:
                    index < logs.length - 1 ? "1px dashed #e0e0e0" : "none",
                }}
              >
                {logItem.write && (
                  <div
                    className={styles.logReq}
                    style={{
                      backgroundColor: "#e3f2fd",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      marginBottom: logItem.read ? "8px" : "0",
                      fontFamily: "monospace",
                      fontSize: "13px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#616161",
                        marginBottom: "4px",
                      }}
                    >
                      {new Date(logItem.write.timestamp).toLocaleTimeString()}
                    </div>
                    <div>
                      <span style={{ color: "#0d47a1" }}>&gt;</span>{" "}
                      {logItem.write.data}
                    </div>
                  </div>
                )}
                {logItem.read && (
                  <div
                    className={styles.logRes}
                    style={{
                      backgroundColor: "#f1f8e9",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      fontFamily: "monospace",
                      fontSize: "13px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#616161",
                        marginBottom: "4px",
                      }}
                    >
                      {new Date(logItem.read.timestamp).toLocaleTimeString()}
                    </div>
                    <div>{logItem.read.data}</div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div style={{ padding: "20px" }}>
        <NetworkCommands imei={imei} />
      </div>
    </Stack>
  );
}
