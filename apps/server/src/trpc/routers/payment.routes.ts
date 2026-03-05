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
	getPayments: protectedProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/payments",
				tags: ["payments"],
				summary: "Get all payments",
				protect: true,
			},
		})
		.output(z.array(z.any()))
		.query(async ({ ctx }) => {
			return await getPayments(ctx.user.id);
		}),

	getPayment: protectedProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/payments/{id}",
				tags: ["payments"],
				summary: "Get a specific payment",
				protect: true,
			},
		})
		.input(z.object({ id: z.string() }))
		.output(z.any())
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
		.meta({
			openapi: {
				method: "GET",
				path: "/orders/{orderId}/payments",
				tags: ["payments", "orders"],
				summary: "Get payments by order ID",
				protect: true,
			},
		})
		.input(z.object({ orderId: z.string() }))
		.output(z.array(z.any()))
		.query(async ({ input }) => {
			return await getPaymentsByOrder(input.orderId);
		}),

	createPayment: protectedProcedure
		.meta({
			openapi: {
				method: "POST",
				path: "/payments",
				tags: ["payments"],
				summary: "Create a payment",
				protect: true,
			},
		})
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
		.output(z.any())
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
		.meta({
			openapi: {
				method: "PATCH",
				path: "/payments/{id}",
				tags: ["payments"],
				summary: "Update an existing payment",
				protect: true,
			},
		})
		.input(
			z.object({
				id: z.string(),
				status: z.string().optional(),
				notes: z.string().optional(),
			}),
		)
		.output(z.any())
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
