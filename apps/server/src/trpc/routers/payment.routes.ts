import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../";

export const paymentRoutes = router({
	getPayments: protectedProcedure.query(async ({ ctx }) => {
		return {};
	}),
	getPayment: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			return {};
		}),
	createPayment: protectedProcedure
		.input(
			z.object({
				orderId: z.string(),
				amount: z.number().positive(),
				method: z.enum(["cash", "card", "mpesa", "bank_transfer"]),
				status: z.string().optional(),
				referenceCode: z.string().optional(),
				notes: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return {};
		}),
	updatePayment: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				status: z.string().optional(),
				notes: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return {};
		}),
});
