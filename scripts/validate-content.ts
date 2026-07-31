#!/usr/bin/env ts-node
// Run via: npx ts-node scripts/validate-content.ts
// Wired into prebuild: "prebuild": "npx ts-node scripts/validate-content.ts"

import { services } from '../content/services';
import { segments } from '../content/segments';

const BANNED_WORDS = [
  'revolutionize', 'unlock', 'supercharge', 'game-changing', 'game changing',
  'cutting-edge', 'cutting edge', 'seamless', 'synergy', 'synergies',
  'empower', 'transformative', 'journey', 'elevate', 'harness', 'unleash',
  'next-level', 'next level', 'robust',
];

let errors: string[] = [];

function check(value: string, context: string) {
  for (const word of BANNED_WORDS) {
    if (value.toLowerCase().includes(word.toLowerCase())) {
      errors.push(`Banned word "${word}" found in ${context}`);
    }
  }
}

function checkStrings(obj: Record<string, unknown>, path: string) {
  for (const [key, val] of Object.entries(obj)) {
    if (typeof val === 'string') {
      check(val, `${path}.${key}`);
    } else if (Array.isArray(val)) {
      val.forEach((item, i) => {
        if (typeof item === 'string') check(item, `${path}.${key}[${i}]`);
        else if (typeof item === 'object' && item !== null) checkStrings(item as Record<string, unknown>, `${path}.${key}[${i}]`);
      });
    } else if (typeof val === 'object' && val !== null) {
      checkStrings(val as Record<string, unknown>, `${path}.${key}`);
    }
  }
}

// Validate services
const slugSet = new Set(services.map(s => s.slug));

for (const service of services) {
  const ctx = `services[${service.slug}]`;

  // Required fields
  if (!service.slug) errors.push(`${ctx}: missing slug`);
  if (!service.name) errors.push(`${ctx}: missing name`);
  if (!service.outcome) errors.push(`${ctx}: missing outcome`);
  if (!service.hours) errors.push(`${ctx}: missing hours`);
  if (!service.price) errors.push(`${ctx}: missing price`);
  if (!service.turnaround) errors.push(`${ctx}: missing turnaround`);
  if (!service.format) errors.push(`${ctx}: missing format`);
  if (!service.seo?.title) errors.push(`${ctx}: missing seo.title`);
  if (!service.seo?.description) errors.push(`${ctx}: missing seo.description`);

  // Related slugs must exist
  for (const rel of service.related) {
    if (!slugSet.has(rel)) errors.push(`${ctx}: related slug "${rel}" does not exist`);
  }

  // FAQ answers must be at least 40 chars
  for (const [i, item] of service.faq.entries()) {
    if (item.a.length < 40) errors.push(`${ctx}: faq[${i}] answer is too short (${item.a.length} chars)`);
  }

  // Payment mode consistency
  if (service.paymentMode === 'self-serve' && !service.paymentLink) {
    errors.push(`${ctx}: paymentMode is 'self-serve' but paymentLink is missing`);
  }
  if (service.paymentMode === 'call-first' && service.paymentLink) {
    errors.push(`${ctx}: paymentLink is set on a 'call-first' service - remove it or change paymentMode`);
  }

  // TODO_ tokens
  if (JSON.stringify(service).includes('TODO_')) {
    errors.push(`${ctx}: contains a TODO_ token - fill in or remove before launch`);
  }

  // Banned words
  checkStrings(service as unknown as Record<string, unknown>, ctx);
}

// Check company.ts for TODO_ tokens at build time
// (we import indirectly - the token check is in the content itself)
const { company } = require('../content/company');
if (company.kvk === 'TODO_KVK') {
  console.warn('⚠  WARNING: KvK number is still TODO_KVK - this blocks launch per §16 of the plan.');
}
if (company.email === 'TODO_EMAIL') {
  console.warn('⚠  WARNING: Contact email is still TODO_EMAIL - required for footer and JSON-LD.');
}

// Report
if (errors.length > 0) {
  console.error('\n❌  Content validation failed:\n');
  for (const err of errors) console.error(`  • ${err}`);
  console.error('');
  process.exit(1);
} else {
  console.log('✅  Content validation passed.');
}
