export interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
  category: string;
  createdAt: string;
}

export type ProductCategory =
  | 'Groceries'
  | 'Beverages'
  | 'Dairy'
  | 'Snacks'
  | 'Household'
  | 'Personal Care';
