import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AppColors } from "@/constants/colors";

interface FABProps {
	onPress: () => void;
	icon?: keyof typeof Ionicons.glyphMap;
}

export function FAB({ onPress, icon = "add" }: FABProps) {
	return (
		<TouchableOpacity style={styles.fab} onPress={onPress} activeOpacity={0.8}>
			<Ionicons name={icon} size={28} color="#FFFFFF" />
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	fab: {
		position: "absolute",
		right: 20,
		bottom: 20,
		width: 56,
		height: 56,
		borderRadius: 28,
		backgroundColor: AppColors.primary,
		justifyContent: "center",
		alignItems: "center",
		elevation: 6,
		shadowColor: AppColors.primary,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 8,
	},
});
