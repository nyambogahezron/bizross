import {
	createCustomer,
	deleteCustomer,
	getCustomerById,
	getCustomers,
	updateCustomer,
} from "@repo/database/queries";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../";

export const customerRoutes = router({
	getCustomers: protectedProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/customers",
				tags: ["customers"],
				summary: "Get all customers for the current user",
				protect: true,
			},
		})
		.output(z.array(z.any()))
		.query(async ({ ctx }) => {
			return await getCustomers(ctx.user.id);
		}),

	getCustomer: protectedProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/customers/{id}",
				tags: ["customers"],
				summary: "Get a specific customer by ID",
				protect: true,
			},
		})
		.input(z.object({ id: z.string() }))
		.output(z.any())
		.query(async ({ ctx, input }) => {
			const customer = await getCustomerById(input.id, ctx.user.id);
			if (!customer) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Customer not found",
				});
			}
			return customer;
		}),

	createCustomer: protectedProcedure
		.meta({
			openapi: {
				method: "POST",
				path: "/customers",
				tags: ["customers"],
				summary: "Create a new customer",
				protect: true,
			},
		})
		.input(
			z.object({
				firstName: z.string().optional(),
				lastName: z.string().optional(),
				email: z.string().email().optional(),
				phone: z.string().optional(),
			}),
		)
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			return await createCustomer({
				id: crypto.randomUUID(),
				userId: ctx.user.id,
				...input,
			});
		}),

	updateCustomer: protectedProcedure
		.meta({
			openapi: {
				method: "PATCH",
				path: "/customers/{id}",
				tags: ["customers"],
				summary: "Update an existing customer",
				protect: true,
			},
		})
		.input(
			z.object({
				id: z.string(),
				firstName: z.string().optional(),
				lastName: z.string().optional(),
				email: z.string().email().optional(),
				phone: z.string().optional(),
				loyaltyPoints: z.number().int().min(0).optional(),
			}),
		)
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			const { id, ...data } = input;
			const updated = await updateCustomer(id, ctx.user.id, data);
			if (!updated) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Customer not found",
				});
			}
			return updated;
		}),

	deleteCustomer: protectedProcedure
		.meta({
			openapi: {
				method: "DELETE",
				path: "/customers/{id}",
				tags: ["customers"],
				summary: "Delete a customer",
				protect: true,
			},
		})
		.input(z.object({ id: z.string() }))
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			const deleted = await deleteCustomer(input.id, ctx.user.id);
			if (!deleted) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Customer not found",
				});
			}
			return deleted;
		}),
});
