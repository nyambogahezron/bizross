import React, { useCallback, useMemo, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { CustomerCard } from "@/components/cards/customer-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchBar } from "@/components/ui/search-bar";
import { AppColors } from "@/constants/colors";
import { useCustomerStore } from "@/stores/customerStore";

export default function CustomersScreen() {
	const allCustomers = useCustomerStore((s) => s.customers);
	const searchQuery = useCustomerStore((s) => s.searchQuery);
	const setSearchQuery = useCustomerStore((s) => s.setSearchQuery);
	const [refreshing, setRefreshing] = useState(false);

	const customers = useMemo(() => {
		if (!searchQuery.trim()) return allCustomers;
		const q = searchQuery.toLowerCase();
		return allCustomers.filter(
			(c) =>
				c.name.toLowerCase().includes(q) ||
				c.phone.includes(q) ||
				c.email.toLowerCase().includes(q),
		);
	}, [allCustomers, searchQuery]);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 800);
	}, []);

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText style={styles.title}>Customers</ThemedText>
				<ThemedText themeColor="textSecondary" style={styles.count}>
					{customers.length} total
				</ThemedText>
			</View>

			<View style={styles.searchContainer}>
				<SearchBar
					value={searchQuery}
					onChangeText={setSearchQuery}
					placeholder="Search by name, phone, email..."
				/>
			</View>

			<FlatList
				data={customers}
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
					<CustomerCard customer={item} index={index} />
				)}
				ListEmptyComponent={
					<EmptyState
						icon="👥"
						title="No Customers Found"
						message={
							searchQuery
								? "Try adjusting your search."
								: "Your customer list is empty."
						}
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
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
		paddingHorizontal: 16,
		paddingTop: 16,
		paddingBottom: 4,
	},
	title: {
		fontSize: 28,
		fontWeight: "700",
	},
	count: {
		fontSize: 14,
		fontWeight: "500",
	},
	searchContainer: {
		paddingHorizontal: 16,
		paddingTop: 8,
	},
	listContent: {
		paddingHorizontal: 16,
		paddingBottom: 32,
	},
});
