interface Step {
  label: string;
  detail: string;
}

interface Props {
  steps: Step[];
  layout?: 'vertical' | 'horizontal';
}

export function StepList({ steps, layout = 'horizontal' }: Props) {
  const isHorizontal = layout === 'horizontal';

  return (
    <ol
      className={`flex gap-6 ${isHorizontal ? 'flex-col md:flex-row' : 'flex-col'}`}
    >
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;

        return (
          <li
            key={index}
            className={`relative flex gap-4 rounded-[var(--radius-md)] ${
              isHorizontal ? 'md:flex-col md:flex-1 p-4' : ''
            }`}
            style={
              isHorizontal
                ? { backgroundColor: 'var(--color-surface-alt)' }
                : undefined
            }
          >
            <div
              className="relative flex-shrink-0 flex items-center justify-center"
              style={{ width: '40px', height: '40px' }}
            >
              {!isLast && (
                <span
                  aria-hidden="true"
                  style={
                    isHorizontal
                      ? {
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          width: 'calc(100% + 1.5rem)',
                          height: '2px',
                          backgroundColor: 'var(--color-line)',
                          zIndex: 0,
                        }
                      : {
                          position: 'absolute',
                          left: '50%',
                          top: '50%',
                          width: '2px',
                          height: 'calc(100% + 1.5rem)',
                          transform: 'translateX(-50%)',
                          backgroundColor: 'var(--color-line)',
                          zIndex: 0,
                        }
                  }
                />
              )}
              <div
                className="stat-mono relative flex items-center justify-center rounded-full text-sm"
                style={{
                  width: '40px',
                  height: '40px',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--cta-closing-ink, #0B0D12)',
                  zIndex: 1,
                }}
                aria-hidden="true"
              >
                {index + 1}
              </div>
            </div>

            <div className="flex-1 min-w-0">
              <h4
                className="font-semibold mb-1"
                style={{ color: 'var(--color-ink)' }}
              >
                {step.label}
              </h4>
              <p
                className="text-sm leading-relaxed"
                style={{ color: 'var(--color-ink-soft)' }}
              >
                {step.detail}
              </p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
