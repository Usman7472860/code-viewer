'use client';
import FileTree from './FileTree';
import SearchBar from './SearchBar';
import { files } from '@/lib/manifest';
import { SIDEBAR_WIDTH } from '@/lib/constants';

export default function Sidebar({ active }: { active: string }) {
  return (
    <aside
      className="space-y-3 rounded-2xl border border-slate-800 bg-ink-900/60 p-3"
      style={{ maxWidth: SIDEBAR_WIDTH }}
    >
      <p className="px-1 text-[10px] uppercase tracking-widest text-slate-500">
        {files.length} files tracked
      </p>
      <SearchBar />
      <FileTree active={active} />
    </aside>
  );
}