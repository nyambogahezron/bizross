import { z } from "zod";

export const productStatusSchema = z.enum(["active", "inactive", "archived"]);

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional().nullable(),
  price: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  stock: z.number().int().min(0),
  sku: z.string().min(1),
  barcode: z.string().optional().nullable(),
  category: z.string().optional().nullable(),
  status: productStatusSchema.default("active"),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createProductSchema = productSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
}).extend({
  status: productStatusSchema.optional(),
});

export const updateProductSchema = productSchema.partial();
