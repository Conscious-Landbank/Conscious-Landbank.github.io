#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const FILES = [
  'NewUnera/account-settings.html',
  'NewUnera/dashboard-enhanced.html',
  'NewUnera/dashboard-kyc-blocked.html',
  'NewUnera/add-money.html',
];

const JS = fs.readFileSync(path.join(ROOT, 'NewUnera/consumer-app-nav.js'), 'utf8');
const CSS = fs.readFileSync(path.join(ROOT, 'NewUnera/consumer-app-nav.css'), 'utf8');

let ok = true;
function fail(msg) {
  console.error('FAIL:', msg);
  ok = false;
}
function pass(msg) {
  console.log('OK:', msg);
}

if (JS.includes('upgradeNavWalletNetworkTrigger')) fail('JS still contains upgradeNavWalletNetworkTrigger');
else pass('Chunk E merge removed from JS');

if (CSS.includes('.nav-wallet-network-trigger')) fail('CSS still contains merged trigger');
else pass('Merged trigger CSS removed');

if (!CSS.includes('background: var(--brand-white)') || !CSS.includes('.nav-network-badge')) {
  fail('CSS missing white pill or network badge styles');
} else pass('Canonical pill CSS present');

for (const rel of FILES) {
  const html = fs.readFileSync(path.join(ROOT, rel), 'utf8');
  const name = rel.split('/').pop();
  if (!html.includes('nav-wallet-trigger')) fail(`${name}: missing .nav-wallet-trigger`);
  else pass(`${name}: has .nav-wallet-trigger`);
  if (!html.includes('nav-network-badge')) fail(`${name}: missing .nav-network-badge`);
  else pass(`${name}: has .nav-network-badge`);
  if (html.includes('nav-wallet-network-trigger')) fail(`${name}: still has merged trigger markup`);
  if (!html.includes('network-dropdown-header-nav">Mainnet')) fail(`${name}: missing MAINNET section`);
  else pass(`${name}: MAINNET/TESTNET dropdown`);
  if (html.includes('user-profile-nav" onclick')) fail(`${name}: legacy user-profile-nav sibling`);
  else pass(`${name}: no legacy user-profile-nav sibling`);
  if ((html.match(/id="navWalletDisplay"/g) || []).length !== 1) fail(`${name}: expected exactly one #navWalletDisplay`);
}

process.exit(ok ? 0 : 1);
