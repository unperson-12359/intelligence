import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { mockFigures, mockStatements, mockActions } from "@/lib/mock-data";
import { paginate } from "@/lib/pagination";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const query = searchParams.get("q")?.toLowerCase();
  const page = Number(searchParams.get("page")) || 1;

  if (!query) {
    return NextResponse.json(
      { error: "Query parameter 'q' is required" },
      { status: 400 }
    );
  }

  const figures = mockFigures.filter(
    (f) =>
      f.name.toLowerCase().includes(query) ||
      f.title.toLowerCase().includes(query)
  );

  const statements = mockStatements.filter(
    (s) =>
      s.title.toLowerCase().includes(query) ||
      s.content.toLowerCase().includes(query)
  );

  const actions = mockActions.filter(
    (a) =>
      a.title.toLowerCase().includes(query) ||
      a.description.toLowerCase().includes(query)
  );

  return NextResponse.json({
    query,
    figures: paginate(
      figures.map((f) => ({ id: f.id, slug: f.slug, name: f.name, title: f.title })),
      page,
      10
    ),
    statements: paginate(
      statements.map((s) => ({ id: s.id, title: s.title, figureId: s.figureId, type: s.type })),
      page,
      10
    ),
    actions: paginate(
      actions.map((a) => ({ id: a.id, title: a.title, figureId: a.figureId, type: a.type })),
      page,
      10
    ),
    totalResults: figures.length + statements.length + actions.length,
  });
}
