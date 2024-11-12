import { create } from "zustand";
import { persist } from "zustand/middleware";

type Lang = "en" | "pt" | "es";

interface langState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

const useLangStore = create(
  persist<langState>(
    (set) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
    }),
    {
      name: "languageStore",
    }
  )
);

export default useLangStore;
