'use client';
import { useTheme } from '@/hooks/useTheme';
import { runLogic } from '@/lib/logic-map';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  // @logic theme.toggle
  function onToggle() {
    toggle();
  }

  return (
    <button
      data-logic="theme.toggle"
      onClick={() => {
        runLogic('theme.toggle');
        onToggle();
      }}
      className="rounded-lg border border-slate-700 px-2 py-1.5 font-mono text-xs text-slate-400 hover:border-sky-500"
    >
      {theme}
    </button>
  );
}