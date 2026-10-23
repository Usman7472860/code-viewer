'use client';
import { useClipboard } from '@/hooks/useClipboard';

export default function CopyButton({ text, label = 'copy' }: { text: string; label?: string }) {
  const { copied, copy } = useClipboard();

  return (
    <button
      onClick={() => copy(text)}
      className="rounded border border-slate-700 px-2 py-0.5 text-[11px] text-slate-400 hover:border-sky-500"
    >
      {copied ? 'copied' : label}
    </button>
  );
}