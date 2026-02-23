import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { InventoryCard } from "@/components/cards/inventory-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchBar } from "@/components/ui/search-bar";
import { AppColors } from "@/constants/colors";
import { useProductStore } from "@/stores/productStore";
import { getStockLevel } from "@/utils/helpers";

export default function InventoryScreen() {
	const products = useProductStore((s) => s.products);
	const adjustStock = useProductStore((s) => s.adjustStock);
	const [refreshing, setRefreshing] = useState(false);
	const [filter, setFilter] = useState("");

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 800);
	}, []);

	const filteredProducts = filter
		? products.filter((p) => {
				const q = filter.toLowerCase();
				return (
					p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
				);
			})
		: products;

	const lowStockCount = products.filter((p) => p.stock <= 5).length;
	const warningCount = products.filter(
		(p) => p.stock > 5 && p.stock <= 20,
	).length;

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText style={styles.title}>Inventory</ThemedText>
				<View style={styles.summaryRow}>
					<View
						style={[
							styles.summaryChip,
							{ backgroundColor: AppColors.dangerLight },
						]}
					>
						<ThemedText
							style={[styles.summaryText, { color: AppColors.danger }]}
						>
							{lowStockCount} critical
						</ThemedText>
					</View>
					<View
						style={[
							styles.summaryChip,
							{ backgroundColor: AppColors.warningLight },
						]}
					>
						<ThemedText
							style={[styles.summaryText, { color: AppColors.warning }]}
						>
							{warningCount} low
						</ThemedText>
					</View>
				</View>
			</View>

			<View style={styles.searchContainer}>
				<SearchBar
					value={filter}
					onChangeText={setFilter}
					placeholder="Search inventory..."
				/>
			</View>

			<FlatList
				data={filteredProducts}
				keyExtractor={(item) => item.id}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				refreshControl={
					<RefreshControl
						refreshing={refreshing}
						onRefresh={onRefresh}
						tintColor={AppColors.primary}
					/>
				}
				renderItem={({ item, index }) => (
					<InventoryCard
						product={item}
						index={index}
						onAdjustStock={adjustStock}
					/>
				)}
				ListEmptyComponent={
					<EmptyState
						icon="📊"
						title="No Inventory Items"
						message="Your inventory is empty. Add products to track stock."
					/>
				}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	header: {
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 4,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 10,
	},
	summaryRow: {
		flexDirection: "row",
		gap: 8,
	},
	summaryChip: {
		paddingHorizontal: 12,
		paddingVertical: 6,
		borderRadius: 20,
	},
	summaryText: {
		fontSize: 13,
		fontWeight: "600",
	},
	searchContainer: {
		paddingHorizontal: 16,
		paddingTop: 12,
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 32,
	},
});
