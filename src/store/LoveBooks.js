
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useLoveBooksStore = create(
  persist(
    (set, get) => ({
      loveBooks: [],
      addBook: (book) => {
        const exists = get().loveBooks.some(b => b.id === book.id);
        if (exists) return false; // لو موجود هيرجع false
        set({ loveBooks: [...get().loveBooks, book] });
        return true; // لو اتضاف هيرجع true
      },
      removeBook: (bookId) =>
        set({ loveBooks: get().loveBooks.filter(b => b.id !== bookId) }),
      clearBooks: () => set({ loveBooks: [] }),
    }),
    {
      name: "love-books-storage",
    }
  )
);