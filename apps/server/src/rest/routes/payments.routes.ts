import { Hono } from "hono";
import {
	createPaymentController,
	getPayment,
	getPaymentsByOrderController,
	listPayments,
	updatePaymentController,
} from "../controllers/payments.controller";
import { requireAuth } from "../middleware/auth.middleware";

type Variables = {
	user: { id: string; name: string; email: string; role?: string | null };
	session: unknown;
};

const payments = new Hono<{ Variables: Variables }>();

payments.use("*", requireAuth);

payments.get("/", listPayments);
payments.get("/order/:orderId", getPaymentsByOrderController);
payments.get("/:id", getPayment);
payments.post("/", createPaymentController);
payments.patch("/:id", updatePaymentController);

export { payments as paymentsRoutes };
