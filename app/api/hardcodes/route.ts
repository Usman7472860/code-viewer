import { NextRequest, NextResponse } from 'next/server';
import { hardcodes } from '@/lib/manifest';

// @logic api.hardcodes.list
export async function GET(req: NextRequest) {
  const q = (req.nextUrl.searchParams.get('q') ?? '').toLowerCase();
  const items = q ? hardcodes.filter((h) => h.key.toLowerCase().includes(q)) : hardcodes;
  return NextResponse.json({ count: items.length, items });
}