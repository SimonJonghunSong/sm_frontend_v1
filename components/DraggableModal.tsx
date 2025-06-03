import React, { useState } from "react";
import Draggable from "react-draggable";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Paper,
  PaperProps,
  IconButton,
} from "@mui/material";
import RemoveIcon from "@mui/icons-material/Remove";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import maximizeIcon from "/public/images/maximize-icon.png";
import Image from "next/image";

type ModalProps = {
  title?: string;
  children?: React.ReactNode;
  open: boolean;
  toggleOpen: () => void;
  width: string;
};

function PaperComponent(props: PaperProps) {
  return (
    <Draggable
      handle="#draggable-dialog-title" // 헤더만 드래그 가능
      cancel={
        '[class*="MuiDialogContent-root"],[class*="MuiDialogActions-root"]'
      }
    >
      <Paper {...props} />
    </Draggable>
  );
}

export default function DraggableModal({
  title,
  open,
  toggleOpen,
  children,
  width,
}: ModalProps) {
  const [isMinimize, setIsMinimize] = useState(false);

  const handleMinimize = () => {
    setIsMinimize(true);
  };

  const handleMaxmize = () => {
    setIsMinimize(false);
  };

  const handleClose = (_e, reason) =>
    reason !== "backdropClick" && open && toggleOpen();

  return (
    <>
      <Dialog
        hideBackdrop
        disableScrollLock
        disableEnforceFocus
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
        sx={{
          width: "fit-content",
          margin: "0 auto",
          height: "fit-content",
          "& .MuiDialog-paper": {
            width,
          },
        }}
      >
        <DialogTitle sx={{ cursor: "move" }} id="draggable-dialog-title">
          {title}
        </DialogTitle>

        <IconButton
          onClick={isMinimize ? handleMaxmize : handleMinimize}
          sx={{
            position: "absolute",
            right: "38px",
            top: "6px",
            zIndex: 30,
          }}
        >
          {isMinimize ? (
            <Image
              src={maximizeIcon}
              alt="maximizeIcon"
              width={24}
              height={24}
              style={{ display: "block", width: "24px%", height: "24px" }}
            />
          ) : (
            <RemoveIcon sx={{ color: "var(--black)" }} />
          )}
        </IconButton>

        <IconButton
          onClick={() => {
            toggleOpen();
          }}
          sx={{
            position: "absolute",
            right: "6px",
            top: "6px",
            zIndex: 30,
          }}
        >
          <CloseOutlinedIcon sx={{ color: "var(--black)" }} />
        </IconButton>

        {isMinimize ? null : <DialogContent>{children}</DialogContent>}
      </Dialog>
    </>
  );
}
