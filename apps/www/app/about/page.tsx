import type { Metadata } from 'next';
import { Zap, ShieldCheck, Users } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'About Us — BizRoss POS',
  description:
    'Learn about BizRoss — our mission, story, and the team building the smartest POS for growing businesses.',
};

const stats = [
  { label: 'Businesses Served', value: '5,000+' },
  { label: 'Transactions Processed', value: '$200M+' },
  { label: 'Uptime', value: '99.9%' },
  { label: 'Countries', value: '12' },
];

const values = [
  {
    Icon: Zap,
    title: 'Speed First',
    desc: 'We relentlessly optimise for performance. Your checkout should never be the bottleneck.',
    color: 'text-yellow-400',
    bg: 'bg-yellow-500/10',
  },
  {
    Icon: ShieldCheck,
    title: 'Reliability',
    desc: 'Offline-first architecture means you keep selling, even when connectivity fails.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
  {
    Icon: Users,
    title: 'Merchant-Centric',
    desc: 'Every feature is shaped by real feedback from the merchants we serve.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
];

export default function AboutPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-4">
          Our Story
        </p>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent leading-tight max-w-3xl mx-auto">
          Built for the businesses that power communities
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
          BizRoss was born out of a simple frustration: small businesses deserved better tools. We set out to build a POS that&apos;s fast, affordable, and works even when the internet doesn&apos;t.
        </p>
      </section>

      {/* Mission */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-gray-400 leading-relaxed">
              To empower every shop owner, warehouse manager, and mini supermarket with enterprise-grade tools — without the enterprise price tag. We believe great software should be accessible to everyone, from a one-person kiosk to a growing retail chain.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                <p className="text-3xl font-bold text-indigo-400">{stat.value}</p>
                <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 px-6 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {values.map(({ Icon, title, desc, color, bg }) => (
              <div key={title} className="bg-white/5 border border-white/10 rounded-2xl p-8">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} mb-5`}>
                  <Icon className={`w-6 h-6 ${color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
