import type { Metadata } from 'next';
import { CheckCircle2, AlertTriangle } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'System Status — BizRoss POS',
  description: 'Real-time status of BizRoss POS services, APIs, and infrastructure.',
};

const services = [
  { name: 'POS Application' },
  { name: 'Payment Processing API' },
  { name: 'Inventory Sync Engine' },
  { name: 'Reporting & Analytics' },
  { name: 'Webhook Delivery' },
  { name: 'Authentication Service' },
  { name: 'Offline Sync Service' },
  { name: 'Customer Portal' },
];

const incidents = [
  {
    date: 'Feb 14, 2026',
    title: 'Elevated payment processing latency',
    status: 'Resolved',
    desc: 'Payment processing experienced elevated latency for approximately 18 minutes between 14:30–14:48 UTC. Root cause was a misconfigured load balancer rule, since corrected.',
  },
  {
    date: 'Jan 28, 2026',
    title: 'Webhook delivery delays',
    status: 'Resolved',
    desc: 'A queue saturation event caused webhook delivery delays of up to 12 minutes. No events were dropped. The queue was cleared within 35 minutes.',
  },
];

export default function StatusPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      <section className="pt-36 pb-16 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">System Status</p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="relative flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500" />
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-white">All Systems Operational</h1>
        </div>
        <p className="text-gray-400 text-sm">Last updated: March 2, 2026, 20:30 UTC</p>
      </section>

      <section className="py-10 px-6 max-w-3xl mx-auto">
        <h2 className="text-lg font-semibold text-white mb-4">Service Status</h2>
        <div className="flex flex-col gap-3 mb-12">
          {services.map((svc) => (
            <div key={svc.name} className="bg-white/5 border border-white/10 rounded-xl px-6 py-4 flex items-center justify-between">
              <span className="text-sm text-gray-300">{svc.name}</span>
              <span className="flex items-center gap-2 text-sm font-medium text-emerald-400">
                <CheckCircle2 className="w-4 h-4" />
                Operational
              </span>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-white mb-4">Past Incidents</h2>
        <div className="flex flex-col gap-5 pb-24">
          {incidents.map((inc) => (
            <div key={inc.title} className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="w-4 h-4" />
                  <p className="text-xs text-gray-500">{inc.date}</p>
                </div>
                <span className="text-xs font-medium bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  {inc.status}
                </span>
              </div>
              <h3 className="text-base font-semibold text-white mb-2">{inc.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{inc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
