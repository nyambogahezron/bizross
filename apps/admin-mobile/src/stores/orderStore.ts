import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Order } from "@/types/order";

interface OrderState {
	orders: Order[];
}

const initialOrders: Order[] = [
	{
		id: "ORD-001",
		customerName: "Jane Muthoni",
		date: "2026-02-23T10:30:00",
		status: "completed",
		total: 775,
		items: [
			{
				productId: "1",
				productName: "White Sugar (1kg)",
				quantity: 2,
				unitPrice: 180,
				total: 360,
			},
			{
				productId: "2",
				productName: "Bread (White)",
				quantity: 1,
				unitPrice: 65,
				total: 65,
			},
			{
				productId: "4",
				productName: "Cooking Oil (1L)",
				quantity: 1,
				unitPrice: 350,
				total: 350,
			},
		],
	},
	{
		id: "ORD-002",
		customerName: "Peter Kamau",
		date: "2026-02-23T11:15:00",
		status: "completed",
		total: 550,
		items: [
			{
				productId: "6",
				productName: "Rice (2kg)",
				quantity: 1,
				unitPrice: 280,
				total: 280,
			},
			{
				productId: "3",
				productName: "Fresh Milk (500ml)",
				quantity: 2,
				unitPrice: 70,
				total: 140,
			},
			{
				productId: "5",
				productName: "Soda (500ml)",
				quantity: 1,
				unitPrice: 60,
				total: 60,
			},
			{
				productId: "3",
				productName: "Fresh Milk (500ml)",
				quantity: 1,
				unitPrice: 70,
				total: 70,
			},
		],
	},
	{
		id: "ORD-003",
		customerName: "Mary Wanjiku",
		date: "2026-02-23T12:00:00",
		status: "processing",
		total: 1250,
		items: [
			{
				productId: "7",
				productName: "Eggs (Tray of 30)",
				quantity: 2,
				unitPrice: 480,
				total: 960,
			},
			{
				productId: "10",
				productName: "Butter (250g)",
				quantity: 1,
				unitPrice: 320,
				total: 290,
			},
		],
	},
	{
		id: "ORD-004",
		customerName: "David Ochieng",
		date: "2026-02-23T14:20:00",
		status: "pending",
		total: 415,
		items: [
			{
				productId: "9",
				productName: "Tea Leaves (250g)",
				quantity: 1,
				unitPrice: 220,
				total: 220,
			},
			{
				productId: "11",
				productName: "Toothpaste",
				quantity: 1,
				unitPrice: 150,
				total: 150,
			},
			{
				productId: "8",
				productName: "Washing Soap",
				quantity: 1,
				unitPrice: 45,
				total: 45,
			},
		],
	},
	{
		id: "ORD-005",
		customerName: "Sarah Akinyi",
		date: "2026-02-22T09:45:00",
		status: "completed",
		total: 630,
		items: [
			{
				productId: "1",
				productName: "White Sugar (1kg)",
				quantity: 1,
				unitPrice: 180,
				total: 180,
			},
			{
				productId: "4",
				productName: "Cooking Oil (1L)",
				quantity: 1,
				unitPrice: 350,
				total: 350,
			},
			{
				productId: "12",
				productName: "Biscuits (Pack)",
				quantity: 2,
				unitPrice: 50,
				total: 100,
			},
		],
	},
	{
		id: "ORD-006",
		customerName: "John Kiprop",
		date: "2026-02-22T15:30:00",
		status: "cancelled",
		total: 280,
		items: [
			{
				productId: "6",
				productName: "Rice (2kg)",
				quantity: 1,
				unitPrice: 280,
				total: 280,
			},
		],
	},
	{
		id: "ORD-007",
		customerName: "Grace Njeri",
		date: "2026-02-21T11:00:00",
		status: "completed",
		total: 895,
		items: [
			{
				productId: "2",
				productName: "Bread (White)",
				quantity: 2,
				unitPrice: 65,
				total: 130,
			},
			{
				productId: "3",
				productName: "Fresh Milk (500ml)",
				quantity: 3,
				unitPrice: 70,
				total: 210,
			},
			{
				productId: "10",
				productName: "Butter (250g)",
				quantity: 1,
				unitPrice: 320,
				total: 320,
			},
			{
				productId: "9",
				productName: "Tea Leaves (250g)",
				quantity: 1,
				unitPrice: 220,
				total: 235,
			},
		],
	},
	{
		id: "ORD-008",
		customerName: "Jane Muthoni",
		date: "2026-02-21T16:45:00",
		status: "completed",
		total: 345,
		items: [
			{
				productId: "1",
				productName: "White Sugar (1kg)",
				quantity: 1,
				unitPrice: 180,
				total: 180,
			},
			{
				productId: "2",
				productName: "Bread (White)",
				quantity: 1,
				unitPrice: 65,
				total: 65,
			},
			{
				productId: "12",
				productName: "Biscuits (Pack)",
				quantity: 2,
				unitPrice: 50,
				total: 100,
			},
		],
	},
];

export const useOrderStore = create<OrderState>()(
	persist(
		() => ({
			orders: initialOrders,
		}),
		{
			name: "bizross-orders",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
