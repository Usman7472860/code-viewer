'use client';
import { useMemo, useState } from 'react';
import { LOGIC, runLogic } from '@/lib/logic-map';
import CodeBlock from '@/components/CodeBlock';

export default function LogicPage() {
  const [q, setQ] = useState('');
  const [openId, setOpenId] = useState<string | null>(null);

  // @logic logicPage.filter
  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return LOGIC;
    return LOGIC.filter((l) =>
      `${l.id} ${l.file} ${l.description}`.toLowerCase().includes(needle)
    );
  }, [q]);

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold text-white">Logic Map</h1>
          <p className="text-sm text-slate-400">
            {LOGIC.length} units auto-extracted. Kisi bhi row par click karo — Inspector me usi ka code khulega.
          </p>
        </div>
        <input
          value={q}
          data-logic="logicPage.filter"
          onChange={(e) => {
            runLogic('logicPage.filter');
            setQ(e.target.value);
          }}
          placeholder="filter id / file / description"
          className="w-72 rounded-lg border border-slate-700 bg-ink-800 px-3 py-2 font-mono text-sm outline-none focus:border-sky-500"
        />
      </header>

      {LOGIC.length === 0 && (
        <p className="rounded-xl border border-slate-800 p-4 text-sm text-slate-400">
          Logic map khali hai — <code className="font-mono">npm run manifest</code> chalao.
        </p>
      )}

      <ul className="space-y-2">
        {list.map((l) => (
          <li key={l.id} className="rounded-xl border border-slate-800 bg-ink-800/50">
            <button
              data-logic={l.id}
              onClick={() => {
                runLogic(l.id);
                setOpenId((prev) => (prev === l.id ? null : l.id));
              }}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <span className="font-mono text-sm text-sky-300">{l.id}</span>
              <span className="font-mono text-[11px] text-slate-500">
                {l.file}:{l.startLine}
              </span>
            </button>

            {openId === l.id && (
              <div className="space-y-3 border-t border-slate-800 p-4">
                <p className="text-sm text-slate-400">{l.description}</p>
                {l.trigger && (
                  <p className="font-mono text-[11px] text-amber-300">
                    trigger: {l.trigger.file} · {l.trigger.attr}
                  </p>
                )}
                <CodeBlock
                  code={l.code}
                  lang="tsx"
                  startLine={l.startLine}
                  filename={`${l.file}:${l.startLine}-${l.endLine}`}
                />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}