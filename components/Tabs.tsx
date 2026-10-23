'use client';
import { useState } from 'react';

type Tab = { label: string; content: React.ReactNode };

export default function Tabs({ tabs }: { tabs: Tab[] }) {
  const [i, setI] = useState(0);
  return (
    <div>
      <div className="mb-3 flex gap-2 border-b dark:border-slate-800">
        {tabs.map((t, idx) => (
          <button key={t.label} onClick={() => setI(idx)} className={`px-3 py-2 text-sm ${i === idx ? 'border-b-2 border-blue-600 font-semibold' : 'opacity-70'}`}>
            {t.label}
          </button>
        ))}
      </div>
      {tabs[i].content}
    </div>
  );
}
