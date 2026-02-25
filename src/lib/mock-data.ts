import 'server-only';

// =============================================================================
// Mock Data for Intelligence Accountability Platform
// =============================================================================
// This file provides static seed data for UI development before the database
// is connected. All figures are real public persons and all statements/actions
// are based on verifiable public record.
// =============================================================================

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type MockFigure = {
  id: string;
  slug: string;
  name: string;
  title: string;
  type: 'politician' | 'executive' | 'influencer' | 'journalist' | 'activist' | 'other';
  party?: string;
  state?: string;
  country: string;
  imageUrl: string;
  bio: string;
  overallScore: string;
  isActive: boolean;
  metadata?: {
    socialMedia?: { twitter?: string };
    officialWebsite?: string;
    wikipedia?: string;
  };
};

export type MockStatement = {
  id: string;
  figureId: string;
  type: 'promise' | 'claim' | 'position' | 'prediction' | 'denial' | 'endorsement' | 'other';
  title: string;
  content: string;
  context: string;
  dateOccurred: string;
  sourceUrl: string;
  sourceName: string;
  sourceType: string;
  isVerified: boolean;
  aiConfidence: number;
};

export type MockAction = {
  id: string;
  figureId: string;
  type: 'vote' | 'executive_order' | 'legislation_signed' | 'legislation_vetoed' | 'policy_enacted' | 'business_decision' | 'appointment' | 'donation' | 'other';
  title: string;
  description: string;
  outcome: string;
  dateOccurred: string;
  sourceUrl: string;
  sourceName: string;
  isVerified: boolean;
  aiConfidence: number;
};

export type MockAccountabilityRecord = {
  id: string;
  figureId: string;
  statementId: string;
  actionId: string | null;
  verdict: 'kept' | 'broken' | 'partial' | 'in_progress' | 'flip_flop' | 'context_needed';
  score: number;
  summary: string;
  evidence: string;
  aiGenerated: boolean;
  isVerified: boolean;
  aiConfidence: number;
};

export type MockTopic = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

// ---------------------------------------------------------------------------
// Topics
// ---------------------------------------------------------------------------

export const mockTopics: MockTopic[] = [
  {
    id: 'topic-001',
    slug: 'economy',
    name: 'Economy',
    description: 'Economic policy, jobs, trade, taxation, and fiscal matters.',
  },
  {
    id: 'topic-002',
    slug: 'healthcare',
    name: 'Healthcare',
    description: 'Healthcare policy, insurance, pharmaceutical regulation, and public health.',
  },
  {
    id: 'topic-003',
    slug: 'environment',
    name: 'Environment',
    description: 'Climate change, energy policy, conservation, and environmental regulation.',
  },
  {
    id: 'topic-004',
    slug: 'education',
    name: 'Education',
    description: 'Education policy, student debt, school funding, and academic standards.',
  },
  {
    id: 'topic-005',
    slug: 'technology',
    name: 'Technology',
    description: 'Tech regulation, AI policy, data privacy, and digital infrastructure.',
  },
  {
    id: 'topic-006',
    slug: 'foreign-policy',
    name: 'Foreign Policy',
    description: 'International relations, diplomacy, defense, and global alliances.',
  },
  {
    id: 'topic-007',
    slug: 'civil-rights',
    name: 'Civil Rights',
    description: 'Voting rights, equality, justice reform, and individual liberties.',
  },
  {
    id: 'topic-008',
    slug: 'immigration',
    name: 'Immigration',
    description: 'Immigration policy, border security, refugee programs, and citizenship.',
  },
  {
    id: 'topic-009',
    slug: 'labor',
    name: 'Labor',
    description: 'Workers rights, union policy, minimum wage, and employment law.',
  },
  {
    id: 'topic-010',
    slug: 'housing',
    name: 'Housing',
    description: 'Housing affordability, zoning, homelessness, and urban development.',
  },
];

// ---------------------------------------------------------------------------
// Figures
// ---------------------------------------------------------------------------

export const mockFigures: MockFigure[] = [
  {
    id: 'fig-001',
    slug: 'bernie-sanders',
    name: 'Bernie Sanders',
    title: 'U.S. Senator from Vermont',
    type: 'politician',
    party: 'Independent',
    state: 'Vermont',
    country: 'US',
    imageUrl: '/images/figures/bernie-sanders.jpg',
    bio: 'Bernard Sanders is the senior United States senator from Vermont, serving since 2007. He is the longest-serving independent in U.S. congressional history and caucuses with the Democratic Party. He ran for president in 2016 and 2020.',
    overallScore: 'B',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@SenSanders' },
      officialWebsite: 'https://www.sanders.senate.gov/',
      wikipedia: 'https://en.wikipedia.org/wiki/Bernie_Sanders',
    },
  },
  {
    id: 'fig-002',
    slug: 'elon-musk',
    name: 'Elon Musk',
    title: 'CEO of Tesla and SpaceX',
    type: 'executive',
    country: 'US',
    imageUrl: '/images/figures/elon-musk.jpg',
    bio: 'Elon Musk is the CEO of Tesla, SpaceX, and owner of X (formerly Twitter). He is one of the wealthiest people in the world and a prominent figure in technology, space exploration, and social media.',
    overallScore: 'D',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@elonmusk' },
      officialWebsite: 'https://www.tesla.com/',
      wikipedia: 'https://en.wikipedia.org/wiki/Elon_Musk',
    },
  },
  {
    id: 'fig-003',
    slug: 'joe-rogan',
    name: 'Joe Rogan',
    title: 'Podcast Host and Commentator',
    type: 'influencer',
    country: 'US',
    imageUrl: '/images/figures/joe-rogan.jpg',
    bio: 'Joe Rogan is an American podcaster, UFC commentator, and comedian. He hosts The Joe Rogan Experience, one of the most popular podcasts in the world, featuring long-form interviews with public figures across politics, science, and culture.',
    overallScore: 'C',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@joerogan' },
      officialWebsite: 'https://www.joerogan.com/',
      wikipedia: 'https://en.wikipedia.org/wiki/Joe_Rogan',
    },
  },
  {
    id: 'fig-004',
    slug: 'ted-cruz',
    name: 'Ted Cruz',
    title: 'U.S. Senator from Texas',
    type: 'politician',
    party: 'Republican',
    state: 'Texas',
    country: 'US',
    imageUrl: '/images/figures/ted-cruz.jpg',
    bio: 'Rafael Edward Cruz is a United States senator from Texas, serving since 2013. He ran for the Republican presidential nomination in 2016 and is a prominent voice in conservative politics.',
    overallScore: 'C-',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@SenTedCruz' },
      officialWebsite: 'https://www.cruz.senate.gov/',
      wikipedia: 'https://en.wikipedia.org/wiki/Ted_Cruz',
    },
  },
  {
    id: 'fig-005',
    slug: 'bob-iger',
    name: 'Bob Iger',
    title: 'CEO of The Walt Disney Company',
    type: 'executive',
    country: 'US',
    imageUrl: '/images/figures/bob-iger.jpg',
    bio: 'Robert Allen Iger is an American businessman and the CEO of The Walt Disney Company. He previously served as CEO from 2005 to 2020, returned in November 2022, and has overseen major acquisitions including Pixar, Marvel, and Lucasfilm.',
    overallScore: 'B-',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@RobertIger' },
      officialWebsite: 'https://thewaltdisneycompany.com/',
      wikipedia: 'https://en.wikipedia.org/wiki/Bob_Iger',
    },
  },
  {
    id: 'fig-006',
    slug: 'volodymyr-zelenskyy',
    name: 'Volodymyr Zelenskyy',
    title: 'President of Ukraine',
    type: 'politician',
    party: 'Servant of the People',
    country: 'Ukraine',
    imageUrl: '/images/figures/volodymyr-zelenskyy.jpg',
    bio: 'Volodymyr Zelenskyy is the president of Ukraine, having taken office in May 2019. A former comedian and actor, he became a globally prominent wartime leader following Russia\'s full-scale invasion of Ukraine in February 2022.',
    overallScore: 'B+',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@ZelenskyyUa' },
      officialWebsite: 'https://www.president.gov.ua/en',
      wikipedia: 'https://en.wikipedia.org/wiki/Volodymyr_Zelenskyy',
    },
  },
  {
    id: 'fig-007',
    slug: 'tucker-carlson',
    name: 'Tucker Carlson',
    title: 'Political Commentator and Media Host',
    type: 'journalist',
    country: 'US',
    imageUrl: '/images/figures/tucker-carlson.jpg',
    bio: 'Tucker Carlson is an American political commentator and former Fox News host. He hosted Tucker Carlson Tonight from 2016 to 2023 and now produces content on X (formerly Twitter) and through his own media company.',
    overallScore: 'D+',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@TuckerCarlson' },
      wikipedia: 'https://en.wikipedia.org/wiki/Tucker_Carlson',
    },
  },
  {
    id: 'fig-008',
    slug: 'greta-thunberg',
    name: 'Greta Thunberg',
    title: 'Climate Activist',
    type: 'activist',
    country: 'Sweden',
    imageUrl: '/images/figures/greta-thunberg.jpg',
    bio: 'Greta Thunberg is a Swedish environmental activist who gained international prominence for her school strike for climate movement starting in 2018. She has addressed the United Nations and world leaders, demanding urgent action on climate change.',
    overallScore: 'B+',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@GretaThunberg' },
      wikipedia: 'https://en.wikipedia.org/wiki/Greta_Thunberg',
    },
  },

  // --- New World-Power Figures (fig-009 through fig-018) ---
  {
    id: 'fig-009',
    slug: 'donald-trump',
    name: 'Donald Trump',
    title: '47th President of the United States',
    type: 'politician',
    party: 'Republican',
    country: 'US',
    imageUrl: '/images/figures/donald-trump.jpg',
    bio: '45th and 47th President of the United States. Real estate mogul turned politician. Known for controversial statements and policy reversals.',
    overallScore: 'D-',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@realDonaldTrump' },
      officialWebsite: 'https://www.whitehouse.gov/',
      wikipedia: 'https://en.wikipedia.org/wiki/Donald_Trump',
    },
  },
  {
    id: 'fig-010',
    slug: 'xi-jinping',
    name: 'Xi Jinping',
    title: 'President of China, General Secretary of CCP',
    type: 'politician',
    country: 'China',
    imageUrl: '/images/figures/xi-jinping.jpg',
    bio: 'Leader of China since 2012. Consolidated power and removed presidential term limits. Oversaw significant economic growth, military modernization, and tightening of domestic controls.',
    overallScore: 'D',
    isActive: true,
    metadata: {
      wikipedia: 'https://en.wikipedia.org/wiki/Xi_Jinping',
    },
  },
  {
    id: 'fig-011',
    slug: 'vladimir-putin',
    name: 'Vladimir Putin',
    title: 'President of Russia',
    type: 'politician',
    country: 'Russia',
    imageUrl: '/images/figures/vladimir-putin.jpg',
    bio: 'President of Russia since 2000 (with brief PM stint 2008-2012). Ordered the full-scale invasion of Ukraine in February 2022, triggering the largest conflict in Europe since World War II.',
    overallScore: 'F',
    isActive: true,
    metadata: {
      wikipedia: 'https://en.wikipedia.org/wiki/Vladimir_Putin',
    },
  },
  {
    id: 'fig-012',
    slug: 'narendra-modi',
    name: 'Narendra Modi',
    title: 'Prime Minister of India',
    type: 'politician',
    party: 'BJP',
    country: 'India',
    imageUrl: '/images/figures/narendra-modi.jpg',
    bio: 'Prime Minister of India since 2014, serving a third consecutive term. Major economic reformer who launched initiatives like Make in India and Digital India.',
    overallScore: 'C+',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@naaborModi' },
      officialWebsite: 'https://www.pmindia.gov.in/',
      wikipedia: 'https://en.wikipedia.org/wiki/Narendra_Modi',
    },
  },
  {
    id: 'fig-013',
    slug: 'benjamin-netanyahu',
    name: 'Benjamin Netanyahu',
    title: 'Prime Minister of Israel',
    type: 'politician',
    party: 'Likud',
    country: 'Israel',
    imageUrl: '/images/figures/benjamin-netanyahu.jpg',
    bio: 'Longest-serving Prime Minister in Israel\'s history. Currently overseeing military operations in Gaza following the October 7, 2023 Hamas attack.',
    overallScore: 'D+',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@netanyahu' },
      wikipedia: 'https://en.wikipedia.org/wiki/Benjamin_Netanyahu',
    },
  },
  {
    id: 'fig-014',
    slug: 'mohammed-bin-salman',
    name: 'Mohammed bin Salman',
    title: 'Crown Prince and PM of Saudi Arabia',
    type: 'politician',
    country: 'Saudi Arabia',
    imageUrl: '/images/figures/mohammed-bin-salman.jpg',
    bio: 'De facto ruler of Saudi Arabia since 2017. Known for Vision 2030 economic modernization plan and controversy surrounding the Khashoggi killing.',
    overallScore: 'D',
    isActive: true,
    metadata: {
      wikipedia: 'https://en.wikipedia.org/wiki/Mohammed_bin_Salman',
    },
  },
  {
    id: 'fig-015',
    slug: 'mark-zuckerberg',
    name: 'Mark Zuckerberg',
    title: 'CEO of Meta',
    type: 'executive',
    country: 'US',
    imageUrl: '/images/figures/mark-zuckerberg.jpg',
    bio: 'Co-founder and CEO of Meta (formerly Facebook). Pivoted company toward the metaverse in 2021, then shifted focus to artificial intelligence.',
    overallScore: 'C-',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@faborberg' },
      officialWebsite: 'https://about.meta.com/',
      wikipedia: 'https://en.wikipedia.org/wiki/Mark_Zuckerberg',
    },
  },
  {
    id: 'fig-016',
    slug: 'jeff-bezos',
    name: 'Jeff Bezos',
    title: 'Founder of Amazon & Blue Origin',
    type: 'executive',
    country: 'US',
    imageUrl: '/images/figures/jeff-bezos.jpg',
    bio: 'Founded Amazon in 1994, built it into the world\'s largest online retailer. Owns The Washington Post and pursues space ventures through Blue Origin.',
    overallScore: 'C',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@JeffBezos' },
      officialWebsite: 'https://www.blueorigin.com/',
      wikipedia: 'https://en.wikipedia.org/wiki/Jeff_Bezos',
    },
  },
  {
    id: 'fig-017',
    slug: 'ursula-von-der-leyen',
    name: 'Ursula von der Leyen',
    title: 'President of the European Commission',
    type: 'politician',
    country: 'Germany',
    imageUrl: '/images/figures/ursula-von-der-leyen.jpg',
    bio: 'Leading the European Union since 2019. Oversaw the EU response to COVID-19, the Ukraine war, and the European Green Deal.',
    overallScore: 'B-',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@vaborleyen' },
      officialWebsite: 'https://ec.europa.eu/commission/commissioners/2019-2024/president_en',
      wikipedia: 'https://en.wikipedia.org/wiki/Ursula_von_der_Leyen',
    },
  },
  {
    id: 'fig-018',
    slug: 'recep-tayyip-erdogan',
    name: 'Recep Tayyip Erdogan',
    title: 'President of Turkey',
    type: 'politician',
    party: 'AKP',
    country: 'Turkey',
    imageUrl: '/images/figures/recep-tayyip-erdogan.jpg',
    bio: 'In power since 2003, first as Prime Minister then as President. Increasingly authoritarian governance amid recurring economic crises and currency devaluation.',
    overallScore: 'D+',
    isActive: true,
    metadata: {
      socialMedia: { twitter: '@RTErdogan' },
      wikipedia: 'https://en.wikipedia.org/wiki/Recep_Tayyip_Erdo%C4%9Fan',
    },
  },
];

// ---------------------------------------------------------------------------
// Statements (25 total across figures)
// ---------------------------------------------------------------------------

export const mockStatements: MockStatement[] = [
  // --- Bernie Sanders (fig-001) ---
  {
    id: 'stmt-001',
    figureId: 'fig-001',
    type: 'promise',
    title: 'Medicare for All as top legislative priority',
    content: 'Sanders pledged to make Medicare for All his top legislative priority, providing healthcare to every American as a right, not a privilege.',
    context: 'Repeated throughout 2020 presidential campaign and subsequent Senate advocacy.',
    dateOccurred: '2019-02-19',
    sourceUrl: 'https://www.congress.gov/bill/116th-congress/senate-bill/1129',
    sourceName: 'Congress.gov',
    sourceType: 'government_record',
    isVerified: true,
    aiConfidence: 0.95,
  },
  {
    id: 'stmt-002',
    figureId: 'fig-001',
    type: 'promise',
    title: 'Cancel all student loan debt',
    content: 'Sanders introduced legislation to cancel all $1.6 trillion of outstanding student loan debt in the United States.',
    context: 'Introduced as the College for All Act during the 2020 presidential campaign.',
    dateOccurred: '2019-06-24',
    sourceUrl: 'https://www.sanders.senate.gov/press-releases/news-sanders-introduces-college-for-all-act/',
    sourceName: 'Sanders Senate Office',
    sourceType: 'press_release',
    isVerified: true,
    aiConfidence: 0.97,
  },
  {
    id: 'stmt-003',
    figureId: 'fig-001',
    type: 'position',
    title: 'Opposition to corporate greed in pharmaceutical industry',
    content: 'Sanders has consistently argued that the pharmaceutical industry engages in price gouging and that the U.S. should allow Medicare to negotiate drug prices.',
    context: 'Long-standing position reiterated during Senate Budget Committee hearings.',
    dateOccurred: '2023-01-15',
    sourceUrl: 'https://www.sanders.senate.gov/press-releases/news-sanders-leads-hearing-on-outrageous-price-of-prescription-drugs-in-america/',
    sourceName: 'Senate Budget Committee',
    sourceType: 'government_record',
    isVerified: true,
    aiConfidence: 0.93,
  },

  // --- Elon Musk (fig-002) ---
  {
    id: 'stmt-004',
    figureId: 'fig-002',
    type: 'promise',
    title: 'Full self-driving capability by end of year',
    content: 'Musk stated Tesla vehicles would achieve full self-driving capability, repeatedly setting and missing year-end deadlines.',
    context: 'Musk has made repeated claims about FSD timelines since 2016. In 2019 he said there would be one million robotaxis on the road by 2020.',
    dateOccurred: '2019-04-22',
    sourceUrl: 'https://www.theverge.com/2019/4/22/18510828/tesla-elon-musk-autonomy-day-investor-event-robotaxi',
    sourceName: 'The Verge',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.98,
  },
  {
    id: 'stmt-005',
    figureId: 'fig-002',
    type: 'promise',
    title: 'Free speech absolutist approach to Twitter/X',
    content: 'Musk declared himself a free speech absolutist and stated he would restore free speech to the Twitter platform after acquiring it.',
    context: 'Stated during the acquisition process of Twitter in 2022.',
    dateOccurred: '2022-04-25',
    sourceUrl: 'https://www.bbc.com/news/technology-61172059',
    sourceName: 'BBC News',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.96,
  },
  {
    id: 'stmt-006',
    figureId: 'fig-002',
    type: 'prediction',
    title: 'SpaceX Starship to reach Mars by 2024',
    content: 'Musk predicted SpaceX would send an uncrewed Starship to Mars by 2024.',
    context: 'Made at the International Astronautical Congress in 2020.',
    dateOccurred: '2020-10-01',
    sourceUrl: 'https://www.space.com/spacex-starship-mars-launch-2024.html',
    sourceName: 'Space.com',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.94,
  },
  {
    id: 'stmt-007',
    figureId: 'fig-002',
    type: 'promise',
    title: 'Tesla Cybertruck production starting 2021',
    content: 'Musk announced the Cybertruck would enter production in late 2021 at the unveil event.',
    context: 'Cybertruck was unveiled in November 2019 with a promised late 2021 production start. Deliveries did not begin until November 2023.',
    dateOccurred: '2019-11-21',
    sourceUrl: 'https://www.reuters.com/business/autos-transportation/tesla-begins-cybertruck-deliveries-2023-11-30/',
    sourceName: 'Reuters',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.97,
  },

  // --- Joe Rogan (fig-003) ---
  {
    id: 'stmt-008',
    figureId: 'fig-003',
    type: 'claim',
    title: 'Claim that healthy young people do not need COVID vaccines',
    content: 'Rogan stated on his podcast that healthy young people should not get vaccinated against COVID-19.',
    context: 'Stated on The Joe Rogan Experience podcast episode, sparking widespread public health debate.',
    dateOccurred: '2021-04-23',
    sourceUrl: 'https://www.bbc.com/news/world-us-canada-56948719',
    sourceName: 'BBC News',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.95,
  },
  {
    id: 'stmt-009',
    figureId: 'fig-003',
    type: 'position',
    title: 'Commitment to hosting guests from all political perspectives',
    content: 'Rogan has repeatedly stated his podcast is open to guests from across the political spectrum and he is not aligned with any party.',
    context: 'Reiterated across multiple episodes and interviews about his show format.',
    dateOccurred: '2022-02-01',
    sourceUrl: 'https://www.bbc.com/news/entertainment-arts-60294785',
    sourceName: 'The Joe Rogan Experience',
    sourceType: 'podcast',
    isVerified: true,
    aiConfidence: 0.88,
  },
  {
    id: 'stmt-010',
    figureId: 'fig-003',
    type: 'endorsement',
    title: 'Endorsement of Robert F. Kennedy Jr. for president',
    content: 'Rogan publicly endorsed Robert F. Kennedy Jr. as a presidential candidate in August 2023.',
    context: 'Stated during a podcast episode featuring RFK Jr. as a guest.',
    dateOccurred: '2023-08-14',
    sourceUrl: 'https://www.bbc.com/news/world-us-canada-66510391',
    sourceName: 'BBC News',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.96,
  },

  // --- Ted Cruz (fig-004) ---
  {
    id: 'stmt-011',
    figureId: 'fig-004',
    type: 'promise',
    title: 'Repeal the Affordable Care Act',
    content: 'Cruz campaigned repeatedly on repealing the Affordable Care Act, calling it a disaster and pledging full repeal.',
    context: 'Central promise of his 2016 presidential campaign and ongoing Senate position.',
    dateOccurred: '2015-03-23',
    sourceUrl: 'https://www.congress.gov/bill/114th-congress/senate-bill/339',
    sourceName: 'Cruz Senate Office',
    sourceType: 'government_record',
    isVerified: true,
    aiConfidence: 0.95,
  },
  {
    id: 'stmt-012',
    figureId: 'fig-004',
    type: 'position',
    title: 'Strong support for Second Amendment rights',
    content: 'Cruz has consistently positioned himself as one of the strongest defenders of Second Amendment gun rights in the Senate.',
    context: 'Reiterated after the Uvalde school shooting in his home state of Texas in May 2022.',
    dateOccurred: '2022-05-25',
    sourceUrl: 'https://www.texastribune.org/2022/05/25/ted-cruz-uvalde-shooting/',
    sourceName: 'Texas Tribune',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.94,
  },
  {
    id: 'stmt-013',
    figureId: 'fig-004',
    type: 'claim',
    title: 'Cancun trip was to take daughters on a planned vacation',
    content: 'Cruz initially said his trip to Cancun during the February 2021 Texas power crisis was a pre-planned vacation for his daughters.',
    context: 'Cruz flew to Cancun while millions of Texans were without power during Winter Storm Uri. He later acknowledged it was a mistake.',
    dateOccurred: '2021-02-18',
    sourceUrl: 'https://www.nytimes.com/2021/02/18/us/politics/ted-cruz-storm-cancun.html',
    sourceName: 'The New York Times',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.97,
  },

  // --- Bob Iger (fig-005) ---
  {
    id: 'stmt-014',
    figureId: 'fig-005',
    type: 'promise',
    title: 'Disney+ will reach profitability by end of fiscal 2024',
    content: 'Iger stated that the Disney+ streaming service would reach profitability by the end of fiscal year 2024.',
    context: 'Made during Disney earnings calls after returning as CEO in November 2022.',
    dateOccurred: '2023-02-08',
    sourceUrl: 'https://www.reuters.com/business/media-telecom/disney-misses-streaming-subscriber-estimates-2023-02-08/',
    sourceName: 'Reuters',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.92,
  },
  {
    id: 'stmt-015',
    figureId: 'fig-005',
    type: 'promise',
    title: 'Cost-cutting plan to save $5.5 billion',
    content: 'Iger announced a restructuring plan to cut $5.5 billion in costs, including 7,000 job cuts across the company.',
    context: 'Announced in February 2023 as part of a major company restructuring upon his return as CEO.',
    dateOccurred: '2023-02-08',
    sourceUrl: 'https://www.cnbc.com/2023/02/08/disney-to-cut-7000-jobs-in-restructuring-plan.html',
    sourceName: 'CNBC',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.95,
  },
  {
    id: 'stmt-016',
    figureId: 'fig-005',
    type: 'position',
    title: 'Opposition to Florida Parental Rights in Education Act',
    content: 'Iger publicly opposed the Florida Parental Rights in Education Act, leading to a political and legal dispute between Disney and the state of Florida.',
    context: 'The dispute escalated through 2022-2023, with Florida dissolving Disney\'s special Reedy Creek Improvement District.',
    dateOccurred: '2022-03-28',
    sourceUrl: 'https://www.bbc.com/news/world-us-canada-65335098',
    sourceName: 'BBC News',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.93,
  },

  // --- Volodymyr Zelenskyy (fig-006) ---
  {
    id: 'stmt-017',
    figureId: 'fig-006',
    type: 'promise',
    title: 'End the war in Donbas and achieve peace',
    content: 'Zelenskyy campaigned on a promise to end the conflict in eastern Ukraine and negotiate peace with Russia.',
    context: '2019 presidential campaign platform. The situation escalated dramatically with Russia\'s full-scale invasion in February 2022.',
    dateOccurred: '2019-04-01',
    sourceUrl: 'https://www.bbc.com/news/world-europe-47984842',
    sourceName: 'BBC News',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.91,
  },
  {
    id: 'stmt-018',
    figureId: 'fig-006',
    type: 'position',
    title: 'Ukraine will not surrender territory to Russia',
    content: 'Zelenskyy has repeatedly stated that Ukraine will not cede any territory to Russia, including Crimea and the Donbas regions.',
    context: 'Stated consistently since Russia\'s full-scale invasion in February 2022.',
    dateOccurred: '2022-03-01',
    sourceUrl: 'https://www.reuters.com/world/europe/zelenskiy-says-ukraine-will-not-give-up-any-territory-2022-03-08/',
    sourceName: 'Reuters',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.96,
  },
  {
    id: 'stmt-019',
    figureId: 'fig-006',
    type: 'promise',
    title: 'Fight corruption and reform Ukrainian institutions',
    content: 'Zelenskyy pledged to root out corruption and reform government institutions to align with European standards.',
    context: 'A core campaign promise in 2019, later tied to Ukraine\'s EU membership application.',
    dateOccurred: '2019-04-15',
    sourceUrl: 'https://www.bbc.com/news/world-europe-48007487',
    sourceName: 'BBC News',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.89,
  },

  // --- Tucker Carlson (fig-007) ---
  {
    id: 'stmt-020',
    figureId: 'fig-007',
    type: 'claim',
    title: 'NSA was spying on his communications',
    content: 'Carlson claimed on his Fox News show that the NSA was monitoring his electronic communications and planned to leak them to take his show off the air.',
    context: 'Stated on Tucker Carlson Tonight in June 2021. The NSA issued a rare public statement denying it was targeting Carlson.',
    dateOccurred: '2021-06-28',
    sourceUrl: 'https://www.reuters.com/world/us/nsa-says-tucker-carlson-was-not-an-intelligence-target-2021-06-30/',
    sourceName: 'Reuters',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.94,
  },
  {
    id: 'stmt-021',
    figureId: 'fig-007',
    type: 'claim',
    title: 'January 6 was largely a peaceful protest',
    content: 'Carlson aired selectively edited Capitol security footage in March 2023 and characterized the January 6 Capitol breach as largely peaceful.',
    context: 'Aired on Fox News after receiving exclusive access to Capitol security footage from then-Speaker Kevin McCarthy.',
    dateOccurred: '2023-03-06',
    sourceUrl: 'https://www.bbc.com/news/world-us-canada-64874388',
    sourceName: 'BBC News',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.97,
  },
  {
    id: 'stmt-022',
    figureId: 'fig-007',
    type: 'denial',
    title: 'Denied being a supporter of Vladimir Putin',
    content: 'Carlson has denied being sympathetic to Putin or Russia, despite frequently questioning U.S. support for Ukraine and traveling to Moscow for an interview.',
    context: 'Ongoing denial contrasted with his February 2024 interview with Putin in Moscow.',
    dateOccurred: '2024-02-08',
    sourceUrl: 'https://www.bbc.com/news/world-europe-68246682',
    sourceName: 'BBC News',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.92,
  },

  // --- Greta Thunberg (fig-008) ---
  {
    id: 'stmt-023',
    figureId: 'fig-008',
    type: 'position',
    title: 'World leaders failing to meet Paris Agreement targets',
    content: 'Thunberg has consistently argued that world leaders are failing to meet their commitments under the Paris Agreement and are not doing enough to combat climate change.',
    context: 'Central to her activism since 2018, reiterated at COP26 in Glasgow in November 2021.',
    dateOccurred: '2021-11-01',
    sourceUrl: 'https://www.bbc.com/news/science-environment-59073498',
    sourceName: 'BBC News',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.95,
  },
  {
    id: 'stmt-024',
    figureId: 'fig-008',
    type: 'prediction',
    title: 'Climate tipping points will be crossed without immediate action',
    content: 'Thunberg warned that critical climate tipping points would be crossed within a decade if immediate, drastic action was not taken by global governments.',
    context: 'Stated at the World Economic Forum in Davos, January 2020.',
    dateOccurred: '2020-01-21',
    sourceUrl: 'https://www.bbc.com/news/science-environment-51179831',
    sourceName: 'BBC News',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.90,
  },
  {
    id: 'stmt-025',
    figureId: 'fig-008',
    type: 'position',
    title: 'Shift toward broader social justice activism',
    content: 'Thunberg expanded her activism beyond climate to include broader social justice causes, including solidarity with Palestine.',
    context: 'Became prominent in late 2023 and into 2024, drawing both support and criticism.',
    dateOccurred: '2023-10-20',
    sourceUrl: 'https://www.bbc.com/news/world-europe-67178864',
    sourceName: 'BBC News',
    sourceType: 'news',
    isVerified: true,
    aiConfidence: 0.91,
  },
];

// ---------------------------------------------------------------------------
// Actions (20 total across figures)
// ---------------------------------------------------------------------------

export const mockActions: MockAction[] = [
  // --- Bernie Sanders (fig-001) ---
  {
    id: 'act-001',
    figureId: 'fig-001',
    type: 'vote',
    title: 'Voted against the 2017 Tax Cuts and Jobs Act',
    description: 'Sanders voted against the Tax Cuts and Jobs Act of 2017, arguing it primarily benefited wealthy individuals and corporations.',
    outcome: 'The bill passed the Senate 51-48 along party lines without Sanders\' support.',
    dateOccurred: '2017-12-20',
    sourceUrl: 'https://www.congress.gov/bill/115th-congress/house-bill/1/actions',
    sourceName: 'Congress.gov',
    isVerified: true,
    aiConfidence: 0.98,
  },
  {
    id: 'act-002',
    figureId: 'fig-001',
    type: 'legislation_signed',
    title: 'Led Senate passage of Inflation Reduction Act drug pricing provisions',
    description: 'As Budget Committee chair, Sanders championed the Medicare drug price negotiation provisions included in the Inflation Reduction Act.',
    outcome: 'The Inflation Reduction Act was signed into law in August 2022, including provisions allowing Medicare to negotiate some drug prices.',
    dateOccurred: '2022-08-16',
    sourceUrl: 'https://www.congress.gov/bill/117th-congress/house-bill/5376',
    sourceName: 'Congress.gov',
    isVerified: true,
    aiConfidence: 0.94,
  },
  {
    id: 'act-003',
    figureId: 'fig-001',
    type: 'vote',
    title: 'Introduced Medicare for All Act of 2023',
    description: 'Sanders reintroduced the Medicare for All Act in the 118th Congress, continuing his multi-year push for single-payer healthcare.',
    outcome: 'The bill was introduced but did not advance to a floor vote.',
    dateOccurred: '2023-05-17',
    sourceUrl: 'https://www.congress.gov/bill/118th-congress/senate-bill/1655',
    sourceName: 'Congress.gov',
    isVerified: true,
    aiConfidence: 0.96,
  },

  // --- Elon Musk (fig-002) ---
  {
    id: 'act-004',
    figureId: 'fig-002',
    type: 'business_decision',
    title: 'Completed acquisition of Twitter for $44 billion',
    description: 'Musk completed the acquisition of Twitter in October 2022 and subsequently rebranded it to X.',
    outcome: 'Twitter was taken private, rebranded to X, and underwent massive layoffs reducing staff by approximately 80%.',
    dateOccurred: '2022-10-27',
    sourceUrl: 'https://www.reuters.com/technology/exclusive-twitter-set-accept-musks-best-final-offer-sources-2022-04-25/',
    sourceName: 'Reuters',
    isVerified: true,
    aiConfidence: 0.99,
  },
  {
    id: 'act-005',
    figureId: 'fig-002',
    type: 'business_decision',
    title: 'Reinstated previously banned accounts on X/Twitter',
    description: 'Musk reinstated numerous previously banned accounts on X, including accounts that had been suspended for policy violations.',
    outcome: 'Multiple high-profile accounts were restored, sparking debate about content moderation standards.',
    dateOccurred: '2022-11-24',
    sourceUrl: 'https://www.bbc.com/news/technology-63726767',
    sourceName: 'BBC News',
    isVerified: true,
    aiConfidence: 0.96,
  },
  {
    id: 'act-006',
    figureId: 'fig-002',
    type: 'business_decision',
    title: 'Suspended journalists accounts on X/Twitter',
    description: 'Musk suspended the accounts of several journalists from major outlets who had been reporting on him, citing doxxing policies.',
    outcome: 'Accounts of journalists from The New York Times, Washington Post, CNN, and others were temporarily suspended in December 2022.',
    dateOccurred: '2022-12-15',
    sourceUrl: 'https://www.bbc.com/news/technology-64005765',
    sourceName: 'BBC News',
    isVerified: true,
    aiConfidence: 0.97,
  },
  {
    id: 'act-007',
    figureId: 'fig-002',
    type: 'business_decision',
    title: 'Delayed Cybertruck deliveries by two years',
    description: 'Tesla Cybertruck deliveries began in November 2023, more than two years past the originally announced late-2021 production start.',
    outcome: 'First deliveries occurred at a special event in November 2023, with prices higher than originally announced.',
    dateOccurred: '2023-11-30',
    sourceUrl: 'https://www.reuters.com/business/autos-transportation/tesla-begins-cybertruck-deliveries-2023-11-30/',
    sourceName: 'Reuters',
    isVerified: true,
    aiConfidence: 0.98,
  },

  // --- Joe Rogan (fig-003) ---
  {
    id: 'act-008',
    figureId: 'fig-003',
    type: 'business_decision',
    title: 'Signed exclusive Spotify licensing deal',
    description: 'Rogan signed a multi-year exclusive licensing deal with Spotify reportedly worth up to $200 million in 2020, later renewed and expanded.',
    outcome: 'The podcast moved exclusively to Spotify in 2020, then expanded back to other platforms including YouTube in 2024.',
    dateOccurred: '2020-05-19',
    sourceUrl: 'https://www.wsj.com/articles/spotify-strikes-exclusive-podcast-deal-with-joe-rogan-11589913814',
    sourceName: 'The Wall Street Journal',
    isVerified: true,
    aiConfidence: 0.95,
  },
  {
    id: 'act-009',
    figureId: 'fig-003',
    type: 'other',
    title: 'Hosted both left- and right-wing political figures in 2024',
    description: 'Rogan hosted both Donald Trump and other political figures from across the spectrum during the 2024 election season.',
    outcome: 'The Trump episode became one of the most-viewed podcast episodes in history.',
    dateOccurred: '2024-10-25',
    sourceUrl: 'https://www.bbc.com/news/articles/cx2k0y29v97o',
    sourceName: 'BBC News',
    isVerified: true,
    aiConfidence: 0.96,
  },

  // --- Ted Cruz (fig-004) ---
  {
    id: 'act-010',
    figureId: 'fig-004',
    type: 'vote',
    title: 'Voted against the Bipartisan Safer Communities Act',
    description: 'Cruz voted against the bipartisan gun safety bill that passed in the wake of the Uvalde school shooting in his home state.',
    outcome: 'The bill passed the Senate 65-33 in June 2022 and was signed into law, despite Cruz\'s opposition.',
    dateOccurred: '2022-06-23',
    sourceUrl: 'https://www.congress.gov/bill/117th-congress/senate-bill/2938',
    sourceName: 'Congress.gov',
    isVerified: true,
    aiConfidence: 0.97,
  },
  {
    id: 'act-011',
    figureId: 'fig-004',
    type: 'other',
    title: 'Traveled to Cancun during Texas power crisis',
    description: 'Cruz traveled to Cancun, Mexico during the February 2021 winter storm that left millions of Texans without power and heat.',
    outcome: 'After public backlash, Cruz returned to Texas early and acknowledged the trip was a mistake.',
    dateOccurred: '2021-02-18',
    sourceUrl: 'https://www.nytimes.com/2021/02/18/us/politics/ted-cruz-storm-cancun.html',
    sourceName: 'The New York Times',
    isVerified: true,
    aiConfidence: 0.99,
  },
  {
    id: 'act-012',
    figureId: 'fig-004',
    type: 'vote',
    title: 'Voted to overturn 2020 presidential election results',
    description: 'Cruz objected to the certification of Arizona\'s Electoral College results on January 6, 2021.',
    outcome: 'The objection was overruled and the results were certified after the Capitol breach delayed proceedings.',
    dateOccurred: '2021-01-06',
    sourceUrl: 'https://www.texastribune.org/2021/01/06/ted-cruz-electoral-college/',
    sourceName: 'Texas Tribune',
    isVerified: true,
    aiConfidence: 0.98,
  },

  // --- Bob Iger (fig-005) ---
  {
    id: 'act-013',
    figureId: 'fig-005',
    type: 'business_decision',
    title: 'Implemented Disney company restructuring and layoffs',
    description: 'Iger announced and began executing a restructuring plan cutting approximately 7,000 jobs and $5.5 billion in costs.',
    outcome: 'The layoffs were executed throughout 2023 as part of a broader cost reduction initiative.',
    dateOccurred: '2023-03-01',
    sourceUrl: 'https://www.cnbc.com/2023/02/08/disney-to-cut-7000-jobs-in-restructuring-plan.html',
    sourceName: 'CNBC',
    isVerified: true,
    aiConfidence: 0.95,
  },
  {
    id: 'act-014',
    figureId: 'fig-005',
    type: 'business_decision',
    title: 'Disney+ streaming reached profitability',
    description: 'Disney\'s combined streaming business (Disney+, Hulu, ESPN+) reported its first operating profit in Q4 FY2024.',
    outcome: 'The streaming division reported a $321 million operating income for Q4 FY2024, ahead of projections.',
    dateOccurred: '2024-08-07',
    sourceUrl: 'https://www.reuters.com/business/media-telecom/walt-disney-beats-quarterly-revenue-estimates-2024-08-07/',
    sourceName: 'Reuters',
    isVerified: true,
    aiConfidence: 0.93,
  },

  // --- Zelenskyy (fig-006) ---
  {
    id: 'act-015',
    figureId: 'fig-006',
    type: 'policy_enacted',
    title: 'Signed Ukraine EU membership application',
    description: 'Zelenskyy signed Ukraine\'s formal application for European Union membership in February 2022, days after the Russian invasion began.',
    outcome: 'The EU granted Ukraine candidate status in June 2022 and opened accession negotiations in June 2024.',
    dateOccurred: '2022-02-28',
    sourceUrl: 'https://www.bbc.com/news/world-europe-61613538',
    sourceName: 'BBC News',
    isVerified: true,
    aiConfidence: 0.96,
  },
  {
    id: 'act-016',
    figureId: 'fig-006',
    type: 'policy_enacted',
    title: 'Dismissed multiple senior officials over corruption',
    description: 'Zelenskyy dismissed senior officials including regional governors and deputy ministers in a major anti-corruption push in January 2023.',
    outcome: 'Multiple high-ranking officials were removed from office in what was described as the biggest shake-up since the war began.',
    dateOccurred: '2023-01-24',
    sourceUrl: 'https://www.bbc.com/news/world-europe-64394549',
    sourceName: 'BBC News',
    isVerified: true,
    aiConfidence: 0.93,
  },

  // --- Tucker Carlson (fig-007) ---
  {
    id: 'act-017',
    figureId: 'fig-007',
    type: 'other',
    title: 'Aired selectively edited January 6 footage on Fox News',
    description: 'Carlson aired edited Capitol security camera footage from January 6, presenting a narrative that the event was largely peaceful.',
    outcome: 'The footage presentation was criticized by both Democrats and some Republicans, including Senate Minority Leader Mitch McConnell.',
    dateOccurred: '2023-03-06',
    sourceUrl: 'https://www.bbc.com/news/world-us-canada-64874388',
    sourceName: 'BBC News',
    isVerified: true,
    aiConfidence: 0.96,
  },
  {
    id: 'act-018',
    figureId: 'fig-007',
    type: 'other',
    title: 'Conducted interview with Vladimir Putin in Moscow',
    description: 'Carlson traveled to Moscow and conducted a two-hour interview with Russian President Vladimir Putin in February 2024.',
    outcome: 'The interview drew global attention and criticism from many Western commentators, while Carlson described it as journalism.',
    dateOccurred: '2024-02-08',
    sourceUrl: 'https://www.bbc.com/news/world-europe-68246682',
    sourceName: 'BBC News',
    isVerified: true,
    aiConfidence: 0.98,
  },

  // --- Greta Thunberg (fig-008) ---
  {
    id: 'act-019',
    figureId: 'fig-008',
    type: 'other',
    title: 'Addressed COP26 climate summit in Glasgow',
    description: 'Thunberg attended and spoke at COP26 in Glasgow, where she criticized world leaders for empty promises and described the conference as a failure.',
    outcome: 'Her presence and criticism attracted significant global media attention and amplified pressure on negotiators.',
    dateOccurred: '2021-11-05',
    sourceUrl: 'https://www.bbc.com/news/uk-scotland-glasgow-west-59165781',
    sourceName: 'BBC News',
    isVerified: true,
    aiConfidence: 0.95,
  },
  {
    id: 'act-020',
    figureId: 'fig-008',
    type: 'other',
    title: 'Arrested at climate protests in multiple countries',
    description: 'Thunberg was detained or arrested during climate protests in Germany and other countries, drawing attention to the climate movement.',
    outcome: 'The arrests generated global media coverage and reignited debate about civil disobedience in climate activism.',
    dateOccurred: '2023-01-17',
    sourceUrl: 'https://www.bbc.com/news/world-europe-64311676',
    sourceName: 'BBC News',
    isVerified: true,
    aiConfidence: 0.94,
  },
];

// ---------------------------------------------------------------------------
// Accountability Records (20 total)
// ---------------------------------------------------------------------------

export const mockAccountabilityRecords: MockAccountabilityRecord[] = [
  // --- Bernie Sanders ---
  {
    id: 'acc-001',
    figureId: 'fig-001',
    statementId: 'stmt-001',
    actionId: 'act-003',
    verdict: 'in_progress',
    score: 30,
    summary: 'Sanders continues to introduce and advocate for Medicare for All legislation, though the bill has not advanced to a floor vote. His consistent advocacy demonstrates commitment, but the policy goal remains unachieved.',
    evidence: 'Sanders reintroduced the Medicare for All Act in May 2023 (S.1655), continuing his years-long push. While not enacted, he successfully included Medicare drug price negotiation provisions in the Inflation Reduction Act of 2022.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.91,
  },
  {
    id: 'acc-002',
    figureId: 'fig-001',
    statementId: 'stmt-002',
    actionId: null,
    verdict: 'broken',
    score: -40,
    summary: 'Student loan debt has not been fully cancelled. While the Biden administration took partial steps on student loan forgiveness, Sanders\' goal of cancelling all $1.6 trillion in student debt was never enacted.',
    evidence: 'The Biden administration forgave over $160 billion in student loans for specific groups, but comprehensive legislation to cancel all student debt never passed Congress. Sanders\' College for All Act did not advance.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.88,
  },
  {
    id: 'acc-003',
    figureId: 'fig-001',
    statementId: 'stmt-003',
    actionId: 'act-002',
    verdict: 'partial',
    score: 45,
    summary: 'Sanders achieved a partial victory on drug pricing with the Inflation Reduction Act, which allows Medicare to negotiate prices for some drugs. However, the scope is much narrower than his original position advocated.',
    evidence: 'The Inflation Reduction Act allows Medicare to negotiate prices for 10 drugs initially, expanding over time. Sanders sought far broader negotiation authority covering all Medicare drugs.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.92,
  },

  // --- Elon Musk ---
  {
    id: 'acc-004',
    figureId: 'fig-002',
    statementId: 'stmt-004',
    actionId: null,
    verdict: 'broken',
    score: -70,
    summary: 'Full self-driving capability has not been achieved. Musk repeatedly set and missed deadlines for Tesla FSD. As of 2025, Tesla vehicles still require driver supervision and do not operate as autonomous robotaxis at scale.',
    evidence: 'Musk predicted one million robotaxis by 2020. Tesla FSD Beta (later renamed FSD Supervised) still requires an attentive driver behind the wheel. The feature remains in beta testing years after promised completion.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.96,
  },
  {
    id: 'acc-005',
    figureId: 'fig-002',
    statementId: 'stmt-005',
    actionId: 'act-006',
    verdict: 'flip_flop',
    score: -60,
    summary: 'Musk declared himself a free speech absolutist but suspended journalists\' accounts, restricted certain content, and imposed new moderation policies that contradicted his absolutist stance.',
    evidence: 'While Musk reinstated many previously banned accounts (act-005), he also suspended accounts of journalists from major outlets in December 2022 for covering his movements. Content moderation policies continued under X with various restrictions.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.94,
  },
  {
    id: 'acc-006',
    figureId: 'fig-002',
    statementId: 'stmt-006',
    actionId: null,
    verdict: 'broken',
    score: -80,
    summary: 'SpaceX did not send a Starship to Mars by 2024. The Starship rocket was still in test flight phases as of late 2024, with no Mars mission scheduled in the near term.',
    evidence: 'As of 2024, Starship had conducted several test flights from Boca Chica, Texas, but had not reached orbit on a planned trajectory for Mars. The Mars timeline has been pushed back significantly.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.97,
  },
  {
    id: 'acc-007',
    figureId: 'fig-002',
    statementId: 'stmt-007',
    actionId: 'act-007',
    verdict: 'broken',
    score: -50,
    summary: 'Cybertruck production was delayed by over two years and prices were significantly higher than originally announced at the 2019 unveil event.',
    evidence: 'Originally announced for late 2021 production start with a base price of $39,900, the Cybertruck did not begin deliveries until November 2023 with the lowest price near $61,000.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.97,
  },

  // --- Joe Rogan ---
  {
    id: 'acc-008',
    figureId: 'fig-003',
    statementId: 'stmt-008',
    actionId: null,
    verdict: 'context_needed',
    score: -30,
    summary: 'Rogan\'s claim that healthy young people do not need COVID vaccines contradicted CDC guidance and mainstream medical consensus at the time. He later clarified he is not a medical expert.',
    evidence: 'CDC recommended COVID vaccination for all eligible adults. Multiple studies showed vaccines reduced severe illness and transmission. Rogan later acknowledged he should not be a source of medical advice.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.87,
  },
  {
    id: 'acc-009',
    figureId: 'fig-003',
    statementId: 'stmt-009',
    actionId: 'act-009',
    verdict: 'partial',
    score: 25,
    summary: 'Rogan has hosted guests from a range of political backgrounds, though critics argue his guest selection and engagement style leans conservative. His 2024 hosting of Trump was a notable example of political access.',
    evidence: 'Rogan has hosted figures from Bernie Sanders to Ben Shapiro to Donald Trump. However, analysis of his guest list shows a heavier concentration of right-leaning commentators in recent years.',
    aiGenerated: true,
    isVerified: false,
    aiConfidence: 0.80,
  },
  {
    id: 'acc-010',
    figureId: 'fig-003',
    statementId: 'stmt-010',
    actionId: null,
    verdict: 'flip_flop',
    score: -20,
    summary: 'Rogan endorsed RFK Jr. but then appeared to shift his support toward Donald Trump during the 2024 presidential race, creating ambiguity about his political endorsements.',
    evidence: 'Rogan endorsed RFK Jr. in August 2023, but by October 2024 appeared supportive of Trump, hosting him on the podcast for a widely viewed episode shortly before the election.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.85,
  },

  // --- Ted Cruz ---
  {
    id: 'acc-011',
    figureId: 'fig-004',
    statementId: 'stmt-011',
    actionId: null,
    verdict: 'broken',
    score: -60,
    summary: 'The Affordable Care Act was never repealed. Despite years of promises and a Republican-controlled Congress in 2017-2018, full repeal efforts failed.',
    evidence: 'The ACA repeal effort failed in the Senate in July 2017, with John McCain casting the decisive vote against the "skinny repeal." The ACA remains law. The individual mandate penalty was reduced to $0 via the 2017 Tax Act, but the law itself was not repealed.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.96,
  },
  {
    id: 'acc-012',
    figureId: 'fig-004',
    statementId: 'stmt-012',
    actionId: 'act-010',
    verdict: 'kept',
    score: 70,
    summary: 'Cruz maintained his position against gun control legislation by voting against the Bipartisan Safer Communities Act, even after the Uvalde shooting in his home state.',
    evidence: 'Cruz voted no on S.2938, the Bipartisan Safer Communities Act, on June 23, 2022, consistent with his stated position on Second Amendment rights.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.97,
  },
  {
    id: 'acc-013',
    figureId: 'fig-004',
    statementId: 'stmt-013',
    actionId: 'act-011',
    verdict: 'flip_flop',
    score: -55,
    summary: 'Cruz initially characterized his Cancun trip as a planned vacation but later acknowledged it was a mistake, contradicting his original framing.',
    evidence: 'Cruz first told reporters the trip was planned for his daughters. Text messages later leaked showing his wife organizing the trip for friends. Cruz returned early and publicly called the trip a mistake.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.95,
  },

  // --- Bob Iger ---
  {
    id: 'acc-014',
    figureId: 'fig-005',
    statementId: 'stmt-014',
    actionId: 'act-014',
    verdict: 'kept',
    score: 75,
    summary: 'Disney+ combined streaming business reached profitability in Q4 FY2024, meeting Iger\'s commitment to achieve this milestone by the end of fiscal 2024.',
    evidence: 'Disney reported $321 million in operating income for its combined streaming business in Q4 FY2024 earnings, announced August 7, 2024.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.93,
  },
  {
    id: 'acc-015',
    figureId: 'fig-005',
    statementId: 'stmt-015',
    actionId: 'act-013',
    verdict: 'kept',
    score: 65,
    summary: 'Iger executed the announced cost-cutting plan, implementing approximately 7,000 layoffs and restructuring operations to achieve the targeted $5.5 billion in savings.',
    evidence: 'Disney confirmed throughout 2023 that it was on track to achieve its cost-cutting targets. The company reported significant improvement in operating margins across divisions.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.90,
  },

  // --- Zelenskyy ---
  {
    id: 'acc-016',
    figureId: 'fig-006',
    statementId: 'stmt-017',
    actionId: null,
    verdict: 'broken',
    score: -30,
    summary: 'Zelenskyy\'s campaign promise to end the war in Donbas was not achieved. Instead, the conflict escalated dramatically with Russia\'s full-scale invasion in February 2022. However, this failure is largely attributable to Russian aggression rather than Zelenskyy\'s actions.',
    evidence: 'Russia launched a full-scale invasion of Ukraine on February 24, 2022, representing a massive escalation beyond the existing Donbas conflict. Zelenskyy attempted negotiations in the early days of the war but they failed.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.86,
  },
  {
    id: 'acc-017',
    figureId: 'fig-006',
    statementId: 'stmt-019',
    actionId: 'act-016',
    verdict: 'partial',
    score: 40,
    summary: 'Zelenskyy has taken significant anti-corruption actions, including dismissing senior officials. However, corruption remains a systemic challenge in Ukraine despite measurable progress.',
    evidence: 'Major anti-corruption purges occurred in January 2023 and throughout the war. Ukraine improved in Transparency International rankings. However, defense procurement scandals and other issues continue to surface.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.85,
  },

  // --- Tucker Carlson ---
  {
    id: 'acc-018',
    figureId: 'fig-007',
    statementId: 'stmt-021',
    actionId: 'act-017',
    verdict: 'broken',
    score: -75,
    summary: 'Carlson\'s characterization of January 6 as largely peaceful was widely contradicted by video evidence, court proceedings, and testimony from law enforcement officers who were present.',
    evidence: 'Over 1,200 people have been charged in connection with the Capitol breach. Capitol Police officers testified about violent assaults. Even Republican Senate leaders criticized Carlson\'s selective editing of the footage.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.95,
  },
  {
    id: 'acc-019',
    figureId: 'fig-007',
    statementId: 'stmt-022',
    actionId: 'act-018',
    verdict: 'flip_flop',
    score: -50,
    summary: 'Carlson denied being sympathetic to Putin while traveling to Moscow for a lengthy interview that was widely viewed as providing Putin a largely unchallenged platform.',
    evidence: 'Carlson traveled to Moscow in February 2024 for a two-hour Putin interview, having previously questioned U.S. support for Ukraine on numerous occasions. The combination of his editorial positions and the interview contradicted his denials of Russia sympathy.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.90,
  },

  // --- Greta Thunberg ---
  {
    id: 'acc-020',
    figureId: 'fig-008',
    statementId: 'stmt-023',
    actionId: 'act-019',
    verdict: 'kept',
    score: 60,
    summary: 'Thunberg has consistently maintained her position that world leaders are failing to meet Paris Agreement targets, backing her statements with visible protest actions and high-profile appearances.',
    evidence: 'Thunberg\'s activism has remained consistent from her initial 2018 school strikes through COP26 attendance and ongoing climate protests. Her position has been supported by scientific assessments showing insufficient progress on Paris targets.',
    aiGenerated: true,
    isVerified: true,
    aiConfidence: 0.92,
  },
];

// ---------------------------------------------------------------------------
// Helper Functions
// ---------------------------------------------------------------------------

/**
 * Returns a figure by its URL slug, or undefined if not found.
 */
export function getFigureBySlug(slug: string): MockFigure | undefined {
  return mockFigures.find((f) => f.slug === slug);
}

/**
 * Returns all statements associated with a given figure ID.
 */
export function getStatementsForFigure(figureId: string): MockStatement[] {
  return mockStatements.filter((s) => s.figureId === figureId);
}

/**
 * Returns all actions associated with a given figure ID.
 */
export function getActionsForFigure(figureId: string): MockAction[] {
  return mockActions.filter((a) => a.figureId === figureId);
}

/**
 * Returns accountability records for a figure, enriched with linked statement
 * and (optionally) linked action data.
 */
export function getAccountabilityForFigure(figureId: string) {
  return mockAccountabilityRecords
    .filter((r) => r.figureId === figureId)
    .map((record) => ({
      ...record,
      statement: mockStatements.find((s) => s.id === record.statementId),
      action: record.actionId
        ? mockActions.find((a) => a.id === record.actionId)
        : null,
    }));
}

/**
 * Returns the top 5 trending contradictions -- accountability records with
 * a verdict of 'broken' or 'flip_flop', sorted by the most negative score.
 * Each result includes the linked figure and statement.
 */
export function getTrendingContradictions() {
  return mockAccountabilityRecords
    .filter((r) => r.verdict === 'broken' || r.verdict === 'flip_flop')
    .sort((a, b) => a.score - b.score)
    .slice(0, 5)
    .map((record) => ({
      ...record,
      figure: mockFigures.find((f) => f.id === record.figureId),
      statement: mockStatements.find((s) => s.id === record.statementId),
    }));
}

export type FigureStatsResult = {
  totalStatements: number;
  totalActions: number;
  keptCount: number;
  brokenCount: number;
  partialCount: number;
  flipFlopCount: number;
};

/**
 * Returns aggregate statistics for a figure: total statements, total actions,
 * and counts by verdict type.
 */
export function getFigureStats(figureId: string): FigureStatsResult {
  const records = mockAccountabilityRecords.filter(
    (r) => r.figureId === figureId,
  );

  return {
    totalStatements: mockStatements.filter((s) => s.figureId === figureId)
      .length,
    totalActions: mockActions.filter((a) => a.figureId === figureId).length,
    keptCount: records.filter((r) => r.verdict === 'kept').length,
    brokenCount: records.filter((r) => r.verdict === 'broken').length,
    partialCount: records.filter((r) => r.verdict === 'partial').length,
    flipFlopCount: records.filter((r) => r.verdict === 'flip_flop').length,
  };
}

const emptyStats: FigureStatsResult = {
  totalStatements: 0,
  totalActions: 0,
  keptCount: 0,
  brokenCount: 0,
  partialCount: 0,
  flipFlopCount: 0,
};

/**
 * Batch version of getFigureStats — computes stats for ALL figures in 3
 * single-pass iterations instead of 6N iterations.  Use this on list pages
 * (home, directory, search, scorecard) to avoid the N+1 query pattern.
 */
export function getAllFigureStats(): Map<string, FigureStatsResult> {
  const map = new Map<string, FigureStatsResult>();

  // Initialise every figure so callers always get a result
  for (const f of mockFigures) {
    map.set(f.id, { ...emptyStats });
  }

  // Single pass over statements
  for (const s of mockStatements) {
    const entry = map.get(s.figureId);
    if (entry) entry.totalStatements++;
  }

  // Single pass over actions
  for (const a of mockActions) {
    const entry = map.get(a.figureId);
    if (entry) entry.totalActions++;
  }

  // Single pass over accountability records
  for (const r of mockAccountabilityRecords) {
    const entry = map.get(r.figureId);
    if (entry) {
      switch (r.verdict) {
        case 'kept':
          entry.keptCount++;
          break;
        case 'broken':
          entry.brokenCount++;
          break;
        case 'partial':
          entry.partialCount++;
          break;
        case 'flip_flop':
          entry.flipFlopCount++;
          break;
      }
    }
  }

  return map;
}

// ---------------------------------------------------------------------------
// Evidence Media
// ---------------------------------------------------------------------------

export type MockEvidenceMedia = {
  id: string;
  accountabilityRecordId: string;
  type: 'screenshot' | 'document' | 'audio' | 'video';
  url: string;
  thumbnailUrl: string;
  caption: string;
  sourceUrl: string;
  capturedAt: string;
};

export const mockEvidenceMedia: MockEvidenceMedia[] = [
  // --- Original figures evidence ---
  {
    id: 'em-1',
    accountabilityRecordId: 'acc-001',
    type: 'screenshot',
    url: '/images/evidence/medicare-for-all-congress.svg',
    thumbnailUrl: '/images/evidence/medicare-for-all-congress.svg',
    caption: 'Screenshot of Medicare for All Act announcement on Congress.gov',
    sourceUrl: 'https://www.congress.gov/bill/118th-congress/senate-bill/1655',
    capturedAt: '2024-01-15',
  },
  {
    id: 'em-2',
    accountabilityRecordId: 'acc-002',
    type: 'document',
    url: '/images/evidence/college-for-all-act.svg',
    thumbnailUrl: '/images/evidence/college-for-all-act.svg',
    caption: 'College for All Act bill text showing student debt cancellation provisions',
    sourceUrl: 'https://www.congress.gov/bill/117th-congress/senate-bill/1288',
    capturedAt: '2023-08-22',
  },
  {
    id: 'em-3',
    accountabilityRecordId: 'acc-004',
    type: 'video',
    url: '/images/evidence/musk-robotaxi-promise.svg',
    thumbnailUrl: '/images/evidence/musk-robotaxi-promise.svg',
    caption: 'Elon Musk promising one million robotaxis by 2020 at Tesla Autonomy Day',
    sourceUrl: 'https://www.youtube.com/watch?v=Ucp0TTmvqOE',
    capturedAt: '2023-11-10',
  },
  {
    id: 'em-4',
    accountabilityRecordId: 'acc-005',
    type: 'screenshot',
    url: '/images/evidence/suspended-journalist-accounts.svg',
    thumbnailUrl: '/images/evidence/suspended-journalist-accounts.svg',
    caption: 'Screenshot of suspended journalist accounts on X (formerly Twitter)',
    sourceUrl: 'https://x.com',
    capturedAt: '2022-12-16',
  },
  {
    id: 'em-5',
    accountabilityRecordId: 'acc-007',
    type: 'screenshot',
    url: '/images/evidence/cybertruck-pricing.svg',
    thumbnailUrl: '/images/evidence/cybertruck-pricing.svg',
    caption: 'Cybertruck pricing page showing $61,000 base price vs original $39,900 announcement',
    sourceUrl: 'https://www.tesla.com/cybertruck',
    capturedAt: '2024-03-01',
  },
  {
    id: 'em-6',
    accountabilityRecordId: 'acc-008',
    type: 'audio',
    url: '/images/evidence/rogan-covid-vaccines.svg',
    thumbnailUrl: '/images/evidence/rogan-covid-vaccines.svg',
    caption: 'Joe Rogan podcast clip discussing COVID vaccines for young people',
    sourceUrl: 'https://open.spotify.com/show/4rOoJ6Egrf8K2IrywzwOMk',
    capturedAt: '2021-04-27',
  },
  {
    id: 'em-7',
    accountabilityRecordId: 'acc-012',
    type: 'screenshot',
    url: '/images/evidence/cruz-gun-vote.svg',
    thumbnailUrl: '/images/evidence/cruz-gun-vote.svg',
    caption: 'Senate roll call vote showing Cruz voting Nay on Bipartisan Safer Communities Act',
    sourceUrl: 'https://www.senate.gov/legislative/LIS/roll_call_votes/vote1172/vote_117_2_00234.htm',
    capturedAt: '2022-06-24',
  },
  {
    id: 'em-8',
    accountabilityRecordId: 'acc-018',
    type: 'video',
    url: '/images/evidence/capitol-security-footage.svg',
    thumbnailUrl: '/images/evidence/capitol-security-footage.svg',
    caption: 'Capitol security footage contradicting claims of peaceful January 6 protest',
    sourceUrl: 'https://www.c-span.org',
    capturedAt: '2023-03-08',
  },
  // --- New world-power figures evidence ---
  {
    id: 'em-9',
    accountabilityRecordId: 'acc-014',
    type: 'document',
    url: '/images/evidence/trump-border-wall-executive-order.svg',
    thumbnailUrl: '/images/evidence/trump-border-wall-executive-order.svg',
    caption: 'Executive order on border wall construction vs infrastructure spending records',
    sourceUrl: 'https://www.whitehouse.gov/presidential-actions/',
    capturedAt: '2025-01-20',
  },
  {
    id: 'em-10',
    accountabilityRecordId: 'acc-015',
    type: 'screenshot',
    url: '/images/evidence/xi-jinping-hong-kong-autonomy.svg',
    thumbnailUrl: '/images/evidence/xi-jinping-hong-kong-autonomy.svg',
    caption: "Xi Jinping's One Country Two Systems pledge vs National Security Law",
    sourceUrl: 'https://www.bbc.com/news/world-asia-china-52765838',
    capturedAt: '2023-06-30',
  },
  {
    id: 'em-11',
    accountabilityRecordId: 'acc-016',
    type: 'video',
    url: '/images/evidence/putin-ukraine-no-invasion.svg',
    thumbnailUrl: '/images/evidence/putin-ukraine-no-invasion.svg',
    caption: 'Putin denying plans to invade Ukraine weeks before February 2022 invasion',
    sourceUrl: 'https://www.youtube.com/watch?v=o9A-vfmjMiA',
    capturedAt: '2022-02-24',
  },
  {
    id: 'em-12',
    accountabilityRecordId: 'acc-017',
    type: 'screenshot',
    url: '/images/evidence/modi-farmer-protest-response.svg',
    thumbnailUrl: '/images/evidence/modi-farmer-protest-response.svg',
    caption: 'Farm laws repeal announcement after pledging agricultural reform',
    sourceUrl: 'https://www.reuters.com/world/india/indias-modi-says-farm-laws-will-be-repealed-2021-11-19/',
    capturedAt: '2021-11-19',
  },
  {
    id: 'em-13',
    accountabilityRecordId: 'acc-019',
    type: 'document',
    url: '/images/evidence/netanyahu-judicial-reform.svg',
    thumbnailUrl: '/images/evidence/netanyahu-judicial-reform.svg',
    caption: "Netanyahu's judicial overhaul legislation vs democratic governance pledges",
    sourceUrl: 'https://www.bbc.com/news/world-middle-east-66256461',
    capturedAt: '2023-07-24',
  },
  {
    id: 'em-14',
    accountabilityRecordId: 'acc-020',
    type: 'screenshot',
    url: '/images/evidence/mbs-khashoggi-accountability.svg',
    thumbnailUrl: '/images/evidence/mbs-khashoggi-accountability.svg',
    caption: 'UN investigation findings on Khashoggi killing vs MBS denial',
    sourceUrl: 'https://www.ohchr.org/en/press-releases/2021/02/khashoggi-killing-un-expert-says-saudi-crown-prince-should-be-investigated',
    capturedAt: '2021-02-26',
  },
  {
    id: 'em-15',
    accountabilityRecordId: 'acc-009',
    type: 'video',
    url: '/images/evidence/zuckerberg-privacy-hearing.svg',
    thumbnailUrl: '/images/evidence/zuckerberg-privacy-hearing.svg',
    caption: 'Zuckerberg congressional testimony on user privacy vs data practices',
    sourceUrl: 'https://www.youtube.com/watch?v=6ValJMOpt7s',
    capturedAt: '2024-01-31',
  },
  {
    id: 'em-16',
    accountabilityRecordId: 'acc-010',
    type: 'document',
    url: '/images/evidence/bezos-worker-conditions.svg',
    thumbnailUrl: '/images/evidence/bezos-worker-conditions.svg',
    caption: 'Amazon warehouse injury rate reports vs worker safety commitments',
    sourceUrl: 'https://www.reuters.com/business/retail-consumer/amazon-warehouse-injury-rates-higher-than-rivals-data-shows-2023-04-12/',
    capturedAt: '2023-04-12',
  },
  {
    id: 'em-17',
    accountabilityRecordId: 'acc-011',
    type: 'screenshot',
    url: '/images/evidence/von-der-leyen-climate-pledge.svg',
    thumbnailUrl: '/images/evidence/von-der-leyen-climate-pledge.svg',
    caption: 'EU Green Deal progress report vs original emission reduction targets',
    sourceUrl: 'https://ec.europa.eu/commission/presscorner/detail/en/ip_24_822',
    capturedAt: '2024-02-06',
  },
  {
    id: 'em-18',
    accountabilityRecordId: 'acc-013',
    type: 'screenshot',
    url: '/images/evidence/erdogan-press-freedom.svg',
    thumbnailUrl: '/images/evidence/erdogan-press-freedom.svg',
    caption: 'RSF press freedom index for Turkey vs Erdogan democracy pledges',
    sourceUrl: 'https://rsf.org/en/country/turkey',
    capturedAt: '2024-04-20',
  },
];

export function getEvidenceForRecord(recordId: string): MockEvidenceMedia[] {
  return mockEvidenceMedia.filter((e) => e.accountabilityRecordId === recordId);
}
