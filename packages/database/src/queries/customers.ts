import { and, eq } from "drizzle-orm";
import { db } from "../client";
import { customers } from "../schemas/customers";

export const getCustomers = async (userId: string) => {
	return await db.query.customers.findMany({
		where: eq(customers.userId, userId),
	});
};

export const getCustomerById = async (id: string, userId: string) => {
	return await db.query.customers.findFirst({
		where: and(eq(customers.id, id), eq(customers.userId, userId)),
	});
};

export const createCustomer = async (data: typeof customers.$inferInsert) => {
	const [newCustomer] = await db.insert(customers).values(data).returning();
	return newCustomer;
};

export const updateCustomer = async (
	id: string,
	userId: string,
	data: Partial<typeof customers.$inferInsert>,
) => {
	const [updatedCustomer] = await db
		.update(customers)
		.set({ ...data, updatedAt: new Date() })
		.where(and(eq(customers.id, id), eq(customers.userId, userId)))
		.returning();
	return updatedCustomer;
};

export const deleteCustomer = async (id: string, userId: string) => {
	const [deletedCustomer] = await db
		.update(customers)
		.set({ deletedAt: new Date() })
		.where(and(eq(customers.id, id), eq(customers.userId, userId)))
		.returning();
	return deletedCustomer;
};
