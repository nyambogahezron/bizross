'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DUMMY_CUSTOMERS } from '@/lib/dummy-data';
import { generateId } from '@/lib/utils';
import type { Customer, CustomerFormData } from '@/types/customer';

interface CustomerStore {
  customers: Customer[];
  addCustomer: (data: CustomerFormData) => Customer;
  updateCustomerSpend: (id: string, amount: number) => void;
  getCustomerById: (id: string) => Customer | undefined;
}

export const useCustomerStore = create<CustomerStore>()(
  persist(
    (set, get) => ({
      customers: DUMMY_CUSTOMERS,

      addCustomer: (data: CustomerFormData) => {
        const newCustomer: Customer = {
          ...data,
          id: generateId(),
          totalPurchases: 0,
          totalSpent: 0,
          createdAt: new Date().toISOString(),
          lastVisit: new Date().toISOString(),
        };
        set((state) => ({ customers: [...state.customers, newCustomer] }));
        return newCustomer;
      },

      updateCustomerSpend: (id: string, amount: number) => {
        set((state) => ({
          customers: state.customers.map((c) =>
            c.id === id
              ? {
                  ...c,
                  totalPurchases: c.totalPurchases + 1,
                  totalSpent: c.totalSpent + amount,
                  lastVisit: new Date().toISOString(),
                }
              : c
          ),
        }));
      },

      getCustomerById: (id: string) => {
        return get().customers.find((c) => c.id === id);
      },
    }),
    { name: 'pos-customers' }
  )
);
