"use client";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { Button, IconButton, Stack, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import React, { useReducer, useState } from "react";
import DataTable from "../../../../components/dataTable";
import SideMenu from "../../../../components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import SelectCountry from "../../../../components/SelectCountry";
import InputBox from "../../../../components/inputbox/InputBox";
import useModal from "../../../../utils/useModal";
import Modal from "../../../../components/Modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addMqttServer,
  getMqttServer,
  modifyMqttServer,
  deleteMqttServer,
} from "@/src/api/services/mqtt";
import { toast } from "react-toastify";

export default function Server() {
  const { data, error, isPending } = useQuery({
    queryKey: ["mqtt-server"],
    queryFn: getMqttServer,
  });
  const [selectedMqttServer, setSelectedMqttServer] = useState<{
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    id: string;
  }>();
  const [selectedRows, setSelectedRows] = useState<string[]>();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteMqttServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mqtt-server"] });
      toast("Successfully deleted!", {
        type: "success",
      });
    },
  });

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
      renderCell: (event) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            setSelectedMqttServer(event.row);
            editModalToggle();
          }}
        >
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
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            mutate([params.row.id]);
          }}
        >
          <DeleteForeverOutlinedIcon />
        </IconButton>
      ),
    },
  ];

  const rows = (data?.data.records || []).map(
    ({ uid, country, region, ip, port }) => {
      return {
        id: uid,
        col1: country,
        col2: region,
        col3: ip,
        col4: port,
        col5: { id: "1" },
        col6: { id: "1" },
      };
    }
  );

  const [addModal, addModalToggle] = useModal();
  const [editModal, editModalToggle] = useModal();

  const handleDeleteRows = () => {
    mutate(selectedRows);
  };

  return (
    <div className="pageWrap">
      <SideMenu sideMenuItems={sideMenuItems} />
      <article className="contentWrap">
        <div className="pageTitle">MQTT Server List</div>

        <Stack
          direction="row"
          gap="8px"
          justifyContent="flex-end"
          mb="16px"
          width="100%"
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={addModalToggle}
          >
            Add
          </Button>
        </Stack>

        <DataTable
          rows={error ? [] : rows}
          columns={columns}
          onRowSelectionModelChange={(data) =>
            setSelectedRows(data as string[])
          }
          footerButton={
            <Button variant="text" color="info" onClick={handleDeleteRows}>
              Delete
            </Button>
          }
        />
      </article>

      {addModal && <AddServerModal open onClose={addModalToggle} />}
      {editModal && (
        <EditServerModal
          country={selectedMqttServer.col1}
          region={selectedMqttServer.col2}
          serverIp={selectedMqttServer.col3}
          port={selectedMqttServer.col4}
          onClose={editModalToggle}
          uid={selectedMqttServer.id}
        />
      )}
    </div>
  );
}

type State = {
  country: string;
  region: string;
  serverIp: string;
  port: string;
};

type Action =
  | { type: "SET_COUNTRY"; payload: string }
  | { type: "SET_REGION"; payload: string }
  | { type: "SET_SERVER_IP"; payload: string }
  | { type: "SET_PORT"; payload: string };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_COUNTRY":
      return { ...state, country: action.payload };
    case "SET_REGION":
      return { ...state, region: action.payload };
    case "SET_SERVER_IP":
      return { ...state, serverIp: action.payload };
    case "SET_PORT":
      return { ...state, port: action.payload };
    default:
      return state;
  }
}

function AddServerModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, {
    country: "",
    region: "",
    serverIp: "",
    port: "",
  });

  const { mutate } = useMutation({
    mutationFn: addMqttServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mqtt-server"] });
      toast("Successfully added!", {
        type: "success",
      });
      onClose();
    },
  });

  const setField = (type: Action["type"], value: string) =>
    dispatch({ type, payload: value });

  const handleAdd = () => {
    mutate({
      ...state,
      country: state.country.toUpperCase(),
      ip: state.serverIp,
      name: "",
      description: "",
    });
  };

  return (
    <Modal
      open={open}
      toggleOpen={onClose}
      title="Add MQTT Server"
      confirm={handleAdd}
      confirmButtonText="Add"
      width="400px"
    >
      <Stack>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>Country</InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <SelectCountry
              setCountryData={(data) => setField("SET_COUNTRY", data as string)}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>Region</InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.region}
              onChange={(e) => setField("SET_REGION", e.target.value)}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>Server IP</InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.serverIp}
              onChange={(e) => setField("SET_SERVER_IP", e.target.value)}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>Port</InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.port}
              onChange={(e) => setField("SET_PORT", e.target.value)}
            />
          </InputBox.Body>
        </InputBox>
      </Stack>
    </Modal>
  );
}

function EditServerModal({
  country,
  region,
  serverIp,
  port,
  onClose,
  uid,
}: {
  country: string;
  region: string;
  serverIp: string;
  port: string;
  uid: string;
  onClose: () => void;
}) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: modifyMqttServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mqtt-server"] });
      onClose();
    },
  });

  const [countryState, setCountryState] = useState(country);
  const [inputRegion, setRegion] = useState(region || "");
  const [inputServerIp, setServerIp] = useState(serverIp || "");
  const [inputPort, setPort] = useState(port || "");

  const handleChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleModify = () => {
    mutate({
      country: countryState,
      region: inputRegion,
      ip: inputServerIp,
      port: inputPort,
      name: "",
      description: "",
      uid,
    });
  };

  return (
    <Modal
      open
      toggleOpen={onClose}
      title="Edit MQTT Server"
      confirm={handleModify}
      confirmButtonText="Save"
      width="400px"
    >
      <Stack>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>Country</InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <SelectCountry
              defaultCountry={countryState.toLowerCase()}
              setCountryData={(data) => setCountryState(data as string)}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>Region</InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={inputRegion}
              onChange={(e) => handleChange(e, setRegion)}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>Server IP</InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={inputServerIp}
              onChange={(e) => handleChange(e, setServerIp)}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>Port</InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={inputPort}
              onChange={(e) => handleChange(e, setPort)}
            />
          </InputBox.Body>
        </InputBox>
      </Stack>
    </Modal>
  );
}
