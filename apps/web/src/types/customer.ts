export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  totalPurchases: number;
  totalSpent: number;
  createdAt: string;
  lastVisit: string;
}

export interface CustomerFormData {
  name: string;
  phone: string;
  email?: string;
}
