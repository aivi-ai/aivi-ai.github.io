import type { Person } from '@/content/people';

interface Props {
  person: Person;
}

export function PersonCard({ person }: Props) {
  const { name, credential, focusArea, bio, link } = person;

  return (
    <article className="card flex flex-col gap-4 p-6">
      <div>
        <h3 className="text-h3 mb-1" style={{ color: 'var(--color-ink)' }}>
          {name}
        </h3>
        <p className="text-sm font-medium" style={{ color: 'var(--color-accent)' }}>
          {credential}
        </p>
        <p className="text-sm mt-0.5" style={{ color: 'var(--color-ink-muted)' }}>
          {focusArea}
        </p>
      </div>

      <p className="text-base leading-relaxed" style={{ color: 'var(--color-ink-soft)' }}>
        {bio}
      </p>

      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium self-start"
          style={{ color: 'var(--color-accent)' }}
        >
          View profile &rarr;
        </a>
      )}
    </article>
  );
}
