"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { CartItem } from "./CartItem";

interface CartPanelProps {
	onCheckout: () => void;
}

export function CartPanel({ onCheckout }: CartPanelProps) {
	const items = useCartStore((s) => s.items);
	const clearCart = useCartStore((s) => s.clearCart);
	const getSubtotal = useCartStore((s) => s.getSubtotal);
	const getTax = useCartStore((s) => s.getTax);
	const getTotal = useCartStore((s) => s.getTotal);
	const getItemCount = useCartStore((s) => s.getItemCount);

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="flex items-center justify-between pb-4 border-b border-border shrink-0">
				<div className="flex items-center gap-2">
					<ShoppingCart size={18} className="text-primary" />
					<h2 className="font-semibold text-foreground">Cart</h2>
					{getItemCount() > 0 && (
						<span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
							{getItemCount()}
						</span>
					)}
				</div>
				{items.length > 0 && (
					<button
						type="button"
						onClick={clearCart}
						className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-danger transition-colors"
					>
						<Trash2 size={13} /> Clear
					</button>
				)}
			</div>

			{/* Items */}
			<div className="flex-1 overflow-y-auto py-2">
				<AnimatePresence initial={false}>
					{items.length === 0 ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="flex flex-col items-center justify-center h-40 gap-3 text-center"
						>
							<div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center">
								<ShoppingCart size={22} className="text-muted-foreground" />
							</div>
							<p className="text-sm text-muted-foreground">
								Cart is empty.
								<br />
								Tap a product to add.
							</p>
						</motion.div>
					) : (
						items.map((item) => <CartItem key={item.product.id} item={item} />)
					)}
				</AnimatePresence>
			</div>

			{/* Totals */}
			{items.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 10 }}
					animate={{ opacity: 1, y: 0 }}
					className="pt-4 border-t border-border space-y-2 shrink-0"
				>
					<div className="flex justify-between text-sm text-muted-foreground">
						<span>Subtotal</span>
						<span className="font-medium text-foreground tabular-nums">
							{formatCurrency(getSubtotal())}
						</span>
					</div>
					<div className="flex justify-between text-sm text-muted-foreground">
						<span>Tax (8%)</span>
						<span className="font-medium text-foreground tabular-nums">
							{formatCurrency(getTax())}
						</span>
					</div>
					<div className="flex justify-between font-bold text-foreground border-t border-border pt-2">
						<span className="text-base">Total</span>
						<span className="text-xl tabular-nums text-primary">
							{formatCurrency(getTotal())}
						</span>
					</div>

					<Button size="lg" className="w-full mt-2" onClick={onCheckout}>
						Checkout → {formatCurrency(getTotal())}
					</Button>
				</motion.div>
			)}
		</div>
	);
}
