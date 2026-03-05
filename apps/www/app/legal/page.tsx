import type { Metadata } from 'next';
import { ShieldCheck, FileText, Cookie, FileCheck2, AlertCircle, ChevronRight } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Legal — BizRoss POS',
  description: 'Legal information, policies, and terms governing your use of BizRoss products and services.',
};

const legalDocs = [
  {
    Icon: ShieldCheck,
    title: 'Privacy Policy',
    desc: 'How we collect, use, store, and protect your personal information.',
    href: '/privacy',
    updated: 'Jan 1, 2026',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    Icon: FileText,
    title: 'Terms of Service',
    desc: 'The rules and guidelines governing the use of BizRoss products and services.',
    href: '/terms',
    updated: 'Jan 1, 2026',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
  {
    Icon: Cookie,
    title: 'Cookie Policy',
    desc: 'What cookies we use, why we use them, and how to control them.',
    href: '/cookies',
    updated: 'Jan 1, 2026',
    color: 'text-amber-400',
    bg: 'bg-amber-500/10',
  },
  {
    Icon: FileCheck2,
    title: 'Data Processing Agreement',
    desc: 'Terms for merchants who process personal data on behalf of their customers.',
    href: '#',
    updated: 'Jan 1, 2026',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    Icon: AlertCircle,
    title: 'Acceptable Use Policy',
    desc: 'Conduct standards for using BizRoss platform and APIs.',
    href: '#',
    updated: 'Jan 1, 2026',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
];

export default function LegalPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      <section className="pt-36 pb-16 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">Legal</p>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          Legal &amp; Policies
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
          We believe in transparency. All our legal documents are written in plain language, so you know exactly what you&apos;re agreeing to.
        </p>
      </section>

      <section className="py-10 px-6 max-w-3xl mx-auto pb-24">
        <div className="flex flex-col gap-4">
          {legalDocs.map(({ Icon, title, desc, href, updated, color, bg }) => (
            <a
              key={title}
              href={href}
              className="bg-white/5 border border-white/10 rounded-2xl px-7 py-5 flex items-center gap-5 hover:border-blue-500/40 transition-colors duration-300 group"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} shrink-0`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div className="flex-1">
                <h2 className="text-base font-semibold text-white group-hover:text-blue-300 transition-colors">
                  {title}
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">{desc}</p>
                <p className="text-xs text-gray-600 mt-1">Updated: {updated}</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors shrink-0" />
            </a>
          ))}
        </div>

        <p className="text-center text-sm text-gray-500 mt-10">
          Questions about our legal policies?{' '}
          <a href="/contact" className="text-blue-400 hover:underline">
            Contact our legal team
          </a>
        </p>
      </section>

      <Footer />
    </main>
  );
}
