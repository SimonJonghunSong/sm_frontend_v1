import {
  Stack,
  TextField,
  Button,
  IconButton,
  Modal,
  Box,
} from "@mui/material";
import styles from "./styles.module.scss";

import React, { useEffect, useRef, useState } from "react";

import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import DataTable from "../../../components/dataTable";
import { GridColDef } from "@mui/x-data-grid";
import useSerialConfigurationStore from "@/src/stores/useSerialConfigurationStore";
import useSerial, { delayPromise } from "@/src/hooks/useSerial";
import { CR } from "@/src/hooks/useSerial/constant";
import dayjs from "dayjs";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import { useMutation, useQuery } from "@tanstack/react-query";
import { me, modifyMyAccount } from "@/src/api/services/auth";

export default function ResponseLog({
  setIsCmdModalWide,
  logs,
  setLogs,
  operationLogs,
  setOperationLogs,
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
  operationLogs: {
    type: "req" | "res";
    message: string;
    date: string;
    result: string;
  }[];
  setOperationLogs: React.Dispatch<
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
  const [userCmdList, setUserCmdList] = useState<
    { id: string; value: string }[]
  >([]);

  const {
    data: cmdList,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["me"],
    queryFn: me,
    select: (data) => {
      return data.data.parameter.user.cmd_list || [];
    },
  });

  const modifyCmdList = useMutation({
    mutationFn: (cmdList: string[]) =>
      modifyMyAccount({
        cmd_list: cmdList,
      }),
  });

  const columns: GridColDef[] = [
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
      renderCell: (params) => {
        return (
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
                setUserCmdList((prev) =>
                  prev.map((cmd) =>
                    cmd.id === params.value.id
                      ? { ...cmd, value: e.target.value }
                      : cmd
                  )
                );
              }}
            />
          </Stack>
        );
      },
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
          onClick={async (e) => {
            try {
              e.stopPropagation();
              await modifyCmdList.mutateAsync(
                userCmdList.filter((cmd) => cmd.value).map((cmd) => cmd.value)
              );
              await refetch();
              handleSendMessage(params.row.col2.value || "");
            } catch (e) {
              console.log("send error :::", e);
            }
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
          onClick={async (e) => {
            try {
              e.stopPropagation();

              const newUserCmdList = userCmdList.filter(
                (cmd) => cmd.id !== params.row.col2.id
              );

              await modifyCmdList.mutateAsync(
                newUserCmdList
                  .filter((cmd) => cmd.value)
                  .map((cmd) => cmd.value)
              );

              await refetch();

              setUserCmdList(newUserCmdList);
            } catch (e) {
              console.log("delete error :::", e);
            }
          }}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      ),
    },
  ];

  const [commandValue, setCommandValue] = useState("");
  const [selectedIdxs, setSelectedIdxs] = useState([]);
  const [showCommandsModal, setShowCommandsModal] = useState(false);
  const consoleRef = useRef<HTMLDivElement | null>(null);

  const [expand, setExpand] = useState(false);
  const toggleWidth = () => {
    setExpand(!expand);
  };

  // 지원하는 커맨드 예시 데이터
  const commandExamples = [
    {
      category: "System Commands",
      commands: [
        "AT^VERSION",
        "AT^IMEI",
        "AT^MODEL",
        "AT^RESET",
        "AT^REBOOT",
        "AT^POWEROFF",
      ],
    },
    {
      category: "Network Commands",
      commands: [
        "AT^SIGNAL",
        "AT^OPERATOR",
        "AT^BAND",
        "AT^APN",
        "AT^IPADDR",
        "AT^DNS",
      ],
    },
    {
      category: "GPS Commands",
      commands: [
        "AT^GPS",
        "AT^GPSSTATUS",
        "AT^GPSFIX",
        "AT^GPSCOORD",
        "AT^GPSALT",
        "AT^GPSSPEED",
      ],
    },
    {
      category: "Configuration Commands",
      commands: [
        "AT^CONFIG",
        "AT^PARAM",
        "AT^SETTING",
        "AT^PROFILE",
        "AT^BACKUP",
        "AT^RESTORE",
      ],
    },
    {
      category: "Status Commands",
      commands: [
        "AT^STATUS",
        "AT^HEALTH",
        "AT^BATTERY",
        "AT^TEMP",
        "AT^MEMORY",
        "AT^CPU",
      ],
    },
    {
      category: "Communication Commands",
      commands: [
        "AT^SMS",
        "AT^CALL",
        "AT^DATA",
        "AT^HTTP",
        "AT^MQTT",
        "AT^TCP",
      ],
    },
  ];
  const {
    state: { portList },
    func: { write },
  } = useSerial();

  const { imei } = useSerialConfigurationStore();

  const currentPort = portList.find(({ port }) => port.imei === imei);

  const handleSendMessage = (message: string) => {
    try {
      const port = currentPort.port;

      const newLog = {
        type: "req",
        message,
        date: dayjs().format("MMM/DD/YYYY HH:mm"),
        result: "Fail",
      };

      setLogs((prev) => [...prev, newLog as any]);
      setOperationLogs((prev) => [...prev, newLog as any]);

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

  useEffect(() => {
    if (isSuccess) {
      // 20개로 맞추기 위해 빈 객체로 채움
      const paddedCmdList = cmdList.map((cmd, index) => ({
        id: `cmd_${index}`,
        value: cmd,
      }));
      while (paddedCmdList.length < 20) {
        paddedCmdList.push({
          id: `cmd_${paddedCmdList.length}`,
          value: "",
        });
      }
      setUserCmdList(paddedCmdList);
    }
  }, [isSuccess]);

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
                  setLogs([]); // ResponseLog만 지우기
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
              sx={{
                width: "180px",
                position: "absolute",
                right: 0,
                top: "-52px",
              }}
              onClick={() => setShowCommandsModal(true)}
            >
              Show All Commands
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
                  rows={userCmdList.map((cmd, idx) => ({
                    id: cmd.id,
                    col1: `${idx + 1}`,
                    col2: { id: cmd.id, value: cmd.value },
                    col3: { id: cmd.id },
                    col4: { id: cmd.id },
                  }))}
                  columns={columns}
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
                await modifyCmdList.mutateAsync(
                  userCmdList.filter((cmd) => cmd.value).map((cmd) => cmd.value)
                );
                await refetch();

                for (const cmdId of selectedIdxs) {
                  const target = userCmdList.find((cmd) => cmd.id === cmdId);
                  handleSendMessage(target?.value || "");

                  await delayPromise(500);
                }
              }}
            >
              Send
            </Button>
          </Stack>
        </Stack>
      </Stack>

      {/* Commands Examples Modal */}
      <Modal
        open={showCommandsModal}
        onClose={() => setShowCommandsModal(false)}
        aria-labelledby="commands-modal-title"
        aria-describedby="commands-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80%",
            maxWidth: "800px",
            maxHeight: "80vh",
            bgcolor: "background.paper",
            border: "2px solid #000",
            borderRadius: "8px",
            boxShadow: 24,
            p: 4,
            overflow: "auto",
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            mb={3}
          >
            <h2
              id="commands-modal-title"
              style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}
            >
              Supported Commands Examples
            </h2>
            <IconButton
              onClick={() => setShowCommandsModal(false)}
              sx={{
                color: "var(--grey5)",
                "&:hover": {
                  color: "var(--black)",
                },
              }}
            >
              ✕
            </IconButton>
          </Stack>

          <Stack spacing={3}>
            {commandExamples.map((category, index) => (
              <Box key={index}>
                <h3
                  style={{
                    margin: "0 0 12px 0",
                    fontSize: "18px",
                    fontWeight: "600",
                    color: "var(--secondary)",
                    borderBottom: "2px solid var(--grey4)",
                    paddingBottom: "8px",
                  }}
                >
                  {category.category}
                </h3>
                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: 2,
                    p: 2,
                    bgcolor: "var(--grey1)",
                    borderRadius: "4px",
                  }}
                >
                  {category.commands.map((command, cmdIndex) => (
                    <Box
                      key={cmdIndex}
                      sx={{
                        p: 1.5,
                        bgcolor: "white",
                        border: "1px solid var(--grey3)",
                        borderRadius: "4px",
                        fontFamily: "monospace",
                        fontSize: "14px",
                        cursor: "pointer",
                        "&:hover": {
                          bgcolor: "var(--grey2)",
                          borderColor: "var(--secondary)",
                        },
                      }}
                      onClick={() => {
                        setCommandValue(command);
                        setShowCommandsModal(false);
                      }}
                    >
                      {command}
                    </Box>
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>

          <Box mt={3} p={2} bgcolor="var(--grey1)" borderRadius="4px">
            <p style={{ margin: 0, fontSize: "14px", color: "var(--grey5)" }}>
              <strong>Note:</strong> Click on any command to copy it to the
              input field. These are example commands - actual supported
              commands may vary by device model and firmware version.
            </p>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
