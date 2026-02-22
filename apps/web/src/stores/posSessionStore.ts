'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { generateId, generateOrderNumber } from '@/lib/utils';
import type { CartItem } from '@/types/cart';
import type { Product } from '@/types/product';

export interface PosSession {
  id: string;
  orderNumber: string;
  items: CartItem[];
  customerName?: string;
  createdAt: string;
  note?: string;
}

export const TAX_RATE = 0.08;

export function calcSubtotal(items: CartItem[]) {
  return items.reduce((s, i) => s + i.product.price * i.quantity, 0);
}

export function makeSession(customerName?: string): PosSession {
  return {
    id: generateId(),
    orderNumber: generateOrderNumber(),
    items: [],
    customerName,
    createdAt: new Date().toISOString(),
  };
}

interface PosSessionStore {
  sessions: PosSession[];
  activeSessionId: string;

  createSession: (customerName?: string) => void;
  activateSession: (id: string) => void;
  removeSession: (id: string) => void;

  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearActiveSession: () => void;

  getActiveSession: () => PosSession | undefined;
}

/** Ensures there is always at least one session and activeSessionId is valid */
function ensureValidState(sessions: PosSession[], activeSessionId: string): { sessions: PosSession[]; activeSessionId: string } {
  if (sessions.length > 0 && sessions.some((s) => s.id === activeSessionId)) {
    return { sessions, activeSessionId };
  }
  // State is broken — reset to a fresh session
  const fresh = makeSession();
  return { sessions: [fresh], activeSessionId: fresh.id };
}

export const usePosSessionStore = create<PosSessionStore>()(
  persist(
    (set, get) => {
      const firstSession = makeSession();
      return {
        sessions: [firstSession],
        activeSessionId: firstSession.id,

        createSession: (customerName?: string) => {
          const session = makeSession(customerName);
          set((s) => ({
            sessions: [...s.sessions, session],
            activeSessionId: session.id,
          }));
        },

        activateSession: (id: string) => set({ activeSessionId: id }),

        removeSession: (id: string) => {
          const { sessions, activeSessionId } = get();
          const remaining = sessions.filter((s) => s.id !== id);
          if (remaining.length === 0) {
            const fresh = makeSession();
            set({ sessions: [fresh], activeSessionId: fresh.id });
            return;
          }
          const newActive = activeSessionId === id
            ? remaining[remaining.length - 1].id
            : activeSessionId;
          set({ sessions: remaining, activeSessionId: newActive });
        },

        addItem: (product: Product) => {
          set((state) => {
            // Self-healing: fix broken state before mutating
            const { sessions, activeSessionId } = ensureValidState(state.sessions, state.activeSessionId);

            const updatedSessions = sessions.map((sess) => {
              if (sess.id !== activeSessionId) return sess;
              const existing = sess.items.find((i) => i.product.id === product.id);
              return {
                ...sess,
                items: existing
                  ? sess.items.map((i) =>
                      i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
                    )
                  : [...sess.items, { product, quantity: 1 }],
              };
            });

            return { sessions: updatedSessions, activeSessionId };
          });
        },

        removeItem: (productId: string) => {
          set((state) => {
            const { sessions, activeSessionId } = ensureValidState(state.sessions, state.activeSessionId);
            return {
              sessions: sessions.map((sess) =>
                sess.id !== activeSessionId
                  ? sess
                  : { ...sess, items: sess.items.filter((i) => i.product.id !== productId) }
              ),
              activeSessionId,
            };
          });
        },

        updateQuantity: (productId: string, quantity: number) => {
          if (quantity <= 0) { get().removeItem(productId); return; }
          set((state) => {
            const { sessions, activeSessionId } = ensureValidState(state.sessions, state.activeSessionId);
            return {
              sessions: sessions.map((sess) =>
                sess.id !== activeSessionId
                  ? sess
                  : { ...sess, items: sess.items.map((i) => i.product.id === productId ? { ...i, quantity } : i) }
              ),
              activeSessionId,
            };
          });
        },

        clearActiveSession: () => {
          set((state) => {
            const { sessions, activeSessionId } = ensureValidState(state.sessions, state.activeSessionId);
            return {
              sessions: sessions.map((sess) =>
                sess.id !== activeSessionId ? sess : { ...sess, items: [] }
              ),
              activeSessionId,
            };
          });
        },

        getActiveSession: () => {
          const { sessions, activeSessionId } = get();
          return sessions.find((s) => s.id === activeSessionId);
        },
      };
    },
    {
      name: 'pos-sessions-v2', // new key = clears old corrupted localStorage
      // Only persist the raw data, not computed state
      partialize: (s) => ({ sessions: s.sessions, activeSessionId: s.activeSessionId }),
      // After rehydrating, heal any broken state
      onRehydrateStorage: () => (state) => {
        if (!state) return;
        const { sessions, activeSessionId } = ensureValidState(state.sessions, state.activeSessionId);
        state.sessions = sessions;
        state.activeSessionId = activeSessionId;
      },
    }
  )
);
