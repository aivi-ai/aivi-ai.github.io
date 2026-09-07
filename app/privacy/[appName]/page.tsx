import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { buildMetadata } from '@/lib/seo'
import { company } from '@/content/company'
import { getPrivacyPolicy, privacyPolicies } from '@/content/privacy'
import { Section } from '@/components/Section'
import { Container } from '@/components/Container'
import { PageHeader } from '@/components/PageHeader'

// Static export: one pre-rendered page per app policy in the registry.
export function generateStaticParams() {
  return privacyPolicies.map((p) => ({ appName: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ appName: string }>
}): Promise<Metadata> {
  const { appName } = await params
  const policy = getPrivacyPolicy(appName)
  if (!policy) return {}

  const meta = buildMetadata({
    title: `${policy.appName} Privacy Policy`,
    description: policy.description ?? policy.statement[0],
    // trailingSlash: true - the canonical form is /privacy/<slug>/
    path: `/privacy/${policy.slug}/`,
  })
  // buildMetadata appends " - AIVI" itself, and the root layout template
  // appends it again (site-wide "X - AIVI - AIVI" bug). Emit the bare title
  // so the template produces exactly one suffix.
  meta.title = `${policy.appName} Privacy Policy`
  return meta
}

export default async function PrivacyAppPage({
  params,
}: {
  params: Promise<{ appName: string }>
}) {
  const { appName } = await params
  const policy = getPrivacyPolicy(appName)
  if (!policy) notFound()

  const contactEmail = policy.contactEmail ?? company.email

  return (
    <>
      <PageHeader eyebrow="Privacy Policy" title={policy.appName}>
        <p className="text-small mt-4" style={{ color: 'var(--color-ink-muted)' }}>
          Last updated: {policy.lastUpdated}
        </p>
      </PageHeader>

      <Section role="body">
        <Container>
          <div className="prose max-w-3xl">
            {policy.statement.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
            <p>
              Contact:{' '}
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </p>
          </div>
        </Container>
      </Section>
    </>
  )
}
