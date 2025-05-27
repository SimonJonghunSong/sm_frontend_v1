import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModelInfoState {
  modelName: string;
  fw_ver: string;
  target_country: string[];
}

interface ModelInfoAction {
  setModelName: (modelName: string) => void;
  getModelName: () => string;
  setFwVer: (fwVer: string) => void;
  getFwVer: () => string;
  setTargetCountry: (targetCountry: string[]) => void;
  getTargetCountry: () => string[];
}

const useModelInfoStore = create(
  persist<ModelInfoState & ModelInfoAction>(
    (set, get) => ({
      modelName: "",
      fw_ver: "",
      target_country: [],
      setModelName: (modelName: string) => set({ modelName }),
      getModelName: () => get().modelName,
      setFwVer: (fwVer: string) => set({ fw_ver: fwVer }),
      getFwVer: () => get().fw_ver,
      setTargetCountry: (targetCountry: string[]) =>
        set({ target_country: targetCountry }),
      getTargetCountry: () => get().target_country,
    }),
    {
      name: "modelInfo",
    }
  )
);

export default useModelInfoStore;
