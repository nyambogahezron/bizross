import { eq } from "drizzle-orm";
import { db } from "../client";
import { payments } from "../schemas/payments";

export const getPayments = async (userId: string) => {
	return await db.query.payments.findMany({
		where: eq(payments.userId, userId),
	});
};

export const getPaymentById = async (id: string, userId: string) => {
	return await db.query.payments
		.findFirst({
			where: eq(payments.id, id),
		})
		.then((payment) => {
			if (!payment || payment.userId !== userId) return null;
			return payment;
		});
};

export const getPaymentsByOrder = async (orderId: string) => {
	return await db.query.payments.findMany({
		where: eq(payments.orderId, orderId),
	});
};

export const createPayment = async (data: typeof payments.$inferInsert) => {
	const [newPayment] = await db.insert(payments).values(data).returning();
	return newPayment;
};

export const updatePaymentStatus = async (id: string, status: string) => {
	const [updatedPayment] = await db
		.update(payments)
		.set({ status, updatedAt: new Date() })
		.where(eq(payments.id, id))
		.returning();
	return updatedPayment;
};

export const updatePayment = async (
	id: string,
	data: { status?: string; notes?: string },
) => {
	const [updatedPayment] = await db
		.update(payments)
		.set({ ...data, updatedAt: new Date() })
		.where(eq(payments.id, id))
		.returning();
	return updatedPayment;
};
