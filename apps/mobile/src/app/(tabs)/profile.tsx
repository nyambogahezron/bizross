import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { FadeInView } from "@/components/ui/fade-in-view";
import { AppColors } from "@/constants/colors";
import { useTheme } from "@/hooks/use-theme";
import { useOrderStore } from "@/stores/orderStore";
import { useUserStore } from "@/stores/userStore";
import { formatCurrency, formatDate } from "@/utils/helpers";

export default function ProfileScreen() {
	const theme = useTheme();
	const profile = useUserStore((s) => s.profile);
	const loyalty = useUserStore((s) => s.loyalty);
	const orders = useOrderStore((s) => s.orders);

	const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
	const tierProgress =
		loyalty.pointsToNextTier > 0
			? Math.min(
					1,
					1 -
						loyalty.pointsToNextTier /
							(loyalty.points + loyalty.pointsToNextTier),
				)
			: 1;

	const tierColors: Record<string, string> = {
		Bronze: "#CD7F32",
		Silver: "#C0C0C0",
		Gold: "#FFD700",
		Platinum: "#E5E4E2",
	};

	return (
		<ThemedView style={styles.container}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={styles.content}
			>
				<FadeInView delay={0} duration={400}>
					<View
						style={[styles.profileCard, { backgroundColor: AppColors.primary }]}
					>
						<View style={styles.avatar}>
							<ThemedText style={styles.avatarText}>
								{profile.avatarInitials}
							</ThemedText>
						</View>
						<ThemedText style={styles.profileName}>{profile.name}</ThemedText>
						<ThemedText style={styles.profileEmail}>{profile.email}</ThemedText>
						<ThemedText style={styles.profilePhone}>{profile.phone}</ThemedText>
					</View>
				</FadeInView>

				<FadeInView delay={100} duration={400}>
					<View
						style={[
							styles.loyaltyCard,
							{ backgroundColor: theme.backgroundElement },
						]}
					>
						<View style={styles.loyaltyHeader}>
							<ThemedText style={styles.loyaltyTitle}>
								Loyalty Points
							</ThemedText>
							<View
								style={[
									styles.tierBadge,
									{ backgroundColor: tierColors[loyalty.tier] ?? "#999" },
								]}
							>
								<ThemedText style={styles.tierText}>{loyalty.tier}</ThemedText>
							</View>
						</View>
						<ThemedText
							style={[styles.pointsValue, { color: AppColors.primary }]}
						>
							{loyalty.points.toLocaleString()} pts
						</ThemedText>
						{loyalty.nextTier !== "Max" && (
							<>
								<View style={styles.progressTrack}>
									<View
										style={[
											styles.progressBar,
											{
												width: `${tierProgress * 100}%`,
												backgroundColor: AppColors.primary,
											},
										]}
									/>
								</View>
								<ThemedText
									themeColor="textSecondary"
									style={styles.progressLabel}
								>
									{loyalty.pointsToNextTier} pts to {loyalty.nextTier}
								</ThemedText>
							</>
						)}
					</View>
				</FadeInView>

				<FadeInView delay={200} duration={400}>
					<View
						style={[
							styles.statsCard,
							{ backgroundColor: theme.backgroundElement },
						]}
					>
						<View style={styles.stat}>
							<Ionicons
								name="receipt-outline"
								size={22}
								color={AppColors.primary}
							/>
							<ThemedText style={styles.statValue}>{orders.length}</ThemedText>
							<ThemedText themeColor="textSecondary" style={styles.statLabel}>
								Orders
							</ThemedText>
						</View>
						<View
							style={[
								styles.statDivider,
								{ backgroundColor: theme.backgroundSelected },
							]}
						/>
						<View style={styles.stat}>
							<Ionicons
								name="wallet-outline"
								size={22}
								color={AppColors.accent}
							/>
							<ThemedText style={styles.statValue}>
								{formatCurrency(totalSpent)}
							</ThemedText>
							<ThemedText themeColor="textSecondary" style={styles.statLabel}>
								Total Spent
							</ThemedText>
						</View>
						<View
							style={[
								styles.statDivider,
								{ backgroundColor: theme.backgroundSelected },
							]}
						/>
						<View style={styles.stat}>
							<Ionicons
								name="calendar-outline"
								size={22}
								color={AppColors.info}
							/>
							<ThemedText style={styles.statValue}>
								{formatDate(profile.memberSince)}
							</ThemedText>
							<ThemedText themeColor="textSecondary" style={styles.statLabel}>
								Joined
							</ThemedText>
						</View>
					</View>
				</FadeInView>

				<FadeInView delay={300} duration={400}>
					<View
						style={[
							styles.menuCard,
							{ backgroundColor: theme.backgroundElement },
						]}
					>
						{[
							{
								icon: "notifications-outline",
								label: "Notifications",
								value: "On",
							},
							{ icon: "moon-outline", label: "Appearance", value: "System" },
							{
								icon: "help-circle-outline",
								label: "Help & Support",
								value: "",
							},
							{
								icon: "information-circle-outline",
								label: "About",
								value: "v1.0.0",
							},
						].map((item, i) => (
							<View
								key={item.label}
								style={[
									styles.menuRow,
									i > 0 && {
										borderTopWidth: 1,
										borderTopColor: theme.backgroundSelected,
									},
								]}
							>
								<View style={styles.menuLeft}>
									<Ionicons
										name={item.icon as keyof typeof Ionicons.glyphMap}
										size={20}
										color={theme.textSecondary}
									/>
									<ThemedText style={styles.menuLabel}>{item.label}</ThemedText>
								</View>
								<ThemedText themeColor="textSecondary" style={styles.menuValue}>
									{item.value}
								</ThemedText>
							</View>
						))}
					</View>
				</FadeInView>
			</ScrollView>
		</ThemedView>
	);
}

const styles = StyleSheet.create({
	container: { flex: 1 },
	content: { padding: 16, paddingBottom: 40 },
	profileCard: {
		borderRadius: 20,
		padding: 24,
		alignItems: "center",
		marginBottom: 16,
	},
	avatar: {
		width: 72,
		height: 72,
		borderRadius: 36,
		backgroundColor: "rgba(255,255,255,0.2)",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: 12,
	},
	avatarText: { color: "#FFF", fontSize: 26, fontWeight: "700" },
	profileName: {
		color: "#FFF",
		fontSize: 22,
		fontWeight: "700",
		marginBottom: 4,
	},
	profileEmail: {
		color: "rgba(255,255,255,0.8)",
		fontSize: 14,
		marginBottom: 2,
	},
	profilePhone: { color: "rgba(255,255,255,0.8)", fontSize: 14 },
	loyaltyCard: { borderRadius: 16, padding: 18, marginBottom: 16, gap: 10 },
	loyaltyHeader: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	loyaltyTitle: { fontSize: 16, fontWeight: "700" },
	tierBadge: { paddingHorizontal: 12, paddingVertical: 4, borderRadius: 20 },
	tierText: { color: "#1F2937", fontSize: 12, fontWeight: "700" },
	pointsValue: { fontSize: 32, fontWeight: "800" },
	progressTrack: {
		height: 8,
		borderRadius: 4,
		backgroundColor: "rgba(13,148,136,0.15)",
		overflow: "hidden",
	},
	progressBar: { height: "100%", borderRadius: 4 },
	progressLabel: { fontSize: 13, marginTop: 2 },
	statsCard: {
		flexDirection: "row",
		borderRadius: 16,
		padding: 18,
		marginBottom: 16,
	},
	stat: { flex: 1, alignItems: "center", gap: 6 },
	statDivider: { width: 1, marginVertical: 4 },
	statValue: { fontSize: 14, fontWeight: "700" },
	statLabel: { fontSize: 11 },
	menuCard: { borderRadius: 16, overflow: "hidden" },
	menuRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 14,
	},
	menuLeft: { flexDirection: "row", alignItems: "center", gap: 12 },
	menuLabel: { fontSize: 15, fontWeight: "500" },
	menuValue: { fontSize: 13 },
});
