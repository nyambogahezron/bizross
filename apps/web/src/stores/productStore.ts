'use client';

import { create } from 'zustand';
import { DUMMY_PRODUCTS } from '@/lib/dummy-data';
import { generateId } from '@/lib/utils';
import type { Product, ProductCategory, ProductFormData } from '@/types/product';

interface ProductStore {
  products: Product[];
  searchQuery: string;
  activeCategory: ProductCategory;
  // Actions
  setSearchQuery: (query: string) => void;
  setActiveCategory: (category: ProductCategory) => void;
  addProduct: (data: ProductFormData) => void;
  updateProduct: (id: string, data: Partial<ProductFormData>) => void;
  deleteProduct: (id: string) => void;
  // Computed
  getFilteredProducts: () => Product[];
  getLowStockProducts: () => Product[];
}

export const useProductStore = create<ProductStore>()((set, get) => ({
  products: DUMMY_PRODUCTS,
  searchQuery: '',
  activeCategory: 'All',

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  setActiveCategory: (category: ProductCategory) => set({ activeCategory: category }),

  addProduct: (data: ProductFormData) => {
    const newProduct: Product = {
      ...data,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    set((state) => ({ products: [...state.products, newProduct] }));
  },

  updateProduct: (id: string, data: Partial<ProductFormData>) => {
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...data } : p
      ),
    }));
  },

  deleteProduct: (id: string) => {
    set((state) => ({
      products: state.products.filter((p) => p.id !== id),
    }));
  },

  getFilteredProducts: () => {
    const { products, searchQuery, activeCategory } = get();
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  },

  getLowStockProducts: () => {
    return get().products.filter((p) => p.stock <= p.lowStockThreshold);
  },
}));
