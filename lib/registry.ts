import type { Endpoint } from './types';
import { API_BASE, HARDCODED_API_KEY } from './constants';

// @hardcode api.authHeader = x-atlas-key
export const AUTH_HEADER = 'x-atlas-key';

// @hardcode api.registryVersion = 3
export const REGISTRY_VERSION = 3;

// @hardcode api.timeoutMs = 8000
export const API_TIMEOUT_MS = 8000;

export const ENDPOINTS: Endpoint[] = [
  {
    id: 'files.list',
    method: 'GET',
    path: '/api/files',
    handler: 'app/api/files/route.ts',
    summary: 'Poora file index return karta hai (content optional).',
    hardcoded: false,
    params: [
      { name: 'prefix', type: 'string', required: false, note: 'path prefix filter' },
      { name: 'ext', type: 'string', required: false, note: 'extension filter' },
      { name: 'limit', type: 'number', required: false, note: 'default 500, max 2000' },
      { name: 'content', type: '"1"', required: false, note: 'content bhi bhejo' },
    ],
    response: '{ count, total, rows[] }',
  },
  {
    id: 'file.read',
    method: 'GET',
    path: '/api/file',
    handler: 'app/api/file/route.ts',
    summary: 'Ek file ka slice padhta hai line range ke saath.',
    hardcoded: false,
    params: [
      { name: 'path', type: 'string', required: true, note: 'repo-relative path' },
      { name: 'from', type: 'number', required: false, note: 'default 1' },
      { name: 'to', type: 'number', required: false, note: 'default last line' },
    ],
    response: '{ path, lang, lines, hash, slice }',
  },
  {
    id: 'search.query',
    method: 'GET',
    path: '/api/search',
    handler: 'app/api/search/route.ts',
    summary: 'Poora repo grep karta hai, scored hits deta hai.',
    hardcoded: false,
    params: [
      { name: 'q', type: 'string', required: true, note: 'query' },
      { name: 'limit', type: 'number', required: false, note: 'default 60' },
    ],
    response: '{ query, count, hits[] }',
  },
  {
    id: 'logic.list',
    method: 'GET',
    path: '/api/logic',
    handler: 'app/api/logic/route.ts',
    summary: 'Saare extracted logic units deta hai.',
    hardcoded: false,
    params: [{ name: 'id', type: 'string', required: false, note: 'single unit' }],
    response: '{ count, units[] }',
  },
  {
    id: 'hardcodes.list',
    method: 'GET',
    path: '/api/hardcodes',
    handler: 'app/api/hardcodes/route.ts',
    summary: 'Saare tagged hardcoded literals.',
    hardcoded: false,
    params: [{ name: 'q', type: 'string', required: false, note: 'key filter' }],
    response: '{ count, items[] }',
  },
  {
    id: 'meta.summary',
    method: 'GET',
    path: '/api/meta',
    handler: 'app/api/meta/route.ts',
    summary: 'Build stats, language histogram, registry summary.',
    hardcoded: false,
    params: [],
    response: '{ stats, endpoints, logicCount }',
  },
  {
    id: 'health.ping',
    method: 'GET',
    path: '/api/health',
    handler: 'app/api/health/route.ts',
    summary: 'Liveness + uptime + hardcoded build fingerprint.',
    hardcoded: true,
    params: [],
    response: '{ ok, uptime, build }',
  },
];

export const HARDCODED_API_BLOCK = `{
  "base": "${API_BASE}",
  "authHeader": "${AUTH_HEADER}",
  "key": "${HARDCODED_API_KEY}",
  "timeoutMs": ${API_TIMEOUT_MS},
  "registryVersion": ${REGISTRY_VERSION},
  "endpoints": ${JSON.stringify(ENDPOINTS.map((e) => e.path), null, 2)}
}`;

export function endpointById(id: string) {
  return ENDPOINTS.find((e) => e.id === id);
}