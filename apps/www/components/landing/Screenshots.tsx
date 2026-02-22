'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, floatAnimation, staggerContainer, viewportOnce } from '@/lib/animations';

const screens = [
  {
    label: 'POS Checkout',
    description: 'Fast, intuitive cashier screen built for speed',
    badge: 'Core Feature',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-white">Open Sale</h4>
          <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">● Active</span>
        </div>
        {[
          { name: 'Brooke Sugar 2kg', qty: 2, price: 'KSh 260' },
          { name: 'Cooking Oil 500ml', qty: 1, price: 'KSh 120' },
          { name: 'Unga Pembe 1kg', qty: 3, price: 'KSh 390' },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
            <div>
              <p className="text-xs font-medium text-white">{item.name}</p>
              <p className="text-[10px] text-slate-500">qty: {item.qty}</p>
            </div>
            <span className="text-xs font-bold text-indigo-300">{item.price}</span>
          </div>
        ))}
        <div className="pt-2 border-t border-white/10">
          <div className="flex justify-between text-sm font-bold text-white mb-3">
            <span>Total</span><span>KSh 770</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button className="py-2 rounded-lg bg-white/10 text-xs text-slate-300">Cash</button>
            <button className="py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-cyan-500 text-xs text-white font-semibold">M-Pesa</button>
          </div>
        </div>
      </div>
    ),
  },
  {
    label: 'Inventory',
    description: 'Real-time stock tracking with low-stock alerts',
    badge: 'Always Up-to-date',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-white">Stock Overview</h4>
          <span className="text-xs text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full">3 Low Stock</span>
        </div>
        {[
          { name: 'Maize Flour 2kg', stock: 45, status: 'good' },
          { name: 'Rice 5kg', stock: 8, status: 'low' },
          { name: 'Sugar 1kg', stock: 120, status: 'good' },
          { name: 'Cooking Oil 1L', stock: 4, status: 'critical' },
        ].map((item) => (
          <div key={item.name} className="flex items-center justify-between bg-white/5 rounded-lg px-3 py-2">
            <p className="text-xs font-medium text-white">{item.name}</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">{item.stock} units</span>
              <span className={`w-2 h-2 rounded-full ${item.status === 'good' ? 'bg-emerald-400' : item.status === 'low' ? 'bg-yellow-400' : 'bg-rose-400'}`} />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    label: 'Reports',
    description: 'Beautiful analytics to grow your business faster',
    badge: 'Smart Insights',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    content: (
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-white">Monthly Summary</h4>
          <span className="text-xs text-indigo-400">February 2026</span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {[
            { label: 'Revenue', value: 'KSh 284K', up: true },
            { label: 'Profit', value: 'KSh 61K', up: true },
            { label: 'Orders', value: '1,842', up: true },
            { label: 'Returns', value: '12', up: false },
          ].map((metric) => (
            <div key={metric.label} className="bg-white/5 rounded-lg p-3">
              <p className="text-[10px] text-slate-500 mb-1">{metric.label}</p>
              <p className="text-sm font-bold text-white">{metric.value}</p>
              <span className={`text-[10px] ${metric.up ? 'text-emerald-400' : 'text-rose-400'}`}>
                {metric.up ? '▲' : '▼'} vs last month
              </span>
            </div>
          ))}
        </div>
        {/* Mini bar chart */}
        <div className="bg-white/5 rounded-lg p-3">
          <p className="text-[10px] text-slate-500 mb-2">Daily Sales This Week</p>
          <div className="flex items-end gap-1 h-10">
            {[60, 45, 80, 35, 90, 70, 55].map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-sm opacity-75" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

export default function Screenshots() {
  const [active, setActive] = useState(0);

  return (
    <section id="screenshots" className="section relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />
      {/* Glow blob */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-indigo-900/20 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center mb-16"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-purple-500/30 text-xs text-purple-400 font-medium mb-4">
            ✦ Screenshots
          </motion.div>
          <motion.h2 variants={fadeUp} className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Beautiful UI, built for{' '}
            <span className="gradient-text">real work</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="text-slate-400 text-lg max-w-xl mx-auto">
            Clean, clutter-free screens that anyone can learn in minutes.
          </motion.p>
        </motion.div>

        {/* Tab selector */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="flex flex-wrap gap-3 justify-center mb-10"
        >
          {screens.map((screen, i) => (
            <motion.button
              key={screen.label}
              variants={fadeUp}
              onClick={() => setActive(i)}
              className={`px-5 py-2.5 text-sm font-semibold rounded-xl border transition-all duration-300 ${
                active === i
                  ? 'bg-indigo-500/20 border-indigo-500/50 text-white'
                  : 'glass border-white/10 text-slate-400 hover:text-white hover:border-white/20'
              }`}
            >
              {screen.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Screen display */}
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto"
        >
          <motion.div animate={floatAnimation} className="relative">
            {/* Glow behind */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-cyan-500/10 blur-xl transform scale-105" />

            <div className="relative glass border border-white/10 rounded-3xl overflow-hidden shadow-2xl shadow-black/50">
              {/* Phone browser bar */}
              <div className="flex items-center gap-2 px-5 py-3 border-b border-white/10 bg-white/5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <div className="flex-1 text-center">
                  <span className="text-[11px] text-slate-500">BizRoss POS — {screens[active].label}</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${screens[active].badgeColor}`}>
                  {screens[active].badge}
                </span>
              </div>

              {/* Screen content */}
              <div className="p-5 bg-[#080b16] min-h-[360px]">
                {screens[active].content}
              </div>
            </div>
          </motion.div>

          <p className="text-center text-sm text-slate-500 mt-6">{screens[active].description}</p>
        </motion.div>
      </div>
    </section>
  );
}
