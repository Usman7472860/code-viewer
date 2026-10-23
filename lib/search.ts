import { files } from './manifest';

export type Hit = { path: string; line: number; text: string; score: number };

export function search(query: string, limit = 60): Hit[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const hits: Hit[] = [];

  for (const f of files) {
    if (f.path.toLowerCase().includes(q)) {
      hits.push({ path: f.path, line: 0, text: f.path, score: 120 });
    }
    const lines = f.content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      const idx = lines[i].toLowerCase().indexOf(q);
      if (idx === -1) continue;
      hits.push({
        path: f.path,
        line: i + 1,
        text: lines[i].trim().slice(0, 200),
        score: 60 - Math.min(40, i / 40) + (idx === 0 ? 8 : 0),
      });
    }
  }

  return hits.sort((a, b) => b.score - a.score).slice(0, limit);
}