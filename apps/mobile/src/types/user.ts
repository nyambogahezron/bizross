export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatarInitials: string;
  memberSince: string;
}

export interface LoyaltyInfo {
  points: number;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  nextTier: string;
  pointsToNextTier: number;
}
