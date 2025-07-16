import { Stack } from "@mui/material";
import NetworkCommands from "app/(auth)/device-info/(commands)/NetworkCommands";
import { useEffect, useRef, useState } from "react";
import styles from "app/(auth)/_cmd-tool/styles.module.scss";
import useSerial from "@/src/hooks/useSerial";
import { delayPromise } from "@/src/hooks/useSerial";
import { Command } from "app/(auth)/device-info/(commands)/@index";
import DefaultCommandField from "app/(auth)/device-info/(commands)/DefaultCommandField";
import { useTranslations } from "next-intl";
import SelectCommandField from "app/(auth)/device-info/(commands)/SelectCommandField";
import TextCommandField from "app/(auth)/device-info/(commands)/TextCommandField";
import NumberCommandField from "app/(auth)/device-info/(commands)/NumberCommandField";
import SystemCommands from "app/(auth)/device-info/(commands)/SystemCommands";
import TimeRangeCommandField from "app/(auth)/device-info/(commands)/TimeRangeCommandField";
import TrackingCommands from "app/(auth)/device-info/(commands)/TrackingCommands";
import InputOutputCommands from "app/(auth)/device-info/(commands)/InputOuputCommands";
import BleCommands from "app/(auth)/device-info/(commands)/BleCommands";
import AccessoryCommands from "app/(auth)/device-info/(commands)/AccessoryCommands";
import RfCommands from "app/(auth)/device-info/(commands)/RfCommands";
import GeofenceCommands from "app/(auth)/device-info/(commands)/GeofenceCommands";
import JammingDetectionCommands from "app/(auth)/device-info/(commands)/JammingDetectionCommands";
import ReportCommands from "app/(auth)/device-info/(commands)/ReportCommands";
import AutomaticApnListCommandField from "app/(auth)/device-info/(commands)/AutomaticApnListCommandField";
import DeleteApnListField from "app/(auth)/device-info/(commands)/DeleteApnListField";
import PinLockCommandField from "app/(auth)/device-info/(commands)/PinLockCommandField";
import PinUnlockCommandField from "app/(auth)/device-info/(commands)/PinUnlockCommandField";
import LteBandCommandField from "app/(auth)/device-info/(commands)/LteBandCommandField";
import MainServerCommandField from "app/(auth)/device-info/(commands)/MainServerCommandField";
import DetectionControlSpeedCommandField from "app/(auth)/device-info/(commands)/DetectionControlSpeedCommandField";
import QTypeCommandField from "app/(auth)/device-info/(commands)/QTypeCommandField";

interface Props {
  imei: string;
  commandData: string[];
}

export default function CommandTab({ imei, commandData }: Props) {
  const t = useTranslations();

  const [logs, setLogs] = useState<any[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const broadcastChannel = useRef<BroadcastChannel>(
    new BroadcastChannel("device_command_log")
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    state: { portList },
    func: { write },
  } = useSerial();
  const currentPort = portList[0];

  const handleCommandLogScroll = () => {
    // 로그가 업데이트되면 스크롤을 아래로 내립니다
    setTimeout(() => {
      if (logContainerRef.current) {
        logContainerRef.current.scrollTop =
          logContainerRef.current.scrollHeight;
      }
      setIsLoading(false);
    }, 100);
  };

  const handleSendCommand = async (message: string) => {
    if (isLoading) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
    await delayPromise(100);

    setLogs((prev) => [
      ...prev,
      {
        timestamp: new Date().toISOString(),
        value: message,
        type: "REQUEST",
      },
    ]);

    handleCommandLogScroll();

    currentPort.port.isDeviceCommandSend = true;
    write({
      data: message,
      port: currentPort.port,
      writer: currentPort.writer,
    });
  };

  const renderCommand = (command: Command) => {
    switch (command.uiType) {
      case "normal":
        return (
          <DefaultCommandField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
          />
        );
      case "select":
        return (
          <SelectCommandField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
          />
        );
      case "text-input":
        return (
          <TextCommandField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
            regex={command.regex}
            helperText={command.helperText}
          />
        );
      case "number-input":
        return (
          <NumberCommandField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
          />
        );
      case "time-range":
        return (
          <TimeRangeCommandField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
          />
        );
      case "Automati-APN-List":
        return (
          <AutomaticApnListCommandField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
          />
        );
      case "Delete-APN-List":
        return (
          <DeleteApnListField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
          />
        );
      case "PIN-Lock":
        return (
          <PinLockCommandField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
          />
        );
      case "PIN-Unlock":
        return (
          <PinUnlockCommandField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
          />
        );
      case "LTE-Band":
        return (
          <LteBandCommandField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
          />
        );
      case "Main-Server":
        return (
          <MainServerCommandField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
          />
        );
      case "Detection-Control-Speed":
        return (
          <DetectionControlSpeedCommandField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
          />
        );
      case "Q-Type":
        return (
          <QTypeCommandField
            id={command.id}
            imei={imei}
            handleSendCommand={handleSendCommand}
            buttonText={t("configuration.commands.send")}
            isLoading={isLoading}
          />
        );
      default:
        return null;
    }
  };

  useEffect(() => {
    broadcastChannel.current.onmessage = ({ data }) => {
      setLogs((prev) => [...prev, data]);

      handleCommandLogScroll();
    };

    return () => {
      broadcastChannel.current.close();
    };
  }, [imei]);

  return (
    <Stack
      direction="column"
      gap={"20px"}
      height={"calc(100vh - 200px)"}
      padding={"0px !important"}
      overflow={"hidden"}
    >
      {/* 명령 로그 표시 영역 */}
      <div
        className={styles.logWrap}
        style={{
          marginBottom: "20px",
          height: "40%",
          minHeight: "160px",
          maxHeight: "300px",
          width: "100%",
          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          boxShadow: "0 2px 4px rgba(142, 127, 127, 0.05)",
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
                {logItem.type === "REQUEST" && (
                  <div
                    className={styles.logReq}
                    style={{
                      backgroundColor: "#e3f2fd",
                      padding: "8px 12px",
                      borderRadius: "4px",
                      marginBottom: logItem.type === "RESPONSE" ? "8px" : "0",
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
                      {new Date(logItem.timestamp).toLocaleTimeString()}
                    </div>
                    <div>
                      <span style={{ color: "#0d47a1" }}>&gt;</span>{" "}
                      {logItem.value}
                    </div>
                  </div>
                )}
                {logItem.type === "RESPONSE" && (
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
                      {new Date(logItem.timestamp).toLocaleTimeString()}
                    </div>
                    <div>{logItem.value}</div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          gap: "24px",
          flexDirection: "column",
          padding: "20px",
          overflowY: "scroll",
        }}
      >
        <NetworkCommands
          renderCommand={renderCommand}
          commandData={commandData}
        />
        <SystemCommands
          renderCommand={renderCommand}
          commandData={commandData}
        />
        <JammingDetectionCommands
          renderCommand={renderCommand}
          commandData={commandData}
        />
        <ReportCommands
          renderCommand={renderCommand}
          commandData={commandData}
        />
        <TrackingCommands
          renderCommand={renderCommand}
          commandData={commandData}
        />
        <InputOutputCommands
          renderCommand={renderCommand}
          commandData={commandData}
        />
        <GeofenceCommands
          renderCommand={renderCommand}
          commandData={commandData}
        />
        <BleCommands 
          renderCommand={renderCommand} 
          commandData={commandData} />
        <AccessoryCommands
          renderCommand={renderCommand}
          commandData={commandData}
        />
        <RfCommands 
          renderCommand={renderCommand} 
          commandData={commandData} />
      </div>
    </Stack>
  );
}

export const hiddenParameterId = [
  "0901",
  "0902",
  "0903",
  "0904",
  "0905",
  "0907",
  "0121",
  "0121",
  "0121-01",
  "0201",
  "0107",
  "0108",
  "0109",
  "0112",
  "0113",
  "0114",
  "0115",
  "0115",
  "0116",
  "0117",
  "0118",
  "0119",
  "0120",
  "0714",
  "0715",
  "0122",
  "0735",
  "0735",
  "0521",
  "0522",
  "0523",
  "0922",
  "0712",
  "0713",
  "0753",
  "0754",
  "0110",
  "0111",
  "0908",
  "0909",
  "0916",
  "0921",
  "0740",
  "0741",
  "0742",
  "0743",
  "0744",
  "0745",
  "0746",
  "0769",
  "0906",
  "0777",
  "0778",
  "0779",
  "0793",
  "0794",
  "0795",
  "0796",
  "0798",
  "0910",
  "0911",
  "0912",
  "0913",
  "0729",
  "0730",
  "0755",
  "0425",
  "0428",
  "0716",
  "0717",
  "0751",
  "0752",
  "1046",
  "1047",
  "1048",
  "1049",
  "0727",
  "0728",
  "0734",
  "0758",
  "0759",
  "0760",
  "0761",
  "0762",
  "0763",
  "0764",
  "0765",
  "0766",
  "0772",
  "0797",
  "0710",
  "0711",
  "0775",
  "0776",
  "0783",
  "0784",
  "0785",
  "0787",
  "0786",
  "0788",
  "1020",
  "1021",
  "1022",
  "1023",
  "1046",
  "1047",
  "1048",
  "1049",
  "1076",
  "1077",
];
