import { Hono } from "hono";
import { cors } from "hono/cors";
import { auth } from "./lib/auth";
import { paymentsRoutes } from "./rest/routes/payments.routes";
import { subscriptionsRoutes } from "./rest/routes/subscriptions.routes";

const app = new Hono<{
	Variables: {
		user: typeof auth.$Infer.Session.user | null;
		session: typeof auth.$Infer.Session.session | null;
	};
}>();

app.use(
	"*",
	cors({
		origin: "http://localhost:3001",
		allowHeaders: ["Content-Type", "Authorization"],
		allowMethods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
		exposeHeaders: ["Content-Length"],
		maxAge: 600,
		credentials: true,
	}),
);

app.use("*", async (c, next) => {
	const session = await auth.api.getSession({ headers: c.req.raw.headers });
	if (!session) {
		c.set("user", null);
		c.set("session", null);
		await next();
		return;
	}
	c.set("user", session.user);
	c.set("session", session.session);
	await next();
});

// Auth
app.on(["POST", "GET"], "/api/auth/**", (c) => {
	return auth.handler(c.req.raw);
});

// Session info
app.get("/session", (c) => {
	const session = c.get("session");
	const user = c.get("user");
	if (!user) return c.body(null, 401);
	return c.json({ session, user });
});

// REST routes
app.route("/api/payments", paymentsRoutes);
app.route("/api/subscriptions", subscriptionsRoutes);

app.get("/", (c) => {
	return c.text("Hello World!");
});

export default {
	app,
	port: 5000,
};
