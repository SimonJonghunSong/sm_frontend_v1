import { Stack, TextField, Button, IconButton } from "@mui/material";
import styles from "./styles.module.scss";

import React, { useState } from "react";

import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import KeyboardDoubleArrowRightOutlinedIcon from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import DataTable from "../../../components/dataTable";
import { GridColDef } from "@mui/x-data-grid";


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
    renderCell: () => (
      <Button
        variant="outlined"
        color="secondary"
        sx={{ width: 60, height: 30 }}
        onClick={(e) => e.stopPropagation()}
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
  ];


export default function ResponseLog() {
  const [expand, setExpand] = useState(false);
  const toggleWidth = () => {
    setExpand(!expand);
  };
  return (
    <>
      <Stack direction="row" gap={expand ? "16px" : 0} flexGrow={1}>
        <Stack gap="16px" flexGrow={1}>
          <div className={styles.logWrap} style={{padding: "16px"}}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vero laborum nobis, veritatis iste quas, quia, sit a aut fuga porro soluta minima. Incidunt commodi nesciunt omnis, modi quis reiciendis suscipit!
          </div>
          <Stack direction="row" gap="16px">
            <TextField
              multiline
              fullWidth
              rows={1}
              sx={{
                flexGrow: 1,
                height: "120px",
                "& .MuiInputBase-root": {
                  padding: "10px 12px",
                  height: "100% !important",
                },
                "& textarea": {
                  height: "100% !important",
                },
              }}
            />
            <Stack justifyContent="space-between">
              <Button variant="outlined" color="secondary">
                Clear
              </Button>
              <Button variant="contained" color="secondary">
                Send
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Stack
        //   flexGrow={1}
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
            sx={{
              position: "relative",
            //   width: expand ? "auto" : 0,
              overflow: "hidden",
            }}
          >
            <div className={styles.logWrap}>
            <DataTable rows={rows} columns={columns} rowHeight={42} disablePagination disableRowClick disableResize/>

            </div>
            <Button variant="contained" color="secondary">
              Send
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
