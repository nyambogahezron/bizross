"use client";

import { motion } from "framer-motion";
import {
	fadeUp,
	scaleIn,
	staggerContainer,
	viewportOnce,
} from "@/lib/animations";

interface Plan {
	name: string;
	price: string;
	period: string;
	description: string;
	features: string[];
	highlighted: boolean;
	badge?: string;
}

const plans: Plan[] = [
	{
		name: "Starter",
		price: "Free",
		period: "30 days trial",
		description: "Perfect for new shops just getting started.",
		features: [
			"Up to 200 products",
			"1 cashier device",
			"Basic sales reports",
			"M-Pesa integration",
			"Email support",
		],
		highlighted: false,
	},
	{
		name: "Pro",
		price: "KSh 1,499",
		period: "/month",
		description: "Ideal for growing shops and minimarkets.",
		features: [
			"Unlimited products",
			"Up to 3 devices",
			"Advanced analytics",
			"Inventory management",
			"Offline mode",
			"Priority support",
		],
		highlighted: true,
		badge: "Most Popular",
	},
	{
		name: "Business",
		price: "KSh 3,999",
		period: "/month",
		description: "For warehouses and chains with multiple branches.",
		features: [
			"Everything in Pro",
			"Unlimited devices",
			"Multi-branch support",
			"Staff management",
			"Custom reports & exports",
			"24/7 dedicated support",
		],
		highlighted: false,
	},
];

const CheckIcon = () => (
	<svg
		aria-hidden="true"
		className="w-4 h-4 text-success flex-shrink-0"
		fill="none"
		stroke="currentColor"
		viewBox="0 0 24 24"
	>
		<path
			strokeLinecap="round"
			strokeLinejoin="round"
			strokeWidth={2.5}
			d="M5 13l4 4L19 7"
		/>
	</svg>
);

export default function Pricing() {
	return (
		<section id="pricing" className="section relative overflow-hidden">
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
			<div className="absolute top-1/2 left-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

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
						className="inline-flex items-center gap-2 px-3 py-1 rounded-full border badge-primary text-xs font-medium mb-4"
					>
						✦ Pricing
					</motion.div>
					<motion.h2
						variants={fadeUp}
						className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
					>
						Simple, transparent <span className="gradient-text">pricing</span>
					</motion.h2>
					<motion.p
						variants={fadeUp}
						className="text-text-secondary text-lg max-w-xl mx-auto"
					>
						Start free, grow at your own pace. No surprise fees, cancel anytime.
					</motion.p>
				</motion.div>

				{/* Pricing Cards */}
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={viewportOnce}
					className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
				>
					{plans.map((plan) => (
						<motion.div
							key={plan.name}
							variants={scaleIn}
							whileHover={{
								y: plan.highlighted ? -4 : -6,
								scale: plan.highlighted ? 1.01 : 1.02,
							}}
							transition={{ type: "spring", stiffness: 300, damping: 25 }}
							className={`relative rounded-2xl p-7 flex flex-col gap-6 transition-all duration-300 ${
								plan.highlighted
									? "bg-gradient-to-br from-primary/20 to-secondary/10 border-2 border-primary/60 shadow-2xl shadow-primary/20"
									: "glass border border-overlay-border hover:border-overlay-border-hover"
							}`}
						>
							{plan.badge && (
								<div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
									<span className="px-4 py-1.5 text-xs font-bold text-foreground btn-primary rounded-full shadow-lg">
										{plan.badge}
									</span>
								</div>
							)}

							{/* Plan header */}
							<div>
								<h3 className="text-base font-bold text-text-secondary mb-1">
									{plan.name}
								</h3>
								<div className="flex items-end gap-1 mb-2">
									<span className="text-4xl font-black text-foreground">
										{plan.price}
									</span>
									<span className="text-text-muted text-sm mb-1">
										{plan.period}
									</span>
								</div>
								<p className="text-sm text-text-muted">{plan.description}</p>
							</div>

							{/* Features */}
							<ul className="space-y-3 flex-1">
								{plan.features.map((feature) => (
									<li
										key={feature}
										className="flex items-center gap-3 text-sm text-text-secondary"
									>
										<CheckIcon />
										{feature}
									</li>
								))}
							</ul>

							{/* CTA */}
							<motion.a
								href="#cta"
								whileHover={{ scale: 1.04 }}
								whileTap={{ scale: 0.97 }}
								className={`text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
									plan.highlighted
										? "btn-primary text-foreground shadow-lg"
										: "glass border border-overlay-light text-foreground hover:border-overlay-border-hover hover:bg-surface"
								}`}
							>
								{plan.name === "Starter"
									? "Start Free Trial"
									: `Get ${plan.name}`}
							</motion.a>
						</motion.div>
					))}
				</motion.div>

				{/* Bottom note */}
				<motion.p
					initial={{ opacity: 0, y: 10 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewportOnce}
					transition={{ delay: 0.5 }}
					className="text-center text-sm text-text-muted mt-10"
				>
					All plans include a 30-day free trial · No credit card required ·
					Cancel anytime
				</motion.p>
			</div>
		</section>
	);
}
