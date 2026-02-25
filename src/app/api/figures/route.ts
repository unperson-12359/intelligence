import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { mockFigures, getAllFigureStats } from "@/lib/mock-data";
import { paginate } from "@/lib/pagination";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const typeFilter = searchParams.get("type");
  const query = searchParams.get("q")?.toLowerCase();
  const page = Number(searchParams.get("page")) || 1;
  const pageSize = Math.min(Number(searchParams.get("pageSize")) || 12, 50);

  let figures = [...mockFigures];

  if (typeFilter) {
    figures = figures.filter((f) => f.type === typeFilter);
  }
  if (query) {
    figures = figures.filter(
      (f) =>
        f.name.toLowerCase().includes(query) ||
        f.title.toLowerCase().includes(query)
    );
  }

  const allStats = getAllFigureStats();
  const result = paginate(figures, page, pageSize);

  return NextResponse.json({
    items: result.items.map((f) => ({
      id: f.id,
      slug: f.slug,
      name: f.name,
      title: f.title,
      type: f.type,
      party: f.party,
      state: f.state,
      country: f.country,
      overallScore: f.overallScore,
      stats: allStats.get(f.id),
    })),
    currentPage: result.currentPage,
    totalPages: result.totalPages,
    totalItems: result.totalItems,
  });
}
