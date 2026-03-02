import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../";

export const salesRoutes = router({
	getOrders: protectedProcedure.query(async ({ ctx }) => {
		return {};
	}),
	getOrder: protectedProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx, input }) => {
			return {};
		}),
	createOrder: protectedProcedure
		.input(
			z.object({
				orderNumber: z.string(),
				customerId: z.string().optional(),
				status: z.string().optional(),
				totalAmount: z.number().min(0),
				taxAmount: z.number().min(0).optional(),
				discountAmount: z.number().min(0).optional(),
				currency: z.string().optional(),
				deviceSource: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return {};
		}),
	updateOrder: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				status: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return {};
		}),
	deleteOrder: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return {};
		}),

	getOrderItems: protectedProcedure.query(async ({ ctx }) => {
		return {};
	}),
	createOrderItem: protectedProcedure
		.input(
			z.object({
				orderId: z.string(),
				variantId: z.string().optional(),
				productName: z.string(),
				quantity: z.number().int().min(1),
				unitPrice: z.number().min(0),
				subtotal: z.number().min(0),
				tax: z.number().min(0).optional(),
				discount: z.number().min(0).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return {};
		}),
});
