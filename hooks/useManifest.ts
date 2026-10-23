'use client';
import { manifest } from '@/lib/manifest';

export function useManifest() {
  return { manifest, error: null as string | null };
}
