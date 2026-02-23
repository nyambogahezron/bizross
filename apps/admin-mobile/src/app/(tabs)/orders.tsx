import { useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { OrderCard } from "@/components/cards/order-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { EmptyState } from "@/components/ui/empty-state";
import { AppColors } from "@/constants/colors";
import { useOrderStore } from "@/stores/orderStore";

export default function OrdersScreen() {
	const router = useRouter();
	const orders = useOrderStore((s) => s.orders);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 800);
	}, []);

	const sortedOrders = [...orders].sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
	);

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText style={styles.title}>Orders</ThemedText>
				<ThemedText themeColor="textSecondary" style={styles.count}>
					{orders.length} total
				</ThemedText>
			</View>

			<FlatList
				data={sortedOrders}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={AppColors.primary}
					/>
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
						icon="🧾"
						title="No Orders Yet"
						message="Orders will appear here when customers make purchases."
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
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 12,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
	},
	count: {
		fontSize: 14,
		fontWeight: "500",
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 32,
	},
});
