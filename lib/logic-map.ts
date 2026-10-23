import logicJson from '@/data/logic-map.json';
import type { LogicUnit } from './types';

const DESCRIPTIONS: Record<string, string> = {
  'home.scan.run': 'Poora self-scan chalata hai: /api/meta fetch karke build fingerprint dikhata hai.',
  'inspector.open': 'Logic Inspector panel ko slide-in karta hai.',
  'inspector.close': 'Logic Inspector panel band karta hai.',
  'logicPage.filter': 'Logic units ko id/file/description par filter karta hai.',
  'apiExplorer.try': 'Selected endpoint ko live call karta hai aur raw JSON response dikhata hai.',
  'viewer.raw.toggle': 'Highlighted view aur raw text view ke beech switch karta hai.',
  'viewer.copy.path': 'Active file ka path clipboard me copy karta hai.',
  'search.run': 'Repo-wide grep chala kar hits ko viewer me bhejta hai.',
};

const IO: Record<string, { inputs: string[]; outputs: string[] }> = {
  'home.scan.run': { inputs: ['—'], outputs: ['meta state', 'status: done|error'] },
  'apiExplorer.try': { inputs: ['endpoint.id'], outputs: ['response JSON', 'latency ms'] },
  'search.run': { inputs: ['query'], outputs: ['Hit[]'] },
  'viewer.raw.toggle': { inputs: ['rawMode'], outputs: ['re-render'] },
};

export type LogicEntry = LogicUnit & {
  description: string;
  inputs: string[];
  outputs: string[];
};

export const LOGIC: LogicEntry[] = Object.values(logicJson as Record<string, LogicUnit>)
  .map((u) => ({
    ...u,
    description: DESCRIPTIONS[u.id] ?? 'Auto-extracted logic unit.',
    inputs: IO[u.id]?.inputs ?? [],
    outputs: IO[u.id]?.outputs ?? [],
  }))
  .sort((a, b) => a.id.localeCompare(b.id));

export const LOGIC_BY_ID = new Map(LOGIC.map((l) => [l.id, l]));

export function getLogicEntry(id: string) {
  return LOGIC_BY_ID.get(id);
}

export function logicInFile(file: string) {
  return LOGIC.filter((l) => l.file === file);
}

export const LOGIC_EVENT = 'atlas:logic';

export function runLogic(id: string) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent<string>(LOGIC_EVENT, { detail: id }));
}