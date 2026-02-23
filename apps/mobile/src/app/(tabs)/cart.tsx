import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { CartItemCard } from "@/components/cards/cart-item-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { EmptyState } from "@/components/ui/empty-state";
import { AppColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useCartStore } from "@/stores/cartStore";
import { formatCurrency } from "@/utils/helpers";

export default function CartScreen() {
	const router = useRouter();
	const theme = useTheme();
	const items = useCartStore((s) => s.items);
	const updateQuantity = useCartStore((s) => s.updateQuantity);
	const removeItem = useCartStore((s) => s.removeItem);

	const subtotal = useMemo(
		() => items.reduce((sum, i) => sum + i.price * i.quantity, 0),
		[items],
	);
	const itemCount = useMemo(
		() => items.reduce((sum, i) => sum + i.quantity, 0),
		[items],
	);

	if (items.length === 0) {
		return (
			<ThemedView style={styles.container}>
				<EmptyState
					icon="🛒"
					title="Your cart is empty"
					message="Browse products and add items to your cart."
				/>
			</ThemedView>
		);
	}

	return (
		<ThemedView style={styles.container}>
			<FlatList
				data={items}
				keyExtractor={(item) => item.productId}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				ListHeaderComponent={
					<View style={styles.header}>
						<ThemedText style={styles.title}>Your Cart</ThemedText>
						<ThemedText themeColor="textSecondary" style={styles.count}>
							{itemCount} item{itemCount !== 1 ? "s" : ""}
						</ThemedText>
					</View>
				}
				renderItem={({ item, index }) => (
					<CartItemCard
						item={item}
						index={index}
						onUpdateQty={(qty) => updateQuantity(item.productId, qty)}
						onRemove={() => removeItem(item.productId)}
					/>
				)}
			/>

			<View
				style={[styles.footer, { backgroundColor: theme.backgroundElement }]}
			>
				<View style={styles.footerRow}>
					<ThemedText themeColor="textSecondary" style={styles.subtotalLabel}>
						Subtotal
					</ThemedText>
					<ThemedText style={styles.subtotalValue}>
						{formatCurrency(subtotal)}
					</ThemedText>
				</View>
				<TouchableOpacity
					style={styles.checkoutBtn}
					onPress={() => router.push("/checkout")}
					activeOpacity={0.8}
				>
					<ThemedText style={styles.checkoutText}>
						Proceed to Checkout
					</ThemedText>
				</TouchableOpacity>
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	listContent: {
		padding: 16,
		paddingBottom: 160,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
		marginBottom: 16,
	},
	title: {
		fontSize: 24,
		fontWeight: "700",
	},
	count: {
		fontSize: 14,
	},
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		padding: 20,
		paddingBottom: 34,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		gap: 14,
	},
	footerRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	subtotalLabel: {
		fontSize: 16,
	},
	subtotalValue: {
		fontSize: 22,
		fontWeight: "700",
	},
	checkoutBtn: {
		backgroundColor: AppColors.primary,
		borderRadius: 16,
		paddingVertical: 16,
		alignItems: "center",
	},
	checkoutText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "700",
	},
});
