import useSerial from "@/src/hooks/useSerial";
import { Button, Input, Stack, TextField } from "@mui/material";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { getLogsByIMEI, clearLogsByIMEI } from "@/utils/idbLogUtil";
import styles from "../_cmd-tool/styles.module.scss";

const Commands = ({ data, imei }: { data: any; imei: string }) => {
  const t = useTranslations();
  const {
    func: { write },
    state: { portList },
  } = useSerial();
  const currentPort = portList.find(({ port }) => port.imei === imei);
  const commands = data.find((item) => item.info.hdr === "CMD");
  const fields = commands?.fields[0].list[0];
  const [logs, setLogs] = useState<any[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const broadcastChannel = useRef<BroadcastChannel>(
    new BroadcastChannel("command_log")
  );

  const transformedFields = fields
    ? Object.values(fields).map((field: string) => {
        const parts = field.split(";");
        const jsonId = parts[parts.length - 1];
        const title = parts[1];
        const middlePart = `${parts[2]};${parts[3]}`;

        return {
          JSON_ID: jsonId,
          title: title,
          middlePart: middlePart,
          type: middlePart === "0;2" ? "button" : "input",
        };
      })
    : [];

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

  const handleSend = async (jsonId: string) => {
    const prefixJsonId = jsonId.slice(0, 2);
    const suffixJsonId = jsonId.slice(2, 4);
    await write({
      data: `AT^CMD;${imei};${prefixJsonId};${suffixJsonId}`,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  const handleInputChange = async (jsonId: string, value: string) => {
    const prefixJsonId = jsonId.slice(0, 2);
    const suffixJsonId = jsonId.slice(2, 4);
    await write({
      data: `AT^CMD;${imei};${prefixJsonId};${suffixJsonId};${value}`,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "100%",
        overflowX: "hidden",
        height: "80vh",
        overflowY: "auto",
        padding: "20px",
        paddingTop: "0px",
      }}
    >
      {/* 명령 로그 표시 영역 */}
      <div
        className={styles.logWrap}
        style={{
          marginBottom: "20px",
          height: "300px",
          width: "100%",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          position: "sticky",
          top: 0,
          zIndex: 2,
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
      <Stack
        flexWrap="wrap"
        direction="row"
        gap={"20px"}
        sx={{ width: "100%" }}
      >
        {transformedFields.map((field, index) => {
          if (field.type === "button") {
            return (
              <Stack
                key={index}
                direction="row"
                alignItems="center"
                gap="8px"
                height="56px"
                width="calc(50% - 10px)"
                sx={{ minWidth: "200px" }}
              >
                <Stack flex={1}>{field.title}</Stack>
                <div>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleSend(field.JSON_ID)}
                  >
                    {t("configuration.commands.send")}
                  </Button>
                </div>
              </Stack>
            );
          } else {
            return (
              <InputField
                key={index}
                field={field}
                onSend={(value) => handleInputChange(field.JSON_ID, value)}
              />
            );
          }
        })}
      </Stack>
    </div>
  );
};

export default Commands;

const InputField = ({
  field,
  onSend,
}: {
  field: {
    JSON_ID: string;
    title: string;
    middlePart: string;
    type: string;
  };
  onSend: (value: string) => void;
}) => {
  const t = useTranslations();
  const [value, setValue] = useState("");
  return (
    <Stack
      direction="column"
      justifyContent="center"
      gap="8px"
      height="56px"
      width="calc(50% - 10px)"
      sx={{ minWidth: "200px" }}
    >
      <Stack flex={1}>{field.title}</Stack>
      <Stack direction="row" gap="8px">
        <TextField
          fullWidth
          value={value}
          onChange={(e) => setValue(e.target.value)}
          size="small"
        />
        <Button
          variant="outlined"
          color="secondary"
          style={{ flexShrink: 0 }}
          onClick={() => onSend(value)}
        >
          {t("configuration.commands.send")}
        </Button>
      </Stack>
    </Stack>
  );
};

/**
   * fields의 값 형식
   * ;0;2 형식들은 버튼 타입
   * [{JSON_ID: 0101, title: "ReqConMntSvr", }, {JSON_ID: 0102, title: "ReqIMSI"}, {JSON_ID: 0103, title: "ReqICCID"},,,]
 * 0
: 
"0;ReqConMntSvr;0;2;0101"
1
: 
"1;ReqIMSI;0;2;0102"
2
: 
"2;ReqICCID;0;2;0103"
3
: 
"3;ReqConNtw;0;2;0104"
4
: 
"4;ReqOwnNo;0;2;0105"
5
: 
"5;SetGoogleMap;96;0;0202"
6
: 
"6;ReqGoogleMap;0;2;0203"
7
: 
"7;StatusReq;0;2;0301"
8
: 
"8;Reset;0;2;0302"
9
: 
"9;Reboot;0;2;0303"
10
: 
"10;ReqVer;1;1;0304"
11
: 
"11;EraseAll;0;2;0502"
12
: 
"12;SetOdometer;1000000000;0;0503"
13
: 
"13;InitMsgNo;0;2;0504"
14
: 
"14;SetHMeter;999999;0;0505"
15
: 
"15;InitCircleGeo;0;2;0506"
16
: 
"16;Request Server Lock;0;2;0109"
17
: 
"17;ReqSttAssignmap;0;2;0507"
18
: 
"18;ReqAltAssignmap;0;2;0508"
19
: 
"19;ReqOBD_Prot;0;2;0601"
20
: 
"20;ReqOBD_AvailPID;0;2;0602"
21
: 
"21;ReqOBD_VIN;0;2;0603"
22
: 
"22;ReqOBD_DTC;0;2;0604"
23
: 
"23;StartBleScan;0;2;0630"
24
: 
"24;StopBleScan;0;2;0631"
25
: 
"25;InitBleReg;0;2;0632"
26
: 
"26;ExistenceBleUUID;0;2;0633"
 */
// CMD;IMEI;JSON_ID[0-1];JSON_ID[2-4]
