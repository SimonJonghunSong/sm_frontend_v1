import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SerialConfigurationState {
  imei: string | null;
  tab: string | null;
  setImei: (imei: string) => void;
  setTab: (tab: string) => void;
  resetImei: () => void;
  resetTab: () => void;
  getTab: () => string | null;
  getCurrentImei: () => string | null;
}

const useSerialConfigurationStore = create(
  persist<SerialConfigurationState>(
    (set, get) => ({
      imei: null,
      tab: null,
      setImei: (imei) => set({ imei }),
      setTab: (tab) => set({ tab }),
      resetImei: () => set({ imei: null }),
      resetTab: () => set({ tab: null }),
      getTab: () => get().tab,
      getCurrentImei: () => get().imei,
    }),
    {
      name: "serialConfigurationStore",
    }
  )
);

export default useSerialConfigurationStore;
