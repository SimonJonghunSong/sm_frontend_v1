import { useState } from "react";
import Draggable from "react-draggable";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

type ModalProps = {
  closeButton?: boolean;
  title?: string;
  children?: React.ReactNode;
  confirm?(): void;
  confirmButtonText?: string;
  cancelButtonText?: string;
  open: boolean;
  toggleOpen: () => void;
  width: string;
  disabled?: boolean;
  manualToggleOpenWhenConfirm?: boolean;
  className?: string;
  isDraggable?: boolean;
  hideBackdrop?: boolean;
};

export default function Modal({
  closeButton = false,
  children,
  confirm,
  confirmButtonText = "Ok",
  cancelButtonText = "Cancel",
  title,
  open,
  toggleOpen,
  width,
  disabled,
  manualToggleOpenWhenConfirm,
  className,
  isDraggable = false,
  hideBackdrop = false,
}: ModalProps) {
  const onClose = (_e, reason) =>
    reason !== "backdropClick" && open && toggleOpen();

  return (
    <Draggable
      onDrag={(e) => e.preventDefault()}
      cancel=".className"
      onStart={() => console.log("dragStart")}
      disabled={!isDraggable}
    >
      <Dialog
        hideBackdrop={hideBackdrop}
        className={className}
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth={"sm"}
        sx={{
          "& .MuiDialog-paper": {
            width,
          },
        }}
      >
        {title && (
          <DialogTitle
            sx={{
              position: "relative",
            }}
          >
            <span>{title}</span>
          </DialogTitle>
        )}
        {closeButton && (
          <IconButton
            onClick={toggleOpen}
            sx={{
              position: "absolute",
              right: "6px",
              top: "6px",
              zIndex: 30,
            }}
          >
            <CloseOutlinedIcon sx={{ color: "var(--black)" }} />
          </IconButton>
        )}
        <DialogContent sx={{ lineHeight: 1.6 }}>{children}</DialogContent>
        {!closeButton && (
          <DialogActions>
            {!!confirm && (
              <Button
                variant="outlined"
                sx={{ width: 80, height: 32, fontSize: 13 }}
                onClick={toggleOpen}
              >
                {cancelButtonText}
              </Button>
            )}
            <Button
              variant="contained"
              disabled={disabled}
              sx={{ width: 80, height: 32, fontSize: 13 }}
              onClick={() => {
                confirm && confirm();
                !manualToggleOpenWhenConfirm && toggleOpen();
              }}
            >
              {confirm ? confirmButtonText : "Ok"}
            </Button>
          </DialogActions>
        )}
      </Dialog>
    </Draggable>
  );
}
