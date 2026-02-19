import { z } from "zod";

export const customerSchema = z.object({
	id: z.string().uuid(),
	userId: z.string().uuid(),
	firstName: z.string().min(1).optional().nullable(),
	lastName: z.string().min(1).optional().nullable(),
	email: z.string().email().optional().nullable(),
	phone: z.string().min(5).optional().nullable(),
	loyaltyPoints: z.number().int().min(0).default(0),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const createCustomerSchema = z.object({
  firstName: z.string().min(1).optional(),
  lastName: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(5).optional(),
  loyaltyPoints: z.number().int().min(0).optional(),
});

export const updateCustomerSchema = createCustomerSchema.partial();
