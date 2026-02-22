"use client";

import { motion } from "framer-motion";
import { Banknote, CheckCircle2, CreditCard, Smartphone } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import type { PaymentMethod } from "@/types/order";

interface CheckoutModalProps {
	open: boolean;
	onClose: () => void;
}

const paymentMethods: {
	id: PaymentMethod;
	label: string;
	icon: React.ReactNode;
}[] = [
	{ id: "cash", label: "Cash", icon: <Banknote size={18} /> },
	{ id: "card", label: "Card", icon: <CreditCard size={18} /> },
	{ id: "mobile", label: "Mobile Pay", icon: <Smartphone size={18} /> },
];

export function CheckoutModal({ open, onClose }: CheckoutModalProps) {
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);

	const items = useCartStore((s) => s.items);
	const getSubtotal = useCartStore((s) => s.getSubtotal);
	const getTax = useCartStore((s) => s.getTax);
	const getTotal = useCartStore((s) => s.getTotal);
	const clearCart = useCartStore((s) => s.clearCart);
	const createOrder = useOrderStore((s) => s.createOrder);

	const handleConfirm = async () => {
		setLoading(true);
		await new Promise((r) => setTimeout(r, 800));
		createOrder({
			items,
			subtotal: getSubtotal(),
			tax: getTax(),
			total: getTotal(),
			paymentMethod,
			cashierName: "John",
		});
		clearCart();
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
			title={success ? "Order Complete!" : "Checkout"}
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
							Order has been saved successfully
						</p>
					</div>
					<Button onClick={handleClose} className="w-full mt-2">
						New Sale
					</Button>
				</motion.div>
			) : (
				<div className="space-y-5">
					{/* Order summary */}
					<div className="bg-muted rounded-xl p-4 space-y-2">
						<p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">
							Order Summary
						</p>
						{items.map((item) => (
							<div
								key={item.product.id}
								className="flex justify-between text-sm"
							>
								<span className="text-foreground">
									{item.product.name} × {item.quantity}
								</span>
								<span className="font-medium text-foreground tabular-nums">
									{formatCurrency(item.product.price * item.quantity)}
								</span>
							</div>
						))}
						<div className="border-t border-border pt-2 mt-2 space-y-1">
							<div className="flex justify-between text-sm text-muted-foreground">
								<span>Subtotal</span>
								<span className="tabular-nums">
									{formatCurrency(getSubtotal())}
								</span>
							</div>
							<div className="flex justify-between text-sm text-muted-foreground">
								<span>Tax (8%)</span>
								<span className="tabular-nums">{formatCurrency(getTax())}</span>
							</div>
							<div className="flex justify-between font-bold text-foreground text-base">
								<span>Total</span>
								<span className="tabular-nums text-primary">
									{formatCurrency(getTotal())}
								</span>
							</div>
						</div>
					</div>

					{/* Payment method */}
					<div>
						<p className="text-sm font-semibold text-foreground mb-3">
							Payment Method
						</p>
						<div className="grid grid-cols-3 gap-2">
							{paymentMethods.map(({ id, label, icon }) => (
								<button
									key={id}
									type="button"
									onClick={() => setPaymentMethod(id)}
									className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${
										paymentMethod === id
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

					<Button
						loading={loading}
						size="lg"
						className="w-full"
						onClick={handleConfirm}
					>
						Confirm Payment · {formatCurrency(getTotal())}
					</Button>
				</div>
			)}
		</Modal>
	);
}
