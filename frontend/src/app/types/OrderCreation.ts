import Orders from "./orders";

export type OrderCreation = Omit<Orders, 'Order_id'>;