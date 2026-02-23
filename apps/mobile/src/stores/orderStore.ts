import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";
import type { Order } from "@/types/order";
import { generateId } from "@/utils/helpers";

interface OrderState {
	orders: Order[];
	placeOrder: (items: CartItem[]) => Order;
}

const sampleOrders: Order[] = [
	{
		id: "ORD-1001",
		items: [
			{
				productId: "2",
				name: "Bread (White Loaf)",
				price: 65,
				quantity: 2,
				total: 130,
			},
			{
				productId: "3",
				name: "Fresh Milk (500ml)",
				price: 70,
				quantity: 1,
				total: 70,
			},
		],
		subtotal: 200,
		total: 200,
		status: "completed",
		date: "2026-02-22T09:30:00",
		loyaltyPointsEarned: 20,
	},
	{
		id: "ORD-1002",
		items: [
			{
				productId: "9",
				name: "Tea Leaves (250g)",
				price: 220,
				quantity: 1,
				total: 220,
			},
			{
				productId: "1",
				name: "White Sugar (1kg)",
				price: 180,
				quantity: 1,
				total: 180,
			},
			{
				productId: "7",
				name: "Eggs (Tray of 30)",
				price: 480,
				quantity: 1,
				total: 480,
			},
		],
		subtotal: 880,
		total: 880,
		status: "completed",
		date: "2026-02-21T14:15:00",
		loyaltyPointsEarned: 88,
	},
	{
		id: "ORD-1003",
		items: [
			{
				productId: "17",
				name: "Coffee (100g)",
				price: 450,
				quantity: 1,
				total: 450,
			},
			{
				productId: "20",
				name: "Chocolate Bar",
				price: 100,
				quantity: 3,
				total: 300,
			},
		],
		subtotal: 750,
		total: 750,
		status: "preparing",
		date: "2026-02-23T11:00:00",
		loyaltyPointsEarned: 75,
	},
];

export const useOrderStore = create<OrderState>()(
	persist(
		(set, get) => ({
			orders: sampleOrders,

			placeOrder: (items) => {
				const subtotal = items.reduce(
					(sum, i) => sum + i.price * i.quantity,
					0,
				);
				const newOrder: Order = {
					id: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
					items: items.map((i) => ({
						productId: i.productId,
						name: i.name,
						price: i.price,
						quantity: i.quantity,
						total: i.price * i.quantity,
					})),
					subtotal,
					total: subtotal,
					status: "confirmed",
					date: new Date().toISOString(),
					loyaltyPointsEarned: Math.floor(subtotal / 10),
				};
				set((state) => ({ orders: [newOrder, ...state.orders] }));
				return newOrder;
			},
		}),
		{
			name: "bizross-customer-orders",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
