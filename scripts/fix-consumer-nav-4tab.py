#!/usr/bin/env python3
"""
Fix Consumer App navigation to correct 4-tab structure per plan:
  DASHBOARD · WALLET/CONNECT · TRANSACT ▾ · CENTRES

Changes per page:
  1. TRANSACT dropdown: add Stake, fix order (Add Money, Send, Stake, Exchange)
  2. Remove standalone STAKE <li> tab
  3. Remove IMPACT ▾ dropdown
  4. Add CENTRES flat tab
  5. Fix mobile drawer: correct TRANSACT items, remove IMPACT section, add CENTRES
  6. Add Security/KYC/Notifications/Governance to desktop user dropdown
  7. Add Security/KYC/Notifications/Governance to mobile user dropdown
  8. Fix data-nav-active: stake→transact, impact→centres (or remove)
"""
import re
from pathlib import Path

ROOT = Path(__file__).parent.parent / "NewUnera"

CONSUMER = [
    "dashboard-enhanced.html",
    "dashboard-kyc-retry.html",
    "dashboard-kyc-blocked.html",
    "wallet-enhanced.html",
    "wallet-enhanced_2.html",
    "add-money.html",
    "exchange.html",
    "send-enhanced.html",
    "stake.html",
    "explore-centres.html",
    "centre-detail.html",
    "governance.html",
    "account-settings.html",
    "account-security.html",
    "notifications.html",
    "kyc-verify.html",
    "kyc-verify-new.html",
    "purchase-receipt.html",
    "proof-of-reserve-public.html",
    "email-notification-templates.html",
]

REMIT = [
    "data-mapping/token-mgmt-remittance/screens/token-mgmt-remittance-dashboard-enhanced.html",
    "data-mapping/token-mgmt-remittance/screens/token-mgmt-remittance-wallet-enhanced.html",
    "data-mapping/token-mgmt-remittance/screens/token-mgmt-remittance-send-enhanced.html",
    "data-mapping/token-mgmt-remittance/screens/token-mgmt-remittance-notifications.html",
]

# data-nav-active fix mapping
ACTIVE_MAP = {
    "stake.html": "transact",
    "explore-centres.html": "centres",
    "centre-detail.html": "centres",
}
# pages where impact active should be removed entirely
REMOVE_ACTIVE = {"governance.html"}


def fix_transact_dropdown_items(content, prefix=""):
    """Replace TRANSACT dropdown items with correct 4-item order."""
    # Old: Add Money, Exchange, Send  (possibly with prefix paths)
    # New: Add Money, Send, Stake, Exchange
    p = re.escape(prefix)
    
    # Pattern: the three items inside navDdTransactMenu (any order, might have Exchange before Send)
    old_items_pattern = r'(<ul[^>]*id="navDdTransactMenu"[^>]*>)\s*(<li>.*?</li>\s*){2,4}(</ul>)'
    
    new_items = (
        f'\n                        <li><a href="{prefix}add-money.html" class="nav-dd-item" role="menuitem">Add Money</a></li>'
        f'\n                        <li><a href="{prefix}send-enhanced.html" class="nav-dd-item" role="menuitem">Send</a></li>'
        f'\n                        <li><a href="{prefix}stake.html" class="nav-dd-item" role="menuitem">Stake</a></li>'
        f'\n                        <li><a href="{prefix}exchange.html" class="nav-dd-item" role="menuitem">Exchange</a></li>'
        f'\n                    '
    )
    
    def replace_items(m):
        return m.group(1) + new_items + m.group(3)
    
    return re.sub(old_items_pattern, replace_items, content, flags=re.DOTALL)


def fix_stake_impact_to_centres(content, prefix=""):
    """
    Remove standalone STAKE tab and IMPACT dropdown.
    Replace with CENTRES flat tab.
    """
    # Pattern 1: standalone STAKE li (various forms)
    stake_li = r'<li>\s*<a href="' + re.escape(prefix) + r'stake\.html"[^>]*id="navLinkStake"[^>]*>STAKE</a>\s*</li>\s*'
    content = re.sub(stake_li, '', content, flags=re.DOTALL)
    
    # Pattern 2: IMPACT dropdown (entire <li class="nav-dropdown-item" id="navDdImpact">...</li>)
    impact_dd = r'<li\s+class="nav-dropdown-item"\s+id="navDdImpact">.*?</li>\s*'
    content = re.sub(impact_dd, '', content, flags=re.DOTALL)
    
    # Pattern 3: Insert CENTRES tab after navDdTransact closing </li>
    # Find the closing tag of the TRANSACT dropdown and insert CENTRES after it
    # Only insert if CENTRES not already present
    if 'id="navLinkCentres"' not in content and 'navLinkCentres' not in content:
        transact_close = r'(</ul>\s*</li>\s*)(<!-- AUTH|\s*<li\s+id="navAuthLinks")'
        centres_li = (
            f'<li><a href="{prefix}explore-centres.html" class="nav-link" id="navLinkCentres">CENTRES</a></li>\n                '
        )
        content = re.sub(
            transact_close,
            r'\1' + centres_li + r'\2',
            content,
            flags=re.DOTALL
        )
    
    return content


def fix_mobile_drawer(content, prefix=""):
    """Fix mobile drawer nav list: remove IMPACT section, fix TRANSACT items, add CENTRES."""
    # Remove standalone STAKE item from mobile-nav-links
    stake_mobile = r'<li>\s*<a href="' + re.escape(prefix) + r'stake\.html"[^>]*>STAKE</a>\s*</li>\s*'
    content = re.sub(stake_mobile, '', content, flags=re.DOTALL)
    
    # Also remove "STAKE" listed as plain text nav item (some pages may have different markup)
    stake_mobile2 = r'<li>\s*<a href="' + re.escape(prefix) + r'stake\.html" class="nav-link">STAKE</a>\s*</li>\s*'
    content = re.sub(stake_mobile2, '', content, flags=re.DOTALL)
    
    # Remove IMPACT section label
    impact_label = r'<li\s+class="mobile-nav-section-label">IMPACT</li>\s*'
    content = re.sub(impact_label, '', content, flags=re.DOTALL)
    
    # Remove IMPACT sub-items (Centres and Governance under IMPACT section)
    centres_impact_sub = r'<li>\s*<a href="' + re.escape(prefix) + r'explore-centres\.html"[^>]*mobile-nav-sub[^>]*>Centres</a>\s*</li>\s*'
    content = re.sub(centres_impact_sub, '', content, flags=re.DOTALL)
    
    gov_impact_sub = r'<li>\s*<a href="' + re.escape(prefix) + r'governance\.html"[^>]*mobile-nav-sub[^>]*>Governance</a>\s*</li>\s*'
    content = re.sub(gov_impact_sub, '', content, flags=re.DOTALL)
    
    # Fix TRANSACT items: ensure Add Money, Send, Stake, Exchange order
    # Replace the existing TRANSACT sub-items block
    transact_block_pattern = (
        r'(<li\s+class="mobile-nav-section-label">TRANSACT</li>)\s*'
        r'(?:<li>.*?</li>\s*)+'
    )
    correct_transact = (
        r'\1'
        f'\n            <li><a href="{prefix}add-money.html" class="nav-link mobile-nav-sub">Add Money</a></li>'
        f'\n            <li><a href="{prefix}send-enhanced.html" class="nav-link mobile-nav-sub">Send</a></li>'
        f'\n            <li><a href="{prefix}stake.html" class="nav-link mobile-nav-sub">Stake</a></li>'
        f'\n            <li><a href="{prefix}exchange.html" class="nav-link mobile-nav-sub">Exchange</a></li>'
        '\n            '
    )
    content = re.sub(transact_block_pattern, correct_transact, content, flags=re.DOTALL)
    
    # Add CENTRES after TRANSACT block if not present
    if 'id="drawerLinkCentres"' not in content:
        # Insert after the last Exchange mobile item
        after_exchange = (
            r'(<li><a href="' + re.escape(prefix) + r'exchange\.html" class="nav-link mobile-nav-sub">Exchange</a></li>)'
        )
        centres_mobile = (
            r'\1'
            f'\n            <li><a href="{prefix}explore-centres.html" class="nav-link" id="drawerLinkCentres">CENTRES</a></li>'
        )
        content = re.sub(after_exchange, centres_mobile, content)
    
    return content


def fix_data_nav_active(content, filename):
    """Fix incorrect data-nav-active values on <body>."""
    basename = Path(filename).name
    
    if basename in REMOVE_ACTIVE:
        # Remove data-nav-active from governance.html
        content = re.sub(r'\s+data-nav-active="impact"', '', content)
        return content
    
    target = ACTIVE_MAP.get(basename)
    if target == "transact":
        # Change data-nav-active="stake" → "transact"
        content = re.sub(r'data-nav-active="stake"', 'data-nav-active="transact"', content)
    elif target == "centres":
        # Change data-nav-active="impact" → "centres"
        content = re.sub(r'data-nav-active="impact"', 'data-nav-active="centres"', content)
    
    return content


def add_governance_to_desktop_dropdown(content, prefix=""):
    """Add Governance link to desktop user dropdown if not present."""
    if 'governance.html' in content and 'dropdown-item-nav' in content and 'Governance' in content:
        return content  # already there
    
    # Find the divider before Disconnect/Log Out in the desktop dropdown and insert before it
    # Look for the divider before disconnect/log out
    disconnect_section = (
        r'(<div class="dropdown-divider-nav"></div>\s*'
        r'<!-- Disconnect Wallet)'
    )
    
    governance_html = (
        f'<a href="{prefix}governance.html" class="dropdown-item-nav">\n'
        '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Zm80-80h120v-280h280v280h120v-356L480-756 240-556v356Zm200-400h80q0-17 11.5-28.5T560-640q0-17-11.5-28.5T520-680q-17 0-28.5 11.5T480-640h-80q0-50 35-85t85-35q50 0 85 35t35 85q0 30-15 57.5T590-540h-50v60h-80v-120Zm40 220q-17 0-28.5-11.5T440-420q0-17 11.5-28.5T480-460q17 0 28.5 11.5T520-420q0 17-11.5 28.5T480-380ZM240-200v-356 356Z"/></svg>\n'
        '                            Governance\n'
        '                        </a>\n'
        '                        '
    )
    
    if re.search(disconnect_section, content, re.DOTALL):
        content = re.sub(
            disconnect_section,
            governance_html + r'\1',
            content,
            flags=re.DOTALL,
            count=1
        )
    
    return content


def add_governance_to_mobile_dropdown(content, prefix=""):
    """Add Governance link to mobile user dropdown if not present."""
    if f'href="{prefix}governance.html"' in content and 'mobile-dropdown-item' in content:
        # Already present in some form
        return content
    
    # Insert Governance before the last mobile-dropdown-divider before disconnect/logout
    mobile_disconnect = (
        r'(<div class="mobile-dropdown-divider"></div>\s*'
        r'<!-- Disconnect Wallet)'
    )
    
    governance_mobile = (
        f'<a href="{prefix}governance.html" class="mobile-dropdown-item">\n'
        '                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M160-120v-480l320-240 320 240v480H560v-280H400v280H160Zm80-80h120v-280h280v280h120v-356L480-756 240-556v356Zm200-400h80q0-17 11.5-28.5T560-640q0-17-11.5-28.5T520-680q-17 0-28.5 11.5T480-640h-80q0-50 35-85t85-35q50 0 85 35t35 85q0 30-15 57.5T590-540h-50v60h-80v-120Zm40 220q-17 0-28.5-11.5T440-420q0-17 11.5-28.5T480-460q17 0 28.5 11.5T520-420q0 17-11.5 28.5T480-380ZM240-200v-356 356Z"/></svg>\n'
        '                            Governance\n'
        '                        </a>\n'
        '                        '
    )
    
    if re.search(mobile_disconnect, content, re.DOTALL):
        content = re.sub(
            mobile_disconnect,
            governance_mobile + r'\1',
            content,
            flags=re.DOTALL,
            count=1
        )
    
    return content


def process_file(path: Path, prefix: str = "") -> bool:
    content = path.read_text(encoding="utf-8")
    original = content

    content = fix_transact_dropdown_items(content, prefix)
    content = fix_stake_impact_to_centres(content, prefix)
    content = fix_mobile_drawer(content, prefix)
    content = fix_data_nav_active(content, path.name)
    content = add_governance_to_desktop_dropdown(content, prefix)
    content = add_governance_to_mobile_dropdown(content, prefix)

    if content != original:
        path.write_text(content, encoding="utf-8")
        return True
    return False


def main():
    changed = 0
    skipped = 0

    for fname in CONSUMER:
        p = ROOT / fname
        if not p.exists():
            print(f"  SKIP (not found): {fname}")
            skipped += 1
            continue
        if process_file(p, ""):
            print(f"  UPDATED: {fname}")
            changed += 1
        else:
            print(f"  OK (no change): {fname}")

    for fname in REMIT:
        p = ROOT / fname
        if not p.exists():
            print(f"  SKIP (not found): {fname}")
            skipped += 1
            continue
        if process_file(p, "../../../"):
            print(f"  UPDATED: {fname}")
            changed += 1
        else:
            print(f"  OK (no change): {fname}")

    print(f"\nDone: {changed} updated, {skipped} skipped.")


if __name__ == "__main__":
    main()
