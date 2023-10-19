import { StateCreator } from "zustand";

export interface ToastsSlice {
  toasts: string[];
  setToast: (message: string) => void;
  clearToast: () => void;
}

export const createToastsSlice: StateCreator<ToastsSlice> = (set, get) => ({
  toasts: [],
  setToast: (message) => {
    const toasts = get().toasts;

    if (!toasts.includes(message)) {
      set({ toasts: [...toasts, message] });
    }
  },
  clearToast: () => set({ toasts: [] }),
});
