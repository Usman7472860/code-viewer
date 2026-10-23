import Sidebar from '@/components/Sidebar';
import CodeViewer from '@/components/CodeViewer';
import { files } from '@/lib/manifest';

export default function ViewerPage({ params }: { params: { path?: string[] } }) {
  const rel = (params.path ?? []).join('/');
  const active =
    files.find((f) => f.path === rel) ??
    files.find((f) => f.path === 'README.md') ??
    files[0];

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[320px_1fr]">
      <Sidebar active={active?.path ?? ''} />
      {active ? (
        <CodeViewer file={active} />
      ) : (
        <div className="rounded-2xl border border-slate-800 p-6 text-slate-400">
          Koi file nahi mili. <code className="font-mono">npm run manifest</code> chalao.
        </div>
      )}
    </div>
  );
}