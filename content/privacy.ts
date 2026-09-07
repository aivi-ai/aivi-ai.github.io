/**
 * Public privacy policies for apps published by AIVI AI Services.
 * Each entry renders at /privacy/<slug> (see app/privacy/[appName]).
 * Add a new app by appending an entry here - no other wiring needed.
 */
export interface AppPrivacyPolicy {
  /** URL slug, e.g. "burn-shred-trash" -> /privacy/burn-shred-trash */
  slug: string
  /** App display name, e.g. "Burn Shred Trash" */
  appName: string
  /** Human-readable date shown on the page, e.g. "September 2026" */
  lastUpdated: string
  /** Policy body paragraphs, rendered verbatim in order. */
  statement: string[]
  /** Optional meta description; defaults to the first statement paragraph. */
  description?: string
  /** Contact shown on the page; defaults to company.email (hello@weareaivi.com). */
  contactEmail?: string
}

export const privacyPolicies: AppPrivacyPolicy[] = [
  {
    slug: 'burn-shred-trash',
    appName: 'Burn Shred Trash',
    lastUpdated: 'September 2026',
    statement: [
      'Burn Shred Trash does not collect, store, transmit, or share any data. The app runs entirely on your device, requires no account, contains no analytics, no advertising, and makes no network connections. Nothing you see in the app ever leaves your device.',
    ],
  },
]

export function getPrivacyPolicy(slug: string): AppPrivacyPolicy | null {
  return privacyPolicies.find((p) => p.slug === slug) ?? null
}
