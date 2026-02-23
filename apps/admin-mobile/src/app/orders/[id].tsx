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
				<Stack.Screen options={{ title: "Order Details" }} />
				<EmptyState
					icon="🔍"
					title="Order Not Found"
					message={`We couldn't find order "${id}".`}
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
				contentContainerStyle={styles.listContent}
				ListHeaderComponent={
					<FadeInView delay={0} duration={400} translateY={10}>
						<View
							style={[
								styles.infoCard,
								{ backgroundColor: theme.backgroundElement },
							]}
						>
							<View style={styles.infoRow}>
								<ThemedText style={styles.orderId}>{order.id}</ThemedText>
								<Badge
									label={order.status}
									bgColor={statusColor.bg}
									textColor={statusColor.text}
								/>
							</View>
							<View style={styles.detailRow}>
								<ThemedText themeColor="textSecondary" style={styles.label}>
									Customer
								</ThemedText>
								<ThemedText style={styles.detailValue}>
									{order.customerName}
								</ThemedText>
							</View>
							<View style={styles.detailRow}>
								<ThemedText themeColor="textSecondary" style={styles.label}>
									Date
								</ThemedText>
								<ThemedText style={styles.detailValue}>
									{formatDateTime(order.date)}
								</ThemedText>
							</View>
							<View style={styles.detailRow}>
								<ThemedText themeColor="textSecondary" style={styles.label}>
									Total
								</ThemedText>
								<ThemedText style={[styles.detailValue, styles.totalValue]}>
									{formatCurrency(order.total)}
								</ThemedText>
							</View>
						</View>

						<ThemedText style={styles.sectionTitle}>
							Items ({order.items.length})
						</ThemedText>
					</FadeInView>
				}
				renderItem={({ item, index }) => (
					<FadeInView
						delay={index * 80}
						duration={350}
						translateX={-20}
						translateY={0}
					>
						<View
							style={[
								styles.itemCard,
								{ backgroundColor: theme.backgroundElement },
							]}
						>
							<View style={styles.itemInfo}>
								<ThemedText style={styles.itemName}>
									{item.productName}
								</ThemedText>
								<ThemedText themeColor="textSecondary" style={styles.itemMeta}>
									{formatCurrency(item.unitPrice)} × {item.quantity}
								</ThemedText>
							</View>
							<ThemedText style={styles.itemTotal}>
								{formatCurrency(item.total)}
							</ThemedText>
						</View>
					</FadeInView>
				)}
				ListFooterComponent={
					<FadeInView delay={300} duration={500}>
						<View
							style={[
								styles.totalCard,
								{ backgroundColor: theme.backgroundElement },
							]}
						>
							<ThemedText style={styles.totalLabel}>Order Total</ThemedText>
							<ThemedText
								style={[styles.grandTotal, { color: AppColors.primary }]}
							>
								{formatCurrency(order.total)}
							</ThemedText>
						</View>
					</FadeInView>
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
	infoCard: {
		borderRadius: 16,
		padding: 18,
		marginBottom: 24,
		gap: 12,
	},
	infoRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 4,
	},
	orderId: {
		fontSize: 20,
		fontWeight: "700",
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	label: {
		fontSize: 14,
	},
	detailValue: {
		fontSize: 14,
		fontWeight: "600",
	},
	totalValue: {
		fontSize: 16,
		fontWeight: "700",
	},
	sectionTitle: {
		fontSize: 17,
		fontWeight: "700",
		marginBottom: 12,
	},
	itemCard: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderRadius: 12,
		padding: 14,
		marginBottom: 8,
	},
	itemInfo: {
		flex: 1,
	},
	itemName: {
		fontSize: 15,
		fontWeight: "600",
	},
	itemMeta: {
		fontSize: 13,
		marginTop: 2,
	},
	itemTotal: {
		fontSize: 15,
		fontWeight: "700",
	},
	totalCard: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderRadius: 16,
		padding: 18,
		marginTop: 12,
	},
	totalLabel: {
		fontSize: 16,
		fontWeight: "600",
	},
	grandTotal: {
		fontSize: 22,
		fontWeight: "800",
	},
});
