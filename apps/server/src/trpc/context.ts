import { db } from "@repo/database/client";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";
import { getUserFromHeader } from "./middleware/auth";

export async function createContext(opts: FetchCreateContextFnOptions) {
	return {
		user: await getUserFromHeader(opts.req),
		db,
	};
}

export type Context = Awaited<ReturnType<typeof createContext>>;
