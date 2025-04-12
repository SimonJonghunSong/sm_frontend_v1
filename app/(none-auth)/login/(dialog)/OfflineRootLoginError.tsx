import { useTranslations } from "next-intl";
import { Stack } from "@mui/material";
import Modal from "@/components/Modal";

const OfflineRootLoginErrorDialog = ({ onClose }: { onClose: () => void }) => {
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
            "popup.login.login.the_root_account_can_only_be_used_in_online_mode"
          )}
        </span>
      </Stack>
    </Modal>
  );
};

export default OfflineRootLoginErrorDialog;
