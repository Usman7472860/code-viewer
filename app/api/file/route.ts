import { NextRequest, NextResponse } from 'next/server';
import { files } from '@/lib/manifest';

// @logic api.file.read
export async function GET(req: NextRequest) {
  const sp = req.nextUrl.searchParams;
  const p = sp.get('path');
  if (!p) return NextResponse.json({ error: 'path required' }, { status: 400 });

  const file = files.find((f) => f.path === p);
  if (!file) return NextResponse.json({ error: 'not found', path: p }, { status: 404 });

  const from = Math.max(1, Number(sp.get('from') ?? 1));
  const to = Math.min(file.lines, Number(sp.get('to') ?? file.lines));
  const slice = file.content.split('\n').slice(from - 1, to).join('\n');

  return NextResponse.json({
    path: file.path,
    lang: file.lang,
    lines: file.lines,
    hash: file.hash,
    from,
    to,
    slice,
  });
}