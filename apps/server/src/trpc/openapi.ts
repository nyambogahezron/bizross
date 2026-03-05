import { generateOpenApiDocument } from "trpc-to-openapi";
import { appRouter } from "./routers";

export const openApiDocument = generateOpenApiDocument(appRouter, {
	title: "Bizross API",
	description: "OpenAPI compliant REST API generated from tRPC router",
	version: "1.0.0",
	baseUrl: "http://localhost:5000/api",
	docsUrl: "https://github.com/nyambogahezron/bizross",
	tags: ["customers", "inventory", "payments", "products", "sales"],
});
