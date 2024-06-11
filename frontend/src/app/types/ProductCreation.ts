import Product from "./product";

export type ProductCreation = Omit<Product, 'Prod_ID'>;
