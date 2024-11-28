import { ReactNode } from "react";
import { Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import Modal from "../Modal";

const ErrorDialog = ({
  onClose,
  text,
}: {
  onClose: () => void;
  text: ReactNode;
}) => {
  const t = useTranslations("common");

  return (
    <Modal
      open
      width={"357px"}
      toggleOpen={onClose}
      cancelButtonText="Ok"
      title={t("popup.error")}
    >
      <Stack>
        <span style={{ wordBreak: "keep-all" }}>{text}</span>
      </Stack>
    </Modal>
  );
};

export default ErrorDialog;
