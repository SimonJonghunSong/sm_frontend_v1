import { ModelPkg } from "@/src/api/services/model/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ModelPkgState {
  data: Record<string, ModelPkg>;
}

interface ModelPkgAction {
  addData: (data: ModelPkg) => void;
  addDatas: (data: ModelPkg[]) => void;
  getIncludeUids: () => string[];
}

const useModelPkgStore = create(
  persist<ModelPkgState & ModelPkgAction>(
    (set, get) => ({
      data: {
        fcXYmMU: {
          uid: "fcXYmMU",
          dev_name: "ST47002",
          fw_ver: "1.1.0",
          model_pkg: "model_pkg",
        },
      },
      addData: (data) => set({ ...get().data, [data.uid]: data }),
      addDatas: (data) =>
        set({
          ...get().data,
          ...data.reduce((acc, cur) => {
            return { ...acc, [cur.uid]: cur };
          }, {}),
        }),
      getIncludeUids: () => Object.keys(get().data),
    }),
    {
      name: "ModelPkgStore",
    }
  )
);

export default useModelPkgStore;
