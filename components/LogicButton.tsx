'use client';
import clsx from 'clsx';
import { runLogic } from '@/lib/logic-map';

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  logic: string;
  variant?: 'solid' | 'outline' | 'ghost';
};

export default function LogicButton({
  logic,
  variant = 'outline',
  className,
  onClick,
  children,
  ...rest
}: Props) {
  return (
    <button
      data-logic={logic}
      onClick={(e) => {
        runLogic(logic);
        onClick?.(e);
      }}
      className={clsx(
        'inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition disabled:opacity-50',
        variant === 'solid' && 'bg-sky-500 text-slate-950 hover:bg-sky-400',
        variant === 'outline' && 'border border-slate-700 hover:border-sky-500',
        variant === 'ghost' && 'hover:bg-slate-800',
        className
      )}
      {...rest}
    >
      {children}
      <span className="font-mono text-[10px] text-slate-500" title={`logic: ${logic}`}>
        ƒ
      </span>
    </button>
  );
}