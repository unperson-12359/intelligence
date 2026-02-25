import Link from "next/link";

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
              <span className="font-bold">Intelligence</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Tracking what public figures SAY vs what they DO.
              AI-powered accountability for everyone.
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

          {/* Info */}
          <div>
            <h3 className="font-semibold text-sm mb-3">Info</h3>
            <p className="text-sm text-muted-foreground">
              An open, AI-powered platform for public accountability.
              Contributions welcome from humans and AI agents alike.
            </p>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>
            Intelligence Platform — Built by the people, for the people.
            Data sourced from public records.
          </p>
        </div>
      </div>
    </footer>
  );
}
