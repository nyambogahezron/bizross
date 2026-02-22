"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Clock, Plus, ShoppingBag, Trash2, User } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { calcSubtotal, usePosSessionStore } from "@/stores/posSessionStore";

export function OrderQueue() {
	const sessions = usePosSessionStore((s) => s.sessions);
	const activeSessionId = usePosSessionStore((s) => s.activeSessionId);
	const activateSession = usePosSessionStore((s) => s.activateSession);
	const createSession = usePosSessionStore((s) => s.createSession);
	const removeSession = usePosSessionStore((s) => s.removeSession);

	const timeAgo = (iso: string) => {
		const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
		if (secs < 60) return `${secs}s ago`;
		const mins = Math.floor(secs / 60);
		if (mins < 60) return `${mins}m ago`;
		return `${Math.floor(mins / 60)}h ago`;
	};

	return (
		<div className="flex flex-col h-full">
			{/* Header */}
			<div className="flex items-center justify-between px-3 py-3 border-b border-border shrink-0">
				<div>
					<h2 className="text-xs font-bold text-foreground uppercase tracking-wider">
						Order Queue
					</h2>
					<p className="text-[10px] text-muted-foreground mt-0.5">
						{sessions.length} open
					</p>
				</div>
				<motion.button
					type="button"
					whileTap={{ scale: 0.92 }}
					onClick={() => createSession()}
					className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-primary text-primary-foreground text-xs font-semibold hover:opacity-90 transition-opacity"
				>
					<Plus size={12} /> New
				</motion.button>
			</div>

			{/* Session list */}
			<div className="flex-1 overflow-y-auto py-2 px-2 space-y-2">
				<AnimatePresence initial={false}>
					{sessions.map((session) => {
						const isActive = session.id === activeSessionId;
						const subtotal = calcSubtotal(session.items);
						const itemCount = session.items.reduce((s, i) => s + i.quantity, 0);

						return (
							<motion.button
								key={session.id}
								type="button"
								layout
								initial={{ opacity: 0, y: 10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95 }}
								onClick={() => activateSession(session.id)}
								className={`w-full text-left rounded-xl border p-3 transition-all cursor-pointer group relative ${
									isActive
										? "border-primary bg-primary/10 shadow-sm"
										: "border-border hover:border-primary/40 hover:bg-accent"
								}`}
							>
								{/* Active indicator */}
								{isActive && (
									<motion.div
										layoutId="queue-active"
										className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-primary"
										transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
									/>
								)}

								{/* Order number */}
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center gap-1.5">
										<ShoppingBag
											size={11}
											className={
												isActive ? "text-primary" : "text-muted-foreground"
											}
										/>
										<span
											className={`text-xs font-bold font-mono ${isActive ? "text-primary" : "text-foreground"}`}
										>
											{session.orderNumber}
										</span>
									</div>
									{/* Delete — only shown on hover, not for last session */}
									{sessions.length > 1 && (
										<button
											type="button"
											onClick={(e) => {
												e.stopPropagation();
												removeSession(session.id);
											}}
											className="opacity-0 group-hover:opacity-100 p-0.5 rounded hover:text-danger text-muted-foreground transition-all"
										>
											<Trash2 size={11} />
										</button>
									)}
								</div>

								{/* Customer */}
								{session.customerName ? (
									<div className="flex items-center gap-1 text-[11px] text-muted-foreground mb-1.5">
										<User size={10} /> {session.customerName}
									</div>
								) : (
									<div className="text-[11px] text-muted-foreground mb-1.5">
										Walk-in customer
									</div>
								)}

								{/* Items preview */}
								{session.items.length > 0 ? (
									<div className="text-[11px] text-muted-foreground mb-2 truncate">
										{session.items
											.slice(0, 2)
											.map((i) => `${i.product.name} ×${i.quantity}`)
											.join(", ")}
										{session.items.length > 2 &&
											` +${session.items.length - 2} more`}
									</div>
								) : (
									<div className="text-[11px] text-muted-foreground italic mb-2">
										Empty order
									</div>
								)}

								{/* Footer row */}
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-1 text-[10px] text-muted-foreground">
										<Clock size={9} /> {timeAgo(session.createdAt)}
									</div>
									<div className="flex items-center gap-2">
										{itemCount > 0 && (
											<span className="text-[10px] text-muted-foreground">
												{itemCount} items
											</span>
										)}
										<span
											className={`text-xs font-bold tabular-nums ${isActive ? "text-primary" : "text-foreground"}`}
										>
											{formatCurrency(subtotal)}
										</span>
									</div>
								</div>
							</motion.button>
						);
					})}
				</AnimatePresence>
			</div>
		</div>
	);
}
