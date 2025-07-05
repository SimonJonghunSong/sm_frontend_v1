import { Stack, TextField, Button, IconButton } from "@mui/material";
import styles from "./styles.module.scss";

import React, { useEffect, useRef, useState } from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import DataTable from "../../../components/dataTable";
import { GridColDef } from "@mui/x-data-grid";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import useSerialStore from "@/src/stores/useSerialStore";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import { CR } from "@/src/hooks/useSerial/constant";
import dayjs from "dayjs";
import useCommandStore from "@/utils/useCommandStore";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

const columns = (
  handleSend: (message: string, updateIndex?: number) => void,
  handleDelete: (idx: number) => void,
  updateCommand: (id: number, message: string) => void
): GridColDef[] => [
  {
    field: "col1",
    headerName: "No.",
    width: 60,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col2",
    headerName: "Command",
    flex: 1,
    minWidth: 300,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <Stack justifyContent="center" alignItems="center" height="42px">
        <TextField
          fullWidth
          sx={{
            height: 30,
            "& .MuiInputBase-root": {
              height: 30,
            },
          }}
          value={params.value.value}
          onChange={(e) => {
            const newValue = e.target.value;
            console.log("newValue :::", newValue);
            console.log("params.value.id :::", params.value.id);
            updateCommand(params.value.id, newValue);
          }}
        />
      </Stack>
    ),
  },
  {
    field: "col3",
    headerName: "Send",
    width: 80,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <Button
        variant="outlined"
        color="secondary"
        sx={{ width: 60, height: 30 }}
        onClick={(e) => {
          e.stopPropagation();

          handleSend(params.row.col2.value, params.row.id);
        }}
      >
        Send
      </Button>
    ),
  },
  {
    field: "col4",
    headerName: "Delete",
    width: 80,
    headerAlign: "center",
    align: "center",
    renderCell: (params) => (
      <IconButton
        onClick={(e) => {
          console.log("params :::", params);

          e.stopPropagation();
          handleDelete(params.row.id);
        }}
      >
        <DeleteForeverOutlinedIcon />
      </IconButton>
    ),
  },
];

export default function ResponseLog({
  setIsCmdModalWide,
  logs,
  setLogs,
}: {
  setIsCmdModalWide?: React.Dispatch<React.SetStateAction<boolean>>;
  logs: {
    type: "req" | "res";
    message: string;
    date: string;
    result: string;
  }[];
  setLogs: React.Dispatch<
    React.SetStateAction<
      {
        type: "req" | "res";
        message: string;
        date: string;
        result: string;
      }[]
    >
  >;
}) {
  const [commandValue, setCommandValue] = useState("");
  const [selectedIdxs, setSelectedIdxs] = useState([]);
  const consoleRef = useRef<HTMLDivElement | null>(null);
  console.log("selectedIdxs :::", selectedIdxs);

  const [expand, setExpand] = useState(false);
  const toggleWidth = () => {
    setExpand(!expand);
  };
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const { imei } = useSerialConfigurationStore();

  const currentPort = portList.find(({ port }) => port.imei === imei);

  const { commands, addCommand, removeCommand, updateCommand } =
    useCommandStore();
  const rows = commands.map((command, idx) => ({
    id: command.id,
    col1: `${idx + 1}`,
    col2: { id: command.id, value: command.message },
    col3: { id: command.id },
    col4: { id: command.id },
  }));

  const handleSendMessage = (message: string, updateIndex?: number) => {
    console.log("message :::::", message);

    if (updateIndex === undefined) {
      addCommand(message);
    }

    try {
      const port = currentPort.port;

      console.log("currentPort :::", port);
      console.log("readable :::", currentPort.port.readable);
      console.log("writable :::", currentPort.port.writable);

      console.log("port :::", port);

      const newLog = {
        type: "req",
        message,
        date: dayjs().format("MMM/DD/YYYY HH:mm"),
        result: "Fail",
      };

      setLogs((prev) => [...prev, newLog as any]);

      setTimeout(() => {
        consoleRef.current.scrollBy({
          top: consoleRef.current.scrollHeight,
        });
      }, 0);

      setCommandValue("");

      let resMessage = "";

      currentPort.port.onbuffervalue = (value) => {
        console.log(value, "value onbuffervalue");
        resMessage += value;
        if (value.includes(CR)) {
          newLog.result = "Executing";
          setLogs((prev) => [
            ...prev,
            {
              type: "res",
              message: resMessage,
              date: dayjs().format("MMM/DD/YYYY HH:mm"),
              result: "Executing",
            },
          ]);
          setTimeout(() => {
            consoleRef.current.scrollBy({
              top: consoleRef.current.scrollHeight,
            });
          }, 100);
        }
      };

      write({
        data: message,
        port,
        writer: currentPort.writer,
        callback: () => {
          console.log("tes t::::");
        },
      });
    } catch (e) {
      console.log("e ::::", e);
    }
  };

  useEffect(() => {
    setIsCmdModalWide?.(expand);
  }, [expand]);

  return (
    <>
      <Stack
        direction="row"
        gap={expand ? "16px" : 0}
        style={{ width: "100%" }}
      >
        <Stack gap="16px" style={{ width: "100%" }}>
          <div
            ref={consoleRef}
            className={styles.logWrap}
            style={{ padding: "16px", width: "100%" }}
          >
            <div className={styles.logContainer}>
              {logs.map((item) =>
                item.type === "req" ? (
                  <div className={styles.logReq}>{`> ${item.message}`}</div>
                ) : (
                  <div className={styles.logRes}>{item.message}</div>
                )
              )}
            </div>
          </div>
          <Stack direction="row" gap="16px">
            <TextField
              multiline
              fullWidth
              rows={1}
              value={commandValue}
              onChange={(e) => setCommandValue(e.target.value)}
              sx={{
                flexGrow: 1,
                height: "120px",
                "& .MuiInputBase-root": {
                  padding: "10px 12px",
                  height: "100% !important",
                },
                "& textarea": {
                  height: "100% !important",
                  padding: "0 !important",
                },
              }}
            />
            <Stack justifyContent="space-between">
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => {
                  setCommandValue("");
                }}
              >
                Clear
              </Button>
              <Button
                variant="contained"
                color="secondary"
                disabled={!commandValue}
                onClick={() => {
                  handleSendMessage(commandValue);
                }}
              >
                Send
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack
          flexGrow={1}
          flexShrink={0}
          sx={{ position: "relative", width: expand ? "auto" : 0 }}
        >
          <IconButton
            sx={{
              position: "absolute",
              left: "-48px",
              top: "-60px",
              transform: expand ? "rotate(-180deg)" : undefined,
            }}
            onClick={toggleWidth}
          >
            <KeyboardDoubleArrowRightOutlinedIcon
              sx={{ color: "var(--grey5)" }}
            />
          </IconButton>
          {expand && (
            <Button
              style={{ display: "flex", gap: "8px" }}
              sx={{
                width: "180px",
                position: "absolute",
                right: 0,
                top: "-52px",
              }}
            >
              Show All Commands
              <InfoOutlinedIcon sx={{ color: "var(--grey5)" }} />
            </Button>
          )}

          <Stack
            gap="16px"
            flexGrow={1}
            style={{
              display: "flex",
            }}
            sx={{
              position: "relative",
              //   width: expand ? "auto" : 0,

              overflow: "hidden",
            }}
          >
            <div className={styles.logWrap}>
              <div>
                <DataTable
                  rows={rows}
                  columns={columns(
                    handleSendMessage,
                    removeCommand,
                    updateCommand
                  )}
                  rowHeight={42}
                  disablePagination
                  disableRowClick
                  disableResize
                  minHeight={1}
                  onRowSelectionModelChange={(e) => {
                    setSelectedIdxs(e.sort((a, b) => Number(a) - Number(b)));
                  }}
                />
              </div>
            </div>
            <Button
              variant="contained"
              color="secondary"
              disabled={!selectedIdxs.length}
              onClick={async () => {
                console.log("selec :::", selectedIdxs);

                for (const idx of selectedIdxs) {
                  const target = rows[idx];

                  handleSendMessage(target.col2.value, idx);

                  console.log("asdasd ::::");

                  await delayPromise(500);
                }
              }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
