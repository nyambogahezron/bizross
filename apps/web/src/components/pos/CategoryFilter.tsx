"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { ProductCategory } from "@/types/product";

const categories: ProductCategory[] = [
	"All",
	"Food & Beverage",
	"Household",
	"Personal Care",
	"Electronics",
	"Stationery",
];

interface CategoryFilterProps {
	active: ProductCategory;
	onSelect: (cat: ProductCategory) => void;
}

export function CategoryFilter({ active, onSelect }: CategoryFilterProps) {
	return (
		<div className="flex gap-2 flex-wrap">
			{categories.map((cat) => (
				<button
					key={cat}
					type="button"
					onClick={() => onSelect(cat)}
					className={cn(
						"relative px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
						active === cat
							? "text-primary-foreground"
							: "text-muted-foreground hover:text-foreground hover:bg-accent",
					)}
				>
					{active === cat && (
						<motion.div
							layoutId="cat-active"
							className="absolute inset-0 bg-primary rounded-full"
							style={{ zIndex: -1 }}
							transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
						/>
					)}
					{cat}
				</button>
			))}
		</div>
	);
}
