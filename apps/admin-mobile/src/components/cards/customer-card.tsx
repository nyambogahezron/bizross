import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { FadeInView } from "@/components/ui/fade-in-view";
import { useTheme } from "@/hooks/use-theme";
import type { Customer } from "@/types/customer";
import { formatCurrency } from "@/utils/helpers";

interface CustomerCardProps {
	customer: Customer;
	index?: number;
}

export function CustomerCard({ customer, index = 0 }: CustomerCardProps) {
	const theme = useTheme();

	return (
		<FadeInView delay={index * 60} duration={400}>
			<View style={[styles.card, { backgroundColor: theme.backgroundElement }]}>
				<View style={styles.avatar}>
					<ThemedText style={styles.avatarText}>
						{customer.name
							.split(" ")
							.map((n) => n[0])
							.join("")}
					</ThemedText>
				</View>
				<View style={styles.info}>
					<ThemedText style={styles.name}>{customer.name}</ThemedText>
					<View style={styles.phoneRow}>
						<Ionicons
							name="call-outline"
							size={13}
							color={theme.textSecondary}
						/>
						<ThemedText themeColor="textSecondary" style={styles.phone}>
							{customer.phone}
						</ThemedText>
					</View>
				</View>
				<View style={styles.stats}>
					<ThemedText style={styles.statValue}>
						{customer.ordersCount}
					</ThemedText>
					<ThemedText themeColor="textSecondary" style={styles.statLabel}>
						orders
					</ThemedText>
					<ThemedText style={[styles.statValue, { marginTop: 6 }]}>
						{formatCurrency(customer.totalSpent)}
					</ThemedText>
					<ThemedText themeColor="textSecondary" style={styles.statLabel}>
						spent
					</ThemedText>
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
		padding: 16,
		marginBottom: 10,
		gap: 14,
	},
	avatar: {
		width: 48,
		height: 48,
		borderRadius: 24,
		backgroundColor: "#4F46E5",
		justifyContent: "center",
		alignItems: "center",
	},
	avatarText: {
		color: "#FFFFFF",
		fontWeight: "700",
		fontSize: 16,
	},
	info: {
		flex: 1,
	},
	name: {
		fontSize: 15,
		fontWeight: "600",
	},
	phoneRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 4,
		marginTop: 3,
	},
	phone: {
		fontSize: 13,
	},
	stats: {
		alignItems: "flex-end",
	},
	statValue: {
		fontSize: 14,
		fontWeight: "700",
	},
	statLabel: {
		fontSize: 11,
	},
});
