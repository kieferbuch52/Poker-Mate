'use strict';

const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
const moduleDir = path.join(root, 'js');
const order = JSON.parse(fs.readFileSync(path.join(moduleDir, 'module-order.json'), 'utf8'));

const output = [
  `'use strict';`,
  `/* Poker Mate diagnostic bundle. Production loads source modules directly. */`,
  ...order.map(file => `\n/* ===== ${file} ===== */\n${fs.readFileSync(path.join(moduleDir, file), 'utf8')}`),
  `\n/* ===== app.js ===== */\n${fs.readFileSync(path.join(root, 'app.js'), 'utf8')}`
].join('\n');

const dist = path.join(root, 'dist');
fs.mkdirSync(dist, { recursive: true });
fs.writeFileSync(path.join(dist, 'app.bundle.js'), output);
console.log(`Built dist/app.bundle.js from ${order.length} modules.`);
