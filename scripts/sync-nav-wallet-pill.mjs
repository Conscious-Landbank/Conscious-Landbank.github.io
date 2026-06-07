#!/usr/bin/env node
/**
 * Sync #navWalletDisplay to 3-part canonical pill from account-settings.html
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SPECIMEN = path.join(ROOT, 'NewUnera/account-settings.html');
const specimen = fs.readFileSync(SPECIMEN, 'utf8');

const walletMatch = specimen.match(
  /(<div class="nav-wallet-display" id="navWalletDisplay"[\s\S]*?<\/div>\s*\n\s*<button class="hamburger")/
);
if (!walletMatch) {
  console.error('Could not extract wallet block from account-settings.html');
  process.exit(1);
}
const walletBlock = walletMatch[1].replace(/\n\s*<button class="hamburger"$/, '');

const networkMatch = specimen.match(
  /(<div class="network-dropdown-nav" id="networkDropdown"[\s\S]*?<!-- \/Network Switcher Dropdown -->)/
);
if (!networkMatch) {
  console.error('Could not extract network dropdown from account-settings.html');
  process.exit(1);
}
const networkBlock = networkMatch[1];

const LEGACY_FILES = [
  'NewUnera/dashboard-kyc-blocked.html',
  'NewUnera/dashboard-kyc-retry.html',
  'NewUnera/governance.html',
  'NewUnera/account-security.html',
  'NewUnera/email-notification-templates.html',
  'NewUnera/kyc-verify.html',
  'NewUnera/kyc-verify-new.html',
  'NewUnera/proof-of-reserve-public.html',
  'NewUnera/purchase-receipt.html',
  'NewUnera/wallet-enhanced_2.html',
  'NewUnera/data-mapping/token-mgmt-remittance/screens/token-mgmt-remittance-dashboard-enhanced.html',
  'NewUnera/data-mapping/token-mgmt-remittance/screens/token-mgmt-remittance-notifications.html',
  'NewUnera/data-mapping/token-mgmt-remittance/screens/token-mgmt-remittance-send-enhanced.html',
  'NewUnera/data-mapping/token-mgmt-remittance/screens/token-mgmt-remittance-wallet-enhanced.html',
];

const CANONICAL_NETWORK_FILES = [
  'NewUnera/dashboard-enhanced.html',
  'NewUnera/wallet-enhanced.html',
  'NewUnera/add-money.html',
  'NewUnera/exchange.html',
  'NewUnera/stake.html',
  'NewUnera/explore-centres.html',
  'NewUnera/centre-detail.html',
  'NewUnera/notifications.html',
  'NewUnera/payee-management.html',
  'NewUnera/wallet-edge.html',
];

function fixLegacyWalletBlock(content, filePath) {
  const legacyPattern =
    /<div class="nav-wallet-display" id="navWalletDisplay"[\s\S]*?(?=<button class="hamburger"|<\/div>\s*<\/nav>)/;
  if (!legacyPattern.test(content)) {
    console.warn(`SKIP legacy (no wallet block): ${filePath}`);
    return null;
  }
  let updated = content.replace(legacyPattern, walletBlock + '\n            ');
  // Remove sibling user-profile-nav if still present before hamburger
  updated = updated.replace(
    /<div class="user-profile-nav"[\s\S]*?<\/div>\s*(?=<button class="hamburger")/,
    ''
  );
  return updated;
}

function fixNetworkDropdown(content, filePath) {
  if (content.includes('network-dropdown-header-nav">Mainnet')) {
    console.log(`SKIP network (already Mainnet): ${filePath}`);
    return null;
  }
  const pattern =
    /<div class="network-dropdown-nav" id="networkDropdown"[\s\S]*?(?:<!-- \/Network Switcher Dropdown -->|(?=<div class="user-dropdown-nav" id="userDropdown"))/;
  if (!pattern.test(content)) {
    console.warn(`SKIP network (no dropdown): ${filePath}`);
    return null;
  }
  return content.replace(pattern, networkBlock + '\n\n                ');
}

function dedupWalletCss(content) {
  const patterns = [
    /\/\* Nav wallet display[\s\S]*?(?=\/\*[\s\S]*?(?:User Profile in Nav|User Dropdown in Nav|── Notification|Notification Bell|── Hamburger|Hamburger))/,
    /\/\* ── Wallet Display Pill[\s\S]*?(?=\/\*[\s\S]*?── Hamburger)/,
    /\/\* Wallet Display Pill[\s\S]*?(?=\/\*[\s\S]*?Hamburger)/,
  ];
  let out = content;
  for (const re of patterns) {
    if (re.test(out)) {
      out = out.replace(
        re,
        '        /* Nav wallet pill + network dropdown: consumer-app-nav.css */\n\n        '
      );
      break;
    }
  }
  return out;
}

let changed = 0;

for (const rel of LEGACY_FILES) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) {
    console.warn(`Missing: ${rel}`);
    continue;
  }
  let c = fs.readFileSync(fp, 'utf8');
  const u = fixLegacyWalletBlock(c, rel);
  if (u) {
    fs.writeFileSync(fp, u);
    console.log(`LEGACY wallet: ${rel}`);
    changed++;
  }
}

const DEDUP_FILES = [
  ...LEGACY_FILES,
  ...CANONICAL_NETWORK_FILES,
  'NewUnera/send-enhanced.html',
  'NewUnera/account-settings.html',
];

for (const rel of DEDUP_FILES) {
  const fp = path.join(ROOT, rel);
  if (!fs.existsSync(fp)) continue;
  let c = fs.readFileSync(fp, 'utf8');
  if (CANONICAL_NETWORK_FILES.includes(rel) || rel === 'NewUnera/send-enhanced.html') {
    const u = fixNetworkDropdown(c, rel);
    if (u) {
      c = u;
      console.log(`NETWORK: ${rel}`);
      changed++;
    }
  }
  const deduped = dedupWalletCss(c);
  if (deduped !== c) {
    fs.writeFileSync(fp, deduped);
    console.log(`CSS dedup: ${rel}`);
    changed++;
  }
}

console.log(`Done. ${changed} file updates.`);
