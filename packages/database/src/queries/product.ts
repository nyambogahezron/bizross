import { and, eq } from "drizzle-orm";
import { db } from "../client";
import { brands, categories, products } from "../schemas/product";

export const getProducts = async (tenantId: string) => {
	return await db.query.products.findMany({
		where: eq(products.tenantId, tenantId),
		with: {
			category: true,
			brand: true,
		},
	});
};

export const getProductById = async (id: string, tenantId: string) => {
	return await db.query.products.findFirst({
		where: and(eq(products.id, id), eq(products.tenantId, tenantId)),
		with: {
			category: true,
			brand: true,
		},
	});
};

export const createProduct = async (data: typeof products.$inferInsert) => {
	const [newProduct] = await db.insert(products).values(data).returning();
	return newProduct;
};

export const updateProduct = async (
	id: string,
	tenantId: string,
	data: Partial<typeof products.$inferInsert>,
) => {
	const [updatedProduct] = await db
		.update(products)
		.set({ ...data, updatedAt: new Date() })
		.where(and(eq(products.id, id), eq(products.tenantId, tenantId)))
		.returning();
	return updatedProduct;
};

export const deleteProduct = async (id: string, tenantId: string) => {
	const [deletedProduct] = await db
		.update(products)
		.set({ deletedAt: new Date() })
		.where(and(eq(products.id, id), eq(products.tenantId, tenantId)))
		.returning();
	return deletedProduct;
};

export const getCategories = async (tenantId: string) => {
	return await db.query.categories.findMany({
		where: eq(categories.tenantId, tenantId),
	});
};

export const getBrands = async (tenantId: string) => {
	return await db.query.brands.findMany({
		where: eq(brands.tenantId, tenantId),
	});
};
