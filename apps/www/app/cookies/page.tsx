import type { Metadata } from 'next';
import { Cookie, ShieldOff, Settings2, BarChart2, CheckCircle2 } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Cookie Policy — BizRoss POS',
  description: 'Learn what cookies BizRoss uses, why we use them, and how you can control them.',
};

const cookies = [
  {
    Icon: CheckCircle2,
    category: 'Strictly Necessary',
    badge: 'bg-emerald-500/20 text-emerald-400',
    iconColor: 'text-emerald-400',
    iconBg: 'bg-emerald-500/10',
    desc: 'These cookies are essential for the website to function and cannot be switched off. They are usually only set in response to actions you take, such as logging in or filling in forms.',
    examples: ['Session cookies', 'Authentication tokens', 'CSRF protection'],
  },
  {
    Icon: BarChart2,
    category: 'Analytics',
    badge: 'bg-blue-500/20 text-blue-400',
    iconColor: 'text-blue-400',
    iconBg: 'bg-blue-500/10',
    desc: 'These cookies allow us to count visits and traffic sources so we can measure and improve site performance. They help us understand which pages are the most and least popular.',
    examples: ['Page view counters', 'Session duration tracking', 'Error reporting'],
  },
  {
    Icon: Settings2,
    category: 'Functional',
    badge: 'bg-sky-500/20 text-sky-400',
    iconColor: 'text-sky-400',
    iconBg: 'bg-sky-500/10',
    desc: 'These cookies enable personalized features, such as remembering your language preference or the region you are in.',
    examples: ['Language preferences', 'UI theme settings', 'Remembered filters'],
  },
  {
    Icon: ShieldOff,
    category: 'Marketing',
    badge: 'bg-orange-500/20 text-orange-400',
    iconColor: 'text-orange-400',
    iconBg: 'bg-orange-500/10',
    desc: 'These cookies may be set by our advertising partners to build a profile of your interests and show you relevant ads on other sites. You can opt out at any time.',
    examples: ['Retargeting pixels', 'Ad conversion tracking', 'Campaign attribution'],
  },
];

export default function CookiesPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      <section className="pt-36 pb-8 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-blue-400 mb-4">Legal</p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-amber-500/10">
            <Cookie className="w-6 h-6 text-amber-400" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white">Cookie Policy</h1>
        <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2026</p>
      </section>

      <section className="py-10 px-6 max-w-3xl mx-auto pb-24">
        <p className="text-gray-400 mb-10 leading-relaxed">
          This Cookie Policy explains how BizRoss uses cookies and similar tracking technologies when you visit our website and use our services. By using our website, you consent to our use of cookies as described in this policy.
        </p>

        <h2 className="text-lg font-semibold text-white mb-2">What are cookies?</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-10">
          Cookies are small text files stored on your device when you visit websites. They are widely used to make websites work efficiently, provide a better user experience, and give website owners information about how their site is being used.
        </p>

        <div className="flex flex-col gap-8">
          {cookies.map(({ Icon, category, badge, iconColor, iconBg, desc, examples }) => (
            <div key={category} className="bg-white/5 border border-white/10 rounded-2xl p-7">
              <div className="flex items-center gap-4 mb-4">
                <div className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${iconBg}`}>
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badge}`}>
                  {category}
                </span>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {examples.map((ex) => (
                  <span
                    key={ex}
                    className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-gray-400"
                  >
                    {ex}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-lg font-semibold text-white mt-10 mb-3">How to control cookies</h2>
        <p className="text-gray-400 text-sm leading-relaxed mb-8">
          You can control and manage cookies in various ways. Most browsers allow you to refuse cookies, or to delete cookies that have already been set. For more information, visit{' '}
          <a
            href="https://www.allaboutcookies.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:underline"
          >
            allaboutcookies.org
          </a>
          . Please note that refusing certain cookies may impact the functionality of our website.
        </p>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-7 text-center">
          <p className="text-gray-400 text-sm">
            Questions about cookies? Email us at{' '}
            <a href="mailto:privacy@bizross.io" className="text-blue-400 hover:underline">
              privacy@bizross.io
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
