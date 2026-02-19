import { integer, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth";


export const customers = pgTable("customers", {
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
	firstName: text("first_name"),
	lastName: text("last_name"),
	email: text("email"),
	phone: text("phone"),
	loyaltyPoints: integer("loyalty_points").default(0),
});
