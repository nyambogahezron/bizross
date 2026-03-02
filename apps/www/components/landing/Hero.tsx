"use client";

import { motion } from "framer-motion";
import {
	fadeIn,
	fadeUp,
	floatAnimation,
	staggerContainer,
	viewportOnce,
} from "@/lib/animations";

const stats = [
	{ value: "10K+", label: "Active Shops" },
	{ value: "99.9%", label: "Uptime" },
	{ value: "4.9★", label: "User Rating" },
	{ value: "< 1s", label: "Checkout Speed" },
];

export default function Hero() {
	return (
		<section
			id="hero"
			className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 pt-20"
		>
			{/* Background glow blobs */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-primary/20 blur-[120px]" />
				<div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] rounded-full bg-secondary/15 blur-[100px]" />
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-primary/10 blur-[80px]" />
			</div>

			{/* Grid pattern overlay */}
			<div
				className="absolute inset-0 pointer-events-none opacity-[0.03]"
				style={{
					backgroundImage:
						"linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)",
					backgroundSize: "60px 60px",
				}}
			/>

			<motion.div
				variants={staggerContainer}
				initial="hidden"
				animate="visible"
				className="relative z-10 max-w-5xl mx-auto text-center"
			>
				{/* Badge */}
				<motion.div
					variants={fadeUp}
					className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border badge-primary text-sm font-medium mb-8"
				>
					<span className="w-2 h-2 rounded-full bg-success animate-pulse" />
					Now with Offline Mode &amp; Real-time Reports
				</motion.div>

				{/* Headline */}
				<motion.h1
					variants={fadeUp}
					className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.08] mb-6"
				>
					The Smart POS for{" "}
					<span className="gradient-text">Growing Businesses</span>
				</motion.h1>

				{/* Subheading */}
				<motion.p
					variants={fadeUp}
					className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10 leading-relaxed"
				>
					Manage sales, inventory, and customers in one simple system. Built for
					small shops, warehouses, and supermarkets.
				</motion.p>

				{/* CTA Buttons */}
				<motion.div
					variants={fadeUp}
					className="flex flex-col sm:flex-row gap-4 justify-center"
				>
					<motion.a
						href="#cta"
						whileHover={{
							scale: 1.04,
							boxShadow:
								"0 20px 60px color-mix(in srgb, var(--primary) 50%, transparent)",
						}}
						whileTap={{ scale: 0.97 }}
						className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-foreground btn-primary rounded-xl transition-shadow duration-300"
					>
						<svg
							aria-hidden="true"
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M13 10V3L4 14h7v7l9-11h-7z"
							/>
						</svg>
						Start Free Trial
					</motion.a>
					<motion.a
						href="#how-it-works"
						whileHover={{ scale: 1.04 }}
						whileTap={{ scale: 0.97 }}
						className="inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-foreground glass border border-overlay-light rounded-xl hover:border-primary/50 transition-all duration-300"
					>
						<svg
							aria-hidden="true"
							className="w-4 h-4"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
							/>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
							/>
						</svg>
						Book a Demo
					</motion.a>
				</motion.div>

				{/* Trust badges */}
				<motion.p variants={fadeIn} className="mt-6 text-xs text-text-muted">
					No credit card required · Free 30-day trial · Cancel anytime
				</motion.p>
			</motion.div>

			{/* Dashboard Mockup */}
			<motion.div
				initial={{ opacity: 0, y: 80, scale: 0.95 }}
				animate={{ opacity: 1, y: 0, scale: 1 }}
				transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
				className="relative z-10 w-full max-w-5xl mx-auto mt-16 px-4"
			>
				<motion.div animate={floatAnimation} className="relative">
					{/* Glow behind mockup */}
					<div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 blur-2xl transform scale-105" />

					{/* Dashboard UI */}
					<div className="relative glass border border-overlay-light rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
						{/* Titlebar */}
						<div className="flex items-center gap-2 px-4 py-3 border-b border-overlay-light bg-surface">
							<span className="w-3 h-3 rounded-full bg-danger/80" />
							<span className="w-3 h-3 rounded-full bg-warning/80" />
							<span className="w-3 h-3 rounded-full bg-success/80" />
							<div className="flex-1 text-center">
								<span className="text-xs text-text-muted font-mono">
									bizross.io/dashboard
								</span>
							</div>
						</div>

						{/* Dashboard Content */}
						<div className="p-4 sm:p-6 grid grid-cols-12 gap-4 bg-background">
							{/* Sidebar */}
							<div className="col-span-2 hidden sm:flex flex-col gap-3">
								{[
									"Dashboard",
									"Sales",
									"Inventory",
									"Reports",
									"Customers",
								].map((item, i) => (
									<div
										key={item}
										className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
											i === 0
												? "bg-primary/20 text-primary-light border border-primary/30"
												: "text-text-muted hover:text-text-secondary"
										}`}
									>
										{item}
									</div>
								))}
							</div>

							{/* Main Content */}
							<div className="col-span-12 sm:col-span-10 space-y-4">
								{/* Stat Cards */}
								<div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
									{[
										{
											label: "Today's Sales",
											value: "KSh 24,500",
											up: true,
											change: "+12%",
										},
										{
											label: "Items Sold",
											value: "142",
											up: true,
											change: "+8%",
										},
										{
											label: "Stock Alerts",
											value: "3",
											up: false,
											change: "-2",
										},
										{
											label: "Customers",
											value: "67",
											up: true,
											change: "+5%",
										},
									].map((stat) => (
										<div
											key={stat.label}
											className="bg-surface border border-overlay-border rounded-xl p-3 sm:p-4"
										>
											<p className="text-[10px] text-text-muted mb-1">
												{stat.label}
											</p>
											<p className="text-sm sm:text-base font-bold text-foreground">
												{stat.value}
											</p>
											<span
												className={`text-[10px] font-medium ${stat.up ? "text-success" : "text-danger"}`}
											>
												{stat.change}
											</span>
										</div>
									))}
								</div>

								{/* Chart placeholder */}
								<div className="bg-surface border border-overlay-border rounded-xl p-4">
									<div className="flex items-center justify-between mb-3">
										<span className="text-xs font-medium text-text-secondary">
											Weekly Revenue
										</span>
										<span className="text-[10px] text-primary-light bg-primary/10 px-2 py-0.5 rounded-full">
											This week
										</span>
									</div>
									{/* Bar chart */}
									<div className="flex items-end gap-1.5 h-16">
										{[
											{ day: "Mon", h: 40 },
											{ day: "Tue", h: 65 },
											{ day: "Wed", h: 45 },
											{ day: "Thu", h: 80 },
											{ day: "Fri", h: 70 },
											{ day: "Sat", h: 90 },
											{ day: "Sun", h: 85 },
										].map(({ day, h }) => (
											<div
												key={day}
												className="flex-1 flex flex-col items-center gap-1"
											>
												<div
													className="w-full rounded-sm bg-linear-to-t from-primary to-secondary opacity-80"
													style={{ height: `${h}%` }}
												/>
											</div>
										))}
									</div>
									<div className="flex gap-1.5 mt-1">
										{["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
											(d) => (
												<div
													key={d}
													className="flex-1 text-center text-[9px] text-text-muted"
												>
													{d[0]}
												</div>
											),
										)}
									</div>
								</div>

								{/* Recent transactions */}
								<div className="bg-surface border border-overlay-border rounded-xl p-4">
									<p className="text-xs font-medium text-text-secondary mb-3">
										Recent Transactions
									</p>
									<div className="space-y-2">
										{[
											{
												name: "Unga Pembe 2kg",
												qty: 4,
												amount: "KSh 480",
												time: "2m ago",
											},
											{
												name: "Cooking Oil 1L",
												qty: 2,
												amount: "KSh 320",
												time: "5m ago",
											},
											{
												name: "Sugar 1kg",
												qty: 6,
												amount: "KSh 540",
												time: "12m ago",
											},
										].map((tx) => (
											<div
												key={tx.name}
												className="flex items-center justify-between text-[11px]"
											>
												<div>
													<span className="text-text-secondary font-medium">
														{tx.name}
													</span>
													<span className="text-text-muted ml-2">
														×{tx.qty}
													</span>
												</div>
												<div className="text-right">
													<span className="text-success font-semibold">
														{tx.amount}
													</span>
													<span className="text-text-muted ml-2">
														{tx.time}
													</span>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						</div>
					</div>
				</motion.div>
			</motion.div>

			{/* Stats row */}
			<motion.div
				variants={staggerContainer}
				initial="hidden"
				whileInView="visible"
				viewport={viewportOnce}
				className="relative z-10 w-full max-w-3xl mx-auto mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 px-4 pb-12"
			>
				{stats.map((stat) => (
					<motion.div
						key={stat.label}
						variants={fadeUp}
						className="text-center"
					>
						<div className="text-2xl sm:text-3xl font-extrabold gradient-text">
							{stat.value}
						</div>
						<div className="text-xs text-text-muted mt-1">{stat.label}</div>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
}
