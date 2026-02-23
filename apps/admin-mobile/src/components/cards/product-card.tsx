import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Badge } from "@/components/ui/badge";
import { FadeInView } from "@/components/ui/fade-in-view";
import { AppColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import type { Product } from "@/types/product";
import { getStockLevel } from "@/utils/helpers";

interface ProductCardProps {
	product: Product;
	index?: number;
	onPress: () => void;
	onDelete?: () => void;
}

export function ProductCard({
	product,
	index = 0,
	onPress,
	onDelete,
}: ProductCardProps) {
	const theme = useTheme();
	const stockLevel = getStockLevel(product.stock);

	return (
		<FadeInView delay={index * 60} duration={400}>
			<TouchableOpacity
				style={[styles.card, { backgroundColor: theme.backgroundElement }]}
				onPress={onPress}
				activeOpacity={0.7}
			>
				<View style={styles.topRow}>
					<View style={styles.info}>
						<ThemedText style={styles.name} numberOfLines={1}>
							{product.name}
						</ThemedText>
						<ThemedText themeColor="textSecondary" style={styles.sku}>
							{product.sku} · {product.category}
						</ThemedText>
					</View>
					<ThemedText style={[styles.price, { color: AppColors.primary }]}>
						KSH {product.price}
					</ThemedText>
				</View>
				<View style={styles.bottomRow}>
					<Badge
						label={`${stockLevel.label} (${product.stock})`}
						bgColor={stockLevel.bg}
						textColor={stockLevel.color}
					/>
					{onDelete && (
						<TouchableOpacity onPress={onDelete} hitSlop={8}>
							<ThemedText
								style={[styles.deleteText, { color: AppColors.danger }]}
							>
								Delete
							</ThemedText>
						</TouchableOpacity>
					)}
				</View>
			</TouchableOpacity>
		</FadeInView>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 14,
		padding: 16,
		marginBottom: 10,
	},
	topRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
		marginBottom: 10,
	},
	info: {
		flex: 1,
		marginRight: 12,
	},
	name: {
		fontSize: 16,
		fontWeight: "600",
	},
	sku: {
		fontSize: 13,
		marginTop: 2,
	},
	price: {
		fontSize: 17,
		fontWeight: "700",
	},
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	deleteText: {
		fontSize: 13,
		fontWeight: "600",
	},
});
