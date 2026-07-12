'use strict';

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const root = path.join(__dirname, '..');
const moduleDir = path.join(root, 'js');
const order = JSON.parse(fs.readFileSync(path.join(moduleDir, 'module-order.json'), 'utf8'));
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const bootstrap = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');

if (order.length !== 10) throw new Error(`expected 10 modules, got ${order.length}`);
if (order[0] !== '00-runtime.js') throw new Error('runtime module must load first');

for (const file of order) {
  if (!fs.existsSync(path.join(moduleDir, file))) throw new Error(`missing ${file}`);
  if (!html.includes(`./js/${file}?v=9.0.0`)) throw new Error(`index missing ${file}`);
  if (!sw.includes(`./js/${file}?v=9.0.0`)) throw new Error(`service worker missing ${file}`);
}

if (bootstrap.split(/\r?\n/).length > 120) throw new Error('app.js is no longer bootstrap-only');
if (!bootstrap.includes('bootPokerMate')) throw new Error('missing bootPokerMate');
if (!bootstrap.includes('PokerMateDebug')) throw new Error('missing PokerMateDebug');
if (!bootstrap.includes('showFatalBootError')) throw new Error('missing boot error UI');

const bundlePath = path.join(root, 'dist', 'app.bundle.js');
if (!fs.existsSync(bundlePath)) throw new Error('missing diagnostic bundle');
const bundle = fs.readFileSync(bundlePath, 'utf8');
new vm.Script(bundle, { filename: 'app.bundle.js' });

for (const functionName of ['renderHome','renderSessions','renderVenues','renderRangeGrid','renderOdds','renderPower','renderBankroll','renderSettings']) {
  if (!bundle.includes(`function ${functionName}`)) throw new Error(`bundle missing ${functionName}`);
}
for (const key of ['pokerMateDataV1','pokerMateUiV2','pokerMateRangeFrequenciesV1','pokerMateSessionTimerV1']) {
  if (!bundle.includes(key)) throw new Error(`storage key missing: ${key}`);
}
console.log('Architecture tests passed');
