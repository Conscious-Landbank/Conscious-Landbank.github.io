#!/usr/bin/env python3
"""Propagate UNERA V2 consumer nav links to all consumer app pages."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "NewUnera"

PREFIX = {
    "": "",
    "data-mapping/token-mgmt-remittance/screens/": "../../../",
}

NAV_LINKS = {
    "": '''            <ul class="nav-links" role="list">
                <li><a href="{p}dashboard-enhanced.html" class="nav-link" id="navLinkDashboard">DASHBOARD</a></li>
                <li id="walletNavItem">
                    <button type="button" class="nav-link nav-connect-btn" id="navConnectBtn" onclick="openConnectModal()" aria-label="Connect wallet">CONNECT</button>
                    <a href="{p}wallet-enhanced.html" class="nav-link" id="walletNavLink" style="display: none;">WALLET</a>
                </li>
                <li class="nav-dropdown-item" id="navDdTransact">
                    <button type="button" class="nav-link nav-dropdown-trigger" id="navDdTransactBtn" aria-haspopup="true" aria-expanded="false" aria-controls="navDdTransactMenu">
                        TRANSACT
                        <svg class="nav-dropdown-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                    </button>
                    <ul class="nav-dropdown-menu" id="navDdTransactMenu" role="menu" aria-label="Transact options">
                        <li><a href="{p}add-money.html" class="nav-dd-item" role="menuitem">Add Money</a></li>
                        <li><a href="{p}exchange.html" class="nav-dd-item" role="menuitem">Exchange</a></li>
                        <li><a href="{p}send-enhanced.html" class="nav-dd-item" role="menuitem">Send</a></li>
                    </ul>
                </li>
                <li><a href="{p}stake.html" class="nav-link" id="navLinkStake">STAKE</a></li>
                <li class="nav-dropdown-item" id="navDdImpact">
                    <button type="button" class="nav-link nav-dropdown-trigger" id="navDdImpactBtn" aria-haspopup="true" aria-expanded="false" aria-controls="navDdImpactMenu">
                        IMPACT
                        <svg class="nav-dropdown-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M480-345 240-585l56-56 184 184 184-184 56 56-240 240Z"/></svg>
                    </button>
                    <ul class="nav-dropdown-menu" id="navDdImpactMenu" role="menu" aria-label="Impact options">
                        <li><a href="{p}explore-centres.html" class="nav-dd-item" role="menuitem">Centres</a></li>
                        <li><a href="{p}governance.html" class="nav-dd-item" role="menuitem">Governance</a></li>
                    </ul>
                </li>
                <li id="navAuthLinks" style="display: none;">
                    <a href="{p}login_2.html" class="nav-link btn-nav-secondary">LOG IN</a>
                    <a href="{p}signup_2.html" class="nav-link btn-nav-primary">SIGN UP</a>
                </li>
            </ul>''',
}

MOBILE_LINKS = {
    "": '''        <div id="drawerAuthRow" class="mobile-drawer-auth-row" style="display: none;">
            <a href="login_2.html" class="mobile-drawer-auth-login">LOG IN</a>
            <a href="signup_2.html" class="mobile-drawer-auth-signup">SIGN UP</a>
        </div>
        <div id="drawerWalletRow" class="mobile-drawer-wallet-row" style="display: none;">
            <span aria-hidden="true">🦊</span>
            <div style="flex:1;min-width:0">
                <div id="drawerWalletAddress" style="color:#fff;font-size:0.8rem;font-weight:600;">0x742d...3a8f</div>
                <div id="drawerWalletMeta" style="color:rgba(255,255,255,0.55);font-size:0.7rem;">292.22559 CTC · Polygon</div>
            </div>
            <button type="button" onclick="disconnectWallet()" style="color:rgba(255,255,255,0.5);font-size:0.7rem;background:none;border:none;cursor:pointer;">Disconnect</button>
        </div>
        <div id="drawerConnectRow" style="display: none;">
            <button type="button" class="mobile-drawer-connect-btn" onclick="openConnectModal()">Connect Wallet</button>
        </div>
        <ul class="mobile-nav-links" role="list">
            <li><a href="dashboard-enhanced.html" class="nav-link" id="drawerLinkDashboard">DASHBOARD</a></li>
            <li id="mobileConnectNavItem" style="display: none;"><button type="button" class="mobile-drawer-connect-btn" onclick="openConnectModal()">CONNECT</button></li>
            <li><a href="wallet-enhanced.html" class="nav-link" id="mobileWalletLink" style="display: none;">WALLET</a></li>
            <li class="mobile-nav-section-label">TRANSACT</li>
            <li><a href="add-money.html" class="nav-link mobile-nav-sub">Add Money</a></li>
            <li><a href="exchange.html" class="nav-link mobile-nav-sub">Exchange</a></li>
            <li><a href="send-enhanced.html" class="nav-link mobile-nav-sub">Send</a></li>
            <li><a href="stake.html" class="nav-link">STAKE</a></li>
            <li class="mobile-nav-section-label">IMPACT</li>
            <li><a href="explore-centres.html" class="nav-link mobile-nav-sub">Centres</a></li>
            <li><a href="governance.html" class="nav-link mobile-nav-sub">Governance</a></li>
        </ul>''',
}

WALLET_CHIP = '''            <div class="nav-wallet-display" id="navWalletDisplay" style="display: none;" role="button" tabindex="0" aria-haspopup="true" aria-expanded="false" aria-label="Wallet connected">
                <div class="nav-wallet-icon-badge">
                    <div class="nav-wallet-blockie"></div>
                    <span class="nav-wallet-metamask-badge" aria-hidden="true">🦊</span>
                </div>
                <div class="nav-wallet-info">
                    <span class="nav-wallet-address" id="navWalletAddress">0x742d...3a8f</span>
                    <span class="nav-wallet-balance" id="navWalletBalance">292.22559 CTC</span>
                </div>
                <div class="nav-wallet-network" id="navWalletNetwork">
                    <span id="navNetworkLabel">Polygon</span>
                </div>
            </div>
'''

ACTIVE_MAP = {
    "dashboard-enhanced.html": "dashboard",
    "dashboard-kyc-retry.html": "dashboard",
    "dashboard-kyc-blocked.html": "dashboard",
    "wallet-enhanced.html": "wallet",
    "wallet-enhanced_2.html": "wallet",
    "add-money.html": "transact",
    "exchange.html": "transact",
    "send-enhanced.html": "transact",
    "stake.html": "stake",
    "explore-centres.html": "impact",
    "centre-detail.html": "impact",
    "governance.html": "impact",
}

CONSUMER_FILES = list(ACTIVE_MAP.keys()) + [
    "account-settings.html",
    "account-security.html",
    "notifications.html",
    "kyc-verify.html",
    "kyc-verify-new.html",
    "purchase-receipt.html",
    "proof-of-reserve-public.html",
    "email-notification-templates.html",
]

REMITS = [
    "data-mapping/token-mgmt-remittance/screens/token-mgmt-remittance-dashboard-enhanced.html",
    "data-mapping/token-mgmt-remittance/screens/token-mgmt-remittance-wallet-enhanced.html",
    "data-mapping/token-mgmt-remittance/screens/token-mgmt-remittance-send-enhanced.html",
    "data-mapping/token-mgmt-remittance/screens/token-mgmt-remittance-notifications.html",
]


def ensure_assets(content: str, prefix: str) -> str:
    css = f'<link rel="stylesheet" href="{prefix}consumer-app-nav.css">'
    js = f'<script src="{prefix}consumer-app-nav.js"></script>'
    if "consumer-app-nav.css" not in content:
        content = content.replace("</head>", f"    {css}\n</head>", 1)
    if "consumer-app-nav.js" not in content:
        content = content.replace("</body>", f"    {js}\n</body>", 1)
    return content


def replace_nav_links(content: str, p: str) -> str:
    new_ul = NAV_LINKS[""].format(p=p)
    pattern = r'<ul class="nav-links"[^>]*>.*?</ul>'
    if re.search(pattern, content, re.DOTALL):
        content = re.sub(pattern, new_ul.strip(), content, count=1, flags=re.DOTALL)
    return content


def replace_mobile(content: str, p: str = "") -> str:
    mobile_tpl = MOBILE_LINKS[""].replace('href="dashboard-enhanced.html"', f'href="{p}dashboard-enhanced.html"')
    mobile_tpl = mobile_tpl.replace('href="login_2.html"', f'href="{p}login_2.html"')
    mobile_tpl = mobile_tpl.replace('href="signup_2.html"', f'href="{p}signup_2.html"')
    mobile_tpl = mobile_tpl.replace('href="wallet-enhanced.html"', f'href="{p}wallet-enhanced.html"')
    mobile_tpl = mobile_tpl.replace('href="add-money.html"', f'href="{p}add-money.html"')
    mobile_tpl = mobile_tpl.replace('href="exchange.html"', f'href="{p}exchange.html"')
    mobile_tpl = mobile_tpl.replace('href="send-enhanced.html"', f'href="{p}send-enhanced.html"')
    mobile_tpl = mobile_tpl.replace('href="stake.html"', f'href="{p}stake.html"')
    mobile_tpl = mobile_tpl.replace('href="explore-centres.html"', f'href="{p}explore-centres.html"')
    mobile_tpl = mobile_tpl.replace('href="governance.html"', f'href="{p}governance.html"')

    if "drawerAuthRow" not in content:
        drawer_part = mobile_tpl.split("<ul")[0]
        content = re.sub(
            r'(<ul class="mobile-nav-links"[^>]*>)',
            drawer_part + r"\1",
            content,
            count=1,
        )
    new_mobile = re.search(r'<ul class="mobile-nav-links".*?</ul>', mobile_tpl, re.DOTALL)
    if new_mobile:
        content = re.sub(
            r'<ul class="mobile-nav-links"[^>]*>.*?</ul>',
            new_mobile.group(0),
            content,
            count=1,
            flags=re.DOTALL,
        )
    return content


def add_wallet_chip(content: str) -> str:
    if "id=\"navWalletDisplay\"" in content:
        return content
    # Insert before user-profile-nav in nav-right
    content = re.sub(
        r'(<div class="user-profile-nav")',
        WALLET_CHIP + r"\1",
        content,
        count=1,
    )
    return content


def remove_back_link(content: str) -> str:
    content = re.sub(
        r'\s*<a href="[^"]*dashboard-enhanced\.html" class="back-link">.*?</a>\s*',
        "\n",
        content,
        flags=re.DOTALL,
    )
    content = re.sub(
        r'\s*<a href="[^"]*explore-centres\.html" class="back-link">.*?</a>\s*',
        "\n",
        content,
        flags=re.DOTALL,
    )
    return content


def set_data_nav_active(content: str, filename: str) -> str:
    active = ACTIVE_MAP.get(filename)
    if not active:
        if 'data-nav-active="' in content:
            content = re.sub(r'\s*data-nav-active="[^"]*"', "", content)
        return content
    if re.search(r'<body[^>]*data-nav-active=', content):
        content = re.sub(r'data-nav-active="[^"]*"', f'data-nav-active="{active}"', content)
    else:
        content = re.sub(r"<body", f'<body data-nav-active="{active}"', content, count=1)
    return content


def process_file(path: Path, prefix: str = "") -> None:
    content = path.read_text(encoding="utf-8")
    original = content
    content = ensure_assets(content, prefix)
    content = replace_nav_links(content, prefix)
    content = add_wallet_chip(content)
    content = remove_back_link(content)
    content = replace_mobile(content, prefix)
    content = set_data_nav_active(content, path.name)
    if content != original:
        path.write_text(content, encoding="utf-8")
        print(f"Updated: {path.relative_to(ROOT.parent)}")


def main():
    for name in CONSUMER_FILES:
        process_file(ROOT / name)
    for rel in REMITS:
        process_file(ROOT / rel, prefix="../../../")
    print("Done.")


if __name__ == "__main__":
    main()
