import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { AppColors, CategoryEmojis } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import type { ProductCategory } from "@/types/product";

interface CategoryChipProps {
	category: ProductCategory | "All";
	isSelected: boolean;
	onPress: () => void;
}

export function CategoryChip({
	category,
	isSelected,
	onPress,
}: CategoryChipProps) {
	const theme = useTheme();

	return (
		<TouchableOpacity
			style={[
				styles.chip,
				{
					backgroundColor: isSelected
						? AppColors.primary
						: theme.backgroundElement,
				},
			]}
			onPress={onPress}
			activeOpacity={0.7}
		>
			<ThemedText style={styles.emoji}>
				{category === "All" ? "🏪" : (CategoryEmojis[category] ?? "📦")}
			</ThemedText>
			<ThemedText
				style={[styles.label, { color: isSelected ? "#FFFFFF" : theme.text }]}
			>
				{category}
			</ThemedText>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	chip: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 24,
		gap: 6,
		marginRight: 8,
	},
	emoji: {
		fontSize: 16,
	},
	label: {
		fontSize: 13,
		fontWeight: "600",
	},
});
