import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { useColorScheme } from "react-native";
import { AppColors } from "@/constants/colors";
import { Colors } from "@/constants/theme";

export default function TabLayout() {
	const scheme = useColorScheme();
	const colors = Colors[scheme === "dark" ? "dark" : "light"];

	return (
		<Tabs
			screenOptions={{
				headerShown: true,
				headerStyle: {
					backgroundColor: colors.background,
				},
				headerTitleStyle: {
					fontWeight: "600",
					fontSize: 17,
					color: colors.text,
				},
				headerShadowVisible: false,
				tabBarActiveTintColor: AppColors.primary,
				tabBarInactiveTintColor: colors.textSecondary,
				tabBarStyle: {
					backgroundColor: colors.background,
					borderTopColor: scheme === "dark" ? "#1F2937" : "#E5E7EB",
					borderTopWidth: 1,
					paddingTop: 4,
					height: 56,
				},
				tabBarLabelStyle: {
					fontSize: 11,
					fontWeight: "600",
				},
			}}
		>
			<Tabs.Screen
				name="dashboard"
				options={{
					title: "Dashboard",
					headerTitle: "Bizross Admin",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="grid-outline" size={22} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="products"
				options={{
					title: "Products",
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="cube-outline" size={22} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="orders"
				options={{
					title: "Orders",
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="receipt-outline" size={22} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="inventory"
				options={{
					title: "Inventory",
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="stats-chart-outline" size={22} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="customers"
				options={{
					title: "Customers",
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="people-outline" size={22} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
