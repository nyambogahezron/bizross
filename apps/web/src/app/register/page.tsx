"use client";

import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, Store, Zap } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/Button";

const PLANS = [
	{ name: "Starter", desc: "Up to 500 products", price: "Free" },
	{ name: "Pro", desc: "Unlimited + analytics", price: "$9/mo" },
];

export default function RegisterPage() {
	const router = useRouter();
	const [form, setForm] = useState({
		name: "",
		email: "",
		shopName: "",
		password: "",
	});
	const [showPwd, setShowPwd] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
		setForm((f) => ({ ...f, [k]: e.target.value }));

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		const { name, email, shopName, password } = form;
		if (!name || !email || !shopName || !password) {
			setError("All fields are required.");
			return;
		}
		if (password.length < 6) {
			setError("Password must be at least 6 characters.");
			return;
		}
		setLoading(true);
		await new Promise((r) => setTimeout(r, 1000));
		setLoading(false);
		router.push("/pos");
	};

	return (
		<ThemeProvider>
			<div className="flex h-screen bg-background text-foreground overflow-hidden">
				{/* ─── Left Brand Panel ──────────────────────────────── */}
				<motion.div
					initial={{ opacity: 0, x: -30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="hidden lg:flex flex-col justify-between w-[40%] bg-gradient-to-br from-violet-600 via-indigo-600 to-blue-600 p-12 relative overflow-hidden"
				>
					<div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
					<div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl pointer-events-none" />

					{/* Logo */}
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
							<Store size={20} className="text-white" />
						</div>
						<span className="text-2xl font-bold text-white">BizRoss</span>
					</div>

					{/* Headline */}
					<div className="space-y-6">
						<motion.h1
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 }}
							className="text-4xl font-extrabold text-white leading-tight"
						>
							Start selling
							<br />
							in minutes
						</motion.h1>
						<p className="text-indigo-100 text-sm leading-relaxed max-w-xs">
							Set up your shop, add your products, and start taking payments —
							no technical knowledge required.
						</p>

						{/* Plan cards */}
						<div className="grid grid-cols-2 gap-3">
							{PLANS.map((plan, i) => (
								<motion.div
									key={plan.name}
									initial={{ opacity: 0, y: 16 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{ delay: 0.3 + i * 0.1 }}
									className="rounded-2xl bg-white/10 backdrop-blur-sm p-4 border border-white/20"
								>
									<div className="flex items-center gap-1.5 mb-1">
										<Zap size={12} className="text-yellow-300" />
										<span className="text-white font-semibold text-sm">
											{plan.name}
										</span>
									</div>
									<p className="text-indigo-200 text-xs">{plan.desc}</p>
									<p className="text-white font-bold mt-2">{plan.price}</p>
								</motion.div>
							))}
						</div>
					</div>

					<p className="text-indigo-200/60 text-xs">
						© 2026 BizRoss — No credit card required
					</p>
				</motion.div>

				{/* ─── Right Form Panel ──────────────────────────────── */}
				<motion.div
					initial={{ opacity: 0, x: 30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="flex-1 flex items-center justify-center p-8 overflow-y-auto"
				>
					<div className="w-full max-w-md space-y-7">
						{/* Mobile logo */}
						<div className="flex items-center gap-3 lg:hidden">
							<div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
								<Store size={17} className="text-white" />
							</div>
							<span className="font-bold text-xl text-foreground">BizRoss</span>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-foreground">
								Create your account
							</h2>
							<p className="text-muted-foreground text-sm mt-1">
								Get your shop up and running for free
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							{[
								{
									label: "Full Name",
									key: "name",
									type: "text",
									placeholder: "John Kamau",
									auto: "name",
								},
								{
									label: "Shop / Business Name",
									key: "shopName",
									type: "text",
									placeholder: "Kamau General Store",
									auto: "organization",
								},
								{
									label: "Email Address",
									key: "email",
									type: "email",
									placeholder: "john@myshop.com",
									auto: "email",
								},
							].map(({ label, key, type, placeholder, auto }) => (
								<div key={key}>
									<label className="text-sm font-medium text-foreground block mb-1.5">
										{label}
									</label>
									<input
										type={type}
										autoComplete={auto}
										placeholder={placeholder}
										value={form[key as keyof typeof form]}
										onChange={set(key)}
										className="w-full h-11 px-4 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
									/>
								</div>
							))}

							<div>
								<label className="text-sm font-medium text-foreground block mb-1.5">
									Password
								</label>
								<div className="relative">
									<input
										type={showPwd ? "text" : "password"}
										autoComplete="new-password"
										placeholder="Min. 6 characters"
										value={form.password}
										onChange={set("password")}
										className="w-full h-11 px-4 pr-11 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
									/>
									<button
										type="button"
										onClick={() => setShowPwd((v) => !v)}
										className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
									>
										{showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
									</button>
								</div>
							</div>

							{error && (
								<motion.p
									initial={{ opacity: 0, y: -6 }}
									animate={{ opacity: 1, y: 0 }}
									className="text-sm text-danger bg-danger/10 rounded-xl px-4 py-2"
								>
									{error}
								</motion.p>
							)}

							<Button
								type="submit"
								size="lg"
								loading={loading}
								className="w-full mt-1"
							>
								Create Account <ArrowRight size={16} />
							</Button>

							<p className="text-xs text-muted-foreground text-center">
								By creating an account you agree to our{" "}
								<span className="text-primary cursor-pointer hover:underline">
									Terms of Service
								</span>{" "}
								&amp;{" "}
								<span className="text-primary cursor-pointer hover:underline">
									Privacy Policy
								</span>
								.
							</p>
						</form>

						<p className="text-sm text-muted-foreground text-center">
							Already have an account?{" "}
							<Link
								href="/login"
								className="text-primary font-semibold hover:underline"
							>
								Sign in
							</Link>
						</p>
					</div>
				</motion.div>
			</div>
		</ThemeProvider>
	);
}
