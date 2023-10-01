import { StateCreator } from "zustand";

export interface OrdersSlice {
  ordersInfo: undefined | any;
  setOrdersInfo: (ordersInfo: any) => void;
}

export const createOrdersSlice: StateCreator<OrdersSlice> = (set, get) => ({
  ordersInfo: undefined,
  setOrdersInfo: (ordersInfo) => {
    set({ ordersInfo });
  },
});
