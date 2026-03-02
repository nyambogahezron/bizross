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
	getCustomers: protectedProcedure.query(async ({ ctx }) => {
		return await getCustomers(ctx.user.id);
	}),

	getCustomer: protectedProcedure
		.input(z.object({ id: z.string() }))
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
		.input(
			z.object({
				firstName: z.string().optional(),
				lastName: z.string().optional(),
				email: z.string().email().optional(),
				phone: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await createCustomer({
				id: crypto.randomUUID(),
				userId: ctx.user.id,
				...input,
			});
		}),

	updateCustomer: protectedProcedure
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
		.input(z.object({ id: z.string() }))
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
