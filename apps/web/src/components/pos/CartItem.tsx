"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import type { CartItem } from "@/types/cart";

export function CartItem({ item }: { item: CartItem }) {
	const { updateQuantity, removeItem } = useCartStore();

	return (
		<motion.div
			layout
			initial={{ opacity: 0, x: 20 }}
			animate={{ opacity: 1, x: 0 }}
			exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
			transition={{ duration: 0.2 }}
			className="flex items-center gap-3 py-3 border-b border-border last:border-0"
		>
			{/* Product info */}
			<div className="flex-1 min-w-0">
				<p className="text-sm font-medium text-foreground truncate">
					{item.product.name}
				</p>
				<p className="text-xs text-muted-foreground">
					{formatCurrency(item.product.price)} each
				</p>
			</div>

			{/* Quantity controls */}
			<div className="flex items-center gap-1.5">
				<button
					type="button"
					onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
					className="w-7 h-7 rounded-lg bg-muted hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
				>
					<Minus size={12} />
				</button>
				<span className="w-7 text-center text-sm font-semibold text-foreground tabular-nums">
					{item.quantity}
				</span>
				<button
					type="button"
					onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
					className="w-7 h-7 rounded-lg bg-muted hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
				>
					<Plus size={12} />
				</button>
			</div>

			{/* Line total */}
			<span className="text-sm font-bold text-foreground w-16 text-right tabular-nums">
				{formatCurrency(item.product.price * item.quantity)}
			</span>

			{/* Remove */}
			<button
				type="button"
				onClick={() => removeItem(item.product.id)}
				className="p-1.5 rounded-lg hover:bg-danger/10 text-muted-foreground hover:text-danger transition-colors"
			>
				<Trash2 size={14} />
			</button>
		</motion.div>
	);
}
