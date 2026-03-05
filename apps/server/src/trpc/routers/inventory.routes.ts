import {
	createWarehouse,
	deleteWarehouse,
	getAllStock,
	getStockMovements,
	getWarehouses,
	recordStockMovement,
	updateStock,
	updateWarehouse,
} from "@repo/database/queries";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../";

export const inventoryRoutes = router({
	getWarehouses: protectedProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/inventory/warehouses",
				tags: ["inventory"],
				summary: "Get all warehouses",
				protect: true,
			},
		})
		.output(z.array(z.any()))
		.query(async ({ ctx }) => {
			return await getWarehouses(ctx.user.id);
		}),

	createWarehouse: protectedProcedure
		.meta({
			openapi: {
				method: "POST",
				path: "/inventory/warehouses",
				tags: ["inventory"],
				summary: "Create a new warehouse",
				protect: true,
			},
		})
		.input(
			z.object({
				name: z.string().min(1),
				isPrimary: z.boolean().optional(),
			}),
		)
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			return await createWarehouse({
				id: crypto.randomUUID(),
				userId: ctx.user.id,
				name: input.name,
				isPrimary: input.isPrimary ?? false,
			});
		}),

	updateWarehouse: protectedProcedure
		.meta({
			openapi: {
				method: "PATCH",
				path: "/inventory/warehouses/{id}",
				tags: ["inventory"],
				summary: "Update a warehouse",
				protect: true,
			},
		})
		.input(
			z.object({
				id: z.string(),
				name: z.string().min(1).optional(),
				isPrimary: z.boolean().optional(),
			}),
		)
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			const { id, ...data } = input;
			const updated = await updateWarehouse(id, ctx.user.id, data);
			if (!updated) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Warehouse not found",
				});
			}
			return updated;
		}),

	deleteWarehouse: protectedProcedure
		.meta({
			openapi: {
				method: "DELETE",
				path: "/inventory/warehouses/{id}",
				tags: ["inventory"],
				summary: "Delete a warehouse",
				protect: true,
			},
		})
		.input(z.object({ id: z.string() }))
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			const deleted = await deleteWarehouse(input.id, ctx.user.id);
			if (!deleted) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Warehouse not found",
				});
			}
			return deleted;
		}),

	getStock: protectedProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/inventory/stock",
				tags: ["inventory"],
				summary: "Get all stock",
				protect: true,
			},
		})
		.output(z.array(z.any()))
		.query(async ({ ctx }) => {
			return await getAllStock(ctx.user.id);
		}),

	updateStock: protectedProcedure
		.meta({
			openapi: {
				method: "PATCH",
				path: "/inventory/stock",
				tags: ["inventory"],
				summary: "Update stock levels",
				protect: true,
			},
		})
		.input(
			z.object({
				warehouseId: z.string(),
				variantId: z.string(),
				quantity: z.number().int().min(0),
				lowStockThreshold: z.number().int().min(0).optional(),
			}),
		)
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			return await updateStock(
				input.warehouseId,
				input.variantId,
				input.quantity,
				ctx.user.id,
			);
		}),

	getStockMovements: protectedProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/inventory/stock-movements",
				tags: ["inventory"],
				summary: "Get all stock movements",
				protect: true,
			},
		})
		.output(z.array(z.any()))
		.query(async ({ ctx }) => {
			return await getStockMovements(ctx.user.id);
		}),

	createStockMovement: protectedProcedure
		.meta({
			openapi: {
				method: "POST",
				path: "/inventory/stock-movements",
				tags: ["inventory"],
				summary: "Create a stock movement",
				protect: true,
			},
		})
		.input(
			z.object({
				variantId: z.string(),
				warehouseId: z.string(),
				quantityChange: z.number().int(),
				reason: z.string().optional(),
				referenceId: z.string().optional(),
			}),
		)
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			return await recordStockMovement({
				id: crypto.randomUUID(),
				userId: ctx.user.id,
				...input,
			});
		}),
});
