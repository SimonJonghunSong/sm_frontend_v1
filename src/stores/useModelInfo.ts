import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModelInfoState {
  modelName: string;
}

interface ModelInfoAction {
  setModelName: (modelName: string) => void;
  getModelName: () => string;
}

const useModelInfoStore = create(
  persist<ModelInfoState & ModelInfoAction>(
    (set, get) => ({
      modelName: "",
      setModelName: (modelName: string) => set({ modelName }),
      getModelName: () => get().modelName,
    }),
    {
      name: "modelInfo",
    }
  )
);

export default useModelInfoStore;
