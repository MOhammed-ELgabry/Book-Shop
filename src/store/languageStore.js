import { create } from "zustand";

export const useLanguageStore = create((set) => ({
  lang: localStorage.getItem("lang") || "en",

  setLang: (lang) => {
    localStorage.setItem("lang", lang);
    set({ lang });
  },

  toggleLang: () =>
    set((state) => {
      const newLang = state.lang === "en" ? "ar" : "en";
      localStorage.setItem("lang", newLang);
      return { lang: newLang };
    }),
}));