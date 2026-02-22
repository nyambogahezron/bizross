"use client";

import { motion } from "framer-motion";
import {
	AlertTriangle,
	DollarSign,
	ShoppingBag,
	TrendingUp,
} from "lucide-react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { StatCard } from "@/components/ui/StatCard";
import { formatCurrency, formatDate } from "@/lib/utils";
import { useOrderStore } from "@/stores/orderStore";
import { useProductStore } from "@/stores/productStore";

const containerVariants = {
	hidden: {},
	show: { transition: { staggerChildren: 0.08 } },
};

const rowVariants = {
	hidden: { opacity: 0, y: 12 },
	show: { opacity: 1, y: 0 },
};

const statusVariant: Record<string, "success" | "warning" | "danger" | "info"> =
	{
		completed: "success",
		pending: "warning",
		refunded: "info",
		cancelled: "danger",
	};

export default function DashboardPage() {
	const orders = useOrderStore((s) => s.orders);
	const getTodayRevenue = useOrderStore((s) => s.getTodayRevenue);
	const getTodayOrders = useOrderStore((s) => s.getTodayOrders);
	const getLowStockProducts = useProductStore((s) => s.getLowStockProducts);

	const todayOrders = getTodayOrders();
	const todayRevenue = getTodayRevenue();
	const lowStock = getLowStockProducts();
	const recentOrders = [...orders].slice(0, 6);

	return (
		<AppLayout title="Dashboard">
			{/* Stat Cards */}
			<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
				<StatCard
					index={0}
					title="Today's Revenue"
					value={formatCurrency(todayRevenue)}
					change="12.5%"
					positive
					icon={<DollarSign size={18} />}
					color="emerald"
				/>
				<StatCard
					index={1}
					title="Today's Orders"
					value={String(todayOrders.length)}
					change="3"
					positive
					icon={<ShoppingBag size={18} />}
					color="indigo"
				/>
				<StatCard
					index={2}
					title="Total Orders"
					value={String(orders.length)}
					icon={<TrendingUp size={18} />}
					color="amber"
				/>
				<StatCard
					index={3}
					title="Low Stock Items"
					value={String(lowStock.length)}
					icon={<AlertTriangle size={18} />}
					color="rose"
				/>
			</div>

			{/* Content Row */}
			<div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
				{/* Recent Sales */}
				<div className="lg:col-span-2 card p-5">
					<h2 className="font-semibold text-foreground mb-4">Recent Orders</h2>
					<motion.div
						variants={containerVariants}
						initial="hidden"
						animate="show"
						className="space-y-0"
					>
						{recentOrders.map((order) => (
							<motion.div
								key={order.id}
								variants={rowVariants}
								className="flex items-center justify-between py-3 border-b border-border last:border-0"
							>
								<div className="flex items-center gap-3">
									<div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
										{order.orderNumber.slice(-3)}
									</div>
									<div>
										<p className="text-sm font-medium text-foreground">
											{order.orderNumber}
										</p>
										<p className="text-xs text-muted-foreground">
											{formatDate(order.createdAt)}
										</p>
									</div>
								</div>
								<div className="flex items-center gap-4">
									<Badge variant={statusVariant[order.status] ?? "default"}>
										{order.status}
									</Badge>
									<span className="text-sm font-bold text-foreground tabular-nums">
										{formatCurrency(order.total)}
									</span>
								</div>
							</motion.div>
						))}
					</motion.div>
				</div>

				{/* Low Stock */}
				<div className="card p-5">
					<h2 className="font-semibold text-foreground mb-4 flex items-center gap-2">
						<AlertTriangle size={16} className="text-warning" />
						Low Stock Alerts
					</h2>
					{lowStock.length === 0 ? (
						<p className="text-sm text-muted-foreground">
							All products are well-stocked.
						</p>
					) : (
						<motion.div
							variants={containerVariants}
							initial="hidden"
							animate="show"
							className="space-y-3"
						>
							{lowStock.slice(0, 7).map((p) => (
								<motion.div
									key={p.id}
									variants={rowVariants}
									className="flex items-center justify-between"
								>
									<div className="flex-1 min-w-0">
										<p className="text-sm font-medium text-foreground truncate">
											{p.name}
										</p>
										<p className="text-xs text-muted-foreground">{p.sku}</p>
									</div>
									<Badge variant={p.stock === 0 ? "danger" : "warning"}>
										{p.stock === 0 ? "Out" : `${p.stock} left`}
									</Badge>
								</motion.div>
							))}
						</motion.div>
					)}
				</div>
			</div>
		</AppLayout>
	);
}
