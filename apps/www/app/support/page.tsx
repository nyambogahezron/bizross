import type { Metadata } from 'next';
import { Rocket, CreditCard, Package, Users, Link2, ShieldCheck, Search } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Support — BizRoss POS',
  description: 'Get help with BizRoss POS. Browse our knowledge base, submit a ticket, or chat with our support team.',
};

const categories = [
  {
    Icon: Rocket,
    title: 'Getting Started',
    desc: 'Set up your first store, configure products, and process your first sale.',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    Icon: CreditCard,
    title: 'Payments & Billing',
    desc: 'Manage subscriptions, update payment methods, and view invoices.',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
  {
    Icon: Package,
    title: 'Inventory',
    desc: 'Track stock levels, set reorder points, and manage suppliers.',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    Icon: Users,
    title: 'Staff & Permissions',
    desc: 'Add team members, assign roles, and audit activity logs.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    Icon: Link2,
    title: 'Integrations',
    desc: 'Connect BizRoss with accounting, e-commerce, and logistics tools.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-500/10',
  },
  {
    Icon: ShieldCheck,
    title: 'Security & Data',
    desc: 'Understand how we protect your data and export your records.',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
];

export default function SupportPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      <section className="pt-36 pb-16 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">Support Center</p>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          How can we help?
        </h1>
        <div className="mt-8 max-w-xl mx-auto relative">
          <input
            type="text"
            placeholder="Search for answers..."
            className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3.5 pr-12 text-sm text-white placeholder-gray-500 outline-none focus:border-blue-500 transition-colors"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
        </div>
      </section>

      <section className="py-10 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(({ Icon, title, desc, color, bg }) => (
            <div
              key={title}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-blue-500/40 transition-colors duration-300 cursor-pointer"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} mb-5`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <h2 className="text-lg font-semibold text-white mb-2">{title}</h2>
              <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-blue-600/20 to-sky-600/20 border border-blue-500/30 rounded-2xl p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Still need help?</h2>
          <p className="text-gray-400 mb-6">Our support team is available Monday–Friday, 9am–6pm EAT.</p>
          <a href="/contact" className="inline-block bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium px-8 py-3 rounded-lg">
            Contact Support
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
