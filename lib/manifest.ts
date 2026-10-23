import manifestJson from '@/data/manifest.json';
import logicJson from '@/data/logic-map.json';
import hardJson from '@/data/hardcodes.json';
import type { FileRecord, Hardcode, LogicUnit, Manifest, TreeNode } from './types';

export const manifest = manifestJson as unknown as Manifest;
export const stats = manifest.stats;
export const files: FileRecord[] = manifest.files;
export const logicUnits: LogicUnit[] = Object.values(logicJson as Record<string, LogicUnit>);
export const hardcodes: Hardcode[] = hardJson as Hardcode[];

export const fileMap = new Map(files.map((f) => [f.path, f]));

export function getFile(rel: string) {
  return fileMap.get(rel.replace(/^\/+/, ''));
}

export function buildTree(records: FileRecord[] = files): TreeNode[] {
  const root: TreeNode = { name: '', path: '', dir: true, children: [] };

  for (const f of records) {
    const parts = f.path.split('/');
    let node = root;
    parts.forEach((part, i) => {
      const isLeaf = i === parts.length - 1;
      let next = node.children.find((c) => c.name === part && c.dir === !isLeaf);
      if (!next) {
        next = { name: part, path: parts.slice(0, i + 1).join('/'), dir: !isLeaf, children: [] };
        node.children.push(next);
      }
      node = next;
    });
  }

  const sort = (n: TreeNode) => {
    n.children.sort((a, b) => (a.dir === b.dir ? a.name.localeCompare(b.name) : a.dir ? -1 : 1));
    n.children.forEach(sort);
  };
  sort(root);

  return root.children;
}