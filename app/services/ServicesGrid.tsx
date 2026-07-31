'use client';

import { useState } from 'react';
import type { Service, Audience } from '@/content/services';
import { ServiceCard } from '@/components/ServiceCard';
import { Container } from '@/components/Container';

type FilterValue = 'all' | Audience;

const FILTERS: { label: string; value: FilterValue }[] = [
  { label: 'All', value: 'all' },
  { label: 'Teams', value: 'teams' },
  { label: 'Founders', value: 'founders' },
  { label: 'Professionals', value: 'professionals' },
  { label: 'Students', value: 'students' },
];

interface Props {
  services: Service[];
}

export function ServicesGrid({ services }: Props) {
  const [active, setActive] = useState<FilterValue>('all');

  const sorted = [...services].sort((a, b) => a.order - b.order);

  return (
    <section
      aria-label="All engagements"
      className="py-16 md:py-20"
      style={{ backgroundColor: 'var(--color-paper)' }}
    >
      <Container>
        {/* Filter row */}
        <div
          role="group"
          aria-label="Filter engagements by audience"
          className="flex flex-wrap gap-2 mb-10"
        >
          {FILTERS.map((f) => {
            const isActive = active === f.value;
            return (
              <button
                key={f.value}
                type="button"
                aria-pressed={isActive}
                onClick={() => setActive(f.value)}
                className="h-9 px-4 text-sm font-medium transition-colors duration-150"
                style={{
                  borderRadius: 'var(--radius-pill)',
                  border: '1px solid',
                  cursor: 'pointer',
                  minHeight: '44px',
                  backgroundColor: isActive
                    ? 'var(--color-accent)'
                    : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--color-ink-soft)',
                  borderColor: isActive
                    ? 'var(--color-accent)'
                    : 'var(--color-line)',
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Cards grid - all cards are always in the DOM; only visibility changes */}
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0">
          {sorted.map((service) => {
            const visible =
              active === 'all' || service.audiences.includes(active as Audience);
            return (
              <li
                key={service.slug}
                aria-hidden={!visible}
                className={visible ? '' : 'hidden'}
              >
                <ServiceCard service={service} />
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
