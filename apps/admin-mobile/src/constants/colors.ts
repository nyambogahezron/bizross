
export const AppColors = {
  primary: '#4F46E5',
  primaryLight: '#818CF8',
  primaryDark: '#3730A3',

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
  infoDark: '#1E40AF',

  muted: '#9CA3AF',
  mutedLight: '#F3F4F6',
  mutedDark: '#4B5563',

  card: {
    light: '#FFFFFF',
    dark: '#1F2937',
  },

  surface: {
    light: '#F9FAFB',
    dark: '#111827',
  },

  border: {
    light: '#E5E7EB',
    dark: '#374151',
  },
} as const;

/**
 * Status-specific colors for orders
 */
export const OrderStatusColors: Record<string, { bg: string; text: string }> = {
  pending: { bg: '#FEF3C7', text: '#92400E' },
  processing: { bg: '#DBEAFE', text: '#1E40AF' },
  completed: { bg: '#D1FAE5', text: '#065F46' },
  cancelled: { bg: '#FEE2E2', text: '#991B1B' },
};

/**
 * Stock level thresholds and colors
 */
export const StockLevels = {
  critical: { max: 5, color: '#EF4444', bg: '#FEE2E2', label: 'Critical' },
  low: { max: 20, color: '#F59E0B', bg: '#FEF3C7', label: 'Low' },
  good: { max: Infinity, color: '#10B981', bg: '#D1FAE5', label: 'In Stock' },
} as const;
