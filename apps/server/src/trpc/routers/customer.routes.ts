import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../";

export const customerRoutes = router({
	getCustomers: protectedProcedure.query(async ({ ctx }) => {
		return {};
	}),
	getCustomer: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			return {};
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
			return {};
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
			return {};
		}),
	deleteCustomer: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return {};
		}),
});
