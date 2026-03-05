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
	getProducts: publicProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/products",
				tags: ["products"],
				summary: "Get all products",
				protect: true,
			},
		})
		.output(z.array(z.any()))
		.query(async ({ ctx }) => {
			if (!ctx.user) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}
			return await getProducts(ctx.user.id);
		}),

	getProduct: publicProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/products/{id}",
				tags: ["products"],
				summary: "Get a specific product",
				protect: true,
			},
		})
		.input(z.object({ id: z.string() }))
		.output(z.any())
		.query(async ({ ctx }) => {
			if (!ctx.user) {
				throw new TRPCError({ code: "UNAUTHORIZED" });
			}
			return await getProducts(ctx.user.id);
		}),

	getCategories: protectedProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/categories",
				tags: ["products", "categories"],
				summary: "Get categories",
				protect: true,
			},
		})
		.output(z.array(z.any()))
		.query(async ({ ctx }) => {
			return await getCategories(ctx.user.id);
		}),

	getBrands: protectedProcedure
		.meta({
			openapi: {
				method: "GET",
				path: "/brands",
				tags: ["products", "brands"],
				summary: "Get brands",
				protect: true,
			},
		})
		.output(z.array(z.any()))
		.query(async ({ ctx }) => {
			return await getBrands(ctx.user.id);
		}),

	createProduct: protectedProcedure
		.meta({
			openapi: {
				method: "POST",
				path: "/products",
				tags: ["products"],
				summary: "Create a product",
				protect: true,
			},
		})
		.input(
			z.object({
				name: z.string().min(2).max(100),
				price: z.number().min(0).optional(),
			}),
		)
		.output(z.any())
		.mutation(async ({ ctx, input }) => {
			return await createProduct({
				id: crypto.randomUUID(),
				userId: ctx.user.id,
				name: input.name,
			});
		}),

	updateProduct: protectedProcedure
		.meta({
			openapi: {
				method: "PATCH",
				path: "/products/{id}",
				tags: ["products"],
				summary: "Update an existing product",
				protect: true,
			},
		})
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
		.output(z.any())
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
		.meta({
			openapi: {
				method: "DELETE",
				path: "/products/{id}",
				tags: ["products"],
				summary: "Delete a product",
				protect: true,
			},
		})
		.input(z.object({ id: z.string() }))
		.output(z.any())
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
