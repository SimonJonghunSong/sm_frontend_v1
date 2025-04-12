import { create } from "zustand";
import { persist } from "zustand/middleware";

interface NetworkState {
  isOnline?: boolean;
  isSelfOffline?: boolean;
  setIsOnline: (online: boolean) => void;
  setIsSelfOffline: (online: boolean) => void;
  reset: () => void;
}

const useNetworkMonitor = create(
  persist<NetworkState>(
    (set) => ({
      isOnline: typeof window !== "undefined" ? navigator.onLine : undefined,
      isSelfOffline: false,
      setIsOnline: (onlineStatus) => set({ isOnline: onlineStatus }),
      setIsSelfOffline: (isSelfOffline) => set({ isSelfOffline }),
      reset: () =>
        set({
          isOnline:
            typeof window !== "undefined" ? navigator.onLine : undefined,
          isSelfOffline: false,
        }),
    }),
    {
      name: "network-monitor",
    }
  )
);

export default useNetworkMonitor;
