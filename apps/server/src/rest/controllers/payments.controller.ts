import {
	createPayment,
	getPaymentById,
	getPayments,
	getPaymentsByOrder,
	updatePayment,
} from "@repo/database/queries";
import type { Context } from "hono";

export const listPayments = async (c: Context) => {
	const user = c.get("user") as { id: string };
	const list = await getPayments(user.id);
	return c.json({ data: list });
};

export const getPaymentsByOrderController = async (c: Context) => {
	const orderId = c.req.param("orderId");
	const list = await getPaymentsByOrder(orderId);
	return c.json({ data: list });
};

export const getPayment = async (c: Context) => {
	const user = c.get("user") as { id: string };
	const id = c.req.param("id");
	const payment = await getPaymentById(id, user.id);
	if (!payment) return c.json({ error: "Payment not found" }, 404);
	return c.json({ data: payment });
};

export const createPaymentController = async (c: Context) => {
	const user = c.get("user") as { id: string };
	const body = await c.req.json<{
		orderId: string;
		amount: number;
		method: "cash" | "card" | "mpesa" | "bank_transfer";
		status?: string;
		referenceCode?: string;
		notes?: string;
	}>();

	if (!body.orderId || !body.amount || !body.method) {
		return c.json({ error: "orderId, amount and method are required" }, 400);
	}

	const payment = await createPayment({
		id: crypto.randomUUID(),
		userId: user.id,
		orderId: body.orderId,
		amount: String(body.amount),
		method: body.method,
		status: body.status ?? "pending",
		referenceCode: body.referenceCode,
		notes: body.notes,
	});

	return c.json({ data: payment }, 201);
};

export const updatePaymentController = async (c: Context) => {
	const user = c.get("user") as { id: string };
	const id = c.req.param("id");
	const existing = await getPaymentById(id, user.id);
	if (!existing) return c.json({ error: "Payment not found" }, 404);

	const body = await c.req.json<{ status?: string; notes?: string }>();
	const updated = await updatePayment(id, body);
	return c.json({ data: updated });
};
