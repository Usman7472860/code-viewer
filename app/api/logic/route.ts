import { NextRequest, NextResponse } from 'next/server';
import { LOGIC } from '@/lib/logic-map';

// @logic api.logic.list
export async function GET(req: NextRequest) {
  const id = req.nextUrl.searchParams.get('id');

  if (id) {
    const unit = LOGIC.find((l) => l.id === id);
    if (!unit) return NextResponse.json({ error: 'not found', id }, { status: 404 });
    return NextResponse.json(unit);
  }

  return NextResponse.json({ count: LOGIC.length, units: LOGIC });
}