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

const columns = (handleSend: (message: string) => void): GridColDef[] => [
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
          defaultValue={params.value.value}
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
          handleSend(params.row.col2.value);
        }}
      >
        Send
      </Button>
    ),
  },
];

const rows = [
  {
    id: 0,
    col1: "01",
    col2: { id: "1", value: "AT^$PSTDBG=E" },
    col3: { id: "1" },
  },
  {
    id: 1,
    col1: "02",
    col2: { id: "1", value: "AT^$PSTDBG=G" },
    col3: { id: "1" },
  },
  {
    id: 2,
    col1: "03",
    col2: { id: "1", value: "AT^$ESN_READ=" },
    col3: { id: "1" },
  },
  {
    id: 3,
    col1: "04",
    col2: { id: "1", value: "AT^$StartFM" },
    col3: { id: "1" },
  },
  {
    id: 4,
    col1: "05",
    col2: { id: "1", value: "AT^$FRCSLP" },
    col3: { id: "1" },
  },
  {
    id: 5,
    col1: "06",
    col2: { id: "1", value: "AT^CMD;;01;02" },
    col3: { id: "1" },
  },
  {
    id: 6,
    col1: "07",
    col2: { id: "1", value: "AT^CMD;;01;03" },
    col3: { id: "1" },
  },
  {
    id: 7,
    col1: "08",
    col2: { id: "1", value: "AT+CPIN?" },
    col3: { id: "1" },
  },
  {
    id: 8,
    col1: "09",
    col2: { id: "1", value: "AT+CEREG?" },
    col3: { id: "1" },
  },
  {
    id: 9,
    col1: "10",
    col2: { id: "1", value: "AT+QJDR?" },
    col3: { id: "1" },
  },
  {
    id: 10,
    col1: "11",
    col2: { id: "1", value: "AT^$PSTDBG=E" },
    col3: { id: "1" },
  },
  {
    id: 11,
    col1: "12",
    col2: { id: "1", value: "AT^$PSTDBG=G" },
    col3: { id: "1" },
  },
  {
    id: 12,
    col1: "13",
    col2: { id: "1", value: "AT^$ESN_READ=" },
    col3: { id: "1" },
  },
  {
    id: 13,
    col1: "14",
    col2: { id: "1", value: "AT^$StartFM" },
    col3: { id: "1" },
  },
  {
    id: 14,
    col1: "15",
    col2: { id: "1", value: "AT^$FRCSLP" },
    col3: { id: "1" },
  },
  {
    id: 15,
    col1: "16",
    col2: { id: "1", value: "AT^CMD;;01;02" },
    col3: { id: "1" },
  },
  {
    id: 16,
    col1: "17",
    col2: { id: "1", value: "AT^CMD;;01;03" },
    col3: { id: "1" },
  },
  {
    id: 17,
    col1: "18",
    col2: { id: "1", value: "AT+CPIN?" },
    col3: { id: "1" },
  },
  {
    id: 18,
    col1: "19",
    col2: { id: "1", value: "AT+CEREG?" },
    col3: { id: "1" },
  },
  {
    id: 19,
    col1: "20",
    col2: { id: "1", value: "AT+QJDR?" },
    col3: { id: "1" },
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

  const handleSendMessage = (message: string) => {
    console.log("message :::::", message);

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
    setIsCmdModalWide(expand);
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
              transform: expand ? undefined : "rotate(-180deg)",
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
                  columns={columns(handleSendMessage)}
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

                  handleSendMessage(target.col2.value);

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
