interface Props {
  items: string[];
  variant: 'check' | 'dash' | 'cross';
  className?: string;
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, color: 'var(--color-positive)' }}
    >
      <path
        d="M3 9L7 13L15 5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DashIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, color: 'var(--color-ink-soft)' }}
    >
      <path
        d="M4 9H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CrossIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 18 18"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0, color: 'var(--color-warn)' }}
    >
      <path
        d="M5 5L13 13M13 5L5 13"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

const iconMap = {
  check: CheckIcon,
  dash: DashIcon,
  cross: CrossIcon,
};

const bgMap = {
  check: 'var(--color-positive)',
  dash: 'var(--color-surface-alt)',
  cross: 'var(--color-warn)',
};

export function BulletList({ items, variant, className = '' }: Props) {
  const Icon = iconMap[variant];
  const bg = bgMap[variant];

  return (
    <ul className={`flex flex-col gap-4 list-none p-0 m-0 ${className}`}>
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3.5">
          <span
            className="flex-shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: '26px',
              height: '26px',
              backgroundColor:
                variant === 'dash' ? bg : `color-mix(in srgb, ${bg} 14%, transparent)`,
            }}
          >
            <Icon />
          </span>
          <span
            className="text-base leading-relaxed pt-0.5"
            style={{ color: 'var(--color-ink-soft)' }}
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}
