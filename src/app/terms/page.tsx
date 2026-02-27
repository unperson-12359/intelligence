import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing use of the Indelible accountability platform.",
};

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Terms of Service" }]} />
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last updated: February 2026
      </p>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-3">Platform Use</h2>
          <p className="text-muted-foreground">
            Indelible is a free, open-source accountability platform. By
            using this platform, you agree to use it in good faith for the
            purpose of promoting transparency and accountability in public
            life. Misuse of the platform, including submitting false data or
            harassing individuals, is prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Contributions</h2>
          <p className="text-muted-foreground">
            When you contribute data to Indelible, you affirm that the
            information is accurate to the best of your knowledge and backed by
            verifiable sources. Contributions are subject to review and may be
            modified or removed if they do not meet our verification standards.
            By contributing, you grant Indelible a perpetual license to use
            your contributions.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Accuracy Disclaimer</h2>
          <p className="text-muted-foreground">
            While we strive for accuracy, Indelible relies on publicly
            available information and AI-assisted analysis. Scores and verdicts
            represent our best assessment based on available data and should not
            be taken as definitive legal or factual judgments. We encourage users
            to verify information through the linked sources.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Non-Partisan Policy</h2>
          <p className="text-muted-foreground">
            Indelible applies identical scoring criteria regardless of party
            affiliation, ideology, or political stance. Our methodology is
            transparent and available on our methodology page.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Intellectual Property</h2>
          <p className="text-muted-foreground">
            The Indelible platform, its design, and underlying code are open
            source. Accountability data collected and curated by our community
            is made available under Creative Commons Attribution 4.0.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Limitation of Liability</h2>
          <p className="text-muted-foreground">
            Indelible is provided &quot;as is&quot; without warranty. We are
            not liable for decisions made based on information provided by this
            platform.
          </p>
        </section>
      </div>
    </div>
  );
}
