"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
	ChevronLeft,
	ChevronRight,
	ClipboardList,
	LayoutDashboard,
	Package,
	ShoppingCart,
	Store,
	Users,
	Warehouse,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUIStore } from "@/stores/uiStore";

const navItems = [
	{ href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
	{ href: "/pos", label: "POS / Checkout", icon: ShoppingCart },
	{ href: "/products", label: "Products", icon: Package },
	{ href: "/orders", label: "Orders", icon: ClipboardList },
	{ href: "/inventory", label: "Inventory", icon: Warehouse },
	{ href: "/customers", label: "Customers", icon: Users },
];

export function Sidebar() {
	const pathname = usePathname();
	const { sidebarOpen, toggleSidebar } = useUIStore();

	return (
		<motion.aside
			animate={{ width: sidebarOpen ? 240 : 72 }}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className="relative flex flex-col h-full bg-sidebar border-r border-border overflow-hidden shrink-0 z-30"
		>
			{/* Logo */}
			<div className="flex items-center h-16 px-4 border-b border-border shrink-0">
				<div className="flex items-center gap-3 min-w-0">
					<div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shrink-0 shadow-lg">
						<Store size={18} className="text-white" />
					</div>
					<AnimatePresence>
						{sidebarOpen && (
							<motion.span
								initial={{ opacity: 0, width: 0 }}
								animate={{ opacity: 1, width: "auto" }}
								exit={{ opacity: 0, width: 0 }}
								transition={{ duration: 0.2 }}
								className="font-bold text-lg text-foreground whitespace-nowrap overflow-hidden"
							>
								BizRoss
							</motion.span>
						)}
					</AnimatePresence>
				</div>
			</div>

			{/* Nav */}
			<nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
				{navItems.map(({ href, label, icon: Icon }) => {
					const active = pathname === href || pathname.startsWith(`${href}/`);
					return (
						<Link key={href} href={href}>
							<motion.div
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.97 }}
								className={cn(
									"flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-colors relative",
									active
										? "bg-primary text-primary-foreground shadow-md"
										: "text-muted-foreground hover:bg-accent hover:text-foreground",
								)}
							>
								{active && (
									<motion.div
										layoutId="active-pill"
										className="absolute inset-0 bg-primary rounded-xl"
										style={{ zIndex: -1 }}
										transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
									/>
								)}
								<Icon size={18} className="shrink-0" />
								<AnimatePresence>
									{sidebarOpen && (
										<motion.span
											initial={{ opacity: 0, width: 0 }}
											animate={{ opacity: 1, width: "auto" }}
											exit={{ opacity: 0, width: 0 }}
											transition={{ duration: 0.2 }}
											className="whitespace-nowrap overflow-hidden"
										>
											{label}
										</motion.span>
									)}
								</AnimatePresence>
							</motion.div>
						</Link>
					);
				})}
			</nav>

			{/* Collapse toggle */}
			<div className="p-2 border-t border-border">
				<button
					type="button"
					onClick={toggleSidebar}
					className="w-full flex items-center justify-center h-9 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
				>
					{sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
				</button>
			</div>
		</motion.aside>
	);
}
