export type OrderStatus = 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled';

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  total: number;
}

export interface Order {
  id: string;
  items: OrderItem[];
  subtotal: number;
  total: number;
  status: OrderStatus;
  date: string;
  loyaltyPointsEarned: number;
}
