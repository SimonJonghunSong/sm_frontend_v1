"use client";

import React, { useReducer, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { GridColDef } from "@mui/x-data-grid";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DataTable from "@/components/dataTable";
import InputBox from "@/components/inputbox/InputBox";
import useModal from "@/utils/useModal";
import Modal from "@/components/Modal";
import useConfirmDialog from "@/src/hooks/useConfirmDialog";
import dayjs from "dayjs";
import { createNoti, getAdminNoti } from "@/src/api/services/notification";
import { toast } from "react-toastify";

export default function Notify() {
  const t = useTranslations();
  const deleteCallback = useRef<() => void>();
  const deleteModel = deleteCallback.current;
  const { toggle, renderConfirmModal } = useConfirmDialog({
    description: t("notify.alert.delete"),
    onYes: () => {
      deleteModel();
      deleteCallback.current = undefined;
    },
  });
  const {
    toggle: multiDeleteDialogToggle,
    renderConfirmModal: renderMultiDeleteModal,
  } = useConfirmDialog({
    description: t("notify.alert.delete"),
    onYes: () => {
      deleteModel();
      deleteCallback.current = undefined;
    },
  });

  const { data, error } = useQuery({
    queryKey: ["notify"],
    queryFn: getAdminNoti,
  });

  console.log("data :::", data);

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const queryClient = useQueryClient();

  const handleCopy = async (message: string) => {
    try {
      await navigator.clipboard.writeText(message);

      toast(t("notify.table.copy_success"), { type: "success" });
    } catch (err) {
      console.error("복사 실패:", err);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "col1",
      headerName: t("notify.table.title"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col2",
      headerName: t("notify.table.creator"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col3",
      headerName: t("notify.table.created_date"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col4",
      headerName: t("notify.table.status"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col5",
      headerName: t("notify.table.send_date"),
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "col6",
      headerName: t("notify.table.copy"),
      width: 80,
      headerAlign: "center",
      align: "center",
      renderCell: (event) => (
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            // TODO: 메세지 내용 복사
            console.log("event :::", event);

            handleCopy(event?.row?.message);
          }}
        >
          <ContentCopyIcon />
        </IconButton>
      ),
    },
  ];

  // TODO 수정 필요
  const rows = ((data?.data.records as any[]) || []).map(
    ({ uid, title, sender, created, message, sended }) => {
      return {
        id: uid,
        col1: title,
        col2: sender,
        col3: dayjs(created).format("MMM/DD/YYYY HH:mm"),
        col4: "Sent",
        col5: dayjs(sended).format("MMM/DD/YYYY HH:mm"),
        message,
      };
    }
  );

  const [addModal, addModalToggle] = useModal();

  return (
    <div className="pageWrap">
      <article className="contentWrap">
        <div className="pageTitle">{t("notify.message_list")}</div>

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
            {t("notify.send")}
          </Button>
        </Stack>

        <DataTable
          rows={error ? [] : rows}
          columns={columns}
          onRowSelectionModelChange={(data) =>
            setSelectedRows(data as string[])
          }
          noDataMessage="No registered messages."
          checkbox={false}
        />
      </article>

      {addModal && <SendNotifyModal onClose={addModalToggle} />}
      {renderConfirmModal()}
      {renderMultiDeleteModal()}
    </div>
  );
}

type State = {
  title: string;
  link: string;
  message: string;
  messageGroup: string[];
};

type Action =
  | { type: "SET_TITLE"; payload: string }
  | { type: "SET_LINK"; payload: string }
  | { type: "SET_MESSAGE"; payload: string }
  | { type: "SET_MESSAGE_GROUP"; payload: string[] };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TITLE":
      return { ...state, title: action.payload };
    case "SET_LINK":
      return { ...state, link: action.payload };
    case "SET_MESSAGE":
      return { ...state, message: action.payload };
    case "SET_MESSAGE_GROUP":
      return { ...state, messageGroup: action.payload };
    default:
      return state;
  }
}

function SendNotifyModal({ onClose }) {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const [state, dispatch] = useReducer(reducer, {
    title: "",
    message: "",
    link: "",
    messageGroup: [],
  });

  const setField = (
    type: "SET_TITLE" | "SET_MESSAGE" | "SET_LINK",
    value: string
  ) => {
    dispatch({ type, payload: value });
  };

  const handleMessageGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = event.target;

    if (value === "all") {
      if (checked) {
        dispatch({
          type: "SET_MESSAGE_GROUP",
          payload: ["all", "admin", "customer", "client", "guest"],
        });
      } else {
        dispatch({
          type: "SET_MESSAGE_GROUP",
          payload: [],
        });
      }

      return;
    }

    if (checked) {
      const payload = [...state.messageGroup, value];

      if (payload.length === 4) {
        payload.push("all");
      }

      dispatch({
        type: "SET_MESSAGE_GROUP",
        payload,
      });
    } else {
      let payload = state.messageGroup.filter(
        (item) => item !== "all" && item !== value
      );

      dispatch({
        type: "SET_MESSAGE_GROUP",
        payload,
      });
    }
  };

  const { mutate } = useMutation({
    mutationFn: createNoti,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notify"] });
      toast(t("notify.alert.sent_success"), { type: "success" });
      onClose();
    },
  });

  const handleAdd = () => {
    console.log("state :::", state);
    mutate({
      title: state.title,
      message: state.message,
      link: state.link || undefined,
    });
  };

  return (
    <Modal
      open
      closeButton
      // disabled={!state.title || !state.message || !state.messageGroup.length}
      disabled={!state.title || !state.message}
      toggleOpen={onClose}
      title={`${t("notify.popup.popup_title")}`}
      confirm={handleAdd}
      confirmButtonText={t("notify.send")}
      width="500px"
    >
      <Stack>
        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("notify.popup.title")}
              <strong className="require">&nbsp;*</strong>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.title}
              onChange={(e) => {
                setField("SET_TITLE", e.target.value);
              }}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("notify.popup.message")}
              <strong className="require">&nbsp;*</strong>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.message}
              onChange={(e) => {
                setField("SET_MESSAGE", e.target.value);
              }}
            />
          </InputBox.Body>
        </InputBox>

        <InputBox>
          <InputBox.Head>
            <InputBox.Title>{t("notify.popup.link")}</InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <TextField
              fullWidth
              value={state.link}
              onChange={(e) => {
                setField("SET_LINK", e.target.value);
              }}
            />
          </InputBox.Body>
        </InputBox>

        {/* <InputBox>
          <InputBox.Head>
            <InputBox.Title>
              {t("notify.popup.message_group")}
              <strong className="require">&nbsp;*</strong>
            </InputBox.Title>
          </InputBox.Head>
          <InputBox.Body>
            <FormControl
              sx={{ flexDirection: "row", gap: "10px", flexWrap: "wrap" }}
            >
              {[
                {
                  label: t("notify.popup.message_group_options.all"),
                  value: "all",
                },
                {
                  label: t("notify.popup.message_group_options.administrator"),
                  value: "admin",
                },
                {
                  label: t("notify.popup.message_group_options.customer"),
                  value: "customer",
                },
                {
                  label: t("notify.popup.message_group_options.client"),
                  value: "client",
                },
                {
                  label: t("notify.popup.message_group_options.guest"),
                  value: "guest",
                },
              ].map(({ label, value }) => {
                return (
                  <FormControlLabel
                    key={value}
                    value={value}
                    control={
                      <Checkbox
                        onChange={handleMessageGroup}
                        value={value}
                        checked={state.messageGroup.includes(value)}
                      />
                    }
                    label={label}
                  />
                );
              })}
            </FormControl>
          </InputBox.Body>
        </InputBox> */}
      </Stack>
    </Modal>
  );
}
