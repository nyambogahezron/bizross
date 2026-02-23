import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Product } from "@/types/product";
import { generateId } from "@/utils/helpers";

interface ProductState {
	products: Product[];
	searchQuery: string;
	setSearchQuery: (query: string) => void;
	addProduct: (product: Omit<Product, "id" | "createdAt">) => void;
	updateProduct: (id: string, updates: Partial<Product>) => void;
	deleteProduct: (id: string) => void;
	adjustStock: (id: string, quantity: number) => void;
}

const initialProducts: Product[] = [
	{
		id: "1",
		name: "White Sugar (1kg)",
		price: 180,
		sku: "SUG-001",
		stock: 45,
		category: "Groceries",
		createdAt: "2025-01-15",
	},
	{
		id: "2",
		name: "Bread (White)",
		price: 65,
		sku: "BRD-001",
		stock: 12,
		category: "Groceries",
		createdAt: "2025-01-15",
	},
	{
		id: "3",
		name: "Fresh Milk (500ml)",
		price: 70,
		sku: "MLK-001",
		stock: 8,
		category: "Dairy",
		createdAt: "2025-01-16",
	},
	{
		id: "4",
		name: "Cooking Oil (1L)",
		price: 350,
		sku: "OIL-001",
		stock: 3,
		category: "Groceries",
		createdAt: "2025-01-16",
	},
	{
		id: "5",
		name: "Soda (500ml)",
		price: 60,
		sku: "SDR-001",
		stock: 32,
		category: "Beverages",
		createdAt: "2025-01-17",
	},
	{
		id: "6",
		name: "Rice (2kg)",
		price: 280,
		sku: "RIC-001",
		stock: 18,
		category: "Groceries",
		createdAt: "2025-01-17",
	},
	{
		id: "7",
		name: "Eggs (Tray of 30)",
		price: 480,
		sku: "EGG-001",
		stock: 2,
		category: "Dairy",
		createdAt: "2025-01-18",
	},
	{
		id: "8",
		name: "Washing Soap",
		price: 45,
		sku: "SOP-001",
		stock: 56,
		category: "Household",
		createdAt: "2025-01-18",
	},
	{
		id: "9",
		name: "Tea Leaves (250g)",
		price: 220,
		sku: "TEA-001",
		stock: 15,
		category: "Beverages",
		createdAt: "2025-01-19",
	},
	{
		id: "10",
		name: "Butter (250g)",
		price: 320,
		sku: "BTR-001",
		stock: 4,
		category: "Dairy",
		createdAt: "2025-01-19",
	},
	{
		id: "11",
		name: "Toothpaste",
		price: 150,
		sku: "TPT-001",
		stock: 22,
		category: "Personal Care",
		createdAt: "2025-01-20",
	},
	{
		id: "12",
		name: "Biscuits (Pack)",
		price: 50,
		sku: "BSC-001",
		stock: 0,
		category: "Snacks",
		createdAt: "2025-01-20",
	},
];

export const useProductStore = create<ProductState>()(
	persist(
		(set) => ({
			products: initialProducts,
			searchQuery: "",

			setSearchQuery: (query) => set({ searchQuery: query }),

			addProduct: (product) =>
				set((state) => ({
					products: [
						...state.products,
						{
							...product,
							id: generateId(),
							createdAt: new Date().toISOString(),
						},
					],
				})),

			updateProduct: (id, updates) =>
				set((state) => ({
					products: state.products.map((p) =>
						p.id === id ? { ...p, ...updates } : p,
					),
				})),

			deleteProduct: (id) =>
				set((state) => ({
					products: state.products.filter((p) => p.id !== id),
				})),

			adjustStock: (id, quantity) =>
				set((state) => ({
					products: state.products.map((p) =>
						p.id === id ? { ...p, stock: Math.max(0, p.stock + quantity) } : p,
					),
				})),
		}),
		{
			name: "bizross-products",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
