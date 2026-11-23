import { cp, mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const out = path.join(root, '_site');
await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(path.join(root, 'dist'), out, { recursive: true });
const entry = path.join(out, 'index.html');
const source = await readFile(entry, 'utf8');
const needle = 'src="/portfolio.html"';
if (source.split(needle).length !== 2) throw new Error('Unexpected original iframe path.');
await writeFile(entry, source.replace(needle, 'src="./portfolio.html"'));
await writeFile(path.join(out, '.nojekyll'), '');
console.log('Static site prepared in _site. Original dist files are unchanged.');
