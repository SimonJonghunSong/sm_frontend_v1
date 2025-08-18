import { Stack } from "@mui/material";
import NetworkCommands from "../(commands)/NetworkCommands";
import { useEffect, useRef, useState } from "react";
import styles from "app/(auth)/_cmd-tool/styles.module.scss";
import useSerial from "@/src/hooks/useSerial";
import { delayPromise } from "@/src/hooks/useSerial";
import { Command } from "../(commands)/@index";
import DefaultCommandField from "../(commands)/DefaultCommandField";
import { useTranslations } from "next-intl";
import SelectCommandField from "../(commands)/SelectCommandField";
import TextCommandField from "../(commands)/TextCommandField";
import NumberCommandField from "../(commands)/NumberCommandField";
import SystemCommands from "../(commands)/SystemCommands";
import TimeRangeCommandField from "../(commands)/TimeRangeCommandField";
import TrackingCommands from "../(commands)/TrackingCommands";
import InputOutputCommands from "../(commands)/InputOuputCommands";
import BleCommands from "../(commands)/BleCommands";
import AccessoryCommands from "../(commands)/AccessoryCommands";
import RfCommands from "../(commands)/RfCommands";
import GeofenceCommands from "../(commands)/GeofenceCommands";
import JammingDetectionCommands from "../(commands)/JammingDetectionCommands";
import ReportCommands from "../(commands)/ReportCommands";
import AutomaticApnListCommandField from "../(commands)/AutomaticApnListCommandField";
import DeleteApnListField from "../(commands)/DeleteApnListField";
import PinLockCommandField from "../(commands)/PinLockCommandField";
import PinUnlockCommandField from "../(commands)/PinUnlockCommandField";
import LteBandCommandField from "../(commands)/LteBandCommandField";
import MainServerCommandField from "../(commands)/MainServerCommandField";
import DetectionControlSpeedCommandField from "../(commands)/DetectionControlSpeedCommandField";
import QTypeCommandField from "app/(auth)/model-info/(commands)/QTypeCommandField";

interface Props {
  imei: string;
}

export default function CommandTab({ imei }: Props) {
  const t = useTranslations();

  const [logs, setLogs] = useState<any[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const commandContainerRef = useRef<HTMLDivElement>(null);
  const broadcastChannel = useRef<BroadcastChannel>(
    new BroadcastChannel("device_command_log")
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    state: { portList },
    func: { write },
  } = useSerial();
  const currentPort = portList[0];

  // 검색 결과에서 특정 Command ID로 스크롤하는 함수
  const scrollToCommand = (commandId: string) => {
    const commandElement = document.getElementById(`command-${commandId}`);
    if (commandElement && commandContainerRef.current) {
      commandElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  // URL의 hash를 확인하여 Command ID로 스크롤
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && hash.startsWith('#command-')) {
      const commandId = hash.replace('#command-', '');
      setTimeout(() => scrollToCommand(commandId), 500);
    }
  }, []);

  // BroadcastChannel을 통해 검색 결과 클릭 이벤트 수신
  useEffect(() => {
    const handleSearchClick = (event: MessageEvent) => {
      if (event.data.type === 'scrollToCommand' && event.data.commandId) {
        scrollToCommand(event.data.commandId);
      }
    };

    const searchChannel = new BroadcastChannel('search_navigation');
    searchChannel.onmessage = handleSearchClick;

    return () => {
      searchChannel.close();
    };
  }, []);

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
        ref={commandContainerRef}
        style={{
          display: "flex",
          flex: 1,
          gap: "24px",
          flexDirection: "column",
          padding: "20px",
          overflowY: "scroll",
        }}
      >
        <NetworkCommands renderCommand={renderCommand} />
        <SystemCommands renderCommand={renderCommand} />
        <JammingDetectionCommands renderCommand={renderCommand} />
        <ReportCommands renderCommand={renderCommand} />
        <TrackingCommands renderCommand={renderCommand} />
        <InputOutputCommands renderCommand={renderCommand} />
        <GeofenceCommands renderCommand={renderCommand} />
        <BleCommands renderCommand={renderCommand} />
        <AccessoryCommands renderCommand={renderCommand} />
        <RfCommands renderCommand={renderCommand} />
      </div>
    </Stack>
  );
}
