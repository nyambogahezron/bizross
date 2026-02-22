"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
	open: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	size?: "sm" | "md" | "lg" | "xl";
}

const sizeMap = {
	sm: "max-w-md",
	md: "max-w-lg",
	lg: "max-w-2xl",
	xl: "max-w-4xl",
};

export function Modal({
	open,
	onClose,
	title,
	children,
	size = "md",
}: ModalProps) {
	// Close on Escape
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, [onClose]);

	return (
		<AnimatePresence>
			{open && (
				<div className="fixed inset-0 z-50 flex items-center justify-center p-4">
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 bg-black/60 backdrop-blur-sm"
					/>

					{/* Panel */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95, y: 10 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.95, y: 10 }}
						transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
						className={`relative w-full ${sizeMap[size]} card bg-card p-6 shadow-2xl z-10`}
					>
						<div className="flex items-center justify-between mb-5">
							<h2 className="text-lg font-semibold text-foreground">{title}</h2>
							<button
								type="button"
								onClick={onClose}
								className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
							>
								<X size={16} />
							</button>
						</div>
						{children}
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
}
