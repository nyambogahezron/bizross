import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { AppColors } from "@/constants/colors";

interface LoadingStateProps {
	message?: string;
}

export function LoadingState({ message = "Loading..." }: LoadingStateProps) {
	return (
		<View style={styles.container}>
			<ActivityIndicator size="large" color={AppColors.primary} />
			<ThemedText themeColor="textSecondary" style={styles.message}>
				{message}
			</ThemedText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 60,
		gap: 12,
	},
	message: {
		fontSize: 14,
	},
});
