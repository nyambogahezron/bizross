"use client";

import { motion } from "framer-motion";
import { ArrowRight, Eye, EyeOff, ShieldCheck, Store } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { Button } from "@/components/ui/Button";

const FEATURES = [
	"Fast & touch-friendly checkout",
	"Real-time inventory tracking",
	"Detailed sales analytics",
	"Multi-payment support",
];

export default function LoginPage() {
	const router = useRouter();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPwd, setShowPwd] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		if (!email || !password) {
			setError("Please fill in all fields.");
			return;
		}
		setLoading(true);
		await new Promise((r) => setTimeout(r, 900));
		setLoading(false);
		// Demo: any credentials work
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
					className="hidden lg:flex flex-col justify-between w-[45%] bg-gradient-to-br from-indigo-600 via-indigo-500 to-violet-600 p-12 relative overflow-hidden"
				>
					{/* Background orbs */}
					<div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none" />
					<div className="absolute -bottom-24 -right-16 w-80 h-80 rounded-full bg-violet-400/20 blur-3xl pointer-events-none" />

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
							Your Modern
							<br />
							Point of Sale
						</motion.h1>
						<p className="text-indigo-100 text-base leading-relaxed max-w-xs">
							Everything you need to run your shop — from checkout to stock
							management — in one fast, beautiful app.
						</p>
						<ul className="space-y-3">
							{FEATURES.map((f, i) => (
								<motion.li
									key={f}
									initial={{ opacity: 0, x: -16 }}
									animate={{ opacity: 1, x: 0 }}
									transition={{ delay: 0.3 + i * 0.08 }}
									className="flex items-center gap-3 text-sm text-indigo-100"
								>
									<div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
										<ShieldCheck size={11} className="text-white" />
									</div>
									{f}
								</motion.li>
							))}
						</ul>
					</div>

					<p className="text-indigo-200/60 text-xs">
						© 2026 BizRoss — Built for small shops
					</p>
				</motion.div>

				{/* ─── Right Form Panel ──────────────────────────────── */}
				<motion.div
					initial={{ opacity: 0, x: 30 }}
					animate={{ opacity: 1, x: 0 }}
					transition={{ duration: 0.5 }}
					className="flex-1 flex items-center justify-center p-8"
				>
					<div className="w-full max-w-md space-y-8">
						{/* Mobile logo */}
						<div className="flex items-center gap-3 lg:hidden">
							<div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center">
								<Store size={17} className="text-white" />
							</div>
							<span className="font-bold text-xl text-foreground">BizRoss</span>
						</div>

						<div>
							<h2 className="text-2xl font-bold text-foreground">
								Welcome back
							</h2>
							<p className="text-muted-foreground text-sm mt-1">
								Sign in to your cashier account
							</p>
						</div>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label className="text-sm font-medium text-foreground block mb-1.5">
									Email address
								</label>
								<input
									type="email"
									autoComplete="email"
									placeholder="cashier@mybizross.com"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full h-11 px-4 rounded-xl bg-muted border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-all"
								/>
							</div>

							<div>
								<div className="flex items-center justify-between mb-1.5">
									<label className="text-sm font-medium text-foreground">
										Password
									</label>
									<button
										type="button"
										className="text-xs text-primary hover:underline"
									>
										Forgot password?
									</button>
								</div>
								<div className="relative">
									<input
										type={showPwd ? "text" : "password"}
										autoComplete="current-password"
										placeholder="••••••••"
										value={password}
										onChange={(e) => setPassword(e.target.value)}
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
								className="w-full mt-2"
							>
								Sign In <ArrowRight size={16} />
							</Button>
						</form>

						<p className="text-sm text-muted-foreground text-center">
							Don&apos;t have an account?{" "}
							<Link
								href="/register"
								className="text-primary font-semibold hover:underline"
							>
								Create account
							</Link>
						</p>

						{/* Demo hint */}
						<div className="rounded-xl border border-border bg-muted/50 px-4 py-3 text-xs text-muted-foreground">
							<strong className="text-foreground">Demo mode:</strong> Enter any
							email & password to log in.
						</div>
					</div>
				</motion.div>
			</div>
		</ThemeProvider>
	);
}
