'use client';
import { useState } from 'react';
import type { FileRecord } from '@/lib/types';
import { logicInFile, runLogic } from '@/lib/logic-map';
import CodeBlock from './CodeBlock';
import CopyButton from './CopyButton';

export default function CodeViewer({ file }: { file: FileRecord }) {
  const [raw, setRaw] = useState(false);
  const related = logicInFile(file.path);

  // @logic viewer.raw.toggle
  function toggleRaw() {
    setRaw((v) => !v);
  }

  return (
    <section className="space-y-3">
      <header className="rounded-2xl border border-slate-800 p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="min-w-0">
            <h1 className="truncate font-mono text-sm text-sky-300">{file.path}</h1>
            <p className="mt-1 font-mono text-xs text-slate-500">
              {file.lang} · {file.lines} lines · {(file.bytes / 1024).toFixed(1)} KB · sha1 {file.hash}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              data-logic="viewer.raw.toggle"
              onClick={() => {
                runLogic('viewer.raw.toggle');
                toggleRaw();
              }}
              className="rounded border border-slate-700 px-3 py-1.5 text-xs hover:border-sky-500"
            >
              {raw ? 'highlighted' : 'raw text'}
            </button>
            <CopyButton text={file.path} label="copy path" />
            <CopyButton text={file.content} label="copy code" />
          </div>
        </div>
      </header>

      {raw ? (
        <pre className="max-h-[70vh] overflow-auto rounded-2xl border border-slate-800 bg-ink-800 p-4 font-mono text-[12.5px] leading-5 text-slate-300">
          {file.content}
        </pre>
      ) : (
        <CodeBlock code={file.content} lang={file.lang} filename={file.path} maxHeight={720} />
      )}

      {related.length > 0 && (
        <div className="rounded-2xl border border-slate-800 p-4">
          <p className="text-[10px] uppercase tracking-widest text-slate-500">logic in this file</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {related.map((l) => (
              <button
                key={l.id}
                data-logic={l.id}
                onClick={() => runLogic(l.id)}
                className="rounded border border-slate-700 px-2 py-1 font-mono text-[11px] text-sky-300 hover:border-sky-500"
              >
                {l.id} · L{l.startLine}
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}