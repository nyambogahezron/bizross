import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";

interface QuantitySelectorProps {
	quantity: number;
	onIncrement: () => void;
	onDecrement: () => void;
	size?: "small" | "large";
}

export function QuantitySelector({
	quantity,
	onIncrement,
	onDecrement,
	size = "small",
}: QuantitySelectorProps) {
	const btnSize = size === "large" ? 40 : 32;
	const fontSize = size === "large" ? 18 : 15;

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[
					styles.btn,
					{
						width: btnSize,
						height: btnSize,
						backgroundColor: AppColors.mutedLight,
					},
				]}
				onPress={onDecrement}
				activeOpacity={0.7}
			>
				<ThemedText style={[styles.btnText, { fontSize }]}>−</ThemedText>
			</TouchableOpacity>
			<ThemedText
				style={[styles.qty, { fontSize, minWidth: size === "large" ? 36 : 28 }]}
			>
				{quantity}
			</ThemedText>
			<TouchableOpacity
				style={[
					styles.btn,
					{
						width: btnSize,
						height: btnSize,
						backgroundColor: AppColors.primaryLight,
					},
				]}
				onPress={onIncrement}
				activeOpacity={0.7}
			>
				<ThemedText
					style={[styles.btnText, { fontSize, color: AppColors.primaryDark }]}
				>
					+
				</ThemedText>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
	},
	btn: {
		borderRadius: 10,
		justifyContent: "center",
		alignItems: "center",
	},
	btnText: {
		fontWeight: "700",
	},
	qty: {
		fontWeight: "700",
		textAlign: "center",
	},
});
