// Dutch location pages: /nl/locaties/[city].
// Written as original copy per city (not translations of the English site)
// so Google sees unique Dutch content, not duplicate/mirror pages.

export interface Locatie {
  slug: string;
  name: string;
  provincie: string;
  intro: string;
  over: string[];
  sectoren: { label: string; detail: string }[];
  faq: { q: string; a: string }[];
}

export const locaties: Locatie[] = [
  {
    slug: 'amsterdam',
    name: 'Amsterdam',
    provincie: 'Noord-Holland',
    intro:
      'AI-consultancy vanuit Amsterdam: senior AI-experts die in uren werken, niet in maanden. Voor scale-ups, techbedrijven en organisaties in de hele regio.',
    over: [
      'AIVI is gevestigd op Science Park 608, midden in het Amsterdamse kennis- en tech-ecosysteem. We werken met founders en teams die AI al in hun product of organisatie hebben - of die de stap naar AI nu moeten maken, zonder maandenlange trajecten en zonder vendor-praat.',
      'Onze aanpak is bewust anders: vaste prijzen die op de pagina staan, een heldere scope per engagement, en oplevering in dagen in plaats van kwartalen. Voor Amsterdamse scale-ups betekent dat bijvoorbeeld een Code & Architecture Review voordat je de volgende financieringsronde ingaat, of een AI Workflow Audit voor teams van 5 tot 50 mensen die willen weten waar AI nu echt tijd oplevert.',
      'Gevestigd in Amsterdam, actief in de hele Randstad: ook voor bedrijven in Utrecht, Rotterdam en Den Haag werken we - remote-first, met een walkthrough-call aan het einde van elk traject.',
    ],
    sectoren: [
      {
        label: 'Tech & scale-ups',
        detail:
          'Startups en scale-ups in Amsterdam (Zuidas, Science Park, Noord) met een AI-ondersteund product: code review voordat investeerders meekijken, of een architectuur-check na een snelle groeifase.',
      },
      {
        label: 'Fintech & media',
        detail:
          'Bedrijven in de Amsterdamse fintech-, media- en creatieve industrie die AI-verwerking in hun dienstverlening hebben of willen bouwen.',
      },
      {
        label: 'Kennis & onderzoek',
        detail:
          'Instituten rond Science Park en de UvA/HvA die AI-capaciteit nodig hebben voor korte, gescoopte trajecten zonder langlopende verplichtingen.',
      },
    ],
    faq: [
      {
        q: 'Waar is AIVI gevestigd?',
        a: 'AIVI zit op Science Park 608 in Amsterdam-Oost, in het kennis-ecosysteem naast de UvA en het Science Park. Onze klanten zitten door heel de Randstad; we werken remote-first en plannen een walkthrough-call aan het einde van elk traject.',
      },
      {
        q: 'Voor welke bedrijven in Amsterdam is AIVI geschikt?',
        a: 'Vooral voor founders en teams die AI al gebruiken of serieus willen inzetten: scale-ups met een AI-ondersteund product, professionals en teams van 5-50 mensen die hun workflow willen laten auditen, en organisaties die een tweede paar senior ogen op hun codebase willen.',
      },
      {
        q: 'Wat kost AI-consultancy in Amsterdam?',
        a: 'De prijzen staan op de pagina en zijn vast: een Code & Architecture Review kost €1.200, een AI Workflow Audit €950 (beide excl. btw, 5 werkdagen), en losse werksessies €140 per uur. Het gratis kennismakingsgesprek van 30 minuten is echt gratis.',
      },
      {
        q: 'Komen jullie ook op locatie in Amsterdam?',
        a: 'We werken remote-first, maar zitten in Amsterdam en komen voor walkthroughs of werksessies op locatie als dat meerwaarde biedt. De review zelf is ongestoord: geen interrupties tijdens het traject.',
      },
    ],
  },
  {
    slug: 'utrecht',
    name: 'Utrecht',
    provincie: 'Utrecht',
    intro:
      'AI-consultancy voor de Utrechtse kenniseconomie: zorg en life sciences, publieke sector en logistiek. Senior AI-experts met vaste prijzen en oplevering in dagen.',
    over: [
      'Utrecht is de op één na grootste kenniseconomie van Nederland: de Universiteit Utrecht en het UMC Utrecht, het stationsgebied en Jaarbeurs, en een dicht netwerk van zorg- en IT-bedrijven. Voor die organisaties biedt AIVI iets wat in deze regio schaars is: senior AI-capaciteit zonder langlopend contract.',
      'Praktisch betekent dat: een AI Workflow Audit voor zorg- of dienstverlenende teams die willen weten waar automatisering echt tijd oplevert, een Code & Architecture Review voor productteams die op een solide basis verder willen bouwen, of een AI Career Roadmap voor studenten en starters die vanuit Utrecht de arbeidsmarkt opgaan.',
      'We werken remote-first met een walkthrough-call aan het einde van elk traject - ook voor Utrechtse klanten, of je nu in de binnenstad, op de Uithof of in een van de bedrijventerreinen zit.',
    ],
    sectoren: [
      {
        label: 'Zorg & life sciences',
        detail:
          'Organisaties rond het UMC Utrecht en de Utrechtse zorg- en life sciences-sector die AI-verwerking of -automatisering verantwoord willen inzetten, met oog voor privacy en wetgeving.',
      },
      {
        label: 'Publieke sector & onderwijs',
        detail:
          'Overheden, onderwijsinstellingen en semi-publieke organisaties die AI-projecten klein en controleerbaar willen houden: gescoopt, vastgeprijsd en zonder vendor-lock-in.',
      },
      {
        label: 'Logistiek & mobiliteit',
        detail:
          'Bedrijven rond de Utrechtse knooppunten (spoor, A12/A27, bedrijventerreinen) die processen rond planning en documentstromen willen automatiseren.',
      },
    ],
    faq: [
      {
        q: 'Werkt AIVI ook met zorg- en overheidsorganisaties in Utrecht?',
        a: 'Ja. We werken graag met organisaties die zorgvuldig moeten omgaan met data en wetgeving. Onze engagements zijn gescoopt en controleerbaar - geen black-box trajecten - en we beoordelen eerlijk of AI de juiste oplossing is.',
      },
      {
        q: 'Werken jullie op locatie in Utrecht?',
        a: 'We werken remote-first, maar komen voor walkthroughs en werksessies op locatie in de regio Utrecht als dat nodig is. Het traject zelf is ongestoord en levert binnen de afgesproken dagen op.',
      },
      {
        q: 'Wat kost AI-consultancy in Utrecht?',
        a: 'Vaste, gepubliceerde prijzen: €1.200 voor een Code & Architecture Review, €950 voor een AI Workflow Audit (beide excl. btw, 5 werkdagen), losse werksessies €140 per uur. Het kennismakingsgesprek van 30 minuten is gratis.',
      },
    ],
  },
  {
    slug: 'rotterdam',
    name: 'Rotterdam',
    provincie: 'Zuid-Holland',
    intro:
      'AI-consultancy voor Rotterdamse haven, logistiek, maritiem en maakindustrie. Vaste prijzen, senior expertise, oplevering in dagen - geen maandenlange trajecten.',
    over: [
      'Rotterdam is de motor van de Nederlandse logistiek: de haven, distributiecentra, maritieme dienstverlening en een sterke maakindustrie. Dat zijn precies de sectoren waar AI-verbetering snel tastbaar is - als iemand het klein en concreet durft te maken.',
      'AIVI doet dat met engagements die passen bij operationele organisaties: een AI Workflow Audit om documentstromen, planning en rapportage te automatiseren waar dat echt tijd oplevert, of een Code & Architecture Review voor bedrijven die AI-ondersteunde software intern of in producten hebben. Vaste prijs, vaste scope, oplevering in vijf werkdagen.',
      'Vanaf Rotterdam-Zuid tot het havengebied: we werken remote-first en plannen altijd een walkthrough-call aan het einde van het traject.',
    ],
    sectoren: [
      {
        label: 'Haven & logistiek',
        detail:
          'Bedrijven in en rond de Rotterdamse haven die processen rond documenten, planning, tracking en rapportage willen automatiseren - concreet en meetbaar.',
      },
      {
        label: 'Maritiem & energie',
        detail:
          'Maritieme dienstverlening en energiebedrijven die AI inzetten voor onderhoudsplanning, data-analyse of compliance-rapportage, zonder black-box oplossingen.',
      },
      {
        label: 'Maakindustrie',
        detail:
          'Productiebedrijven in de regio die willen weten waar AI nu écht tijd en kosten bespaart - met een eerlijke lijst van wat je níet moet automatiseren.',
      },
    ],
    faq: [
      {
        q: 'Kan AIVI helpen met AI in de Rotterdamse haven en logistiek?',
        a: 'Ja. Logistieke organisaties hebben vaak veel te winnen bij het automatiseren van document- en planningsprocessen. Een AI Workflow Audit brengt in kaart waar automatisering rendeert - en waar niet - met een ranked lijst als resultaat.',
      },
      {
        q: 'Werken jullie ook met productie- en maakindustrie?',
        a: 'Ja. Voor de maakindustrie geldt: eerst een eerlijke audit van wat AI kan doen, dan pas bouwen. We leveren een ranked automatiseringslijst met do-not-automate-items, zodat je niet investeert in de verkeerde dingen.',
      },
      {
        q: 'Wat kost AI-consultancy in Rotterdam?',
        a: 'Vaste prijzen op de pagina: €1.200 voor een Code & Architecture Review, €950 voor een AI Workflow Audit (excl. btw, 5 werkdagen), losse werksessies €140 per uur. Het gratis kennismakingsgesprek van 30 minuten is echt gratis.',
      },
    ],
  },
  {
    slug: 'den-haag',
    name: 'Den Haag',
    provincie: 'Zuid-Holland',
    intro:
      'AI-consultancy voor Den Haag: overheid, juridische dienstverlening, cybersecurity en internationale organisaties. Controleerbaar, gescoopt en vastgeprijsd.',
    over: [
      'Den Haag is de stad van de overheid, de rechtspraak, internationale organisaties en een groeiende cybersecurity-sector. Die organisaties stellen terecht hoge eisen aan AI: controleerbaarheid, privacy en wetgeving staan voorop. Precies daarom werkt AIVI met kleine, gescoopte engagements in plaats van black-box trajecten.',
      'Een AI Workflow Audit helpt juridische en zakelijke dienstverleners om document- en kennisdeling te automatiseren zonder kwaliteitsverlies; een Code & Architecture Review geeft teams die AI-ondersteunde software bouwen een eerlijke tweede mening vóór een volgende release of aanbesteding. Alles vastgeprijsd, oplevering in vijf werkdagen.',
      'Van het centrum tot aan Ypenburg en de internationale zone: we werken remote-first en sluiten elk traject af met een walkthrough-call.',
    ],
    sectoren: [
      {
        label: 'Overheid & semi-publiek',
        detail:
          'Organisaties die AI verantwoord en controleerbaar willen inzetten, met oog voor AVG, proportionaliteit en uitlegbaarheid - klein gescoopt in plaats van groot en vaag.',
      },
      {
        label: 'Juridische & zakelijke dienstverlening',
        detail:
          'Advocatenkantoren, consultants en dienstverleners die documentwerk en kennisdeling willen automatiseren zonder in te leveren op kwaliteit.',
      },
      {
        label: 'Cybersecurity & internationaal',
        detail:
          'Security- en internationale organisaties in de regio die AI-capaciteit nodig hebben voor korte, gescoopte trajecten met strenge eisen aan data-verwerking.',
      },
    ],
    faq: [
      {
        q: 'Werkt AIVI met overheidsorganisaties?',
        a: 'Ja. We werken met organisaties die zorgvuldig met data en wetgeving om moeten gaan. Onze engagements zijn klein, gescoopt en controleerbaar, en we zeggen eerlijk wanneer AI níet de juiste oplossing is.',
      },
      {
        q: 'Is AIVI AVG-proof?',
        a: 'Onze aanpak is ontworpen rond minimale data: we werken met wat jij deelt, slaan geen onnodige gegevens op en adviseren per geval over wetgeving. Voor verwerking van persoonsgegevens geldt altijd: eerst de audit, dan pas bouwen.',
      },
      {
        q: 'Wat kost AI-consultancy in Den Haag?',
        a: 'Vaste prijzen op de pagina: €1.200 voor een Code & Architecture Review, €950 voor een AI Workflow Audit (excl. btw, 5 werkdagen), losse werksessies €140 per uur. Het gratis kennismakingsgesprek van 30 minuten is echt gratis.',
      },
    ],
  },
];

export const getLocatie = (slug: string) => locaties.find(l => l.slug === slug);
