'use client';

import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Script from 'next/script';
import { buildCalendlyUrl, isKnownSlug } from '@/lib/calendly';
import { company } from '@/content/company';

interface Props {
  /** Query string key the topic slug is read from, e.g. "topic" or "s". */
  paramName?: string;
}

export function CalendlyEmbed({ paramName = 'topic' }: Props) {
  const searchParams = useSearchParams();
  const rawTopic = searchParams.get(paramName);
  const topic = isKnownSlug(rawTopic) ? rawTopic! : undefined;

  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [showFallback, setShowFallback] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const url = buildCalendlyUrl(topic);

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      if (!scriptLoaded) setShowFallback(true);
    }, 4000);

    return () => {
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleScriptLoad() {
    setScriptLoaded(true);
    if (timeoutRef.current !== null) {
      clearTimeout(timeoutRef.current);
    }
  }

  return (
    <div>
      {/* Skeleton shown until script loads */}
      {!scriptLoaded && (
        <div
          className="calendly-skeleton min-h-[1000px] md:min-h-[700px]"
          role="status"
          aria-live="polite"
        >
          {showFallback ? (
            <div className="flex flex-col items-center gap-3 text-center px-4">
              <p style={{ color: 'var(--color-ink-muted)' }}>
                The calendar couldn&rsquo;t load. You can book directly below.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-5 py-3 rounded-[var(--radius-sm)] text-sm font-medium"
                style={{
                  backgroundColor: 'var(--color-accent)',
                  color: '#ffffff',
                  textDecoration: 'none',
                  minHeight: '44px',
                }}
              >
                Open Calendly &rarr;
              </a>
            </div>
          ) : (
            <span>Loading the calendar&hellip;</span>
          )}
        </div>
      )}

      {/* The Calendly widget — always in DOM so Calendly's init scan finds it.
          height (not min-height) is required: the iframe inside uses height="100%"
          which only resolves against an explicit parent height, not min-height. */}
      <div
        className="calendly-inline-widget"
        data-url={url}
        style={{ minWidth: '320px', height: '700px', display: scriptLoaded ? undefined : 'none' }}
      />

      {/* Noscript fallback */}
      <noscript>
        <div className="text-center py-8">
          <p style={{ color: 'var(--color-ink-soft)' }} className="mb-4">
            JavaScript is required to display the booking calendar.
          </p>
          <a
            href={company.calendlyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-5 py-3 rounded-[var(--radius-sm)] text-sm font-medium"
            style={{
              backgroundColor: 'var(--color-accent)',
              color: '#ffffff',
              textDecoration: 'none',
            }}
          >
            Book a free 30-minute call
          </a>
        </div>
      </noscript>

      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
      />
    </div>
  );
}
