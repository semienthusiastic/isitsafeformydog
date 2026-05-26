import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const FOODS_DIR = './src/content/foods';
const CONCURRENCY = 8;
const TIMEOUT_MS = 15000;

// Extract sourceUrl array from markdown frontmatter using regex
function extractSourceUrls(content) {
  if (!content.startsWith('---')) return [];
  const end = content.indexOf('---', 3);
  if (end === -1) return [];
  const frontmatter = content.slice(3, end);

  const block = frontmatter.match(/sourceUrl\s*:\s*\[([\s\S]*?)\]/);
  if (!block) return [];

  const urls = [];
  const quoted = block[1].matchAll(/"(https?:\/\/[^"]+)"/g);
  for (const m of quoted) {
    const url = m[1].trim();
    if (url) urls.push(url);
  }
  return urls;
}

// Follow redirects manually so we can see the chain, max 10 hops
function fetchWithRedirects(url, hops = 0) {
  return new Promise((resolve) => {
    if (hops > 10) {
      return resolve({ status: 'ERROR', error: 'Too many redirects', finalUrl: url });
    }

    const lib = url.startsWith('https') ? https : http;
    const options = {
      method: 'HEAD',
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
        Accept: 'text/html,application/xhtml+xml,*/*',
      },
      timeout: TIMEOUT_MS,
    };

    let parsed;
    try {
      parsed = new URL(url);
    } catch {
      return resolve({ status: 'ERROR', error: 'Invalid URL', finalUrl: url });
    }

    const req = lib.request(
      { ...options, hostname: parsed.hostname, path: parsed.pathname + parsed.search, port: parsed.port },
      (res) => {
        const status = res.statusCode;
        const location = res.headers?.location;

        if (status >= 300 && status < 400 && location) {
          // Resolve relative redirects
          const next = location.startsWith('http') ? location : new URL(location, url).href;
          resolve(fetchWithRedirects(next, hops + 1).then((r) => ({ ...r, redirectedFrom: url, hops: hops + 1 })));
        } else {
          resolve({ status, finalUrl: url, hops });
        }
      }
    );

    req.on('timeout', () => {
      req.destroy();
      resolve({ status: 'ERROR', error: 'Timeout', finalUrl: url });
    });

    req.on('error', (e) => {
      resolve({ status: 'ERROR', error: e.message, finalUrl: url });
    });

    req.end();
  });
}

// Concurrency-limited runner
async function checkAll(urls) {
  const results = new Map();
  const queue = [...urls];
  let done = 0;

  async function worker() {
    while (queue.length > 0) {
      const url = queue.shift();
      process.stderr.write(`\r  Checking ${++done}/${urls.length}...`);
      const result = await fetchWithRedirects(url);
      results.set(url, result);
    }
  }

  await Promise.all(Array.from({ length: CONCURRENCY }, () => worker()));
  process.stderr.write('\n');
  return results;
}

// ── Main ──────────────────────────────────────────────────────────────────────

const files = fs.readdirSync(FOODS_DIR).filter((f) => f.endsWith('.md')).sort();

// Build url → [file, file, ...] map
const urlToFiles = new Map();
for (const filename of files) {
  const content = fs.readFileSync(path.join(FOODS_DIR, filename), 'utf8');
  const urls = extractSourceUrls(content);
  for (const url of urls) {
    if (!urlToFiles.has(url)) urlToFiles.set(url, []);
    urlToFiles.get(url).push(filename);
  }
}

console.error(`\nFound ${urlToFiles.size} unique URLs across ${files.length} files. Checking...\n`);

const results = await checkAll([...urlToFiles.keys()]);

// Categorise
const broken    = [];
const redirected = [];
const ok        = [];
const errors    = [];

for (const [url, result] of results.entries()) {
  const files = urlToFiles.get(url);
  const entry = { url, ...result, files };

  if (result.status === 'ERROR') {
    errors.push(entry);
  } else if (result.status >= 400) {
    broken.push(entry);
  } else if (result.hops > 0 || result.redirectedFrom) {
    redirected.push(entry);
  } else {
    ok.push(entry);
  }
}

function printEntries(entries) {
  for (const e of entries) {
    const statusLabel = e.status === 'ERROR' ? `ERROR: ${e.error}` : e.status;
    const redirectNote = e.hops > 0 ? ` → ${e.finalUrl}` : '';
    console.log(`  [${statusLabel}] ${e.url}${redirectNote}`);
    console.log(`  Files: ${e.files.join(', ')}`);
    console.log();
  }
}

console.log('━'.repeat(80));
console.log(`BROKEN (4xx / 5xx) — ${broken.length} URL(s)`);
console.log('━'.repeat(80));
if (broken.length === 0) console.log('  None.\n');
else printEntries(broken.sort((a, b) => a.status - b.status));

console.log('━'.repeat(80));
console.log(`ERRORS (connection / timeout / invalid) — ${errors.length} URL(s)`);
console.log('━'.repeat(80));
if (errors.length === 0) console.log('  None.\n');
else printEntries(errors);

console.log('━'.repeat(80));
console.log(`REDIRECTED (followed to final URL) — ${redirected.length} URL(s)`);
console.log('━'.repeat(80));
if (redirected.length === 0) console.log('  None.\n');
else printEntries(redirected.sort((a, b) => a.status - b.status));

console.log('━'.repeat(80));
console.log(`WORKING (200 OK) — ${ok.length} URL(s)`);
console.log('━'.repeat(80));
if (ok.length === 0) console.log('  None.\n');
else printEntries(ok);
