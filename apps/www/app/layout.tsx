import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0a0c16',
};

export const metadata: Metadata = {
  title: 'BizRoss POS — The Smart POS for Growing Businesses',
  description:
    'Manage sales, inventory, and customers in one simple system. BizRoss POS is built for small shops, warehouses, and mini supermarkets.',
  keywords: [
    'POS system',
    'point of sale',
    'small business POS',
    'inventory management',
    'retail software',
    'warehouse management',
    'BizRoss',
  ],
  authors: [{ name: 'BizRoss', url: 'https://bizross.io' }],
  icons: {
    icon: [
      { url: '/logo-icon.png', type: 'image/png' },
    ],
    apple: '/logo-icon.png',
    shortcut: '/logo-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bizross.io',
    siteName: 'BizRoss POS',
    title: 'BizRoss POS — The Smart POS for Growing Businesses',
    description:
      'Manage sales, inventory, and customers in one simple system. Fast checkouts, real-time inventory, and offline support.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'BizRoss POS Dashboard',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BizRoss POS — The Smart POS for Growing Businesses',
    description: 'Manage sales, inventory, and customers in one simple system.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="antialiased bg-[#0a0c16] text-[#f0f2ff]">
        {children}
      </body>
    </html>
  );
}
