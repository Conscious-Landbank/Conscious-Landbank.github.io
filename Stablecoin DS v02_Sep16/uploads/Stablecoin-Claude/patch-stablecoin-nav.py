#!/usr/bin/env python3
"""One-shot patch: inject shared stablecoin app nav into app shell pages."""
import re
from pathlib import Path

DIR = Path(__file__).parent
INC = (DIR / "stablecoin-app-nav.inc.html").read_text(encoding="utf-8")

PAGES = {
    "dashboard.html": "dashboard",
    "get-unera-cad.html": "purchase",
    "redeem-unera-cad.html": "redeem",
    "proof-of-reserve-public.html": "por",
    "notifications.html": "",
    "account-security.html": "",
    "kyc-verify.html": "",
    "mint-history.html": "",
    "swap-history.html": "",
    "purchase-receipt.html": "",
}

NAV_SHELL = re.compile(
    r"\s*/\*[\s─-]*Stablecoin nav shell \(dashboard-aligned\)[\s\S]*?(?=\n\s*/\*|\n\s*@media|\n\s*</style>)",
    re.I,
)


def strip_nav_css(style: str) -> str:
    markers = [
        "/* Navigation — V2 */",
        "/* Navigation */",
        "        .nav {",
        "/* ── Navigation */",
        "/* ── Navigation",
        "/* Navigation",
        "/* ── Hamburger */",
        "/* Hamburger */",
        "/* ── Mobile Menu Overlay */",
        "/* Mobile menu overlay */",
        "/* ── Mobile Menu */",
        "/* Mobile menu */",
        "/* ── User Profile in Nav */",
        "/* User profile nav */",
        "/* User dropdown */",
        "/* ── Notification Bell */",
        "/* Notification bell */",
        "/* ── Notification Panel",
        "/* Notification panel",
        "/* Mobile user section */",
    ]
    end_markers = [
        "/* ===== MAIN CONTAINER",
        "main.container {",
        "/* ── Page layout */",
        "/* Page layout */",
        "/* ── Container */",
        "/* Container */",
        "/* SR-only",
        "/* ── Alert",
        "/* Alert Banner",
        "/* ── Empty state */",
        "/* ── Responsive */",
        "/* ── Buttons */",
        "/* ── KPI",
        "/* ── Stepper",
        "/* ── History",
        "/* ── Proof",
        "/* ── Mint",
        "/* ── Form",
        "/* ── Card",
        "/* ── Table",
        "/* ── Security",
        "/* ── KYC",
        "/* ── Wallet",
        "/* ── Entity",
        "/* ── Bulk",
        "/* ── Tabs",
        "/* Notification list",
        "/* ── Notification list",
        "/* ── Notification card",
        "/* ── Buttons */",
        "/* ── Modal",
        "/* ── Connect",
        "/* ── Compliance",
        "/* ── Stepper",
        "/* ── Page header",
        "/* Page header",
        "/* ── Main",
        "/* Main content",
        "/* ── Stablecoin nav shell",
    ]
    for start in markers:
        idx = style.find(start)
        if idx == -1:
            continue
        end = len(style)
        for em in end_markers:
            j = style.find(em, idx + len(start))
            if j != -1 and j < end:
                end = j
        style = style[:idx] + style[end:]
        break
    style = NAV_SHELL.sub("\n", style)
    # Remove 768px nav-only media block
    style = re.sub(
        r"@media \(max-width: 768px\) \{\s*\.nav-container[^}]*\}[^}]*\}",
        "",
        style,
        count=1,
    )
    return style


def strip_nav_js(content: str) -> str:
    funcs = [
        "toggleUserDropdown",
        "closeNotificationPanel",
        "toggleNotificationPanel",
        "logout",
        "toggleMobileUserDropdown",
        "updateNotificationBadges",
        "saveNotifications",
        "markNotificationRead",
        "markAllNotificationsRead",
        "clearAllNotifications",
        "clearNotification",
        "renderNotificationPanel",
        "formatRelativeTime",
        "handleNotificationClick",
    ]
    for fn in funcs:
        content = re.sub(
            rf"\n\s*function {fn}\([^)]*\)[\s\S]*?\n\s*\}}\n",
            "\n",
            content,
            count=1,
        )
    content = re.sub(
        r"\n\s*\(function initMobileMenu\(\)[\s\S]*?\}\)\(\);\n",
        "\n",
        content,
        count=1,
    )
    content = re.sub(r"\n\s*const PANEL_ICON_PATHS = \{[\s\S]*?\};\n", "\n", content, count=1)
    content = re.sub(r"\n\s*const DEFAULT_NOTIFICATIONS = \[[\s\S]*?\];\n", "\n", content, count=1)
    content = re.sub(
        r"\n\s*let notifications = JSON\.parse\(localStorage[\s\S]*?\n\s*\}\)\(\);\n",
        "\n",
        content,
        count=1,
    )
    content = re.sub(
        r"\n\s*\(function syncNkycBlockedCopy\(\)[\s\S]*?\}\)\(\);\n",
        "\n",
        content,
        count=1,
    )
    content = re.sub(
        r"\n\s*\(function syncNkycRetryCopy\(\)[\s\S]*?\}\)\(\);\n",
        "\n",
        content,
        count=1,
    )
    content = re.sub(
        r"\n\s*document\.addEventListener\('click', function\(e\) \{[\s\S]*?notificationBellWrapper[\s\S]*?\}\);\n",
        "\n",
        content,
        count=1,
    )
    content = re.sub(r"\n\s*renderNotificationPanel\(\);\s*\n", "\n", content, count=1)
    return content


def patch_file(name: str, nav_active: str) -> None:
    path = DIR / name
    text = path.read_text(encoding="utf-8")

    if nav_active:
        if "data-nav-active" not in text:
            text = re.sub(r"<body([^>]*)>", f'<body\\1 data-nav-active="{nav_active}">', text, count=1)
    else:
        text = re.sub(r'\s*data-nav-active="[^"]*"', "", text)

    if "stablecoin-app-nav.css" not in text:
        if 'href="wallet-connect-parity.css"' in text:
            text = text.replace(
                '<link rel="stylesheet" href="wallet-connect-parity.css">',
                '<link rel="stylesheet" href="stablecoin-app-nav.css">\n    <link rel="stylesheet" href="wallet-connect-parity.css">',
                1,
            )
        else:
            text = text.replace(
                "</head>",
                '    <link rel="stylesheet" href="stablecoin-app-nav.css">\n</head>',
                1,
            )

    m = re.search(r"<style>([\s\S]*?)</style>", text)
    if m:
        new_style = strip_nav_css(m.group(1))
        text = text[: m.start(1)] + new_style + text[m.end(1) :]

    nav_pattern = r"<!-- Navigation -->[\s\S]*?(?=<!-- Main Content -->|<main id=\"main-content\")"
    if not re.search(nav_pattern, text):
        print(f"WARN: nav block not found in {name}")
    else:
        text = re.sub(nav_pattern, INC.strip() + "\n\n    ", text, count=1)

    if "stablecoin-app-nav.js" not in text:
        if 'src="wallet-connect-parity.js"' in text:
            text = text.replace(
                '<script src="wallet-connect-parity.js"></script>',
                '<script src="stablecoin-app-nav.js" defer></script>\n    <script src="wallet-connect-parity.js"></script>',
                1,
            )
        else:
            text = re.sub(
                r"(<script>)",
                '<script src="stablecoin-app-nav.js" defer></script>\n    \\1',
                text,
                count=1,
            )

    text = strip_nav_js(text)

    path.write_text(text, encoding="utf-8")
    print(f"Patched {name}")


def main():
    for page, active in PAGES.items():
        patch_file(page, active)


if __name__ == "__main__":
    main()
