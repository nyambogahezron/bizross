import type { Metadata } from 'next';
import { ShieldCheck } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Privacy Policy — BizRoss POS',
  description: 'Learn how BizRoss collects, uses, and protects your personal data.',
};

const sections = [
  {
    title: '1. Information We Collect',
    body: `We collect information you provide directly to us, such as your name, email address, business name, and payment information when you register for a BizRoss account or make a purchase. We also automatically collect certain information about how you use our services, including log data, device information, and usage patterns.`,
  },
  {
    title: '2. How We Use Your Information',
    body: `We use the information we collect to provide, maintain, and improve our services; process transactions; send you technical notices and support messages; respond to your comments and questions; and send you marketing communications where permitted by law.`,
  },
  {
    title: '3. Information Sharing',
    body: `We do not sell your personal information. We may share your information with third-party vendors who perform services on our behalf, such as payment processing, data analysis, email delivery, and customer service. We require these vendors to maintain appropriate security standards.`,
  },
  {
    title: '4. Data Retention',
    body: `We retain your account information for as long as your account is active or as needed to provide services. You may request deletion of your account at any time. Certain information may be retained for legal compliance or legitimate business interests.`,
  },
  {
    title: '5. Security',
    body: `We implement industry-standard security measures, including encryption in transit (TLS 1.3) and at rest (AES-256), to protect your personal information. However, no method of transmission over the Internet is 100% secure.`,
  },
  {
    title: '6. Your Rights',
    body: `Depending on your location, you may have certain rights regarding your personal data, including the right to access, correct, or delete information we hold about you. To exercise these rights, please contact us at privacy@bizross.io.`,
  },
  {
    title: '7. Changes to This Policy',
    body: `We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last Updated" date. Your continued use of BizRoss after the effective date constitutes acceptance of the updated policy.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      <section className="pt-36 pb-8 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-4">Legal</p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-500/10">
            <ShieldCheck className="w-6 h-6 text-indigo-400" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white">Privacy Policy</h1>
        <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2026</p>
      </section>

      <section className="py-10 px-6 max-w-3xl mx-auto pb-24">
        <p className="text-gray-400 mb-10 leading-relaxed">
          At BizRoss, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our point-of-sale software and related services.
        </p>

        <div className="flex flex-col gap-8">
          {sections.map((sec) => (
            <div key={sec.title}>
              <h2 className="text-lg font-semibold text-white mb-3">{sec.title}</h2>
              <p className="text-gray-400 text-sm leading-relaxed">{sec.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white/5 border border-white/10 rounded-2xl p-7 text-center">
          <p className="text-gray-400 text-sm">
            Questions about this policy? Email us at{' '}
            <a href="mailto:privacy@bizross.io" className="text-indigo-400 hover:underline">
              privacy@bizross.io
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
