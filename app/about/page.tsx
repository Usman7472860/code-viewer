import Link from 'next/link';
import { stats } from '@/lib/manifest';
import { ROUTES } from '@/lib/constants';
import CodeBlock from '@/components/CodeBlock';

const PIPELINE = `// scripts/generate-manifest.mjs
walk(repo)                  -> data/manifest.json
scan('// @logic <id>')      -> data/logic-map.json
scan('// @hardcode k = v')  -> data/hardcodes.json
scan('data-logic="<id>"')   -> logic -> trigger mapping`;

export default function AboutPage() {
  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-semibold text-white">Ye site khud ko kaise padhti hai</h1>

      <p className="text-slate-300">
        Build se pehle ek Node script poore repo ko walk karta hai aur teen JSON artifacts banata hai.
        Site runtime par sirf wahi JSON padhti hai — isliye har file, har handler aur har hardcoded
        value bina kisi manual list ke dikh jaati hai.
      </p>

      <CodeBlock code={PIPELINE} lang="markdown" filename="pipeline" />

      <h2 className="text-xl font-semibold text-white">Abhi ke scan ka result</h2>
      <ul className="space-y-1 font-mono text-sm text-slate-300">
        <li>files: {stats.fileCount}</li>
        <li>lines: {stats.totalLines}</li>
        <li>logic units: {stats.logicCount}</li>
        <li>hardcodes: {stats.hardcodeCount}</li>
        <li>generated: {stats.generatedAt || 'not scanned'}</li>
      </ul>

      <h2 className="text-xl font-semibold text-white">Annotations</h2>
      <ul className="list-inside list-disc space-y-1 text-slate-300">
        <li>
          <code className="font-mono text-sky-300">// @logic some.id</code> — iske neeche wala function
          block extract ho kar Logic Inspector me dikhta hai.
        </li>
        <li>
          <code className="font-mono text-sky-300">// @hardcode key = value</code> — hardcoded literal
          registry me chala jaata hai.
        </li>
        <li>
          <code className="font-mono text-sky-300">data-logic="some.id"</code> — button ko us logic se
          jodta hai, taaki click par code khule.
        </li>
      </ul>

      <p className="text-slate-400">
        Endpoints:{' '}
        <Link href={ROUTES.api} className="text-sky-300 hover:underline">
          API Explorer
        </Link>{' '}
        · Files:{' '}
        <Link href={ROUTES.viewer} className="text-sky-300 hover:underline">
          Source Viewer
        </Link>
      </p>
    </article>
  );
}