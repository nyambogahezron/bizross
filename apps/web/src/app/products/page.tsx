"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";
import { formatCurrency, getStockStatus } from "@/lib/utils";
import { useProductStore } from "@/stores/productStore";
import type {
	Product,
	ProductCategory,
	ProductFormData,
} from "@/types/product";

const categories: Exclude<ProductCategory, "All">[] = [
	"Food & Beverage",
	"Household",
	"Personal Care",
	"Electronics",
	"Stationery",
];

const DEFAULT_FORM: ProductFormData = {
	name: "",
	price: 0,
	sku: "",
	stock: 0,
	category: "Food & Beverage",
	lowStockThreshold: 10,
};

export default function ProductsPage() {
	const { products, addProduct, updateProduct, deleteProduct } =
		useProductStore();
	const [search, setSearch] = useState("");
	const [modal, setModal] = useState<"add" | "edit" | null>(null);
	const [editTarget, setEditTarget] = useState<Product | null>(null);
	const [form, setForm] = useState<ProductFormData>(DEFAULT_FORM);

	const filtered = products.filter(
		(p) =>
			p.name.toLowerCase().includes(search.toLowerCase()) ||
			p.sku.toLowerCase().includes(search.toLowerCase()),
	);

	const openAdd = () => {
		setForm(DEFAULT_FORM);
		setModal("add");
	};
	const openEdit = (p: Product) => {
		setEditTarget(p);
		setForm({
			name: p.name,
			price: p.price,
			sku: p.sku,
			stock: p.stock,
			category: p.category,
			lowStockThreshold: p.lowStockThreshold,
		});
		setModal("edit");
	};
	const closeModal = () => {
		setModal(null);
		setEditTarget(null);
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (modal === "add") addProduct(form);
		else if (modal === "edit" && editTarget) updateProduct(editTarget.id, form);
		closeModal();
	};

	return (
		<AppLayout title="Products">
			<div className="flex items-center justify-between mb-5">
				<SearchInput
					value={search}
					onChange={setSearch}
					placeholder="Search products..."
					className="max-w-xs"
				/>
				<Button onClick={openAdd} size="md">
					<Plus size={16} /> Add Product
				</Button>
			</div>

			<div className="card overflow-hidden">
				<div className="overflow-x-auto">
					<table className="w-full text-sm">
						<thead>
							<tr className="border-b border-border bg-muted/50">
								{[
									"Name",
									"SKU",
									"Category",
									"Price",
									"Stock",
									"Status",
									"Actions",
								].map((h) => (
									<th
										key={h}
										className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wide"
									>
										{h}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							<AnimatePresence initial={false}>
								{filtered.length === 0 ? (
									<tr>
										<td colSpan={7}>
											<EmptyState title="No products found" />
										</td>
									</tr>
								) : (
									filtered.map((p, i) => {
										const stock = getStockStatus(p.stock, p.lowStockThreshold);
										return (
											<motion.tr
												key={p.id}
												initial={{ opacity: 0, y: 8 }}
												animate={{ opacity: 1, y: 0 }}
												exit={{ opacity: 0 }}
												transition={{ delay: i * 0.03 }}
												className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
											>
												<td className="px-4 py-3 font-medium text-foreground">
													{p.name}
												</td>
												<td className="px-4 py-3 text-muted-foreground font-mono text-xs">
													{p.sku}
												</td>
												<td className="px-4 py-3">
													<Badge variant="default">{p.category}</Badge>
												</td>
												<td className="px-4 py-3 font-bold text-foreground tabular-nums">
													{formatCurrency(p.price)}
												</td>
												<td className="px-4 py-3 tabular-nums text-foreground">
													{p.stock}
												</td>
												<td className="px-4 py-3">
													<Badge
														variant={
															stock === "out"
																? "danger"
																: stock === "low"
																	? "warning"
																	: "success"
														}
													>
														{stock === "out"
															? "Out of stock"
															: stock === "low"
																? "Low stock"
																: "In stock"}
													</Badge>
												</td>
												<td className="px-4 py-3">
													<div className="flex items-center gap-1">
														<button
															type="button"
															onClick={() => openEdit(p)}
															className="p-1.5 rounded-lg hover:bg-accent text-muted-foreground hover:text-foreground transition-colors"
														>
															<Pencil size={14} />
														</button>
														<button
															type="button"
															onClick={() => deleteProduct(p.id)}
															className="p-1.5 rounded-lg hover:bg-danger/10 text-muted-foreground hover:text-danger transition-colors"
														>
															<Trash2 size={14} />
														</button>
													</div>
												</td>
											</motion.tr>
										);
									})
								)}
							</AnimatePresence>
						</tbody>
					</table>
				</div>
			</div>

			{/* Add / Edit Modal */}
			<Modal
				open={!!modal}
				onClose={closeModal}
				title={modal === "add" ? "Add Product" : "Edit Product"}
			>
				<form onSubmit={handleSubmit} className="space-y-4">
					{[
						{ label: "Product Name", key: "name", type: "text" },
						{ label: "SKU", key: "sku", type: "text" },
						{ label: "Price ($)", key: "price", type: "number" },
						{ label: "Stock", key: "stock", type: "number" },
						{
							label: "Low Stock Threshold",
							key: "lowStockThreshold",
							type: "number",
						},
					].map(({ label, key, type }) => (
						<div key={key}>
							<label className="text-sm font-medium text-foreground block mb-1">
								{label}
							</label>
							<input
								type={type}
								step={type === "number" ? "0.01" : undefined}
								required
								value={form[key as keyof ProductFormData] as string | number}
								onChange={(e) =>
									setForm((f) => ({
										...f,
										[key]:
											type === "number"
												? parseFloat(e.target.value) || 0
												: e.target.value,
									}))
								}
								className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
							/>
						</div>
					))}
					<div>
						<label className="text-sm font-medium text-foreground block mb-1">
							Category
						</label>
						<select
							value={form.category}
							onChange={(e) =>
								setForm((f) => ({
									...f,
									category: e.target.value as Exclude<ProductCategory, "All">,
								}))
							}
							className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
						>
							{categories.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
					</div>
					<div className="flex gap-3 pt-2">
						<Button
							type="button"
							variant="ghost"
							className="flex-1"
							onClick={closeModal}
						>
							Cancel
						</Button>
						<Button type="submit" className="flex-1">
							{modal === "add" ? "Add Product" : "Save Changes"}
						</Button>
					</div>
				</form>
			</Modal>
		</AppLayout>
	);
}
