import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const FOODS_DIR = './src/content/foods';
const CONCURRENCY = 4;       // gentler — fewer parallel connections
const TIMEOUT_MS  = 20000;
const DELAY_MS    = 350;     // pause between requests per worker

const BROWSER_HEADERS = {
  'User-Agent':      'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
  'Accept':          'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
  'Accept-Language': 'en-US,en;q=0.9',
  'Accept-Encoding': 'gzip, deflate, br',
  'Cache-Control':   'no-cache',
  'Connection':      'keep-alive',
  'Upgrade-Insecure-Requests': '1',
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Extract sourceUrl array from markdown frontmatter
function extractSourceUrls(content) {
  if (!content.startsWith('---')) return [];
  const end = content.indexOf('---', 3);
  if (end === -1) return [];
  const frontmatter = content.slice(3, end);
  const block = frontmatter.match(/sourceUrl\s*:\s*\[([\s\S]*?)\]/);
  if (!block) return [];
  const urls = [];
  for (const m of block[1].matchAll(/"(https?:\/\/[^"]+)"/g)) {
    const url = m[1].trim();
    if (url) urls.push(url);
  }
  return urls;
}

// GET request — follows redirects manually, destroys body immediately after headers
function fetchWithRedirects(url, hops = 0) {
  return new Promise((resolve) => {
    if (hops > 10) {
      return resolve({ status: 'ERROR', error: 'Too many redirects', finalUrl: url });
    }

    let parsed;
    try { parsed = new URL(url); }
    catch { return resolve({ status: 'ERROR', error: 'Invalid URL', finalUrl: url }); }

    const lib = url.startsWith('https') ? https : http;
    const req = lib.request(
      {
        method:   'GET',
        hostname:  parsed.hostname,
        path:      parsed.pathname + parsed.search,
        port:      parsed.port || undefined,
        headers:   BROWSER_HEADERS,
        timeout:   TIMEOUT_MS,
      },
      (res) => {
        const status   = res.statusCode;
        const location = res.headers?.location;

        // Discard body — we only needed the status
        res.destroy();

        if (status >= 300 && status < 400 && location) {
          const next = location.startsWith('http')
            ? location
            : new URL(location, url).href;
          fetchWithRedirects(next, hops + 1).then((r) =>
            resolve({ ...r, redirectedFrom: url, hops: hops + 1 })
          );
        } else {
          resolve({ status, finalUrl: url, hops });
        }
      }
    );

    req.on('timeout', () => { req.destroy(); resolve({ status: 'ERROR', error: 'Timeout',    finalUrl: url }); });
    req.on('error',   (e) => {               resolve({ status: 'ERROR', error: e.message, finalUrl: url }); });
    req.end();
  });
}

// Concurrency-limited queue with per-worker delay
async function checkAll(urls) {
  const results = new Map();
  const queue   = [...urls];
  let done = 0;

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift();
      process.stderr.write(`\r  Checking ${++done}/${urls.length}...   `);
      results.set(url, await fetchWithRedirects(url));
      await sleep(DELAY_MS);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  process.stderr.write('\n');
  return results;
}

// ── Main ─────────────────────────────────────────────────────────────────────

const files = fs.readdirSync(FOODS_DIR).filter(f => f.endsWith('.md')).sort();

const urlToFiles = new Map();
for (const filename of files) {
  const content = fs.readFileSync(path.join(FOODS_DIR, filename), 'utf8');
  for (const url of extractSourceUrls(content)) {
    if (!urlToFiles.has(url)) urlToFiles.set(url, []);
    urlToFiles.get(url).push(filename);
  }
}

const totalUrls = urlToFiles.size;
const etaSecs   = Math.round(totalUrls / CONCURRENCY * DELAY_MS / 1000);
process.stderr.write(
  `\nFound ${totalUrls} unique URLs across ${files.length} files.\n` +
  `Running with GET + browser UA, ${CONCURRENCY} workers, ${DELAY_MS}ms delay (~${etaSecs}s estimated).\n\n`
);

const results = await checkAll([...urlToFiles.keys()]);

// Categorise
const broken    = [];
const redirected = [];
const ok        = [];
const errors    = [];

for (const [url, result] of results.entries()) {
  const files = urlToFiles.get(url);
  const entry = { url, ...result, files };
  if      (result.status === 'ERROR')                            errors.push(entry);
  else if (result.status >= 400)                                 broken.push(entry);
  else if (result.hops > 0 || result.redirectedFrom)            redirected.push(entry);
  else                                                           ok.push(entry);
}

function printEntries(entries) {
  for (const e of entries) {
    const statusLabel  = e.status === 'ERROR' ? `ERROR: ${e.error}` : e.status;
    const redirectNote = (e.hops > 0 && e.finalUrl !== e.url) ? ` → ${e.finalUrl}` : '';
    console.log(`  [${statusLabel}] ${e.url}${redirectNote}`);
    console.log(`  Files: ${e.files.join(', ')}`);
    console.log();
  }
}

const LINE = '━'.repeat(80);

console.log(LINE);
console.log(`BROKEN (4xx / 5xx) — ${broken.length} URL(s)`);
console.log(LINE);
if (broken.length === 0) console.log('  None.\n');
else printEntries(broken.sort((a, b) => a.status - b.status));

console.log(LINE);
console.log(`ERRORS (connection / timeout / invalid) — ${errors.length} URL(s)`);
console.log(LINE);
if (errors.length === 0) console.log('  None.\n');
else printEntries(errors);

console.log(LINE);
console.log(`REDIRECTED (followed to final URL) — ${redirected.length} URL(s)`);
console.log(LINE);
if (redirected.length === 0) console.log('  None.\n');
else printEntries(redirected.sort((a, b) => a.status - b.status));

console.log(LINE);
console.log(`WORKING (200 OK) — ${ok.length} URL(s)`);
console.log(LINE);
if (ok.length === 0) console.log('  None.\n');
else printEntries(ok);
