export type ProductCategory =
  | 'All'
  | 'Food & Beverage'
  | 'Household'
  | 'Personal Care'
  | 'Electronics'
  | 'Stationery';

export interface Product {
  id: string;
  name: string;
  price: number;
  sku: string;
  stock: number;
  category: Exclude<ProductCategory, 'All'>;
  image?: string;
  lowStockThreshold: number;
  createdAt: string;
}

export interface ProductFormData {
  name: string;
  price: number;
  sku: string;
  stock: number;
  category: Exclude<ProductCategory, 'All'>;
  lowStockThreshold: number;
}
