"use client";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { Dispatch, SetStateAction, useState } from "react";
import DataTable from "../../../components/dataTable";
import Modal from "../../../components/Modal";
import useModal from "../../../utils/useModal";
import InputBox from "../../../components/inputbox/InputBox";
import SelectCountry from "../../../components/SelectCountry";
import { FileUploadOutlined } from "@mui/icons-material";

const columns: GridColDef[] = [
  {
    field: "col1",
    headerName: "E-mail",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col2",
    headerName: "ID",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col3",
    headerName: "Username",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col4",
    headerName: "Company(Account)",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col5",
    headerName: "Country",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col6",
    headerName: "Role",
    flex: 1,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col7",
    headerName: "Date",
    minWidth: 240,
    headerAlign: "center",
    align: "center",
  },
  {
    field: "col8",
    headerName: "Edit",
    width: 80,
    headerAlign: "center",
    align: "center",
    renderCell: () => (
      <IconButton onClick={(e) => e.stopPropagation()}>
        <EditOutlinedIcon />
      </IconButton>
    ),
  },
  {
    field: "col9",
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
    col1: "abc@stsunlab.com",
    col2: "test1234",
    col3: "James Franco",
    col4: "ST Sunlab (15)",
    col5: "USA",
    col6: "Guest",
    col7: "Jan/19/2024 18:08",
    col8: { id: "1" },
    col9: { id: "1" },
  },
  {
    id: 1,
    col1: "abc@stsunlab.com",
    col2: "test1234",
    col3: "James Franco",
    col4: "ST Sunlab (15)",
    col5: "USA",
    col6: "Guest",
    col7: "Jan/19/2024 18:08",
    col8: { id: "1" },
    col9: { id: "1" },
  },
  {
    id: 2,
    col1: "abc@stsunlab.com",
    col2: "test1234",
    col3: "James Franco",
    col4: "ST Sunlab (15)",
    col5: "USA",
    col6: "Guest",
    col7: "Jan/19/2024 18:08",
    col8: { id: "1" },
    col9: { id: "1" },
  },
  {
    id: 3,
    col1: "abc@stsunlab.com",
    col2: "test1234",
    col3: "James Franco",
    col4: "ST Sunlab (15)",
    col5: "USA",
    col6: "Administor",
    col7: "Jan/19/2024 18:08",
    col8: { id: "1" },
    col9: { id: "1" },
  },
  {
    id: 4,
    col1: "abc@stsunlab.com",
    col2: "test1234",
    col3: "James Franco",
    col4: "ST Sunlab (15)",
    col5: "USA",
    col6: "Administor",
    col7: "Jan/19/2024 18:08",
    col8: { id: "1" },
    col9: { id: "1" },
  },
  {
    id: 5,
    col1: "abc@stsunlab.com",
    col2: "test1234",
    col3: "James Franco",
    col4: "ST Sunlab (15)",
    col5: "USA",
    col6: "Administor",
    col7: "Jan/19/2024 18:08",
    col8: { id: "1" },
    col9: { id: "1" },
  },
  {
    id: 6,
    col1: "abc@stsunlab.com",
    col2: "test1234",
    col3: "James Franco",
    col4: "ST Sunlab (15)",
    col5: "USA",
    col6: "Customer",
    col7: "Jan/19/2024 18:08",
    col8: { id: "1" },
    col9: { id: "1" },
  },
  {
    id: 7,
    col1: "abc@stsunlab.com",
    col2: "test1234",
    col3: "James Franco",
    col4: "ST Sunlab (15)",
    col5: "USA",
    col6: "Customer",
    col7: "Jan/19/2024 18:08",
    col8: { id: "1" },
    col9: { id: "1" },
  },
];

const selectRoleData = [
  { label: "Admin", value: "admin" },
  { label: "Customer", value: "customer" },
  { label: "Guest", value: "guest" },
];

const selectCompanyData = [
  { label: "company1", value: "company1" },
  { label: "company2", value: "company2" },
  { label: "company3", value: "company3" },
];

export default function Account() {
  const [roleFilter, setRoleFilter] = useState<string>("All");
  const [userFilter, setUserFilter] = useState<string>("All");

  const [modal, modalToggle] = useModal();

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  return (
    <div className="pageWrap">
      <article className="contentWrap">
        <div className="pageTitle">Account</div>
        <Stack>
          <Stack
            direction="row"
            gap="8px"
            justifyContent="space-between"
            mb="16px"
          >
            <Stack direction="row" gap="8px">
              <Select
                value={roleFilter}
                onChange={(e) => handleSelectChange(e, setRoleFilter)}
                sx={{ minWidth: 160 }}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"Admin"}>Admin</MenuItem>
                <MenuItem value={"Customer"}>Customer</MenuItem>
                <MenuItem value={"Guest"}>Guest</MenuItem>
              </Select>

              <Select
                value={userFilter}
                onChange={(e) => handleSelectChange(e, setUserFilter)}
                sx={{ minWidth: 160 }}
              >
                <MenuItem value={"All"}>All</MenuItem>
                <MenuItem value={"E-mail"}>E-mail</MenuItem>
                <MenuItem value={"Username"}>Username</MenuItem>
                <MenuItem value={"CompanyName"}>Company</MenuItem>
              </Select>

              <TextField sx={{ width: 160 }} />

              <Button variant="contained" color="secondary">
                Search
              </Button>
            </Stack>

            <Button variant="contained" color="secondary" onClick={modalToggle}>
              Add
            </Button>
          </Stack>
          <DataTable
            rows={rows}
            columns={columns}
            footerButton={
              <Button variant="text" color="info">
                Delete
              </Button>
            }
          />
        </Stack>
      </article>

      <Modal
        open={modal}
        toggleOpen={modalToggle}
        title="Add Account"
        confirm={() => {}}
        confirmButtonText="Add"
        width="400px"
      >
        <AddAcountModal />
      </Modal>
    </div>
  );
}

// TODO: Role condition에 따라 레이아웃 다르게 보여지도록 필요 (아래 샘플은 customer 기준: 제일 많은 컴포넌트)
function AddAcountModal() {
  const [role, setRole] = useState<string>("");

  const handleSelectChange = (
    e: SelectChangeEvent,
    setState: Dispatch<SetStateAction<string>>
  ) => {
    setState(e.target.value);
  };

  const [file, setFile] = useState<File>(null);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Stack>
      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Role<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <FormControl sx={{ width: "100%" }} size="small">
            <Select
              displayEmpty
              renderValue={(v) =>
                v?.length ? (
                  selectRoleData.find((item) => item.value === v).label
                ) : (
                  <span className="text-grey-5">Select</span>
                )
              }
              value={role}
              onChange={(e) => handleSelectChange(e, setRole)}
            >
              {selectRoleData.map((item) => (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            ID<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            E-mail<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>
      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Name<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Password<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Confirm Password<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Country<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <SelectCountry />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Company<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>Department</InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Tax ID<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            Alias<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <TextField fullWidth />
        </InputBox.Body>
      </InputBox>

      <InputBox>
        <InputBox.Head>
          <InputBox.Title>
            NDA Contract<i>*</i>
          </InputBox.Title>
        </InputBox.Head>
        <InputBox.Body>
          <Stack direction="row" gap="8px">
            <TextField
              fullWidth
              value={file?.name || ""}
              inputProps={{ readOnly: true }}
            />
            <Button variant="contained" color="secondary" component="label">
              <input
                style={{ display: "none" }}
                type="file"
                hidden
                onChange={handleFileChange}
              />
              Upload
            </Button>
          </Stack>
        </InputBox.Body>
      </InputBox>
    </Stack>
  );
}
