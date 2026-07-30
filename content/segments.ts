import type { Audience } from './services';

export interface Segment {
  slug: Audience;
  label: string;
  headline: string;
  subhead: string;
  cardLine: string;
  pains: string[];
  outcome: string;
  outcomeItems: string[];
  faq: { q: string; a: string }[];
  seo: { title: string; description: string };
}

export const segments: Segment[] = [
  {
    slug: 'teams',
    label: 'Small Teams & SMB Leaders',
    headline: "Your team is using AI tools. You want to know if it's working and what to do next.",
    subhead: "For 5–50 person teams and SMB leaders who need to know where AI helps, where it's a trap, what it costs, and what to do in the next quarter — without hiring a consultancy for six months.",
    cardLine: 'Teams — a shared baseline, a playbook, and a clear next step.',
    pains: [
      "Some team members use AI tools constantly; others don't touch them. The inconsistency is becoming a quality problem.",
      "You want to make a decision about AI tooling for your team but you don't know how to evaluate the options.",
      "You've had a security scare and you need a policy.",
      "You want to understand where AI fits in your roadmap without committing to a six-month engagement.",
      "You've been pitched by AI vendors and you want an independent view before you buy anything.",
    ],
    outcome: "Your team has a shared baseline, a written playbook, and a clear next step — in days, not months.",
    outcomeItems: [
      "A team workshop that gets everyone to a shared baseline using your actual work.",
      'A written team playbook with rules and tools for your specific context.',
      "Prompt templates for the team's real recurring tasks.",
      'An independent view of your AI tooling that takes no vendor commissions.',
    ],
    faq: [
      {
        q: 'How many people can join the workshop?',
        a: "The Team Workshop is designed for 5–25 people. For larger groups, contact us — we can run two sessions or discuss a larger format, quoted separately.",
      },
      {
        q: "We're not in the Netherlands. Can you deliver this remotely?",
        a: "Yes. The remote rate (€1,400) covers any location. On-site delivery at €1,900 is available in the Netherlands only.",
      },
      {
        q: "We're worried about data and confidentiality. How do you handle that?",
        a: "We work only with data you share deliberately, never access systems we're not invited into, and cover confidentiality rules in every workshop. We can sign a team-level NDA before the session.",
      },
    ],
    seo: {
      title: 'For Small Teams & SMB Leaders — AIVI',
      description: 'AI workshops and workflow audits for teams of 5–50. A shared baseline, a written playbook, and a clear next quarter. No six-month engagement.',
    },
  },
  {
    slug: 'founders',
    label: 'Solo Founders & Non-Technical Builders',
    headline: "You built it with AI. Now you need to know if it will hold.",
    subhead: "You have paying users, real data, and a product that works. The question is what happens next — at 10x the traffic, after a security incident, or when an investor asks about technical risk.",
    cardLine: "Founders — is your product safe, scalable, and investor-ready?",
    pains: [
      "You shipped it with AI tooling and it works — but you can't tell anyone whether it's actually safe.",
      "You have paying users and no idea what happens at 10x traffic.",
      'A developer quoted you €40k to "fix it properly" and you can\'t tell if that\'s fair.',
      "You're about to raise a round and someone will ask about technical due diligence.",
      "You can't evaluate a CTO hire because you don't know what to ask for.",
    ],
    outcome: "You get an honest, senior second opinion on your product — what is actually fine, what will break first, and what to do about it. In writing, in days.",
    outcomeItems: [
      'A code and architecture review ranking what will break first.',
      'Plain-English explanations of every finding and a concrete fix.',
      'An executive summary you can hand to an investor or contractor.',
      'Full confidentiality — NDA before any code access, nothing retained after delivery.',
    ],
    faq: [
      {
        q: 'Do you sign an NDA?',
        a: "Yes, before we see any code. We offer a mutual NDA by default. Your code is not retained after the engagement and will never be used as a public example without your written permission.",
      },
      {
        q: 'My app was built mostly with AI tools. Is that a problem?',
        a: "No, that is most of what we review. AI-assisted codebases have predictable patterns — we know what to look for. The review is about what breaks, not about how it was written.",
      },
      {
        q: "I'm not technical. Will I understand the report?",
        a: "Yes. The report is written for a non-technical reader. Every finding has a plain-English explanation of what it means and a concrete fix. The executive summary is one page.",
      },
      {
        q: 'What if I want the problems fixed, not just reported?',
        a: "The review tells you what is wrong and how to fix it. If you want the fixes implemented, that is a Build Sprint — a separate engagement we can scope on the same call.",
      },
    ],
    seo: {
      title: 'For Solo Founders & Non-Technical Builders — AIVI',
      description: 'Code and architecture reviews for vibe-coded products. Is your AI-built app safe and scalable? Written report in 5 working days. €1,200.',
    },
  },
  {
    slug: 'professionals',
    label: 'Professionals & Knowledge Workers',
    headline: "You're using AI tools every day. You're probably using 10% of what they can do.",
    subhead: "Lawyers, marketers, analysts, researchers, and ops managers using LLM tools — but using them in ways that are slower, riskier, or less effective than they could be.",
    cardLine: 'Professionals — make your actual workflow faster, not just different.',
    pains: [
      "You use ChatGPT or Copilot but you're not sure you're using it well.",
      "You've tried prompting guides and they haven't made a real difference.",
      'You spend hours on work that should take 30 minutes and you suspect AI could help — but which tool, and how.',
      "Your team is using AI inconsistently and it's affecting quality.",
      "You've seen AI hallucinate badly enough that you don't fully trust it, but you're not sure when to trust it.",
    ],
    outcome: "You know exactly where AI saves you real hours in your actual workflow — and where it creates risk. You leave with tools, prompts, and a ranked list of what to automate first.",
    outcomeItems: [
      'A workflow map showing where time goes and where AI fits.',
      'A ranked list of automation candidates with estimated hours saved per week.',
      'Specific tools and prompts for your actual recurring tasks.',
      'A "do not automate this" list with reasons — including where AI silently creates risk.',
    ],
    faq: [
      {
        q: 'Is this a training course?',
        a: "No. We do not teach you AI theory or run a generic prompting workshop. We work on your actual tasks in your actual tools. The output is a map and a ranked list, not a certificate.",
      },
      {
        q: 'Do you recommend specific tools?',
        a: "Yes, and we take no commissions from any of them. We recommend what works for your workflow and your security context, not what we have a partnership with.",
      },
      {
        q: "I'm in a regulated field (law, healthcare, finance). Can you help?",
        a: "Yes — and the 'do not automate this' list matters even more for you. We factor in the confidentiality and verification requirements of your field.",
      },
    ],
    seo: {
      title: 'For Professionals & Knowledge Workers — AIVI',
      description: 'An AI workflow audit for lawyers, marketers, analysts, and ops managers. Find out where AI saves real hours in your actual workflow. €950.',
    },
  },
  {
    slug: 'students',
    label: 'Students & Early-Career',
    headline: "You're entering a job market that changed while you were studying.",
    subhead: "The AI skills that hiring managers actually want are not what most programmes teach. We tell you what to build, in what order, and how to present it.",
    cardLine: 'Students & early-career — what to learn and build next.',
    pains: [
      "Your programme taught you theory, but job listings want things you've never seen before.",
      "You've built projects, but you don't know how to make a hiring manager believe you built them.",
      'Everyone tells you to "learn AI" but nobody tells you what that means for your specific target role.',
      "You're not sure whether to go deeper in your current field or pivot to something else.",
      "You've watched courses for months and still don't feel job-ready.",
    ],
    outcome: "In 90 days, you know exactly what to build, why it will be credible to a hiring manager, and how to present it. You stop guessing and start moving.",
    outcomeItems: [
      'A clear 90-day roadmap — what to learn in what order.',
      'Two or three portfolio projects chosen to be credible, not impressive.',
      'Guidance on how to present your work so a hiring manager believes you built it.',
      'An honest assessment of what the market is actually hiring for in your target role and region.',
    ],
    faq: [
      {
        q: 'Do I qualify for the student rate?',
        a: 'The student rate of €75 applies if you are currently enrolled at a university or college, or graduated within the last 12 months. A student email address or graduation date is all we need.',
      },
      {
        q: 'Can you get me a job?',
        a: "No. We can tell you honestly what the market is hiring for and what to build to be credible. Getting hired is your work. We give you the clearest possible map for that work.",
      },
      {
        q: "What if I'm not sure what role I want?",
        a: "Bring the uncertainty to the call. Part of what we do is help you narrow down what is realistic and appealing given where you are. You don't need to have it figured out first.",
      },
      {
        q: "I'm not a computer science student — can this help me?",
        a: 'Yes. AI is being used across fields — legal, marketing, research, operations, healthcare. Your roadmap will be specific to your background and target role.',
      },
    ],
    seo: {
      title: 'For Students & Early-Career — AIVI',
      description: 'An honest AI career roadmap for students and recent graduates. What to learn, what to build, and how to present it. €75 student rate.',
    },
  },
];

export const getSegment = (slug: string) => segments.find(s => s.slug === slug);
