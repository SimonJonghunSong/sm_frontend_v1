import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import RemoveIcon from "@mui/icons-material/Remove";
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
  hasMinimize?: boolean;
  hasFooter?: boolean;
  disableScrollLock?: boolean;
};

export default function Modal({
  closeButton = true,
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
  hasMinimize = false,
  hasFooter = true,
  disableScrollLock = false,
}: ModalProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isMinimize, setIsMinimize] = useState(false);
  const onClose = (_e, reason) =>
    reason !== "backdropClick" && open && toggleOpen();

  const handleMinimize = () => {
    setIsMinimize(true);
  };

  const handleMaxmize = () => {
    setIsMinimize(false);
  };

  return (
    <Draggable
      onDrag={(e) => e.preventDefault()}
      disabled={!isDraggable}
      cancel={"[id*='prevent_drag']"}
    >
      <Dialog
        ref={ref}
        hideBackdrop={hideBackdrop}
        className={className}
        open={open}
        onClose={onClose}
        disableScrollLock={disableScrollLock}
        fullWidth
        maxWidth={"sm"}
        sx={{
          width: isMinimize ? "400px" : "100%",
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
          <>
            {hasMinimize && (
              <IconButton
                onClick={isMinimize ? handleMaxmize : handleMinimize}
                sx={{
                  position: "absolute",
                  right: "38px",
                  top: "6px",
                  zIndex: 30,
                }}
              >
                <RemoveIcon sx={{ color: "var(--black)" }} />
              </IconButton>
            )}

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
          </>
        )}
        <DialogContent
          sx={{
            lineHeight: 1.6,
            height: isMinimize ? "60px" : "auto",
            overflow: isMinimize ? "hidden" : "auto",
          }}
        >
          {children}
        </DialogContent>

        {isMinimize || !hasFooter ? null : (
          <>
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
                sx={{
                  width: 80,
                  height: 32,
                  fontSize: 13,
                  background: disabled
                    ? "#0000001f"
                    : "var(--primary-gradient)",
                }}
                onClick={() => {
                  confirm && confirm();
                  !manualToggleOpenWhenConfirm && toggleOpen();
                }}
              >
                {confirm ? confirmButtonText : "Ok"}
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Draggable>
  );
}
