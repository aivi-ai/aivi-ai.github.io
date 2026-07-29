'use client';

import { useState } from 'react';

interface FaqItem {
  q: string;
  a: string;
}

interface Props {
  items: FaqItem[];
  emitJsonLd?: boolean;
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      style={{
        flexShrink: 0,
        color: open ? 'var(--color-accent)' : 'var(--color-ink-muted)',
        transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
        transition: 'transform 350ms cubic-bezier(0.22, 1, 0.36, 1), color 200ms ease-out',
      }}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Faq({ items, emitJsonLd = false }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  if (items.length === 0) return null;

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div>
      <dl
        className="flex flex-col"
        style={{
          border: '1px solid var(--color-line)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          backgroundColor: 'var(--color-surface)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const headingId = `faq-heading-${index}`;

          return (
            <div
              key={index}
              style={{
                borderTop: index === 0 ? 'none' : '1px solid var(--color-line)',
                borderLeft: isOpen ? '3px solid var(--color-accent)' : '3px solid transparent',
                backgroundColor: isOpen ? 'var(--color-accent-soft)' : 'transparent',
                transition: 'background-color 250ms ease-out, border-color 250ms ease-out',
              }}
            >
              <dt>
                <button
                  id={headingId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors duration-200"
                  style={{ backgroundColor: 'transparent', cursor: 'pointer', border: 'none' }}
                  onMouseEnter={(e) => {
                    if (!isOpen) {
                      e.currentTarget.style.backgroundColor = 'var(--color-surface-alt)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <span
                    className="font-semibold text-base"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    {item.q}
                  </span>
                  <ChevronIcon open={isOpen} />
                </button>
              </dt>
              <dd
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                style={{
                  display: 'grid',
                  gridTemplateRows: isOpen ? '1fr' : '0fr',
                  transition: 'grid-template-rows 350ms cubic-bezier(0.22, 1, 0.36, 1)',
                }}
              >
                <div style={{ overflow: 'hidden' }}>
                  <p
                    className="px-6 pb-6 text-base leading-relaxed"
                    style={{ color: 'var(--color-ink-soft)' }}
                  >
                    {item.a}
                  </p>
                </div>
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
