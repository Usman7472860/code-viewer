'use client';
import { Highlight, themes } from 'prism-react-renderer';
import CopyButton from './CopyButton';

const SAFE = new Set([
  'markup', 'bash', 'clike', 'c', 'cpp', 'css', 'javascript', 'jsx', 'coffee', 'diff',
  'git', 'go', 'graphql', 'handlebars', 'json', 'less', 'makefile', 'markdown',
  'objectivec', 'ocaml', 'python', 'reason', 'sass', 'scss', 'sql', 'stylus', 'tsx',
  'typescript', 'wasm', 'yaml',
]);

function safeLang(lang: string) {
  return SAFE.has(lang) ? lang : 'markdown';
}

type Props = {
  code: string;
  lang?: string;
  startLine?: number;
  filename?: string;
  maxHeight?: number;
  highlight?: [number, number] | null;
};

export default function CodeBlock({
  code,
  lang = 'tsx',
  startLine = 1,
  filename,
  maxHeight = 520,
  highlight = null,
}: Props) {
  return (
    <div className="overflow-hidden rounded-lg border border-slate-800 bg-ink-800">
      <div className="flex items-center justify-between border-b border-slate-800 px-3 py-1.5">
        <span className="truncate font-mono text-[11px] text-slate-500">{filename ?? lang}</span>
        <CopyButton text={code} />
      </div>

      <Highlight theme={themes.nightOwl} code={code.replace(/\n$/, '')} language={safeLang(lang)}>
        {({ tokens, getLineProps, getTokenProps }) => (
          <pre className="overflow-auto p-3 font-mono text-[12.5px] leading-5" style={{ maxHeight }}>
            {tokens.map((line, i) => {
              const n = startLine + i;
              const active = highlight ? n >= highlight[0] && n <= highlight[1] : false;
              const lineProps = getLineProps({ line });
              return (
                <div
                  key={i}
                  {...lineProps}
                  className={`table-row ${active ? 'bg-amber-400/10' : ''} ${lineProps.className ?? ''}`}
                >
                  <span className="table-cell w-10 select-none pr-3 text-right text-slate-600">
                    {n}
                  </span>
                  <span className="table-cell">
                    {line.map((token, k) => (
                      <span key={k} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </div>
  );
}