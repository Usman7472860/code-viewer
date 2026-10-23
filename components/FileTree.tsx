'use client';
import { useMemo, useState } from 'react';
import Link from 'next/link';
import type { TreeNode } from '@/lib/types';
import { buildTree, files } from '@/lib/manifest';

function Node({ node, active, depth }: { node: TreeNode; active: string; depth: number }) {
  const [open, setOpen] = useState(depth < 1);

  if (!node.dir) {
    return (
      <li>
        <Link
          href={`/viewer/${node.path}`}
          className={`block truncate rounded px-2 py-1 font-mono text-[11.5px] ${
            active === node.path ? 'bg-sky-500/15 text-sky-300' : 'text-slate-400 hover:bg-slate-800'
          }`}
          style={{ paddingLeft: 8 + depth * 12 }}
        >
          {node.name}
        </Link>
      </li>
    );
  }

  return (
    <li>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-1 rounded px-2 py-1 text-left font-mono text-[11.5px] text-slate-300 hover:bg-slate-800"
        style={{ paddingLeft: 8 + depth * 12 }}
      >
        <span className="text-slate-500">{open ? '▾' : '▸'}</span>
        {node.name}
      </button>
      {open && (
        <ul>
          {node.children.map((c) => (
            <Node key={c.path} node={c} active={active} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

export default function FileTree({ active }: { active: string }) {
  const [filter, setFilter] = useState('');

  const tree = useMemo(() => {
    const needle = filter.trim().toLowerCase();
    if (!needle) return buildTree();
    return buildTree(files.filter((f) => f.path.toLowerCase().includes(needle)));
  }, [filter]);

  return (
    <div className="space-y-2">
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="filter files"
        className="w-full rounded-lg border border-slate-700 bg-ink-800 px-3 py-1.5 font-mono text-xs outline-none focus:border-sky-500"
      />
      <ul className="max-h-[68vh] overflow-auto">
        {tree.map((n) => (
          <Node key={n.path} node={n} active={active} depth={0} />
        ))}
      </ul>
    </div>
  );
}