/**
 * AiviMark — inline SVG of the AIVI geometric brand mark.
 *
 * The two-layer design (dark L-shaped frame + clay accent square) adapts to
 * the site's data-theme attribute: near-black frame / warm clay in light
 * register; cream frame / lighter clay in dark register.
 */

interface AiviMarkProps {
  /** Side length in pixels (the mark is always square). */
  size?: number;
  className?: string;
}

export function AiviMark({ size = 32, className }: AiviMarkProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={className}
      aria-hidden="true"
      focusable="false"
      style={{ display: 'block', flexShrink: 0 }}
    >
      {/*
        We use two <rect> fills driven by CSS vars so the mark follows the
        site's register (light / dark) without any JS.
        --mark-frame: the L-shaped frame (dark in light-register, cream in dark)
        --mark-accent: the clay square accent
      */}
      <style>{`
        :root, [data-theme="light"] {
          --mark-frame: #1A1917;
          --mark-accent: #B0552B;
        }
        [data-theme="dark"] {
          --mark-frame: #F5F0E7;
          --mark-accent: #E08A5C;
        }
      `}</style>

      <mask id="aivi-mark-gm">
        <rect x="10" y="10" width="80" height="80" rx="20" fill="#fff" />
        <rect x="36" y="36" width="56" height="56" rx="18" fill="#000" />
      </mask>
      {/* Frame */}
      <rect
        x="10" y="10" width="80" height="80" rx="20"
        fill="var(--mark-frame)"
        mask="url(#aivi-mark-gm)"
      />
      {/* Accent square */}
      <rect
        x="42" y="42" width="48" height="48" rx="16"
        fill="var(--mark-accent)"
      />
    </svg>
  );
}
