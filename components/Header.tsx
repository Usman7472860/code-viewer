'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { APP_NAME, ROUTES } from '@/lib/constants';
import ThemeToggle from './ThemeToggle';

const NAV = [
  { href: ROUTES.home, label: 'Dashboard' },
  { href: ROUTES.viewer, label: 'Viewer' },
  { href: ROUTES.logic, label: 'Logic Map' },
  { href: ROUTES.api, label: 'API' },
  { href: ROUTES.about, label: 'About' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-slate-800 bg-ink-900/80 backdrop-blur">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-4 px-4 py-3">
        <Link href={ROUTES.home} className="font-mono text-sm font-semibold text-sky-300">
          ◆ {APP_NAME}
        </Link>
        <nav className="flex flex-1 flex-wrap gap-1">
          {NAV.map((n) => (
            <Link
              key={n.href}
              href={n.href}
              className={`rounded-lg px-3 py-1.5 text-xs ${
                pathname === n.href ? 'bg-sky-500/15 text-sky-300' : 'text-slate-400 hover:bg-slate-800'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}