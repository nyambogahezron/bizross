import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

const baseColumns = {
	id: uuid("id").primaryKey().defaultRandom(),
	createdAt: timestamp("created_at").defaultNow().notNull(),
	updatedAt: timestamp("updated_at")
		.defaultNow()
		.notNull()
		.$onUpdate(() => new Date()),
	deletedAt: timestamp("deleted_at"),
};

export const tenants = pgTable("tenants", {
	...baseColumns,
	name: text("name").notNull(),
	slug: text("slug").unique().notNull(),
});

export const users = pgTable("users", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified").notNull(),
	image: text("image"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	
	// Custom fields
	tenantId: uuid("tenant_id")
		.references(() => tenants.id),
	passwordHash: text("password_hash"),
	pinCode: text("pin_code"),
	role: text("role").default("cashier"),
	deletedAt: timestamp("deleted_at"),
});

export const sessions = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id").notNull().references(() => users.id),
});

export const accounts = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id").notNull().references(() => users.id),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verifications = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at"),
	updatedAt: timestamp("updated_at"),
});

export const roles = pgTable("roles", {
	...baseColumns,
	tenantId: uuid("tenant_id")
		.references(() => tenants.id)
		.notNull(),
	name: text("name").notNull(),
	description: text("description"),
});

export const permissions = pgTable("permissions", {
	...baseColumns,
	roleId: uuid("role_id")
		.references(() => roles.id)
		.notNull(),
	action: text("action").notNull(), // e.g., 'create:product'
	resource: text("resource").notNull(), // e.g., 'product'
});
