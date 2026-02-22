"use client";

import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { ThemeProvider } from "./ThemeProvider";
import { Topbar } from "./Topbar";

interface AppLayoutProps {
	children: React.ReactNode;
	title: string;
}

const pageVariants = {
	initial: { opacity: 0, y: 8 },
	animate: { opacity: 1, y: 0 },
	exit: { opacity: 0, y: -8 },
};

export function AppLayout({ children, title }: AppLayoutProps) {
	return (
		<ThemeProvider>
			<div className="flex h-screen bg-background text-foreground overflow-hidden">
				<Sidebar />
				<div className="flex flex-col flex-1 min-w-0">
					<Topbar title={title} />
					<motion.main
						variants={pageVariants}
						initial="initial"
						animate="animate"
						transition={{ duration: 0.3, ease: "easeOut" }}
						className="flex-1 overflow-y-auto p-6"
					>
						{children}
					</motion.main>
				</div>
			</div>
		</ThemeProvider>
	);
}
