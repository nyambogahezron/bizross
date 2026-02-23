import { useRouter } from "expo-router";
import React, { useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { OrderCard } from "@/components/cards/order-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { FadeInView } from "@/components/ui/fade-in-view";
import { StatCard } from "@/components/ui/stat-card";
import { AppColors } from "@/constants/colors";
import { useDashboardStore } from "@/stores/dashboardStore";
import { useOrderStore } from "@/stores/orderStore";
import { useProductStore } from "@/stores/productStore";
import { formatCurrency } from "@/utils/helpers";

export default function DashboardScreen() {
	const router = useRouter();
	const stats = useDashboardStore((s) => s.stats);
	const orders = useOrderStore((s) => s.orders);
	const products = useProductStore((s) => s.products);
	const [refreshing, setRefreshing] = useState(false);

	const recentOrders = useMemo(
		() =>
			[...orders]
				.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
				.slice(0, 5),
		[orders],
	);

	const lowStockCount = useMemo(
		() => products.filter((p) => p.stock <= 5).length,
		[products],
	);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 800);
	}, []);

	const statCards = [
		{
			title: "Today's Sales",
			value: formatCurrency(stats.todaySales),
			icon: "💰",
			color: AppColors.success,
		},
		{
			title: "Revenue",
			value: formatCurrency(stats.revenue),
			icon: "📈",
			color: AppColors.primary,
		},
		{
			title: "Orders",
			value: stats.ordersCount.toString(),
			icon: "📦",
			color: AppColors.info,
		},
		{
			title: "Low Stock",
			value: lowStockCount.toString(),
			icon: "⚠️",
			color: AppColors.warning,
		},
	];

	return (
		<ThemedView style={styles.container}>
			<FlatList
				data={recentOrders}
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
				ListHeaderComponent={
					<View>
						<FadeInView delay={0} duration={500} translateY={-10}>
							<ThemedText style={styles.greeting}>Good day! 👋</ThemedText>
							<ThemedText themeColor="textSecondary" style={styles.subtitle}>
								Here&apos;s your business overview
							</ThemedText>
						</FadeInView>

						<View style={styles.statsGrid}>
							{statCards.map((card, i) => (
								<StatCard
									key={card.title}
									title={card.title}
									value={card.value}
									icon={card.icon}
									color={card.color}
									index={i}
								/>
							))}
						</View>

						<ThemedText style={styles.sectionTitle}>Recent Orders</ThemedText>
					</View>
				}
				renderItem={({ item, index }) => (
					<OrderCard
						order={item}
						index={index}
						onPress={() => router.push(`/orders/${item.id}`)}
					/>
				)}
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
	greeting: {
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 4,
	},
	subtitle: {
		fontSize: 15,
		marginBottom: 20,
	},
	statsGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 10,
		marginBottom: 28,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
		marginBottom: 12,
	},
});
