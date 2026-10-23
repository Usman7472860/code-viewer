'use client';
import Link from 'next/link';
import { ENDPOINTS } from '@/lib/registry';

export default function ApiTable({
  selected,
  onSelect,
}: {
  selected: string;
  onSelect: (id: string) => void;
}) {
  return (
    <table className="w-full text-left text-xs">
      <thead className="text-slate-500">
        <tr>
          <th className="px-2 py-2">method</th>
          <th className="px-2 py-2">path</th>
          <th className="px-2 py-2">handler</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-800">
        {ENDPOINTS.map((e) => (
          <tr
            key={e.id}
            onClick={() => onSelect(e.id)}
            className={`cursor-pointer ${selected === e.id ? 'bg-sky-500/10' : 'hover:bg-slate-800/50'}`}
          >
            <td className="px-2 py-2 font-mono text-emerald-400">{e.method}</td>
            <td className="px-2 py-2 font-mono text-sky-300">{e.path}</td>
            <td className="px-2 py-2">
              <Link href={`/viewer/${e.handler}`} className="font-mono text-slate-400 hover:underline">
                {e.handler}
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}