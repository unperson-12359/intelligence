import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Intelligence collects, uses, and protects your data.",
};

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Privacy Policy" }]} />
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-8">
        Last updated: February 2026
      </p>

      <div className="prose prose-sm dark:prose-invert max-w-none space-y-6">
        <section>
          <h2 className="text-xl font-bold mb-3">Data We Collect</h2>
          <p className="text-muted-foreground">
            Intelligence collects publicly available information about public
            figures, including statements, actions, voting records, and other
            publicly documented activities. We do not collect personal data from
            visitors beyond standard analytics (page views, referrers) and any
            information you voluntarily provide when contributing.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">How We Use Data</h2>
          <p className="text-muted-foreground">
            All data collected is used solely to power the accountability
            platform. We analyze public records to match statements with actions
            and generate accountability scores. Contributor information is used
            to attribute contributions and maintain our reputation system.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Data Retention</h2>
          <p className="text-muted-foreground">
            Public accountability records are retained indefinitely as part of
            the historical record. Contributor account data is retained as long
            as the account is active. You may request deletion of your
            contributor account at any time.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Third Parties</h2>
          <p className="text-muted-foreground">
            We do not sell or share personal data with third parties. We use
            Vercel for hosting and Neon for database services. Analytics data is
            aggregated and anonymized.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Cookies</h2>
          <p className="text-muted-foreground">
            We use essential cookies for theme preferences (dark/light mode). No
            tracking cookies are used.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-bold mb-3">Contact</h2>
          <p className="text-muted-foreground">
            For privacy-related questions or data deletion requests, please
            contact us through our GitHub repository or the contact page.
          </p>
        </section>
      </div>
    </div>
  );
}
