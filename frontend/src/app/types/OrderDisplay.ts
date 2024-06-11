import Orders from "./orders";
export interface OrderDisplay extends Orders {
    supplierName: string;
    productName: string;
  }
