import type { Person } from '@/content/people';

interface Props {
  person: Person;
}

export function PersonCard({ person }: Props) {
  const { name, credential, link, location } = person;

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <h3 className="text-h3" style={{ color: 'var(--color-ink)' }}>
          {name}
        </h3>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${name} on LinkedIn`}
            className="inline-flex items-center justify-center shrink-0 transition-colors"
            style={{ color: 'var(--color-ink-muted)' }}
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.55V9h3.57v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.22.79 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
            </svg>
          </a>
        )}
      </div>
      <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
        {credential}
      </p>
      {location && (
        <p
          className="text-xs mt-0.5 flex items-center gap-1"
          style={{ color: 'var(--color-ink-muted)' }}
        >
          <svg
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {location}
        </p>
      )}
    </div>
  );
}
