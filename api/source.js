// Vercel serverless function: fetches a page's HTML on the server (browsers can't, because of CORS)
const dns = require('dns').promises;
const net = require('net');

const MAX_BYTES = 3 * 1024 * 1024; // 3 MB
const MAX_REDIRECTS = 5;

function isPrivateIp(ip) {
  if (net.isIPv4(ip)) {
    const [a, b] = ip.split('.').map(Number);
    return (
      a === 0 || a === 10 || a === 127 ||
      (a === 169 && b === 254) ||
      (a === 172 && b >= 16 && b <= 31) ||
      (a === 192 && b === 168) ||
      (a === 100 && b >= 64 && b <= 127)
    );
  }
  const v = ip.toLowerCase();
  if (v.startsWith('::ffff:')) return isPrivateIp(v.slice(7));
  return v === '::1' || v === '::' || v.startsWith('fc') || v.startsWith('fd') || v.startsWith('fe80');
}

async function assertPublic(urlObj) {
  if (!['http:', 'https:'].includes(urlObj.protocol)) throw new Error('Only http and https links work.');
  const host = urlObj.hostname.replace(/^\[|\]$/g, '');
  const ips = net.isIP(host) ? [host] : (await dns.lookup(host, { all: true })).map((r) => r.address);
  if (!ips.length || ips.some(isPrivateIp)) throw new Error('This address is not allowed.');
}

async function readLimited(res) {
  const reader = res.body.getReader();
  const chunks = [];
  let total = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    total += value.length;
    if (total > MAX_BYTES) { await reader.cancel(); throw new Error('Page is bigger than 3 MB.'); }
    chunks.push(value);
  }
  return Buffer.concat(chunks).toString('utf8');
}

module.exports = async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  let target = String(req.query.url || '').trim();
  if (!target) return res.status(400).json({ error: 'Paste a link first.' });
  if (!/^https?:\/\//i.test(target)) target = 'https://' + target;

  try {
    let current = new URL(target);
    for (let i = 0; i <= MAX_REDIRECTS; i++) {
      await assertPublic(current);
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 10000);
      let r;
      try {
        r = await fetch(current.href, {
          redirect: 'manual',
          signal: ctrl.signal,
          headers: {
            'User-Agent': 'Mozilla/5.0 (compatible; SourceViewer/1.0)',
            Accept: '*/*', Referer: current.origin + '/',
          },
        });
      } finally { clearTimeout(timer); }

      if (r.status >= 300 && r.status < 400 && r.headers.get('location')) {
        current = new URL(r.headers.get('location'), current);
        continue;
      }
      const html = await readLimited(r);
      return res.status(200).json({
        url: target,
        finalUrl: current.href,
        status: r.status,
        contentType: r.headers.get('content-type') || '',
        bytes: Buffer.byteLength(html),
        html,
      });
    }
    throw new Error('Too many redirects.');
  } catch (e) {
    const msg = e.name === 'AbortError' ? 'The site took too long to answer.' : (e.message || 'Could not fetch this link.');
    return res.status(502).json({ error: msg });
  }
};
