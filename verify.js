// Vocab MASter data check. Run with Node.js from the repo folder:  node verify.js
// Confirms every full entry has a definition, a Bangla meaning, a part of speech and at least five example sentences.
const fs = require('fs');
let INDEX = null; const SHARDS = {};
global.VM = { index(d) { INDEX = d; }, put(n, o) { SHARDS[n] = o; } };
eval(fs.readFileSync(__dirname + '/words-index.js', 'utf8'));
const files = fs.readdirSync(__dirname).filter(f => /^words-\d+\.js$/.test(f)).sort();
for (const f of files) eval(fs.readFileSync(__dirname + '/' + f, 'utf8'));
const all = Object.assign({}, ...Object.values(SHARDS));
let fail = 0, ex = 0;
const bad = (w, why) => { fail++; if (fail < 30) console.log('FAIL', w, '-', why); };
for (const c of INDEX.c) {
  const e = all[c[0].toLowerCase()];
  if (!e) { bad(c[0], 'missing from data files'); continue; }
  if (!e.d) bad(c[0], 'no definition');
  if (!/[ঀ-৿]/.test(e.bn || '')) bad(c[0], 'no Bangla meaning');
  if (!e.pos) bad(c[0], 'no part of speech');
  if (!Array.isArray(e.ex) || e.ex.length < 5) bad(c[0], 'fewer than 5 example sentences');
  ex += (e.ex || []).length;
}
// every shard boundary must match the first word of its file
INDEX.b.forEach((w, i) => { const s = SHARDS[i + 1]; if (!s || Object.keys(s)[0] !== w) bad(w, 'shard boundary ' + (i + 1) + ' is out of order'); });
const bits = b => INDEX.c.filter(c => c[3] & b).length;
console.log(`Full entries: ${INDEX.c.length}  ·  thesaurus entries: ${INDEX.lw.split('|').length}  ·  example sentences: ${ex}`);
console.log(`Barron's 333: ${bits(1)}  GRE 500 Essential: ${bits(2)}  GRE 500 Advanced: ${bits(4)}  GRE Hit Parade: ${bits(8)}`);
console.log(`Word Smart I: ${bits(16)}  Word Smart II: ${bits(32)}  IBA: ${bits(64)}  TOEFL AWL: ${bits(128)}  Oxford 3000: ${bits(256)}`);
console.log(fail ? `${fail} problems found` : 'All checks passed.');
process.exit(fail ? 1 : 0);
