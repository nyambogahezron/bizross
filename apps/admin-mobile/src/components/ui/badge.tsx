import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface BadgeProps {
	label: string;
	bgColor: string;
	textColor: string;
}

export function Badge({ label, bgColor, textColor }: BadgeProps) {
	return (
		<View style={[styles.badge, { backgroundColor: bgColor }]}>
			<Text style={[styles.text, { color: textColor }]}>{label}</Text>
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
	text: {
		fontSize: 12,
		fontWeight: "600",
		textTransform: "capitalize",
	},
});
