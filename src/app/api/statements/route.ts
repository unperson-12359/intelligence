import { NextRequest, NextResponse } from 'next/server';
import { mockStatements, mockFigures } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const figureId = searchParams.get('figureId');
  const type = searchParams.get('type');
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get('pageSize') || '20')));

  let statements = [...mockStatements];

  if (figureId) {
    statements = statements.filter((s) => s.figureId === figureId);
  }
  if (type) {
    statements = statements.filter((s) => s.type === type);
  }

  // Sort by date (newest first)
  statements.sort((a, b) => new Date(b.dateOccurred).getTime() - new Date(a.dateOccurred).getTime());

  const total = statements.length;
  const start = (page - 1) * pageSize;
  const paged = statements.slice(start, start + pageSize);

  // Enrich with figure name
  const enriched = paged.map((s) => {
    const figure = mockFigures.find((f) => f.id === s.figureId);
    return { ...s, figureName: figure?.name ?? 'Unknown', figureSlug: figure?.slug ?? '' };
  });

  return NextResponse.json({
    data: enriched,
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
}
