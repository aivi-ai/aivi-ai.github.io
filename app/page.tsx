import type { Metadata } from 'next';

import { Section } from '@/components/Section';
import { Container } from '@/components/Container';
import { HomeHero } from '@/components/HomeHero';
import { StudentsBand } from '@/components/StudentsBand';
import { SegmentCard } from '@/components/SegmentCard';
import { ServiceCard } from '@/components/ServiceCard';
import { StepList } from '@/components/StepList';
import { BulletList } from '@/components/BulletList';
import { HonestyNote } from '@/components/HonestyNote';
import { Faq } from '@/components/Faq';
import { CtaBand } from '@/components/CtaBand';
import { JsonLd } from '@/components/JsonLd';
import { Reveal } from '@/components/Reveal';

import { segments } from '@/content/segments';
import { services } from '@/content/services';
import { generalFaq } from '@/content/faq';
import { faqJsonLd } from '@/lib/jsonld';
import { aiExperts, aiExpertCapabilities, aiExpertInstitutions, advisoryCapabilities, advisoryCompanies } from '@/content/people';
import { PersonCard } from '@/components/PersonCard';

export const metadata: Metadata = {
  title: 'AIVI - AI expertise, by the hour.',
  description:
    'Senior AI consulting in hours, not months. Fixed-scope engagements with prices on the page. Book a free 30-minute call.',
};

const featuredServices = services.filter(s => s.featured);

const HOW_IT_WORKS_STEPS = [
  {
    label: 'Book a free call',
    detail: "30 minutes. No obligation. Describe your situation and we'll tell you what we think.",
  },
  {
    label: 'We scope it in writing',
    detail: 'A fixed price, hours, and turnaround - in your inbox the next working day.',
  },
  {
    label: 'You accept, we invoice',
    detail: 'Reply to accept. Pay by bank transfer or card payment link. Work starts.',
  },
  {
    label: 'You get the deliverable',
    detail: 'In days, not months. Plus a walkthrough call to go through everything.',
  },
];

const WALK_AWAY_ITEMS = [
  'A written review of your codebase, ranked by what will break first',
  'A 90-day roadmap telling you exactly what to learn and build next',
  'A workflow map with hours saved per week, tools, and prompts',
  'Working code in your repository, with a README and a handover call',
];

export default function HomePage() {
  return (
    <>
      {/* 1 - Hero (A/B: variant A control + variant C alternate) */}
      <HomeHero />

      {/* 2 - Segment chooser */}
      <Reveal>
        <Section role="body">
          <Container>
            <div className="text-center mb-12">
              <p className="eyebrow justify-center mb-3">Where you start</p>
              <h2 className="text-h2">Where are you starting from?</h2>
              <p className="text-lede mt-3 mx-auto" style={{ maxWidth: '48ch' }}>
                Pick the description that fits. Each leads to the engagements most relevant to you.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:gap-6">
              {segments.map(segment => (
                <SegmentCard key={segment.slug} segment={segment} />
              ))}
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* 2b - Students spotlight */}
      <Reveal>
        <StudentsBand />
      </Reveal>

      {/* 3 - Featured services */}
      <Reveal>
        <Section role="body">
          <Container>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
              <div>
                <p className="eyebrow mb-3">What we offer</p>
                <h2 className="text-h2">Popular engagements</h2>
                <p className="text-lede mt-2">
                  Fixed scope, published price, delivered in days.
                </p>
              </div>
              <a
                href="/services"
                className="link-arrow text-sm font-medium"
                style={{ color: 'var(--color-accent)', textDecoration: 'none', whiteSpace: 'nowrap' }}
              >
                See all engagements <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featuredServices.map(service => (
                <ServiceCard key={service.slug} service={service} />
              ))}
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* 4 - How it works (raised emphasis chapter - replaces mid-page dark island) */}
      <Reveal>
        <Section role="raised">
          <Container className="relative z-10">
            <div className="text-center mb-12">
              <p className="eyebrow justify-center mb-3">Process</p>
              <h2 className="text-h2">How it works</h2>
              <p className="text-lede mt-3 mx-auto" style={{ maxWidth: '48ch' }}>
                From first call to finished deliverable, in four steps.
              </p>
            </div>
            <StepList steps={HOW_IT_WORKS_STEPS} />
            <div className="mt-10 text-center">
              <a
                href="/approach"
                className="link-arrow text-sm font-medium"
                style={{ color: 'var(--color-accent)', textDecoration: 'none' }}
              >
                Full process details <span aria-hidden="true">&rarr;</span>
              </a>
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* 5 - What you walk away with */}
      <Reveal>
        <Section role="body">
          <Container>
            <div className="lg:grid lg:grid-cols-[1fr_1fr] lg:gap-16 lg:items-center">
              <div>
                <p className="eyebrow mb-3">Deliverables</p>
                <h2 className="text-h2 mb-3">What you actually walk away with</h2>
                <p className="text-lede mb-0">
                  Not slide decks. Not strategy documents. Tangible deliverables in days.
                </p>
              </div>
              <div className="mt-8 lg:mt-0">
                <BulletList variant="check" items={WALK_AWAY_ITEMS} />
              </div>
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* 6 - Honesty band */}
      <Reveal>
        <Section role="body">
          <Container>
            <div className="max-w-3xl mx-auto">
              <HonestyNote />
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* 7 - Team */}
      <Reveal>
        <Section role="body" id="team">
          <Container>
            <div className="text-center mb-14">
              <p className="eyebrow justify-center mb-3">The team</p>
              <h2 className="text-h2">Senior people, where AI is actually being built.</h2>
              <p className="text-lede mt-3 mx-auto" style={{ maxWidth: '54ch' }}>
                Engineers and researchers who&rsquo;ve shipped real AI inside real startups &mdash; the same people you brief are the ones who do the work.
              </p>
            </div>

            <div className="mb-12">
              <h3 className="text-h3 mb-6" style={{ color: 'var(--color-ink)' }}>
                AI Experts
              </h3>
              <div className="card p-6 md:p-8 flex flex-col gap-8">
                {/* 1 - People: name / title / location */}
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                  {aiExperts.map(person => (
                    <PersonCard key={person.name} person={person} />
                  ))}
                </div>

                <div style={{ borderTop: '1px solid var(--color-line)' }} />

                {/* 2 - Collective capabilities, not tied to any one person */}
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-5"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    What this bench brings
                  </p>
                  <ul className="grid grid-cols-1 gap-x-8 gap-y-3.5 md:grid-cols-2">
                    {aiExpertCapabilities.map(item => (
                      <li key={item} className="flex items-start gap-2.5">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--color-accent)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="mt-0.5 shrink-0"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span
                          className="text-base leading-snug"
                          style={{ color: 'var(--color-ink-soft)' }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3 - Affiliation tags, shared across the section */}
                <div className="flex flex-wrap gap-1.5">
                  {aiExpertInstitutions.map(inst => (
                    <span
                      key={inst}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        background: 'var(--color-surface-alt)',
                        color: 'var(--color-ink-muted)',
                        border: '1px solid var(--color-line)',
                      }}
                    >
                      {inst}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-h3 mb-6" style={{ color: 'var(--color-ink)' }}>
                Software Advisory Board
              </h3>
              <div className="card p-6 md:p-8 flex flex-col gap-8">
                {/* 1 - One-line framing of the bench */}
                <p
                  className="text-lg md:text-xl font-semibold leading-snug"
                  style={{ color: 'var(--color-ink)', maxWidth: '70ch' }}
                >
                  Staff- and Principal-level engineers from teams that run at production
                  scale &mdash;{' '}
                  <span style={{ color: 'var(--color-ink-soft)', fontWeight: 400 }}>
                    we design and build your solution together, pressure-testing every
                    technical call before it reaches you.
                  </span>
                </p>

                {/* 2 - Collective capabilities, mirroring the AI Experts checklist */}
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-5"
                    style={{ color: 'var(--color-ink-muted)' }}
                  >
                    What this bench brings
                  </p>
                  <ul className="grid grid-cols-1 gap-x-8 gap-y-3.5 md:grid-cols-2">
                    {advisoryCapabilities.map(item => (
                      <li key={item} className="flex items-start gap-2.5">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="var(--color-accent)"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden="true"
                          className="mt-0.5 shrink-0"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                        <span
                          className="text-base leading-snug"
                          style={{ color: 'var(--color-ink-soft)' }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3 - Company tags, shared across the section */}
                <div className="flex flex-wrap gap-1.5">
                  {advisoryCompanies.map(company => (
                    <span
                      key={company}
                      className="text-xs font-medium px-2.5 py-1 rounded-full"
                      style={{
                        background: 'var(--color-surface-alt)',
                        color: 'var(--color-ink-muted)',
                        border: '1px solid var(--color-line)',
                      }}
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* 9 - FAQ */}
      <Reveal>
        <Section role="body">
          <Container>
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-10">
                <p className="eyebrow justify-center mb-3">FAQ</p>
                <h2 className="text-h2">Common questions</h2>
              </div>
              <Faq items={generalFaq} />
              <JsonLd data={faqJsonLd(generalFaq)} />
            </div>
          </Container>
        </Section>
      </Reveal>

      {/* 10 - Closing CTA band */}
      <CtaBand
        heading="Tell us what you're building."
        sub="No commitment until after the call. We&rsquo;ll tell you honestly whether we&rsquo;re the right help."
        cta="Book a free 30-minute call"
        href="/book"
      />
    </>
  );
}
