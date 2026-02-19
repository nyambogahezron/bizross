import { z } from "zod";

export const orderItemSchema = z.object({
  id: z.string().uuid(),
  orderId: z.string().uuid(),
  variantId: z.string().uuid(),
  productName: z.string(),
  quantity: z.number().int().min(1),
  unitPrice: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid price format"),
  subtotal: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
  tax: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format").optional().nullable(),
  discount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format").optional().nullable(),
});

export const orderSchema = z.object({
	id: z.string().uuid(),
	userId: z.string().uuid(),
	orderNumber: z.string(),
	customerId: z.string().uuid().optional().nullable(),
	userId: z.string().uuid().optional().nullable(),
	status: z
		.enum(["pending", "completed", "voided", "refunded"])
		.default("pending"),
	totalAmount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
	taxAmount: z
		.string()
		.regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format")
		.default("0"),
	discountAmount: z
		.string()
		.regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format")
		.default("0"),
	currency: z.string().default("USD"),
	deviceSource: z.string().optional().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
	items: z.array(orderItemSchema).optional(),
});

export const createOrderSchema = z.object({
  customerId: z.string().uuid().optional(),
  userId: z.string().uuid().optional(),
  deviceSource: z.string().optional(),
  items: z.array(z.object({
    variantId: z.string().uuid(),
    quantity: z.number().int().min(1),
    productName: z.string(),
    unitPrice: z.number().min(0), // Changed to number for input calculation convenience, or keep string
    // Let's stick to number for input, convert to string for DB
    // However, schema says string regex. Let's align with that or handle transformation in application layer.
    // For validation layer, simple input types are often better.
    // I'll keep it simple for now matching the DB schema but maybe refined later.
    // Actually, usually frontend sends numbers or strings. Let's accept string for strictness with DB or number.
    // I'll allow number and transform or string.
    // For now, let's stick to string to match the regex.
  })).min(1),
});
