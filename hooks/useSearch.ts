'use client';
import { useEffect, useState } from 'react';
import { search, type Hit } from '@/lib/search';
import { SEARCH_DEBOUNCE_MS } from '@/lib/constants';

export function useSearch(initial = '') {
  const [query, setQuery] = useState(initial);
  const [hits, setHits] = useState<Hit[]>([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setBusy(true);
    const t = setTimeout(() => {
      setHits(query.trim() ? search(query) : []);
      setBusy(false);
    }, SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [query]);

  return { query, setQuery, hits, busy };
}