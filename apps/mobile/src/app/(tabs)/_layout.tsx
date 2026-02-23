import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { AppColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useCartStore } from "@/stores/cartStore";

export default function TabLayout() {
	const theme = useTheme();
	const cartItems = useCartStore((s) => s.items);
	const cartCount = cartItems.reduce((sum, i) => sum + i.quantity, 0);

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: AppColors.primary,
				tabBarInactiveTintColor: theme.textSecondary,
				tabBarStyle: {
					backgroundColor: theme.background,
					borderTopColor: theme.backgroundElement,
				},
				headerStyle: { backgroundColor: theme.background },
				headerTintColor: theme.text,
				headerShadowVisible: false,
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Home",
					headerShown: false,
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="home-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="cart"
				options={{
					title: "Cart",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="cart-outline" size={size} color={color} />
					),
					tabBarBadge: cartCount > 0 ? cartCount : undefined,
				}}
			/>
			<Tabs.Screen
				name="orders"
				options={{
					title: "Orders",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="receipt-outline" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="profile"
				options={{
					title: "Profile",
					tabBarIcon: ({ color, size }) => (
						<Ionicons name="person-outline" size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
