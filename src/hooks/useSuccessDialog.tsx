import { useState } from "react";
import SuccessDialog from "@/components/SuccessDialog";

const useSuccessDialog = ({ description }: { description: string }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  const renderSuccessModal = () => {
    return open ? <SuccessDialog onClose={toggle} text={description} /> : null;
  };

  return {
    renderSuccessModal,
    toggle,
    open,
  };
};

export default useSuccessDialog;
