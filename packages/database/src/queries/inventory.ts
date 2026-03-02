import { and, eq } from "drizzle-orm";
import { db } from "../client";
import { stock, stockMovements, warehouses } from "../schemas/inventory";

export const getWarehouses = async (userId: string) => {
	return await db.query.warehouses.findMany({
		where: eq(warehouses.userId, userId),
	});
};

export const createWarehouse = async (data: typeof warehouses.$inferInsert) => {
	const [newWarehouse] = await db.insert(warehouses).values(data).returning();
	return newWarehouse;
};

export const updateWarehouse = async (
	id: string,
	userId: string,
	data: Partial<typeof warehouses.$inferInsert>,
) => {
	const [updated] = await db
		.update(warehouses)
		.set({ ...data, updatedAt: new Date() })
		.where(and(eq(warehouses.id, id), eq(warehouses.userId, userId)))
		.returning();
	return updated;
};

export const deleteWarehouse = async (id: string, userId: string) => {
	const [deleted] = await db
		.update(warehouses)
		.set({ deletedAt: new Date() })
		.where(and(eq(warehouses.id, id), eq(warehouses.userId, userId)))
		.returning();
	return deleted;
};

export const getAllStock = async (userId: string) => {
	return await db.query.stock.findMany({
		where: eq(stock.userId, userId),
		with: {
			warehouse: true,
		},
	});
};

export const getStock = async (warehouseId: string, variantId: string) => {
	return await db.query.stock.findFirst({
		where: and(
			eq(stock.warehouseId, warehouseId),
			eq(stock.variantId, variantId),
		),
	});
};

export const updateStock = async (
	warehouseId: string,
	variantId: string,
	quantity: number,
	userId: string,
) => {
	const existingStock = await getStock(warehouseId, variantId);

	if (existingStock) {
		const [updated] = await db
			.update(stock)
			.set({ quantity, updatedAt: new Date() })
			.where(
				and(eq(stock.warehouseId, warehouseId), eq(stock.variantId, variantId)),
			)
			.returning();
		return updated;
	}

	const [created] = await db
		.insert(stock)
		.values({
			id: crypto.randomUUID(),
			userId,
			warehouseId,
			variantId,
			quantity,
		})
		.returning();
	return created;
};

export const getStockMovements = async (userId: string) => {
	return await db.query.stockMovements.findMany({
		where: eq(stockMovements.userId, userId),
	});
};

export const recordStockMovement = async (
	data: typeof stockMovements.$inferInsert,
) => {
	const [movement] = await db.insert(stockMovements).values(data).returning();
	return movement;
};
