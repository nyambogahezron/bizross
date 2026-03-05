import { db } from "@repo/database/client";
import * as schema from "@repo/database/schemas";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			user: schema.user,
			session: schema.session,
			account: schema.account,
			verification: schema.verification,
		},
	}),
	emailAndPassword: {
		enabled: true,
		sendResetPassword: async ({ user, url, token }) => {
			console.log(`[AUTH] Password reset requested for ${user.email}.`);
			console.log(`[AUTH] Reset Token: ${token}`);
			console.log(`[AUTH] Reset URL: ${url}`);
		},
	},
	socialProviders: {
		google: {
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		},
	},
	user: {
		additionalFields: {
			role: {
				type: "string",
				values: schema.roles.enumValues,
				default: "user",
			},
		},
	},
});
