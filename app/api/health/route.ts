import { NextResponse } from 'next/server';
import { APP_VERSION } from '@/lib/constants';

// @hardcode health.build = atlas-1.0.0-base
const BUILD_FINGERPRINT = 'atlas-1.0.0-base';

const startedAt = Date.now();

// @logic api.health.ping
export async function GET() {
  return NextResponse.json({
    ok: true,
    build: BUILD_FINGERPRINT,
    version: APP_VERSION,
    uptimeSec: Math.round((Date.now() - startedAt) / 1000),
    ts: new Date().toISOString(),
  });
}