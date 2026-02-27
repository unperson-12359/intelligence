const BASE_URL = "https://intelligence-red.vercel.app";

export function generateWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Indelible",
    description:
      "AI-powered accountability platform tracking what public figures SAY vs what they DO.",
    url: BASE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function generatePersonJsonLd(figure: {
  name: string;
  slug: string;
  title: string;
  type: string;
  bio: string;
  overallScore: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: figure.name,
    description: figure.bio,
    jobTitle: figure.title,
    url: `${BASE_URL}/figure/${figure.slug}`,
  };
}
