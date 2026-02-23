import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { FadeInView } from "@/components/ui/fade-in-view";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { AppColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import type { CartItem } from "@/types/cart";
import { formatCurrency } from "@/utils/helpers";

interface CartItemCardProps {
	item: CartItem;
	index?: number;
	onUpdateQty: (qty: number) => void;
	onRemove: () => void;
}

export function CartItemCard({
	item,
	index = 0,
	onUpdateQty,
	onRemove,
}: CartItemCardProps) {
	const theme = useTheme();

	return (
		<FadeInView delay={index * 50} duration={300}>
			<View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
				<View style={styles.imageBox}>
					<ThemedText style={styles.emoji}>{item.image}</ThemedText>
				</View>
				<View style={styles.info}>
					<ThemedText style={styles.name} numberOfLines={1}>
						{item.name}
					</ThemedText>
					<ThemedText style={[styles.price, { color: AppColors.primary }]}>
						{formatCurrency(item.price)}
					</ThemedText>
				</View>
				<View style={styles.actions}>
					<QuantitySelector
						quantity={item.quantity}
						onIncrement={() => onUpdateQty(item.quantity + 1)}
						onDecrement={() => onUpdateQty(item.quantity - 1)}
					/>
					<TouchableOpacity
						onPress={onRemove}
						hitSlop={8}
						style={styles.removeBtn}
					>
						<Ionicons name="trash-outline" size={18} color={AppColors.danger} />
					</TouchableOpacity>
				</View>
			</View>
		</FadeInView>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 14,
		padding: 12,
		marginBottom: 10,
		gap: 12,
	},
	imageBox: {
		width: 52,
		height: 52,
		borderRadius: 12,
		backgroundColor: "rgba(13, 148, 136, 0.08)",
		justifyContent: "center",
		alignItems: "center",
	},
	emoji: {
		fontSize: 28,
	},
	info: {
		flex: 1,
		gap: 2,
	},
	name: {
		fontSize: 15,
		fontWeight: "600",
	},
	price: {
		fontSize: 14,
		fontWeight: "700",
	},
	actions: {
		alignItems: "flex-end",
		gap: 10,
	},
	removeBtn: {
		padding: 4,
	},
});
