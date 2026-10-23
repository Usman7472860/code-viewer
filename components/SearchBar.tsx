'use client';
import Link from 'next/link';
import { useSearch } from '@/hooks/useSearch';

export default function SearchBar() {
  const { query, setQuery, hits, busy } = useSearch();

  // @logic search.run
  function onQueryChange(value: string) {
    setQuery(value);
  }

  return (
    <div className="relative">
      <input
        value={query}
        data-logic="search.run"
        onChange={(e) => onQueryChange(e.target.value)}
        placeholder="grep repo..."
        className="w-full rounded-lg border border-slate-700 bg-ink-800 px-3 py-2 font-mono text-xs outline-none focus:border-sky-500"
      />

      {query.trim() && (
        <ul className="absolute z-30 mt-1 max-h-72 w-full overflow-auto rounded-lg border border-slate-700 bg-ink-900 p-1 shadow-2xl">
          {busy && <li className="px-2 py-1 text-xs text-slate-500">searching…</li>}
          {!busy && hits.length === 0 && (
            <li className="px-2 py-1 text-xs text-slate-500">no hits</li>
          )}
          {hits.map((h, i) => (
            <li key={`${h.path}-${h.line}-${i}`}>
              <Link href={`/viewer/${h.path}`} className="block rounded px-2 py-1.5 hover:bg-slate-800">
                <span className="block font-mono text-[11px] text-sky-300">
                  {h.path}
                  {h.line ? `:${h.line}` : ''}
                </span>
                <span className="block truncate font-mono text-[11px] text-slate-400">{h.text}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}