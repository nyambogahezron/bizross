import {
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";

export const planEnum = pgEnum("subscription_plan", [
	"free",
	"starter",
	"pro",
	"enterprise",
]);

export const subscriptionStatusEnum = pgEnum("subscription_status", [
	"active",
	"cancelled",
	"past_due",
	"trialing",
]);

export const billingCycleEnum = pgEnum("billing_cycle", [
	"monthly",
	"yearly",
]);

export const subscriptions = pgTable("subscriptions", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.references(() => user.id)
		.notNull()
		.unique(), // one subscription per user
	plan: planEnum("plan").notNull().default("free"),
	status: subscriptionStatusEnum("status").notNull().default("trialing"),
	billingCycle: billingCycleEnum("billing_cycle").notNull().default("monthly"),
	currentPeriodStart: timestamp("current_period_start").defaultNow().notNull(),
	currentPeriodEnd: timestamp("current_period_end"),
	cancelledAt: timestamp("cancelled_at"),
	externalId: text("external_id"), // Stripe / payment gateway subscription ID
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
});
