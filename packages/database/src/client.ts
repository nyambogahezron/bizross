import { drizzle } from "drizzle-orm/node-postgres";
import { Client } from "pg";
import * as schema from "./schemas";


const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
	console.warn("DATABASE_URL is not set");
}

const client = new Client({
	connectionString: connectionString || "",
});

client.connect().catch((err) => {
	console.error("Failed to connect to database", err);
});

export const db = drizzle(client, { schema });
