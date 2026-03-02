"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
	fadeUp,
	floatAnimation,
	staggerContainer,
	viewportOnce,
} from "@/lib/animations";

const screens = [
	{
		label: "POS Checkout",
		description: "Fast, intuitive cashier screen built for speed",
		badge: "Core Feature",
		badgeColor: "bg-primary/20 text-primary-light border-primary/30",
		content: (
			<div className="space-y-3">
				<div className="flex items-center justify-between mb-4">
					<h4 className="text-sm font-bold text-foreground">Open Sale</h4>
					<span className="text-xs text-success bg-success/10 px-2 py-0.5 rounded-full">
						● Active
					</span>
				</div>
				{[
					{ name: "Brooke Sugar 2kg", qty: 2, price: "KSh 260" },
					{ name: "Cooking Oil 500ml", qty: 1, price: "KSh 120" },
					{ name: "Unga Pembe 1kg", qty: 3, price: "KSh 390" },
				].map((item) => (
					<div
						key={item.name}
						className="flex items-center justify-between bg-surface rounded-lg px-3 py-2"
					>
						<div>
							<p className="text-xs font-medium text-foreground">{item.name}</p>
							<p className="text-[10px] text-text-muted">qty: {item.qty}</p>
						</div>
						<span className="text-xs font-bold text-primary-light">
							{item.price}
						</span>
					</div>
				))}
				<div className="pt-2 border-t border-overlay-light">
					<div className="flex justify-between text-sm font-bold text-foreground mb-3">
						<span>Total</span>
						<span>KSh 770</span>
					</div>
					<div className="grid grid-cols-2 gap-2">
						<button
							type="button"
							className="py-2 rounded-lg bg-surface text-xs text-text-secondary"
						>
							Cash
						</button>
						<button
							type="button"
							className="py-2 rounded-lg btn-primary text-xs text-foreground font-semibold"
						>
							M-Pesa
						</button>
					</div>
				</div>
			</div>
		),
	},
	{
		label: "Inventory",
		description: "Real-time stock tracking with low-stock alerts",
		badge: "Always Up-to-date",
		badgeColor: "bg-success/20 text-success border-success/30",
		content: (
			<div className="space-y-3">
				<div className="flex items-center justify-between mb-4">
					<h4 className="text-sm font-bold text-foreground">Stock Overview</h4>
					<span className="text-xs text-warning bg-warning/10 px-2 py-0.5 rounded-full">
						3 Low Stock
					</span>
				</div>
				{[
					{ name: "Maize Flour 2kg", stock: 45, status: "good" },
					{ name: "Rice 5kg", stock: 8, status: "low" },
					{ name: "Sugar 1kg", stock: 120, status: "good" },
					{ name: "Cooking Oil 1L", stock: 4, status: "critical" },
				].map((item) => (
					<div
						key={item.name}
						className="flex items-center justify-between bg-surface rounded-lg px-3 py-2"
					>
						<p className="text-xs font-medium text-foreground">{item.name}</p>
						<div className="flex items-center gap-2">
							<span className="text-xs text-text-secondary">
								{item.stock} units
							</span>
							<span
								className={`w-2 h-2 rounded-full ${item.status === "good" ? "bg-success" : item.status === "low" ? "bg-warning" : "bg-danger"}`}
							/>
						</div>
					</div>
				))}
			</div>
		),
	},
	{
		label: "Reports",
		description: "Beautiful analytics to grow your business faster",
		badge: "Smart Insights",
		badgeColor: "bg-accent/20 text-accent border-accent/30",
		content: (
			<div className="space-y-3">
				<div className="flex items-center justify-between mb-4">
					<h4 className="text-sm font-bold text-foreground">Monthly Summary</h4>
					<span className="text-xs text-primary">February 2026</span>
				</div>
				<div className="grid grid-cols-2 gap-2">
					{[
						{ label: "Revenue", value: "KSh 284K", up: true },
						{ label: "Profit", value: "KSh 61K", up: true },
						{ label: "Orders", value: "1,842", up: true },
						{ label: "Returns", value: "12", up: false },
					].map((metric) => (
						<div key={metric.label} className="bg-surface rounded-lg p-3">
							<p className="text-[10px] text-text-muted mb-1">{metric.label}</p>
							<p className="text-sm font-bold text-foreground">
								{metric.value}
							</p>
							<span
								className={`text-[10px] ${metric.up ? "text-success" : "text-danger"}`}
							>
								{metric.up ? "▲" : "▼"} vs last month
							</span>
						</div>
					))}
				</div>
				{/* Mini bar chart */}
				<div className="bg-surface rounded-lg p-3">
					<p className="text-[10px] text-text-muted mb-2">
						Daily Sales This Week
					</p>
					<div className="flex items-end gap-1 h-10">
						{[60, 45, 80, 35, 90, 70, 55].map((h, i) => (
							<div
								key={h}
								className="flex-1 bg-gradient-to-t from-primary to-secondary rounded-sm opacity-75"
								style={{ height: `${h}%` }}
							/>
						))}
					</div>
				</div>
			</div>
		),
	},
];

export default function Screenshots() {
	const [active, setActive] = useState(0);

	return (
		<section id="screenshots" className="section relative overflow-hidden">
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
			{/* Glow blob */}
			<div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-primary/15 blur-[120px] pointer-events-none" />

			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={viewportOnce}
					className="text-center mb-16"
				>
					<motion.div
						variants={fadeUp}
						className="inline-flex items-center gap-2 px-3 py-1 rounded-full border badge-accent text-xs font-medium mb-4"
					>
						✦ Screenshots
					</motion.div>
					<motion.h2
						variants={fadeUp}
						className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
					>
						Beautiful UI, built for{" "}
						<span className="gradient-text">real work</span>
					</motion.h2>
					<motion.p
						variants={fadeUp}
						className="text-text-secondary text-lg max-w-xl mx-auto"
					>
						Clean, clutter-free screens that anyone can learn in minutes.
					</motion.p>
				</motion.div>

				{/* Tab selector */}
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={viewportOnce}
					className="flex flex-wrap gap-3 justify-center mb-10"
				>
					{screens.map((screen, i) => (
						<motion.button
							key={screen.label}
							variants={fadeUp}
							onClick={() => setActive(i)}
							className={`px-5 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-300 ${
								active === i
									? "bg-primary/20 border-primary/50 text-foreground"
									: "glass border-overlay-light text-text-secondary hover:text-foreground hover:border-overlay-border-hover"
							}`}
						>
							{screen.label}
						</motion.button>
					))}
				</motion.div>

				{/* Screen display */}
				<motion.div
					key={active}
					initial={{ opacity: 0, y: 30 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
					className="max-w-2xl mx-auto"
				>
					<motion.div animate={floatAnimation} className="relative">
						{/* Glow behind */}
						<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 to-secondary/10 blur-xl transform scale-105" />

						<div className="relative glass border border-overlay-light rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
							{/* Phone browser bar */}
							<div className="flex items-center gap-2 px-5 py-3 border-b border-overlay-light bg-surface">
								<span className="w-2.5 h-2.5 rounded-full bg-danger/80" />
								<span className="w-2.5 h-2.5 rounded-full bg-warning/80" />
								<span className="w-2.5 h-2.5 rounded-full bg-success/80" />
								<div className="flex-1 text-center">
									<span className="text-[11px] text-text-muted">
										BizRoss POS — {screens[active].label}
									</span>
								</div>
								<span
									className={`text-[10px] px-2 py-0.5 rounded-full border ${screens[active].badgeColor}`}
								>
									{screens[active].badge}
								</span>
							</div>

							{/* Screen content */}
							<div className="p-5 bg-background min-h-[360px]">
								{screens[active].content}
							</div>
						</div>
					</motion.div>

					<p className="text-center text-sm text-text-secondary mt-6">
						{screens[active].description}
					</p>
				</motion.div>
			</div>
		</section>
	);
}
