import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Badge } from "@/components/ui/badge";
import { FadeInView } from "@/components/ui/fade-in-view";
import { AppColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import type { Product } from "@/types/product";
import { getStockLevel } from "@/utils/helpers";

interface InventoryCardProps {
	product: Product;
	index?: number;
	onAdjustStock: (id: string, quantity: number) => void;
}

export function InventoryCard({
	product,
	index = 0,
	onAdjustStock,
}: InventoryCardProps) {
	const theme = useTheme();
	const stockLevel = getStockLevel(product.stock);

	const handleAdjust = (amount: number) => {
		onAdjustStock(product.id, amount);
	};

	return (
		<FadeInView delay={index * 60} duration={400}>
			<View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
				<View
					style={[styles.stockIndicator, { backgroundColor: stockLevel.color }]}
				/>
				<View style={styles.info}>
					<ThemedText style={styles.name} numberOfLines={1}>
						{product.name}
					</ThemedText>
					<ThemedText themeColor="textSecondary" style={styles.sku}>
						{product.sku}
					</ThemedText>
					<Badge
						label={`${stockLevel.label} · ${product.stock} units`}
						bgColor={stockLevel.bg}
						textColor={stockLevel.color}
					/>
				</View>
				<View style={styles.actions}>
					<TouchableOpacity
						style={[
							styles.adjustBtn,
							{ backgroundColor: AppColors.dangerLight },
						]}
						onPress={() => handleAdjust(-1)}
						activeOpacity={0.7}
					>
						<ThemedText
							style={[styles.adjustBtnText, { color: AppColors.danger }]}
						>
							−
						</ThemedText>
					</TouchableOpacity>
					<ThemedText style={styles.stockCount}>{product.stock}</ThemedText>
					<TouchableOpacity
						style={[
							styles.adjustBtn,
							{ backgroundColor: AppColors.successLight },
						]}
						onPress={() => handleAdjust(1)}
						activeOpacity={0.7}
					>
						<ThemedText
							style={[styles.adjustBtnText, { color: AppColors.success }]}
						>
							+
						</ThemedText>
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
		padding: 14,
		marginBottom: 10,
		gap: 12,
	},
	stockIndicator: {
		width: 4,
		height: 48,
		borderRadius: 2,
	},
	info: {
		flex: 1,
		gap: 3,
	},
	name: {
		fontSize: 15,
		fontWeight: "600",
	},
	sku: {
		fontSize: 12,
	},
	actions: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	adjustBtn: {
		width: 36,
		height: 36,
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	adjustBtnText: {
		fontSize: 20,
		fontWeight: "700",
	},
	stockCount: {
		fontSize: 18,
		fontWeight: "700",
		minWidth: 28,
		textAlign: "center",
	},
});
