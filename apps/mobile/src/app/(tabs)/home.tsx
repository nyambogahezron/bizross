import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import { CategoryChip } from "@/components/cards/category-chip";
import { ProductCard } from "@/components/cards/product-card";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeInView } from "@/components/ui/fade-in-view";
import { SearchBar } from "@/components/ui/search-bar";
import { AppColors } from "@/constants/colors";
import { useProductStore } from "@/stores/productStore";
import { useUserStore } from "@/stores/userStore";

export default function HomeScreen() {
	const router = useRouter();
	const allProducts = useProductStore((s) => s.products);
	const categories = useProductStore((s) => s.categories);
	const searchQuery = useProductStore((s) => s.searchQuery);
	const selectedCategory = useProductStore((s) => s.selectedCategory);
	const setSearchQuery = useProductStore((s) => s.setSearchQuery);
	const setSelectedCategory = useProductStore((s) => s.setSelectedCategory);
	const userName = useUserStore((s) => s.profile.name);

	const products = useMemo(() => {
		let filtered = allProducts;
		if (selectedCategory) {
			filtered = filtered.filter((p) => p.category === selectedCategory);
		}
		if (searchQuery.trim()) {
			const q = searchQuery.toLowerCase();
			filtered = filtered.filter(
				(p) =>
					p.name.toLowerCase().includes(q) ||
					p.category.toLowerCase().includes(q),
			);
		}
		return filtered;
	}, [allProducts, selectedCategory, searchQuery]);

	const firstName = userName.split(" ")[0];

	return (
		<ThemedView style={styles.container}>
			<FlatList
				data={products}
				keyExtractor={(item) => item.id}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.listContent}
				columnWrapperStyle={styles.row}
				ListHeaderComponent={
					<View>
						<FadeInView delay={0} duration={500} translateY={-10}>
							<ThemedText style={styles.greeting}>
								Hi, {firstName}! 👋
							</ThemedText>
							<ThemedText themeColor="textSecondary" style={styles.subtitle}>
								What would you like today?
							</ThemedText>
						</FadeInView>

						<SearchBar
							value={searchQuery}
							onChangeText={setSearchQuery}
							placeholder="Search products..."
						/>

						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={styles.categories}
						>
							<CategoryChip
								category="All"
								isSelected={selectedCategory === null}
								onPress={() => setSelectedCategory(null)}
							/>
							{categories.map((cat) => (
								<CategoryChip
									key={cat}
									category={cat}
									isSelected={selectedCategory === cat}
									onPress={() =>
										setSelectedCategory(selectedCategory === cat ? null : cat)
									}
								/>
							))}
						</ScrollView>

						<View style={styles.sectionHeader}>
							<ThemedText style={styles.sectionTitle}>
								{selectedCategory ?? "All Products"}
							</ThemedText>
							<ThemedText themeColor="textSecondary" style={styles.itemCount}>
								{products.length} items
							</ThemedText>
						</View>
					</View>
				}
				renderItem={({ item, index }) => (
					<ProductCard
						product={item}
						index={index}
						onPress={() => router.push(`/products/${item.id}`)}
					/>
				)}
				ListEmptyComponent={
					<EmptyState
						icon="🔍"
						title="No Products Found"
						message="Try a different search or category."
					/>
				}
			/>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 56,
	},
	listContent: {
		paddingHorizontal: 11,
		paddingBottom: 32,
	},
	row: {
		justifyContent: "space-between",
	},
	greeting: {
		fontSize: 28,
		fontWeight: "700",
		marginBottom: 4,
		paddingHorizontal: 5,
	},
	subtitle: {
		fontSize: 15,
		marginBottom: 16,
		paddingHorizontal: 5,
	},
	categories: {
		marginBottom: 18,
		paddingHorizontal: 5,
	},
	sectionHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "baseline",
		paddingHorizontal: 5,
		marginBottom: 8,
	},
	sectionTitle: {
		fontSize: 18,
		fontWeight: "700",
	},
	itemCount: {
		fontSize: 13,
		fontWeight: "500",
	},
});
