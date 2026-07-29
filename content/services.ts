export type Audience = 'students' | 'founders' | 'professionals' | 'teams';

export interface Service {
  slug: string;
  name: string;
  outcome: string;
  audiences: Audience[];
  weight: Partial<Record<Audience, 1 | 2 | 3>>;
  hours: string;
  price: string;
  priceNote?: string;
  turnaround: string;
  format: string;
  isThisYou: string[];
  whatWeDo: string[];
  whatYouGet: string[];
  whatThisIsNot: string[];
  howItRuns: { label: string; detail: string }[];
  faq: { q: string; a: string }[];
  related: string[];
  order: number;
  featured: boolean;
  paymentMode: 'call-first' | 'self-serve';
  paymentLink?: string;
  seo: { title: string; description: string };
}

export const services: Service[] = [
  {
    slug: 'code-architecture-review',
    name: 'Code & Architecture Review',
    outcome: 'A written report of what will break first — ranked, explained, and fixable.',
    audiences: ['founders', 'teams'],
    weight: { founders: 3, teams: 2 },
    hours: '8–10 hours',
    price: '€1,200',
    turnaround: 'Report within 5 working days',
    format: 'Remote · async + 60-min walkthrough call',
    isThisYou: [
      'You shipped it with AI tooling and it works — but you can\'t tell anyone whether it\'s safe.',
      'You have paying users and no idea what happens at 10× traffic.',
      'A developer quoted you €40k and you can\'t tell if that\'s fair.',
      'You know there are things wrong, you just don\'t know which ones will bite you first.',
      'You\'re about to raise a round and someone will ask about technical due diligence.',
    ],
    whatWeDo: [
      'Read the codebase and infrastructure end to end.',
      'Check authentication and authorization, secrets handling, and data storage.',
      'Assess personal-data exposure, third-party API key usage, and LLM cost and rate-limit exposure.',
      'Evaluate prompt-injection surface, error handling, backups, and dependency risk.',
      'Identify the two or three things that break first under 10× load.',
      'Offer a mutual NDA before any repo access, by default.',
    ],
    whatYouGet: [
      'A 10–20 page written review, findings ranked by what breaks first.',
      'Each finding with severity, plain-English explanation of the consequence, and a concrete fix.',
      'A 60-minute walkthrough call to discuss findings.',
      'A one-page executive summary you can hand to an investor or contractor.',
    ],
    whatThisIsNot: [
      'We do not rewrite your app in this engagement. If you want the fixes implemented, that is a separate Build Sprint.',
      'We do not provide a penetration test (active exploitation). This is a code and architecture review.',
      'We do not sign off on compliance (SOC 2, ISO 27001). We flag what matters to get there.',
    ],
    howItRuns: [
      { label: 'Day 1', detail: 'Book the free 30-minute call. We ask about your app, your users, and your biggest concerns.' },
      { label: 'Day 2', detail: 'We send a written scope and price confirmation. You reply to accept, and we agree on NDA and repo access.' },
      { label: 'Days 3–7', detail: 'We read the code. No interruptions — we come back with findings, not questions.' },
      { label: 'Day 8', detail: 'You receive the written report and the executive summary.' },
      { label: 'Day 9–10', detail: 'We hold the 60-minute walkthrough call on your schedule.' },
    ],
    faq: [
      {
        q: 'What do you need from me?',
        a: 'Read access to the repository, a short description of what the app does and who uses it, and access to hosting or config files if you can share them. We work with GitHub, GitLab, or a zip. An NDA is signed before any repo access.',
      },
      {
        q: 'Will you sign an NDA?',
        a: 'Yes, before we see any code. We offer a mutual NDA by default. Your code is not retained after the engagement and will never be used as a public example without your written permission.',
      },
      {
        q: 'Will you fix the problems you find?',
        a: 'Not in this engagement. The review tells you what is wrong and how to fix it. If you want the fixes implemented, that is a Build Sprint — a separate engagement we can scope on the same call.',
      },
      {
        q: 'My app was built mostly with AI tools. Is that a problem?',
        a: 'No, that is most of what we review. The review is about what breaks, not about how it was written. AI-assisted codebases have predictable patterns — we know what to look for.',
      },
      {
        q: 'How confidential is this?',
        a: 'Fully confidential. Mutual NDA before access, no code retained after delivery, no client work used as a public example without written permission. That is our default, not an add-on.',
      },
    ],
    related: ['build-sprint', 'working-session', 'advisory-retainer'],
    order: 1,
    featured: true,
    paymentMode: 'call-first',
    seo: {
      title: 'Code & Architecture Review — AIVI',
      description: 'An 8–10 hour review of your codebase, ranked by what will break first. Written report, walkthrough call, and executive summary. €1,200.',
    },
  },
  {
    slug: 'ai-workflow-audit',
    name: 'AI Workflow Audit',
    outcome: 'A ranked map of where AI saves your team real hours — and where it creates risk.',
    audiences: ['professionals', 'teams'],
    weight: { professionals: 3, teams: 3, founders: 1 },
    hours: '6–8 hours',
    price: '€950',
    turnaround: 'Deliverable within 5 working days',
    format: 'Remote · 90-min session + async analysis + 60-min handover',
    isThisYou: [
      'Your team is using AI tools but you\'re not sure if it\'s actually faster.',
      'You\'ve tried prompting guides and webinars and they haven\'t changed much.',
      'You suspect you\'re using 10% of what these tools can do.',
      'You want to know where AI genuinely helps and where it silently creates risk.',
      'You\'re a manager who needs to brief your team and you want something real, not a slide deck.',
    ],
    whatWeDo: [
      'Watch how the work actually gets done this week — documents, tools, handoffs, and repetitive steps.',
      'Map where an LLM genuinely saves hours and where it silently creates risk.',
      'Identify the specific recurring tasks that are the best candidates for automation.',
      'Flag the tasks where AI is the wrong tool and explain why.',
      'Build prompt templates for the team\'s actual recurring tasks during the session.',
    ],
    whatYouGet: [
      'A workflow map showing where time goes and where AI fits.',
      'A ranked list of automation candidates with estimated hours saved per week.',
      'Specific tools and prompts to use for each candidate.',
      'A "do not automate this" list with reasons.',
      'Any prompt templates or setup built during the audit.',
    ],
    whatThisIsNot: [
      'Not a software purchase recommendation dressed up as advice. We take no vendor commissions and say so.',
      'Not a generic prompting course. We work on your actual tasks.',
      'Not a report that tells you to replace your staff. We map where the tools save time and where they create risk.',
    ],
    howItRuns: [
      { label: 'Day 1', detail: 'Free 30-minute call. We learn your role, your tools, and what you\'re hoping to change.' },
      { label: 'Day 2', detail: 'Written scope confirmed. We schedule the 90-minute observation session.' },
      { label: 'Day 3–4', detail: '90-minute working session: you show us a real week of work, live.' },
      { label: 'Days 4–5', detail: 'We analyse and write the workflow map and ranked list.' },
      { label: 'Day 5', detail: '60-minute handover call. We walk through everything and build the first prompt templates together.' },
    ],
    faq: [
      {
        q: 'Is this a training course?',
        a: 'No. We do not teach you AI theory or run a prompting workshop. We work on your actual tasks in your actual tools. The output is a map and a list, not a certification.',
      },
      {
        q: 'Do you recommend specific tools?',
        a: 'Yes, and we take no commissions from any of them. We recommend what works for your workflow, not what we have a partnership with.',
      },
      {
        q: 'Will this tell me to replace my staff?',
        a: 'No. We map where tools save time and where they create risk. Staff replacement is not on the agenda.',
      },
      {
        q: 'Can you do this for a team, not just one person?',
        a: 'Yes. €950 covers one person or one team workflow. If you want two distinct workflows audited, we quote a second session at a reduced rate. Contact us to discuss.',
      },
    ],
    related: ['working-session', 'team-workshop', 'advisory-retainer'],
    order: 2,
    featured: true,
    paymentMode: 'call-first',
    seo: {
      title: 'AI Workflow Audit — AIVI',
      description: 'A 6–8 hour audit of your actual workflow. A ranked map of where AI saves real hours and where it creates risk. €950 for individuals and teams.',
    },
  },
  {
    slug: 'ai-career-roadmap',
    name: 'AI Career Roadmap',
    outcome: 'A one-page 90-day roadmap telling you exactly what to learn and build next.',
    audiences: ['students', 'professionals'],
    weight: { students: 3, professionals: 1 },
    hours: '45-min call + written roadmap',
    price: '€75',
    priceNote: 'student rate',
    turnaround: 'Roadmap within 3 working days',
    format: 'Remote · 45-min call + written document',
    isThisYou: [
      'You\'re studying or recently graduated and the AI job market looks nothing like what your programme prepared you for.',
      'You\'ve built things but you don\'t know how to make a hiring manager believe you built them.',
      'You\'re changing careers and need to know what the market actually wants, not what the internet says.',
      'You want to know what to learn in what order — not another list of courses.',
    ],
    whatWeDo: [
      'Give you an honest read of where you are and what the market is actually hiring for in your target role and region.',
      'Identify the specific skills and projects that will make you credible, not just impressive.',
      'Tell you what to build in the next 90 days and in what order.',
      'Explain how to present the work so a hiring manager believes you built it.',
    ],
    whatYouGet: [
      'A one-page 90-day roadmap.',
      'What to learn in what order.',
      'Two or three portfolio projects chosen to be credible rather than impressive.',
      'Guidance on how to present the work to hiring managers.',
      'Optional add-on: portfolio or project review, 1 hour, at the standard hourly rate (€140).',
    ],
    whatThisIsNot: [
      'Not a job placement service. We cannot get you a job.',
      'Not a course recommendation list. We tell you what to build, not what to watch.',
      'Not a LinkedIn optimization service.',
    ],
    howItRuns: [
      { label: 'Day 1', detail: 'Book the free 30-minute call and confirm your student status.' },
      { label: 'Day 2', detail: '45-minute call: where you are, where you want to go, what you\'ve built.' },
      { label: 'Day 3–5', detail: 'We write the roadmap.' },
      { label: 'Day 5', detail: 'You receive the one-page roadmap by email.' },
    ],
    faq: [
      {
        q: 'Do I qualify for the student rate?',
        a: 'The student rate of €75 applies if you are currently enrolled at a university or college, or if you graduated within the last 12 months. We ask for a brief confirmation — a student email address or a graduation date is fine.',
      },
      {
        q: 'Can you get me a job?',
        a: 'No. We can tell you honestly what the market is hiring for and what to build to be credible. Getting hired is your work. We give you the clearest possible map for that work.',
      },
      {
        q: 'What if I\'m not sure what role I want?',
        a: 'That is fine — bring the uncertainty to the call. Part of what we do is help you narrow down what is realistic and appealing given where you are. Come as you are.',
      },
    ],
    related: ['working-session', 'ai-workflow-audit'],
    order: 3,
    featured: false,
    paymentMode: 'call-first',
    seo: {
      title: 'AI Career Roadmap — AIVI',
      description: 'A 45-minute call and a one-page 90-day roadmap for students and recent graduates. €75 student rate. What to learn, what to build, and how to present it.',
    },
  },
  {
    slug: 'working-session',
    name: 'Working Session',
    outcome: 'Your actual problem, worked on together. Written notes and next steps within 24 hours.',
    audiences: ['founders', 'professionals', 'students', 'teams'],
    weight: { founders: 3, professionals: 3, students: 2, teams: 2 },
    hours: '60 minutes',
    price: '€140/hour',
    priceNote: '€375 for 3 hours',
    turnaround: 'Written notes within 24 hours',
    format: 'Remote · screen-share, recorded if you want',
    isThisYou: [
      'You have a real decision to make and you want a second opinion from someone who knows AI.',
      'You\'re stuck on a build and an hour of working through it together would unblock you.',
      'You want to know whether a tool or approach is right for your situation before you commit.',
      'You\'ve been using AI tools for a while and want to see how much faster you could be.',
    ],
    whatWeDo: [
      'Work on your actual problem, live, in one hour.',
      'Ask the right questions to understand your situation fully.',
      'Give you a direct, honest answer — including "don\'t do that" when that\'s the right answer.',
      'Demonstrate tools or approaches on-screen when it helps.',
    ],
    whatYouGet: [
      'One hour of focused work on your problem.',
      'Written notes and next steps within 24 hours.',
      'The recording, if requested.',
    ],
    whatThisIsNot: [
      'Not a scoping call that leads to a sales pitch. You bring a problem; we work on it.',
      'Not a 60-minute presentation. This is working time.',
    ],
    howItRuns: [
      { label: 'Step 1', detail: 'Book the free 30-minute call and describe what you want to work on.' },
      { label: 'Step 2', detail: 'We confirm the session and send a calendar invite with a video link.' },
      { label: 'Step 3', detail: '60-minute session. Screen share, record if you like.' },
      { label: 'Within 24h', detail: 'Written notes and next steps in your inbox.' },
    ],
    faq: [
      {
        q: 'Can I just buy an hour without the free call?',
        a: 'Yes. For a working session, the free call is optional — it helps us arrive prepared. If you\'d rather skip it, say so when you book and we\'ll note it.',
      },
      {
        q: 'What if we don\'t finish in an hour?',
        a: 'We will. One hour is a real unit of work. If the problem is bigger, we\'ll say so and scope a follow-up. We don\'t run over time without asking.',
      },
      {
        q: 'Can a small group join?',
        a: 'Yes. Up to three people on the call is fine at the standard rate. For larger teams, the Team Workshop is designed for that.',
      },
    ],
    related: ['code-architecture-review', 'ai-workflow-audit', 'build-sprint'],
    order: 4,
    featured: true,
    paymentMode: 'call-first',
    seo: {
      title: 'Working Session — AIVI',
      description: 'One hour on your actual problem, live. €140/hour or €375 for 3 hours. Written notes within 24 hours. The easiest way to find out whether we\'re useful.',
    },
  },
  {
    slug: 'build-sprint',
    name: 'Build Sprint',
    outcome: 'Working code in your repository, a README of what changed, and a handover call.',
    audiences: ['founders', 'teams'],
    weight: { founders: 2, teams: 2 },
    hours: '16 or 24 hours',
    price: '€2,200',
    priceNote: '2 days · €3,000 for 3 days',
    turnaround: 'Scheduled within 2 weeks of agreement',
    format: 'Remote · async implementation + handover call',
    isThisYou: [
      'You have a Code & Architecture Review report and want the top findings fixed.',
      'You need a working RAG prototype over your documents and you want it built, not scoped.',
      'You have an LLM feature that keeps failing in production and you want it evaluated properly.',
      'You need an internal automation wired end to end this week, not in three months.',
    ],
    whatWeDo: [
      'Implement the agreed target — working code, not a prototype.',
      'Write clean, documented code in your existing stack.',
      'Set up any infrastructure or tooling required.',
      'Stay in sync via a shared channel during the sprint.',
    ],
    whatYouGet: [
      'Working code committed to your repository.',
      'A short README explaining what changed and why.',
      'A handover call to walk you through everything.',
    ],
    whatThisIsNot: [
      'A sprint is fixed-length, not fixed-outcome. We agree the target before we start and report honestly on what landed.',
      'Not a discovery engagement. You should know what you want built before we start. If you don\'t, a Working Session first.',
      'Not ongoing support or retainer. For that, see the Advisory Retainer.',
    ],
    howItRuns: [
      { label: 'Day 1', detail: 'Free 30-minute call. We agree the target, the stack, and the success criteria.' },
      { label: 'Day 2', detail: 'Written scope confirmed. We agree a start date within 2 weeks.' },
      { label: 'Sprint days', detail: '2 or 3 focused days of implementation. Daily async updates via a shared channel.' },
      { label: 'Final day', detail: 'Code committed. README written.' },
      { label: '+1 day', detail: 'Handover call on your schedule.' },
    ],
    faq: [
      {
        q: 'What if you don\'t finish everything in the sprint?',
        a: 'We agree the target before we start and scope it to fit the time. We will report honestly on what landed. If something important didn\'t make it, we\'ll tell you why and scope a follow-up clearly.',
      },
      {
        q: 'Can I book a sprint without a prior review?',
        a: 'Yes. Many sprint clients come directly with a clear spec. If you\'re unsure whether the spec is clear enough, a Working Session first is the safest path.',
      },
    ],
    related: ['code-architecture-review', 'working-session', 'advisory-retainer'],
    order: 5,
    featured: false,
    paymentMode: 'call-first',
    seo: {
      title: 'Build Sprint — AIVI',
      description: 'Two or three focused days of implementation. Working code in your repo, a README, and a handover call. €2,200 for 2 days, €3,000 for 3 days.',
    },
  },
  {
    slug: 'advisory-retainer',
    name: 'Advisory Retainer',
    outcome: 'A senior AI person reachable every month, with a monthly call and async support.',
    audiences: ['founders', 'teams'],
    weight: { founders: 2, teams: 2 },
    hours: '4 hours/month',
    price: '€500/month',
    priceNote: 'cancel any time',
    turnaround: 'Monthly, ongoing',
    format: 'Remote · monthly call + async (email/Slack)',
    isThisYou: [
      'You\'re building something with AI and want a senior person to ask before you make expensive decisions.',
      'You want a monthly call to review what\'s changed and what to do next.',
      'You\'d rather pay for honest advice than discover the problem after it\'s happened.',
      'You don\'t need a full-time hire — you need someone reachable.',
    ],
    whatWeDo: [
      'Hold a monthly call to review your situation and what\'s changed.',
      'Answer async questions by email or Slack throughout the month.',
      'Tell you when something is a bad idea before you\'ve spent time on it.',
      'Write up monthly notes summarising what we discussed and what you decided.',
    ],
    whatYouGet: [
      'Four hours of access per month — a monthly call plus async questions.',
      'Monthly written notes.',
      'Honest "don\'t do that" advice before it costs you.',
    ],
    whatThisIsNot: [
      'Unused hours do not roll over to the next month.',
      'Not a development retainer. For building, see Build Sprint.',
      'Not a 24/7 on-call service. Async turnaround is within one working day.',
    ],
    howItRuns: [
      { label: 'Month 1, Week 1', detail: 'Onboarding call (60 minutes) to understand your context.' },
      { label: 'Each month', detail: 'A scheduled monthly call, async access throughout, written notes after.' },
      { label: 'Any month', detail: 'Cancel with no notice required — billed monthly in advance.' },
    ],
    faq: [
      {
        q: 'Can I cancel any time?',
        a: 'Yes. The retainer is billed monthly in advance. Cancel before the next billing date and nothing more is charged. No contracts, no minimums.',
      },
      {
        q: 'What counts as "async questions"?',
        a: 'Email or a shared Slack channel — your choice. We answer within one working day. Questions that need more than 30 minutes of work become a sprint item, and we\'ll tell you that when it happens.',
      },
    ],
    related: ['working-session', 'build-sprint', 'code-architecture-review'],
    order: 6,
    featured: false,
    paymentMode: 'call-first',
    seo: {
      title: 'Advisory Retainer — AIVI',
      description: 'Four hours per month: a monthly call and async access by email or Slack. €500/month, cancel any time. Senior AI advice when you need it.',
    },
  },
  {
    slug: 'team-workshop',
    name: 'Team Workshop',
    outcome: 'Your whole team at a shared baseline, with a written playbook and prompt templates for your real tasks.',
    audiences: ['teams', 'professionals'],
    weight: { teams: 3, professionals: 1 },
    hours: '3.5 hours',
    price: '€1,400',
    priceNote: '€1,900 on-site in NL · up to 25 people',
    turnaround: 'Scheduled within 2 weeks',
    format: 'Remote or on-site in the Netherlands',
    isThisYou: [
      'Your team is using AI tools inconsistently — some people swear by them, others don\'t use them at all.',
      'You want everyone at a shared baseline before the inconsistency becomes a quality problem.',
      'Your team\'s AI usage is ad hoc and you want a playbook.',
      'You\'re a manager who needs to brief the team and wants something hands-on, not a presentation.',
    ],
    whatWeDo: [
      'Run a hands-on half-day session using your team\'s own documents and tasks — not generic slide examples.',
      'Cover what these tools are actually good at, where they fail, and how to verify their output.',
      'Establish the data and confidentiality rules your team needs.',
      'Build prompt templates for the team\'s real recurring tasks during the session.',
    ],
    whatYouGet: [
      'The workshop session (3.5 hours, remote or on-site in the Netherlands).',
      'A written team playbook.',
      'Prompt templates for the team\'s real recurring tasks.',
    ],
    whatThisIsNot: [
      'Not a generic AI awareness training. We use your team\'s actual work.',
      'Not a certification programme.',
      'On-site delivery is available only in the Netherlands at the stated rate.',
    ],
    howItRuns: [
      { label: 'Week 1', detail: 'Free 30-minute call. We learn your team\'s work and what you want everyone to leave with.' },
      { label: 'Week 1–2', detail: 'We prepare the session using examples from your team\'s actual work.' },
      { label: 'Session day', detail: '3.5-hour hands-on workshop with your team.' },
      { label: 'Within 3 days', detail: 'Written playbook and prompt templates delivered.' },
    ],
    faq: [
      {
        q: 'Can you run this for more than 25 people?',
        a: 'For groups over 25, contact us. We can run two sessions or discuss a larger format, quoted separately.',
      },
      {
        q: 'Do you offer this in Dutch?',
        a: 'The default is English. Dutch delivery is possible — ask when you book.',
      },
    ],
    related: ['ai-workflow-audit', 'working-session', 'advisory-retainer'],
    order: 7,
    featured: false,
    paymentMode: 'call-first',
    seo: {
      title: 'Team Workshop — AIVI',
      description: 'A half-day hands-on workshop for teams of 5–25. A written playbook and prompt templates for your real tasks. €1,400 remote, €1,900 on-site in NL.',
    },
  },
  {
    slug: 'custom-project',
    name: 'Custom Project',
    outcome: 'A scoped, quoted, and delivered AI project for work that genuinely needs weeks or months.',
    audiences: ['founders', 'teams'],
    weight: { founders: 1, teams: 2 },
    hours: 'To be agreed',
    price: 'Custom quote',
    priceNote: 'after a paid discovery engagement',
    turnaround: 'Depends on scope',
    format: 'Remote, with on-site available in the Netherlands',
    isThisYou: [
      'You have a project that genuinely needs more than a few days of focused work.',
      'You want a partner who will tell you plainly if the scope is unrealistic.',
      'You\'ve been through discovery calls that went nowhere and want someone who will scope it clearly.',
    ],
    whatWeDo: [
      'Run a paid discovery engagement to scope the project honestly.',
      'Deliver a written specification and a fixed-price quote before any work begins.',
      'Tell you plainly if we are not the right team for the work.',
    ],
    whatYouGet: [
      'A written specification and quote after discovery.',
      'Delivery against that specification, with honest progress reporting.',
    ],
    whatThisIsNot: [
      'We take on a small number of custom projects. We will decline work that isn\'t a good fit.',
      'Not a consulting-by-the-hour engagement. Custom projects are scoped and fixed-priced.',
    ],
    howItRuns: [
      { label: 'Step 1', detail: 'Free 30-minute call to understand the project.' },
      { label: 'Step 2', detail: 'Paid discovery engagement to scope the work honestly.' },
      { label: 'Step 3', detail: 'Written specification and fixed-price quote.' },
      { label: 'Step 4', detail: 'You accept. Work begins.' },
    ],
    faq: [
      {
        q: 'How do I know if my project qualifies?',
        a: 'Book the free call and describe what you need. We will tell you on the call whether it is a good fit for us, and if not, we will suggest who might be better suited.',
      },
    ],
    related: ['code-architecture-review', 'build-sprint', 'advisory-retainer'],
    order: 8,
    featured: false,
    paymentMode: 'call-first',
    seo: {
      title: 'Custom Project — AIVI',
      description: 'AI consulting for work that needs weeks or months. Fixed-price quotes after a paid discovery. We take on a small number of projects and say so plainly.',
    },
  },
];

export const getService = (slug: string) => services.find(s => s.slug === slug);

export const servicesFor = (a: Audience) =>
  services
    .filter(s => s.audiences.includes(a))
    .sort((x, y) => (y.weight[a] ?? 0) - (x.weight[a] ?? 0));
