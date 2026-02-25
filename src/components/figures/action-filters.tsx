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
import { ACTION_TYPE_LABELS } from "@/lib/constants";
import { formatDate } from "@/lib/format";

type MockAction = {
  id: string;
  figureId: string;
  type: string;
  title: string;
  description: string;
  outcome: string;
  dateOccurred: string;
  sourceUrl: string;
  sourceName: string;
  isVerified: boolean;
  aiConfidence: number;
};

type SortOrder = "newest" | "oldest";

interface ActionFiltersProps {
  actions: MockAction[];
}

export function ActionFilters({ actions }: ActionFiltersProps) {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredAndSorted = useMemo(() => {
    let result = [...actions];

    // Filter by type
    if (typeFilter !== "all") {
      result = result.filter((action) => action.type === typeFilter);
    }

    // Sort by dateOccurred
    result.sort((a, b) => {
      const dateA = new Date(a.dateOccurred).getTime();
      const dateB = new Date(b.dateOccurred).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [actions, sortOrder, typeFilter]);

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
            {Object.entries(ACTION_TYPE_LABELS).map(([value, label]) => (
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
          No actions match the selected filter.
        </p>
      ) : (
        <div className="space-y-3">
          {filteredAndSorted.map((action) => (
            <Card key={action.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant="secondary" className="text-xs">
                    {ACTION_TYPE_LABELS[action.type] || action.type}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(action.dateOccurred)}
                  </span>
                  {action.isVerified && (
                    <Badge
                      variant="outline"
                      className="text-xs text-green-700 border-green-300"
                    >
                      Verified
                    </Badge>
                  )}
                </div>
                <h3 className="font-semibold text-sm">{action.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  {action.description}
                </p>
                {action.outcome && (
                  <p className="text-xs text-muted-foreground mt-2">
                    Outcome: {action.outcome}
                  </p>
                )}
                <div className="mt-1">
                  {action.sourceUrl ? (
                    <SourceLink
                      url={action.sourceUrl}
                      name={action.sourceName}
                    />
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Source: {action.sourceName}
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
