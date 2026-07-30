'use client';

import {
  useState,
  useEffect,
  useRef,
  type KeyboardEvent,
  type RefObject,
} from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { services } from '@/content/services';
import { segments } from '@/content/segments';

type DropdownId = 'services' | 'who-we-help' | null;

const NAV_LINKS = [
  { label: 'Approach', href: '/approach' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Resources', href: '/resources' },
];

function useFocusTrap(ref: RefObject<HTMLElement | null>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;
    const focusable = ref.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled])'
    );
    if (focusable.length) focusable[0].focus();
  }, [active, ref]);
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<DropdownId>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Header text uses semantic --color-ink: dark in light-register, off-white in
  // dark-register. Works over the warm paper hero (light) and the near-black
  // hero (dark) without register-specific logic.
  const overHero = pathname === '/';
  const solid = scrolled || !overHero;
  const headerInk = 'var(--color-ink)';

  useFocusTrap(mobileMenuRef, mobileOpen);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handler, { passive: true });
    handler();
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  function handleDropdownKeyDown(
    e: KeyboardEvent<HTMLButtonElement>,
    id: DropdownId
  ) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setOpenDropdown(id);
      // Focus first item after state update
      requestAnimationFrame(() => {
        const container = document.getElementById(`dropdown-${id}`);
        const first = container?.querySelector<HTMLElement>('a');
        first?.focus();
      });
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setOpenDropdown(null);
    }
  }

  function handleDropdownItemKeyDown(e: KeyboardEvent<HTMLAnchorElement>) {
    const container = (e.currentTarget as HTMLElement).closest('[id^="dropdown-"]');
    if (!container) return;
    const items = Array.from(
      container.querySelectorAll<HTMLElement>('a')
    );
    const idx = items.indexOf(e.currentTarget);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      items[idx + 1]?.focus();
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (idx === 0) setOpenDropdown(null);
      else items[idx - 1]?.focus();
    }
  }

  const dropdownTriggerStyle: React.CSSProperties = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.3rem',
    fontSize: '0.9375rem',
    fontWeight: 500,
    color: headerInk,
    padding: '0.25rem 0',
    minHeight: '44px',
  };

  const dropdownItemStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: 'var(--color-ink)',
    borderRadius: 'var(--radius-sm)',
    transition: 'background-color 150ms ease',
  };

  function handleDropdownItemHover(e: React.MouseEvent<HTMLElement>, entering: boolean) {
    e.currentTarget.style.backgroundColor = entering
      ? 'var(--color-surface-alt)'
      : 'transparent';
  }

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 40,
          backgroundColor: solid
            ? scrolled
              ? 'color-mix(in srgb, var(--color-paper) 88%, transparent)'
              : 'var(--color-paper)'
            : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: `1px solid ${scrolled ? 'var(--color-line)' : 'transparent'}`,
          boxShadow: scrolled ? '0 4px 24px -12px rgba(15, 17, 21, 0.12)' : 'none',
          transition: 'border-color 200ms ease, background-color 200ms ease, box-shadow 200ms ease, color 200ms ease',
        }}
      >
        <nav
          ref={navRef}
          className="flex items-center justify-between max-w-[1200px] mx-auto px-5 md:px-8 lg:px-12 h-[72px]"
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link
            href="/"
            style={{
              fontWeight: 800,
              fontSize: '1.5rem',
              letterSpacing: '-0.04em',
              color: headerInk,
              textDecoration: 'none',
              transition: 'color 200ms ease',
            }}
            aria-label="AIVI — home"
          >
            AIVI
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-9">
            {/* Services dropdown */}
            <div className="relative">
              <button
                style={dropdownTriggerStyle}
                aria-expanded={openDropdown === 'services'}
                aria-haspopup="true"
                aria-controls="dropdown-services"
                onClick={() =>
                  setOpenDropdown((d) =>
                    d === 'services' ? null : 'services'
                  )
                }
                onKeyDown={(e) => handleDropdownKeyDown(e, 'services')}
              >
                Services
                <ChevronDown open={openDropdown === 'services'} color={headerInk} />
              </button>
              {openDropdown === 'services' && (
                <div
                  id="dropdown-services"
                  role="menu"
                  className="absolute top-full left-0 mt-3 py-3 rounded-[var(--radius-md)] shadow-2xl w-80"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-line)',
                    zIndex: 50,
                  }}
                >
                  {services.map((s) => (
                    <Link
                      key={s.slug}
                      href={`/services/${s.slug}`}
                      role="menuitem"
                      className="block mx-2 px-4 py-3"
                      style={dropdownItemStyle}
                      onClick={() => setOpenDropdown(null)}
                      onKeyDown={handleDropdownItemKeyDown}
                      onMouseEnter={(e) => handleDropdownItemHover(e, true)}
                      onMouseLeave={(e) => handleDropdownItemHover(e, false)}
                    >
                      <span
                        className="block text-sm font-medium"
                        style={{ color: 'var(--color-ink)' }}
                      >
                        {s.name}
                      </span>
                      <span
                        className="block text-xs mt-0.5"
                        style={{ color: 'var(--color-ink-muted)' }}
                      >
                        {s.outcome}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Who We Help dropdown */}
            <div className="relative">
              <button
                style={dropdownTriggerStyle}
                aria-expanded={openDropdown === 'who-we-help'}
                aria-haspopup="true"
                aria-controls="dropdown-who-we-help"
                onClick={() =>
                  setOpenDropdown((d) =>
                    d === 'who-we-help' ? null : 'who-we-help'
                  )
                }
                onKeyDown={(e) => handleDropdownKeyDown(e, 'who-we-help')}
              >
                Who We Help
                <ChevronDown open={openDropdown === 'who-we-help'} color={headerInk} />
              </button>
              {openDropdown === 'who-we-help' && (
                <div
                  id="dropdown-who-we-help"
                  role="menu"
                  className="absolute top-full left-0 mt-3 py-3 rounded-[var(--radius-md)] shadow-2xl w-72"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-line)',
                    zIndex: 50,
                  }}
                >
                  {segments.map((seg) => (
                    <Link
                      key={seg.slug}
                      href={`/who-we-help/${seg.slug}`}
                      role="menuitem"
                      className="block mx-2 px-4 py-3"
                      style={dropdownItemStyle}
                      onClick={() => setOpenDropdown(null)}
                      onKeyDown={handleDropdownItemKeyDown}
                      onMouseEnter={(e) => handleDropdownItemHover(e, true)}
                      onMouseLeave={(e) => handleDropdownItemHover(e, false)}
                    >
                      <span
                        className="block text-sm font-medium"
                        style={{ color: 'var(--color-ink)' }}
                      >
                        {seg.label}
                      </span>
                      <span
                        className="block text-xs mt-0.5"
                        style={{ color: 'var(--color-ink-muted)' }}
                      >
                        {seg.cardLine}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Static nav links */}
            {NAV_LINKS.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium"
                style={{
                  color: headerInk,
                  textDecoration: 'none',
                  transition: 'color 200ms ease',
                }}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <Link
            href="/book"
            className="hidden md:inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium"
            style={{
              backgroundColor: 'var(--cta-bg)',
              color: 'var(--cta-ink)',
              textDecoration: 'none',
              minHeight: '44px',
              borderRadius: 'var(--radius-pill)',
              transition: 'opacity 200ms ease, transform 200ms ease',
              transform: 'scale(1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.opacity = '0.88';
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.opacity = '1';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Book a free call
          </Link>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center gap-1.5"
            onClick={() => setMobileOpen((o) => !o)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              width: '44px',
              height: '44px',
            }}
          >
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                backgroundColor: headerInk,
                transition: 'transform 200ms, opacity 200ms',
                transform: mobileOpen
                  ? 'rotate(45deg) translate(2.5px, 5.5px)'
                  : 'none',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                backgroundColor: headerInk,
                opacity: mobileOpen ? 0 : 1,
                transition: 'opacity 200ms',
              }}
            />
            <span
              style={{
                display: 'block',
                width: '22px',
                height: '2px',
                backgroundColor: headerInk,
                transition: 'transform 200ms',
                transform: mobileOpen
                  ? 'rotate(-45deg) translate(2.5px, -5.5px)'
                  : 'none',
              }}
            />
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-50 flex flex-col overflow-y-auto md:hidden"
          style={{ backgroundColor: 'var(--color-paper)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Close bar */}
          <div
            className="flex items-center justify-between px-5 h-[72px] border-b"
            style={{ borderColor: 'var(--color-line)' }}
          >
            <Link
              href="/"
              style={{
                fontWeight: 800,
                fontSize: '1.5rem',
                letterSpacing: '-0.04em',
                color: 'var(--color-ink)',
                textDecoration: 'none',
              }}
              onClick={() => setMobileOpen(false)}
            >
              AIVI
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-ink)',
                fontSize: '1.5rem',
                lineHeight: 1,
                padding: '0.25rem',
              }}
            >
              ×
            </button>
          </div>

          <nav className="flex flex-col px-5 py-6 gap-1" aria-label="Mobile navigation">
            {/* Services section */}
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2 mt-4"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              Services
            </p>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="py-2.5 text-base font-medium"
                style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
                onClick={() => setMobileOpen(false)}
              >
                {s.name}
              </Link>
            ))}

            {/* Who We Help section */}
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-2 mt-6"
              style={{ color: 'var(--color-ink-muted)' }}
            >
              Who We Help
            </p>
            {segments.map((seg) => (
              <Link
                key={seg.slug}
                href={`/who-we-help/${seg.slug}`}
                className="py-2.5 text-base font-medium"
                style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
                onClick={() => setMobileOpen(false)}
              >
                {seg.label}
              </Link>
            ))}

            {/* Static links */}
            <div
              className="mt-6 pt-6 flex flex-col gap-1"
              style={{ borderTop: '1px solid var(--color-line)' }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="py-2.5 text-base font-medium"
                  style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
                  onClick={() => setMobileOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>

            {/* Mobile CTA */}
            <div className="mt-8">
              <Link
                href="/book"
                className="flex items-center justify-center px-4 py-3 text-base font-medium"
                style={{
                  backgroundColor: 'var(--cta-bg)',
                  color: 'var(--cta-ink)',
                  textDecoration: 'none',
                  minHeight: '44px',
                  borderRadius: 'var(--radius-pill)',
                }}
                onClick={() => setMobileOpen(false)}
              >
                Book a free call
              </Link>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}

function ChevronDown({ open, color }: { open: boolean; color?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      style={{
        transition: 'transform 200ms ease, color 200ms ease',
        transform: open ? 'rotate(180deg)' : 'none',
        color: color ?? 'var(--color-ink-muted)',
        opacity: 0.7,
      }}
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
