import { Hono } from "hono";
import { auth } from "./lib/auth";

const app = new Hono();

app.on(["POST", "GET"], "/api/auth/**", (c) => {
	return auth.handler(c.req.raw);
});

app.get("/", (c) => {
	return c.text("Hello World!");
});

export default app;
