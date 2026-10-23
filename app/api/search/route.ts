import { NextRequest, NextResponse } from 'next/server';
import { search } from '@/lib/search';

// @logic api.search.query
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const q = sp.get('q') ?? '';
  const limit = Math.min(Number(sp.get('limit') ?? 60), 300);

  if (!q) return NextResponse.json({ error: 'q required' }, { status: 400 });

  const hits = search(q, limit);
  return NextResponse.json({ query: q, count: hits.length, hits });
}