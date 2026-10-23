#!/usr/bin/env node
import { readFileSync } from 'node:fs';

const logic = JSON.parse(readFileSync('data/logic-map.json', 'utf8'));
const manifest = JSON.parse(readFileSync('data/manifest.json', 'utf8'));
const ids = new Set(Object.keys(logic));
const missing = [];

for (const f of manifest.files) {
  const re = /data-logic=["']([A-Za-z0-9._-]+)["']/g;
  let m;
  while ((m = re.exec(f.content)) !== null) {
    if (!ids.has(m[1])) missing.push(`${f.path} -> ${m[1]}`);
  }
}

if (missing.length) {
  console.error('Missing @logic markers:\n' + missing.join('\n'));
  process.exit(1);
}
console.log(`[check] all ${ids.size} logic ids resolved`);