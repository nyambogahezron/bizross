import {
	createPayment,
	getPaymentById,
	getPayments,
	getPaymentsByOrder,
	updatePayment,
} from "@repo/database/queries";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../";

export const paymentRoutes = router({
	getPayments: protectedProcedure.query(async ({ ctx }) => {
		return await getPayments(ctx.user.id);
	}),

	getPayment: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			const payment = await getPaymentById(input.id, ctx.user.id);
			if (!payment) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Payment not found",
				});
			}
			return payment;
		}),

	getPaymentsByOrder: protectedProcedure
		.input(z.object({ orderId: z.string() }))
		.query(async ({ input }) => {
			return await getPaymentsByOrder(input.orderId);
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
			return await createPayment({
				id: crypto.randomUUID(),
				userId: ctx.user.id,
				orderId: input.orderId,
				amount: String(input.amount),
				method: input.method,
				status: input.status ?? "pending",
				referenceCode: input.referenceCode,
				notes: input.notes,
			});
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
			const { id, ...data } = input;
			// Verify ownership before updating
			const existing = await getPaymentById(id, ctx.user.id);
			if (!existing) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Payment not found",
				});
			}
			return await updatePayment(id, data);
		}),
});
