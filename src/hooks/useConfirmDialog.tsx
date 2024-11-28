import { useState } from "react";
import ConfirmDialog from "@/components/ConfirmDialog";

const useConfirmDialog = ({
  onYes,
  description,
}: {
  onYes: () => void;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen((prev) => !prev);
  };

  const renderConfirmModal = () => {
    return open ? (
      <ConfirmDialog onYes={onYes} onClose={toggle} text={description} />
    ) : null;
  };

  return {
    renderConfirmModal,
    toggle,
    open,
  };
};

export default useConfirmDialog;
