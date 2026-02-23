import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Customer } from "@/types/customer";

interface CustomerState {
	customers: Customer[];
	searchQuery: string;
	setSearchQuery: (query: string) => void;
}

const initialCustomers: Customer[] = [
	{
		id: "1",
		name: "Jane Muthoni",
		phone: "+254 712 345 678",
		email: "jane.muthoni@email.com",
		ordersCount: 12,
		totalSpent: 15680,
		joinedAt: "2025-06-15",
	},
	{
		id: "2",
		name: "Peter Kamau",
		phone: "+254 723 456 789",
		email: "peter.kamau@email.com",
		ordersCount: 8,
		totalSpent: 9450,
		joinedAt: "2025-07-20",
	},
	{
		id: "3",
		name: "Mary Wanjiku",
		phone: "+254 734 567 890",
		email: "mary.wanjiku@email.com",
		ordersCount: 15,
		totalSpent: 22340,
		joinedAt: "2025-05-10",
	},
	{
		id: "4",
		name: "David Ochieng",
		phone: "+254 745 678 901",
		email: "david.ochieng@email.com",
		ordersCount: 5,
		totalSpent: 4890,
		joinedAt: "2025-09-01",
	},
	{
		id: "5",
		name: "Sarah Akinyi",
		phone: "+254 756 789 012",
		email: "sarah.akinyi@email.com",
		ordersCount: 10,
		totalSpent: 12750,
		joinedAt: "2025-08-05",
	},
	{
		id: "6",
		name: "John Kiprop",
		phone: "+254 767 890 123",
		email: "john.kiprop@email.com",
		ordersCount: 3,
		totalSpent: 2180,
		joinedAt: "2025-11-15",
	},
	{
		id: "7",
		name: "Grace Njeri",
		phone: "+254 778 901 234",
		email: "grace.njeri@email.com",
		ordersCount: 7,
		totalSpent: 8920,
		joinedAt: "2025-07-30",
	},
];

export const useCustomerStore = create<CustomerState>()(
	persist(
		(set) => ({
			customers: initialCustomers,
			searchQuery: "",
			setSearchQuery: (query) => set({ searchQuery: query }),
		}),
		{
			name: "bizross-customers",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
