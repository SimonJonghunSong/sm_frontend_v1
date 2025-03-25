import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModelInfoState {
  modelName: string;
  fw_ver: string;
}

interface ModelInfoAction {
  setModelName: (modelName: string) => void;
  getModelName: () => string;
  setFwVer: (fwVer: string) => void;
  getFwVer: () => string;
}

const useModelInfoStore = create(
  persist<ModelInfoState & ModelInfoAction>(
    (set, get) => ({
      modelName: "",
      fw_ver: "",
      setModelName: (modelName: string) => set({ modelName }),
      getModelName: () => get().modelName,
      setFwVer: (fwVer: string) => set({ fw_ver: fwVer }),
      getFwVer: () => get().fw_ver,
    }),
    {
      name: "modelInfo",
    }
  )
);

export default useModelInfoStore;
