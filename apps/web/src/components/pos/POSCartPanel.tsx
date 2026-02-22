"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	CheckCircle2,
	Minus,
	Plus,
	ShoppingCart,
	Trash2,
	X,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { usePaymentNotificationsStore } from "@/stores/paymentNotificationsStore";
import { usePosSessionStore } from "@/stores/posSessionStore";

interface POSCartPanelProps {
	onCheckout: () => void;
}

export function POSCartPanel({ onCheckout }: POSCartPanelProps) {
	const sessions = usePosSessionStore((s) => s.sessions);
	const activeSessionId = usePosSessionStore((s) => s.activeSessionId);
	const removeItem = usePosSessionStore((s) => s.removeItem);
	const updateQuantity = usePosSessionStore((s) => s.updateQuantity);
	const clearActiveSession = usePosSessionStore((s) => s.clearActiveSession);

	const activeSession = sessions.find((s) => s.id === activeSessionId);
	const items = activeSession?.items ?? [];
	const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;
	const itemCount = items.reduce((s, i) => s + i.quantity, 0);

	const selectedPayment = usePaymentNotificationsStore(
		(s) => s.getSelectedPayment,
	)();
	const selectPayment = usePaymentNotificationsStore((s) => s.selectPayment);

	const paid = selectedPayment?.amount ?? 0;
	const balance = paid - total;
	const isOverpaid = paid > 0 && paid > total;
	const isUnderpaid = paid > 0 && paid < total;

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="flex items-center justify-between pb-3 border-b border-border shrink-0">
				<div className="flex items-center gap-2">
					<ShoppingCart size={16} className="text-primary" />
					<span className="text-sm font-bold text-foreground">
						Current Order
					</span>
					{itemCount > 0 && (
						<span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-[10px] font-bold flex items-center justify-center">
							{itemCount}
						</span>
					)}
				</div>
				{items.length > 0 && (
					<button
						type="button"
						onClick={clearActiveSession}
						className="flex items-center gap-1 text-xs text-muted-foreground hover:text-danger transition-colors"
					>
						<Trash2 size={12} /> Clear
					</button>
				)}
			</div>

			{/* Selected payment banner */}
			<AnimatePresence>
				{selectedPayment && (
					<motion.div
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						exit={{ opacity: 0, height: 0 }}
						className="overflow-hidden shrink-0"
					>
						<div
							className={`mt-3 rounded-xl px-3 py-2.5 border flex items-start gap-2 ${
								isOverpaid
									? "bg-amber-500/10 border-amber-500/30"
									: isUnderpaid
										? "bg-rose-500/10 border-rose-500/30"
										: "bg-emerald-500/10 border-emerald-500/30"
							}`}
						>
							<CheckCircle2
								size={14}
								className={`mt-0.5 shrink-0 ${
									isOverpaid
										? "text-amber-500"
										: isUnderpaid
											? "text-rose-500"
											: "text-emerald-500"
								}`}
							/>
							<div className="flex-1 min-w-0">
								<p className="text-xs font-semibold text-foreground">
									{selectedPayment.provider.toUpperCase()} ·{" "}
									{selectedPayment.senderName}
								</p>
								<p className="text-[10px] text-muted-foreground font-mono">
									{selectedPayment.reference}
								</p>
								<p
									className={`text-xs font-bold mt-0.5 ${
										isOverpaid
											? "text-amber-500"
											: isUnderpaid
												? "text-rose-500"
												: "text-emerald-500"
									}`}
								>
									{isOverpaid && `Change due: ${formatCurrency(balance)}`}
									{isUnderpaid &&
										`Still owed: ${formatCurrency(Math.abs(balance))}`}
									{!isOverpaid && !isUnderpaid && paid > 0 && "Exact payment ✓"}
								</p>
							</div>
							<button
								type="button"
								onClick={() => selectPayment(null)}
								className="text-muted-foreground hover:text-foreground transition-colors mt-0.5"
							>
								<X size={12} />
							</button>
						</div>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Items list */}
			<div className="flex-1 overflow-y-auto py-2 space-y-0">
				<AnimatePresence initial={false}>
					{items.length === 0 ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="flex flex-col items-center justify-center h-36 gap-3 text-center"
						>
							<div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center">
								<ShoppingCart size={20} className="text-muted-foreground" />
							</div>
							<p className="text-xs text-muted-foreground">
								Search or scan a product
								<br />
								to add it to the order
							</p>
						</motion.div>
					) : (
						items.map((item) => (
							<motion.div
								key={item.product.id}
								layout
								initial={{ opacity: 0, x: 16 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 16, height: 0 }}
								transition={{ duration: 0.18 }}
								className="flex items-center gap-2 py-2.5 border-b border-border last:border-0"
							>
								<div className="flex-1 min-w-0">
									<p className="text-xs font-medium text-foreground truncate">
										{item.product.name}
									</p>
									<p className="text-[10px] text-muted-foreground">
										{formatCurrency(item.product.price)}
									</p>
								</div>
								<div className="flex items-center gap-1">
									<button
										type="button"
										onClick={() =>
											updateQuantity(item.product.id, item.quantity - 1)
										}
										className="w-6 h-6 rounded-md bg-muted hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
									>
										<Minus size={10} />
									</button>
									<span className="w-6 text-center text-xs font-bold tabular-nums">
										{item.quantity}
									</span>
									<button
										type="button"
										onClick={() =>
											updateQuantity(item.product.id, item.quantity + 1)
										}
										className="w-6 h-6 rounded-md bg-muted hover:bg-accent flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
									>
										<Plus size={10} />
									</button>
								</div>
								<span className="text-xs font-bold tabular-nums w-14 text-right">
									{formatCurrency(item.product.price * item.quantity)}
								</span>
								<button
									type="button"
									onClick={() => removeItem(item.product.id)}
									className="p-1 rounded hover:text-danger text-muted-foreground transition-colors"
								>
									<Trash2 size={11} />
								</button>
							</motion.div>
						))
					)}
				</AnimatePresence>
			</div>

			{/* Totals + checkout */}
			{items.length > 0 && (
				<motion.div
					initial={{ opacity: 0, y: 8 }}
					animate={{ opacity: 1, y: 0 }}
					className="pt-3 border-t border-border space-y-1.5 shrink-0"
				>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>Subtotal</span>
						<span className="font-medium text-foreground tabular-nums">
							{formatCurrency(subtotal)}
						</span>
					</div>
					<div className="flex justify-between text-xs text-muted-foreground">
						<span>Tax (8%)</span>
						<span className="font-medium text-foreground tabular-nums">
							{formatCurrency(tax)}
						</span>
					</div>
					{selectedPayment && (
						<>
							<div className="flex justify-between text-xs text-muted-foreground">
								<span>Tendered ({selectedPayment.provider.toUpperCase()})</span>
								<span className="font-medium text-emerald-500 tabular-nums">
									−{formatCurrency(paid)}
								</span>
							</div>
							{isOverpaid && (
								<div className="flex justify-between text-xs font-semibold text-amber-500">
									<span>Change</span>
									<span className="tabular-nums">
										{formatCurrency(balance)}
									</span>
								</div>
							)}
							{isUnderpaid && (
								<div className="flex justify-between text-xs font-semibold text-rose-500">
									<span>Balance due</span>
									<span className="tabular-nums">
										{formatCurrency(Math.abs(balance))}
									</span>
								</div>
							)}
						</>
					)}
					<div className="flex justify-between font-bold text-foreground border-t border-border pt-2">
						<span>Total</span>
						<span
							className={`text-lg tabular-nums ${
								selectedPayment
									? isUnderpaid
										? "text-rose-500"
										: "text-emerald-500"
									: "text-primary"
							}`}
						>
							{formatCurrency(total)}
						</span>
					</div>
					<Button
						size="lg"
						className="w-full mt-1"
						onClick={onCheckout}
						variant={
							selectedPayment ? (isUnderpaid ? "danger" : "success") : "primary"
						}
					>
						{selectedPayment
							? isUnderpaid
								? `Partial · Owed ${formatCurrency(Math.abs(balance))}`
								: isOverpaid
									? `Pay · Change ${formatCurrency(balance)}`
									: "Confirm Payment ✓"
							: `Pay ${formatCurrency(total)}`}
					</Button>
				</motion.div>
			)}
		</div>
	);
}
