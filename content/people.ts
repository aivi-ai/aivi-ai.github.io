export interface Person {
  name: string;
  credential: string;
  link?: string;
  image?: string;
  location?: string;
  group: 'ai-expert';
  institutions?: string[];
}

export const people: Person[] = [
  {
    name: 'Bhargav Teja Nallapu',
    credential: 'PhD · Inria, France',
    link: 'https://www.linkedin.com/in/btnallapu/',
    location: 'Amsterdam, NL',
    group: 'ai-expert',
    institutions: ['Inria', 'TU Delft', 'Albert Einstein CoM', 'IIIT Hyderabad'],
  },
  {
    name: 'Pramod Kaushik',
    credential: 'ACL 2025 Best Paper · Cooperative AI Research Fellow',
    link: 'https://www.linkedin.com/in/pramod-kaushik-72341916/',
    location: 'Trento, Italy',
    group: 'ai-expert',
    institutions: ['Columbia University', 'Inria', 'Università di Trento', 'Cooperative AI Foundation'],
  },
  {
    name: 'Hari Teja Kalidindi',
    credential: 'PhD (Hons.) · Scuola Superiore Sant\'Anna',
    link: 'https://www.linkedin.com/in/hari-teja-kalidindi-40490271/',
    location: 'Nijmegen, NL',
    group: 'ai-expert',
    institutions: ['Scuola Superiore Sant\'Anna', 'Radboud University', 'UCLouvain', 'Human Brain Project'],
  },
];

export const aiExperts = people.filter(p => p.group === 'ai-expert');

// Collective capabilities of the AI Experts bench — deliberately not tied to any
// one person. Rendered as a shared checklist, not per-card taglines.
export const aiExpertCapabilities = [
  'Bootstrapped AI startups in New York, San Francisco & Amsterdam',
  'LLM safety & failure gaps surfaced before they cost you',
  'Deep ML in plain terms — what\'s real, what\'s hype',
  'Computational neuroscience & brain-inspired AI systems',
  'Robotics & motor control, from research to working systems',
  'Peer-reviewed, award-winning work (ACL 2025 Best Paper)',
];

// Union of every institution across the bench, de-duplicated, shown once for the
// whole section rather than repeated per person.
export const aiExpertInstitutions = Array.from(
  new Set(aiExperts.flatMap(p => p.institutions ?? [])),
);

// A generalized bench — Staff-level engineers whose current employment means
// they are represented by credential and company, never by name.
export const advisoryCompanies = [
  'Google',
  'Amazon',
  'Uber',
  'Twilio',
  'Delivery Hero',
  'Cisco',
  'Razorpay',
];
