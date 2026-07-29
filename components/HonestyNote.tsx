export function HonestyNote() {
  return (
    <aside
      className="relative rounded-[var(--radius-lg)] p-8 md:p-10 overflow-hidden"
      style={{
        borderLeft: '3px solid var(--color-accent)',
        backgroundColor: 'var(--color-surface-alt)',
        color: 'var(--color-ink-soft)',
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      <span
        aria-hidden="true"
        className="absolute select-none pointer-events-none"
        style={{
          top: '-0.5rem',
          left: '1.25rem',
          fontSize: '5rem',
          lineHeight: 1,
          fontFamily: 'Georgia, serif',
          color: 'var(--color-accent)',
          opacity: 0.15,
        }}
      >
        &ldquo;
      </span>
      <p className="relative text-lede leading-relaxed">
        We&rsquo;ll tell you when you don&rsquo;t need us. Some problems need a
        two-hour conversation, not a project. Some need a team we&rsquo;re not.
        You&rsquo;ll hear that on the free call, not after an invoice.
      </p>
    </aside>
  );
}
