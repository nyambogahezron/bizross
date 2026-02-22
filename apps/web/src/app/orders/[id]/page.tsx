"use client";

import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useOrderStore } from "@/stores/orderStore";
import type { OrderStatus } from "@/types/order";

const statusVariant: Record<
	OrderStatus,
	"success" | "warning" | "danger" | "info"
> = {
	completed: "success",
	pending: "warning",
	refunded: "info",
	cancelled: "danger",
};

export default function OrderDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const getOrderById = useOrderStore((s) => s.getOrderById);
	const order = getOrderById(params.id);

	if (!order) notFound();

	return (
		<AppLayout title="Order Detail">
			<div className="max-w-2xl mx-auto">
				<Link
					href="/orders"
					className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
				>
					<ArrowLeft size={14} /> Back to Orders
				</Link>

				<motion.div
					initial={{ opacity: 0, y: 16 }}
					animate={{ opacity: 1, y: 0 }}
					className="card p-6 space-y-6"
				>
					{/* Header */}
					<div className="flex items-start justify-between border-b border-border pb-5">
						<div>
							<p className="text-xs text-muted-foreground font-mono uppercase tracking-wider mb-1">
								Order
							</p>
							<h2 className="text-2xl font-bold text-foreground">
								{order.orderNumber}
							</h2>
							<p className="text-sm text-muted-foreground mt-1">
								{formatDate(order.createdAt)}
							</p>
						</div>
						<div className="flex flex-col items-end gap-2">
							<Badge
								variant={statusVariant[order.status]}
								className="text-sm px-3 py-1"
							>
								{order.status}
							</Badge>
							<Badge variant="outline">{order.paymentMethod}</Badge>
						</div>
					</div>

					{/* Customer & Cashier */}
					<div className="grid grid-cols-2 gap-4 text-sm">
						<div>
							<p className="text-xs text-muted-foreground upper font-semibold mb-1">
								CUSTOMER
							</p>
							<p className="text-foreground font-medium">
								{order.customerName ?? "Walk-in"}
							</p>
						</div>
						<div>
							<p className="text-xs text-muted-foreground font-semibold mb-1">
								CASHIER
							</p>
							<p className="text-foreground font-medium">{order.cashierName}</p>
						</div>
					</div>

					{/* Items */}
					<div>
						<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
							Items
						</p>
						<div className="space-y-0 rounded-xl overflow-hidden border border-border">
							{order.items.map((item, i) => (
								<div
									key={item.product.id}
									className={`flex items-center justify-between px-4 py-3 ${i > 0 ? "border-t border-border" : ""} bg-muted/30`}
								>
									<div>
										<p className="text-sm font-medium text-foreground">
											{item.product.name}
										</p>
										<p className="text-xs text-muted-foreground">
											{formatCurrency(item.product.price)} × {item.quantity}
										</p>
									</div>
									<span className="font-bold text-foreground tabular-nums">
										{formatCurrency(item.product.price * item.quantity)}
									</span>
								</div>
							))}
						</div>
					</div>

					{/* Totals */}
					<div className="space-y-2 border-t border-border pt-4">
						{[
							{ label: "Subtotal", value: formatCurrency(order.subtotal) },
							{ label: "Tax (8%)", value: formatCurrency(order.tax) },
						].map(({ label, value }) => (
							<div
								key={label}
								className="flex justify-between text-sm text-muted-foreground"
							>
								<span>{label}</span>
								<span className="tabular-nums">{value}</span>
							</div>
						))}
						<div className="flex justify-between font-bold text-foreground text-lg border-t border-border pt-2">
							<span>Total</span>
							<span className="text-primary tabular-nums">
								{formatCurrency(order.total)}
							</span>
						</div>
					</div>
				</motion.div>
			</div>
		</AppLayout>
	);
}
