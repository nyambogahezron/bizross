import {
	decimal,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { tenants, users } from "./auth";
import { customers } from "./customers";
import { productVariants } from "./product";


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

export const orders = pgTable("orders", {
	...baseColumns,
	orderNumber: text("order_number").notNull(),
	customerId: uuid("customer_id").references(() => customers.id),
	userId: text("user_id").references(() => users.id), // Cashier
	status: text("status").default("pending"), // 'completed', 'voided', 'refunded'
	totalAmount: decimal("total_amount", { precision: 10, scale: 2 }).notNull(),
	taxAmount: decimal("tax_amount", { precision: 10, scale: 2 }).default("0"),
	discountAmount: decimal("discount_amount", {
		precision: 10,
		scale: 2,
	}).default("0"),
	currency: text("currency").default("USD"),
	deviceSource: text("device_source"), // 'web', 'mobile-app', 'tablet-1'
});

export const orderItems = pgTable("order_items", {
	...baseColumns,
	orderId: uuid("order_id")
		.references(() => orders.id)
		.notNull(),
	variantId: uuid("variant_id").references(() => productVariants.id),
	productName: text("product_name").notNull(), // Snapshot
	quantity: integer("quantity").notNull(),
	unitPrice: decimal("unit_price", { precision: 10, scale: 2 }).notNull(), // Snapshot
	subtotal: decimal("subtotal", { precision: 10, scale: 2 }).notNull(),
	tax: decimal("tax", { precision: 10, scale: 2 }),
	discount: decimal("discount", { precision: 10, scale: 2 }),
});
