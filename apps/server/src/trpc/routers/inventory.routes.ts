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
	getWarehouses: protectedProcedure.query(async ({ ctx }) => {
		return await getWarehouses(ctx.user.id);
	}),

	createWarehouse: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1),
				isPrimary: z.boolean().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await createWarehouse({
				id: crypto.randomUUID(),
				userId: ctx.user.id,
				name: input.name,
				isPrimary: input.isPrimary ?? false,
			});
		}),

	updateWarehouse: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().min(1).optional(),
				isPrimary: z.boolean().optional(),
			}),
		)
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
		.input(z.object({ id: z.string() }))
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

	getStock: protectedProcedure.query(async ({ ctx }) => {
		return await getAllStock(ctx.user.id);
	}),

	updateStock: protectedProcedure
		.input(
			z.object({
				warehouseId: z.string(),
				variantId: z.string(),
				quantity: z.number().int().min(0),
				lowStockThreshold: z.number().int().min(0).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await updateStock(
				input.warehouseId,
				input.variantId,
				input.quantity,
				ctx.user.id,
			);
		}),

	getStockMovements: protectedProcedure.query(async ({ ctx }) => {
		return await getStockMovements(ctx.user.id);
	}),

	createStockMovement: protectedProcedure
		.input(
			z.object({
				variantId: z.string(),
				warehouseId: z.string(),
				quantityChange: z.number().int(),
				reason: z.string().optional(),
				referenceId: z.string().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await recordStockMovement({
				id: crypto.randomUUID(),
				userId: ctx.user.id,
				...input,
			});
		}),
});
