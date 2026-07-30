import type { Metadata, Viewport } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import './globals.css';

import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { MobileCtaBar } from '@/components/MobileCtaBar';
import { HeroExperiment } from '@/components/HeroExperiment';
import { ThemeExperiment } from '@/components/ThemeExperiment';
import { JsonLd } from '@/components/JsonLd';
import { SkipLink } from '@/components/SkipLink';
import { organizationJsonLd, webSiteJsonLd } from '@/lib/jsonld';
import { company } from '@/content/company';

export const metadata: Metadata = {
  title: {
    template: '%s — AIVI',
    default: 'AIVI — AI expertise, by the hour.',
  },
  description:
    'Senior AI consulting in hours, not months. Fixed-scope engagements with prices on the page. Book a free 30-minute call.',
  metadataBase: new URL(company.siteUrl),
};

export const viewport: Viewport = {
  themeColor: '#FAF6EF',  /* light-register paper; dark register overrides this via meta theme-color */
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        {/* Register switch: set html[data-theme] before paint — no flash.
            Default = light (substance-light). ?theme=light|dark forces + persists.
            aivi_theme persists across sessions. No-JS / crawlers → light. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var D='light',K='aivi_theme',q=new URLSearchParams(location.search).get('theme'),v=null;if(q==='light'||q==='dark'){v=q;localStorage.setItem(K,v);}else{v=localStorage.getItem(K);}if(v!=='light'&&v!=='dark'){v=D;}document.documentElement.setAttribute('data-theme',v);}catch(e){}})();",
          }}
        />
        {/* Hero A/B: pick the variant before paint (no flash). Control = A,
            shown with no JS and to crawlers. ?hero=a|c forces + persists one. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "(function(){try{var K='aivi_hero',q=new URLSearchParams(location.search).get('hero'),v=null;if(q==='a'||q==='c'){v=q;localStorage.setItem(K,v);}else{v=localStorage.getItem(K);}if(v!=='a'&&v!=='c'){v=Math.random()<0.5?'a':'c';localStorage.setItem(K,v);}document.documentElement.setAttribute('data-hero',v);}catch(e){}})();",
          }}
        />
        <SkipLink />
        <SiteHeader />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <MobileCtaBar />
        <HeroExperiment />
        <ThemeExperiment />
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
      </body>
    </html>
  );
}
