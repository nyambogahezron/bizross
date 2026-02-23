import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { useTheme } from "@/hooks/use-theme";

interface SearchBarProps {
	value: string;
	onChangeText: (text: string) => void;
	placeholder?: string;
}

export function SearchBar({
	value,
	onChangeText,
	placeholder = "Search...",
}: SearchBarProps) {
	const theme = useTheme();

	return (
		<View
			style={[styles.container, { backgroundColor: theme.backgroundElement }]}
		>
			<Ionicons name="search" size={18} color={theme.textSecondary} />
			<TextInput
				style={[styles.input, { color: theme.text }]}
				value={value}
				onChangeText={onChangeText}
				placeholder={placeholder}
				placeholderTextColor={theme.textSecondary}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 14,
		paddingHorizontal: 14,
		paddingVertical: 10,
		gap: 10,
		marginBottom: 12,
	},
	input: {
		flex: 1,
		fontSize: 16,
	},
});
