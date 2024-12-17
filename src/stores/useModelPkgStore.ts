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
  setData: (data: Record<string, ModelPkg>) => void;
  resetData: () => void;
}

const useModelPkgStore = create(
  persist<ModelPkgState & ModelPkgAction>(
    (set, get) => ({
      data: {},
      addData: (data) => set({ data: { ...get().data, [data.uid]: data } }),
      addDatas: (data) =>
        set({
          data: {
            ...get().data,
            ...data.reduce((acc, cur) => {
              return { ...acc, [cur.uid]: cur };
            }, {}),
          },
        }),
      getIncludeUids: () => Object.keys(get().data),
      setData: (data: Record<string, ModelPkg>) => set({ data }),
      resetData: () => set({ data: {} }),
    }),
    {
      name: "ModelPkgStore",
    }
  )
);

export default useModelPkgStore;
