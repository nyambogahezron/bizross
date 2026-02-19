import { z } from "zod";

export const warehouseSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  name: z.string().min(1),
  isPrimary: z.boolean().default(false),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createWarehouseSchema = z.object({
  name: z.string().min(1),
  isPrimary: z.boolean().optional(),
});

export const stockSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  variantId: z.string().uuid(),
  quantity: z.number().int().min(0),
  lowStockThreshold: z.number().int().min(0).default(5),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const stockMovementSchema = z.object({
  id: z.string().uuid(),
  tenantId: z.string().uuid(),
  variantId: z.string().uuid(),
  warehouseId: z.string().uuid(),
  quantityChange: z.number().int(),
  reason: z.string().optional().nullable(),
  referenceId: z.string().uuid().optional().nullable(),
  createdAt: z.date(),
});
