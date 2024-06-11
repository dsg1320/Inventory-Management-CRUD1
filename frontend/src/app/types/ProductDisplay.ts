import Product from "./product";

export interface ProductWithSupplier extends Product {
    supplierName: string;
  }