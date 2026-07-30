'use client';

import { useState } from 'react';
import Link from 'next/link';
import type { Service, Audience } from '@/content/services';

interface Props {
  services: Service[];
}

type FilterValue = 'all' | Audience;

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'Teams', value: 'teams' },
  { label: 'Founders', value: 'founders' },
  { label: 'Professionals', value: 'professionals' },
  { label: 'Students', value: 'students' },
];

export function PriceTable({ services }: Props) {
  const [filter, setFilter] = useState<FilterValue>('all');

  return (
    <div className="flex flex-col gap-6">
      {/* Filter row + book nudge */}
      <div
        className="flex flex-wrap items-center justify-between gap-3"
        role="group"
        aria-label="Filter services by audience"
      >
        <div className="flex flex-wrap gap-2">
          {FILTERS.map(({ label, value }) => {
            const isActive = filter === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => setFilter(value)}
                aria-pressed={isActive}
                className="px-4 py-1.5 rounded-[var(--radius-pill)] text-sm font-semibold transition-all duration-200"
                style={{
                  backgroundColor: isActive
                    ? 'var(--color-accent)'
                    : 'var(--color-surface)',
                  color: isActive ? 'var(--cta-closing-ink, #0B0D12)' : 'var(--color-ink-soft)',
                  border: isActive
                    ? '1px solid var(--color-accent)'
                    : '1px solid var(--color-line)',
                  boxShadow: isActive
                    ? '0 4px 12px -4px var(--color-accent-glow)'
                    : 'none',
                  cursor: 'pointer',
                  minHeight: '36px',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>
        <span
          className="text-sm font-medium flex items-center gap-1.5 shrink-0"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          Ready to start?
          <Link
            href="/book"
            className="inline-flex items-center gap-1 font-semibold"
            style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
          >
            Book a free call
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              aria-hidden="true"
              style={{ display: 'inline', verticalAlign: 'middle' }}
            >
              <path
                d="M2.5 10.5L10.5 2.5M10.5 2.5H4.5M10.5 2.5V8.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </span>
      </div>

      {/* Desktop table (md+) */}
      <div className="hidden md:block overflow-x-auto">
        <table
          className="w-full text-sm"
          style={{ borderCollapse: 'collapse' }}
        >
          <thead>
            <tr style={{ borderBottom: '2px solid var(--color-line)' }}>
              {[
                'Service',
                'What you get',
                'Hours',
                'Price (excl. VAT)',
                'Turnaround',
              ].map((col) => (
                <th
                  key={col}
                  className="text-left py-3 px-4 font-semibold text-xs uppercase tracking-wide"
                  style={{ color: 'var(--color-ink-muted)' }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((service) => {
              const isVisible =
                filter === 'all' || service.audiences.includes(filter);
              return (
                <tr
                  key={service.slug}
                  className="transition-colors duration-150"
                  style={{
                    borderBottom: '1px solid var(--color-line)',
                    display: isVisible ? '' : 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'var(--color-surface-alt)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <td
                    className="py-4 px-4 font-medium"
                    style={{ color: 'var(--color-ink)' }}
                  >
                    <Link
                      href={`/services/${service.slug}`}
                      style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
                    >
                      {service.name}
                    </Link>
                  </td>
                  <td
                    className="py-4 px-4"
                    style={{ color: 'var(--color-ink-soft)', maxWidth: '220px' }}
                  >
                    {service.outcome}
                  </td>
                  <td
                    className="py-4 px-4"
                    style={{ color: 'var(--color-ink-soft)', whiteSpace: 'nowrap' }}
                  >
                    {service.hours}
                  </td>
                  <td
                    className="stat-mono py-4 px-4 text-base"
                    style={{ color: 'var(--color-accent)', whiteSpace: 'nowrap' }}
                  >
                    {service.price}
                    {service.priceNote && (
                      <span
                        className="block text-xs font-normal"
                        style={{ color: 'var(--color-ink-muted)' }}
                      >
                        {service.priceNote}
                      </span>
                    )}
                  </td>
                  <td
                    className="py-4 px-4"
                    style={{ color: 'var(--color-ink-soft)', whiteSpace: 'nowrap' }}
                  >
                    {service.turnaround}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile stacked cards (below md) */}
      <div className="md:hidden flex flex-col gap-4">
        {services.map((service) => {
          const isVisible =
            filter === 'all' || service.audiences.includes(filter);
          return (
            <article
              key={service.slug}
              className="p-5 rounded-[var(--radius-lg)] flex flex-col gap-3 transition-all duration-300 ease-out"
              style={{
                display: isVisible ? 'flex' : 'none',
                border: '1px solid var(--color-line)',
                backgroundColor: 'var(--color-surface)',
                boxShadow: 'var(--shadow-sm)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow =
                  '0 16px 32px -10px rgba(15, 17, 21, 0.16)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = '0 1px 2px rgba(15, 17, 21, 0.04)';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <h3
                className="font-semibold text-base"
                style={{ color: 'var(--color-ink)' }}
              >
                <Link
                  href={`/services/${service.slug}`}
                  style={{ color: 'var(--color-ink)', textDecoration: 'none' }}
                >
                  {service.name}
                </Link>
              </h3>
              <p className="text-sm" style={{ color: 'var(--color-ink-soft)' }}>
                {service.outcome}
              </p>
              <dl className="grid grid-cols-2 gap-3">
                <div>
                  <dt
                    className="text-xs uppercase tracking-wide font-medium"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    Hours
                  </dt>
                  <dd className="text-sm" style={{ color: 'var(--color-ink)' }}>
                    {service.hours}
                  </dd>
                </div>
                <div>
                  <dt
                    className="text-xs uppercase tracking-wide font-medium"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    Price excl. VAT
                  </dt>
                  <dd className="stat-mono text-base" style={{ color: 'var(--color-accent)' }}>
                    {service.price}
                    {service.priceNote && (
                      <span
                        className="block text-xs font-normal"
                        style={{ color: 'var(--color-ink-muted)' }}
                      >
                        {service.priceNote}
                      </span>
                    )}
                  </dd>
                </div>
                <div className="col-span-2">
                  <dt
                    className="text-xs uppercase tracking-wide font-medium"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    Turnaround
                  </dt>
                  <dd className="text-sm" style={{ color: 'var(--color-ink)' }}>
                    {service.turnaround}
                  </dd>
                </div>
              </dl>
            </article>
          );
        })}
      </div>
    </div>
  );
}
