import { create } from "zustand";

export const useLoaderStore = create((set) => ({
  loading: false,
  setLoading: (value) => set({ loading: value }),
}));