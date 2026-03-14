"use client";

import { AlertCircle, ArrowRight, CheckCircle2, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { resetPassword } from "../../../lib/auth-client";

function ResetPasswordForm() {
	const router = useRouter();
	const searchParams = useSearchParams();
	const token = searchParams.get("token") || "";

	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		if (!token) {
			setError(
				"No reset token found. Please request a new password reset link.",
			);
		}
	}, [token]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!token) return;

		if (newPassword !== confirmPassword) {
			setError("Passwords do not match.");
			return;
		}

		setLoading(true);
		setError("");

		const { error: err } = await resetPassword({
			newPassword,
			token,
		});

		if (err) {
			setError(err.message || "Failed to reset password.");
			setLoading(false);
		} else {
			setSuccess(true);
			setLoading(false);
			setTimeout(() => {
				router.push("/sign-in");
			}, 3000);
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
            Secure your account.
          </h2>
          <p className="text-blue-100/80 text-lg">
            Create a strong, unique password to keep your business data safe and accessible only to you.
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
							Set New Password
						</h1>
						<p className="text-gray-400">Enter your new password below.</p>
					</div>

					<div className="glass bg-white/5 border border-white/10 rounded-2xl p-8 relative overflow-hidden backdrop-blur-xl">
						<div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />

						{success ? (
							<div className="relative z-10 text-center space-y-4">
								<div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
									<CheckCircle2 className="w-8 h-8 text-blue-400" />
								</div>
								<h3 className="text-xl font-medium text-white">
									Password Reset Successfully
								</h3>
								<p className="text-gray-400 text-sm pb-4">
									Redirecting you to the sign in page...
								</p>
							</div>
						) : (
							<form className="relative z-10 space-y-5" onSubmit={handleSubmit}>
								{error && (
									<div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl flex items-start gap-3 text-sm">
										<AlertCircle className="w-5 h-5 shrink-0" />
										<p>{error}</p>
									</div>
								)}

								<div className="space-y-2">
									<label
										className="text-sm font-medium text-gray-300"
										htmlFor="newPassword"
									>
										New Password
									</label>
									<div className="relative">
										<Lock className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
										<input
											id="newPassword"
											type="password"
											required
											value={newPassword}
											onChange={(e) => setNewPassword(e.target.value)}
											className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
											placeholder="••••••••"
										/>
									</div>
								</div>

								<div className="space-y-2">
									<label
										className="text-sm font-medium text-gray-300"
										htmlFor="confirmPassword"
									>
										Confirm Password
									</label>
									<div className="relative">
										<Lock className="w-5 h-5 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
										<input
											id="confirmPassword"
											type="password"
											required
											value={confirmPassword}
											onChange={(e) => setConfirmPassword(e.target.value)}
											className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none transition-all"
											placeholder="••••••••"
										/>
									</div>
								</div>

								<button
									type="submit"
									disabled={loading || !token}
									className="w-full bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 text-white font-medium px-4 py-3 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed mt-2"
								>
									{loading ? "Resetting..." : "Reset Password"}
									{!loading && (
										<ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
									)}
								</button>
							</form>
						)}
					</div>
				</div>
			</div>
		</main>
	);
}

export default function ResetPassword() {
	return (
		<Suspense
			fallback={
				<main className="min-h-screen relative flex items-center justify-center py-20 px-4 pt-32">
					<div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[128px] pointer-events-none" />
					<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[128px] pointer-events-none" />
					<div className="text-white">Loading...</div>
				</main>
			}
		>
			<ResetPasswordForm />
		</Suspense>
	);
}
