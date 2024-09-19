"use client";

import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';

import { Button, FormControl, IconButton, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import {
  GridColDef,
} from "@mui/x-data-grid";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import DataTable from '../../../../components/dataTable';
import SideMenu from '../../../../components/sidemenu/SideMenu';
import { sideMenuItems } from '../sideMenuItems';
import SelectCountry from '../../../../components/SelectCountry';
import InputBox from '../../../../components/inputbox/InputBox';
import useModal from '../../../../utils/useModal';
import Modal from '../../../../components/Modal';



export default function Server() {
  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: "Country",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col2",
      headerName: "Region",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: "ServerIP",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col4",
      headerName: "Port",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col5",
      headerName: "Edit",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: () => (
        <IconButton onClick={(e) => {e.stopPropagation(); editModalToggle();}}>
          <EditOutlinedIcon />
        </IconButton>
      ),
    },
    {
      field: "col6",
      headerName: "Delete",
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <IconButton onClick={(e) => {
          e.stopPropagation()
            console.log(params)
            deleteRows(params.id)
          }}>
          <DeleteForeverOutlinedIcon />
        </IconButton>
      ),
    },
  ];
  
  const rows = [
    {
      id: 0,
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col5: { id: "1"},
      col6: { id: "1"},
    },
    {
      id: 1,
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col5: { id: "1"},
      col6: { id: "1"},
    },
    {
      id: 2,
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col5: { id: "1"},
      col6: { id: "1"},
    },
    {
      id: 3,
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col5: { id: "1"},
      col6: { id: "1"},
    },
    {
      id: 4,
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col5: { id: "1"},
      col6: { id: "1"},
    },
    {
      id: 5,
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col5: { id: "1"},
      col6: { id: "1"},
    },
    {
      id: 6,
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col5: { id: "1"},
      col6: { id: "1"},
    },
    {
      id: 7,
      col1: "USA",
      col2: "LA",
      col3: "231.232.22.34",
      col4: "3000",
      col5: { id: "1"},
      col6: { id: "1"},
    },
  ];

  const [rowData, setRowData] = useState(rows);
  const [addModal, addModalToggle] = useModal();
  const [editModal, editModalToggle] = useModal();

  const deleteRows = (id) => {
    const deleteIndex = rowData.findIndex((item) => item.id === id);

    console.log("deleteIndex")
    console.log(deleteIndex)
    const copyRows = [...rowData];
    copyRows.splice(deleteIndex ,1);
    
    setRowData(copyRows);
  }

  return (
    <div className="pageWrap">
      <SideMenu sideMenuItems={sideMenuItems}/>
      <article className="contentWrap">
        <div className="pageTitle">Scuti Server List</div>


          <Stack
            direction="row"
            gap="8px"
            justifyContent="flex-end"
            mb="16px"
            width="100%"
          >
            <Button variant="contained" color="secondary" onClick={addModalToggle}>
              Add
            </Button>
          </Stack>

          
        <DataTable rows={rowData} columns={columns} footerButton={<Button variant="text" color="info">Delete</Button>}/>
      </article>

      <Modal
        open={addModal}
        toggleOpen={addModalToggle}
        title="Add Scuti Server"
        confirm={() => {}}
        confirmButtonText="Add"
        width="400px"
      >
        <AddServerModal />
      </Modal>

      <Modal
        open={editModal}
        toggleOpen={editModalToggle}
        title="Edit Scuti Server"
        confirm={() => {}}
        confirmButtonText="Save"
        width="400px"
      >
        <EditServerModal region={"LA"} serverIp={"231.232.22.34"} port={"3000"}/>
      </Modal>
    </div>
  );
}



function AddServerModal() {
  return (
    <Stack>
      <InputBox>
        <InputBox.Head>
          <InputBox.Title>Country</InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <SelectCountry />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>Region</InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>Server IP</InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>Port</InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>
    </Stack>
  );
}

function EditServerModal({region, serverIp, port}) {

  const [country, setCountry] = useState("USA");
  const [inputregion, setRegion] = useState(region || "");
  const [inputServerIp, setServerIp] = useState(serverIp || "");
  const [inputport, setPort] = useState(port || "");

  const handleChange = (e, setState) => {
    setState(e.target.value);
  }

  return (
    <Stack>
      <InputBox>
        <InputBox.Head>
          <InputBox.Title>Country</InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <Select value={"usa"} sx={{ width: "100%" }}>
            <MenuItem value={"usa"}>USA</MenuItem>
          </Select>
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>Region</InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth value={inputregion} onChange={(e) => handleChange(e, setRegion)} />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>Server IP</InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth value={inputServerIp} onChange={(e) => handleChange(e, setServerIp)} />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>Port</InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth value={inputport} onChange={(e) => handleChange(e, setPort)} />
        </InputBox.Body>
      </InputBox>
    </Stack>
  );
}
