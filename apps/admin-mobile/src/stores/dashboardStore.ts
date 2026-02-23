import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { DashboardStats } from "@/types/dashboard";

interface DashboardState {
	stats: DashboardStats;
	isLoading: boolean;
	refreshStats: (stats: Partial<DashboardStats>) => void;
	setLoading: (loading: boolean) => void;
}

export const useDashboardStore = create<DashboardState>()(
	persist(
		(set) => ({
			stats: {
				todaySales: 2990,
				revenue: 48750,
				ordersCount: 4,
				lowStockItems: 4,
			},
			isLoading: false,

			refreshStats: (updates) =>
				set((state) => ({
					stats: { ...state.stats, ...updates },
				})),

			setLoading: (loading) => set({ isLoading: loading }),
		}),
		{
			name: "bizross-dashboard",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
