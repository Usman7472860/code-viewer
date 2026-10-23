import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="rounded-2xl border border-slate-800 p-10 text-center">
      <p className="font-mono text-4xl text-sky-300">404</p>
      <p className="mt-2 text-slate-400">Ye path manifest me nahi mila.</p>
      <Link
        href="/"
        className="mt-4 inline-block rounded-lg bg-sky-500 px-4 py-2 text-sm text-slate-950"
      >
        Dashboard
      </Link>
    </div>
  );
}