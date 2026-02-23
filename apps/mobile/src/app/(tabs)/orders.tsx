import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, StyleSheet } from "react-native";
import { OrderCard } from "@/components/cards/order-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { EmptyState } from "@/components/ui/empty-state";
import { useOrderStore } from "@/stores/orderStore";

export default function OrdersScreen() {
	const router = useRouter();
	const allOrders = useOrderStore((s) => s.orders);

	const orders = useMemo(
		() =>
			[...allOrders].sort(
				(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
			),
		[allOrders],
	);

	return (
		<ThemedView style={styles.container}>
			<FlatList
				data={orders}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				ListHeaderComponent={
					<ThemedText style={styles.title}>My Orders</ThemedText>
				}
				renderItem={({ item, index }) => (
					<OrderCard
						order={item}
						index={index}
						onPress={() => router.push(`/orders/${item.id}`)}
					/>
				)}
				ListEmptyComponent={
					<EmptyState
						icon="📦"
						title="No Orders Yet"
						message="Your order history will appear here."
					/>
				}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContent: {
		padding: 16,
		paddingBottom: 32,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
		marginBottom: 16,
	},
});
