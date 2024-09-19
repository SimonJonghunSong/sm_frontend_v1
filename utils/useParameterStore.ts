import { create } from "zustand";

type ParameterStore = {
  hiddenParameter: boolean;
  toggleHiddenParameter: () => void;
};

const useParameterStore = create<ParameterStore>((set) => ({
  hiddenParameter: true,
  toggleHiddenParameter: () =>
    set((state) => ({ hiddenParameter: !state.hiddenParameter })),
}));

export default useParameterStore;
