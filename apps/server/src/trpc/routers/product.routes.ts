import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../";

export const productRoutes = router({
	getProduct: publicProcedure.query(async ({ ctx }) => {
		return {};
	}),
	getProducts: publicProcedure.query(async ({ ctx }) => {
		return {};
	}),
	createProduct: protectedProcedure
		.input(
			z.object({
				name: z.string().min(2).max(100),
				price: z.number().min(0).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return {};
		}),
	updateProduct: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().min(2).max(100).optional(),
				description: z.string().optional(),
				categoryId: z.string().optional(),
				brandId: z.string().optional(),
				status: z.string().optional(),
				isTracked: z.boolean().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return {};
		}),
	deleteProduct: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			return {};
		}),
});
