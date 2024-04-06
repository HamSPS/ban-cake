import { Product } from "./product.interface";

export interface Order {
  id?:           number;
  docNo?: string;
  customerName?: string;
  tel?:          string;
  address?:      string;
  sendDate?:     Date;
  actualDate?:   null;
  user?:         null;
  status?:       number;
  createdAt?:    Date;
  updatedAt?:    Date;
  details?:      Detail[];
}

export interface Detail {
  id?:       number;
  cost?:     number;
  price?:    number;
  quantity?: number;
  product?:  Product;
}

