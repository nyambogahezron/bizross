"use client";

import { motion } from "framer-motion";
import {
	Banknote,
	CheckCircle2,
	CreditCard,
	Smartphone,
	Zap,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency, generateId } from "@/lib/utils";
import { useOrderStore } from "@/stores/orderStore";
import { usePaymentNotificationsStore } from "@/stores/paymentNotificationsStore";
import { usePosSessionStore } from "@/stores/posSessionStore";
import type { PaymentMethod } from "@/types/order";

interface POSCheckoutModalProps {
	open: boolean;
	onClose: () => void;
}

const MANUAL_METHODS: {
	id: PaymentMethod;
	label: string;
	icon: React.ReactNode;
}[] = [
	{ id: "cash", label: "Cash", icon: <Banknote size={17} /> },
	{ id: "card", label: "Card", icon: <CreditCard size={17} /> },
	{ id: "mobile", label: "Other Mobile", icon: <Smartphone size={17} /> },
];

export function POSCheckoutModal({ open, onClose }: POSCheckoutModalProps) {
	const [manualMethod, setManualMethod] = useState<PaymentMethod>("cash");
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	// ✅ Reactive subscriptions
	const sessions = usePosSessionStore((s) => s.sessions);
	const activeSessionId = usePosSessionStore((s) => s.activeSessionId);
	const removeSession = usePosSessionStore((s) => s.removeSession);

	const selectedPaymentId = usePaymentNotificationsStore((s) => s.selectedPaymentId);
	const payments = usePaymentNotificationsStore((s) => s.payments);
	const markApplied = usePaymentNotificationsStore((s) => s.markApplied);
	const selectPayment = usePaymentNotificationsStore((s) => s.selectPayment);
	const createOrder = useOrderStore((s) => s.createOrder);

	// Derived (computed locally — fully reactive)
	const session = sessions.find((s) => s.id === activeSessionId);
	const items = session?.items ?? [];
	const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
	const tax = subtotal * 0.08;
	const total = subtotal + tax;
	const selectedPayment = selectedPaymentId ? payments.find((p) => p.id === selectedPaymentId) ?? null : null;
	const paid = selectedPayment?.amount ?? 0;
	const change = paid - total;
	const usingMobileMoney = !!selectedPayment;

	const handleConfirm = async () => {
		if (!session) return;
		setLoading(true);
		await new Promise((r) => setTimeout(r, 700));
		const orderId = generateId();
		createOrder({
			items,
			subtotal,
			tax,
			total,
			paymentMethod: usingMobileMoney ? "mobile" : manualMethod,
			customerName: selectedPayment?.senderName ?? session.customerName,
			cashierName: "John",
		});
		if (selectedPayment) markApplied(selectedPayment.id, orderId);
		removeSession(session.id);
		setLoading(false);
		setSuccess(true);
	};

	const handleClose = () => {
		setSuccess(false);
		onClose();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={success ? "Payment Complete!" : "Confirm Payment"}
			size="md"
		>
			{success ? (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="flex flex-col items-center gap-4 py-6 text-center"
				>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
					>
						<CheckCircle2 size={56} className="text-success" />
					</motion.div>
					<div>
						<p className="text-xl font-bold text-foreground">
							Payment Received!
						</p>
						<p className="text-muted-foreground text-sm mt-1">
							Order saved · ready for next customer
						</p>
						{change > 0 && (
							<p className="text-amber-500 font-bold text-lg mt-2">
								Give change: {formatCurrency(change)}
							</p>
						)}
					</div>
					<Button onClick={handleClose} className="w-full mt-2">
						Next Order
					</Button>
				</motion.div>
			) : (
				<div className="space-y-4">
					{/* Order summary */}
					<div className="bg-muted rounded-xl p-4 space-y-1.5">
						<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
							Items
						</p>
						{items.map((item) => (
							<div
								key={item.product.id}
								className="flex justify-between text-sm"
							>
								<span className="text-foreground">
									{item.product.name} × {item.quantity}
								</span>
								<span className="font-medium tabular-nums">
									{formatCurrency(item.product.price * item.quantity)}
								</span>
							</div>
						))}
						<div className="border-t border-border pt-2 mt-1 space-y-1">
							<div className="flex justify-between text-sm text-muted-foreground">
								<span>Subtotal</span>
								<span className="tabular-nums">{formatCurrency(subtotal)}</span>
							</div>
							<div className="flex justify-between text-sm text-muted-foreground">
								<span>Tax (8%)</span>
								<span className="tabular-nums">{formatCurrency(tax)}</span>
							</div>
							<div className="flex justify-between font-bold text-foreground text-base">
								<span>Total</span>
								<span className="tabular-nums text-primary">
									{formatCurrency(total)}
								</span>
							</div>
						</div>
					</div>

					{/* Payment method */}
					{usingMobileMoney ? (
						<div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 space-y-1">
							<div className="flex items-center gap-2 mb-2">
								<Zap size={14} className="text-emerald-500" />
								<p className="text-sm font-semibold text-foreground">
									Mobile Money Payment
								</p>
							</div>
							<div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
								<span className="text-muted-foreground">Provider</span>
								<span className="font-semibold text-foreground uppercase">
									{selectedPayment?.provider}
								</span>
								<span className="text-muted-foreground">Sender</span>
								<span className="font-semibold text-foreground">
									{selectedPayment?.senderName}
								</span>
								<span className="text-muted-foreground">Reference</span>
								<span className="font-mono text-foreground">
									{selectedPayment?.reference}
								</span>
								<span className="text-muted-foreground">Amount Paid</span>
								<span className="font-bold text-emerald-500 tabular-nums">
									{formatCurrency(paid)}
								</span>
								{change > 0 && (
									<>
										<span className="text-muted-foreground">Change due</span>
										<span className="font-bold text-amber-500 tabular-nums">
											{formatCurrency(change)}
										</span>
									</>
								)}
								{change < 0 && (
									<>
										<span className="text-muted-foreground">Balance owed</span>
										<span className="font-bold text-rose-500 tabular-nums">
											{formatCurrency(Math.abs(change))}
										</span>
									</>
								)}
							</div>
							<button
								type="button"
								onClick={() => selectPayment(null)}
								className="text-xs text-muted-foreground hover:text-foreground underline mt-1"
							>
								Use different method
							</button>
						</div>
					) : (
						<div>
							<p className="text-sm font-semibold text-foreground mb-2">
								Payment Method
							</p>
							<div className="grid grid-cols-3 gap-2">
								{MANUAL_METHODS.map(({ id, label, icon }) => (
									<button
										key={id}
										type="button"
										onClick={() => setManualMethod(id)}
										className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
											manualMethod === id
												? "border-primary bg-primary/10 text-primary"
												: "border-border text-muted-foreground hover:border-primary/40"
										}`}
									>
										{icon}
										<span className="text-xs font-medium">{label}</span>
									</button>
								))}
							</div>
						</div>
					)}

					<Button
						loading={loading}
						size="lg"
						className="w-full"
						onClick={handleConfirm}
						variant={usingMobileMoney ? "success" : "primary"}
					>
						{usingMobileMoney
							? change > 0
								? `Confirm · Give Change ${formatCurrency(change)}`
								: "Confirm M-Pesa Payment"
							: `Confirm Payment · ${formatCurrency(total)}`}
					</Button>
				</div>
			)}
		</Modal>
	);
}
