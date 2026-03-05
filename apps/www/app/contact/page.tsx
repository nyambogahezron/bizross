import type { Metadata } from 'next';
import { Mail, Phone, MapPin } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Contact Us — BizRoss POS',
  description: "Get in touch with the BizRoss team. We're here to help with sales, support, or any questions.",
};

const contactInfo = [
  {
    Icon: Mail,
    label: 'Email',
    value: 'hello@bizross.io',
    sub: 'We reply within 24 hours',
    color: 'text-blue-400',
    bg: 'bg-blue-500/10',
  },
  {
    Icon: Phone,
    label: 'Sales',
    value: '+1 (800) BIZ-ROSS',
    sub: 'Mon–Fri, 9am–6pm EAT',
    color: 'text-sky-400',
    bg: 'bg-sky-500/10',
  },
  {
    Icon: MapPin,
    label: 'Headquarters',
    value: 'Nairobi, Kenya',
    sub: 'Serving businesses worldwide',
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
  },
];

export default function ContactPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      <section className="pt-36 pb-16 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">Get In Touch</p>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          We&apos;d love to hear from you
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
          Whether you have a question about features, pricing, or anything else — our team is ready to answer.
        </p>
      </section>

      <section className="py-10 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-12 pb-24">
        {/* Form */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-5">
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Full Name</label>
            <input type="text" placeholder="Jane Doe" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Email Address</label>
            <input type="email" placeholder="jane@example.com" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Subject</label>
            <input type="text" placeholder="How can we help?" className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500 transition-colors" />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm text-gray-400">Message</label>
            <textarea rows={5} placeholder="Tell us more..." className="bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-blue-500 transition-colors resize-none" />
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 transition-colors text-white font-medium py-3 rounded-lg">
            Send Message
          </button>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-8 justify-center">
          {contactInfo.map(({ Icon, label, value, sub, color, bg }) => (
            <div key={label} className="flex gap-5 items-start">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg} shrink-0`}>
                <Icon className={`w-5 h-5 ${color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">{label}</p>
                <p className="text-white font-semibold">{value}</p>
                <p className="text-sm text-gray-400 mt-0.5">{sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
