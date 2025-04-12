import { useTranslations } from "next-intl";
import { Stack } from "@mui/material";
import Modal from "@/components/Modal";

const ErrorDialog = ({ onClose }: { onClose: () => void }) => {
  const t = useTranslations();
  return (
    <Modal
      width={"357px"}
      toggleOpen={onClose}
      open
      cancelButtonText="Ok"
      title={t("common.popup.error")}
    >
      <Stack>
        <span style={{ wordBreak: "keep-all" }}>
          {t("popup.login.login.invalid_country_or_id_or_password")}
        </span>
      </Stack>
    </Modal>
  );
};

export default ErrorDialog;
