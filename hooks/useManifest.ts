'use client';
import { useEffect, useState } from 'react';
import type { Manifest } from '@/lib/types';
import { fetchManifest } from '@/lib/api-client';

export function useManifest() {
  const [manifest, setManifest] = useState<Manifest | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    fetchManifest().then(setManifest).catch((e) => setError(String(e)));
  }, []);
  return { manifest, error };
}
