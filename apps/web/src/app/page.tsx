"use client";

import { motion } from "framer-motion";
import {
	ClipboardList,
	LayoutDashboard,
	LogOut,
	Moon,
	Package,
	Store,
	Sun,
	Users,
	Warehouse,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { PaymentFeed } from "@/components/pos/PaymentFeed";
import { POSCartPanel } from "@/components/pos/POSCartPanel";
import { POSCheckoutModal } from "@/components/pos/POSCheckoutModal";
import { POSScanAdd } from "@/components/pos/POSScanAdd";
import { useUIStore } from "@/stores/uiStore";

const navLinks = [
	{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/products", label: "Products", icon: Package },
	{ href: "/orders", label: "Orders", icon: ClipboardList },
	{ href: "/inventory", label: "Inventory", icon: Warehouse },
	{ href: "/customers", label: "Customers", icon: Users },
];

export default function POSPage() {
	const [checkoutOpen, setCheckoutOpen] = useState(false);
	const { theme, toggleTheme } = useUIStore();

	return (
		<ThemeProvider>
			<div className="flex h-screen bg-background text-foreground overflow-hidden">
				{/* ── Icon sidebar ─────────────────────────────────────── */}
				<aside className="w-14 flex flex-col items-center py-3 gap-2 bg-sidebar border-r border-border shrink-0">
					{/* Logo */}
					<div className="w-8 h-8 rounded-xl bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-lg mb-2">
						<Store size={15} className="text-white" />
					</div>

					{/* Active POS indicator */}
					<div
						className="w-8 h-8 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary"
						aria-label="POS"
					>
						<svg
							width="15"
							height="15"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							aria-hidden="true"
						>
							<title>POS Active</title>
							<circle cx="9" cy="21" r="1" />
							<circle cx="20" cy="21" r="1" />
							<path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
						</svg>
					</div>

					<div className="flex-1" />

					{/* Nav links to other sections */}
					{navLinks.map(({ href, label, icon: Icon }) => (
						<Link key={href} href={href} title={label}>
							<motion.div
								whileHover={{ scale: 1.12 }}
								whileTap={{ scale: 0.9 }}
								className="w-8 h-8 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
							>
								<Icon size={15} />
							</motion.div>
						</Link>
					))}

					<div className="w-6 border-t border-border my-1" />

					{/* Theme toggle */}
					<motion.button
						type="button"
						whileTap={{ scale: 0.9, rotate: 20 }}
						onClick={toggleTheme}
						title="Toggle theme"
						className="w-8 h-8 rounded-xl hover:bg-accent text-muted-foreground hover:text-foreground flex items-center justify-center transition-colors"
					>
						{theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
					</motion.button>

					{/* Logout */}
					<Link href="/login" title="Logout">
						<div className="w-8 h-8 rounded-xl hover:bg-danger/10 text-muted-foreground hover:text-danger flex items-center justify-center transition-colors">
							<LogOut size={14} />
						</div>
					</Link>

					{/* Cashier avatar */}
					<div className="w-8 h-8 rounded-full bg-linear-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-xs font-bold">
						J
					</div>
				</aside>

				{/* ── LEFT: Payment Feed ───────────────────────────────── */}
				<aside className="w-[230px] shrink-0 flex flex-col border-r border-border bg-sidebar overflow-hidden">
					<PaymentFeed />
				</aside>

				{/* ── CENTER: Scan / Search to add ─────────────────────── */}
				<div className="flex-1 flex flex-col min-w-0 overflow-hidden">
					<POSScanAdd />
				</div>

				{/* ── RIGHT: Cart ───────────────────────────────────────── */}
				<aside className="w-75 shrink-0 flex flex-col border-l border-border bg-sidebar">
					<div className="p-4 flex-1 overflow-hidden flex flex-col">
						<POSCartPanel onCheckout={() => setCheckoutOpen(true)} />
					</div>
				</aside>

				<POSCheckoutModal
					open={checkoutOpen}
					onClose={() => setCheckoutOpen(false)}
				/>
			</div>
		</ThemeProvider>
	);
}
