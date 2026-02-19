import {
	decimal,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";
import { user } from "./auth";
import { orders } from "./sales";


const baseColumns = {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.references(() => user.id)
		.notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
	deletedAt: timestamp("deleted_at"),
	version: integer("version").default(1).notNull(),
};

export const paymentMethods = pgEnum("payment_method", [
	"cash",
	"card",
	"mpesa",
	"bank_transfer",
]);

export const payments = pgTable("payments", {
	...baseColumns,
	orderId: text("order_id")
		.references(() => orders.id)
		.notNull(),
	amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
	method: paymentMethods("method").notNull(),
	status: text("status").default("pending"), // 'success', 'failed'
	referenceCode: text("reference_code"), // External transaction ID
	notes: text("notes"),
});
