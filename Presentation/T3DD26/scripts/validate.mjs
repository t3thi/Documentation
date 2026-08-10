import { readFile } from 'node:fs/promises';
import process from 'node:process';

const html = await readFile(new URL('../index.html', import.meta.url), 'utf8');
const css = await readFile(new URL('../src/styles.css', import.meta.url), 'utf8');
const main = await readFile(new URL('../src/main.js', import.meta.url), 'utf8');
const readme = await readFile(new URL('../README.md', import.meta.url), 'utf8');
const qaReport = await readFile(new URL('../QA-Report.md', import.meta.url), 'utf8');
const editorial = await readFile(new URL('../Slide-Content.md', import.meta.url), 'utf8');
const speakerHandout = await readFile(new URL('../Speaker-Handout.md', import.meta.url), 'utf8');
const coreValidation = await readFile(new URL('../Core-Code-Validation.md', import.meta.url), 'utf8');
const reuseAudit = await readFile(new URL('../RheinRuhr-2024-Reuse-Audit.md', import.meta.url), 'utf8');
const vendoredReveal = await readFile(new URL('../vendor/reveal/reveal.mjs', import.meta.url), 'utf8');
const installedReveal = await readFile(new URL('../node_modules/reveal.js/dist/reveal.mjs', import.meta.url), 'utf8');
const vendoredRevealCss = await readFile(new URL('../vendor/reveal/reveal.css', import.meta.url), 'utf8');
const installedRevealCss = await readFile(new URL('../node_modules/reveal.js/dist/reveal.css', import.meta.url), 'utf8');
const vendoredNotes = await readFile(new URL('../vendor/reveal/plugin/notes.mjs', import.meta.url), 'utf8');
const installedNotes = await readFile(new URL('../node_modules/reveal.js/dist/plugin/notes.mjs', import.meta.url), 'utf8');
const vendoredLicense = await readFile(new URL('../vendor/reveal/LICENSE', import.meta.url), 'utf8');
const installedLicense = await readFile(new URL('../node_modules/reveal.js/LICENSE', import.meta.url), 'utf8');

const failures = [];
const coreCommit = 'ee251c96d55b6e609a77334324be0b91bb0839e5';
const allowedStatuses = new Set(['Current', 'Problem', 'Vision', 'Open', 'In Progress']);

const count = (pattern, input = html) => [...input.matchAll(pattern)].length;
const expectCount = (label, pattern, expected, input = html) => {
  const actual = count(pattern, input);
  if (actual !== expected) {
    failures.push(`${label}: expected ${expected}, found ${actual}`);
  }
};

expectCount('main slides', /class="[^"]*main-slide[^"]*"/g, 19);
expectCount('backup slides', /class="[^"]*backup-slide[^"]*"/g, 0);
expectCount('speaker note blocks', /<aside class="notes" role="note">/g, 19);
expectCount('slide timing markers', /data-timing="[^"]+"/g, 19);
expectCount('online source paragraphs', /<p><strong>Sources:<\/strong>[\s\S]*?<\/p>/g, 19);

expectCount('editorial main slides', /^## Main slide M\d{2}:/gm, 19, editorial);
expectCount('editorial backup slides', /^## Backup slide B\d{2}:/gm, 0, editorial);
expectCount('editorial visible copy sections', /^### Visible slide copy$/gm, 19, editorial);
expectCount('editorial layout intent sections', /^### Layout intent$/gm, 19, editorial);
expectCount('editorial speaker note sections', /^### Speaker notes$/gm, 19, editorial);
expectCount('editorial source sections', /^### Sources$/gm, 19, editorial);
expectCount('editorial boundaries', /^\*\*Boundary:\*\*/gm, 19, editorial);
expectCount('speaker handout slide cues', /^## M\d{2} ·/gm, 19, speakerHandout);

const handoutCues = [...speakerHandout.matchAll(/^## (M\d{2}) · [^\n]+\n\n\*\*Deutsch:\*\* ([^\n]+)\n\n\*\*English:\*\* ([^\n]+)$/gm)];
if (handoutCues.length !== 19) {
  failures.push(`speaker handout cue structure: expected 19 bilingual cue pairs, found ${handoutCues.length}`);
}
const handoutWordCounts = [];
for (const [index, [, slideId, germanCue, englishCue]] of handoutCues.entries()) {
  const expectedSlideId = `M${String(index + 1).padStart(2, '0')}`;
  if (slideId !== expectedSlideId) {
    failures.push(`speaker handout order: expected ${expectedSlideId}, found ${slideId}`);
  }
  for (const [language, cue] of [['German', germanCue], ['English', englishCue]]) {
    const sentenceCount = count(/[.!?](?=\s|$)/g, cue);
    if (sentenceCount < 1 || sentenceCount > 2) {
      failures.push(`${slideId} ${language} handout cue has ${sentenceCount} sentences; expected 1 or 2`);
    }
    const wordCount = cue.replace(/`/g, '').split(/\s+/).length;
    handoutWordCounts.push(wordCount);
    if (wordCount > 55) {
      failures.push(`${slideId} ${language} handout cue has ${wordCount} words; maximum is 55`);
    }
  }
}

const htmlSlideIds = [...html.matchAll(/<section id="([^"]+)" class="(?:main-slide|backup-slide)[^"]*"/g)]
  .map((match) => match[1]);
const editorialSlideIds = [...editorial.matchAll(/^- \*\*Reveal ID:\*\* `([^`]+)`$/gm)]
  .map((match) => match[1]);
if (htmlSlideIds.length !== 19
  || editorialSlideIds.length !== 19
  || htmlSlideIds.some((id, index) => id !== editorialSlideIds[index])) {
  failures.push('editorial Reveal IDs must match all 19 implemented slides in presentation order');
}

const editorialStatuses = [...editorial.matchAll(/^- \*\*Status:\*\* `([^`]+)`$/gm)]
  .map((match) => match[1]);
if (editorialStatuses.length !== 19) {
  failures.push(`editorial statuses: expected 19, found ${editorialStatuses.length}`);
}
for (const status of editorialStatuses) {
  if (!allowedStatuses.has(status)) {
    failures.push(`invalid editorial status: ${status}`);
  }
}

for (const [label, input] of [
  ['presentation', html],
  ['editorial content', editorial],
  ['speaker handout', speakerHandout],
  ['Core validation', coreValidation],
  ['RheinRuhr reuse audit', reuseAudit],
  ['README', readme],
  ['QA report', qaReport],
]) {
  if (input.includes('—')) {
    failures.push(`${label} contains an em dash`);
  }
  if (/(?:file:\/\/|\/Users\/|\/private\/tmp\/)/.test(input)) {
    failures.push(`${label} contains a local filesystem reference`);
  }
}

const assertAbsoluteMarkdownLinks = (label, input) => {
  for (const match of input.matchAll(/\]\(([^)]+)\)/g)) {
    if (!match[1].startsWith('https://')) {
      failures.push(`${label} link is not an absolute HTTPS URL: ${match[1]}`);
    }
  }
};
assertAbsoluteMarkdownLinks('editorial', editorial);
assertAbsoluteMarkdownLinks('speaker handout', speakerHandout);
assertAbsoluteMarkdownLinks('Core validation', coreValidation);
assertAbsoluteMarkdownLinks('RheinRuhr reuse audit', reuseAudit);
assertAbsoluteMarkdownLinks('QA report', qaReport);

for (const match of html.matchAll(/<a\b[^>]+href="([^"]+)"/g)) {
  if (!match[1].startsWith('https://')) {
    failures.push(`presentation anchor is not an absolute HTTPS URL: ${match[1]}`);
  }
}

const sourceParagraphs = [...html.matchAll(/<p><strong>Sources:<\/strong>[\s\S]*?<\/p>/g)]
  .map((match) => match[0]);
for (const paragraph of sourceParagraphs) {
  const links = [...paragraph.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  if (links.length === 0) {
    failures.push('a source paragraph has no link');
  }
  for (const link of links) {
    if (!link.startsWith('https://')) {
      failures.push(`source is not an absolute HTTPS URL: ${link}`);
    }
    if (link.startsWith('https://github.com/TYPO3/typo3/blob/') && !link.includes(coreCommit)) {
      failures.push(`TYPO3 Core source is not pinned to the verified commit: ${link}`);
    }
  }
}

const slidesWithoutNotes = [...html.matchAll(/<section id="([^"]+)" class="main-slide[^"]*"[^>]*>([\s\S]*?)<aside class="notes" role="note">/g)];
if (slidesWithoutNotes.length !== 19) {
  failures.push(`visible slide extraction: expected 19, found ${slidesWithoutNotes.length}`);
}

const bannedVisibleTerms = /\b(?:best|broken|fragile|huge|magic|massive|perfect|radical|revolutionary|worst)\b/i;
const visibleWordCounts = [];
for (const [, id, markup] of slidesWithoutNotes) {
  const visibleText = markup
    .replace(/<[^>]+>/g, ' ')
    .replace(/&gt;/g, ' greater than ')
    .replace(/&amp;/g, ' and ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/[^\p{L}\p{N}_]+/gu, ' ')
    .trim();
  const wordCount = visibleText === '' ? 0 : visibleText.split(/\s+/).length;
  visibleWordCounts.push([id, wordCount]);
  const wordLimit = {
    'four-responsibilities': 72,
    'use-cases': 58,
    'contract-overlap': 52,
  }[id] ?? 42;
  if (wordCount > wordLimit) {
    failures.push(`${id} contains ${wordCount} visible words; maximum is ${wordLimit}`);
  }
  if (bannedVisibleTerms.test(visibleText)) {
    failures.push(`${id} contains an exaggerated or banned visible term`);
  }
}

if (/class="[^"]*(?:card|pill|status--|badge|dashboard)[^"]*"/i.test(html)) {
  failures.push('presentation contains a disallowed card, badge, dashboard or status UI class');
}
if (/<svg\b/i.test(html)) {
  failures.push('presentation markup contains an inline SVG');
}

for (const match of html.matchAll(/<(?:script|link|img)[^>]+(?:src|href)="([^"]+)"/g)) {
  const resource = match[1];
  if (/^https?:\/\//i.test(resource) || resource.startsWith('//')) {
    failures.push(`external runtime asset: ${resource}`);
  }
  if (resource.startsWith('/')) {
    failures.push(`root absolute runtime asset: ${resource}`);
  }
}

const moduleSpecifiers = [...main.matchAll(/^\s*import(?:\s+[^'"]+\s+from\s+)?['"]([^'"]+)['"];?\s*$/gm)]
  .map((match) => match[1]);
if (moduleSpecifiers.length !== 2) {
  failures.push(`main module imports: expected 2, found ${moduleSpecifiers.length}`);
}
for (const specifier of moduleSpecifiers) {
  if (!specifier.startsWith('./') && !specifier.startsWith('../')) {
    failures.push(`bare or root absolute module specifier: ${specifier}`);
  }
}
if (!main.includes("from '../vendor/reveal/reveal.mjs'")
  || !main.includes("from '../vendor/reveal/plugin/notes.mjs'")) {
  failures.push('main module must use the vendored relative Reveal.js modules');
}
if (!html.includes('href="./vendor/reveal/reveal.css"')
  || !html.includes('href="./src/styles.css"')
  || !html.includes('src="./src/main.js"')) {
  failures.push('runtime styles and module entry point must use relative paths');
}

const vendorPairs = [
  ['Reveal.js module', vendoredReveal, installedReveal],
  ['Reveal.js CSS', vendoredRevealCss, installedRevealCss],
  ['Reveal.js notes plugin', vendoredNotes, installedNotes],
  ['Reveal.js license', vendoredLicense, installedLicense],
];
for (const [label, vendored, installed] of vendorPairs) {
  if (vendored !== installed) {
    failures.push(`${label} does not match the locked installed dependency`);
  }
}

if (/url\(\s*['"]?(?:https?:)?\/\//i.test(css)) {
  failures.push('CSS must not load external assets');
}
if (!/@media \(prefers-reduced-motion: reduce\)/.test(css)) {
  failures.push('reduced motion support is missing');
}
if (!/@media print/.test(css)) {
  failures.push('print styles are missing');
}
if (!css.includes('system-ui') || !css.includes('font-size: 62px') || !css.includes('font-size: 96px')) {
  failures.push('expected readable system font and title scale are missing');
}

const luminance = (hex) => {
  const channels = hex.slice(1).match(/../g).map((value) => Number.parseInt(value, 16) / 255);
  const linear = channels.map((channel) => channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4);
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
};
const contrastRatio = (foreground, background) => {
  const foregroundLuminance = luminance(foreground);
  const backgroundLuminance = luminance(background);
  return (Math.max(foregroundLuminance, backgroundLuminance) + 0.05)
    / (Math.min(foregroundLuminance, backgroundLuminance) + 0.05);
};
const contrastPairs = [
  ['primary text', '#18212b', '#f6f3ed'],
  ['secondary text', '#58616a', '#f6f3ed'],
  ['accent text', '#a94116', '#f6f3ed'],
];
for (const [label, foreground, background] of contrastPairs) {
  const ratio = contrastRatio(foreground, background);
  if (ratio < 4.5) {
    failures.push(`${label} contrast is ${ratio.toFixed(2)}:1; expected at least 4.5:1`);
  }
}

const ids = [...html.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
if (duplicateIds.length > 0) {
  failures.push(`duplicate ids: ${[...new Set(duplicateIds)].join(', ')}`);
}

if (failures.length > 0) {
  console.error(`Presentation validation failed:\n- ${failures.join('\n- ')}`);
  process.exit(1);
}

const totalVisibleWords = visibleWordCounts.reduce((sum, [, words]) => sum + words, 0);
const maximumVisibleWords = Math.max(...visibleWordCounts.map(([, words]) => words));
const maximumHandoutWords = Math.max(...handoutWordCounts);
console.log(`Presentation validation passed: 19 main slides, no backup slides, ${totalVisibleWords} visible words, maximum ${maximumVisibleWords} on one slide, 19 ordered bilingual speaker cue pairs with at most ${maximumHandoutWords} words each, controlled status vocabulary, absolute online sources, immutable Core citations, no em dashes, AA contrast, relative offline assets, reduced motion and print CSS.`);
