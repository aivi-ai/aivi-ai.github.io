'use client';

import { useSearchParams } from 'next/navigation';
import { getService } from '@/content/services';
import { isKnownSlug } from '@/lib/calendly';

interface Props {
  /** Query string key the topic slug is read from, e.g. "topic" or "s". */
  paramName?: string;
  /** Copy before the service name, e.g. "You're booking about:" */
  lead: string;
}

export function BookingTopicNote({ paramName = 'topic', lead }: Props) {
  const searchParams = useSearchParams();
  const rawSlug = searchParams.get(paramName);
  const slug = isKnownSlug(rawSlug) ? rawSlug! : undefined;
  const service = slug ? getService(slug) : undefined;

  if (!service) return null;

  return (
    <div
      className="mt-8 rounded-[var(--radius-lg)] px-5 py-4"
      role="note"
      style={{
        background: 'linear-gradient(135deg, var(--color-accent-soft), rgba(31, 79, 255, 0.06))',
        borderLeft: '3px solid var(--color-accent)',
      }}
    >
      <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
        {lead} <strong style={{ color: 'var(--color-ink)' }}>{service.name}</strong>
      </p>
    </div>
  );
}
