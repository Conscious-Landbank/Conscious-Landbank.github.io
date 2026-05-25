#!/usr/bin/env python3
"""Sync Stablecoin app nav from stablecoin-app-nav.inc.html into all app pages."""

import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent / "NewUnera" / "Stablecoin"
INC = ROOT / "stablecoin-app-nav.inc.html"

PAGES = [
    "dashboard.html",
    "get-unera-cad.html",
    "redeem-unera-cad.html",
    "purchase-receipt.html",
    "proof-of-reserve-public.html",
    "mint-history.html",
    "swap-history.html",
    "notifications.html",
    "account-security.html",
    "kyc-verify.html",
]

NAV_ACTIVE = {
    "dashboard.html": "dashboard",
    "get-unera-cad.html": "purchase",
    "redeem-unera-cad.html": "redeem",
    "purchase-receipt.html": "purchase",
    "proof-of-reserve-public.html": "por",
    "mint-history.html": "history",
    "swap-history.html": "history",
}


def main():
    inc = INC.read_text(encoding="utf-8").strip()
    # inc is nav + mobile overlay + mobile menu
    for name in PAGES:
        path = ROOT / name
        if not path.exists():
            continue
        content = path.read_text(encoding="utf-8")
        original = content

        # Replace from <nav class="nav" through end of mobile menu block
        pattern = r'<!-- UNERA Stablecoin shared app nav.*?</div>\s*\n\s*</div>\s*\n\s*</div>\s*\n\s*</div>'
        if not re.search(pattern, content, re.DOTALL):
            pattern = r'<nav class="nav" role="navigation".*?</div>\s*\n\s*</div>\s*\n\s*</div>\s*\n\s*</div>'

        if re.search(r'<nav class="nav"', content):
            # Match nav through mobile menu closing
            full_pattern = (
                r'(?:<!-- UNERA Stablecoin shared app nav[^\n]*\n\s*)?'
                r'<nav class="nav" role="navigation"[^>]*>.*?</nav>\s*'
                r'<div class="mobile-menu-overlay"[^>]*></div>\s*'
                r'<div class="mobile-menu"[^>]*>.*?</div>\s*</div>\s*\n\s*</div>'
            )
            if re.search(full_pattern, content, re.DOTALL):
                content = re.sub(full_pattern, inc + "\n", content, count=1, flags=re.DOTALL)
            else:
                nav_only = r'(?:<!-- UNERA Stablecoin[^\n]*\n\s*)?<nav class="nav" role="navigation"[^>]*>.*?</nav>'
                if re.search(nav_only, content, re.DOTALL):
                    content = re.sub(nav_only, inc.split("<div class=\"mobile-menu-overlay\"")[0].strip(), content, count=1, flags=re.DOTALL)

        active = NAV_ACTIVE.get(name)
        if active:
            if re.search(r'data-nav-active=', content):
                content = re.sub(r'data-nav-active="[^"]*"', f'data-nav-active="{active}"', content)
            else:
                content = re.sub(r"<body", f'<body data-nav-active="{active}"', content, count=1)

        # Remove history-cross-nav
        content = re.sub(
            r'\s*<nav class="history-cross-nav"[^>]*>.*?</nav>\s*',
            "\n",
            content,
            flags=re.DOTALL,
        )

        # Remove back-link in nav (purchase-receipt etc.)
        content = re.sub(
            r'\s*<a href="dashboard\.html" class="back-link"[^>]*>.*?</a>\s*',
            "\n",
            content,
            flags=re.DOTALL,
        )

        if content != original:
            path.write_text(content, encoding="utf-8")
            print(f"Updated: Stablecoin/{name}")


if __name__ == "__main__":
    main()
