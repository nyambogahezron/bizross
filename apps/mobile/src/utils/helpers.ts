import { OrderStatusColors } from '@/constants/colors';
import type { OrderStatus } from '@/types/order';

export function formatCurrency(amount: number): string {
  return `KSH ${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export function formatDateTime(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

export function getOrderStatusColor(status: OrderStatus) {
  return OrderStatusColors[status] ?? OrderStatusColors.confirmed;
}

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
