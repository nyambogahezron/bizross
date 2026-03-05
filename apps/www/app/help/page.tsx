import type { Metadata } from 'next';
import { HelpCircle } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Help Center — BizRoss POS',
  description: 'Find answers to common questions and step-by-step guides for using BizRoss POS.',
};

const faqs = [
  {
    q: 'How do I add products to my inventory?',
    a: 'Navigate to Products in the sidebar, click "Add Product", fill in the details including SKU, price, and stock quantity, then save.',
  },
  {
    q: 'Can BizRoss work without an internet connection?',
    a: 'Yes! BizRoss has a built-in offline mode. All transactions are stored locally and synced automatically when your connection is restored.',
  },
  {
    q: 'How do I process a refund?',
    a: 'Go to Orders, find the transaction, click "Refund", select full or partial amount, and confirm. The amount is returned to the original payment method.',
  },
  {
    q: 'How many staff accounts can I create?',
    a: 'The number of staff accounts depends on your plan. Starter allows 3, Pro allows 15, and Enterprise is unlimited.',
  },
  {
    q: 'Can I manage multiple store locations?',
    a: 'Yes. Multi-location management is available on the Pro and Enterprise plans. You can switch between stores and view consolidated reports.',
  },
  {
    q: 'How do I export my sales data?',
    a: 'Go to Reports → Export, choose your date range and format (CSV or PDF), then click Download.',
  },
];

export default function HelpPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      <section className="pt-36 pb-16 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">Help Center</p>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          Frequently Asked Questions
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
          Quick answers to the questions we hear most often. Can&apos;t find yours?{' '}
          <a href="/contact" className="text-blue-400 hover:underline">
            Contact us.
          </a>
        </p>
      </section>

      <section className="py-10 px-6 max-w-3xl mx-auto pb-24">
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:border-blue-500/30 transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-blue-500/10 shrink-0 mt-0.5">
                  <HelpCircle className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h2 className="text-base font-semibold text-white mb-2">{faq.q}</h2>
                  <p className="text-sm text-gray-400 leading-relaxed">{faq.a}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <a href="/support" className="inline-block bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium px-8 py-3 rounded-lg">
            Browse All Support Articles
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
