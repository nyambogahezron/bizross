import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeInView } from "@/components/ui/fade-in-view";
import { AppColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useOrderStore } from "@/stores/orderStore";
import {
	formatCurrency,
	formatDateTime,
	getOrderStatusColor,
} from "@/utils/helpers";

export default function OrderDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const theme = useTheme();
	const orders = useOrderStore((s) => s.orders);
	const order = orders.find((o) => o.id === id);

	if (!order) {
		return (
			<ThemedView style={styles.container}>
				<Stack.Screen options={{ title: "Receipt" }} />
				<EmptyState
					icon="🔍"
					title="Order Not Found"
					message={`Couldn't find order "${id}".`}
				/>
			</ThemedView>
		);
	}

	const statusColor = getOrderStatusColor(order.status);

	return (
		<ThemedView style={styles.container}>
			<Stack.Screen options={{ title: order.id }} />
			<FlatList
				data={order.items}
				keyExtractor={(item, index) => `${item.productId}-${index}`}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.content}
				ListHeaderComponent={
					<FadeInView delay={0} duration={400}>
						<View
							style={[
								styles.receiptHeader,
								{ backgroundColor: theme.backgroundElement },
							]}
						>
							<ThemedText style={styles.receiptTitle}>📄 Receipt</ThemedText>
							<View style={styles.receiptRow}>
								<ThemedText style={styles.orderId}>{order.id}</ThemedText>
								<Badge
									label={order.status}
									bgColor={statusColor.bg}
									textColor={statusColor.text}
								/>
							</View>
							<ThemedText themeColor="textSecondary" style={styles.date}>
								{formatDateTime(order.date)}
							</ThemedText>
						</View>
						<ThemedText style={styles.sectionTitle}>Items</ThemedText>
					</FadeInView>
				}
				renderItem={({ item, index }) => (
					<FadeInView delay={index * 60} duration={300}>
						<View
							style={[
								styles.itemRow,
								{ backgroundColor: theme.backgroundElement },
							]}
						>
							<View style={styles.itemInfo}>
								<ThemedText style={styles.itemName}>{item.name}</ThemedText>
								<ThemedText themeColor="textSecondary" style={styles.itemMeta}>
									{formatCurrency(item.price)} × {item.quantity}
								</ThemedText>
							</View>
							<ThemedText style={styles.itemTotal}>
								{formatCurrency(item.total)}
							</ThemedText>
						</View>
					</FadeInView>
				)}
				ListFooterComponent={
					<FadeInView delay={200} duration={400}>
						<View
							style={[
								styles.totalCard,
								{ backgroundColor: theme.backgroundElement },
							]}
						>
							<View style={styles.totalRow}>
								<ThemedText themeColor="textSecondary">Subtotal</ThemedText>
								<ThemedText style={styles.totalValue}>
									{formatCurrency(order.subtotal)}
								</ThemedText>
							</View>
							<View
								style={[
									styles.divider,
									{ backgroundColor: theme.backgroundSelected },
								]}
							/>
							<View style={styles.totalRow}>
								<ThemedText style={styles.grandLabel}>Total</ThemedText>
								<ThemedText
									style={[styles.grandTotal, { color: AppColors.primary }]}
								>
									{formatCurrency(order.total)}
								</ThemedText>
							</View>
						</View>
						<View
							style={[
								styles.loyaltyBanner,
								{ backgroundColor: AppColors.accentLight },
							]}
						>
							<ThemedText style={styles.loyaltyText}>
								🎉 You earned {order.loyaltyPointsEarned} loyalty points from
								this order!
							</ThemedText>
						</View>
					</FadeInView>
				}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	content: { padding: 16, paddingBottom: 40 },
	receiptHeader: { borderRadius: 16, padding: 18, marginBottom: 20, gap: 8 },
	receiptTitle: { fontSize: 18, fontWeight: "700", marginBottom: 4 },
	receiptRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	orderId: { fontSize: 16, fontWeight: "700" },
	date: { fontSize: 13 },
	sectionTitle: { fontSize: 16, fontWeight: "700", marginBottom: 10 },
	itemRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 12,
		padding: 14,
		marginBottom: 8,
	},
	itemInfo: { flex: 1 },
	itemName: { fontSize: 15, fontWeight: "600" },
	itemMeta: { fontSize: 13, marginTop: 2 },
	itemTotal: { fontSize: 15, fontWeight: "700" },
	totalCard: { borderRadius: 16, padding: 18, marginTop: 12, gap: 12 },
	totalRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	totalValue: { fontSize: 15, fontWeight: "600" },
	divider: { height: 1 },
	grandLabel: { fontSize: 16, fontWeight: "700" },
	grandTotal: { fontSize: 22, fontWeight: "800" },
	loyaltyBanner: {
		borderRadius: 14,
		padding: 16,
		marginTop: 16,
		alignItems: "center",
	},
	loyaltyText: {
		fontSize: 14,
		fontWeight: "600",
		color: "#92400E",
		textAlign: "center",
	},
});
