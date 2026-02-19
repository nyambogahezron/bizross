import {
	boolean,
	decimal,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
	uuid,
} from "drizzle-orm/pg-core";
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

export const statusEnum = pgEnum("status", ["active", "inactive", "archived"]);

export const categories = pgTable("categories", {
	...baseColumns,
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	description: text("description"),
	parentId: uuid("parent_id"), // Self-reference for hierarchy
});

export const brands = pgTable("brands", {
	...baseColumns,
	name: text("name").notNull(),
	slug: text("slug").notNull(),
	description: text("description"),
});

export const products = pgTable("products", {
	...baseColumns,
	name: text("name").notNull(),
	description: text("description"),
	categoryId: uuid("category_id").references(() => categories.id),
	brandId: uuid("brand_id").references(() => brands.id),
	status: statusEnum("status").default("active"),
	isTracked: boolean("is_tracked").default(true),
});

export const productVariants = pgTable("product_variants", {
	...baseColumns,
	productId: uuid("product_id")
		.notNull()
		.references(() => products.id),
	name: text("name"), // e.g. "Small / Red"
	sku: text("sku").notNull(), // Unique constraint often scoped to tenant logic
	barcode: text("barcode"),
	price: decimal("price", { precision: 10, scale: 2 }).notNull(),
	costPrice: decimal("cost_price", { precision: 10, scale: 2 }),
});
