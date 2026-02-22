"use client";

import { motion } from "framer-motion";
import { Package, Plus } from "lucide-react";
import { formatCurrency, getStockStatus } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import type { Product } from "@/types/product";

interface ProductCardProps {
	product: Product;
	index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
	const addItem = useCartStore((s) => s.addItem);
	const items = useCartStore((s) => s.items);
	const stockStatus = getStockStatus(product.stock, product.lowStockThreshold);
	const cartItem = items.find((i) => i.product.id === product.id);

	const handleAdd = () => {
		if (stockStatus === "out") return;
		addItem(product);
	};

	return (
		<motion.button
			type="button"
			onClick={handleAdd}
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ delay: index * 0.04, duration: 0.3 }}
			whileHover={{
				scale: stockStatus === "out" ? 1 : 1.03,
				y: stockStatus === "out" ? 0 : -2,
			}}
			whileTap={{ scale: stockStatus === "out" ? 1 : 0.96 }}
			disabled={stockStatus === "out"}
			className="card p-4 flex flex-col gap-3 text-left cursor-pointer hover:shadow-lg hover:border-primary/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group"
		>
			{/* Icon area */}
			<div className="w-full h-20 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
				<Package size={28} className="text-primary/60" />
			</div>

			{/* Cart count badge */}
			{cartItem && (
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow"
				>
					{cartItem.quantity}
				</motion.div>
			)}

			{/* Info */}
			<div className="flex-1">
				<p className="text-sm font-semibold text-foreground line-clamp-2 leading-tight">
					{product.name}
				</p>
				<p className="text-xs text-muted-foreground mt-0.5">{product.sku}</p>
			</div>

			{/* Price + Stock */}
			<div className="flex items-center justify-between">
				<span className="text-base font-bold text-primary">
					{formatCurrency(product.price)}
				</span>
				<span
					className={`text-xs font-medium ${
						stockStatus === "out"
							? "text-danger"
							: stockStatus === "low"
								? "text-warning"
								: "text-success"
					}`}
				>
					{stockStatus === "out" ? "Out of stock" : `${product.stock} left`}
				</span>
			</div>

			{/* Add button overlay on hover */}
			{stockStatus !== "out" && (
				<motion.div
					initial={{ opacity: 0 }}
					whileHover={{ opacity: 1 }}
					className="absolute inset-0 bg-primary/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
				>
					<div className="bg-primary text-primary-foreground rounded-full p-2 shadow-lg">
						<Plus size={16} />
					</div>
				</motion.div>
			)}
		</motion.button>
	);
}
