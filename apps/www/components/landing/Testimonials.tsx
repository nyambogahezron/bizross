"use client";

import { motion } from "framer-motion";
import {
	fadeUp,
	scaleIn,
	staggerContainer,
	viewportOnce,
} from "@/lib/animations";

const testimonials = [
	{
		name: "Joyce Wanjiku",
		role: "Owner",
		business: "Wanjiku General Store, Nakuru",
		avatar: "JW",
		avatarGrad: "from-primary to-accent",
		rating: 5,
		content:
			"BizRoss changed everything for my shop. I used to write every sale by hand. Now I just tap and the stock updates automatically. Even my workers can use it after 5 minutes.",
	},
	{
		name: "Hassan Abdullahi",
		role: "Manager",
		business: "Mega Electronics Hub, Mombasa",
		avatar: "HA",
		avatarGrad: "from-secondary to-blue-600",
		rating: 5,
		content:
			"We sell hundreds of electronics daily. BizRoss handles barcodes, serial numbers, warranties — everything. The offline mode saved us when our internet went down during our busiest day.",
	},
	{
		name: "Grace Achieng",
		role: "Proprietor",
		business: "Achieng's Minimart, Kisumu",
		avatar: "GA",
		avatarGrad: "from-success to-teal-600",
		rating: 5,
		content:
			"The reports section is my favorite. I can see exactly what products are selling and which are just taking space. I cut dead stock by 40% in just two months. Worth every shilling.",
	},
];

const StarIcon = () => (
	<svg
		aria-hidden="true"
		className="w-4 h-4 text-warning fill-warning"
		viewBox="0 0 20 20"
	>
		<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
	</svg>
);

export default function Testimonials() {
	return (
		<section id="testimonials" className="section relative overflow-hidden">
			<div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-warning/30 to-transparent" />
			<div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full bg-accent/15 blur-[100px] pointer-events-none" />

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
						className="inline-flex items-center gap-2 px-3 py-1 rounded-full border badge-warning text-xs font-medium mb-4"
					>
						✦ Testimonials
					</motion.div>
					<motion.h2
						variants={fadeUp}
						className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4"
					>
						Loved by shop owners{" "}
						<span className="gradient-text">across Africa</span>
					</motion.h2>
					<motion.p
						variants={fadeUp}
						className="text-text-secondary text-lg max-w-xl mx-auto"
					>
						Real stories from real businesses. See how BizRoss is transforming
						local commerce.
					</motion.p>
				</motion.div>

				{/* Testimonial Cards */}
				<motion.div
					variants={staggerContainer}
					initial="hidden"
					whileInView="visible"
					viewport={viewportOnce}
					className="grid grid-cols-1 md:grid-cols-3 gap-6"
				>
					{testimonials.map((t) => (
						<motion.div
							key={t.name}
							variants={scaleIn}
							whileHover={{ y: -8, scale: 1.02 }}
							transition={{ type: "spring", stiffness: 300, damping: 25 }}
							className="group relative glass border border-overlay-border rounded-2xl p-6 flex flex-col hover:border-overlay-border-hover transition-all duration-300"
						>
							{/* Quote mark */}
							<div className="absolute -top-3 left-6 text-6xl text-primary/20 font-serif leading-none select-none">
								&ldquo;
							</div>

							{/* Stars */}
							<div className="flex gap-0.5 mb-4">
								{Array.from({ length: t.rating }, (_, i) => (
									<StarIcon key={`star-${t.name}-${i}`} />
								))}
							</div>

							{/* Content */}
							<p className="text-text-secondary text-sm leading-relaxed flex-1 mb-6 italic">
								&ldquo;{t.content}&rdquo;
							</p>

							{/* Author */}
							<div className="flex items-center gap-3">
								<div
									className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.avatarGrad} flex items-center justify-center text-foreground text-xs font-bold flex-shrink-0`}
								>
									{t.avatar}
								</div>
								<div>
									<p className="text-sm font-semibold text-foreground">
										{t.name}
									</p>
									<p className="text-xs text-text-muted">{t.business}</p>
								</div>
							</div>

							{/* Bottom gradient line */}
							<div className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-primary/50 to-secondary/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						</motion.div>
					))}
				</motion.div>

				{/* Trust bar */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={viewportOnce}
					transition={{ duration: 0.6, delay: 0.4 }}
					className="mt-16 text-center"
				>
					<p className="text-text-muted text-sm mb-4">
						Trusted by businesses across
					</p>
					<div className="flex flex-wrap items-center justify-center gap-6 text-text-muted text-xs font-medium">
						{[
							"Nairobi",
							"Mombasa",
							"Kisumu",
							"Nakuru",
							"Eldoret",
							"Kampala",
							"Dar es Salaam",
						].map((city) => (
							<span key={city} className="flex items-center gap-1.5">
								<span className="w-1 h-1 rounded-full bg-primary" />
								{city}
							</span>
						))}
					</div>
				</motion.div>
			</div>
		</section>
	);
}
