import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { EmptyState } from "@/components/ui/empty-state";
import { FadeInView } from "@/components/ui/fade-in-view";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { AppColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useCartStore } from "@/stores/cartStore";
import { useProductStore } from "@/stores/productStore";
import { formatCurrency } from "@/utils/helpers";

export default function ProductDetailScreen() {
	const { id } = useLocalSearchParams<{ id: string }>();
	const router = useRouter();
	const theme = useTheme();
	const products = useProductStore((s) => s.products);
	const addItem = useCartStore((s) => s.addItem);
	const [quantity, setQuantity] = useState(1);
	const [added, setAdded] = useState(false);

	const product = products.find((p) => p.id === id);

	if (!product) {
		return (
			<ThemedView style={styles.container}>
				<Stack.Screen options={{ title: "Product" }} />
				<EmptyState
					icon="🔍"
					title="Product Not Found"
					message="This product doesn't exist."
				/>
			</ThemedView>
		);
	}

	const handleAddToCart = () => {
		for (let i = 0; i < quantity; i++) {
			addItem({
				productId: product.id,
				name: product.name,
				price: product.price,
				image: product.image,
			});
		}
		setAdded(true);
		setTimeout(() => setAdded(false), 2000);
	};

	return (
		<ThemedView style={styles.container}>
			<Stack.Screen options={{ title: product.name }} />
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.content}
			>
				<FadeInView delay={0} duration={400}>
					<View
						style={[
							styles.imageBox,
							{ backgroundColor: theme.backgroundElement },
						]}
					>
						<ThemedText style={styles.emoji}>{product.image}</ThemedText>
					</View>
				</FadeInView>

				<FadeInView delay={100} duration={400}>
					<View style={styles.infoSection}>
						<View style={styles.titleRow}>
							<ThemedText style={styles.productName}>{product.name}</ThemedText>
							<View style={styles.ratingBox}>
								<ThemedText style={styles.star}>⭐</ThemedText>
								<ThemedText style={styles.rating}>{product.rating}</ThemedText>
							</View>
						</View>
						<ThemedText style={[styles.category, { color: AppColors.primary }]}>
							{product.category}
						</ThemedText>
						<ThemedText style={[styles.price, { color: AppColors.primary }]}>
							{formatCurrency(product.price)}
						</ThemedText>
					</View>
				</FadeInView>

				<FadeInView delay={200} duration={400}>
					<View
						style={[
							styles.descCard,
							{ backgroundColor: theme.backgroundElement },
						]}
					>
						<ThemedText style={styles.descTitle}>Description</ThemedText>
						<ThemedText themeColor="textSecondary" style={styles.descText}>
							{product.description}
						</ThemedText>
					</View>
				</FadeInView>

				<FadeInView delay={300} duration={400}>
					<View style={styles.qtySection}>
						<ThemedText style={styles.qtyLabel}>Quantity</ThemedText>
						<QuantitySelector
							quantity={quantity}
							onIncrement={() => setQuantity((q) => q + 1)}
							onDecrement={() => setQuantity((q) => Math.max(1, q - 1))}
							size="large"
						/>
					</View>
				</FadeInView>
			</ScrollView>

			<View
				style={[styles.footer, { backgroundColor: theme.backgroundElement }]}
			>
				<View>
					<ThemedText themeColor="textSecondary" style={styles.totalLabel}>
						Total
					</ThemedText>
					<ThemedText style={styles.totalPrice}>
						{formatCurrency(product.price * quantity)}
					</ThemedText>
				</View>
				<TouchableOpacity
					style={[
						styles.addBtn,
						added && { backgroundColor: AppColors.success },
					]}
					onPress={handleAddToCart}
					activeOpacity={0.8}
				>
					<ThemedText style={styles.addBtnText}>
						{added ? "✓ Added!" : "Add to Cart"}
					</ThemedText>
				</TouchableOpacity>
			</View>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	content: { paddingBottom: 120 },
	imageBox: {
		width: "100%",
		aspectRatio: 1.2,
		justifyContent: "center",
		alignItems: "center",
	},
	emoji: { fontSize: 100 },
	infoSection: { padding: 20, gap: 6 },
	titleRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-start",
	},
	productName: { fontSize: 24, fontWeight: "700", flex: 1, marginRight: 12 },
	ratingBox: { flexDirection: "row", alignItems: "center", gap: 4 },
	star: { fontSize: 16 },
	rating: { fontSize: 16, fontWeight: "600" },
	category: { fontSize: 14, fontWeight: "600" },
	price: { fontSize: 28, fontWeight: "800", marginTop: 4 },
	descCard: { marginHorizontal: 20, borderRadius: 16, padding: 18, gap: 8 },
	descTitle: { fontSize: 16, fontWeight: "700" },
	descText: { fontSize: 14, lineHeight: 22 },
	qtySection: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		marginTop: 8,
	},
	qtyLabel: { fontSize: 16, fontWeight: "700" },
	footer: {
		position: "absolute",
		bottom: 0,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 20,
		paddingBottom: 34,
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
	},
	totalLabel: { fontSize: 13 },
	totalPrice: { fontSize: 22, fontWeight: "800" },
	addBtn: {
		backgroundColor: AppColors.primary,
		borderRadius: 16,
		paddingVertical: 16,
		paddingHorizontal: 32,
	},
	addBtnText: { color: "#FFFFFF", fontSize: 16, fontWeight: "700" },
});
