export const AppColors = {
  primary: '#0D9488',
  primaryLight: '#5EEAD4',
  primaryDark: '#115E59',

  accent: '#F59E0B',
  accentLight: '#FEF3C7',

  success: '#10B981',
  successLight: '#D1FAE5',
  successDark: '#065F46',

  warning: '#F59E0B',
  warningLight: '#FEF3C7',
  warningDark: '#92400E',

  danger: '#EF4444',
  dangerLight: '#FEE2E2',
  dangerDark: '#991B1B',

  info: '#3B82F6',
  infoLight: '#DBEAFE',

  muted: '#9CA3AF',
  mutedLight: '#F3F4F6',

  card: { light: '#FFFFFF', dark: '#1F2937' },
  surface: { light: '#F9FAFB', dark: '#111827' },
  border: { light: '#E5E7EB', dark: '#374151' },
} as const;

export const OrderStatusColors: Record<string, { bg: string; text: string }> = {
  confirmed: { bg: '#DBEAFE', text: '#1E40AF' },
  preparing: { bg: '#FEF3C7', text: '#92400E' },
  ready: { bg: '#D1FAE5', text: '#065F46' },
  completed: { bg: '#E0E7FF', text: '#3730A3' },
  cancelled: { bg: '#FEE2E2', text: '#991B1B' },
};

export const CategoryEmojis: Record<string, string> = {
  Groceries: '🛒',
  Beverages: '🥤',
  Dairy: '🥛',
  Snacks: '🍿',
  Household: '🏠',
  'Personal Care': '🧴',
};
