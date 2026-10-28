import type { Metadata, Viewport } from 'next';
import './globals.css';
import { zodiak, generalSans } from './fonts';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Motion from '@/components/Motion';
import { site } from '@/data/site';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Caribbean-inspired ice cream, Brooklyn NY`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: site.name, url: site.url, title: `${site.name} | Caribbean-inspired ice cream`, description: site.description },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = { themeColor: '#0B3324', width: 'device-width', initialScale: 1 };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'IceCreamShop',
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  email: site.email,
  telephone: '+1-347-849-7924',
  description: site.description,
  address: { '@type': 'PostalAddress', addressLocality: site.location.city, addressRegion: site.location.region, addressCountry: site.location.country },
  areaServed: 'New York tri-state area',
  openingHours: site.hours.schema,
  sameAs: [site.instagram.url],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${zodiak.variable} ${generalSans.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <Motion />
      </body>
    </html>
  );
}
