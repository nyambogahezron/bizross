import type { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  taxRate: number;
}

export interface CartTotals {
  subtotal: number;
  tax: number;
  total: number;
  itemCount: number;
}
