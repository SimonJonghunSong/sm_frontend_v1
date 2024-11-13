import { create } from "zustand";

interface GlobalLoadingState {
  isLoading: boolean;
}

interface GlobalLoadingAction {
  onLoading: () => void;
  offLoading: () => void;
}

const useGlobalLoadingStore = create<GlobalLoadingState & GlobalLoadingAction>(
  (set, get) => ({
    isLoading: false,
    onLoading: () => set({ isLoading: true }),
    offLoading: () => set({ isLoading: false }),
  })
);

export const handleGlobalLoadingOn = useGlobalLoadingStore.getState().onLoading;
export const handleGlobalLoadingOff =
  useGlobalLoadingStore.getState().offLoading;

export default useGlobalLoadingStore;
