export type ProductCategory =
  | 'Groceries'
  | 'Beverages'
  | 'Dairy'
  | 'Snacks'
  | 'Household'
  | 'Personal Care';

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: ProductCategory;
  image: string;
  rating: number;
  inStock: boolean;
}
