import { create } from "zustand";
import {
  AuthSlice,
  createAuthSlice,
  CartSlice,
  createCartSlice,
  createOrdersSlice,
  OrdersSlice,
  ToastsSlice,
  createToastsSlice,
} from "./slices";

type StoreState = AuthSlice & CartSlice & OrdersSlice & ToastsSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
  ...createOrdersSlice(...a),
  ...createToastsSlice(...a),
}));
