import type { Metadata } from 'next';
import { Box, ShoppingCart, Users, BarChart2, Webhook, KeyRound, RefreshCw, LayoutDashboard } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Documentation — BizRoss POS',
  description: 'Complete API reference, SDK guides, and integration documentation for BizRoss POS developers.',
};

const sections = [
  {
    title: 'Getting Started',
    links: ['Quick Start Guide', 'Authentication', 'API Overview', 'SDKs & Libraries'],
  },
  {
    title: 'Core API',
    links: ['Products & Inventory', 'Orders & Transactions', 'Customers', 'Staff & Roles'],
  },
  {
    title: 'Payments',
    links: ['Accepting Payments', 'Refunds & Disputes', 'Webhooks', 'Payment Methods'],
  },
  {
    title: 'Integrations',
    links: ['Accounting (QuickBooks)', 'E-commerce (Shopify)', 'Logistics', 'Custom Integrations'],
  },
];

const highlights = [
  { Icon: Box, label: 'Products', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { Icon: ShoppingCart, label: 'Orders', color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { Icon: Users, label: 'Customers', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
  { Icon: BarChart2, label: 'Reports', color: 'text-amber-400', bg: 'bg-amber-500/10' },
  { Icon: Webhook, label: 'Webhooks', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { Icon: KeyRound, label: 'Auth', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { Icon: RefreshCw, label: 'Sync', color: 'text-teal-400', bg: 'bg-teal-500/10' },
  { Icon: LayoutDashboard, label: 'Dashboard', color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
];

export default function DocsPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      <section className="pt-36 pb-16 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">Developer Docs</p>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          Build with BizRoss
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
          Everything you need to integrate, extend, and automate BizRoss POS in your own applications.
        </p>
      </section>

      {/* API highlights */}
      <section className="py-6 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-4 md:grid-cols-8 gap-4 mb-12">
          {highlights.map(({ Icon, label, color, bg }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg}`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <p className="text-xs text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-4 px-6 max-w-6xl mx-auto grid md:grid-cols-4 gap-10 pb-16">
        {sections.map((section) => (
          <div key={section.title}>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-blue-400 mb-4">
              {section.title}
            </h2>
            <ul className="flex flex-col gap-2">
              {section.links.map((link) => (
                <li key={link}>
                  <button className="text-sm text-gray-300 hover:text-blue-300 transition-colors text-left">
                    {link}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="py-10 px-6 max-w-6xl mx-auto pb-24">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-lg font-semibold text-white mb-4">Quick Example — Create an Order</h2>
          <pre className="text-sm text-green-400 overflow-x-auto bg-black/40 rounded-xl p-6 leading-relaxed">
{`curl -X POST https://api.bizross.io/v1/orders \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "items": [{ "product_id": "prod_123", "quantity": 2 }],
    "payment_method": "cash",
    "customer_id": "cust_456"
  }'`}
          </pre>
        </div>
      </section>

      <Footer />
    </main>
  );
}
