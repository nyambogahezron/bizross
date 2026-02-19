import { eq } from "drizzle-orm";
import { db } from "../client";
import { users } from "../schemas/auth";

export const getUserByEmail = async (email: string) => {
	return await db.query.users.findFirst({
		where: eq(users.email, email),
	});
};

export const getUserById = async (id: string) => {
	return await db.query.users.findFirst({
		where: eq(users.id, id),
	});
};
