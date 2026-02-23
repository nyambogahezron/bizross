import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";

interface BadgeProps {
	label: string;
	bgColor: string;
	textColor: string;
}

export function Badge({ label, bgColor, textColor }: BadgeProps) {
	return (
		<View style={[styles.badge, { backgroundColor: bgColor }]}>
			<ThemedText style={[styles.label, { color: textColor }]}>
				{label}
			</ThemedText>
		</View>
	);
}

const styles = StyleSheet.create({
	badge: {
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 20,
		alignSelf: "flex-start",
	},
	label: {
		fontSize: 12,
		fontWeight: "600",
		textTransform: "capitalize",
	},
});
