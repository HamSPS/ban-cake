import { Product } from "./product.interface";

export interface Cart {
  product?: Product;
  cost?:      number;
  price?:     number;
  quantity?:  number;
}
