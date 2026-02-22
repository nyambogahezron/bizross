"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { SearchInput } from "@/components/ui/SearchInput";
import { formatCurrency, getStockStatus } from "@/lib/utils";
import { useProductStore } from "@/stores/productStore";

export default function InventoryPage() {
	const products = useProductStore((s) => s.products);
	const [search, setSearch] = useState("");

	const filtered = products.filter(
		(p) =>
			p.name.toLowerCase().includes(search.toLowerCase()) ||
			p.sku.toLowerCase().includes(search.toLowerCase()),
	);

	return (
		<AppLayout title="Inventory">
			<div className="flex items-center justify-between mb-5">
				<SearchInput
					value={search}
					onChange={setSearch}
					placeholder="Search inventory..."
					className="max-w-xs"
				/>
				<div className="flex items-center gap-3 text-sm">
					<span className="flex items-center gap-1.5 text-muted-foreground">
						<span className="w-2 h-2 rounded-full bg-success" /> In Stock:{" "}
						{
							products.filter(
								(p) => getStockStatus(p.stock, p.lowStockThreshold) === "ok",
							).length
						}
					</span>
					<span className="flex items-center gap-1.5 text-muted-foreground">
						<span className="w-2 h-2 rounded-full bg-warning" /> Low:{" "}
						{
							products.filter(
								(p) => getStockStatus(p.stock, p.lowStockThreshold) === "low",
							).length
						}
					</span>
					<span className="flex items-center gap-1.5 text-muted-foreground">
						<span className="w-2 h-2 rounded-full bg-danger" /> Out:{" "}
						{
							products.filter(
								(p) => getStockStatus(p.stock, p.lowStockThreshold) === "out",
							).length
						}
					</span>
				</div>
			</div>

			<div className="card overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-border bg-muted/50">
								{[
									"Product",
									"SKU",
									"Category",
									"Price",
									"Stock Level",
									"Threshold",
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
								{filtered.map((p, i) => {
									const stock = getStockStatus(p.stock, p.lowStockThreshold);
									const pct = Math.min(
										(p.stock / (p.lowStockThreshold * 3)) * 100,
										100,
									);
									return (
										<motion.tr
											key={p.id}
											initial={{ opacity: 0 }}
											animate={{ opacity: 1 }}
											exit={{ opacity: 0 }}
											transition={{ delay: i * 0.02 }}
											className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
										>
											<td className="px-4 py-3 font-medium text-foreground">
												{p.name}
											</td>
											<td className="px-4 py-3 font-mono text-xs text-muted-foreground">
												{p.sku}
											</td>
											<td className="px-4 py-3 text-muted-foreground text-xs">
												{p.category}
											</td>
											<td className="px-4 py-3 font-bold tabular-nums">
												{formatCurrency(p.price)}
											</td>
											<td className="px-4 py-3 w-40">
												<div className="flex items-center gap-2">
													<div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
														<motion.div
															initial={{ width: 0 }}
															animate={{ width: `${pct}%` }}
															transition={{
																delay: i * 0.02 + 0.2,
																duration: 0.6,
															}}
															className={`h-full rounded-full ${
																stock === "out"
																	? "bg-danger"
																	: stock === "low"
																		? "bg-warning"
																		: "bg-success"
															}`}
														/>
													</div>
													<span className="text-xs font-medium text-foreground tabular-nums w-6">
														{p.stock}
													</span>
												</div>
											</td>
											<td className="px-4 py-3 text-muted-foreground tabular-nums">
												{p.lowStockThreshold}
											</td>
											<td className="px-4 py-3">
												<Badge
													variant={
														stock === "out"
															? "danger"
															: stock === "low"
																? "warning"
																: "success"
													}
												>
													{stock === "out"
														? "Out of stock"
														: stock === "low"
															? "Low stock"
															: "In stock"}
												</Badge>
											</td>
										</motion.tr>
									);
								})}
							</AnimatePresence>
						</tbody>
					</table>
				</div>
			</div>
		</AppLayout>
	);
}
