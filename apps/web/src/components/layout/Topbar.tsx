"use client";

import { motion } from "framer-motion";
import { Bell, Menu, Moon, Sun } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { useCartStore } from "@/stores/cartStore";
import { useOrderStore } from "@/stores/orderStore";
import { useUIStore } from "@/stores/uiStore";

interface TopbarProps {
	title: string;
}

export function Topbar({ title }: TopbarProps) {
	const { theme, toggleTheme, toggleSidebar } = useUIStore();
	const getItemCount = useCartStore((s) => s.getItemCount);
	const getTodayRevenue = useOrderStore((s) => s.getTodayRevenue);

	return (
		<header className="h-16 flex items-center justify-between px-6 bg-background border-b border-border shrink-0">
			{/* Left */}
			<div className="flex items-center gap-4">
				<button
					type="button"
					onClick={toggleSidebar}
					className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
				>
					<Menu size={18} />
				</button>
				<h1 className="text-lg font-semibold text-foreground">{title}</h1>
			</div>

			{/* Right */}
			<div className="flex items-center gap-3">
				{/* Today revenue chip */}
				<div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-semibold">
					<span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
					{formatCurrency(getTodayRevenue())} today
				</div>

				{/* Cart count */}
				<div className="relative">
					<button
						type="button"
						className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
					>
						<Bell size={18} />
					</button>
					{getItemCount() > 0 && (
						<motion.span
							initial={{ scale: 0 }}
							animate={{ scale: 1 }}
							className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground text-[10px] flex items-center justify-center font-bold"
						>
							{getItemCount()}
						</motion.span>
					)}
				</div>

				{/* Theme toggle */}
				<motion.button
					type="button"
					onClick={toggleTheme}
					whileTap={{ scale: 0.9, rotate: 20 }}
					className="p-2 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
				>
					{theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
				</motion.button>

				{/* Avatar */}
				<div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold">
					J
				</div>
			</div>
		</header>
	);
}
