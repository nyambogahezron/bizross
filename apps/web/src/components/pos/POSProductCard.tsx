"use client";

import { motion } from "framer-motion";
import { Package, Plus } from "lucide-react";
import { formatCurrency, getStockStatus } from "@/lib/utils";
import { usePosSessionStore } from "@/stores/posSessionStore";
import type { Product } from "@/types/product";

interface POSProductCardProps {
	product: Product;
	index: number;
}

export function POSProductCard({ product, index }: POSProductCardProps) {
	const addItem = usePosSessionStore((s) => s.addItem);
	const activeSession = usePosSessionStore((s) => s.getActiveSession)();
	const stockStatus = getStockStatus(product.stock, product.lowStockThreshold);
	const cartItem = activeSession?.items.find(
		(i) => i.product.id === product.id,
	);

	return (
		<motion.button
			type="button"
			onClick={() => stockStatus !== "out" && addItem(product)}
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.03, duration: 0.25 }}
			whileHover={{
				scale: stockStatus === "out" ? 1 : 1.03,
				y: stockStatus === "out" ? 0 : -2,
			}}
			whileTap={{ scale: stockStatus === "out" ? 1 : 0.96 }}
			disabled={stockStatus === "out"}
			className="card p-3 flex flex-col gap-2 text-left cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
		>
			{/* Product icon */}
			<div className="w-full h-16 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
				<Package size={22} className="text-primary/60" />
			</div>

			{/* Cart quantity badge */}
			{cartItem && (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					className="absolute top-2 right-2 w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center shadow"
				>
					{cartItem.quantity}
				</motion.div>
			)}

			{/* Info */}
			<div className="flex-1">
				<p className="text-xs font-semibold text-foreground line-clamp-2 leading-tight">
					{product.name}
				</p>
				<p className="text-[10px] text-muted-foreground mt-0.5">
					{product.sku}
				</p>
			</div>

			{/* Price + stock */}
			<div className="flex items-center justify-between gap-1">
				<span className="text-sm font-bold text-primary">
					{formatCurrency(product.price)}
				</span>
				<span
					className={`text-[10px] font-medium ${
						stockStatus === "out"
							? "text-danger"
							: stockStatus === "low"
								? "text-warning"
								: "text-success"
					}`}
				>
					{stockStatus === "out" ? "Out" : `${product.stock}`}
				</span>
			</div>

			{/* Hover overlay */}
			{stockStatus !== "out" && (
				<div className="absolute inset-0 bg-primary/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
					<div className="bg-primary text-primary-foreground rounded-full p-1.5 shadow-lg">
						<Plus size={14} />
					</div>
				</div>
			)}
		</motion.button>
	);
}
