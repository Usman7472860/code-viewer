import { API_BASE, HARDCODED_API_KEY } from './constants';
import { AUTH_HEADER, API_TIMEOUT_MS } from './registry';

/**
 * Endpoint path ya to "/meta" ho sakta hai ya "/api/meta" — dono handle hote hain.
 */
function toUrl(path: string) {
  const origin = typeof window === 'undefined' ? 'http://localhost:3000' : window.location.origin;
  const full = path.startsWith(API_BASE) ? path : `${API_BASE}${path}`;
  return new URL(full, origin);
}

export async function apiGet<T>(
  path: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  const url = toUrl(path);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, String(v)));

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const res = await fetch(url.toString(), {
      headers: { [AUTH_HEADER]: HARDCODED_API_KEY },
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return (await res.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}