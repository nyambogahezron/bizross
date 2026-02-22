"use client";

import { create } from "zustand";
import { DUMMY_ORDERS } from "@/lib/dummy-data";
import { generateId, generateOrderNumber } from "@/lib/utils";
import type { CreateOrderPayload, Order, OrderStatus } from "@/types/order";

interface OrderStore {
	orders: Order[];
	// Actions
	createOrder: (payload: CreateOrderPayload) => Order;
	updateOrderStatus: (id: string, status: OrderStatus) => void;
	getOrderById: (id: string) => Order | undefined;
	// Computed
	getTodayOrders: () => Order[];
	getTodayRevenue: () => number;
}

export const useOrderStore = create<OrderStore>()((set, get) => ({
	orders: DUMMY_ORDERS,

	createOrder: (payload: CreateOrderPayload) => {
		const order: Order = {
			...payload,
			id: generateId(),
			orderNumber: generateOrderNumber(),
			status: "completed",
			createdAt: new Date().toISOString(),
		};
		set((state) => ({ orders: [order, ...state.orders] }));
		return order;
	},

	updateOrderStatus: (id: string, status: OrderStatus) => {
		set((state) => ({
			orders: state.orders.map((o) => (o.id === id ? { ...o, status } : o)),
		}));
	},

	getOrderById: (id: string) => {
		return get().orders.find((o) => o.id === id);
	},

	getTodayOrders: () => {
		const today = new Date().toDateString();
		return get().orders.filter(
			(o) => new Date(o.createdAt).toDateString() === today,
		);
	},

	getTodayRevenue: () => {
		return get()
			.getTodayOrders()
			.filter((o) => o.status === "completed")
			.reduce((sum, o) => sum + o.total, 0);
	},
}));
