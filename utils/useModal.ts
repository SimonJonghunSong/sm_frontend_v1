import { useState } from "react";

const useModal = (): [boolean, () => void] => {
  const [open, setOpen] = useState<boolean>(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return [open, toggleOpen];
};

export default useModal;
