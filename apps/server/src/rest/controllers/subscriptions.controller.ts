import {
	cancelSubscription,
	createSubscription,
	getSubscriptionByUserId,
	updateSubscription,
} from "@repo/database/queries";
import type { Context } from "hono";

export const getMySubscription = async (c: Context) => {
	const user = c.get("user") as { id: string };
	const sub = await getSubscriptionByUserId(user.id);
	if (!sub) return c.json({ data: null, message: "No active subscription" });
	return c.json({ data: sub });
};

export const createSubscriptionController = async (c: Context) => {
	const user = c.get("user") as { id: string };
	const body = await c.req.json<{
		plan: "free" | "starter" | "pro" | "enterprise";
		billingCycle: "monthly" | "yearly";
		externalId?: string;
	}>();

	if (!body.plan || !body.billingCycle) {
		return c.json({ error: "plan and billingCycle are required" }, 400);
	}

	const existing = await getSubscriptionByUserId(user.id);
	if (existing) {
		return c.json(
			{ error: "A subscription already exists. Use PATCH to update it." },
			409,
		);
	}

	const now = new Date();
	const periodEnd = new Date(now);
	if (body.billingCycle === "yearly") {
		periodEnd.setFullYear(periodEnd.getFullYear() + 1);
	} else {
		periodEnd.setMonth(periodEnd.getMonth() + 1);
	}

	const sub = await createSubscription({
		id: crypto.randomUUID(),
		userId: user.id,
		plan: body.plan,
		billingCycle: body.billingCycle,
		status: "active",
		currentPeriodStart: now,
		currentPeriodEnd: periodEnd,
		externalId: body.externalId,
	});

	return c.json({ data: sub }, 201);
};

export const updateSubscriptionController = async (c: Context) => {
	const user = c.get("user") as { id: string };
	const id = c.req.param("id");

	const sub = await getSubscriptionByUserId(user.id);
	if (!sub || sub.id !== id) {
		return c.json({ error: "Subscription not found" }, 404);
	}

	const body = await c.req.json<{
		plan?: "free" | "starter" | "pro" | "enterprise";
		billingCycle?: "monthly" | "yearly";
		status?: "active" | "cancelled" | "past_due" | "trialing";
		externalId?: string;
	}>();

	const updated = await updateSubscription(id, body);
	return c.json({ data: updated });
};

export const cancelSubscriptionController = async (c: Context) => {
	const user = c.get("user") as { id: string };
	const id = c.req.param("id");

	const sub = await getSubscriptionByUserId(user.id);
	if (!sub || sub.id !== id) {
		return c.json({ error: "Subscription not found" }, 404);
	}

	const cancelled = await cancelSubscription(id);
	return c.json({ data: cancelled });
};
