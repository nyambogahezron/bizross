"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Hash, Package, Plus, ScanLine, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { formatCurrency, getStockStatus } from "@/lib/utils";
import { usePosSessionStore } from "@/stores/posSessionStore";
import { useProductStore } from "@/stores/productStore";
import type { Product } from "@/types/product";

export function POSScanAdd() {
	const [query, setQuery] = useState("");
	const [flashId, setFlashId] = useState<string | null>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const products = useProductStore((s) => s.products);
	const addItem = usePosSessionStore((s) => s.addItem);
	const sessions = usePosSessionStore((s) => s.sessions);
	const activeSessionId = usePosSessionStore((s) => s.activeSessionId);
	const activeSession = sessions.find((s) => s.id === activeSessionId);

	// Auto-focus on mount
	useEffect(() => {
		inputRef.current?.focus();
	}, []);

	const q = query.toLowerCase().trim();

	// Search: name, SKU, or item number
	const results: Product[] =
		q.length === 0
			? []
			: products
					.filter(
						(p) =>
							p.name.toLowerCase().includes(q) ||
							p.sku.toLowerCase().includes(q) ||
							String(p.id).toLowerCase().includes(q),
					)
					.slice(0, 8);

	const handleAdd = (product: Product) => {
		const stock = getStockStatus(product.stock, product.lowStockThreshold);
		if (stock === "out") return;
		addItem(product);
		setFlashId(product.id);
		setTimeout(() => setFlashId(null), 600);
		setQuery("");
		inputRef.current?.focus();
	};

	// On Enter: if exactly one exact SKU/barcode match → add immediately
	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key !== "Enter") return;
		const exact = products.find(
			(p) => p.sku.toLowerCase() === q || p.id.toLowerCase() === q,
		);
		if (exact) {
			handleAdd(exact);
			return;
		}
		// If only one result → add it
		if (results.length === 1) {
			handleAdd(results[0]);
		}
	};

	// Recently added (last 5 unique from active session)
	const recentItems = activeSession?.items.slice().reverse().slice(0, 5) ?? [];

	return (
		<div className="flex flex-col h-full">
			{/* ── Header ── */}
			<div className="px-5 pt-4 pb-3 border-b border-border shrink-0">
				<div className="flex items-center gap-2 mb-1">
					<ScanLine size={15} className="text-primary" />
					<h2 className="text-sm font-bold text-foreground">Scan / Search</h2>
				</div>
				<p className="text-[11px] text-muted-foreground">
					Scan barcode or type name · SKU · item number
				</p>
			</div>

			{/* ── Search Input ── */}
			<div className="px-5 py-3 shrink-0">
				<div className="relative">
					<Search
						size={14}
						className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none"
					/>
					<input
						ref={inputRef}
						type="text"
						value={query}
						onChange={(e) => setQuery(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder="Barcode, SKU, or product name…"
						autoComplete="off"
						spellCheck={false}
						className="w-full h-11 pl-9 pr-9 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
					/>
					{query && (
						<button
							type="button"
							onClick={() => {
								setQuery("");
								inputRef.current?.focus();
							}}
							className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
						>
							<X size={13} />
						</button>
					)}
				</div>
			</div>

			{/* ── Content area ── */}
			<div className="flex-1 overflow-y-auto px-5 pb-4">
				{/* Search results */}
				<AnimatePresence mode="wait">
					{results.length > 0 && (
						<motion.div
							key="results"
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="space-y-1.5 mb-5"
						>
							<p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
								{results.length} result{results.length !== 1 ? "s" : ""}
							</p>
							{results.map((p) => {
								const stock = getStockStatus(p.stock, p.lowStockThreshold);
								const isOut = stock === "out";
								const cartQty =
									activeSession?.items.find((i) => i.product.id === p.id)
										?.quantity ?? 0;
								return (
									<motion.button
										key={p.id}
										type="button"
										onClick={() => handleAdd(p)}
										disabled={isOut}
										initial={{ opacity: 0, y: 6 }}
										animate={{
											opacity: 1,
											y: 0,
											backgroundColor:
												flashId === p.id
													? "var(--color-primary)"
													: "transparent",
										}}
										transition={{ duration: 0.15 }}
										className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/40 hover:bg-accent disabled:opacity-40 disabled:cursor-not-allowed transition-all text-left group"
									>
										{/* Icon */}
										<div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center shrink-0">
											<Package size={15} className="text-muted-foreground" />
										</div>

										{/* Info */}
										<div className="flex-1 min-w-0">
											<p className="text-sm font-medium text-foreground truncate">
												{p.name}
											</p>
											<div className="flex items-center gap-2 mt-0.5">
												<span className="flex items-center gap-1 text-[10px] text-muted-foreground font-mono">
													<Hash size={8} />
													{p.sku}
												</span>
												<span
													className={`text-[10px] font-medium ${
														isOut
															? "text-danger"
															: stock === "low"
																? "text-warning"
																: "text-success"
													}`}
												>
													{isOut ? "Out of stock" : `Stock: ${p.stock}`}
												</span>
											</div>
										</div>

										{/* Price + cart qty + add btn */}
										<div className="flex items-center gap-2 shrink-0">
											{cartQty > 0 && (
												<span className="w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">
													{cartQty}
												</span>
											)}
											<span className="text-sm font-bold text-foreground tabular-nums">
												{formatCurrency(p.price)}
											</span>
											{!isOut && (
												<div className="w-7 h-7 rounded-lg bg-primary/10 group-hover:bg-primary group-hover:text-primary-foreground text-primary flex items-center justify-center transition-colors">
													<Plus size={13} />
												</div>
											)}
										</div>
									</motion.button>
								);
							})}
						</motion.div>
					)}
				</AnimatePresence>

				{/* Empty search state */}
				{q.length > 0 && results.length === 0 && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex flex-col items-center gap-2 py-10 text-center"
					>
						<Search size={28} className="text-muted-foreground/40" />
						<p className="text-sm text-muted-foreground">
							No product found for <strong>"{query}"</strong>
						</p>
						<p className="text-xs text-muted-foreground">
							Try a different name, SKU, or barcode
						</p>
					</motion.div>
				)}

				{/* Recently added (when not searching) */}
				{q.length === 0 && recentItems.length > 0 && (
					<div>
						<p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
							In this order
						</p>
						<div className="space-y-1.5">
							{recentItems.map((item) => (
								<div
									key={item.product.id}
									className="flex items-center gap-3 px-3 py-2 rounded-xl bg-muted/50 border border-border"
								>
									<div className="flex-1 min-w-0">
										<p className="text-xs font-medium text-foreground truncate">
											{item.product.name}
										</p>
										<p className="text-[10px] text-muted-foreground font-mono">
											{item.product.sku}
										</p>
									</div>
									<span className="text-xs text-muted-foreground">
										×{item.quantity}
									</span>
									<span className="text-xs font-bold tabular-nums text-foreground">
										{formatCurrency(item.product.price * item.quantity)}
									</span>
								</div>
							))}
						</div>
					</div>
				)}

				{/* Idle state */}
				{q.length === 0 && recentItems.length === 0 && (
					<div className="flex flex-col items-center gap-4 py-12 text-center">
						<motion.div
							animate={{ scale: [1, 1.04, 1] }}
							transition={{ repeat: Infinity, duration: 2.5 }}
							className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center"
						>
							<ScanLine size={30} className="text-muted-foreground/50" />
						</motion.div>
						<div>
							<p className="text-sm font-medium text-foreground">
								Ready to scan
							</p>
							<p className="text-xs text-muted-foreground mt-1">
								Point a barcode scanner here
								<br />
								or type a product name above
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
