import type { Metadata } from 'next';
import { MessageSquare, Headphones, Twitter, Youtube, Trophy } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Community — BizRoss POS',
  description: 'Join the BizRoss community. Connect with other merchants, share tips, and influence product development.',
};

const channels = [
  {
    Icon: MessageSquare,
    name: 'Forum',
    desc: 'Ask questions, share workflows, and connect with thousands of merchants using BizRoss.',
    cta: 'Browse Forum',
    color: 'text-indigo-400',
    bg: 'bg-indigo-500/10',
  },
  {
    Icon: Headphones,
    name: 'Discord',
    desc: 'Real-time chat with the BizRoss team and power users. Get instant answers and share feedback.',
    cta: 'Join Discord',
    color: 'text-violet-400',
    bg: 'bg-violet-500/10',
  },
  {
    Icon: Twitter,
    name: 'X (Twitter)',
    desc: 'Follow @BizRoss for product updates, tips, and news from the retail world.',
    cta: 'Follow Us',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
  {
    Icon: Youtube,
    name: 'YouTube',
    desc: 'Watch tutorials, feature deep-dives, and merchant success stories on our official channel.',
    cta: 'Watch Now',
    color: 'text-rose-400',
    bg: 'bg-rose-500/10',
  },
];

export default function CommunityPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      <section className="pt-36 pb-16 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-4">Community</p>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400 bg-clip-text text-transparent leading-tight">
          You&apos;re not alone
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
          Join a growing community of merchants who share tips, workflows, and help each other succeed with BizRoss.
        </p>
      </section>

      <section className="py-10 px-6 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {channels.map(({ Icon, name, desc, cta, color, bg }) => (
            <div
              key={name}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-5 hover:border-indigo-500/40 transition-colors"
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg}`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-white mb-2">{name}</h2>
                <p className="text-sm text-gray-400 leading-relaxed">{desc}</p>
              </div>
              <button className="self-start bg-indigo-600 hover:bg-indigo-500 transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg">
                {cta}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/5 border border-white/10 rounded-2xl p-10 text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-amber-500/10 mb-5">
            <Trophy className="w-7 h-7 text-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Community Champions</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">
            We spotlight merchants who go above and beyond to help others. Every quarter we reward our top contributors with swag and Pro plan credits.
          </p>
          <a href="/contact" className="inline-block border border-indigo-500 text-indigo-400 hover:bg-indigo-500 hover:text-white transition-colors font-medium px-8 py-3 rounded-lg">
            Nominate a Champion
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
