import { Stack, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { FadeInView } from "@/components/ui/fade-in-view";
import { AppColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { useUserStore } from "@/stores/userStore";
import { formatCurrency } from "@/utils/helpers";

export default function CheckoutScreen() {
	const router = useRouter();
	const theme = useTheme();
	const items = useCartStore((s) => s.items);
	const clearCart = useCartStore((s) => s.clearCart);
	const placeOrder = useOrderStore((s) => s.placeOrder);
	const addLoyaltyPoints = useUserStore((s) => s.addLoyaltyPoints);
	const [orderPlaced, setOrderPlaced] = useState(false);
	const [orderId, setOrderId] = useState("");
	const [pointsEarned, setPointsEarned] = useState(0);

	const subtotal = useMemo(
		() => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
		[items],
	);
	const itemCount = useMemo(
		() => items.reduce((sum, i) => sum + i.quantity, 0),
		[items],
	);

	const handlePlaceOrder = () => {
		const order = placeOrder(items);
		addLoyaltyPoints(order.loyaltyPointsEarned);
		setOrderId(order.id);
		setPointsEarned(order.loyaltyPointsEarned);
		clearCart();
		setOrderPlaced(true);
	};

	if (orderPlaced) {
		return (
			<ThemedView style={styles.container}>
				<Stack.Screen options={{ title: "Order Confirmed" }} />
				<View style={styles.successContainer}>
					<FadeInView delay={0} duration={600} translateY={-20}>
						<ThemedText style={styles.successEmoji}>🎉</ThemedText>
					</FadeInView>
					<FadeInView delay={200} duration={500}>
						<ThemedText style={styles.successTitle}>
							Order Confirmed!
						</ThemedText>
						<ThemedText
							themeColor="textSecondary"
							style={styles.successMessage}
						>
							Your order {orderId} has been placed successfully.
						</ThemedText>
						<View
							style={[
								styles.pointsBanner,
								{ backgroundColor: AppColors.accentLight },
							]}
						>
							<ThemedText style={styles.pointsText}>
								+{pointsEarned} loyalty points earned!
							</ThemedText>
						</View>
					</FadeInView>
					<FadeInView delay={400} duration={400}>
						<TouchableOpacity
							style={[
								styles.viewOrderBtn,
								{ backgroundColor: AppColors.primary },
							]}
							onPress={() => {
								router.dismissAll();
								router.push(`/orders/${orderId}`);
							}}
							activeOpacity={0.8}
						>
							<ThemedText style={styles.viewOrderText}>View Receipt</ThemedText>
						</TouchableOpacity>
						<TouchableOpacity
							style={[
								styles.homeBtn,
								{ backgroundColor: theme.backgroundElement },
							]}
							onPress={() => {
								router.dismissAll();
							}}
							activeOpacity={0.8}
						>
							<ThemedText style={styles.homeBtnText}>
								Continue Shopping
							</ThemedText>
						</TouchableOpacity>
					</FadeInView>
				</View>
			</ThemedView>
		);
	}

	return (
		<ThemedView style={styles.container}>
			<Stack.Screen options={{ title: "Checkout" }} />
			<FlatList
				data={items}
				keyExtractor={(item) => item.productId}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				ListHeaderComponent={
					<FadeInView delay={0} duration={400}>
						<ThemedText style={styles.title}>Order Summary</ThemedText>
						<ThemedText themeColor="textSecondary" style={styles.subtitle}>
							{itemCount} item{itemCount !== 1 ? "s" : ""}
						</ThemedText>
					</FadeInView>
				}
				renderItem={({ item, index }) => (
					<FadeInView delay={index * 50} duration={300}>
						<View
							style={[
								styles.itemRow,
								{ backgroundColor: theme.backgroundElement },
							]}
						>
							<ThemedText style={styles.itemEmoji}>{item.image}</ThemedText>
							<View style={styles.itemInfo}>
								<ThemedText style={styles.itemName} numberOfLines={1}>
									{item.name}
								</ThemedText>
								<ThemedText themeColor="textSecondary" style={styles.itemQty}>
									{formatCurrency(item.price)} × {item.quantity}
								</ThemedText>
							</View>
							<ThemedText style={styles.itemTotal}>
								{formatCurrency(item.price * item.quantity)}
							</ThemedText>
						</View>
					</FadeInView>
				)}
				ListFooterComponent={
					<FadeInView delay={200} duration={400}>
						<View
							style={[
								styles.summaryCard,
								{ backgroundColor: theme.backgroundElement },
							]}
						>
							<View style={styles.summaryRow}>
								<ThemedText themeColor="textSecondary">Subtotal</ThemedText>
								<ThemedText style={styles.summaryValue}>
									{formatCurrency(subtotal)}
								</ThemedText>
							</View>
							<View style={styles.summaryRow}>
								<ThemedText themeColor="textSecondary">
									Loyalty Points
								</ThemedText>
								<ThemedText
									style={[styles.summaryValue, { color: AppColors.accent }]}
								>
									+{Math.floor(subtotal / 10)} pts
								</ThemedText>
							</View>
							<View
								style={[
									styles.divider,
									{ backgroundColor: theme.backgroundSelected },
								]}
							/>
							<View style={styles.summaryRow}>
								<ThemedText style={styles.grandLabel}>Total</ThemedText>
								<ThemedText
									style={[styles.grandTotal, { color: AppColors.primary }]}
								>
									{formatCurrency(subtotal)}
								</ThemedText>
							</View>
						</View>

						<TouchableOpacity
							style={styles.placeOrderBtn}
							onPress={handlePlaceOrder}
							activeOpacity={0.8}
						>
							<ThemedText style={styles.placeOrderText}>Place Order</ThemedText>
						</TouchableOpacity>
					</FadeInView>
				}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	listContent: { padding: 16, paddingBottom: 40 },
	title: { fontSize: 24, fontWeight: "700", marginBottom: 4 },
	subtitle: { fontSize: 14, marginBottom: 20 },
	itemRow: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 12,
		padding: 14,
		marginBottom: 8,
		gap: 12,
	},
	itemEmoji: { fontSize: 28 },
	itemInfo: { flex: 1 },
	itemName: { fontSize: 15, fontWeight: "600" },
	itemQty: { fontSize: 13, marginTop: 2 },
	itemTotal: { fontSize: 15, fontWeight: "700" },
	summaryCard: { borderRadius: 16, padding: 18, marginTop: 16, gap: 12 },
	summaryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	summaryValue: { fontSize: 15, fontWeight: "600" },
	divider: { height: 1 },
	grandLabel: { fontSize: 16, fontWeight: "700" },
	grandTotal: { fontSize: 22, fontWeight: "800" },
	placeOrderBtn: {
		backgroundColor: AppColors.primary,
		borderRadius: 16,
		paddingVertical: 18,
		alignItems: "center",
		marginTop: 20,
	},
	placeOrderText: { color: "#FFFFFF", fontSize: 17, fontWeight: "700" },
	// Success state
	successContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 32,
	},
	successEmoji: { fontSize: 72, textAlign: "center", marginBottom: 20 },
	successTitle: {
		fontSize: 26,
		fontWeight: "700",
		textAlign: "center",
		marginBottom: 8,
	},
	successMessage: {
		fontSize: 15,
		textAlign: "center",
		lineHeight: 22,
		marginBottom: 16,
	},
	pointsBanner: {
		borderRadius: 14,
		padding: 14,
		marginBottom: 32,
		alignItems: "center",
	},
	pointsText: { fontSize: 15, fontWeight: "700", color: "#92400E" },
	viewOrderBtn: {
		borderRadius: 16,
		paddingVertical: 16,
		paddingHorizontal: 48,
		alignItems: "center",
		marginBottom: 12,
		minWidth: 240,
	},
	viewOrderText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
	homeBtn: {
		borderRadius: 16,
		paddingVertical: 16,
		paddingHorizontal: 48,
		alignItems: "center",
		minWidth: 240,
	},
	homeBtnText: { fontSize: 16, fontWeight: "600" },
});
