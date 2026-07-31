import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Page Not Found - AIVI',
  description: 'The page you were looking for could not be found.',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-paper)',
        paddingTop: 'clamp(5rem, 12vw, 10rem)',
        paddingBottom: 'clamp(5rem, 12vw, 10rem)',
      }}
    >
      <Container>
        <div className="max-w-lg">
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(4rem, 10vw, 6rem)',
              fontWeight: 800,
              letterSpacing: '-0.04em',
              lineHeight: 1,
              color: 'var(--color-line)',
              marginBottom: '1rem',
            }}
          >
            404
          </p>
          <h1 className="text-h1 mb-4">Page not found.</h1>
          <p className="text-lede mb-10">
            The page you&rsquo;re looking for doesn&rsquo;t exist or has moved.
            Here are a few places to start instead.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button href="/book" variant="primary">Book a free call</Button>
            <Button href="/services" variant="secondary">See our engagements</Button>
            <Button href="/pricing" variant="ghost">Pricing</Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
