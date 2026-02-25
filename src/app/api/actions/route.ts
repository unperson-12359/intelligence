import { NextRequest, NextResponse } from 'next/server';
import { mockActions, mockFigures } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const figureId = searchParams.get('figureId');
  const type = searchParams.get('type');
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get('pageSize') || '20')));

  let actions = [...mockActions];

  if (figureId) {
    actions = actions.filter((a) => a.figureId === figureId);
  }
  if (type) {
    actions = actions.filter((a) => a.type === type);
  }

  // Sort by date (newest first)
  actions.sort((a, b) => new Date(b.dateOccurred).getTime() - new Date(a.dateOccurred).getTime());

  const total = actions.length;
  const start = (page - 1) * pageSize;
  const paged = actions.slice(start, start + pageSize);

  const enriched = paged.map((a) => {
    const figure = mockFigures.find((f) => f.id === a.figureId);
    return { ...a, figureName: figure?.name ?? 'Unknown', figureSlug: figure?.slug ?? '' };
  });

  return NextResponse.json({
    data: enriched,
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
}
