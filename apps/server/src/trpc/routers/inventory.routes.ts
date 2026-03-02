import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../";

export const inventoryRoutes = router({
	getWarehouses: protectedProcedure.query(async ({ ctx }) => {
		return {};
	}),
	createWarehouse: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1),
				isPrimary: z.boolean().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return {};
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
			return {};
		}),
	deleteWarehouse: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return {};
		}),

	getStock: protectedProcedure.query(async ({ ctx }) => {
		return {};
	}),
	updateStock: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				quantity: z.number().int().min(0).optional(),
				lowStockThreshold: z.number().int().min(0).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return {};
		}),

	getStockMovements: protectedProcedure.query(async ({ ctx }) => {
		return {};
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
			return {};
		}),
});
