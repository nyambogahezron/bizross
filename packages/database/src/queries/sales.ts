import { and, eq } from "drizzle-orm";
import { db } from "../client";
import { orderItems, orders } from "../schemas/sales";

export const createOrder = async (
	data: typeof orders.$inferInsert,
	items: (typeof orderItems.$inferInsert)[],
) => {
	return await db.transaction(async (tx) => {
		const [newOrder] = await tx.insert(orders).values(data).returning();
		if (!newOrder) throw new Error("Failed to create order");

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

export const getOrderById = async (id: string, userId: string) => {
	return await db.query.orders.findFirst({
		where: and(eq(orders.id, id), eq(orders.userId, userId)),
		with: {
			items: true,
		},
	});
};

export const getOrders = async (userId: string) => {
	return await db.query.orders.findMany({
		where: eq(orders.userId, userId),
		with: {
			items: true,
		},
	});
};

export const updateOrderStatus = async (
	id: string,
	userId: string,
	status: string,
) => {
	const [updatedOrder] = await db
		.update(orders)
		.set({ status, updatedAt: new Date() })
		.where(and(eq(orders.id, id), eq(orders.userId, userId)))
		.returning();
	return updatedOrder;
};

export const deleteOrder = async (id: string, userId: string) => {
	const [deleted] = await db
		.update(orders)
		.set({ deletedAt: new Date() })
		.where(and(eq(orders.id, id), eq(orders.userId, userId)))
		.returning();
	return deleted;
};

export const getOrderItems = async (orderId: string) => {
	return await db.query.orderItems.findMany({
		where: eq(orderItems.orderId, orderId),
	});
};

export const createOrderItem = async (data: typeof orderItems.$inferInsert) => {
	const [newItem] = await db.insert(orderItems).values(data).returning();
	return newItem;
};
