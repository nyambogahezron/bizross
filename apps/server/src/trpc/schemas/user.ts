import { z } from "zod";

export const userRoleSchema = z.enum(["customer", "staff", "manager", "admin"]);

export const userSchema = z.object({
	id: z.string(),
	email: z.string().email(),
	name: z.string().min(1),
	phone: z.string().optional().nullable(),
	address: z.string().optional().nullable(),
	image: z.string().optional().nullable(),
	role: userRoleSchema.nullable().default("customer"),
	emailVerified: z.boolean().nullable().default(false),
	createdAt: z.date(),
	updatedAt: z.date(),
});

export const createUserSchema = z.object({
	email: z.string().email(),
	name: z.string().min(1),
	phone: z.string().optional(),
	address: z.string().optional(),
	role: userRoleSchema.optional(),
});

export const updateUserSchema = z.object({
	id: z.string(),
	email: z.string().email().optional(),
	name: z.string().min(1).optional(),
	phone: z.string().optional().nullable(),
	address: z.string().optional().nullable(),
	image: z.string().optional().nullable(),
});
