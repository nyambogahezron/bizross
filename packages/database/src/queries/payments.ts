import { eq } from "drizzle-orm";
import { db } from "../client";
import {  payments } from "../schemas/payments";

export const createPayment = async (data: typeof payments.$inferInsert) => {
	const [newPayment] = await db.insert(payments).values(data).returning();
	return newPayment;
};

export const getPaymentsByOrder = async (orderId: string) => {
	return await db.query.payments.findMany({
		where: eq(payments.orderId, orderId),
	});
};

export const updatePaymentStatus = async (id: string, status: string) => {
	const [updatedPayment] = await db
		.update(payments)
		.set({ status, updatedAt: new Date() })
		.where(eq(payments.id, id))
		.returning();
	return updatedPayment;
};
