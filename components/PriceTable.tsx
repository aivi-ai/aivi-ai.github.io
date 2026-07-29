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
  { label: 'Students', value: 'students' },
  { label: 'Founders', value: 'founders' },
  { label: 'Professionals', value: 'professionals' },
  { label: 'Teams', value: 'teams' },
];

export function PriceTable({ services }: Props) {
  const [filter, setFilter] = useState<FilterValue>('all');

  return (
    <div className="flex flex-col gap-6">
      {/* Filter row */}
      <div
        className="flex flex-wrap gap-2"
        role="group"
        aria-label="Filter services by audience"
      >
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
                color: isActive ? '#ffffff' : 'var(--color-ink-soft)',
                border: isActive
                  ? '1px solid var(--color-accent)'
                  : '1px solid var(--color-line)',
                boxShadow: isActive
                  ? '0 6px 16px -4px rgba(31, 79, 255, 0.4)'
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
                'Book',
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
                  <td className="py-4 px-4">
                    <Link
                      href={`/book?topic=${service.slug}`}
                      className="inline-flex items-center justify-center px-3 py-2 rounded-[var(--radius-sm)] text-xs font-medium transition-colors duration-150"
                      style={{
                        backgroundColor: 'var(--color-accent-soft)',
                        color: 'var(--color-accent)',
                        textDecoration: 'none',
                        whiteSpace: 'nowrap',
                        minHeight: '36px',
                      }}
                    >
                      Book a free call
                    </Link>
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
              <Link
                href={`/book?topic=${service.slug}`}
                className="inline-flex items-center justify-center px-4 py-2.5 rounded-[var(--radius-sm)] text-sm font-medium"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  minHeight: '44px',
                }}
              >
                Book a free call
              </Link>
            </article>
          );
        })}
      </div>
    </div>
  );
}
