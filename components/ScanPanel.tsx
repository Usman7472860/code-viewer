'use client';
import { useState } from 'react';
import { apiGet } from '@/lib/api-client';
import LogicButton from './LogicButton';

type Meta = {
  stats: { fileCount: number; totalLines: number; logicCount: number; hardcodeCount: number };
  endpoints: number;
};

export default function ScanPanel() {
  const [state, setState] = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [meta, setMeta] = useState<Meta | null>(null);
  const [fingerprint, setFingerprint] = useState('');

  // @logic home.scan.run
  async function runScan() {
    setState('running');
    try {
      const [m, h] = await Promise.all([
        apiGet<Meta>('/meta'),
        apiGet<{ build: string }>('/health'),
      ]);
      setMeta(m);
      setFingerprint(h.build);
      setState('done');
    } catch {
      setState('error');
    }
  }

  return (
    <div className="rounded-2xl border border-slate-800 p-5">
      <h2 className="text-sm uppercase tracking-widest text-slate-500">Live self-scan</h2>
      <p className="mt-2 text-xs text-slate-400">
        Ye button actually aapke hi API ko call karta hai. Click karke dekho — Inspector me iska
        code khul jayega.
      </p>

      <div className="mt-3">
        <LogicButton
          logic="home.scan.run"
          variant="solid"
          onClick={runScan}
          disabled={state === 'running'}
        >
          {state === 'running' ? 'scanning…' : 'Run self-scan'}
        </LogicButton>
      </div>

      {state === 'error' && (
        <p className="mt-3 font-mono text-xs text-rose-400">
          scan failed — manifest generate kiya?
        </p>
      )}

      {meta && (
        <ul className="mt-4 space-y-1 font-mono text-[11px] text-slate-300">
          <li>files: {meta.stats.fileCount}</li>
          <li>lines: {meta.stats.totalLines}</li>
          <li>logic: {meta.stats.logicCount}</li>
          <li>hardcodes: {meta.stats.hardcodeCount}</li>
          <li>endpoints: {meta.endpoints}</li>
          <li className="text-amber-300">build: {fingerprint}</li>
        </ul>
      )}
    </div>
  );
}