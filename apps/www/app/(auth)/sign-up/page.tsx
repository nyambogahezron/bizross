"use client";

import { AlertCircle, ArrowRight, Lock, Mail, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, signUp } from "../../../lib/auth-client";

export default function SignUp() {
	const router = useRouter();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");

	const handleSignUp = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError("");

		const { error: err } = await signUp.email({
			name,
			email,
			password,
		});

		if (err) {
			setError(err.message || "Something went wrong.");
			setLoading(false);
		} else {
			router.push("/dashboard");
		}
	};

	const handleGoogleSignIn = async () => {
		setLoading(true);
		setError("");

		const { error: err } = await signIn.social({
			provider: "google",
			callbackURL: "http://localhost:3000/dashboard",
		});

		if (err) {
			setError(err.message || "Google sign in failed.");
			setLoading(false);
		}
	};

	return (
		<main className="min-h-screen flex">
      {/* Left Side: Brand/Info */}
      <div className="hidden lg:flex w-1/2 bg-blue-900/10 relative items-center justify-center p-12 overflow-hidden border-r border-white/10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[128px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[128px] pointer-events-none" />
        
        <div className="relative z-10 max-w-lg">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-2xl font-bold text-white">BizRoss</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
            Start building amazing things today.
          </h2>
          <p className="text-blue-100/80 text-lg">
            Create an account in seconds and unlock the full potential of your business with our comprehensive toolkit.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative">
				{/* Mobile-only Background elements */}
				<div className="lg:hidden absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />
				<div className="lg:hidden absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />

				<div className="w-full max-w-md relative z-10">
					<div className="text-center mb-10">
						<h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent mb-4">
							Create an account
						</h1>
						<p className="text-gray-400">
							Join us to start building amazing things
						</p>
					</div>

				<div className="glass bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden backdrop-blur-xl">
					<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />

					<form className="relative z-10 space-y-5" onSubmit={handleSignUp}>
						{error && (
							<div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl flex items-start gap-3 text-sm">
								<AlertCircle className="w-5 h-5 shrink-0" />
								<p>{error}</p>
							</div>
						)}

						<div className="space-y-2">
							<label
								className="text-sm font-medium text-gray-300"
								htmlFor="name"
							>
								Full Name
							</label>
							<div className="relative">
								<User className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
								<input
									id="name"
									type="text"
									required
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
									placeholder="John Doe"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label
								className="text-sm font-medium text-gray-300"
								htmlFor="email"
							>
								Email
							</label>
							<div className="relative">
								<Mail className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
								<input
									id="email"
									type="email"
									required
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
									placeholder="name@company.com"
								/>
							</div>
						</div>

						<div className="space-y-2">
							<label
								className="text-sm font-medium text-gray-300"
								htmlFor="password"
							>
								Password
							</label>
							<div className="relative">
								<Lock className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
								<input
									id="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
									placeholder="••••••••"
								/>
							</div>
						</div>

						<button
							type="submit"
							disabled={loading}
							className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-medium px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-2"
						>
							{loading ? "Creating account..." : "Sign up"}
							{!loading && (
								<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
							)}
						</button>
					</form>

					<div className="relative z-10 flex items-center gap-4 my-6">
						<div className="h-px bg-white/10 flex-1" />
						<span className="text-xs text-gray-400">or sign up with</span>
						<div className="h-px bg-white/10 flex-1" />
					</div>

					<button
						type="button"
						disabled={loading}
						onClick={handleGoogleSignIn}
						className="relative z-10 w-full bg-white/5 border border-white/10 hover:bg-white/10 text-white font-medium px-4 py-3 rounded-xl transition-colors flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
							<path
								d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
								fill="#4285F4"
							/>
							<path
								d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
								fill="#34A853"
							/>
							<path
								d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
								fill="#FBBC05"
							/>
							<path
								d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
								fill="#EA4335"
							/>
						</svg>
						Google
					</button>
				</div>

					<p className="text-center text-sm text-gray-400 mt-8">
						Already have an account?{" "}
						<Link
							href="/sign-in"
							className="text-blue-400 hover:text-blue-300 transition-colors"
						>
							Sign in
						</Link>
					</p>
				</div>
      </div>
		</main>
	);
}
