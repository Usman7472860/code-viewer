import { NextResponse } from 'next/server';
import { stats, files } from '@/lib/manifest';
import { ENDPOINTS, REGISTRY_VERSION } from '@/lib/registry';
import { LOGIC } from '@/lib/logic-map';

// @logic api.meta.summary
export async function GET() {
  return NextResponse.json({
    stats,
    endpoints: ENDPOINTS.length,
    endpointIds: ENDPOINTS.map((e) => e.id),
    logicCount: LOGIC.length,
    registryVersion: REGISTRY_VERSION,
    langs: stats.langs,
    top: [...files]
      .sort((a, b) => b.lines - a.lines)
      .slice(0, 10)
      .map((f) => f.path),
  });
}