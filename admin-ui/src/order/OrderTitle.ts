import { Order as TOrder } from "../api/order/Order";

export const ORDER_TITLE_FIELD = "paymentIntent";

export const OrderTitle = (record: TOrder): string => {
  return record.paymentIntent?.toString() || String(record.id);
};
