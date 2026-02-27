import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/navigation/breadcrumbs";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Indelible team.",
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Contact" }]} />
      <h1 className="text-3xl font-bold mb-2">Contact</h1>
      <p className="text-muted-foreground mb-8">
        Have questions, feedback, or want to contribute? Here&apos;s how to
        reach us.
      </p>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-2">Report an Issue</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Found inaccurate data, a bug, or have a feature request? Open an
              issue on our GitHub repository.
            </p>
            <Button variant="outline" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open GitHub Issue
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-2">Contribute Data</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Want to help track accountability? Learn about our contribution
              process and how to submit verified data.
            </p>
            <Button variant="outline" asChild>
              <Link href="/contribute">Learn How to Contribute</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-bold mb-2">General Inquiries</h2>
            <p className="text-sm text-muted-foreground mb-4">
              For partnership inquiries, media requests, or other questions,
              reach out through our GitHub discussions.
            </p>
            <Button variant="outline" asChild>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub Discussions
              </a>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
