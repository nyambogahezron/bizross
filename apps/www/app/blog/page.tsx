import type { Metadata } from 'next';
import { Tag, BookOpen, TrendingUp } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Blog — BizRoss POS',
  description: 'Insights, tips, and product updates from the BizRoss team to help you grow your business.',
};

const posts = [
  {
    tag: 'Product',
    date: 'Feb 28, 2026',
    title: 'Introducing Real-Time Inventory Sync Across Branches',
    excerpt: 'Keep every location perfectly in sync with our new multi-branch inventory engine — zero delays, zero discrepancies.',
    readTime: '4 min read',
  },
  {
    tag: 'Guide',
    date: 'Feb 18, 2026',
    title: '5 Ways to Speed Up Your Checkout Flow',
    excerpt: 'Long queues cost you sales. Here are five proven tactics top merchants use to cut checkout time in half.',
    readTime: '6 min read',
  },
  {
    tag: 'Business',
    date: 'Feb 5, 2026',
    title: 'How Offline Mode Changed Everything for Rural Retailers',
    excerpt: 'We sat down with three shop owners in low-connectivity regions to learn how offline-first POS transformed their operations.',
    readTime: '8 min read',
  },
  {
    tag: 'Product',
    date: 'Jan 22, 2026',
    title: "BizRoss 2.0: What's New and What's Next",
    excerpt: 'A deep dive into the biggest release in BizRoss history — new dashboard, API overhaul, and the roadmap ahead.',
    readTime: '5 min read',
  },
  {
    tag: 'Guide',
    date: 'Jan 10, 2026',
    title: 'Mastering Your End-of-Day Reports',
    excerpt: 'Learn how to use BizRoss reports to identify top-selling products, peak hours, and staff performance at a glance.',
    readTime: '7 min read',
  },
  {
    tag: 'Business',
    date: 'Dec 30, 2025',
    title: 'The Hidden Costs of Outdated POS Systems',
    excerpt: "From slow transactions to costly errors, outdated POS software is quietly draining your revenue. Here's what to look for.",
    readTime: '5 min read',
  },
];

const tagConfig: Record<string, { label: string; className: string; Icon: React.ElementType }> = {
  Product: { label: 'Product', className: 'bg-blue-500/20 text-blue-400', Icon: Tag },
  Guide: { label: 'Guide', className: 'bg-sky-500/20 text-sky-400', Icon: BookOpen },
  Business: { label: 'Business', className: 'bg-emerald-500/20 text-emerald-400', Icon: TrendingUp },
};

export default function BlogPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      <section className="pt-36 pb-16 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">The BizRoss Blog</p>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          Insights for growing businesses
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
          Product updates, retail guides, and stories from merchants in the field.
        </p>
      </section>

      <section className="py-10 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => {
            const cfg = tagConfig[post.tag];
            const Icon = cfg.Icon;
            return (
              <article
                key={post.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 flex flex-col gap-4 hover:border-blue-500/40 transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full ${cfg.className}`}>
                    <Icon className="w-3 h-3" />
                    {post.tag}
                  </span>
                  <span className="text-xs text-gray-500">{post.date}</span>
                </div>
                <h2 className="text-lg font-semibold text-white leading-snug">{post.title}</h2>
                <p className="text-sm text-gray-400 leading-relaxed flex-1">{post.excerpt}</p>
                <p className="text-xs text-gray-500">{post.readTime}</p>
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}
