import React, { useCallback, useMemo, useState } from "react";
import {
	Alert,
	FlatList,
	RefreshControl,
	StyleSheet,
	View,
} from "react-native";
import { ProductCard } from "@/components/cards/product-card";
import { ProductForm } from "@/components/forms/product-form";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { EmptyState } from "@/components/ui/empty-state";
import { FAB } from "@/components/ui/fab";
import { SearchBar } from "@/components/ui/search-bar";
import { AppColors } from "@/constants/colors";
import { useProductStore } from "@/stores/productStore";
import type { Product } from "@/types/product";

export default function ProductsScreen() {
	const allProducts = useProductStore((s) => s.products);
	const searchQuery = useProductStore((s) => s.searchQuery);
	const setSearchQuery = useProductStore((s) => s.setSearchQuery);
	const addProduct = useProductStore((s) => s.addProduct);
	const updateProduct = useProductStore((s) => s.updateProduct);
	const deleteProduct = useProductStore((s) => s.deleteProduct);

	const products = useMemo(() => {
		if (!searchQuery.trim()) return allProducts;
		const q = searchQuery.toLowerCase();
		return allProducts.filter(
			(p) =>
				p.name.toLowerCase().includes(q) ||
				p.sku.toLowerCase().includes(q) ||
				p.category.toLowerCase().includes(q),
		);
	}, [allProducts, searchQuery]);

	const [showForm, setShowForm] = useState(false);
	const [editProduct, setEditProduct] = useState<Product | null>(null);
	const [refreshing, setRefreshing] = useState(false);

	const onRefresh = useCallback(() => {
		setRefreshing(true);
		setTimeout(() => setRefreshing(false), 800);
	}, []);

	const handleAdd = () => {
		setEditProduct(null);
		setShowForm(true);
	};

	const handleEdit = (product: Product) => {
		setEditProduct(product);
		setShowForm(true);
	};

	const handleDelete = (product: Product) => {
		Alert.alert(
			"Delete Product",
			`Are you sure you want to delete "${product.name}"?`,
			[
				{ text: "Cancel", style: "cancel" },
				{
					text: "Delete",
					style: "destructive",
					onPress: () => deleteProduct(product.id),
				},
			],
		);
	};

	const handleSubmit = (data: Omit<Product, "id" | "createdAt">) => {
		if (editProduct) {
			updateProduct(editProduct.id, data);
		} else {
			addProduct(data);
		}
	};

	return (
		<ThemedView style={styles.container}>
			<View style={styles.header}>
				<ThemedText style={styles.title}>Products</ThemedText>
				<ThemedText themeColor="textSecondary" style={styles.count}>
					{products.length} items
				</ThemedText>
			</View>

			<View style={styles.searchContainer}>
				<SearchBar
					value={searchQuery}
					onChangeText={setSearchQuery}
					placeholder="Search products, SKU, category..."
				/>
			</View>

			<FlatList
				data={products}
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
					<ProductCard
						product={item}
						index={index}
						onPress={() => handleEdit(item)}
						onDelete={() => handleDelete(item)}
					/>
				)}
				ListEmptyComponent={
					<EmptyState
						icon="📦"
						title="No Products Found"
						message={
							searchQuery
								? "Try adjusting your search."
								: "Add your first product to get started."
						}
					/>
				}
			/>

			<FAB onPress={handleAdd} />

			<ProductForm
				visible={showForm}
				onClose={() => setShowForm(false)}
				onSubmit={handleSubmit}
				editProduct={editProduct}
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
		paddingBottom: 100,
	},
});
