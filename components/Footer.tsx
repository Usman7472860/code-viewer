import { APP_VERSION } from '@/lib/constants';
import { stats } from '@/lib/manifest';

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-800 px-4 py-6">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-2 font-mono text-[11px] text-slate-500">
        <span>SourceCode Atlas v{APP_VERSION} · self-inspecting</span>
        <span>
          {stats.fileCount} files · {stats.totalLines} lines · {stats.logicCount} logic units ·{' '}
          {stats.hardcodeCount} hardcodes
        </span>
      </div>
    </footer>
  );
}