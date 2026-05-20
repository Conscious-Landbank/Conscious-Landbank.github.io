#!/usr/bin/env python3
"""Patch presentation screen duplicates: paths, body attrs, inject overlay."""
import re
from pathlib import Path

ROUND = "token-mgmt-remittance"
BASE = Path(__file__).resolve().parent / "screens"

SCREENS = {
    f"{ROUND}-dashboard-enhanced.html": "dashboard-enhanced",
    f"{ROUND}-wallet-enhanced.html": "wallet-enhanced",
    f"{ROUND}-notifications.html": "notifications",
    f"{ROUND}-send-enhanced.html": "send-enhanced",
}

REPLACEMENTS = [
    ("url('../Brand Guide/", "url('../../../Brand Guide/"),
    ('src="NewLogo/', 'src="../../../NewLogo/'),
    ('href="Stablecoin/', 'href="../../../Stablecoin/'),
    ('href="exchange.html"', 'href="../../../exchange.html"'),
    ('href="stake.html"', 'href="../../../stake.html"'),
    ('href="login_2.html"', 'href="../../../login_2.html"'),
    ('href="add-money.html"', 'href="../../../add-money.html"'),
    ('href="explore-centres.html"', 'href="../../../explore-centres.html"'),
    ('href="governance.html"', 'href="../../../governance.html"'),
    ('href="kyc-verify.html"', 'href="../../../kyc-verify.html"'),
    ('href="account-settings.html"', 'href="../../../account-settings.html"'),
    ('href="account-security.html"', 'href="../../../account-security.html"'),
    ('href="centre-detail.html"', 'href="../../../centre-detail.html"'),
    ('href="dashboard-enhanced.html"', f'href="{ROUND}-dashboard-enhanced.html"'),
    ('href="wallet-enhanced.html"', f'href="{ROUND}-wallet-enhanced.html"'),
    ('href="notifications.html"', f'href="{ROUND}-notifications.html"'),
    ('href="send-enhanced.html"', f'href="{ROUND}-send-enhanced.html"'),
    ("ctaUrl: 'wallet-enhanced.html'", f"ctaUrl: '{ROUND}-wallet-enhanced.html'"),
    ("ctaUrl: 'dashboard-enhanced.html'", f"ctaUrl: '{ROUND}-dashboard-enhanced.html'"),
    ("window.location.href='wallet-enhanced.html'", f"window.location.href='{ROUND}-wallet-enhanced.html'"),
    ("window.location.href = 'wallet-enhanced.html'", f"window.location.href = '{ROUND}-wallet-enhanced.html'"),
    ("window.location.href='kyc-verify.html'", "window.location.href='../../../kyc-verify.html'"),
    ("window.location.href = 'kyc-verify.html'", "window.location.href = '../../../kyc-verify.html'"),
]

INJECT = """
<link rel="stylesheet" href="../../_shared/data-mapping-core.css">
<script src="../../_shared/data-mapping-core.js" defer></script>
"""


def patch_file(path: Path, dm_screen: str) -> None:
    text = path.read_text(encoding="utf-8")
    for old, new in REPLACEMENTS:
        text = text.replace(old, new)

    body_attrs = (
        f'data-dm-round="{ROUND}" data-dm-screen="{dm_screen}" '
        f'data-dm-catalog="../token-mgmt-remittance-catalog.json"'
    )
    if "data-dm-round" not in text:
        text = re.sub(r"<body([^>]*)>", rf"<body \1 {body_attrs}>", text, count=1)
        text = text.replace("<body  ", "<body ")

    if "data-mapping-core.css" not in text:
        text = text.replace("</body>", INJECT + "\n</body>")

    path.write_text(text, encoding="utf-8")
    print(f"Patched {path.name}")


def main():
    for filename, screen in SCREENS.items():
        patch_file(BASE / filename, screen)


if __name__ == "__main__":
    main()
