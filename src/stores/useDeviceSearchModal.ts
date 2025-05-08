import { create } from "zustand";

interface DeviceSearchModalState {
  isOpen: boolean;
}

interface DeviceSearchModalAction {
  onOpen: () => void;
  onClose: () => void;
}

const useDeviceSearchModalStore = create<
  DeviceSearchModalState & DeviceSearchModalAction
>((set, get) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export const handleDeviceSearchModalOpen =
  useDeviceSearchModalStore.getState().onOpen;
export const handleDeviceSearchModalClose =
  useDeviceSearchModalStore.getState().onClose;

export default useDeviceSearchModalStore;
