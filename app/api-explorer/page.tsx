'use client';
import { useState } from 'react';
import { ENDPOINTS, HARDCODED_API_BLOCK } from '@/lib/registry';
import { apiGet } from '@/lib/api-client';
import ApiTable from '@/components/ApiTable';
import CodeBlock from '@/components/CodeBlock';
import LogicButton from '@/components/LogicButton';

export default function ApiExplorerPage() {
  const [selected, setSelected] = useState(ENDPOINTS[0]?.id ?? '');
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<{ ms: number; body: string } | null>(null);

  const ep = ENDPOINTS.find((e) => e.id === selected);

  // @logic apiExplorer.try
  async function tryEndpoint() {
    if (!ep) return;
    setBusy(true);
    const t0 = performance.now();
    try {
      const body = await apiGet(
        ep.path,
        ep.id === 'search.query' ? { q: 'manifest' } : {}
      );
      setResult({
        ms: Math.round(performance.now() - t0),
        body: JSON.stringify(body, null, 2).slice(0, 24000),
      });
    } catch (err) {
      setResult({ ms: Math.round(performance.now() - t0), body: String(err) });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-semibold text-white">API Explorer</h1>
        <p className="text-sm text-slate-400">
          {ENDPOINTS.length} registered endpoints. Ye registry hardcoded hai — uska raw block
          neeche bhi poora dikhaya gaya hai.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-800 p-4">
          <ApiTable selected={selected} onSelect={setSelected} />
        </section>

        <section className="space-y-3 rounded-2xl border border-slate-800 p-4">
          {ep ? (
            <>
              <div className="flex items-center gap-2">
                <span className="rounded bg-emerald-500/15 px-2 py-0.5 font-mono text-xs text-emerald-300">
                  {ep.method}
                </span>
                <span className="font-mono text-sm text-sky-300">{ep.path}</span>
              </div>
              <p className="text-sm text-slate-400">{ep.summary}</p>
              <p className="text-xs text-slate-500">
                handler: <span className="font-mono text-slate-300">{ep.handler}</span>
              </p>

              <table className="w-full text-left text-xs">
                <thead className="text-slate-500">
                  <tr>
                    <th className="py-1">param</th>
                    <th className="py-1">type</th>
                    <th className="py-1">note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {ep.params.length === 0 && (
                    <tr>
                      <td colSpan={3} className="py-2 text-slate-500">
                        no params
                      </td>
                    </tr>
                  )}
                  {ep.params.map((p) => (
                    <tr key={p.name}>
                      <td className="py-1 font-mono text-sky-300">
                        {p.name}
                        {p.required && <span className="text-rose-400">*</span>}
                      </td>
                      <td className="py-1 font-mono text-slate-400">{p.type}</td>
                      <td className="py-1 text-slate-500">{p.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <LogicButton logic="apiExplorer.try" variant="solid" onClick={tryEndpoint} disabled={busy}>
                {busy ? 'calling…' : 'Try it live'}
              </LogicButton>

              {result && (
                <>
                  <p className="font-mono text-xs text-amber-300">{result.ms} ms</p>
                  <CodeBlock code={result.body} lang="json" filename="response" maxHeight={320} />
                </>
              )}
            </>
          ) : (
            <p className="text-sm text-slate-500">endpoint select karo</p>
          )}
        </section>
      </div>

      <section className="space-y-2">
        <h2 className="text-sm uppercase tracking-widest text-slate-500">Hardcoded API block</h2>
        <CodeBlock
          code={HARDCODED_API_BLOCK}
          lang="json"
          filename="lib/registry.ts · HARDCODED_API_BLOCK"
          maxHeight={280}
        />
      </section>
    </div>
  );
}