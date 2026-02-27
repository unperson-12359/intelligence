import Link from "next/link";
import { Github } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground font-bold text-xs">
                I
              </div>
              <span className="font-bold">Indelible</span>
            </div>
            <p className="text-sm text-muted-foreground">
              They count on you forgetting. We make sure you don&apos;t.
            </p>
          </div>

          {/* Browse */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Browse</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/directory" className="text-muted-foreground hover:text-foreground transition-colors">
                  Directory
                </Link>
              </li>
              <li>
                <Link href="/scorecard" className="text-muted-foreground hover:text-foreground transition-colors">
                  Scorecard
                </Link>
              </li>
              <li>
                <Link href="/topics" className="text-muted-foreground hover:text-foreground transition-colors">
                  Topics
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Participate */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Participate</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contribute" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contribute
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/about/methodology" className="text-muted-foreground hover:text-foreground transition-colors">
                  Methodology
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 flex flex-col items-center gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/unperson-12359/intelligence"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </div>
          <p className="text-xs text-muted-foreground text-center">
            Indelible — Built by the people, for the people.
            Data sourced from public records.
          </p>
        </div>
      </div>
    </footer>
  );
}
