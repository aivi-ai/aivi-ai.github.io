'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function MobileCtaBar() {
  const pathname = usePathname();

  if (pathname === '/book') return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden px-4 pb-4 pt-5"
      style={{
        paddingBottom: 'max(1rem, env(safe-area-inset-bottom))',
        backgroundImage:
          'linear-gradient(to top, var(--color-paper) 55%, transparent)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        boxShadow: '0 -12px 24px -16px rgba(15, 17, 21, 0.18)',
      }}
    >
      <Link
        href="/book"
        className="flex items-center justify-center w-full px-4 py-3.5 text-base font-medium"
        style={{
          backgroundColor: 'var(--cta-bg)',
          color: 'var(--cta-ink)',
          textDecoration: 'none',
          minHeight: '52px',
          borderRadius: 'var(--radius-pill)',
        }}
      >
        Book a free call
      </Link>
    </div>
  );
}
