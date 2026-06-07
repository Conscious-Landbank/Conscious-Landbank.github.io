#!/usr/bin/env node
/**
 * Sync canonical consumer nav (dual-session) from account-settings.html to all root NewUnera pages.
 */
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(import.meta.dirname, '..');
const SPECIMEN = path.join(ROOT, 'NewUnera/account-settings.html');

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

const specimen = fs.readFileSync(SPECIMEN, 'utf8');

let navBlockMatch = specimen.match(
  /(<a href="#main-content" class="skip-link">[\s\S]*?<div id="mobileUserMenu"><\/div>\s*)<div id="mobileNotificationsSection"><\/div>\s*<\/div>/
);
if (!navBlockMatch) {
  // Fallback before mobileNotificationsSection was added
  const fallback = specimen.match(
    /(<a href="#main-content" class="skip-link">[\s\S]*?<div id="mobileUserMenu"><\/div>\s*)<\/div>\s*\n\s*<!-- Main Content -->/
  );
  if (!fallback) {
    console.error('Could not extract nav block from account-settings.html');
    process.exit(1);
  }
  navBlockMatch = fallback;
}

const CANONICAL_NAV = navBlockMatch[1] + `        <div id="mobileNotificationsSection"></div>
    </div>
`;

function ensureCssLink(content) {
  if (content.includes('href="consumer-app-nav.css"')) return content;
  return content.replace(
    /(<\/style>\s*\n)(<\/head>)/,
    '$1    <link rel="stylesheet" href="consumer-app-nav.css">\n$2'
  );
}

function ensureJsLink(content) {
  if (content.includes('src="consumer-app-nav.js"')) return content;
  return content.replace(/<\/body>/, '    <script src="consumer-app-nav.js"></script>\n</body>');
}

function replaceNavBlock(content) {
  const skipMatch = content.match(/<a href="#main-content" class="skip-link">[\s\S]*?<\/div>\s*\n\s*<!-- Main Content -->/);
  if (skipMatch) {
    return content.replace(
      /<a href="#main-content" class="skip-link">[\s\S]*?(?=\n\s*<!-- Main Content -->|\n\s*<main id="main-content")/,
      CANONICAL_NAV.trimEnd()
    );
  }

  const navOnlyMatch = content.match(/<nav class="nav"[\s\S]*?(?=\n\s*<!-- Main Content -->|\n\s*<main id="main-content")/);
  if (navOnlyMatch) {
    const withSkip =
      '<a href="#main-content" class="skip-link">Skip to main content</a>\n    ' +
      CANONICAL_NAV.replace(/<a href="#main-content" class="skip-link">Skip to main content<\/a>\s*\n\s*/, '');
    return content.replace(
      /<nav class="nav"[\s\S]*?(?=\n\s*<!-- Main Content -->|\n\s*<main id="main-content")/,
      withSkip.trimEnd()
    );
  }

  return null;
}

function stripLegacyUserProfile(content) {
  return content.replace(
    /<div class="user-profile-nav"[\s\S]*?<\/div>\s*(?=<button class="hamburger")/g,
    ''
  );
}

for (const rel of CONSUMER_FILES) {
  const filePath = path.join(ROOT, rel);
  if (!fs.existsSync(filePath)) {
    console.warn('SKIP missing:', rel);
    continue;
  }

  let content = fs.readFileSync(filePath, 'utf8');
  const updated = replaceNavBlock(content);
  if (!updated) {
    console.warn('SKIP no nav match:', rel);
    continue;
  }

  content = stripLegacyUserProfile(updated);
  content = ensureCssLink(content);
  content = ensureJsLink(content);

  if (content !== fs.readFileSync(filePath, 'utf8')) {
    fs.writeFileSync(filePath, content);
    console.log('UPDATED:', rel);
  } else {
    console.log('UNCHANGED:', rel);
  }
}

console.log('Done.');
