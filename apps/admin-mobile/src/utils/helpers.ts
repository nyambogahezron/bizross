import { OrderStatusColors, StockLevels } from "@/constants/colors";
import type { OrderStatus } from "@/types/order";

/**
 * Format a number as currency (KSH)
 */
export function formatCurrency(amount: number): string {
	return `KSH ${amount.toLocaleString("en-US", {
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})}`;
}

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	});
}

/**
 * Format a date string for display with time
 */
export function formatDateTime(dateString: string): string {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-US", {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
}

/**
 * Get stock level info based on quantity
 */
export function getStockLevel(stock: number) {
	if (stock <= StockLevels.critical.max) return StockLevels.critical;
	if (stock <= StockLevels.low.max) return StockLevels.low;
	return StockLevels.good;
}

/**
 * Get order status color scheme
 */
export function getOrderStatusColor(status: OrderStatus) {
	return OrderStatusColors[status] ?? OrderStatusColors.pending;
}

/**
 * Generate a simple unique ID
 */
export function generateId(): string {
	return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
	if (text.length <= maxLength) return text;
	return `${text.slice(0, maxLength)}...`;
}
