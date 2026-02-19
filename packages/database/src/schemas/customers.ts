import { integer, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { tenants } from "./auth";


const baseColumns = {
	id: uuid("id").primaryKey().defaultRandom(),
	tenantId: uuid("tenant_id")
		.references(() => tenants.id)
		.notNull(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
	deletedAt: timestamp("deleted_at"),
	version: integer("version").default(1).notNull(),
};

export const customers = pgTable("customers", {
	...baseColumns,
	firstName: text("first_name"),
	lastName: text("last_name"),
	email: text("email"),
	phone: text("phone"),
	loyaltyPoints: integer("loyalty_points").default(0),
});
