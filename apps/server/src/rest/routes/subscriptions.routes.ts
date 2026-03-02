import { Hono } from "hono";
import {
	cancelSubscriptionController,
	createSubscriptionController,
	getMySubscription,
	updateSubscriptionController,
} from "../controllers/subscriptions.controller";
import { requireAuth } from "../middleware/auth.middleware";

type Variables = {
	user: { id: string; name: string; email: string; role?: string | null };
	session: unknown;
};

const subscriptions = new Hono<{ Variables: Variables }>();

subscriptions.use("*", requireAuth);

subscriptions.get("/me", getMySubscription);
subscriptions.post("/", createSubscriptionController);
subscriptions.patch("/:id", updateSubscriptionController);
subscriptions.delete("/:id", cancelSubscriptionController);

export { subscriptions as subscriptionsRoutes };
