import {
	createProduct,
	deleteProduct,
	getBrands,
	getCategories,
	getProducts,
	updateProduct,
} from "@repo/database/queries";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, publicProcedure, router } from "../";

export const productRoutes = router({
	getProducts: publicProcedure.query(async ({ ctx }) => {
		if (!ctx.user) {
			throw new TRPCError({ code: "UNAUTHORIZED" });
		}
		return await getProducts(ctx.user.id);
	}),

	getProduct: publicProcedure
		.input(z.object({ id: z.string() }))
		.query(async ({ ctx }) => {
			if (!ctx.user) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}
			return await getProducts(ctx.user.id);
		}),

	getCategories: protectedProcedure.query(async ({ ctx }) => {
		return await getCategories(ctx.user.id);
	}),

	getBrands: protectedProcedure.query(async ({ ctx }) => {
		return await getBrands(ctx.user.id);
	}),

	createProduct: protectedProcedure
		.input(
			z.object({
				name: z.string().min(2).max(100),
				price: z.number().min(0).optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			return await createProduct({
				id: crypto.randomUUID(),
				userId: ctx.user.id,
				name: input.name,
			});
		}),

	updateProduct: protectedProcedure
		.input(
			z.object({
				id: z.string(),
				name: z.string().min(2).max(100).optional(),
				description: z.string().optional(),
				categoryId: z.string().optional(),
				brandId: z.string().optional(),
				status: z.enum(["active", "inactive", "archived"]).optional(),
				isTracked: z.boolean().optional(),
			}),
		)
		.mutation(async ({ ctx, input }) => {
			const { id, ...data } = input;
			const updated = await updateProduct(id, ctx.user.id, data);
			if (!updated) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Product not found",
				});
			}
			return updated;
		}),

	deleteProduct: protectedProcedure
		.input(z.object({ id: z.string() }))
		.mutation(async ({ ctx, input }) => {
			const deleted = await deleteProduct(input.id, ctx.user.id);
			if (!deleted) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Product not found",
				});
			}
			return deleted;
		}),
});
