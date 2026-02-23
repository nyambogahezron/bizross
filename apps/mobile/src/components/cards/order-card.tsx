import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { Badge } from "@/components/ui/badge";
import { FadeInView } from "@/components/ui/fade-in-view";
import { useTheme } from "@/hooks/use-theme";
import type { Order } from "@/types/order";
import {
	formatCurrency,
	formatDate,
	getOrderStatusColor,
} from "@/utils/helpers";

interface OrderCardProps {
	order: Order;
	index?: number;
	onPress: () => void;
}

export function OrderCard({ order, index = 0, onPress }: OrderCardProps) {
	const theme = useTheme();
	const statusColor = getOrderStatusColor(order.status);

	return (
		<FadeInView delay={index * 60} duration={350}>
			<TouchableOpacity
				style={[styles.card, { backgroundColor: theme.backgroundElement }]}
				onPress={onPress}
				activeOpacity={0.7}
			>
				<View style={styles.topRow}>
					<View>
						<ThemedText style={styles.orderId}>{order.id}</ThemedText>
						<ThemedText themeColor="textSecondary" style={styles.date}>
							{formatDate(order.date)}
						</ThemedText>
					</View>
					<Badge
						label={order.status}
						bgColor={statusColor.bg}
						textColor={statusColor.text}
					/>
				</View>
				<View style={styles.bottomRow}>
					<ThemedText themeColor="textSecondary" style={styles.items}>
						{order.items.length} item{order.items.length !== 1 ? "s" : ""}
					</ThemedText>
					<ThemedText style={styles.total}>
						{formatCurrency(order.total)}
					</ThemedText>
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
	orderId: {
		fontSize: 15,
		fontWeight: "700",
	},
	date: {
		fontSize: 13,
		marginTop: 2,
	},
	bottomRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	items: {
		fontSize: 13,
	},
	total: {
		fontSize: 16,
		fontWeight: "700",
	},
});
