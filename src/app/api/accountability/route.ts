import { NextRequest, NextResponse } from 'next/server';
import { mockAccountabilityRecords, mockFigures, mockStatements, mockActions } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const figureId = searchParams.get('figureId');
  const verdict = searchParams.get('verdict');
  const page = Math.max(1, parseInt(searchParams.get('page') || '1'));
  const pageSize = Math.min(50, Math.max(1, parseInt(searchParams.get('pageSize') || '20')));

  let records = [...mockAccountabilityRecords];

  if (figureId) {
    records = records.filter((r) => r.figureId === figureId);
  }
  if (verdict) {
    records = records.filter((r) => r.verdict === verdict);
  }

  // Sort by score (lowest first — worst offenders)
  records.sort((a, b) => a.score - b.score);

  const total = records.length;
  const start = (page - 1) * pageSize;
  const paged = records.slice(start, start + pageSize);

  const enriched = paged.map((r) => {
    const figure = mockFigures.find((f) => f.id === r.figureId);
    const statement = mockStatements.find((s) => s.id === r.statementId);
    const action = r.actionId ? mockActions.find((a) => a.id === r.actionId) : null;
    return {
      ...r,
      figureName: figure?.name ?? 'Unknown',
      figureSlug: figure?.slug ?? '',
      statementTitle: statement?.title ?? '',
      actionTitle: action?.title ?? null,
    };
  });

  return NextResponse.json({
    data: enriched,
    pagination: { page, pageSize, total, totalPages: Math.ceil(total / pageSize) },
  });
}
