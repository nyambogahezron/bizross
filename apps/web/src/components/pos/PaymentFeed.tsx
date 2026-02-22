"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, Phone, RefreshCw, X, Zap } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import {
	type IncomingPayment,
	type MobileMoneyProvider,
	usePaymentNotificationsStore,
} from "@/stores/paymentNotificationsStore";

const PROVIDER_META: Record<
	MobileMoneyProvider,
	{ label: string; color: string; bg: string }
> = {
	mpesa: {
		label: "M-Pesa",
		color: "text-emerald-500",
		bg: "bg-emerald-500/10",
	},
	airtel: { label: "Airtel", color: "text-red-500", bg: "bg-red-500/10" },
	tigo: { label: "Tigo", color: "text-blue-500", bg: "bg-blue-500/10" },
	cash: { label: "Cash", color: "text-amber-500", bg: "bg-amber-500/10" },
	card: { label: "Card", color: "text-violet-500", bg: "bg-violet-500/10" },
};

function timeAgo(iso: string) {
	const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
	if (secs < 60) return `${secs}s ago`;
	const mins = Math.floor(secs / 60);
	if (mins < 60) return `${mins}m ago`;
	return `${Math.floor(mins / 60)}h ago`;
}

function PaymentCard({ payment }: { payment: IncomingPayment }) {
	const selectedPaymentId = usePaymentNotificationsStore(
		(s) => s.selectedPaymentId,
	);
	const selectPayment = usePaymentNotificationsStore((s) => s.selectPayment);
	const removePayment = usePaymentNotificationsStore((s) => s.removePayment);

	const meta = PROVIDER_META[payment.provider];
	const isSelected = selectedPaymentId === payment.id;

	return (
		<motion.div
			layout
			initial={{ opacity: 0, x: -20, height: 0 }}
			animate={{ opacity: 1, x: 0, height: "auto" }}
			exit={{ opacity: 0, x: -20, height: 0 }}
			transition={{ duration: 0.25 }}
			className={`relative rounded-xl border p-3 cursor-pointer transition-all group ${
				isSelected
					? "border-primary bg-primary/10 shadow-md"
					: "border-border hover:border-primary/40 hover:bg-accent"
			}`}
			onClick={() => selectPayment(isSelected ? null : payment.id)}
		>
			{/* Selected indicator */}
			{isSelected && (
				<motion.div
					layoutId="payment-selected"
					className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-r-full bg-primary"
					transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
				/>
			)}

			{/* Top row: provider badge + amount + dismiss */}
			<div className="flex items-center justify-between mb-2">
				<span
					className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${meta.bg} ${meta.color}`}
				>
					{meta.label}
				</span>
				<div className="flex items-center gap-1.5">
					<span
						className={`text-sm font-bold tabular-nums ${isSelected ? "text-primary" : "text-foreground"}`}
					>
						{formatCurrency(payment.amount)}
					</span>
					<button
						type="button"
						onClick={(e) => {
							e.stopPropagation();
							removePayment(payment.id);
						}}
						className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:text-danger text-muted-foreground transition-all"
					>
						<X size={11} />
					</button>
				</div>
			</div>

			{/* Sender */}
			<div className="flex items-center gap-1.5 mb-1">
				<div className="w-5 h-5 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-[8px] font-bold shrink-0">
					{payment.senderName.charAt(0)}
				</div>
				<span className="text-xs font-medium text-foreground truncate">
					{payment.senderName}
				</span>
			</div>

			{/* Phone + ref */}
			<div className="flex items-center gap-2 text-[10px] text-muted-foreground mb-2">
				<Phone size={9} />
				<span>{payment.senderPhone}</span>
				<span className="font-mono ml-auto">{payment.reference}</span>
			</div>

			{/* Footer */}
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-1 text-[10px] text-muted-foreground">
					<Clock size={9} />
					{timeAgo(payment.receivedAt)}
				</div>
				{isSelected ? (
					<span className="flex items-center gap-1 text-[10px] font-semibold text-primary">
						<CheckCircle2 size={11} /> Selected
					</span>
				) : (
					<span className="text-[10px] text-muted-foreground group-hover:text-primary transition-colors">
						Tap to select →
					</span>
				)}
			</div>
		</motion.div>
	);
}

export function PaymentFeed() {
	const payments = usePaymentNotificationsStore((s) => s.payments);
	const simulateIncoming = usePaymentNotificationsStore(
		(s) => s.simulateIncoming,
	);
	const pending = payments.filter((p) => p.status === "pending");
	const applied = payments.filter((p) => p.status === "applied").slice(0, 3);

	return (
		<div className="flex flex-col h-full overflow-hidden">
			{/* Header */}
			<div className="px-3 py-3 border-b border-border shrink-0">
				<div className="flex items-center justify-between mb-1">
					<div className="flex items-center gap-1.5">
						<Zap size={13} className="text-amber-500" />
						<h2 className="text-xs font-bold text-foreground uppercase tracking-wider">
							Payments
						</h2>
					</div>
					<button
						type="button"
						onClick={simulateIncoming}
						title="Simulate incoming payment"
						className="p-1 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
					>
						<RefreshCw size={11} />
					</button>
				</div>
				<div className="flex items-center gap-1.5">
					<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
					<p className="text-[10px] text-muted-foreground">
						{pending.length} pending · tap to apply
					</p>
				</div>
			</div>

			{/* Pending payments */}
			<div className="flex-1 overflow-y-auto px-2 py-2 space-y-2">
				<AnimatePresence initial={false}>
					{pending.length === 0 ? (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							className="flex flex-col items-center justify-center h-32 gap-2 text-center px-3"
						>
							<div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
								<Zap size={18} className="text-muted-foreground" />
							</div>
							<p className="text-[11px] text-muted-foreground leading-relaxed">
								Waiting for
								<br />
								incoming payments
							</p>
							<button
								type="button"
								onClick={simulateIncoming}
								className="text-[10px] text-primary hover:underline"
							>
								Simulate payment →
							</button>
						</motion.div>
					) : (
						pending.map((p) => <PaymentCard key={p.id} payment={p} />)
					)}
				</AnimatePresence>

				{/* Recently applied */}
				{applied.length > 0 && (
					<div className="mt-3">
						<p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
							Recently Applied
						</p>
						{applied.map((p) => {
							const meta = PROVIDER_META[p.provider];
							return (
								<div
									key={p.id}
									className="flex items-center justify-between px-2 py-2 rounded-lg opacity-50"
								>
									<div className="flex items-center gap-2">
										<CheckCircle2 size={12} className="text-success shrink-0" />
										<div>
											<p className="text-[10px] font-medium text-foreground">
												{p.senderName}
											</p>
											<p className={`text-[9px] ${meta.color}`}>{meta.label}</p>
										</div>
									</div>
									<span className="text-[10px] font-bold text-foreground tabular-nums line-through">
										{formatCurrency(p.amount)}
									</span>
								</div>
							);
						})}
					</div>
				)}
			</div>
		</div>
	);
}
