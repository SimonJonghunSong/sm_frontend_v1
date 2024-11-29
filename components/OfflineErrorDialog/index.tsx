import Modal from "@/components/Modal";
import { Stack } from "@mui/material";
import { useTranslations } from "next-intl";

export default function OfflineErrorDialog({
  onClose,
}: {
  onClose: () => void;
}) {
  const t = useTranslations();
  return (
    <Modal
      width={"357px"}
      toggleOpen={onClose}
      open
      cancelButtonText="Ok"
      title={t("common.popup.error")}
      closeButton
    >
      <Stack>
        <span style={{ wordBreak: "keep-all" }}>
          {t("popup.common.common.internet_connection_is_required")}
        </span>
      </Stack>
    </Modal>
  );
}
