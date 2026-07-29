export interface FaqItem {
  q: string;
  a: string;
  category?: string;
}

export const generalFaq: FaqItem[] = [
  {
    q: 'How much does it cost to work with AIVI?',
    a: 'Engagements start at €75 for a student career roadmap and €140 for a one-hour working session. Most fixed-scope engagements are between €950 and €1,400. Every price is listed on our pricing page. There are no hidden fees — what you see is what you pay.',
    category: 'pricing',
  },
  {
    q: 'Is the 30-minute call really free?',
    a: 'Yes, with no obligation and no sales script. If we are not the right help for your situation, we will say so on the call. The call exists for you to describe your situation and for us to tell you honestly what we think.',
    category: 'general',
  },
  {
    q: 'How fast can you start?',
    a: 'Typically within a week of the call. For working sessions and the student roadmap, often within a few days. For code reviews and audits, we agree a start date on the call.',
    category: 'general',
  },
  {
    q: 'Do you work remotely?',
    a: 'Yes, globally. All engagements can be delivered remotely. On-site workshops are available in the Netherlands at the stated on-site rate.',
    category: 'general',
  },
  {
    q: 'Do I need to be technical to work with you?',
    a: 'No. Most of our founder clients are non-technical. We write reports in plain English with concrete next steps. Technical depth is available if you want it, but it is never the default.',
    category: 'general',
  },
  {
    q: 'What if I only need an hour?',
    a: 'Then buy an hour. A 60-minute working session at €140 is a real product here. It is, in fact, the cheapest way to find out whether we are useful to you.',
    category: 'pricing',
  },
  {
    q: 'How does billing work?',
    a: 'We invoice after the call, payable by bank transfer or a card payment link within 14 days. Retainers are billed monthly in advance. Anything under €500 is prepaid. A 50% deposit is required for engagements above €2,000.',
    category: 'billing',
  },
  {
    q: 'Do you add VAT?',
    a: 'Prices on this page exclude VAT. Dutch BTW is added for Netherlands clients and EU consumers. EU businesses with a valid VAT number are reverse-charged. Clients outside the EU are generally invoiced without Dutch VAT. Your invoice will state the applicable treatment.',
    category: 'billing',
  },
];

export const pricingFaq: FaqItem[] = [
  {
    q: 'Can I reschedule or cancel?',
    a: 'Free reschedule up to 24 hours before a session. Late cancellation (under 24 hours) is billed at 50% of the session cost.',
    category: 'billing',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'Bank transfer (SEPA and international), or a card payment link for credit and debit cards. iDEAL is available for Dutch clients. We do not ask for SEPA bank transfers from US clients — we send a card payment link instead.',
    category: 'billing',
  },
  ...generalFaq,
];
