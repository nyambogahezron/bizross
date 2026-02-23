import React, { useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from "react-native-reanimated";
import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import type { Product, ProductCategory } from "@/types/product";

interface ProductFormProps {
	visible: boolean;
	onClose: () => void;
	onSubmit: (product: Omit<Product, "id" | "createdAt">) => void;
	editProduct?: Product | null;
}

const categories: ProductCategory[] = [
	"Groceries",
	"Beverages",
	"Dairy",
	"Snacks",
	"Household",
	"Personal Care",
];

export function ProductForm({
	visible,
	onClose,
	onSubmit,
	editProduct,
}: ProductFormProps) {
	const theme = useTheme();
	const [name, setName] = useState("");
	const [price, setPrice] = useState("");
	const [sku, setSku] = useState("");
	const [stock, setStock] = useState("");
	const [category, setCategory] = useState<ProductCategory>("Groceries");

	const translateY = useSharedValue(300);
	const opacity = useSharedValue(0);

	useEffect(() => {
		if (visible) {
			translateY.value = withTiming(0, { duration: 350 });
			opacity.value = withTiming(1, { duration: 350 });
		} else {
			translateY.value = withTiming(300, { duration: 250 });
			opacity.value = withTiming(0, { duration: 250 });
		}
	}, [visible, translateY, opacity]);

	useEffect(() => {
		if (editProduct) {
			setName(editProduct.name);
			setPrice(editProduct.price.toString());
			setSku(editProduct.sku);
			setStock(editProduct.stock.toString());
			setCategory(editProduct.category as ProductCategory);
		} else {
			setName("");
			setPrice("");
			setSku("");
			setStock("");
			setCategory("Groceries");
		}
	}, [editProduct, visible]);

	const handleSubmit = () => {
		if (!name.trim() || !price.trim() || !sku.trim()) return;
		onSubmit({
			name: name.trim(),
			price: parseFloat(price) || 0,
			sku: sku.trim(),
			stock: parseInt(stock) || 0,
			category,
		});
		onClose();
	};

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translateY.value }],
		opacity: opacity.value,
	}));

	const inputStyle = [
		styles.input,
		{ backgroundColor: theme.backgroundSelected, color: theme.text },
	];

	return (
		<Modal visible={visible} animationType="none" transparent>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				style={styles.overlay}
			>
				<Animated.View
					style={[
						styles.container,
						{ backgroundColor: theme.backgroundElement },
						animatedStyle,
					]}
				>
					<View style={styles.handle} />
					<View style={styles.header}>
						<ThemedText style={styles.title}>
							{editProduct ? "Edit Product" : "Add Product"}
						</ThemedText>
						<TouchableOpacity onPress={onClose} hitSlop={12}>
							<ThemedText style={[styles.closeBtn, { color: AppColors.muted }]}>
								✕
							</ThemedText>
						</TouchableOpacity>
					</View>

					<ScrollView showsVerticalScrollIndicator={false} style={styles.form}>
						<ThemedText themeColor="textSecondary" style={styles.label}>
							Product Name
						</ThemedText>
						<TextInput
							style={inputStyle}
							value={name}
							onChangeText={setName}
							placeholder="e.g. White Sugar (1kg)"
							placeholderTextColor={theme.textSecondary}
						/>

						<ThemedText themeColor="textSecondary" style={styles.label}>
							Price (KSH)
						</ThemedText>
						<TextInput
							style={inputStyle}
							value={price}
							onChangeText={setPrice}
							placeholder="e.g. 180"
							placeholderTextColor={theme.textSecondary}
							keyboardType="numeric"
						/>

						<ThemedText themeColor="textSecondary" style={styles.label}>
							SKU
						</ThemedText>
						<TextInput
							style={inputStyle}
							value={sku}
							onChangeText={setSku}
							placeholder="e.g. SUG-001"
							placeholderTextColor={theme.textSecondary}
							autoCapitalize="characters"
						/>

						<ThemedText themeColor="textSecondary" style={styles.label}>
							Stock Quantity
						</ThemedText>
						<TextInput
							style={inputStyle}
							value={stock}
							onChangeText={setStock}
							placeholder="e.g. 50"
							placeholderTextColor={theme.textSecondary}
							keyboardType="numeric"
						/>

						<ThemedText themeColor="textSecondary" style={styles.label}>
							Category
						</ThemedText>
						<View style={styles.categoryGrid}>
							{categories.map((cat) => (
								<TouchableOpacity
									key={cat}
									style={[
										styles.categoryChip,
										{
											backgroundColor:
												category === cat
													? AppColors.primary
													: theme.backgroundSelected,
										},
									]}
									onPress={() => setCategory(cat)}
									activeOpacity={0.7}
								>
									<ThemedText
										style={[
											styles.categoryText,
											{
												color:
													category === cat ? "#FFFFFF" : theme.textSecondary,
											},
										]}
									>
										{cat}
									</ThemedText>
								</TouchableOpacity>
							))}
						</View>

						<TouchableOpacity
							style={styles.submitBtn}
							onPress={handleSubmit}
							activeOpacity={0.8}
						>
							<ThemedText style={styles.submitText}>
								{editProduct ? "Update Product" : "Add Product"}
							</ThemedText>
						</TouchableOpacity>
					</ScrollView>
				</Animated.View>
			</KeyboardAvoidingView>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	container: {
		borderTopLeftRadius: 24,
		borderTopRightRadius: 24,
		paddingHorizontal: 20,
		paddingBottom: 34,
		maxHeight: "90%",
	},
	handle: {
		width: 40,
		height: 4,
		borderRadius: 2,
		backgroundColor: "#9CA3AF",
		alignSelf: "center",
		marginTop: 12,
		marginBottom: 16,
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 20,
	},
	title: {
		fontSize: 20,
		fontWeight: "700",
	},
	closeBtn: {
		fontSize: 20,
		fontWeight: "400",
	},
	form: {
		flexGrow: 0,
	},
	label: {
		fontSize: 13,
		fontWeight: "600",
		marginBottom: 6,
		marginTop: 12,
		textTransform: "uppercase",
		letterSpacing: 0.5,
	},
	input: {
		borderRadius: 12,
		paddingHorizontal: 14,
		paddingVertical: 12,
		fontSize: 16,
	},
	categoryGrid: {
		flexDirection: "row",
		flexWrap: "wrap",
		gap: 8,
	},
	categoryChip: {
		paddingHorizontal: 14,
		paddingVertical: 8,
		borderRadius: 20,
	},
	categoryText: {
		fontSize: 13,
		fontWeight: "600",
	},
	submitBtn: {
		backgroundColor: AppColors.primary,
		borderRadius: 14,
		paddingVertical: 16,
		alignItems: "center",
		marginTop: 24,
		marginBottom: 8,
	},
	submitText: {
		color: "#FFFFFF",
		fontSize: 16,
		fontWeight: "700",
	},
});
