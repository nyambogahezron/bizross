import {
	boolean,
	integer,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
import { tenants } from "./auth";
import { productVariants } from "./product";

// Shared columns pattern
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

export const warehouses = pgTable("warehouses", {
	...baseColumns,
	name: text("name").notNull(),
	isPrimary: boolean("is_primary").default(false),
});

export const stock = pgTable("stock", {
	...baseColumns,
	warehouseId: uuid("warehouse_id").references(() => warehouses.id),
	variantId: uuid("variant_id").references(() => productVariants.id),
	quantity: integer("quantity").notNull().default(0),
	lowStockThreshold: integer("low_stock_threshold").default(5),
});

export const stockMovements = pgTable("stock_movements", {
	id: uuid("id").primaryKey().defaultRandom(),
	tenantId: uuid("tenant_id")
		.references(() => tenants.id)
		.notNull(),
	variantId: uuid("variant_id")
		.references(() => productVariants.id)
		.notNull(),
	warehouseId: uuid("warehouse_id")
		.references(() => warehouses.id)
		.notNull(),
	quantityChange: integer("quantity_change").notNull(),
	reason: text("reason"), // 'sale', 'restock', 'return', 'adjustment'
	referenceId: uuid("reference_id"), // Order ID or Adjustment ID
	createdAt: timestamp("created_at").defaultNow().notNull(),
});
