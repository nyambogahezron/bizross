"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import { SearchInput } from "@/components/ui/SearchInput";
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

export default function OrdersPage() {
	const orders = useOrderStore((s) => s.orders);
	const [search, setSearch] = useState("");
	const router = useRouter();

	const filtered = orders.filter(
		(o) =>
			o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
			(o.customerName ?? "").toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<AppLayout title="Orders">
			<div className="flex items-center justify-between mb-5">
				<SearchInput
					value={search}
					onChange={setSearch}
					placeholder="Search orders or customer..."
					className="max-w-xs"
				/>
				<p className="text-sm text-muted-foreground">
					{filtered.length} orders
				</p>
			</div>

			<div className="card overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-border bg-muted/50">
								{[
									"Order #",
									"Date",
									"Customer",
									"Items",
									"Total",
									"Payment",
									"Status",
								].map((h) => (
									<th
										key={h}
										className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide"
									>
										{h}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<AnimatePresence initial={false}>
								{filtered.length === 0 ? (
									<tr>
										<td colSpan={7}>
											<EmptyState title="No orders found" />
										</td>
									</tr>
								) : (
									filtered.map((order, i) => (
										<motion.tr
											key={order.id}
											initial={{ opacity: 0, y: 8 }}
											animate={{ opacity: 1, y: 0 }}
											transition={{ delay: i * 0.04 }}
											onClick={() => router.push(`/orders/${order.id}`)}
											className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
										>
											<td className="px-4 py-3 font-mono text-xs font-semibold text-primary">
												{order.orderNumber}
											</td>
											<td className="px-4 py-3 text-muted-foreground text-xs">
												{formatDate(order.createdAt)}
											</td>
											<td className="px-4 py-3 text-foreground">
												{order.customerName ?? "—"}
											</td>
											<td className="px-4 py-3 text-muted-foreground">
												{order.items.reduce((s, i) => s + i.quantity, 0)} items
											</td>
											<td className="px-4 py-3 font-bold text-foreground tabular-nums">
												{formatCurrency(order.total)}
											</td>
											<td className="px-4 py-3">
												<Badge variant="outline">{order.paymentMethod}</Badge>
											</td>
											<td className="px-4 py-3">
												<Badge variant={statusVariant[order.status]}>
													{order.status}
												</Badge>
											</td>
										</motion.tr>
									))
								)}
							</AnimatePresence>
						</tbody>
					</table>
				</div>
			</div>
		</AppLayout>
	);
}
