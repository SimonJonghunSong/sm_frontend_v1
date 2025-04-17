import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModelInfoTabState {
  tab: string;
}

interface ModelInfoTabAction {
  setTab: (tab: string) => void;
  getTab: () => string;
}

const useModelInfoTabStore = create(
  persist<ModelInfoTabState & ModelInfoTabAction>(
    (set, get) => ({
      tab: "",
      setTab: (tab: string) => set({ tab }),
      getTab: () => get().tab,
    }),
    {
      name: "modelInfoTab",
    }
  )
);

export default useModelInfoTabStore;
