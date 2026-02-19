import { and, eq } from "drizzle-orm";
import { db } from "../client";
import { orderItems, orders } from "../schemas/sales";

export const createOrder = async (
	data: typeof orders.$inferInsert,
	items: (typeof orderItems.$inferInsert)[],
) => {
	return await db.transaction(async (tx) => {
		const [newOrder] = await tx.insert(orders).values(data).returning();

		if (items.length > 0) {
			await tx.insert(orderItems).values(
				items.map((item) => ({
					...item,
					orderId: newOrder.id,
				})),
			);
		}

		return newOrder;
	});
};

export const getOrderById = async (id: string, tenantId: string) => {
	return await db.query.orders.findFirst({
		where: and(eq(orders.id, id), eq(orders.tenantId, tenantId)),
		with: {
			items: true,
		},
	});
};

export const getOrders = async (tenantId: string) => {
	return await db.query.orders.findMany({
		where: eq(orders.tenantId, tenantId),
		with: {
			items: true,
		},
	});
};

export const updateOrderStatus = async (
	id: string,
	tenantId: string,
	status: string,
) => {
	const [updatedOrder] = await db
		.update(orders)
		.set({ status, updatedAt: new Date() })
		.where(and(eq(orders.id, id), eq(orders.tenantId, tenantId)))
		.returning();
	return updatedOrder;
};
