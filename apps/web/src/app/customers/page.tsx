"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Mail, Phone, Plus } from "lucide-react";
import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/EmptyState";
import { Modal } from "@/components/ui/Modal";
import { SearchInput } from "@/components/ui/SearchInput";
import { formatCurrency, formatDateShort } from "@/lib/utils";
import { useCustomerStore } from "@/stores/customerStore";
import type { CustomerFormData } from "@/types/customer";

const DEFAULT_FORM: CustomerFormData = { name: "", phone: "", email: "" };

export default function CustomersPage() {
	const { customers, addCustomer } = useCustomerStore();
	const [search, setSearch] = useState("");
	const [modalOpen, setModalOpen] = useState(false);
	const [form, setForm] = useState<CustomerFormData>(DEFAULT_FORM);

	const filtered = customers.filter(
		(c) =>
			c.name.toLowerCase().includes(search.toLowerCase()) ||
			c.phone.includes(search),
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		addCustomer(form);
		setForm(DEFAULT_FORM);
		setModalOpen(false);
	};

	return (
		<AppLayout title="Customers">
			<div className="flex items-center justify-between mb-5">
				<SearchInput
					value={search}
					onChange={setSearch}
					placeholder="Search customers..."
					className="max-w-xs"
				/>
				<Button onClick={() => setModalOpen(true)}>
					<Plus size={16} /> Add Customer
				</Button>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
				<AnimatePresence initial={false}>
					{filtered.length === 0 ? (
						<div className="col-span-3">
							<EmptyState
								title="No customers found"
								description="Add your first customer to get started."
							/>
						</div>
					) : (
						filtered.map((c, i) => (
							<motion.div
								key={c.id}
								initial={{ opacity: 0, y: 12 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, scale: 0.95 }}
								transition={{ delay: i * 0.05 }}
								className="card p-5 hover:shadow-lg transition-shadow duration-300"
							>
								{/* Avatar + name */}
								<div className="flex items-center gap-3 mb-4">
									<div className="w-11 h-11 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white font-bold text-base shrink-0">
										{c.name.charAt(0)}
									</div>
									<div className="min-w-0">
										<p className="font-semibold text-foreground truncate">
											{c.name}
										</p>
										<p className="text-xs text-muted-foreground">
											Since {formatDateShort(c.createdAt)}
										</p>
									</div>
								</div>

								{/* Contact */}
								<div className="space-y-1.5 mb-4">
									<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
										<Phone size={12} /> {c.phone}
									</div>
									{c.email && (
										<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
											<Mail size={12} /> {c.email}
										</div>
									)}
								</div>

								{/* Stats */}
								<div className="flex items-center gap-4 border-t border-border pt-3">
									<div className="text-center">
										<p className="text-lg font-bold text-foreground tabular-nums">
											{c.totalPurchases}
										</p>
										<p className="text-xs text-muted-foreground">Visits</p>
									</div>
									<div className="text-center">
										<p className="text-lg font-bold text-primary tabular-nums">
											{formatCurrency(c.totalSpent)}
										</p>
										<p className="text-xs text-muted-foreground">Total Spent</p>
									</div>
									<div className="ml-auto text-right">
										<p className="text-xs text-muted-foreground">Last visit</p>
										<p className="text-xs font-medium text-foreground">
											{formatDateShort(c.lastVisit)}
										</p>
									</div>
								</div>
							</motion.div>
						))
					)}
				</AnimatePresence>
			</div>

			{/* Add Customer Modal */}
			<Modal
				open={modalOpen}
				onClose={() => setModalOpen(false)}
				title="Add Customer"
				size="sm"
			>
				<form onSubmit={handleSubmit} className="space-y-4">
					{[
						{ label: "Full Name", key: "name", type: "text", required: true },
						{
							label: "Phone Number",
							key: "phone",
							type: "tel",
							required: true,
						},
						{
							label: "Email (optional)",
							key: "email",
							type: "email",
							required: false,
						},
					].map(({ label, key, type, required }) => (
						<div key={key}>
							<label className="text-sm font-medium text-foreground block mb-1">
								{label}
							</label>
							<input
								type={type}
								required={required}
								value={form[key as keyof CustomerFormData] ?? ""}
								onChange={(e) =>
									setForm((f) => ({ ...f, [key]: e.target.value }))
								}
								className="w-full h-10 px-3 rounded-xl bg-muted border border-border text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
							/>
						</div>
					))}
					<div className="flex gap-3 pt-2">
						<Button
							type="button"
							variant="ghost"
							className="flex-1"
							onClick={() => setModalOpen(false)}
						>
							Cancel
						</Button>
						<Button type="submit" className="flex-1">
							Add Customer
						</Button>
					</div>
				</form>
			</Modal>
		</AppLayout>
	);
}
