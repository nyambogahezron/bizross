import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { LoyaltyInfo, UserProfile } from "@/types/user";

interface UserState {
	profile: UserProfile;
	loyalty: LoyaltyInfo;
	addLoyaltyPoints: (points: number) => void;
}

export const useUserStore = create<UserState>()(
	persist(
		(set) => ({
			profile: {
				id: "user-001",
				name: "Jane Muthoni",
				email: "jane.muthoni@email.com",
				phone: "+254 712 345 678",
				avatarInitials: "JM",
				memberSince: "2025-06-15",
			},
			loyalty: {
				points: 1250,
				tier: "Silver",
				nextTier: "Gold",
				pointsToNextTier: 750,
			},
			addLoyaltyPoints: (points) =>
				set((state) => {
					const newPoints = state.loyalty.points + points;
					let tier = state.loyalty.tier;
					let nextTier = state.loyalty.nextTier;
					let pointsToNextTier = state.loyalty.pointsToNextTier - points;

					if (newPoints >= 5000) {
						tier = "Platinum";
						nextTier = "Max";
						pointsToNextTier = 0;
					} else if (newPoints >= 2000) {
						tier = "Gold";
						nextTier = "Platinum";
						pointsToNextTier = 5000 - newPoints;
					} else if (newPoints >= 500) {
						tier = "Silver";
						nextTier = "Gold";
						pointsToNextTier = 2000 - newPoints;
					} else {
						tier = "Bronze";
						nextTier = "Silver";
						pointsToNextTier = 500 - newPoints;
					}

					return {
						loyalty: { points: newPoints, tier, nextTier, pointsToNextTier },
					};
				}),
		}),
		{
			name: "bizross-customer-user",
			storage: createJSONStorage(() => AsyncStorage),
		},
	),
);
