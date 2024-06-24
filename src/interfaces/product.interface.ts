import { Author } from "./author.interface";
import { Price } from "./price.interface";

export interface Product {
  id: string;
  title: string;
  price: Price;
  picture: string;
  condition: string;
  free_shipping: boolean;
  seller?: string;
  sold_quantity?: number;
  description?: string;
  path_from_root?: string[];
}

export interface GetProductsResponse {
  author: Author;
  categories: string[];
  items: Product[];
}

export interface GetProductByIdResponse {
  author: Author;
  item: Product;
}

export interface GetProductsParams {
  q: string;
}