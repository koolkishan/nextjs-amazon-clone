import { create } from "zustand";
import {
  AuthSlice,
  createAuthSlice,
  CartSlice,
  createCartSlice,
  createOrdersSlice,
  OrdersSlice,
} from "./slices";

type StoreState = AuthSlice & CartSlice & OrdersSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createAuthSlice(...a),
  ...createCartSlice(...a),
  ...createOrdersSlice(...a),
}));
