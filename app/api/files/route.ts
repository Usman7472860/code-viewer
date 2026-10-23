import { NextRequest, NextResponse } from 'next/server';
import { files } from '@/lib/manifest';

// @logic api.files.list
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const prefix = sp.get('prefix') ?? '';
  const ext = sp.get('ext') ?? '';
  const limit = Math.min(Number(sp.get('limit') ?? 500), 2000);
  const withContent = sp.get('content') === '1';

  const rows = files
    .filter((f) => f.path.startsWith(prefix))
    .filter((f) => (ext ? f.path.endsWith(`.${ext}`) : true))
    .slice(0, limit)
    .map((f) =>
      withContent ? f : { path: f.path, lang: f.lang, bytes: f.bytes, lines: f.lines, hash: f.hash }
    );

  return NextResponse.json({ count: rows.length, total: files.length, rows });
}