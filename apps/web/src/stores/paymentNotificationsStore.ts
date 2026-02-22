'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateId } from '@/lib/utils';

export type MobileMoneyProvider = 'mpesa' | 'airtel' | 'tigo' | 'cash' | 'card';

export type PaymentStatus = 'pending' | 'applied' | 'expired';

export interface IncomingPayment {
  id: string;
  amount: number;
  senderName: string;
  senderPhone: string;
  reference: string; // e.g. QJL2X3KK9
  provider: MobileMoneyProvider;
  receivedAt: string;
  status: PaymentStatus;
  appliedToOrder?: string;
}

interface PaymentNotificationsStore {
  payments: IncomingPayment[];
  selectedPaymentId: string | null;

  // Actions
  addPayment: (p: Omit<IncomingPayment, 'id' | 'receivedAt' | 'status'>) => void;
  selectPayment: (id: string | null) => void;
  markApplied: (id: string, orderId: string) => void;
  removePayment: (id: string) => void;
  simulateIncoming: () => void;

  // Computed
  getSelectedPayment: () => IncomingPayment | null;
  getPendingPayments: () => IncomingPayment[];
}

const DEMO_NAMES = ['Alice Wanjiru', 'Brian Otieno', 'Carol Njoroge', 'David Kamau', 'Eve Muthoni', 'Frank Kimani'];
const DEMO_PHONES = ['+254712345678', '+254720987654', '+254733456789', '+254745678901', '+254756789012'];
const DEMO_AMOUNTS = [1.20, 2.50, 5.00, 8.40, 10.15, 12.00, 3.46, 6.80, 9.83, 15.00, 20.00];

function makeRef(provider: MobileMoneyProvider) {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const len = provider === 'mpesa' ? 10 : 8;
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
}

const SEED_PAYMENTS: IncomingPayment[] = [
  {
    id: 'pay-1',
    amount: 3.46,
    senderName: 'Alice Wanjiru',
    senderPhone: '+254712345678',
    reference: 'QJL2X3KK9A',
    provider: 'mpesa',
    receivedAt: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: 'pay-2',
    amount: 12.00,
    senderName: 'Brian Otieno',
    senderPhone: '+254720987654',
    reference: 'PLK9MNBV3C',
    provider: 'airtel',
    receivedAt: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    status: 'pending',
  },
  {
    id: 'pay-3',
    amount: 5.00,
    senderName: 'Eve Muthoni',
    senderPhone: '+254756789012',
    reference: 'RQZ7WXTB2Y',
    provider: 'mpesa',
    receivedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    status: 'pending',
  },
];

export const usePaymentNotificationsStore = create<PaymentNotificationsStore>()(
  persist(
    (set, get) => ({
      payments: SEED_PAYMENTS,
      selectedPaymentId: null,

      addPayment: (p) => {
        const payment: IncomingPayment = {
          ...p,
          id: generateId(),
          receivedAt: new Date().toISOString(),
          status: 'pending',
        };
        set((s) => ({ payments: [payment, ...s.payments] }));
      },

      selectPayment: (id) => set({ selectedPaymentId: id }),

      markApplied: (id, orderId) => {
        set((s) => ({
          payments: s.payments.map((p) =>
            p.id === id ? { ...p, status: 'applied', appliedToOrder: orderId } : p
          ),
          selectedPaymentId: null,
        }));
      },

      removePayment: (id) => {
        set((s) => ({
          payments: s.payments.filter((p) => p.id !== id),
          selectedPaymentId: s.selectedPaymentId === id ? null : s.selectedPaymentId,
        }));
      },

      simulateIncoming: () => {
        const providers: MobileMoneyProvider[] = ['mpesa', 'airtel', 'mpesa', 'mpesa', 'tigo'];
        const provider = providers[Math.floor(Math.random() * providers.length)];
        const name = DEMO_NAMES[Math.floor(Math.random() * DEMO_NAMES.length)];
        const amount = DEMO_AMOUNTS[Math.floor(Math.random() * DEMO_AMOUNTS.length)];
        get().addPayment({
          amount,
          senderName: name,
          senderPhone: DEMO_PHONES[Math.floor(Math.random() * DEMO_PHONES.length)],
          reference: makeRef(provider),
          provider,
        });
      },

      getSelectedPayment: () => {
        const { payments, selectedPaymentId } = get();
        if (!selectedPaymentId) return null;
        return payments.find((p) => p.id === selectedPaymentId) ?? null;
      },

      getPendingPayments: () => get().payments.filter((p) => p.status === 'pending'),
    }),
    { name: 'pos-payment-notifications' }
  )
);
