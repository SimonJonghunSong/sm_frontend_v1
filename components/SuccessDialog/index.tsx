import { ReactNode, useEffect } from "react";
import { Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import Modal from "../Modal";

const SuccessDialog = ({
  onClose,
  text,
}: {
  onClose: () => void;
  text: ReactNode;
}) => {
  const t = useTranslations("common");

  useEffect(() => {
    const handle = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handle);
    return () => {
      document.removeEventListener("keydown", handle);
    };
  }, []);

  return (
    <Modal
      open
      width={"357px"}
      toggleOpen={onClose}
      cancelButtonText="Ok"
      closeButton
      title={t("popup.success")}
    >
      <Stack>
        <span style={{ wordBreak: "keep-all" }}>{text}</span>
      </Stack>
    </Modal>
  );
};

export default SuccessDialog;
