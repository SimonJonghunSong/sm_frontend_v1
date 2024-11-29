import { useTranslations } from "next-intl";
import Modal from "../Modal";

const ConfirmDialog = ({
  onClose,
  onYes,
  text,
}: {
  onYes: () => void;
  onClose: () => void;
  text: string;
}) => {
  const t = useTranslations();

  return (
    <Modal
      open
      width={"357px"}
      title={t("common.popup.confrim")}
      confirmButtonText={t("common.popup.yes")}
      confirm={() => {
        onYes();
      }}
      closeButton
      toggleOpen={() => {
        onClose();
      }}
    >
      {text}
    </Modal>
  );
};
export default ConfirmDialog;
