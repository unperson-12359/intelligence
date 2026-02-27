---
name: add-entity
description: Add a new public figure to the Indelible platform with auto-research, data generation, and build verification.
---

# Add New Entity to Indelible Platform

You are adding the public figure **$ARGUMENTS** to the Indelible accountability platform.

This platform tracks what public figures SAY vs what they DO. Your job is to research this figure, create all required data entries, insert them into the codebase, and verify everything works.

## Phase 1: Research the Figure

Use web search to gather the following about **$ARGUMENTS**:

- Full name, official title/role, political party (if applicable), country
- Official website URL
- Twitter/X handle (with @ prefix)
- Wikipedia URL (**REQUIRED** — every figure must have one)
- **3 notable public statements**: promises, claims, positions, predictions, or denials they made publicly
- **2 notable actions**: votes, policies enacted, business decisions, executive orders — things they actually DID
- For each statement/action pair: what they SAID vs what they DID (the accountability verdict)

### Source URL rules:
- Prefer Wikipedia (most stable, never paywalled)
- Good alternatives: AP News, BBC, The Guardian, NPR, government sites, YouTube
- **NEVER** use paywalled sources (Reuters, NYTimes, WSJ, Congress.gov)
- **NEVER** use generic homepage URLs — every source must be a specific article/page
- Test reachability: `curl -s -o /dev/null -w "%{http_code}" "<url>"`

### Find a photo on Wikimedia Commons:
- Search `site:commons.wikimedia.org "<figure name>" portrait`
- Get a 400px thumbnail URL
- Fallback: `https://api.dicebear.com/9.x/initials/jpg?seed=<URL-encoded-Name>&size=400&backgroundColor=<hex>`

## Phase 2: Determine Next IDs

Read `src/lib/mock-data.ts` and find the highest existing IDs in each array. Increment by 1 for your new entries.

| Entity | ID Format | Example |
|--------|-----------|---------|
| Figure | `fig-###` | `fig-019` |
| Statement | `stmt-###` | `stmt-056` |
| Action | `act-###` | `act-042` |
| Accountability Record | `acc-###` | `acc-042` |
| Evidence Media | `em-##` | `em-19` |

**Current maximums** (update these by reading the file):
- Figures: up to `fig-018` (18 figures)
- Statements: up to `stmt-055` (55 statements)
- Actions: up to `act-041` (41 actions)
- Accountability Records: up to `acc-041` (41 records)
- Evidence Media: up to `em-18` (18 items)

## Phase 3: Generate Data

All fields must match existing code style: **single quotes, 2-space indentation, trailing commas**.

### 3a. Figure Entry

```typescript
{
  id: 'fig-XXX',
  slug: 'kebab-case-name',
  name: 'Full Name',
  title: 'Official Title / Role',
  type: '<type>',                     // politician | executive | influencer | journalist | activist | other
  party: 'Party Name',               // OPTIONAL — only for politicians with a party
  state: 'State/Province',           // OPTIONAL — only if relevant
  country: 'Country',                // REQUIRED
  imageUrl: '/images/figures/<slug>.webp',
  bio: '2-3 sentence factual, neutral biography.',
  overallScore: '<grade>',           // Calculate from accountability record scores
  isActive: true,
  topicIds: ['topic-XXX', ...],      // 3-5 topics from the reference list
  metadata: {
    officialWebsite: 'https://...',  // OPTIONAL
    socialMedia: { twitter: '@handle' }, // OPTIONAL
    wikipedia: 'https://en.wikipedia.org/wiki/...', // REQUIRED
  },
},
```

### 3b. Statements (3 minimum)

```typescript
{
  id: 'stmt-XXX',
  figureId: 'fig-XXX',
  type: '<type>',                    // promise | claim | position | prediction | denial | endorsement | other
  title: 'Headline under 80 chars',
  content: 'What was said. 2-3 sentences with specifics.',
  context: 'When/where said. Optional but recommended.',
  dateOccurred: 'YYYY-MM-DD',
  sourceUrl: 'https://...',
  sourceName: 'Source Name',
  sourceType: '<type>',              // news | government_record | press_release | podcast | interview | speech
  isVerified: true,
  aiConfidence: 0.XX,               // 0.85–0.98
},
```

### 3c. Actions (2 minimum)

```typescript
{
  id: 'act-XXX',
  figureId: 'fig-XXX',
  type: '<type>',                    // vote | executive_order | legislation_signed | legislation_vetoed | policy_enacted | business_decision | appointment | donation | other
  title: 'Headline under 80 chars',
  description: 'What they did. 2-3 sentences.',
  outcome: 'Result of the action. Optional.',
  dateOccurred: 'YYYY-MM-DD',
  sourceUrl: 'https://...',
  sourceName: 'Source Name',
  sourceType: '<type>',
  isVerified: true,
  aiConfidence: 0.XX,
},
```

### 3d. Accountability Records (2 minimum)

```typescript
{
  id: 'acc-XXX',
  figureId: 'fig-XXX',
  statementId: 'stmt-XXX',
  actionId: 'act-XXX',              // OPTIONAL — can be null if no direct action
  verdict: '<verdict>',              // kept | broken | partial | in_progress | flip_flop | context_needed
  score: XX,                         // -100 to +100
  summary: '2-3 sentences explaining the verdict.',
  evidence: 'Supporting details. Optional.',
  aiGenerated: true,
  isVerified: true,
  aiConfidence: 0.XX,
},
```

### 3e. Evidence Media (1 per accountability record)

```typescript
{
  id: 'em-XX',
  accountabilityRecordId: 'acc-XXX',
  type: 'screenshot',
  url: '/images/evidence/<descriptive-slug>.svg',
  thumbnailUrl: '/images/evidence/<descriptive-slug>.svg',
  caption: 'Brief description of evidence',
  sourceUrl: 'https://...',
  capturedAt: 'YYYY-MM-DD',
},
```

## Phase 4: Insert into mock-data.ts

Use the Edit tool to insert at the **END** of each array (before the closing `];`):

1. Figure → end of `mockFigures` array
2. Statements → end of `mockStatements` array
3. Actions → end of `mockActions` array
4. Accountability records → end of `mockAccountabilityRecords` array
5. Evidence media → end of `mockEvidenceMedia` array

**CRITICAL**: Insert before the closing `];`. Do NOT rewrite the entire file.

## Phase 5: Create Assets

1. **Download & convert photo**:
```bash
curl -sL "<wikimedia-url>" -o public/images/figures/<slug>.jpg
node -e "const sharp = require('sharp'); sharp('public/images/figures/<slug>.jpg').webp({quality:80}).toFile('public/images/figures/<slug>.webp').then(() => console.log('done'))"
rm public/images/figures/<slug>.jpg
```

2. **Generate evidence SVGs**:
```bash
node scripts/generate-evidence-cards.js
```

## Phase 6: Verify

1. `npm run build` — must pass with zero errors
2. Start dev server, navigate to `/figure/<slug>` and verify:
   - Figure header with name, title, photo, score badge
   - Metadata links (Website, Twitter, Wikipedia) visible
   - Accountability records with correct verdicts
   - Source links point to real pages
3. `node scripts/check-links.js` — no new broken URLs

## Phase 7: Report

Summarize what was added:
- Figure name, slug, overall score
- Number of statements, actions, accountability records
- Key verdicts (e.g., "2 broken, 1 partial")
- Confirmation that build passes and page renders correctly

---

## Reference Tables

### Topics
| ID | Name | Covers |
|----|------|--------|
| `topic-001` | Economy | Jobs, trade, taxation, fiscal policy |
| `topic-002` | Healthcare | Insurance, pharma, public health |
| `topic-003` | Environment | Climate, energy, conservation |
| `topic-004` | Education | Schools, student debt, funding |
| `topic-005` | Technology | AI, data privacy, tech regulation |
| `topic-006` | Foreign Policy | Diplomacy, defense, international relations |
| `topic-007` | Civil Rights | Voting, equality, justice reform |
| `topic-008` | Immigration | Border policy, refugees |
| `topic-009` | Labor | Workers' rights, unions, wages |
| `topic-010` | Housing | Affordability, zoning, homelessness |

### Verdict Scoring
| Verdict | Score Range | Meaning |
|---------|------------|---------|
| `kept` | +50 to +100 | Fully fulfilled |
| `partial` | +10 to +49 | Partially fulfilled |
| `in_progress` | 0 to +30 | Still ongoing |
| `broken` | -40 to -100 | Failed to deliver |
| `flip_flop` | -30 to -80 | Reversed position |
| `context_needed` | -10 to +10 | Insufficient evidence |

### Overall Grade Scale
| Grade | Score | Grade | Score |
|-------|-------|-------|-------|
| A+ | 90–100 | C+ | 30–39 |
| A | 80–89 | C | 20–29 |
| A- | 70–79 | C- | 10–19 |
| B+ | 60–69 | D+ | 0–9 |
| B | 50–59 | D | -10 to -1 |
| B- | 40–49 | D- | -20 to -11 |
| | | F | below -20 |

## Critical Rules

1. **Neutral tone** — Factual, non-partisan. No opinions.
2. **Real data only** — Every statement and action must be real and sourced. Never fabricate.
3. **SAY vs DO** — Every accountability record connects what was SAID to what was DONE.
4. **No duplicates** — Verify slug doesn't already exist in `mockFigures`.
5. **Minimums** — 3 statements + 2 actions + 2 accountability records + 2 evidence items.
6. **Build must pass** — Never leave the codebase broken.
