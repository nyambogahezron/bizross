"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	Banknote,
	CheckCircle2,
	ChevronRight,
	CreditCard,
	Delete,
	Plus,
	Smartphone,
	X,
	Zap,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { formatCurrency, generateId } from "@/lib/utils";
import { useOrderStore } from "@/stores/orderStore";
import {
	type IncomingPayment,
	type MobileMoneyProvider,
	usePaymentNotificationsStore,
} from "@/stores/paymentNotificationsStore";
import { TAX_RATE, usePosSessionStore } from "@/stores/posSessionStore";
import type { PaymentMethod } from "@/types/order";

interface POSCheckoutModalProps {
	open: boolean;
	onClose: () => void;
}

/* ─── Types ─────────────────────────────────────── */
interface AppliedMobile {
	paymentId: string;
	amount: number;
	provider: MobileMoneyProvider;
	senderName: string;
	reference: string;
}

const PROVIDER_COLOR: Record<MobileMoneyProvider, string> = {
	mpesa: "text-emerald-500",
	airtel: "text-red-500",
	tigo: "text-blue-500",
	cash: "text-amber-500",
	card: "text-violet-500",
};
const PROVIDER_BG: Record<MobileMoneyProvider, string> = {
	mpesa: "bg-emerald-500/10 border-emerald-500/25",
	airtel: "bg-red-500/10 border-red-500/25",
	tigo: "bg-blue-500/10 border-blue-500/25",
	cash: "bg-amber-500/10 border-amber-500/25",
	card: "bg-violet-500/10 border-violet-500/25",
};

/* ─── Cash numpad ────────────────────────────────── */
function CashPad({ onAdd }: { onAdd: (amount: number) => void }) {
	const [digits, setDigits] = useState("0");

	const display = (d: string) => {
		const n = parseInt(d, 10);
		return (n / 100).toFixed(2);
	};

	const pressDigit = (d: string) => {
		setDigits((prev) => {
			if (prev === "0") return d;
			if (prev.length >= 8) return prev;
			return prev + d;
		});
	};

	const backspace = () =>
		setDigits((prev) => (prev.length <= 1 ? "0" : prev.slice(0, -1)));

	const clear = () => setDigits("0");

	const confirm = () => {
		const val = parseInt(digits, 10) / 100;
		if (val > 0) {
			onAdd(val);
			setDigits("0");
		}
	};

	const keys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "00", "0", "."];

	return (
		<div className="space-y-2">
			{/* Display */}
			<div className="bg-muted rounded-xl px-4 py-3 flex items-center justify-between border border-border">
				<span className="text-xs text-muted-foreground font-medium">
					Cash tendered
				</span>
				<span className="text-2xl font-bold tabular-nums text-foreground tracking-tight">
					${display(digits)}
				</span>
			</div>

			{/* Numpad */}
			<div className="grid grid-cols-3 gap-1.5">
				{keys.map((k) => (
					<motion.button
						key={k}
						type="button"
						whileTap={{ scale: 0.92 }}
						onClick={() =>
							k === "." ? null : pressDigit(k === "00" ? "00" : k)
						}
						className="h-11 rounded-xl bg-muted hover:bg-accent text-foreground font-semibold text-sm transition-colors"
					>
						{k}
					</motion.button>
				))}
				{/* Backspace */}
				<motion.button
					type="button"
					whileTap={{ scale: 0.92 }}
					onClick={backspace}
					className="h-11 rounded-xl bg-muted hover:bg-accent text-muted-foreground flex items-center justify-center transition-colors"
				>
					<Delete size={16} />
				</motion.button>
				{/* Clear */}
				<motion.button
					type="button"
					whileTap={{ scale: 0.92 }}
					onClick={clear}
					className="h-11 rounded-xl bg-muted hover:bg-accent text-danger font-semibold text-sm transition-colors"
				>
					C
				</motion.button>
				{/* Add Cash */}
				<motion.button
					type="button"
					whileTap={{ scale: 0.92 }}
					onClick={confirm}
					disabled={digits === "0"}
					className="h-11 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm transition-colors disabled:opacity-40 flex items-center justify-center gap-1"
				>
					<Plus size={14} /> Add
				</motion.button>
			</div>
		</div>
	);
}

/* ─── Main modal ─────────────────────────────────── */
export function POSCheckoutModal({ open, onClose }: POSCheckoutModalProps) {
	const [appliedMobile, setAppliedMobile] = useState<AppliedMobile[]>([]);
	const [cashEntries, setCashEntries] = useState<number[]>([]);
	const [success, setSuccess] = useState(false);
	const [loading, setLoading] = useState(false);
	const [activeTab, setActiveTab] = useState<"mpesa" | "cash" | "card">(
		"mpesa",
	);

	// Store subscriptions
	const sessions = usePosSessionStore((s) => s.sessions);
	const activeSessionId = usePosSessionStore((s) => s.activeSessionId);
	const removeSession = usePosSessionStore((s) => s.removeSession);

	const payments = usePaymentNotificationsStore((s) => s.payments);
	const markApplied = usePaymentNotificationsStore((s) => s.markApplied);
	const createOrder = useOrderStore((s) => s.createOrder);

	// Derived
	const session = sessions.find((s) => s.id === activeSessionId);
	const items = session?.items ?? [];
	const subtotal = items.reduce((s, i) => s + i.product.price * i.quantity, 0);
	const tax = subtotal * TAX_RATE;
	const total = subtotal + tax;

	const pendingPayments = payments.filter(
		(p) =>
			p.status === "pending" &&
			!appliedMobile.some((m) => m.paymentId === p.id),
	);

	const totalMobile = appliedMobile.reduce((s, m) => s + m.amount, 0);
	const totalCash = cashEntries.reduce((s, c) => s + c, 0);
	const totalPaid = totalMobile + totalCash;
	const remaining = total - totalPaid;
	const change = totalPaid - total;
	const isFullyPaid = totalPaid >= total;

	const applyMobile = useCallback((p: IncomingPayment) => {
		setAppliedMobile((prev) => [
			...prev,
			{
				paymentId: p.id,
				amount: p.amount,
				provider: p.provider,
				senderName: p.senderName,
				reference: p.reference,
			},
		]);
	}, []);

	const removeMobile = (paymentId: string) =>
		setAppliedMobile((prev) => prev.filter((m) => m.paymentId !== paymentId));

	const addCash = (amount: number) =>
		setCashEntries((prev) => [...prev, amount]);
	const removeCash = (idx: number) =>
		setCashEntries((prev) => prev.filter((_, i) => i !== idx));

	const handleConfirm = async () => {
		if (!session || !isFullyPaid) return;
		setLoading(true);
		await new Promise((r) => setTimeout(r, 700));
		const orderId = generateId();

		const pm: PaymentMethod =
			appliedMobile.length > 0 && totalCash === 0
				? "mobile"
				: appliedMobile.length === 0 && totalCash > 0
					? "cash"
					: "mobile";

		createOrder({
			items,
			subtotal,
			tax,
			total,
			paymentMethod: pm,
			cashierName: "John",
		});
		for (const m of appliedMobile) {
			markApplied(m.paymentId, orderId);
		}
		removeSession(session.id);
		setLoading(false);
		setSuccess(true);
	};

	const handleClose = () => {
		setSuccess(false);
		setAppliedMobile([]);
		setCashEntries([]);
		setActiveTab("mpesa");
		onClose();
	};

	return (
		<Modal
			open={open}
			onClose={handleClose}
			title={success ? "Payment Complete!" : "Checkout"}
			size="xl"
		>
			{success ? (
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					animate={{ opacity: 1, scale: 1 }}
					className="flex flex-col items-center gap-4 py-8 text-center"
				>
					<motion.div
						initial={{ scale: 0 }}
						animate={{ scale: 1 }}
						transition={{ type: "spring", bounce: 0.5, delay: 0.1 }}
					>
						<CheckCircle2 size={64} className="text-success" />
					</motion.div>
					<div>
						<p className="text-2xl font-bold text-foreground">
							Payment Complete!
						</p>
						<p className="text-muted-foreground text-sm mt-1">
							Order saved · ready for next customer
						</p>
						{change > 0.009 && (
							<div className="mt-3 px-6 py-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 inline-block">
								<p className="text-xs text-amber-600 font-medium">
									Change to give back
								</p>
								<p className="text-3xl font-extrabold text-amber-500 tabular-nums">
									{formatCurrency(change)}
								</p>
							</div>
						)}
					</div>
					<Button
						size="lg"
						className="w-full max-w-xs mt-2"
						onClick={handleClose}
					>
						Next Order
					</Button>
				</motion.div>
			) : (
				<div className="grid grid-cols-[1fr_300px] gap-0 h-[520px]">
					{/* ── LEFT: Payment input area ──────────────────── */}
					<div className="flex flex-col pr-5 border-r border-border overflow-hidden">
						{/* Tabs: M-Pesa | Cash | Card */}
						<div className="flex gap-1 mb-4 shrink-0">
							{(
								[
									{
										id: "mpesa",
										label: "Mobile Money",
										icon: <Zap size={13} />,
									},
									{ id: "cash", label: "Cash", icon: <Banknote size={13} /> },
									{ id: "card", label: "Card", icon: <CreditCard size={13} /> },
								] as const
							).map((tab) => (
								<button
									key={tab.id}
									type="button"
									onClick={() => setActiveTab(tab.id)}
									className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
										activeTab === tab.id
											? "bg-primary text-primary-foreground shadow-sm"
											: "text-muted-foreground hover:bg-accent"
									}`}
								>
									{tab.icon} {tab.label}
								</button>
							))}
						</div>

						{/* Tab content */}
						<div className="flex-1 overflow-y-auto">
							<AnimatePresence mode="wait">
								{/* Mobile money feed */}
								{activeTab === "mpesa" && (
									<motion.div
										key="mpesa"
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0 }}
										className="space-y-2"
									>
										{pendingPayments.length === 0 ? (
											<div className="flex flex-col items-center gap-3 py-12 text-center">
												<Zap size={28} className="text-muted-foreground/30" />
												<p className="text-sm text-muted-foreground">
													No pending mobile payments
												</p>
												<p className="text-xs text-muted-foreground">
													Payments will appear here as they arrive
												</p>
											</div>
										) : (
											pendingPayments.map((p) => {
												const color = PROVIDER_COLOR[p.provider];
												const bg = PROVIDER_BG[p.provider];
												return (
													<motion.button
														key={p.id}
														type="button"
														onClick={() => applyMobile(p)}
														whileTap={{ scale: 0.98 }}
														className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left hover:shadow-md transition-all group ${bg}`}
													>
														<div
															className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 bg-gradient-to-br from-indigo-500 to-violet-600`}
														>
															{p.senderName.charAt(0)}
														</div>
														<div className="flex-1 min-w-0">
															<p className="text-sm font-semibold text-foreground">
																{p.senderName}
															</p>
															<p
																className={`text-xs font-bold uppercase ${color}`}
															>
																{p.provider} ·{" "}
																<span className="font-mono font-normal text-muted-foreground">
																	{p.reference}
																</span>
															</p>
														</div>
														<div className="flex items-center gap-2 shrink-0">
															<span
																className={`text-base font-bold tabular-nums ${color}`}
															>
																{formatCurrency(p.amount)}
															</span>
															<div className="w-6 h-6 rounded-full bg-primary/0 group-hover:bg-primary text-primary group-hover:text-primary-foreground flex items-center justify-center transition-all">
																<Plus size={13} />
															</div>
														</div>
													</motion.button>
												);
											})
										)}
									</motion.div>
								)}

								{/* Cash calculator */}
								{activeTab === "cash" && (
									<motion.div
										key="cash"
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0 }}
									>
										<CashPad onAdd={addCash} />
									</motion.div>
								)}

								{/* Card */}
								{activeTab === "card" && (
									<motion.div
										key="card"
										initial={{ opacity: 0, x: -10 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0 }}
										className="flex flex-col items-center gap-4 py-12 text-center"
									>
										<CreditCard size={36} className="text-violet-500" />
										<div>
											<p className="font-semibold text-foreground">
												Card Payment
											</p>
											<p className="text-xs text-muted-foreground mt-1">
												Process card for{" "}
												{formatCurrency(Math.max(remaining, 0))}
											</p>
										</div>
										<Button
											onClick={() => addCash(Math.max(remaining, 0))}
											variant="secondary"
										>
											Mark Card Paid
										</Button>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>

					{/* ── RIGHT: Breakdown + summary ─────────────────── */}
					<div className="flex flex-col pl-5 overflow-hidden">
						{/* Order total */}
						<div className="mb-3 shrink-0">
							<p className="text-xs text-muted-foreground font-medium mb-1">
								Order Total
							</p>
							<p className="text-2xl font-extrabold text-foreground tabular-nums">
								{formatCurrency(total)}
							</p>
							<p className="text-[10px] text-muted-foreground">
								{items.length} items · Tax {formatCurrency(tax)}
							</p>
						</div>

						{/* Applied payments list */}
						<div className="flex-1 overflow-y-auto space-y-1.5 mb-3">
							<p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
								Applied Payments
							</p>
							<AnimatePresence initial={false}>
								{appliedMobile.length === 0 && cashEntries.length === 0 && (
									<motion.p
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										exit={{ opacity: 0 }}
										className="text-xs text-muted-foreground italic py-2"
									>
										No payments applied yet
									</motion.p>
								)}
								{appliedMobile.map((m) => (
									<motion.div
										key={m.paymentId}
										initial={{ opacity: 0, x: 16 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 16, height: 0 }}
										className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 border border-border"
									>
										<Zap size={11} className={PROVIDER_COLOR[m.provider]} />
										<div className="flex-1 min-w-0">
											<p className="text-[11px] font-semibold text-foreground truncate">
												{m.senderName}
											</p>
											<p
												className={`text-[10px] uppercase ${PROVIDER_COLOR[m.provider]}`}
											>
												{m.provider}
											</p>
										</div>
										<span className="text-xs font-bold tabular-nums text-foreground">
											{formatCurrency(m.amount)}
										</span>
										<button
											type="button"
											onClick={() => removeMobile(m.paymentId)}
											className="p-0.5 hover:text-danger text-muted-foreground transition-colors"
										>
											<X size={11} />
										</button>
									</motion.div>
								))}
								{cashEntries.map((c, i) => (
									<motion.div
										key={`cash-${i}`}
										initial={{ opacity: 0, x: 16 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 16, height: 0 }}
										className="flex items-center gap-2 px-3 py-2 rounded-xl bg-muted/50 border border-border"
									>
										<Banknote size={11} className="text-amber-500" />
										<div className="flex-1">
											<p className="text-[11px] font-semibold text-foreground">
												Cash
											</p>
										</div>
										<span className="text-xs font-bold tabular-nums text-foreground">
											{formatCurrency(c)}
										</span>
										<button
											type="button"
											onClick={() => removeCash(i)}
											className="p-0.5 hover:text-danger text-muted-foreground transition-colors"
										>
											<X size={11} />
										</button>
									</motion.div>
								))}
							</AnimatePresence>
						</div>

						{/* Running totals */}
						<div className="shrink-0 space-y-1.5 rounded-xl border border-border p-3 bg-muted/30 mb-3">
							<div className="flex justify-between text-xs text-muted-foreground">
								<span>Total due</span>
								<span className="tabular-nums font-medium text-foreground">
									{formatCurrency(total)}
								</span>
							</div>
							<div className="flex justify-between text-xs text-muted-foreground">
								<span>Paid</span>
								<span
									className={`tabular-nums font-semibold ${totalPaid > 0 ? "text-emerald-500" : "text-muted-foreground"}`}
								>
									{formatCurrency(totalPaid)}
								</span>
							</div>
							<div className="flex justify-between font-bold border-t border-border pt-1.5">
								{isFullyPaid ? (
									<>
										<span className="text-xs text-emerald-500">Change</span>
										<span className="text-sm text-amber-500 tabular-nums">
											{formatCurrency(change)}
										</span>
									</>
								) : (
									<>
										<span className="text-xs text-rose-500">Remaining</span>
										<span className="text-sm text-rose-500 tabular-nums">
											{formatCurrency(remaining)}
										</span>
									</>
								)}
							</div>
						</div>

						{/* Confirm */}
						<Button
							loading={loading}
							size="lg"
							className="w-full shrink-0"
							variant={isFullyPaid ? "success" : "primary"}
							onClick={handleConfirm}
							disabled={!isFullyPaid || items.length === 0}
						>
							{isFullyPaid
								? change > 0.009
									? `Confirm · Change ${formatCurrency(change)}`
									: "Confirm Payment ✓"
								: `Still owed ${formatCurrency(remaining)}`}
						</Button>
					</div>
				</div>
			)}
		</Modal>
	);
}
