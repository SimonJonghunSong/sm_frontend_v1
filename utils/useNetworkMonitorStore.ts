import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NetworkState {
  isOnline?: boolean;
  setIsOnline: (online: boolean) => void;
}

const useNetworkMonitor = create(
  persist<NetworkState>(
    (set) => ({
      isOnline: undefined,
      setIsOnline: (onlineStatus) => set({ isOnline: onlineStatus }),
    }),
    {
      name: "network-monitor",
    }
  )
);

export default useNetworkMonitor;
