import type { Metadata } from 'next';
import { FileText } from 'lucide-react';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: 'Terms of Service — BizRoss POS',
  description: 'Read the terms and conditions governing your use of BizRoss POS software and services.',
};

const sections = [
  {
    title: '1. Acceptance of Terms',
    body: `By accessing or using BizRoss products and services, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, you may not use our services.`,
  },
  {
    title: '2. Description of Service',
    body: `BizRoss provides cloud-based point-of-sale software, inventory management, and related business tools. We reserve the right to modify, suspend, or discontinue any aspect of our service at any time with reasonable notice to users.`,
  },
  {
    title: '3. Account Registration',
    body: `You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials and for all activity that occurs under your account. Notify us immediately of any unauthorized access.`,
  },
  {
    title: '4. Subscription & Billing',
    body: `Paid plans are billed in advance on a monthly or annual cycle. All fees are non-refundable except as required by law or as stated in our refund policy. We may change pricing with 30 days' notice.`,
  },
  {
    title: '5. Acceptable Use',
    body: `You agree not to misuse our services. Prohibited activities include attempting to gain unauthorized access to other accounts, using scraping or automated means to access our services, reverse engineering our software, or using BizRoss for any illegal purposes.`,
  },
  {
    title: '6. Intellectual Property',
    body: `BizRoss retains all intellectual property rights in our software and services. Your use of our services does not grant you ownership of any intellectual property rights. You retain ownership of all data you input into our platform.`,
  },
  {
    title: '7. Limitation of Liability',
    body: `To the maximum extent permitted by law, BizRoss shall not be liable for any indirect, incidental, special, or consequential damages. Our total liability to you for any claim shall not exceed the amount paid by you to BizRoss in the 12 months preceding the claim.`,
  },
  {
    title: '8. Governing Law',
    body: `These Terms shall be governed by the laws of Kenya. Any disputes shall be resolved through binding arbitration in Nairobi, Kenya, except that either party may seek injunctive relief in court for intellectual property matters.`,
  },
];

export default function TermsPage() {
  return (
    <main className="relative bg-[#0a0c16] min-h-screen text-[#f0f2ff]">
      <Navbar />

      <section className="pt-36 pb-8 px-6 text-center">
        <p className="text-sm font-semibold tracking-widest uppercase text-indigo-400 mb-4">Legal</p>
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-violet-500/10">
            <FileText className="w-6 h-6 text-violet-400" />
          </div>
        </div>
        <h1 className="text-5xl font-bold text-white">Terms of Service</h1>
        <p className="text-sm text-gray-500 mt-4">Last updated: January 1, 2026</p>
      </section>

      <section className="py-10 px-6 max-w-3xl mx-auto pb-24">
        <p className="text-gray-400 mb-10 leading-relaxed">
          Please read these Terms of Service carefully before using BizRoss products and services. These terms constitute a legally binding agreement between you and BizRoss, Inc.
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
            Questions about these terms? Email us at{' '}
            <a href="mailto:legal@bizross.io" className="text-indigo-400 hover:underline">
              legal@bizross.io
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
