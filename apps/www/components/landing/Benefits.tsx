'use client';

import { motion } from 'framer-motion';
import { fadeUp, scaleIn, staggerContainer, viewportOnce } from '@/lib/animations';

const benefits = [
  {
    icon: '⚡',
    title: 'Saves You Time',
    description: 'Automate stock tracking, receipts, and reports. Spend less time on paperwork, more on growing.',
    metric: '3hrs/day saved',
    color: 'text-yellow-400',
  },
  {
    icon: '😊',
    title: 'Easy to Use',
    description: 'No training needed. If you can use WhatsApp, you can run BizRoss. Clean, simple, and fast.',
    metric: '5 min setup',
    color: 'text-cyan-400',
  },
  {
    icon: '💰',
    title: 'Truly Affordable',
    description: 'Start free, upgrade when you\'re ready. No hidden fees. Priced for real African businesses.',
    metric: 'From KSh 999/mo',
    color: 'text-emerald-400',
  },
  {
    icon: '📴',
    title: 'Works Offline',
    description: 'Power cuts or poor internet? No problem. BizRoss keeps selling and syncs when you\'re back.',
    metric: '100% uptime',
    color: 'text-rose-400',
  },
  {
    icon: '🔒',
    title: 'Secure & Reliable',
    description: 'Bank-grade encryption keeps your sales data safe. Automatic backups every hour.',
    metric: '99.9% uptime SLA',
    color: 'text-indigo-400',
  },
  {
    icon: '📊',
    title: 'Real Insights',
    description: 'Know your best-selling products, peak hours, and profit margins with beautiful dashboards.',
    metric: 'Live analytics',
    color: 'text-purple-400',
  },
];

export default function Benefits() {
  return (
    <section id="benefits" className="section relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="absolute -bottom-20 left-0 w-[400px] h-[400px] rounded-full bg-emerald-900/15 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/30 text-xs text-emerald-400 font-medium mb-4">
            ✦ Benefits
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Built to help your{' '}
            <span className="gradient-text">business grow</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto">
            Join thousands of shop owners who have replaced pen-and-paper with BizRoss.
          </motion.p>
        </motion.div>

        {/* Benefits grid */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {benefits.map((benefit) => (
            <motion.div
              key={benefit.title}
              variants={scaleIn}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="group glass border border-white/8 rounded-2xl p-6 hover:border-white/16 transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="text-3xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base font-bold text-white mb-2">{benefit.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed mb-3">{benefit.description}</p>
                  <span className={`text-xs font-semibold ${benefit.color} bg-white/5 px-2.5 py-1 rounded-full border border-white/10`}>
                    {benefit.metric}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
