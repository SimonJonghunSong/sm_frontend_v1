"use client";

import React, { useReducer, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { GridColDef } from "@mui/x-data-grid";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DataTable from "@/components/dataTable";
import SideMenu from "@/components/sidemenu/SideMenu";
import { sideMenuItems } from "../sideMenuItems";
import SelectCountry, { selectCountryData } from "@/components/SelectCountry";
import InputBox from "@/components/inputbox/InputBox";
import useModal from "@/utils/useModal";
import Modal from "@/components/Modal";
import {
  addScutiServer,
  deleteScutiServer,
  getScutiServer,
  modifyScutiServer,
} from "@/src/api/services/scuti";
import useConfirmDialog from "@/src/hooks/useConfirmDialog";
import regexPatterns from "@/src/regex/regex";

export default function Server() {
  const t = useTranslations();
  const deleteCallback = useRef<() => void>();
  const deleteModel = deleteCallback.current;
  const { toggle, renderConfirmModal } = useConfirmDialog({
    description: t("popup.server.scuti_server.delete"),
    onYes: () => {
      deleteModel();
      deleteCallback.current = undefined;
    },
  });
  const {
    toggle: multiDeleteDialogToggle,
    renderConfirmModal: renderMultiDeleteModal,
  } = useConfirmDialog({
    description: t("popup.server.scuti_server.delete"),
    onYes: () => {
      deleteModel();
      deleteCallback.current = undefined;
    },
  });
  const { data, error } = useQuery({
    queryKey: ["scuti-server"],
    queryFn: getScutiServer,
  });
  const [selectedMqttServer, setSelectedMqttServer] = useState<{
    col1: string;
    col2: string;
    col3: string;
    col4: string;
    id: string;
  }>();

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: deleteScutiServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scuti-server"] });
      toast(t("common.message.delete-success"), {
        type: "success",
      });
    },
  });

  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: t("server.scuti_server.country"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col2",
      headerName: t("server.scuti_server.region"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: t("server.scuti_server.server_ip"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col4",
      headerName: t("server.scuti_server.port"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col5",
      headerName: t("server.scuti_server.edit"),
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
      headerName: t("server.scuti_server.delete"),
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggle();
            deleteCallback.current = () => mutate([params.row.id]);
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
        col1:
          country?.toUpperCase() === "USA"
            ? "United States" // tq
            : country
            ? country.charAt(0).toUpperCase() + country.slice(1).toLowerCase()
            : "-",
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
    multiDeleteDialogToggle();
    deleteCallback.current = () => mutate(selectedRows);
  };

  return (
    <div className="pageWrap">
      <SideMenu sideMenuItems={sideMenuItems} />
      <article className="contentWrap">
        <div className="pageTitle">
          {t("server.scuti_server.scuti_server_list")}
        </div>

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
            {t("server.add_mqtt_server_pop_up.add")}
          </Button>
        </Stack>

        <DataTable
          rows={error ? [] : rows}
          columns={columns}
          onRowSelectionModelChange={(data) =>
            setSelectedRows(data as string[])
          }
          noDataMessage="No registered servers."
          footerButton={
            <Button
              disabled={selectedRows.length === 0}
              variant="text"
              color="info"
              onClick={handleDeleteRows}
            >
              {t("server.scuti_server.delete")}
            </Button>
          }
        />
      </article>

      {addModal && <AddServerModal onClose={addModalToggle} />}
      {editModal && (
        <EditServerModal
          country={
            selectedMqttServer.col1.toLowerCase() === "united states"
              ? "usa"
              : selectCountryData.find(
                  (ctr) => ctr.value === selectedMqttServer.col1.toLowerCase()
                )?.value
          }
          region={selectedMqttServer.col2}
          serverIp={selectedMqttServer.col3}
          port={selectedMqttServer.col4}
          onClose={editModalToggle}
          uid={selectedMqttServer.id}
        />
      )}
      {renderConfirmModal()}
      {renderMultiDeleteModal()}
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

function AddServerModal({ onClose }) {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, {
    country: "",
    region: "",
    serverIp: "",
    port: "",
  });

  const { mutate } = useMutation({
    mutationFn: addScutiServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scuti-server"] });
      toast(t("common.message.add-success"), {
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
      open
      closeButton
      disabled={
        !state.country || !state.port || !state.region || !state.serverIp
      }
      toggleOpen={onClose}
      title={`${t("server.scuti_server.add_scuti_server")}`}
      confirm={handleAdd}
      confirmButtonText="Add"
      width="400px"
    >
      <Stack>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("server.add_scuti_server_pop_up.country")}
              <strong className="require">&nbsp;*</strong>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <SelectCountry
              setCountryData={(data) => setField("SET_COUNTRY", data as string)}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("server.scuti_server.region")}
              <strong className="require">&nbsp;*</strong>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.region}
              onChange={(e) => {
                const regex = regexPatterns.englishWithSpacesRegex;
                const value = e.target.value;

                // 입력값 중 허용되지 않는 문자 제거
                if (!regex.test(value)) {
                  e.target.value = value.replace(/[^a-zA-Z\s]/g, "");
                }
                setField("SET_REGION", e.target.value);
              }}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("server.scuti_server.server_ip")}
              <strong className="require">&nbsp;*</strong>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.serverIp}
              onChange={(e) => {
                const regex = regexPatterns.onlyNumbersAndSpecialCharsRegex;
                const value = e.target.value;
                // 입력값 중 허용되지 않는 문자 제거
                if (!regex.test(value)) {
                  e.target.value = value.replace(
                    /[^0-9!@#$%^&*(),.?":{}|<>_-]/g,
                    ""
                  );
                }
                setField("SET_SERVER_IP", e.target.value);
              }}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("server.scuti_server.port")}
              <strong className="require">&nbsp;*</strong>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.port}
              onChange={(e) => {
                const regex = regexPatterns.onlyNumbersAndSpecialCharsRegex;
                const value = e.target.value;
                // 입력값 중 허용되지 않는 문자 제거
                if (!regex.test(value)) {
                  e.target.value = value.replace(
                    /[^0-9!@#$%^&*(),.?":{}|<>_-]/g,
                    ""
                  );
                }
                setField("SET_PORT", e.target.value);
              }}
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
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: modifyScutiServer,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["scuti-server"] });
      toast(t("common.message.edit-success"), {
        type: "success",
      });
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
      uid,
      name: "",
      description: "",
    });
  };

  return (
    <Modal
      open
      closeButton
      disabled={!inputRegion || !inputServerIp || !inputPort}
      toggleOpen={onClose}
      title={`${t("server.scuti_server.edit_scuti_server")}`}
      confirm={handleModify}
      confirmButtonText={t("server.edit_scuti_server_pop_up.save")}
      width="400px"
    >
      <Stack>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("server.edit_scuti_server_pop_up.country")}
              <strong className="require">&nbsp;*</strong>
            </InputBox.Title>
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
            <InputBox.Title>
              {t("server.edit_scuti_server_pop_up.region")}
              <strong className="require">&nbsp;*</strong>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={inputRegion}
              onChange={(e) => {
                const regex = regexPatterns.englishWithSpacesRegex;
                const value = e.target.value;

                // 입력값 중 허용되지 않는 문자 제거
                if (!regex.test(value)) {
                  e.target.value = value.replace(/[^a-zA-Z\s]/g, "");
                }
                handleChange(e, setRegion);
              }}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("server.edit_scuti_server_pop_up.server_ip")}
              <strong className="require">&nbsp;*</strong>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={inputServerIp}
              onChange={(e) => {
                const regex = regexPatterns.onlyNumbersAndSpecialCharsRegex;
                const value = e.target.value;
                // 입력값 중 허용되지 않는 문자 제거
                if (!regex.test(value)) {
                  e.target.value = value.replace(
                    /[^0-9!@#$%^&*(),.?":{}|<>_-]/g,
                    ""
                  );
                }
                handleChange(e, setServerIp);
              }}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("server.edit_scuti_server_pop_up.port")}
              <strong className="require">&nbsp;*</strong>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={inputPort}
              onChange={(e) => {
                const regex = regexPatterns.onlyNumbersAndSpecialCharsRegex;
                const value = e.target.value;
                // 입력값 중 허용되지 않는 문자 제거
                if (!regex.test(value)) {
                  e.target.value = value.replace(
                    /[^0-9!@#$%^&*(),.?":{}|<>_-]/g,
                    ""
                  );
                }
                handleChange(e, setPort);
              }}
            />
          </InputBox.Body>
        </InputBox>
      </Stack>
    </Modal>
  );
}
