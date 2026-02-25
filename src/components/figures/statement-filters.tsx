"use client";

import { useState, useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SourceLink } from "@/components/evidence/source-link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { STATEMENT_TYPE_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/format";

type MockStatement = {
  id: string;
  figureId: string;
  type: string;
  title: string;
  content: string;
  context: string;
  dateOccurred: string;
  sourceUrl: string;
  sourceName: string;
  sourceType: string;
  isVerified: boolean;
  aiConfidence: number;
};

type SortOrder = "newest" | "oldest";

interface StatementFiltersProps {
  statements: MockStatement[];
}

export function StatementFilters({ statements }: StatementFiltersProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredAndSorted = useMemo(() => {
    let result = [...statements];

    // Filter by type
    if (typeFilter !== "all") {
      result = result.filter((stmt) => stmt.type === typeFilter);
    }

    // Sort by dateOccurred
    result.sort((a, b) => {
      const dateA = new Date(a.dateOccurred).getTime();
      const dateB = new Date(b.dateOccurred).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [statements, sortOrder, typeFilter]);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <Select value={sortOrder} onValueChange={(v) => setSortOrder(v as SortOrder)}>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="oldest">Oldest First</SelectItem>
          </SelectContent>
        </Select>

        <Select value={typeFilter} onValueChange={setTypeFilter}>
          <SelectTrigger size="sm">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(STATEMENT_TYPE_LABELS).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {typeFilter !== "all" && (
          <span className="text-xs text-muted-foreground">
            {filteredAndSorted.length} result{filteredAndSorted.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {filteredAndSorted.length === 0 ? (
        <p className="text-sm text-muted-foreground py-8 text-center">
          No statements match the selected filter.
        </p>
      ) : (
        <div className="space-y-3">
          {filteredAndSorted.map((stmt) => (
            <Card key={stmt.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {STATEMENT_TYPE_LABELS[stmt.type] || stmt.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(stmt.dateOccurred)}
                  </span>
                  {stmt.isVerified && (
                    <Badge
                      variant="outline"
                      className="text-xs text-green-700 border-green-300"
                    >
                      Verified
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-sm">{stmt.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {stmt.content}
                </p>
                <p className="text-xs text-muted-foreground mt-2">
                  {stmt.context}
                </p>
                <div className="mt-1">
                  {stmt.sourceUrl ? (
                    <SourceLink
                      url={stmt.sourceUrl}
                      name={stmt.sourceName}
                      type={stmt.sourceType}
                    />
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Source: {stmt.sourceName}
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
