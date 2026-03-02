import { eq } from "drizzle-orm";
import { db } from "../client";
import { subscriptions } from "../schemas/subscriptions";

export const getSubscriptionByUserId = async (userId: string) => {
	return await db.query.subscriptions.findFirst({
		where: eq(subscriptions.userId, userId),
	});
};

export const createSubscription = async (
	data: typeof subscriptions.$inferInsert,
) => {
	const [newSub] = await db.insert(subscriptions).values(data).returning();
	return newSub;
};

export const updateSubscription = async (
	id: string,
	data: Partial<typeof subscriptions.$inferInsert>,
) => {
	const [updated] = await db
		.update(subscriptions)
		.set({ ...data, updatedAt: new Date() })
		.where(eq(subscriptions.id, id))
		.returning();
	return updated;
};

export const cancelSubscription = async (id: string) => {
	const [cancelled] = await db
		.update(subscriptions)
		.set({
			status: "cancelled",
			cancelledAt: new Date(),
			updatedAt: new Date(),
		})
		.where(eq(subscriptions.id, id))
		.returning();
	return cancelled;
};
