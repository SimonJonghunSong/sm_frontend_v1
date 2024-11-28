import ErrorDialog from "@/components/ErrorDialog";
import { useState } from "react";

const useErrorDialog = ({ description }: { description: string }) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  const renderErrorModal = () => {
    return open ? <ErrorDialog onClose={toggle} text={description} /> : null;
  };

  return {
    renderErrorModal,
    toggle,
    open,
  };
};

export default useErrorDialog;
