import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { useTheme } from "@/hooks/use-theme";

interface EmptyStateProps {
	icon: string;
	title: string;
	message: string;
}

export function EmptyState({ icon, title, message }: EmptyStateProps) {
	const theme = useTheme();

	return (
		<View style={styles.container}>
			<ThemedText style={styles.icon}>{icon}</ThemedText>
			<ThemedText style={styles.title}>{title}</ThemedText>
			<ThemedText themeColor="textSecondary" style={styles.message}>
				{message}
			</ThemedText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 60,
		paddingHorizontal: 32,
	},
	icon: {
		fontSize: 48,
		marginBottom: 16,
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 8,
		textAlign: "center",
	},
	message: {
		fontSize: 14,
		textAlign: "center",
		lineHeight: 20,
	},
});
