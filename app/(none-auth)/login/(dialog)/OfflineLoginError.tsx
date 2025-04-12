import { useTranslations } from "next-intl";
import { Stack } from "@mui/material";
import Modal from "@/components/Modal";

const OfflineLoginErrorDialog = ({ onClose }: { onClose: () => void }) => {
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
          {t(
            "popup.login.login.an_initial_internet_connection_is_required_once_to_use_offline_mode"
          )}
        </span>
      </Stack>
    </Modal>
  );
};

export default OfflineLoginErrorDialog;
