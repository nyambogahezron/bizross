import type { Metadata } from 'next';
import { Globe, HeartPulse, BookOpen, Clock } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Careers — BizRoss POS',
  description: 'Join the BizRoss team and help us build the future of retail technology for small businesses everywhere.',
};

const openings = [
  { title: 'Senior Backend Engineer', dept: 'Engineering', location: 'Remote', type: 'Full-time' },
  { title: 'Product Designer (UI/UX)', dept: 'Design', location: 'Remote', type: 'Full-time' },
  { title: 'Customer Success Manager', dept: 'Support', location: 'Nairobi, KE', type: 'Full-time' },
  { title: 'Growth Marketing Lead', dept: 'Marketing', location: 'Remote', type: 'Full-time' },
  { title: 'Mobile Engineer (React Native)', dept: 'Engineering', location: 'Remote', type: 'Contract' },
];

const perks = [
  { Icon: Globe, label: 'Remote-first', color: 'text-blue-400', bg: 'bg-blue-500/10' },
  { Icon: HeartPulse, label: 'Health coverage', color: 'text-rose-400', bg: 'bg-rose-500/10' },
  { Icon: BookOpen, label: 'Learning budget', color: 'text-sky-400', bg: 'bg-sky-500/10' },
  { Icon: Clock, label: 'Flexible hours', color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

export default function CareersPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      <section className="pt-36 pb-16 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">Join the Team</p>
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
          Build the future of retail
        </h1>
        <p className="mt-6 text-lg text-gray-400 max-w-xl mx-auto">
          We&apos;re a small, ambitious team with a big mission. If you thrive in fast-moving environments and care about impact, we want to hear from you.
        </p>
      </section>

      <section className="py-10 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {perks.map(({ Icon, label, color, bg }) => (
            <div key={label} className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center flex flex-col items-center gap-3">
              <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${bg}`}>
                <Icon className={`w-6 h-6 ${color}`} />
              </div>
              <p className="text-sm text-gray-300 font-medium">{label}</p>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold text-white mb-6">Open Positions</h2>
        <div className="flex flex-col gap-4">
          {openings.map((job) => (
            <div
              key={job.title}
              className="bg-white/5 border border-white/10 rounded-2xl px-7 py-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:border-blue-500/40 transition-colors duration-300"
            >
              <div>
                <h3 className="text-lg font-semibold text-white">{job.title}</h3>
                <p className="text-sm text-gray-400 mt-1">
                  {job.dept} · {job.location} · {job.type}
                </p>
              </div>
              <button className="shrink-0 bg-blue-600 hover:bg-blue-500 transition-colors text-white text-sm font-medium px-5 py-2.5 rounded-lg">
                Apply Now
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-gray-500 text-sm mt-10">
          Don&apos;t see a role that fits?{' '}
          <a href="/contact" className="text-blue-400 hover:text-blue-300 underline">
            Send us a general application →
          </a>
        </p>
      </section>

      <Footer />
    </main>
  );
}
