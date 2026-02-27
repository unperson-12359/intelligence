// =============================================================================
// Blog Data Layer for Indelible Accountability Platform
// =============================================================================
// Static blog posts for SEO and content marketing. Each article drives traffic
// to the platform and educates visitors on accountability tracking.
// =============================================================================

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  author: string;
  publishedAt: string;
  readingTime: string;
  category: string;
  tags: string[];
  content: string; // HTML string
  relatedFigureSlugs: string[];
}

export const blogPosts: BlogPost[] = [
  // -------------------------------------------------------------------------
  // Article 1: Why Politicians Get Away With Broken Promises
  // -------------------------------------------------------------------------
  {
    slug: "why-politicians-get-away-with-broken-promises",
    title: "Why Politicians Get Away With Broken Promises",
    description:
      "How the long timeframe between promises and outcomes lets politicians break their word without consequence, and what you can do about it.",
    author: "Indelible Team",
    publishedAt: "2025-01-15",
    readingTime: "6 min read",
    category: "Accountability",
    tags: [
      "broken promises",
      "accountability",
      "election cycles",
      "political memory",
    ],
    relatedFigureSlugs: ["ted-cruz", "elon-musk"],
    content: `
<h2>The Four-Year Amnesia Machine</h2>

<p>Every election cycle follows the same pattern. A candidate stands on stage, looks into the camera, and makes a bold promise. Lower taxes. Better healthcare. More jobs. The crowd cheers. The media covers it for 48 hours. Then everyone moves on.</p>

<p>Four years later, that same candidate is back on stage, making the same promises. Nobody asks what happened to the last set of commitments. The audience has largely forgotten. The journalist asking questions has moved to a different beat. The original clip is buried under millions of hours of new content.</p>

<p>This is not an accident. It is a feature of how modern politics works, and it is the single biggest reason politicians get away with breaking their word.</p>

<h2>Why the Timeframe Is the Problem</h2>

<p>Human memory is not designed for four-year accountability cycles. Research in cognitive psychology shows that our recall of specific claims degrades sharply after just a few weeks. By the time an election rolls around again, voters are operating on vague impressions rather than concrete memories of what was promised.</p>

<p>Consider a senator who promises during their campaign to introduce legislation capping insulin prices at $35. The promise gets moderate coverage. Two years in, a watered-down version passes committee but stalls on the floor. By year four, the senator claims credit for "fighting for lower drug costs" without ever having delivered the specific cap they promised. Most voters will accept this framing because they cannot recall the original, specific commitment.</p>

<p>This is what we call "promise amnesia" &#8212; the systematic exploitation of the gap between when a promise is made and when it should be evaluated.</p>

<h3>The News Cycle Completes the Cover</h3>

<p>Modern news moves at a relentless pace. A broken promise from 2021 cannot compete for attention with a fresh controversy in 2024. Media organizations, driven by engagement metrics, have little incentive to revisit old commitments when new stories generate more clicks.</p>

<p>Politicians understand this intuitively. They know that making a bold promise today carries almost zero risk of future accountability. The cost of breaking a promise is negligible because the infrastructure to track and surface broken promises simply has not existed at scale.</p>

<h2>Real-World Examples of Promise Amnesia</h2>

<p>This pattern repeats across the political spectrum. A leader pledges to eliminate the national debt, then oversees its largest increase. A governor promises to fully fund public schools, then signs a budget with education cuts. A mayor commits to police reform, then quietly increases the department budget by 15%.</p>

<p>In the corporate world, the same dynamic plays out. Leaders like <a href="/figure/elon-musk">Elon Musk</a> have made repeated public predictions and promises &#8212; full self-driving capability, Mars missions, product timelines &#8212; that consistently fail to materialize on schedule. Yet each new promise receives the same enthusiastic coverage, with little reference to the track record of previous commitments.</p>

<p>Politicians like <a href="/figure/ted-cruz">Ted Cruz</a> shift positions over years, and without a permanent record linking past statements to current actions, the shifts go largely unchallenged in day-to-day coverage.</p>

<h2>The Three Mechanisms of Escape</h2>

<p>Politicians rely on three core mechanisms to avoid accountability for broken promises:</p>

<ul>
<li><strong>Time decay:</strong> The longer between promise and evaluation, the weaker the voter's memory of the specific commitment.</li>
<li><strong>Reframing:</strong> Instead of admitting a promise was broken, they redefine what was promised. "I said I'd fight for healthcare reform" replaces "I said I'd pass universal coverage."</li>
<li><strong>Distraction:</strong> New crises, controversies, and commitments push old promises out of the public conversation. There is always something more urgent to talk about.</li>
</ul>

<h2>What It Would Take to Change This</h2>

<p>The solution is not expecting voters to have perfect memory. That is unrealistic. The solution is building systems that remember on behalf of the public.</p>

<p>This is exactly why the <a href="/">Indelible platform</a> exists. By creating a permanent, searchable record that matches what leaders <em>say</em> against what they <em>do</em>, the platform removes the advantage that time gives to promise-breakers.</p>

<p>When a politician makes a promise, it gets recorded. When they take an action that contradicts that promise, the contradiction is surfaced. When election season arrives, voters can look up any leader and see their full track record in seconds, not rely on vague recollections from years ago.</p>

<h3>Why This Matters More Than Ever</h3>

<p>In an era of information overload, the ability to break promises without consequence has never been greater. The sheer volume of daily news means that even major contradictions can disappear from public awareness within days.</p>

<p>But the tools to fight back are also better than ever. AI can process and match statements to actions at a scale that was impossible even five years ago. Community-driven platforms can verify and surface contradictions faster than any single newsroom.</p>

<p>The four-year amnesia machine only works if we let it. Persistent, accessible accountability records are the antidote. The question is not whether politicians will keep breaking promises. They will. The question is whether we will finally have the tools to make sure everyone knows about it.</p>

<p>Start by looking up <a href="/directory">any leader in the Indelible directory</a>. See what they promised. See what they did. Decide for yourself whether they earned your trust.</p>
`,
  },

  // -------------------------------------------------------------------------
  // Article 2: How to Hold Your Representatives Accountable
  // -------------------------------------------------------------------------
  {
    slug: "how-to-hold-your-representatives-accountable",
    title: "How to Hold Your Representatives Accountable",
    description:
      "A practical, step-by-step guide to tracking what your elected officials promise versus what they actually deliver.",
    author: "Indelible Team",
    publishedAt: "2025-01-22",
    readingTime: "5 min read",
    category: "Guide",
    tags: [
      "accountability",
      "civic engagement",
      "how-to",
      "representatives",
      "activism",
    ],
    relatedFigureSlugs: ["bernie-sanders", "ted-cruz"],
    content: `
<h2>You Have More Power Than You Think</h2>

<p>Most people feel powerless when it comes to holding politicians accountable. They vote every few years, maybe follow the news, and hope for the best. But accountability does not happen by accident. It happens when citizens actively track, compare, and share what their leaders promised versus what they delivered.</p>

<p>This guide breaks the process down into four concrete steps that anyone can follow, regardless of political affiliation or experience.</p>

<h2>Step 1: Know What They Promised</h2>

<p>The foundation of accountability is a clear record of commitments. Before you can hold someone accountable, you need to know exactly what they said they would do.</p>

<p>Start with your own representatives. What did your senator, governor, or congressperson promise during their last campaign? What positions did they take on issues that matter to you?</p>

<p>Most people cannot answer these questions off the top of their head, and that is normal. Campaign seasons are intense but brief, and specific promises get lost in the noise of rallies, debates, and attack ads.</p>

<p>This is where tools matter. The <a href="/search">Indelible search</a> lets you look up any tracked public figure and see a chronological list of their recorded statements &#8212; promises, claims, positions, and predictions. Each entry includes the date, source, and exact wording.</p>

<p>For figures like <a href="/figure/bernie-sanders">Bernie Sanders</a>, who has decades of public statements, the platform provides a structured way to see how positions have evolved or remained consistent over time.</p>

<h3>Tips for Tracking Promises</h3>

<ul>
<li>Focus on specific, measurable commitments ("I will introduce a $15 minimum wage bill") rather than vague aspirations ("I believe in fair wages").</li>
<li>Note the date and context. A promise made during a primary may differ from one made in a general election.</li>
<li>Save the source. A direct quote with a link is far more powerful than a paraphrase from memory.</li>
</ul>

<h2>Step 2: Track What They Actually Did</h2>

<p>Promises are only half the equation. The other half is action. What legislation did they introduce, vote for, or vote against? What executive orders did they sign? What policies did they implement or block?</p>

<p>Official records &#8212; congressional voting records, executive orders, agency directives &#8212; are public information. But they are often difficult to navigate and even harder to connect to specific campaign promises.</p>

<p>The Indelible platform bridges this gap by linking recorded statements directly to documented actions. When a leader makes a promise and then takes a contradictory action, the platform surfaces the contradiction automatically.</p>

<h2>Step 3: Compare and Evaluate</h2>

<p>With both the promise and the action recorded, you can make an informed judgment. Did they follow through? Did they partially deliver? Did they do the exact opposite of what they said?</p>

<p>This is where the <a href="/scorecard">Indelible Scorecard</a> becomes useful. Every tracked figure receives a grade based on the alignment between their words and their actions. An "A" means strong follow-through. An "F" means consistent contradiction.</p>

<p>But the grade is just a starting point. The real value is in the detail. Click into any figure's profile to see exactly which promises were kept, which were broken, and the evidence supporting each assessment.</p>

<p>For example, comparing the records of leaders like <a href="/figure/bernie-sanders">Bernie Sanders</a> and <a href="/figure/ted-cruz">Ted Cruz</a> on the same issue reveals not just different positions, but different levels of follow-through on their stated commitments.</p>

<h2>Step 4: Share With Your Network</h2>

<p>Individual awareness is valuable, but collective awareness creates pressure. When you find a significant contradiction between what a leader promised and what they did, share it.</p>

<p>Accountability scales when information flows. A single person knowing about a broken promise changes nothing. A thousand people sharing that information with their networks can shift a news cycle, influence an election, or force a public response.</p>

<ul>
<li>Share specific Indelible profile links with friends and family before elections.</li>
<li>Reference tracked contradictions in letters to editors or social media posts.</li>
<li>When someone makes a claim about a politician, check it against the record and share the evidence either way.</li>
</ul>

<h2>Go Further: Contribute to the Record</h2>

<p>The Indelible platform is community-powered. If you find a promise or action that is not yet tracked, you can <a href="/contribute">submit it for review</a>. Every contribution makes the record more complete and the accountability more comprehensive.</p>

<p>It takes about two minutes to submit a statement or action with its source. Submissions go through a verification process to ensure accuracy. Once verified, your contribution becomes part of the permanent public record.</p>

<p>Accountability is not a spectator sport. The leaders who break promises most freely are the ones whose constituents track them the least. By following these four steps, you shift the balance of power back toward the people who deserve honest representation.</p>

<p>Start now. <a href="/directory">Look up your representatives</a> and see their track record for yourself.</p>
`,
  },

  // -------------------------------------------------------------------------
  // Article 3: The Psychology of Political Memory
  // -------------------------------------------------------------------------
  {
    slug: "psychology-of-political-memory",
    title: "The Psychology of Political Memory: Why We Forget",
    description:
      "The cognitive biases that make us forget political promises, and why politicians have always exploited them.",
    author: "Indelible Team",
    publishedAt: "2025-01-29",
    readingTime: "7 min read",
    category: "Psychology",
    tags: [
      "cognitive bias",
      "political memory",
      "psychology",
      "accountability",
      "recency bias",
    ],
    relatedFigureSlugs: [],
    content: `
<h2>Your Brain Is Not Built for Political Accountability</h2>

<p>If you have ever forgotten what a politician promised during the last election, you are not lazy or uninformed. You are human. The human brain is subject to a set of well-documented cognitive biases that make long-term political accountability extraordinarily difficult, and leaders have exploited these weaknesses for as long as elections have existed.</p>

<p>Understanding these biases does not just explain why accountability fails. It reveals what we need to build to make it succeed.</p>

<h2>The Availability Heuristic: What's Loud Feels True</h2>

<p>The availability heuristic is a mental shortcut where people estimate the likelihood or importance of something based on how easily examples come to mind. In politics, this means that whatever is dominating today's news cycle feels like the most important issue, regardless of its actual significance.</p>

<p>A senator who broke a major healthcare promise two years ago but gave a well-received speech last week benefits enormously from this bias. The speech is available in voters' memories. The broken promise is not. The senator appears effective and engaged because the most recent, most vivid information dominates perception.</p>

<p>This is why politicians invest so heavily in media appearances and headline-generating events. Each new positive impression pushes older, potentially damaging information further from voters' immediate recall.</p>

<h2>Confirmation Bias: Seeing What We Want to See</h2>

<p>Confirmation bias is the tendency to search for, interpret, and remember information that confirms our existing beliefs while ignoring information that contradicts them.</p>

<p>In the context of political accountability, this means that supporters of a leader will naturally downplay or dismiss evidence of broken promises, while opponents will amplify it. Neither group is evaluating the evidence objectively.</p>

<p>A voter who supports a particular governor will interpret a partially fulfilled promise as evidence of good-faith effort. An opponent will see the same partial fulfillment as proof of failure. The raw facts &#8212; what was promised, what was delivered &#8212; get filtered through pre-existing loyalty before they are even evaluated.</p>

<p>This is one reason why partisan media ecosystems are so effective. They provide a constant stream of confirming information while filtering out contradictions. A voter who only consumes sympathetic coverage of their preferred leaders will rarely encounter evidence of broken promises.</p>

<h2>Recency Bias: The Last Thing Wins</h2>

<p>Recency bias causes people to weight recent events and information far more heavily than older events, even when the older events are more relevant or significant.</p>

<p>In a four-year election cycle, this means that what a leader does in the final six months before an election has disproportionate influence on voter perceptions. A well-timed initiative, a crisis response, or even a compelling media appearance in the home stretch can overshadow years of broken commitments.</p>

<p>Politicians know this intuitively. It is why election-year budgets often include popular spending measures. It is why major policy announcements cluster in the months before voters head to the polls. The goal is to make the most recent impression the dominant one, because they know it will be.</p>

<h3>How Recency Bias and News Cycles Interact</h3>

<p>The modern 24-hour news cycle amplifies recency bias dramatically. In previous decades, a broken promise might have stayed in public discussion for weeks. Today, it is replaced by new stories within hours. The combination of short attention spans, algorithmic content feeds, and constant information flow means that even significant contradictions fade from public awareness faster than ever.</p>

<h2>Anchoring: The First Number Sticks</h2>

<p>Anchoring bias causes people to rely too heavily on the first piece of information they encounter about a topic. In politics, this means that the framing a leader provides when making a promise often persists even after the promise is broken.</p>

<p>If a candidate promises to create "one million new jobs," that number becomes the anchor. Even if they only create 200,000 jobs, the discussion tends to revolve around the original million &#8212; and 200,000 sounds like meaningful progress toward that anchor, rather than an 80% shortfall.</p>

<p>Leaders who set bold anchors benefit from this bias even when they fail dramatically. The original framing &#8212; ambitious, forward-looking, specific &#8212; shapes how the outcome is perceived, even when the outcome falls far short.</p>

<h2>The Dunning-Kruger Effect in Political Evaluation</h2>

<p>Many voters overestimate their own ability to track and evaluate political promises. They believe they have a good sense of whether their leaders are following through, when in reality they are operating on fragments of information filtered through the biases described above.</p>

<p>This overconfidence is a barrier to adopting accountability tools. Why use a platform to track promises when you already "know" whether your representative is doing a good job? The answer, of course, is that subjective impressions are unreliable. Systematic tracking reveals patterns that intuition misses.</p>

<h2>Why Systems Beat Memory</h2>

<p>The common thread across all these biases is that they exploit the limitations of human memory and judgment. The solution is not to somehow become better at remembering or less susceptible to bias. Decades of psychological research show that these biases are deeply embedded in how the brain processes information.</p>

<p>The solution is to build systems that do not suffer from these limitations. A database does not forget. An automated matching system does not succumb to confirmation bias. A searchable record does not fall prey to recency bias.</p>

<p>This is the fundamental insight behind the <a href="/">Indelible platform</a>. It is not a replacement for human judgment. It is a supplement to human memory &#8212; a tool that preserves the facts so that citizens can make evaluations based on complete information rather than fragmentary recollections distorted by predictable biases.</p>

<h2>Building Your Own Bias Defense</h2>

<p>While no individual can fully overcome cognitive biases, awareness is the first step. Here are practical approaches:</p>

<ul>
<li><strong>Externalize your memory.</strong> Do not rely on your own recall of political promises. Use structured records and accountability tools to preserve the facts.</li>
<li><strong>Seek disconfirming evidence.</strong> Actively look for information that challenges your current view of a leader. If you support someone, look at their broken promises. If you oppose them, look at what they have delivered.</li>
<li><strong>Evaluate across timeframes.</strong> Resist the pull of recency bias by looking at a leader's full term, not just the last few months. A complete record &#8212; like those available in the <a href="/directory">Indelible directory</a> &#8212; makes this possible.</li>
<li><strong>Focus on specifics.</strong> Vague impressions are where biases thrive. Specific, sourced, dated statements and actions are harder to distort.</li>
</ul>

<p>Our brains are not built for four-year accountability cycles. But the tools we build can be. The question is whether we choose to use them.</p>
`,
  },

  // -------------------------------------------------------------------------
  // Article 4: Say vs Do — Understanding the Accountability Gap
  // -------------------------------------------------------------------------
  {
    slug: "say-vs-do-accountability-gap",
    title: "Say vs Do: Understanding the Accountability Gap",
    description:
      "How Indelible scores public figures by comparing what they say to what they do, and what the grades actually mean.",
    author: "Indelible Team",
    publishedAt: "2025-02-05",
    readingTime: "5 min read",
    category: "Methodology",
    tags: ["methodology", "scoring", "accountability gap", "say vs do", "grading"],
    relatedFigureSlugs: ["bernie-sanders", "bob-iger"],
    content: `
<h2>The Gap Between Words and Actions</h2>

<p>Every public figure operates in two domains: what they <em>say</em> and what they <em>do</em>. The gap between these two domains &#8212; the accountability gap &#8212; is the single most important measure of whether a leader deserves public trust.</p>

<p>A leader who says one thing and does another is not just inconsistent. They are actively undermining the ability of citizens, shareholders, and constituents to make informed decisions. The Indelible platform exists to measure this gap systematically.</p>

<h2>How the Scoring Works</h2>

<p>Every tracked public figure on Indelible receives a score based on the alignment between their recorded statements (promises, claims, positions, predictions) and their documented actions (votes, executive orders, business decisions, policy implementations).</p>

<p>The scoring system works on a scale from +100 to -100:</p>

<ul>
<li><strong>+100 to +60:</strong> Strong follow-through. The figure consistently acts in alignment with their stated positions. Grade: <strong>A</strong></li>
<li><strong>+59 to +20:</strong> Moderate follow-through. More promises kept than broken, but notable gaps exist. Grade: <strong>B</strong></li>
<li><strong>+19 to -19:</strong> Mixed record. Roughly equal follow-through and contradiction. Grade: <strong>C</strong></li>
<li><strong>-20 to -59:</strong> Poor follow-through. More promises broken than kept. Significant accountability concerns. Grade: <strong>D</strong></li>
<li><strong>-60 to -100:</strong> Consistent contradiction. Actions regularly oppose stated positions. Grade: <strong>F</strong></li>
</ul>

<h2>What Goes Into a Score</h2>

<p>Each accountability record on the platform pairs a specific statement with a specific action. Trained reviewers and AI systems evaluate the relationship between the two and assign one of five verdicts:</p>

<ul>
<li><strong>Fulfilled:</strong> The action directly delivers on the statement. Positive score contribution.</li>
<li><strong>Partially Fulfilled:</strong> The action moves in the direction of the statement but falls short of the specific commitment. Small positive contribution.</li>
<li><strong>In Progress:</strong> The statement is recent and no contradicting action has occurred yet. Neutral.</li>
<li><strong>Broken:</strong> The action contradicts the statement. Negative score contribution.</li>
<li><strong>Contradicted:</strong> The action is the direct opposite of what was stated. Strong negative contribution.</li>
</ul>

<h2>A Score of +60 vs. -80: What It Means</h2>

<p>Consider two hypothetical leaders. Leader A has a score of +60, indicating a strong track record of follow-through. Looking at their profile, you would see a majority of "Fulfilled" and "Partially Fulfilled" records with occasional gaps. This is a leader who generally does what they say they will do, even if they do not hit every mark.</p>

<p>Now consider Leader B with a score of -80. Their profile shows a pattern of "Broken" and "Contradicted" records. They promised to lower costs but voted against price controls. They pledged transparency but blocked oversight measures. They claimed to support workers but opposed minimum wage increases. Each individual contradiction might be explainable in isolation, but the pattern tells a clear story.</p>

<p>Leaders like <a href="/figure/bernie-sanders">Bernie Sanders</a> can be evaluated on decades of recorded statements and voting actions, providing a robust dataset for scoring. Corporate leaders like <a href="/figure/bob-iger">Bob Iger</a> are evaluated on public commitments about company direction, employee treatment, and product promises versus documented corporate actions.</p>

<h2>Why This Approach Matters</h2>

<p>Traditional accountability coverage tends to be episodic. A journalist writes a story about a broken promise. It gets attention for a day. Then it disappears into the archive. The Indelible approach is different because it is cumulative.</p>

<p>Every recorded statement and every documented action contributes to a running score that updates over time. A single broken promise might not move the needle. But a pattern of broken promises, accumulated over months and years, creates an unmistakable picture.</p>

<p>This cumulative approach also protects against cherry-picking. Anyone can find one example to make a leader look good or bad. But a comprehensive record covering dozens of statements and actions is far harder to dismiss.</p>

<h3>Handling Nuance and Context</h3>

<p>Politics is complex, and not every broken promise represents bad faith. Circumstances change. Compromises are necessary. Priorities shift based on new information.</p>

<p>The Indelible scoring system accounts for this through the "Partially Fulfilled" and "In Progress" categories, and through detailed context provided with each accountability record. A leader who promised a specific bill but passed a compromise version with most of the key provisions receives a different evaluation than one who abandoned the effort entirely.</p>

<p>The goal is not to punish leaders for the realities of governance. It is to create transparency about the gap between rhetoric and results, so that citizens can make informed decisions rather than relying on campaign messaging alone.</p>

<h2>See It in Action</h2>

<p>The best way to understand the scoring system is to explore it. Visit the <a href="/scorecard">Indelible Scorecard</a> to see how tracked leaders rank, then click into any profile to see the specific statements and actions behind their score.</p>

<p>For a deeper understanding of the methodology, including how AI and human reviewers work together to ensure accuracy, visit our <a href="/about/methodology">methodology page</a>.</p>

<p>The accountability gap is not something most leaders want you to measure. That is exactly why you should.</p>
`,
  },

  // -------------------------------------------------------------------------
  // Article 5: From Campaign Trail to Capitol Hill
  // -------------------------------------------------------------------------
  {
    slug: "campaign-trail-to-capitol-hill",
    title: "From Campaign Trail to Capitol Hill: What Actually Changes",
    description:
      "Patterns in how campaign promises translate into legislation, the common excuses, and why tracking the gap is essential.",
    author: "Indelible Team",
    publishedAt: "2025-02-12",
    readingTime: "6 min read",
    category: "Analysis",
    tags: [
      "campaign promises",
      "legislation",
      "political analysis",
      "accountability",
      "governance",
    ],
    relatedFigureSlugs: ["bernie-sanders", "ted-cruz"],
    content: `
<h2>The Campaign Promise Pipeline</h2>

<p>Every election cycle produces hundreds of campaign promises. Candidates commit to specific legislation, policy changes, executive actions, and institutional reforms. Voters evaluate these promises and cast their ballots based, at least in part, on what they believe their chosen leaders will actually do once in office.</p>

<p>But what happens after the victory speech? Research consistently shows that the journey from campaign trail to enacted policy is where most promises go to die &#8212; not always through bad faith, but through a combination of institutional friction, strategic retreat, and convenient forgetfulness.</p>

<h2>The Three Phases of Promise Erosion</h2>

<h3>Phase 1: The Bold Promise (Campaign Season)</h3>

<p>During campaigns, promises are designed to be maximally appealing and minimally specific. "I will fight for affordable healthcare" sounds good in a debate. It requires nothing concrete. Even when candidates get specific &#8212; "I will introduce a bill to cap insulin at $35 in my first 100 days" &#8212; there is no enforcement mechanism if they fail to follow through.</p>

<p>Campaign promises exist in a low-accountability environment. The audience is large but inattentive to detail. The media covers the horse race more than the policy substance. And the timeline between promise and expected delivery is long enough that memory decay does most of the work.</p>

<h3>Phase 2: The Quiet Retreat (First Year)</h3>

<p>Once in office, the bold promises from campaign season meet the reality of governance. Staff briefs the new leader on constraints they "were not aware of" during the campaign. Legislative priorities get reshuffled. The most ambitious promises get pushed to "later in the term" &#8212; which frequently means never.</p>

<p>This phase is where the most important accountability gaps emerge, and where they are least visible to the public. There is no press conference announcing "We have decided not to pursue the thing we promised." Instead, the promise simply stops being mentioned. It fades from talking points, from press briefings, from the leader's public schedule.</p>

<h3>Phase 3: The Revisionist Narrative (Re-election)</h3>

<p>By the time re-election approaches, the original promises have been reframed. "I promised to cap insulin at $35" becomes "I fought tirelessly for lower drug costs." The specific, measurable commitment is replaced with a vague, unfalsifiable claim of effort.</p>

<p>This reframing is so common that it has become nearly invisible. Voters accept the shift from specific promises to general claims because they cannot easily verify what was originally promised.</p>

<h2>The Common Excuses</h2>

<p>When leaders are directly confronted about broken promises, they draw from a standard set of explanations:</p>

<ul>
<li><strong>"Political compromise required it."</strong> The most common excuse. The leader claims they had to modify or abandon a promise due to opposition. Sometimes this is genuine. Sometimes it is a convenient cover for never having seriously pursued the commitment.</li>
<li><strong>"Circumstances changed."</strong> A new crisis, economic shift, or geopolitical event is cited as the reason the promise could not be kept. This can be legitimate, but it is also easily abused &#8212; circumstances are always changing.</li>
<li><strong>"We made progress."</strong> Partial action is presented as full delivery. A promise to create one million jobs becomes "We are on track" after creating 100,000. The goalposts move, and the original commitment is quietly retired.</li>
<li><strong>"The other side blocked it."</strong> Blame is redirected to political opponents. While obstruction is real, this excuse often obscures the fact that the leader never invested serious political capital in the promise to begin with.</li>
</ul>

<h2>Patterns Across the Aisle</h2>

<p>Promise erosion is not a partisan phenomenon. It occurs across the political spectrum, in every level of government, and in every era of modern politics.</p>

<p>Leaders like <a href="/figure/bernie-sanders">Bernie Sanders</a>, known for ideological consistency, still operate within this dynamic. The question is not whether any leader has a perfect record &#8212; none do &#8212; but whether the pattern of their actions aligns with the pattern of their promises.</p>

<p>Similarly, <a href="/figure/ted-cruz">Ted Cruz</a> has made bold promises to his base on issues from immigration to fiscal policy. Tracking the specific commitments against specific legislative actions reveals whether the rhetoric matches the record.</p>

<h2>Why Tracking Changes Everything</h2>

<p>The campaign-to-governance pipeline works in politicians' favor precisely because it is opaque. Voters cannot easily connect a campaign speech from 2022 to a committee vote in 2024. The information exists in public records, but it is fragmented across congressional databases, news archives, and campaign websites.</p>

<p>Systematic tracking platforms like <a href="/">Indelible</a> change this dynamic by creating a direct, visible link between statements and actions. When a leader makes a promise, it is recorded with a date, source, and exact wording. When they take a relevant action, it is matched to the original promise and evaluated.</p>

<p>This does not prevent politicians from breaking promises. But it removes the ability to do so quietly. The accountability gap &#8212; the space between what was said and what was done &#8212; becomes visible, measurable, and shareable.</p>

<h2>What Voters Can Do</h2>

<p>The most effective thing any voter can do is simple: check the record before you vote. Not the campaign ads. Not the debate performance. Not the endorsements. The record of what your representative actually promised and what they actually delivered.</p>

<p>Visit the <a href="/directory">Indelible directory</a> and look up your representatives. See their recorded statements alongside their documented actions. Share what you find with your network. The more people who check the record, the harder it becomes for the campaign-to-Capitol pipeline to quietly swallow promises whole.</p>

<p>If you find promises or actions that are not yet tracked, <a href="/contribute">contribute them to the platform</a>. Every entry makes the record more complete and the accountability more effective.</p>
`,
  },

  // -------------------------------------------------------------------------
  // Article 6: How AI Is Helping Track Political Accountability
  // -------------------------------------------------------------------------
  {
    slug: "ai-tracking-political-accountability",
    title: "How AI Is Helping Track Political Accountability",
    description:
      "How artificial intelligence makes it possible to match political promises to actions at scale, and why this changes everything for public accountability.",
    author: "Indelible Team",
    publishedAt: "2025-02-20",
    readingTime: "5 min read",
    category: "Technology",
    tags: [
      "artificial intelligence",
      "technology",
      "accountability",
      "automation",
      "trust system",
    ],
    relatedFigureSlugs: [],
    content: `
<h2>The Scale Problem</h2>

<p>For decades, holding public figures accountable for their promises has been a manual, labor-intensive process. A journalist might track a specific campaign promise. A watchdog organization might monitor a particular policy area. But comprehensive tracking &#8212; matching every public statement to every relevant action for every significant public figure &#8212; has been impossible at scale.</p>

<p>Consider the numbers. A single U.S. senator might make dozens of specific promises during a campaign, take hundreds of recorded votes per term, issue statements on thousands of topics, and appear in countless media interviews. Multiply that by 535 members of Congress, 50 governors, thousands of state legislators, and prominent corporate and media figures, and the volume of information becomes unmanageable for human researchers alone.</p>

<p>This is where artificial intelligence changes the equation.</p>

<h2>What AI Can Do That Humans Cannot</h2>

<p>Modern AI systems excel at exactly the kind of tasks that political accountability requires:</p>

<ul>
<li><strong>Processing large volumes of text.</strong> AI can analyze thousands of speeches, interviews, social media posts, and official statements to identify specific, trackable commitments.</li>
<li><strong>Matching statements to actions.</strong> When a legislator casts a vote or signs an executive order, AI can scan the database of recorded promises and identify which commitments are affected &#8212; positively or negatively.</li>
<li><strong>Detecting contradictions.</strong> Natural language processing can identify when a new statement contradicts a previous one, even when the wording is different. "I will never support raising taxes" and "This revenue enhancement is necessary" are flagged as a potential contradiction.</li>
<li><strong>Monitoring continuously.</strong> Unlike human researchers who work in shifts and focus on specific stories, AI systems can monitor news feeds, government databases, and public records around the clock.</li>
</ul>

<h2>The Three-Layer Trust System</h2>

<p>AI capability alone is not enough. The critical challenge in accountability tracking is not just identifying contradictions but ensuring that the identifications are accurate. False positives &#8212; flagging a kept promise as broken, or vice versa &#8212; undermine the credibility of the entire system.</p>

<p>The <a href="/">Indelible platform</a> addresses this through a three-layer trust system designed to combine the scale of AI with the judgment of humans:</p>

<h3>Layer 1: AI Research and Matching</h3>

<p>AI agents continuously scan public records, news sources, government databases, and official statements. They identify new promises, match actions to existing commitments, and flag potential contradictions. This layer provides speed and scale &#8212; processing information far faster than any human team could.</p>

<h3>Layer 2: Community Review</h3>

<p>Every AI-generated match goes through a review process. Community contributors &#8212; citizens who register to help verify accountability records &#8212; evaluate the AI's work. They confirm whether a flagged contradiction is genuine, whether context changes the assessment, and whether the sources are reliable.</p>

<p>Contributors build reputation over time based on the accuracy and quality of their reviews. Higher-reputation reviewers have more influence on final assessments, creating a meritocratic quality control system.</p>

<h3>Layer 3: Consensus Verification</h3>

<p>For high-profile or contested assessments, the platform requires consensus among multiple independent reviewers before publishing a verdict. This prevents any single reviewer &#8212; or any single AI system &#8212; from skewing the record.</p>

<p>The three layers work together: AI provides scale and speed, community reviewers provide judgment and context, and consensus requirements provide reliability.</p>

<h2>Why This Was Not Possible Before</h2>

<p>Several technological developments have converged to make AI-powered accountability tracking feasible for the first time:</p>

<ul>
<li><strong>Large language models</strong> can now understand the semantic meaning of political statements well enough to match them to relevant actions, even when the language differs significantly.</li>
<li><strong>Digital public records</strong> have made government actions machine-readable at a scale that was not available even a decade ago. Voting records, regulatory filings, and official communications are increasingly accessible through APIs.</li>
<li><strong>Community platforms</strong> have demonstrated that distributed human review can match or exceed the quality of centralized editorial processes, provided the incentive and reputation systems are well-designed.</li>
</ul>

<h2>Addressing the Risks</h2>

<p>AI-powered accountability tracking carries real risks that must be addressed transparently:</p>

<ul>
<li><strong>Bias in training data.</strong> If the AI is trained on partisan sources, its assessments will reflect those biases. Indelible addresses this by using diverse source sets and requiring cross-partisan community review.</li>
<li><strong>Context sensitivity.</strong> AI can miss nuance that changes the meaning of a statement or action. The community review layer is specifically designed to catch these cases.</li>
<li><strong>Manipulation.</strong> Bad actors may try to game the system by submitting false information or coordinating reviews. The reputation system and consensus requirements create barriers to manipulation.</li>
</ul>

<h2>The Future of Accountability</h2>

<p>We are at the beginning of a fundamental shift in public accountability. For the first time, it is technically possible to create a comprehensive, continuously updated record of what every significant public figure promises and what they actually deliver.</p>

<p>This does not mean the technology is perfect. It is not. AI makes mistakes. Community reviewers can be biased. Sources can be unreliable. But the combination of AI scale, human judgment, and transparent methodology represents a dramatic improvement over the status quo, where most promises are simply forgotten.</p>

<p>The goal is not a perfect system. It is a better one &#8212; one where breaking a promise comes with a permanent, searchable record rather than a reasonable expectation that nobody will notice.</p>

<p>If you want to be part of this shift, you can start today. <a href="/contribute">Contribute to the Indelible platform</a> by submitting statements, actions, or reviews. Or simply <a href="/directory">explore the directory</a> and see the technology in action.</p>

<p>The era of consequence-free promise-breaking is ending. AI is making sure of that.</p>
`,
  },
];

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter((p) => p.category === category);
}
