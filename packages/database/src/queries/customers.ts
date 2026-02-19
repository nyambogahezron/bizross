import { and, eq } from "drizzle-orm";
import { db } from "../client";
import { customers } from "../schemas/customers";

export const getCustomers = async (tenantId: string) => {
	return await db.query.customers.findMany({
		where: eq(customers.tenantId, tenantId),
	});
};

export const getCustomerById = async (id: string, tenantId: string) => {
	return await db.query.customers.findFirst({
		where: and(eq(customers.id, id), eq(customers.tenantId, tenantId)),
	});
};

export const createCustomer = async (data: typeof customers.$inferInsert) => {
	const [newCustomer] = await db.insert(customers).values(data).returning();
	return newCustomer;
};

export const updateCustomer = async (
	id: string,
	tenantId: string,
	data: Partial<typeof customers.$inferInsert>,
) => {
	const [updatedCustomer] = await db
		.update(customers)
		.set({ ...data, updatedAt: new Date() })
		.where(and(eq(customers.id, id), eq(customers.tenantId, tenantId)))
		.returning();
	return updatedCustomer;
};

export const deleteCustomer = async (id: string, tenantId: string) => {
	const [deletedCustomer] = await db
		.update(customers)
		.set({ deletedAt: new Date() })
		.where(and(eq(customers.id, id), eq(customers.tenantId, tenantId)))
		.returning();
	return deletedCustomer;
};
