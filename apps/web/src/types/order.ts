import type { CartItem } from './cart';

export type OrderStatus = 'completed' | 'pending' | 'refunded' | 'cancelled';
export type PaymentMethod = 'cash' | 'card' | 'mobile';

export interface Order {
  id: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  paymentMethod: PaymentMethod;
  customerId?: string;
  customerName?: string;
  cashierName: string;
  createdAt: string;
}

export interface CreateOrderPayload {
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  paymentMethod: PaymentMethod;
  customerId?: string;
  customerName?: string;
  cashierName: string;
}
