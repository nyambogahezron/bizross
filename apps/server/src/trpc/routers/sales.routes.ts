import {
	createOrder,
	createOrderItem,
	deleteOrder,
	getOrderById,
	getOrderItems,
	getOrders,
	updateOrderStatus,
} from "@repo/database/queries";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../";

export const salesRoutes = router({
	getOrders: protectedProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/sales/orders",
				tags: ["sales", "orders"],
				summary: "Get all orders",
				protect: true,
			},
		})
		.output(z.array(z.any()))
		.query(async ({ ctx }) => {
			return await getOrders(ctx.user.id);
		}),

	getOrder: protectedProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/sales/orders/{id}",
				tags: ["sales", "orders"],
				summary: "Get a specific order",
				protect: true,
			},
		})
		.input(z.object({ id: z.string() }))
		.output(z.any())
		.query(async ({ ctx, input }) => {
			const order = await getOrderById(input.id, ctx.user.id);
			if (!order) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Order not found",
				});
			}
			return order;
		}),

	createOrder: protectedProcedure
		.meta({
			openapi: {
				method: "POST",
				path: "/sales/orders",
				tags: ["sales", "orders"],
				summary: "Create a new order",
				protect: true,
			},
		})
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
				items: z
					.array(
						z.object({
							variantId: z.string().optional(),
							productName: z.string(),
							quantity: z.number().int().min(1),
							unitPrice: z.number().min(0),
							subtotal: z.number().min(0),
							tax: z.number().min(0).optional(),
							discount: z.number().min(0).optional(),
						}),
					)
					.optional(),
			}),
		)
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			const { items = [], ...orderData } = input;
			const orderId = crypto.randomUUID();

			return await createOrder(
				{
					id: orderId,
					userId: ctx.user.id,
					orderNumber: orderData.orderNumber,
					customerId: orderData.customerId,
					status: orderData.status ?? "pending",
					totalAmount: String(orderData.totalAmount),
					taxAmount: orderData.taxAmount ? String(orderData.taxAmount) : "0",
					discountAmount: orderData.discountAmount
						? String(orderData.discountAmount)
						: "0",
					currency: orderData.currency ?? "USD",
					deviceSource: orderData.deviceSource,
				},
				items.map((item) => ({
					id: crypto.randomUUID(),
					userId: ctx.user.id,
					orderId,
					variantId: item.variantId,
					productName: item.productName,
					quantity: item.quantity,
					unitPrice: String(item.unitPrice),
					subtotal: String(item.subtotal),
					tax: item.tax ? String(item.tax) : undefined,
					discount: item.discount ? String(item.discount) : undefined,
				})),
			);
		}),

	updateOrder: protectedProcedure
		.meta({
			openapi: {
				method: "PATCH",
				path: "/sales/orders/{id}",
				tags: ["sales", "orders"],
				summary: "Update an order's status",
				protect: true,
			},
		})
		.input(
			z.object({
				id: z.string(),
				status: z.string().optional(),
			}),
		)
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			if (!input.status) {
				throw new TRPCError({
					code: "BAD_REQUEST",
					message: "At least one field to update is required",
				});
			}
			const updated = await updateOrderStatus(
				input.id,
				ctx.user.id,
				input.status,
			);
			if (!updated) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Order not found",
				});
			}
			return updated;
		}),

	deleteOrder: protectedProcedure
		.meta({
			openapi: {
				method: "DELETE",
				path: "/sales/orders/{id}",
				tags: ["sales", "orders"],
				summary: "Delete an order",
				protect: true,
			},
		})
		.input(z.object({ id: z.string() }))
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			const deleted = await deleteOrder(input.id, ctx.user.id);
			if (!deleted) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Order not found",
				});
			}
			return deleted;
		}),

	getOrderItems: protectedProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/sales/orders/{orderId}/items",
				tags: ["sales", "order items"],
				summary: "Get order items by order ID",
				protect: true,
			},
		})
		.input(z.object({ orderId: z.string() }))
		.output(z.array(z.any()))
		.query(async ({ ctx, input }) => {
			// Verify the order belongs to this user first
			const order = await getOrderById(input.orderId, ctx.user.id);
			if (!order) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Order not found",
				});
			}
			return await getOrderItems(input.orderId);
		}),

	createOrderItem: protectedProcedure
		.meta({
			openapi: {
				method: "POST",
				path: "/sales/orders/{orderId}/items",
				tags: ["sales", "order items"],
				summary: "Create an order item",
				protect: true,
			},
		})
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
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			// Verify the order belongs to this user
			const order = await getOrderById(input.orderId, ctx.user.id);
			if (!order) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Order not found",
				});
			}
			return await createOrderItem({
				id: crypto.randomUUID(),
				userId: ctx.user.id,
				orderId: input.orderId,
				variantId: input.variantId,
				productName: input.productName,
				quantity: input.quantity,
				unitPrice: String(input.unitPrice),
				subtotal: String(input.subtotal),
				tax: input.tax ? String(input.tax) : undefined,
				discount: input.discount ? String(input.discount) : undefined,
			});
		}),
});
