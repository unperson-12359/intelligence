import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  getFigureBySlug,
  getFigureStats,
  getAccountabilityForFigure,
} from "@/lib/mock-data";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const figure = getFigureBySlug(slug);

  if (!figure) {
    return NextResponse.json({ error: "Figure not found" }, { status: 404 });
  }

  const stats = getFigureStats(figure.id);
  const accountability = getAccountabilityForFigure(figure.id).slice(0, 5);

  return NextResponse.json({
    ...figure,
    stats,
    recentAccountability: accountability.map((r) => ({
      id: r.id,
      verdict: r.verdict,
      score: r.score,
      summary: r.summary,
      statementTitle: r.statement?.title,
      actionTitle: r.action?.title,
    })),
  });
}
