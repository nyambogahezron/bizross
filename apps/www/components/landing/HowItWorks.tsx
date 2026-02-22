'use client';

import { motion } from 'framer-motion';
import { fadeUp, fadeLeft, fadeRight, staggerContainer, viewportOnce } from '@/lib/animations';

const steps = [
  {
    number: '01',
    title: 'Add Your Products',
    description:
      'Import your product catalog or add items one by one. Set prices, categories, and stock levels in minutes.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
      </svg>
    ),
    color: 'from-indigo-500 to-purple-600',
    detail: ['Bulk CSV import', 'Barcode scanning', 'Category grouping'],
  },
  {
    number: '02',
    title: 'Start Selling',
    description:
      'Open your cashier screen and start ringing up sales instantly. Accept mobile money, cash, or card.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'from-cyan-500 to-blue-600',
    detail: ['M-Pesa & Airtel Money', 'Split payments', 'Receipt printing'],
  },
  {
    number: '03',
    title: 'Track Your Profits',
    description:
      'View beautiful reports on daily sales, best sellers, and profit margins. Grow with data-driven decisions.',
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    ),
    color: 'from-emerald-500 to-teal-600',
    detail: ['Daily/weekly reports', 'Profit margins', 'Export to Excel'],
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="section relative overflow-hidden">
      {/* Decorative divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-20"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-cyan-500/30 text-xs text-cyan-400 font-medium mb-4">
            ✦ How It Works
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Up and running{' '}
            <span className="gradient-text">in 3 easy steps</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto">
            No training needed. If you can use a smartphone, you can use BizRoss.
          </motion.p>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-16 left-1/2 -translate-x-1/2 h-px w-3/4 bg-gradient-to-r from-indigo-500/30 via-cyan-500/30 to-emerald-500/30" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.number}
                initial="hidden"
                whileInView="visible"
                viewport={viewportOnce}
                variants={i % 2 === 0 ? fadeLeft : fadeRight}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -8 }}
                className="group relative"
              >
                <div className="glass border border-white/8 rounded-2xl p-8 h-full hover:border-white/16 transition-all duration-300 hover:shadow-xl">
                  {/* Step number */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      {step.icon}
                    </div>
                    <span className="text-5xl font-black text-white/5 select-none">{step.number}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all">
                    {step.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {step.description}
                  </p>

                  {/* Detail bullets */}
                  <ul className="space-y-2">
                    {step.detail.map((d) => (
                      <li key={d} className="flex items-center gap-2 text-sm text-slate-500">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-br ${step.color} flex-shrink-0`} />
                        {d}
                      </li>
                    ))}
                  </ul>

                  {/* Bottom glow on hover */}
                  <div className={`absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
