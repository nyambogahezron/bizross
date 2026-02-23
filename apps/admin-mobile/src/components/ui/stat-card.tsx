import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { FadeInView } from "@/components/ui/fade-in-view";
import { useTheme } from "@/hooks/use-theme";

interface StatCardProps {
	title: string;
	value: string;
	icon: string;
	color: string;
	index?: number;
}

export function StatCard({
	title,
	value,
	icon,
	color,
	index = 0,
}: StatCardProps) {
	const theme = useTheme();

	return (
		<FadeInView
			delay={index * 100}
			duration={500}
			translateY={20}
			style={[
				styles.card,
				{
					backgroundColor: theme.backgroundElement,
					borderLeftColor: color,
				},
			]}
		>
			<View style={styles.iconContainer}>
				<ThemedText style={styles.icon}>{icon}</ThemedText>
			</View>
			<View style={styles.content}>
				<ThemedText themeColor="textSecondary" style={styles.title}>
					{title}
				</ThemedText>
				<ThemedText style={[styles.value, { color }]}>{value}</ThemedText>
			</View>
		</FadeInView>
	);
}

const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 16,
		padding: 16,
		borderLeftWidth: 4,
		gap: 12,
		flex: 1,
		minWidth: "45%",
	},
	iconContainer: {
		width: 44,
		height: 44,
		borderRadius: 12,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(255,255,255,0.08)",
	},
	icon: {
		fontSize: 22,
	},
	content: {
		flex: 1,
	},
	title: {
		fontSize: 12,
		fontWeight: "500",
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	value: {
		fontSize: 22,
		fontWeight: "700",
		marginTop: 2,
	},
});
