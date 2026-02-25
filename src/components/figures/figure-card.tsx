import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScoreBadge } from "@/components/accountability/score-badge";
import { cn } from "@/lib/utils";

interface FigureCardProps {
  slug: string;
  name: string;
  title: string;
  type: string;
  party?: string;
  state?: string;
  country: string;
  overallScore: string;
  imageUrl?: string;
  totalStatements?: number;
  totalActions?: number;
  brokenCount?: number;
  className?: string;
}

const typeLabels: Record<string, string> = {
  politician: "Politician",
  executive: "Executive",
  influencer: "Influencer",
  journalist: "Journalist",
  activist: "Activist",
  other: "Other",
};

export function FigureCard({
  slug,
  name,
  title,
  type,
  party,
  state,
  overallScore,
  imageUrl,
  totalStatements = 0,
  totalActions = 0,
  brokenCount = 0,
  className,
}: FigureCardProps) {
  return (
    <Link href={`/figure/${slug}`}>
        <Card
          className={cn(
            "transition-all duration-200 cursor-pointer h-full",
            "hover:-translate-y-1 hover:shadow-lg hover:shadow-[var(--intelligence-blue)]/5",
            "hover:border-foreground/20",
            "bg-[var(--glass-bg)] backdrop-blur-sm",
            "border-[var(--glass-border)]",
            className
          )}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover shrink-0 border border-border/50"
                  style={{ width: 48, height: 48 }}
                />
              ) : (
                <div
                  className="h-12 w-12 rounded-full bg-gradient-to-br from-muted to-muted/60 flex items-center justify-center text-lg font-bold text-muted-foreground shrink-0 border border-border/50"
                  role="img"
                  aria-label={`Avatar for ${name}`}
                >
                  {name.charAt(0)}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-semibold text-sm truncate">{name}</h3>
                    <p className="text-xs text-muted-foreground truncate">
                      {title}
                    </p>
                  </div>
                  <ScoreBadge grade={overallScore} size="sm" />
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge variant="secondary" className="text-xs">
                    {typeLabels[type] || type}
                  </Badge>
                  {party && (
                    <Badge variant="outline" className="text-xs">
                      {party}
                    </Badge>
                  )}
                  {state && (
                    <Badge variant="outline" className="text-xs">
                      {state}
                    </Badge>
                  )}
                </div>
                <div className="flex gap-3 mt-2 text-xs text-muted-foreground">
                  <span>{totalStatements} statements</span>
                  <span>{totalActions} actions</span>
                  {brokenCount > 0 && (
                    <span className="text-red-600 dark:text-red-400 font-medium">
                      {brokenCount} broken
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
    </Link>
  );
}
