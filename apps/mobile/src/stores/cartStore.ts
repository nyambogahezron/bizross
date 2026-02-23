import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { CartItem } from "@/types/cart";

interface CartState {
	items: CartItem[];
	addItem: (item: Omit<CartItem, "quantity">) => void;
	removeItem: (productId: string) => void;
	updateQuantity: (productId: string, quantity: number) => void;
	clearCart: () => void;
}

export const useCartStore = create<CartState>()(
	persist(
		(set) => ({
			items: [],

			addItem: (item) =>
				set((state) => {
					const existing = state.items.find(
						(i) => i.productId === item.productId,
					);
					if (existing) {
						return {
							items: state.items.map((i) =>
								i.productId === item.productId
									? { ...i, quantity: i.quantity + 1 }
									: i,
							),
						};
					}
					return { items: [...state.items, { ...item, quantity: 1 }] };
				}),

			removeItem: (productId) =>
				set((state) => ({
					items: state.items.filter((i) => i.productId !== productId),
				})),

			updateQuantity: (productId, quantity) =>
				set((state) => ({
					items:
						quantity <= 0
							? state.items.filter((i) => i.productId !== productId)
							: state.items.map((i) =>
									i.productId === productId ? { ...i, quantity } : i,
								),
				})),

			clearCart: () => set({ items: [] }),
		}),
		{
			name: "bizross-customer-cart",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
