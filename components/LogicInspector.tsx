'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { LOGIC_EVENT, getLogicEntry, logicInFile, runLogic } from '@/lib/logic-map';
import CodeBlock from './CodeBlock';

export default function LogicInspector() {
  const [id, setId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  // @logic inspector.open
  function openPanel() {
    setOpen(true);
  }

  // @logic inspector.close
  function closePanel() {
    setOpen(false);
  }

  useEffect(() => {
    const handler = (e: Event) => {
      setId((e as CustomEvent<string>).detail);
      setOpen(true);
    };
    window.addEventListener(LOGIC_EVENT, handler);
    return () => window.removeEventListener(LOGIC_EVENT, handler);
  }, []);

  const entry = id ? getLogicEntry(id) : undefined;
  const siblings = entry ? logicInFile(entry.file).filter((l) => l.id !== entry.id) : [];

  if (!open) {
    return (
      <button
        data-logic="inspector.open"
        onClick={() => {
          runLogic('inspector.open');
          openPanel();
        }}
        className="fixed right-0 top-1/2 z-40 -translate-y-1/2 rounded-l-xl border border-r-0 border-slate-700 bg-ink-800 px-2 py-4 font-mono text-[11px] tracking-widest text-sky-300"
        style={{ writingMode: 'vertical-rl' }}
      >
        LOGIC INSPECTOR
      </button>
    );
  }

  return (
    <aside className="fixed right-0 top-0 z-50 flex h-full w-[420px] max-w-[94vw] flex-col border-l border-slate-800 bg-ink-900/95 backdrop-blur">
      <header className="flex items-start justify-between gap-3 border-b border-slate-800 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500">Logic Inspector</p>
          <h2 className="truncate font-mono text-sm text-sky-300">
            {entry?.id ?? 'kisi button par click karo'}
          </h2>
        </div>
        <button
          data-logic="inspector.close"
          onClick={() => {
            runLogic('inspector.close');
            closePanel();
          }}
          className="rounded border border-slate-700 px-2 py-0.5 text-slate-400 hover:border-sky-500"
        >
          ×
        </button>
      </header>

      <div className="flex-1 space-y-4 overflow-auto p-4">
        {!entry && (
          <p className="text-sm text-slate-400">
            Site par kisi bhi <span className="font-mono text-sky-300">ƒ</span> wale button par click
            karo — uska handler code, file path aur line range yahan aa jayega.
          </p>
        )}

        {entry && (
          <>
            <p className="text-sm text-slate-300">{entry.description}</p>

            <dl className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded border border-slate-800 p-2">
                <dt className="text-slate-500">file</dt>
                <dd className="truncate font-mono text-sky-300">{entry.file}</dd>
              </div>
              <div className="rounded border border-slate-800 p-2">
                <dt className="text-slate-500">lines</dt>
                <dd className="font-mono text-sky-300">
                  {entry.startLine}–{entry.endLine}
                </dd>
              </div>
              <div className="rounded border border-slate-800 p-2">
                <dt className="text-slate-500">inputs</dt>
                <dd className="font-mono text-slate-300">{entry.inputs.join(', ') || '—'}</dd>
              </div>
              <div className="rounded border border-slate-800 p-2">
                <dt className="text-slate-500">outputs</dt>
                <dd className="font-mono text-slate-300">{entry.outputs.join(', ') || '—'}</dd>
              </div>
            </dl>

            {entry.trigger && (
              <p className="text-xs text-slate-500">
                trigger: <span className="font-mono text-amber-300">{entry.trigger.file}</span>{' '}
                <span className="font-mono">{entry.trigger.attr}</span>
              </p>
            )}

            <CodeBlock
              code={entry.code}
              lang="tsx"
              startLine={entry.startLine}
              filename={`${entry.file}:${entry.startLine}`}
            />

            <Link
              href={`/viewer/${entry.file}`}
              className="inline-block text-xs text-sky-300 hover:underline"
            >
              full file viewer me kholo →
            </Link>

            {siblings.length > 0 && (
              <div>
                <p className="mb-2 text-[10px] uppercase tracking-widest text-slate-500">
                  same file ke logic
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {siblings.map((s) => (
                    <button
                      key={s.id}
                      data-logic={s.id}
                      onClick={() => {
                        runLogic(s.id);
                        setId(s.id);
                      }}
                      className="rounded border border-slate-700 px-2 py-1 font-mono text-[11px] text-slate-300 hover:border-sky-500"
                    >
                      {s.id}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </aside>
  );
}