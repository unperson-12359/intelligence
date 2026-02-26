const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '..', 'src', 'lib', 'mock-data.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// All URL replacements: [old, new]
const replacements = [
  // === BATCH 1: Sanders, Musk, Rogan ===
  ['https://www.sanders.senate.gov/press-releases/news-sanders-introduces-college-for-all-act/', 'https://en.wikipedia.org/wiki/College_for_All_Act'],
  ['https://www.sanders.senate.gov/press-releases/news-sanders-leads-hearing-on-outrageous-price-of-prescription-drugs-in-america/', 'https://en.wikipedia.org/wiki/Prescription_drug_prices_in_the_United_States'],
  ['https://www.congress.gov/bill/116th-congress/senate-bill/1129', 'https://en.wikipedia.org/wiki/Medicare_for_All_Act'],
  ['https://www.bbc.com/news/technology-61172059', 'https://en.wikipedia.org/wiki/Acquisition_of_Twitter_by_Elon_Musk'],
  ['https://www.space.com/spacex-starship-mars-launch-2024.html', 'https://en.wikipedia.org/wiki/SpaceX_Starship'],
  ['https://www.reuters.com/business/autos-transportation/tesla-begins-cybertruck-deliveries-2023-11-30/', 'https://en.wikipedia.org/wiki/Tesla_Cybertruck'],
  ['https://www.theverge.com/2019/4/22/18510828/tesla-elon-musk-autonomy-day-investor-event-robotaxi', 'https://en.wikipedia.org/wiki/Tesla_Autopilot'],
  ['https://www.reuters.com/technology/exclusive-twitter-set-accept-musks-best-final-offer-sources-2022-04-25/', 'https://en.wikipedia.org/wiki/Acquisition_of_Twitter_by_Elon_Musk'],
  ['https://www.bbc.com/news/technology-63726767', 'https://en.wikipedia.org/wiki/Twitter_under_Elon_Musk'],
  ['https://www.bbc.com/news/technology-64005765', 'https://en.wikipedia.org/wiki/Twitter_under_Elon_Musk'],
  ['https://www.bbc.com/news/world-us-canada-56948719', 'https://en.wikipedia.org/wiki/The_Joe_Rogan_Experience_controversy'],
  ['https://www.bbc.com/news/entertainment-arts-60294785', 'https://en.wikipedia.org/wiki/The_Joe_Rogan_Experience_controversy'],
  ['https://www.bbc.com/news/world-us-canada-66510391', 'https://en.wikipedia.org/wiki/The_Joe_Rogan_Experience'],
  ['https://www.wsj.com/articles/spotify-strikes-exclusive-podcast-deal-with-joe-rogan-11589913814', 'https://en.wikipedia.org/wiki/The_Joe_Rogan_Experience'],
  ['https://www.bbc.com/news/articles/cx2k0y29v97o', 'https://en.wikipedia.org/wiki/The_Joe_Rogan_Experience'],
  ['https://www.tesla.com/cybertruck', 'https://en.wikipedia.org/wiki/Tesla_Cybertruck'],
  ['https://www.tesla.com/', 'https://en.wikipedia.org/wiki/Tesla,_Inc.'],

  // === BATCH 2: Cruz, Iger, Zelenskyy, Carlson, Thunberg ===
  ['https://www.congress.gov/bill/114th-congress/senate-bill/339', 'https://en.wikipedia.org/wiki/Ted_Cruz#Political_positions'],
  ['https://www.texastribune.org/2022/05/25/ted-cruz-uvalde-shooting/', 'https://en.wikipedia.org/wiki/Robb_Elementary_School_shooting'],
  ['https://www.nytimes.com/2021/02/18/us/politics/ted-cruz-storm-cancun.html', 'https://en.wikipedia.org/wiki/Ted_Cruz#Cancún_trip_during_winter_storm'],
  ['https://www.congress.gov/bill/117th-congress/senate-bill/2938', 'https://en.wikipedia.org/wiki/Bipartisan_Safer_Communities_Act'],
  ['https://www.texastribune.org/2021/01/06/ted-cruz-electoral-college/', 'https://en.wikipedia.org/wiki/2021_United_States_Electoral_College_vote_count'],
  ['https://www.reuters.com/business/media-telecom/disney-misses-streaming-subscriber-estimates-2023-02-08/', 'https://en.wikipedia.org/wiki/Disney%2B'],
  ['https://www.cnbc.com/2023/02/08/disney-to-cut-7000-jobs-in-restructuring-plan.html', 'https://en.wikipedia.org/wiki/Bob_Iger'],
  ['https://www.bbc.com/news/world-us-canada-65335098', 'https://en.wikipedia.org/wiki/Bob_Iger'],
  ['https://www.reuters.com/business/media-telecom/walt-disney-beats-quarterly-revenue-estimates-2024-08-07/', 'https://en.wikipedia.org/wiki/The_Walt_Disney_Company'],
  ['https://www.bbc.com/news/world-europe-47984842', 'https://en.wikipedia.org/wiki/2019_Ukrainian_presidential_election'],
  ['https://www.reuters.com/world/europe/zelenskiy-says-ukraine-will-not-give-up-any-territory-2022-03-08/', 'https://en.wikipedia.org/wiki/Russian_invasion_of_Ukraine'],
  ['https://www.bbc.com/news/world-europe-61613538', 'https://en.wikipedia.org/wiki/Volodymyr_Zelenskyy'],
  ['https://www.bbc.com/news/world-europe-64394549', 'https://en.wikipedia.org/wiki/Accession_of_Ukraine_to_the_European_Union'],
  ['https://www.reuters.com/world/us/nsa-says-tucker-carlson-was-not-an-intelligence-target-2021-06-30/', 'https://en.wikipedia.org/wiki/Tucker_Carlson'],
  ['https://www.bbc.com/news/world-us-canada-64874388', 'https://en.wikipedia.org/wiki/Tucker_Carlson'],
  ['https://www.bbc.com/news/world-europe-68246682', 'https://en.wikipedia.org/wiki/Tucker_Carlson%27s_interview_with_Vladimir_Putin'],
  ['https://www.bbc.com/news/science-environment-59073498', 'https://en.wikipedia.org/wiki/Greta_Thunberg'],
  ['https://www.bbc.com/news/science-environment-51179831', 'https://en.wikipedia.org/wiki/Greta_Thunberg'],
  ['https://www.bbc.com/news/world-europe-67178864', 'https://en.wikipedia.org/wiki/Greta_Thunberg'],
  ['https://www.bbc.com/news/world-europe-64311676', 'https://en.wikipedia.org/wiki/L%C3%BCtzerath'],

  // === BATCH 3: Trump, Xi, Putin, Modi, Netanyahu, MBS, Zuckerberg, Bezos, VDL, Erdogan ===
  ['https://www.bbc.com/news/world-us-canada-40706506', 'https://en.wikipedia.org/wiki/American_Health_Care_Act_of_2017'],
  ['https://www.congress.gov/bill/115th-congress/house-bill/1/actions', 'https://en.wikipedia.org/wiki/Tax_Cuts_and_Jobs_Act'],
  ['https://www.congress.gov/bill/117th-congress/house-bill/5376', 'https://en.wikipedia.org/wiki/Inflation_Reduction_Act'],
  ['https://www.congress.gov/bill/118th-congress/senate-bill/1655', 'https://en.wikipedia.org/wiki/Medicare_for_All_Act'],
  ['https://www.bbc.com/news/world-us-canada-40755025', 'https://en.wikipedia.org/wiki/Executive_Order_13769'],
  ['https://www.bbc.com/news/world-asia-china-40461655', 'https://en.wikipedia.org/wiki/One_country,_two_systems'],
  ['https://www.bbc.com/news/world-asia-china-60743090', 'https://en.wikipedia.org/wiki/Chinese_government_response_to_COVID-19'],
  ['https://www.bbc.com/news/world-europe-60332869', 'https://en.wikipedia.org/wiki/Prelude_to_the_Russian_invasion_of_Ukraine'],
  ['https://www.bbc.com/news/world-europe-53578746', 'https://en.wikipedia.org/wiki/2020_amendments_to_the_Constitution_of_Russia'],
  ['https://www.reuters.com/article/india-farmers-idINKBN2B11GR', 'https://en.wikipedia.org/wiki/2020%E2%80%932021_Indian_farmers%27_protest'],
  ['https://www.bbc.com/news/world-asia-india-66762927', 'https://en.wikipedia.org/wiki/Digital_India'],
  ['https://www.bbc.com/news/world-asia-india-59329898', 'https://en.wikipedia.org/wiki/2020%E2%80%932021_Indian_farmers%27_protest'],
  ['https://www.bbc.com/news/world-middle-east-19759061', 'https://en.wikipedia.org/wiki/Benjamin_Netanyahu'],
  ['https://www.bbc.com/news/world-middle-east-65060043', 'https://en.wikipedia.org/wiki/2023_Israeli_judicial_reform'],
  ['https://www.bbc.com/news/world-middle-east-50528743', 'https://en.wikipedia.org/wiki/Trial_of_Benjamin_Netanyahu'],
  ['https://www.bbc.com/news/world-middle-east-66256461', 'https://en.wikipedia.org/wiki/2023_Israeli_judicial_reform'],
  ['https://www.bbc.com/news/world-middle-east-65950270', 'https://en.wikipedia.org/wiki/Israeli_settlement'],
  ['https://www.bbc.com/news/world-middle-east-36093670', 'https://en.wikipedia.org/wiki/Saudi_Vision_2030'],
  ['https://www.bbc.com/news/world-middle-east-49826905', 'https://en.wikipedia.org/wiki/Assassination_of_Jamal_Khashoggi'],
  ['https://www.ohchr.org/en/press-releases/2021/02/khashoggi-killing-un-expert-says-saudi-crown-prince-should-be-investigated', 'https://en.wikipedia.org/wiki/Assassination_of_Jamal_Khashoggi'],
  ['https://www.bbc.com/news/world-us-canada-43725067', 'https://en.wikipedia.org/wiki/Facebook%E2%80%93Cambridge_Analytica_data_scandal'],
  ['https://www.bbc.com/news/technology-54012221', 'https://en.wikipedia.org/wiki/Criticism_of_Facebook'],
  ['https://www.bbc.com/news/technology-59083601', 'https://en.wikipedia.org/wiki/Meta_Platforms'],
  ['https://www.bbc.com/news/technology-68171780', 'https://en.wikipedia.org/wiki/Meta_Platforms'],
  ['https://www.bbc.com/news/articles/c62415gyexzo', 'https://en.wikipedia.org/wiki/Community_Notes'],
  ['https://www.bbc.com/news/business-56772985', 'https://en.wikipedia.org/wiki/Amazon_(company)'],
  ['https://www.bbc.com/news/world-us-canada-51560496', 'https://en.wikipedia.org/wiki/Bezos_Earth_Fund'],
  ['https://www.bbc.com/news/technology-56684369', 'https://en.wikipedia.org/wiki/Amazon_Labor_Union'],
  ['https://www.bbc.com/news/technology-67329895', 'https://en.wikipedia.org/wiki/Criticism_of_Amazon'],
  ['https://www.reuters.com/business/retail-consumer/amazon-warehouse-injury-rates-higher-than-rivals-data-shows-2023-04-12/', 'https://en.wikipedia.org/wiki/Criticism_of_Amazon'],
  ['https://www.bbc.com/news/world-europe-50778001', 'https://en.wikipedia.org/wiki/European_Green_Deal'],
  ['https://www.bbc.com/news/world-europe-57833807', 'https://en.wikipedia.org/wiki/Fit_for_55'],
  ['https://www.bbc.com/news/world-europe-60506682', 'https://en.wikipedia.org/wiki/International_response_to_the_Russian_invasion_of_Ukraine'],
  ['https://www.bbc.com/news/science-environment-65343010', 'https://en.wikipedia.org/wiki/Fit_for_55'],
  ['https://www.bbc.com/news/science-environment-68207790', 'https://en.wikipedia.org/wiki/European_Green_Deal'],
  ['https://commission.europa.eu/about/president_en', 'https://en.wikipedia.org/wiki/Ursula_von_der_Leyen'],
  ['https://www.bbc.com/news/world-europe-39381500', 'https://en.wikipedia.org/wiki/2017_Turkish_constitutional_referendum'],
  ['https://www.bbc.com/news/world-europe-65474787', 'https://en.wikipedia.org/wiki/2023_Turkish_general_election'],
  ['https://www.bbc.com/news/world-europe-36835340', 'https://en.wikipedia.org/wiki/2016_Turkish_coup_d%27%C3%A9tat_attempt'],
  ['https://www.bbc.com/news/business-68625498', 'https://en.wikipedia.org/wiki/Turkish_currency_and_debt_crisis,_2018'],
  ['https://rsf.org/en/country/turkey', 'https://en.wikipedia.org/wiki/Media_freedom_in_Turkey'],
  ['https://www.congress.gov/bill/117th-congress/senate-bill/1288', 'https://en.wikipedia.org/wiki/Bipartisan_Safer_Communities_Act'],
  ['https://www.c-span.org', 'https://en.wikipedia.org/wiki/C-SPAN'],
  ['https://about.meta.com/', 'https://en.wikipedia.org/wiki/Meta_Platforms'],
  ['https://www.blueorigin.com/', 'https://en.wikipedia.org/wiki/Blue_Origin'],
  ['https://www.pmindia.gov.in/', 'https://en.wikipedia.org/wiki/Prime_Minister_of_India'],
  ['https://www.president.gov.ua/en', 'https://en.wikipedia.org/wiki/President_of_Ukraine'],

  // === GENERIC EVIDENCE LINKS ===
  // Replace generic x.com with specific Musk suspension accounts post
  // Replace generic spotify with correct JRE show link
  // Replace generic c-span with specific wikipedia
];

let replaced = 0;
let skipped = 0;

for (const [old, newUrl] of replacements) {
  if (content.includes(old)) {
    // Use split+join to replace ALL occurrences
    const before = content;
    content = content.split(old).join(newUrl);
    const count = (before.length - content.length + newUrl.length * ((before.length - content.replace(new RegExp(newUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), '').length) / newUrl.length)) ;
    replaced++;
    console.log(`  [OK] Replaced: ${old.substring(0, 60)}...`);
  } else {
    skipped++;
    console.log(`  [SKIP] Not found: ${old.substring(0, 60)}...`);
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`\nDone! Replaced ${replaced} URLs, skipped ${skipped}`);
