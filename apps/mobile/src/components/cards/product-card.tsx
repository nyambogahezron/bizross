import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { FadeInView } from "@/components/ui/fade-in-view";
import { AppColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import type { Product } from "@/types/product";
import { formatCurrency } from "@/utils/helpers";

interface ProductCardProps {
	product: Product;
	index?: number;
	onPress: () => void;
}

export function ProductCard({ product, index = 0, onPress }: ProductCardProps) {
	const theme = useTheme();

	return (
		<FadeInView delay={index * 50} duration={350}>
			<TouchableOpacity
				style={[styles.card, { backgroundColor: theme.backgroundElement }]}
				onPress={onPress}
				activeOpacity={0.7}
			>
				<View style={styles.imageContainer}>
					<ThemedText style={styles.emoji}>{product.image}</ThemedText>
				</View>
				<ThemedText style={styles.name} numberOfLines={2}>
					{product.name}
				</ThemedText>
				<View style={styles.footer}>
					<ThemedText style={[styles.price, { color: AppColors.primary }]}>
						{formatCurrency(product.price)}
					</ThemedText>
					<View style={styles.ratingRow}>
						<ThemedText style={styles.star}>⭐</ThemedText>
						<ThemedText themeColor="textSecondary" style={styles.rating}>
							{product.rating}
						</ThemedText>
					</View>
				</View>
			</TouchableOpacity>
		</FadeInView>
	);
}

const styles = StyleSheet.create({
	card: {
		borderRadius: 16,
		padding: 12,
		flex: 1,
		margin: 5,
	},
	imageContainer: {
		width: "100%",
		aspectRatio: 1,
		borderRadius: 12,
		backgroundColor: "rgba(13, 148, 136, 0.08)",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 10,
	},
	emoji: {
		fontSize: 42,
	},
	name: {
		fontSize: 14,
		fontWeight: "600",
		marginBottom: 6,
		lineHeight: 18,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	price: {
		fontSize: 15,
		fontWeight: "700",
	},
	ratingRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 2,
	},
	star: {
		fontSize: 11,
	},
	rating: {
		fontSize: 12,
		fontWeight: "500",
	},
});
