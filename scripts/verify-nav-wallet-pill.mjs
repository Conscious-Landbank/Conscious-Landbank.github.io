#!/usr/bin/env node
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');

const CONSUMER_FILES = [
  'NewUnera/account-settings.html',
  'NewUnera/account-security.html',
  'NewUnera/add-money.html',
  'NewUnera/centre-detail.html',
  'NewUnera/dashboard-enhanced.html',
  'NewUnera/dashboard-kyc-blocked.html',
  'NewUnera/dashboard-kyc-retry.html',
  'NewUnera/email-notification-templates.html',
  'NewUnera/exchange.html',
  'NewUnera/explore-centres.html',
  'NewUnera/governance.html',
  'NewUnera/kyc-verify.html',
  'NewUnera/kyc-verify-new.html',
  'NewUnera/notifications.html',
  'NewUnera/payee-management.html',
  'NewUnera/proof-of-reserve-public.html',
  'NewUnera/purchase-receipt.html',
  'NewUnera/send-enhanced.html',
  'NewUnera/stake.html',
  'NewUnera/wallet-enhanced.html',
  'NewUnera/wallet-edge.html',
  'NewUnera/wallet-enhanced_2.html',
];

const CSS = fs.readFileSync(path.join(ROOT, 'NewUnera/consumer-app-nav.css'), 'utf8');
const JS = fs.readFileSync(path.join(ROOT, 'NewUnera/consumer-app-nav.js'), 'utf8');

let ok = true;
function fail(msg) {
  console.error('FAIL:', msg);
  ok = false;
}
function pass(msg) {
  console.log('OK:', msg);
}

if (JS.includes('upgradeNavWalletNetworkTrigger')) fail('JS still contains upgradeNavWalletNetworkTrigger');
else pass('No legacy merge trigger in JS');

if (CSS.includes('.nav-wallet-network-trigger')) fail('CSS still contains merged trigger');
else pass('No merged trigger CSS');

if (!CSS.includes('nav-wallet-session-connected')) fail('CSS missing dual-session rules');
else pass('Dual-session CSS in consumer-app-nav.css');

if (!CSS.includes('.user-dropdown-nav.notification-panel')) fail('CSS missing notification panel compound selector');
else pass('Notification panel compound selector in CSS');

if (!JS.includes('applyNavWalletSession')) fail('JS missing applyNavWalletSession');
else pass('applyNavWalletSession in shared JS');

for (const rel of CONSUMER_FILES) {
  const filePath = path.join(ROOT, rel);
  const name = rel.split('/').pop();
  if (!fs.existsSync(filePath)) {
    fail(`${name}: file missing`);
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');

  if (!html.includes('class="nav"')) fail(`${name}: missing nav.nav`);
  else pass(`${name}: nav.nav`);

  if (!html.includes('consumer-app-nav.css')) fail(`${name}: missing consumer-app-nav.css link`);
  if (!html.includes('consumer-app-nav.js')) fail(`${name}: missing consumer-app-nav.js script`);

  if (!html.includes('nav-wallet-session-connected')) fail(`${name}: missing .nav-wallet-session-connected`);
  if (!html.includes('nav-wallet-session-disconnected')) fail(`${name}: missing .nav-wallet-session-disconnected`);
  if (!html.includes('dropdownWalletStatusChip')) fail(`${name}: missing #dropdownWalletStatusChip`);
  if (!html.includes('notificationBellWrapper')) fail(`${name}: missing #notificationBellWrapper`);
  if (!html.includes('id="mobileUserMenu"')) fail(`${name}: missing #mobileUserMenu`);
  if (!html.includes('id="mobileNotificationsSection"')) fail(`${name}: missing #mobileNotificationsSection`);
  if (!html.includes('nav-wallet-trigger')) fail(`${name}: missing .nav-wallet-trigger`);
  if (!html.includes('nav-network-badge')) fail(`${name}: missing .nav-network-badge`);
  if (html.includes('nav-wallet-network-trigger')) fail(`${name}: has merged trigger`);
  if (html.includes('user-profile-nav" onclick')) fail(`${name}: legacy user-profile-nav sibling`);
  if ((html.match(/id="navWalletDisplay"/g) || []).length !== 1) fail(`${name}: expected exactly one #navWalletDisplay`);
  if (!html.includes('network-dropdown-header-nav">Mainnet')) fail(`${name}: missing MAINNET network dropdown`);

  const hasPanelWidth =
    html.includes('.user-dropdown-nav.notification-panel') ||
    CSS.includes('.user-dropdown-nav.notification-panel');
  if (!hasPanelWidth) fail(`${name}: missing notification panel width rule`);
}

process.exit(ok ? 0 : 1);
