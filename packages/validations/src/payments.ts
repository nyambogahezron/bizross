import { z } from "zod";

export const paymentMethodEnum = z.enum([
  "cash",
  "card",
  "mpesa",
  "bank_transfer",
]);

export const paymentSchema = z.object({
	id: z.string().uuid(),
	userId: z.string().uuid(),
	orderId: z.string().uuid(),
	amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
	method: paymentMethodEnum,
	status: z.string().default("pending"),
	referenceCode: z.string().optional().nullable(),
	notes: z.string().optional().nullable(),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const createPaymentSchema = z.object({
  orderId: z.string().uuid(),
  amount: z.string().regex(/^\d+(\.\d{1,2})?$/, "Invalid amount format"),
  method: paymentMethodEnum,
  referenceCode: z.string().optional(),
  notes: z.string().optional(),
});
