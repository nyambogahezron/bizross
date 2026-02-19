import { and, eq } from "drizzle-orm";
import { db } from "../client";
import { stock, stockMovements, warehouses } from "../schemas/inventory";

export const getWarehouses = async (tenantId: string) => {
	return await db.query.warehouses.findMany({
		where: eq(warehouses.tenantId, tenantId),
	});
};

export const createWarehouse = async (data: typeof warehouses.$inferInsert) => {
	const [newWarehouse] = await db.insert(warehouses).values(data).returning();
	return newWarehouse;
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
	tenantId: string,
) => {
	const existingStock = await getStock(warehouseId, variantId);

	let stockRecord : typeof stock.$inferSelect;
	if (existingStock) {
		[stockRecord] = await db
			.update(stock)
			.set({ quantity, updatedAt: new Date() })
			.where(
				and(eq(stock.warehouseId, warehouseId), eq(stock.variantId, variantId)),
			)
			.returning();
	} else {
		[stockRecord] = await db
			.insert(stock)
			.values({
				tenantId,
				warehouseId,
				variantId,
				quantity,
			})
			.returning();
	}

	return stockRecord;
};

export const recordStockMovement = async (
	data: typeof stockMovements.$inferInsert,
) => {
	const [movement] = await db.insert(stockMovements).values(data).returning();
	return movement;
};
