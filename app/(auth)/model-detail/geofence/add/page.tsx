"use client";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import sampleMap from "/public/images/sample-map2.png";
import sampleMap3 from "/public/images/sample-map3.png";

import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import SideMenu from "../../sidemenu/SideMenu";
import { sideMenuItems } from "../../sideMenuItems";
import Controller from "../../components/Controller";
import InputBox from "../../../../../components/inputbox/InputBox";
import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../../../../components/dataTable";
import Image from "next/image";

export default function Page() {
  const [type, setType] = useState("circular");

  return (
    <div className="pageWrap">
      <SideMenu configuration sideMenuItems={sideMenuItems} />

      <article className="contentWrap">
        <Controller />
        <div className="pageTitle">Add New</div>

        <Stack direction="row" gap="40px" mb="40px">
          <Stack gap="20px" sx={{ width: "50%" }}>
            <InputBox>
              <InputBox.Head>
                <InputBox.Title>
                  Type<i>*</i>
                </InputBox.Title>
                <InputBox.Info tooltipText="tooptip example" />
                <InputBox.Number>50/60</InputBox.Number>
                {/* <span className="notification"/> */}
              </InputBox.Head>
              <InputBox.Body>
                <Select
                  value={type}
                  sx={{ width: "100%" }}
                  onChange={(e) => setType(e.target.value)}
                >
                  <MenuItem value={"circular"}>Circular</MenuItem>
                  <MenuItem value={"polygon"}>Polygon</MenuItem>
                </Select>
              </InputBox.Body>
            </InputBox>
            {type === "circular" ? <CircularType /> : <PolygonType />}
          </Stack>

          <Stack gap="20px" sx={{ width: "50%" }}>
            {type === "circular" ? (
              <Box>
                <Image
                  src={sampleMap}
                  alt="sampleMap"
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </Box>
            ) : (
              <Box>
                <Image
                  src={sampleMap3}
                  alt="sampleMap"
                  style={{ display: "block", width: "100%", height: "auto" }}
                />
              </Box>
            )}
          </Stack>
        </Stack>
        <Stack
          direction="row"
          gap="8px"
          justifyContent="flex-end"
          marginTop="40px"
        >
          <Button variant="outlined" color="secondary">
            Cancel
          </Button>
          <Button variant="contained" color="secondary">
            Add
          </Button>
        </Stack>
      </article>
    </div>
  );
}

function CircularType() {
  return (
    <>
      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Group<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
          {/* <span className="notification"/> */}
        </InputBox.Head>
        <InputBox.Body>
          <Select value={"select-1"} sx={{ width: "100%" }}>
            <MenuItem value={"select-1"}>1</MenuItem>
          </Select>
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Latitude<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
          {/* <span className="notification"/> */}
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth defaultValue="13.85056" />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Longitude<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
          {/* <span className="notification"/> */}
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth defaultValue="-4.31968" />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Radius<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
          {/* <span className="notification"/> */}
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth defaultValue="250000" />
        </InputBox.Body>
      </InputBox>
    </>
  );
}

function PolygonType() {
  return (
    <>
      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Group<i>*</i>
          </InputBox.Title>
          <InputBox.Info tooltipText="tooptip example" />
          <InputBox.Number>2300</InputBox.Number>
          {/* <span className="notification"/> */}
        </InputBox.Head>
        <InputBox.Body>
          <Select value={"select-1"} sx={{ width: "100%" }}>
            <MenuItem value={"select-1"}>1</MenuItem>
          </Select>
        </InputBox.Body>
      </InputBox>

      <DataTable
        checkbox={false}
        noDataMessage="No registered geofence"
        disablePagination
        rows={rows}
        columns={columns}
      />
    </>
  );
}

const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "Latitude",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col2",
    headerName: "Longitude",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col3",
    headerName: "Delete",
    width: 80,
    headerAlign: "center",
    align: "center",
    renderCell: () => (
      <IconButton onClick={(e) => e.stopPropagation()}>
        <DeleteForeverOutlinedIcon />
      </IconButton>
    ),
  },
];

const rows = [
  {
    id: 0,
    col1: "85.155732",
    col2: "-178.493874",
    col3: { id: "1" },
  },
  {
    id: 1,
    col1: "85.155732",
    col2: "-178.493874",
    col3: { id: "1" },
  },
  {
    id: 2,
    col1: "85.155732",
    col2: "-178.493874",
    col3: { id: "1" },
  },
  {
    id: 3,
    col1: "85.155732",
    col2: "-178.493874",
    col3: { id: "1" },
  },
  {
    id: 4,
    col1: "85.155732",
    col2: "-178.493874",
    col3: { id: "1" },
  },
];
