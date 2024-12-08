import React, { useState } from "react";
import { Box, Stack, TextField } from "@mui/material";
import Modal from "../Modal";
import { useMutation } from "@tanstack/react-query";
import { createNoti } from "@/src/api/services/notification";

interface CreateNotiModalProps {
  onClose: () => void;
}

const CreateNotiModal = ({ onClose }: CreateNotiModalProps) => {
  const [title, setTitle] = useState<string>();
  const [msg, setMessage] = useState<string>();
  const [link, setLink] = useState<string>();

  const mutate = useMutation({
    mutationFn: createNoti,
    onSuccess: () => {
      onClose();
    },
  });

  const handleCreateNoti = () => {
    mutate.mutate({
      title,
      message: msg,
      link,
    });
  };

  return (
    <>
      <Modal
        open
        toggleOpen={onClose}
        width="500px"
        title="Notification 추가"
        confirmButtonText="Send"
        confirm={handleCreateNoti}
      >
        <Stack gap={2}>
          <Stack gap={1}>
            <p>제목</p>
            <TextField
              value={title}
              onChange={(e) => {
                const { value } = e.target;
                setTitle(value);
              }}
              fullWidth
            />
          </Stack>
          <Stack gap={1}>
            <p>메시지</p>
            <TextField
              value={msg}
              onChange={(e) => {
                const { value } = e.target;
                setMessage(value);
              }}
              fullWidth
            />
          </Stack>
          <Stack gap={1}>
            <p>링크</p>
            <TextField
              value={link}
              onChange={(e) => {
                const { value } = e.target;
                setLink(value);
              }}
              fullWidth
            />
          </Stack>
        </Stack>
      </Modal>
    </>
  );
};

export default CreateNotiModal;
