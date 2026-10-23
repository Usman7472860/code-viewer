import Link from 'next/link';
import { files, stats, hardcodes } from '@/lib/manifest';
import { ENDPOINTS } from '@/lib/registry';
import { LOGIC } from '@/lib/logic-map';
import { APP_VERSION, ROUTES } from '@/lib/constants';
import StatCard from '@/components/StatCard';
import ScanPanel from '@/components/ScanPanel';

export default function HomePage() {
  const biggest = [...files].sort((a, b) => b.lines - a.lines).slice(0, 6);

  return (
    <div className="space-y-8">
      <section className="atlas-grid rounded-2xl border border-slate-800 p-8">
        <p className="text-xs uppercase tracking-[0.3em] text-sky-400">self-inspecting build</p>
        <h1 className="mt-3 text-4xl font-semibold text-white">SourceCode Atlas</h1>
        <p className="mt-3 max-w-2xl text-slate-400">
          Ye site apna hi source code padhti hai. Har file, har API route, har hardcoded value,
          aur har button ka handler — sab runtime par inspect ho sakta hai.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={ROUTES.viewer}
            className="rounded-lg bg-sky-500 px-4 py-2 text-sm font-medium text-slate-950 hover:bg-sky-400"
          >
            Open Source Viewer
          </Link>
          <Link
            href={ROUTES.logic}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-sky-500"
          >
            Logic Map
          </Link>
          <Link
            href={ROUTES.api}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:border-sky-500"
          >
            API Explorer
          </Link>
        </div>
        <p className="mt-4 font-mono text-xs text-slate-500">
          build {APP_VERSION} · generated {stats.generatedAt || 'not scanned yet'}
        </p>
      </section>

      <section className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Files" value={stats.fileCount} hint="manifest tracked" />
        <StatCard label="Lines" value={stats.totalLines} hint={`${(stats.totalBytes / 1024).toFixed(1)} KB`} />
        <StatCard label="Logic units" value={LOGIC.length} hint="click-to-inspect" />
        <StatCard label="Hardcodes" value={hardcodes.length} hint="tagged literals" />
      </section>

      <section className="grid gap-4 lg:grid-cols-[1fr_360px]">
        <div className="rounded-2xl border border-slate-800 p-5">
          <h2 className="text-sm uppercase tracking-widest text-slate-500">Largest modules</h2>
          {biggest.length === 0 && (
            <p className="mt-3 text-sm text-slate-500">
              Manifest khali hai — <code className="font-mono">npm run manifest</code> chalao.
            </p>
          )}
          <ul className="mt-3 divide-y divide-slate-800">
            {biggest.map((f) => (
              <li key={f.path} className="flex items-center justify-between py-2">
                <Link href={`/viewer/${f.path}`} className="font-mono text-sm text-sky-300 hover:underline">
                  {f.path}
                </Link>
                <span className="text-xs text-slate-500">{f.lines} lines</span>
              </li>
            ))}
          </ul>
        </div>
        <ScanPanel />
      </section>

      <section className="rounded-2xl border border-slate-800 p-5">
        <h2 className="text-sm uppercase tracking-widest text-slate-500">Registered endpoints</h2>
        <p className="mt-2 text-sm text-slate-400">
          {ENDPOINTS.length} endpoints ·{' '}
          <Link className="text-sky-300 hover:underline" href={ROUTES.api}>
            open explorer
          </Link>
        </p>
      </section>
    </div>
  );
}