/**
 * UNERA V2 — Consumer app navigation system
 * Include before closing </body>: <script src="consumer-app-nav.js"></script>
 */
(function () {
    'use strict';

    function shortAddress(addr) {
        if (!addr || addr.length < 10) return addr || '';
        return addr.slice(0, 6) + '...' + addr.slice(-4);
    }

    function show(el, display) {
        if (!el) return;
        el.style.display = display || '';
    }

    function hide(el) {
        if (!el) return;
        el.style.display = 'none';
    }

    /* ─── Auth + wallet nav state ─────────────────────────── */
    window.syncNavAuthState = function syncNavAuthState() {
        var isLoggedIn = localStorage.getItem('unera_user') !== null ||
            localStorage.getItem('isLoggedIn') === 'true' ||
            localStorage.getItem('loggedIn') === 'true' ||
            !document.body.dataset.requireLogin;

        var isConnected = localStorage.getItem('walletConnected') === 'true' ||
            !!localStorage.getItem('walletAddress');

        var address = localStorage.getItem('walletAddress') || '';
        var balance = localStorage.getItem('walletBalance') || '292.22559 CTC';
        var _rawNetwork = localStorage.getItem('walletNetwork') || localStorage.getItem('selectedNetwork') || 'Polygon';
        var network;
        try {
            var _parsedNet = JSON.parse(_rawNetwork);
            network = (_parsedNet && _parsedNet.label) ? _parsedNet.label : _rawNetwork;
        } catch (e) {
            network = _rawNetwork;
        }
        var userName = localStorage.getItem('unera_user_name') || localStorage.getItem('userName') || 'Jane Smith';
        var initials = userName.split(' ').map(function (n) { return n[0]; }).join('').slice(0, 2).toUpperCase();

        var walletNavItem = document.getElementById('walletNavItem');
        var connectBtn = document.getElementById('navConnectBtn');
        var walletLink = document.getElementById('walletNavLink');
        var walletDisplay = document.getElementById('navWalletDisplay');
        var bellWrapper = document.getElementById('notificationBellWrapper');
        var userProfile = document.getElementById('userProfile');
        var navAuthLinks = document.getElementById('navAuthLinks');
        var ddDisconnect = document.getElementById('disconnectWalletItem') || document.getElementById('ddDisconnectWallet');

        var drawerWallet = document.getElementById('drawerWalletRow');
        var drawerConnect = document.getElementById('drawerConnectRow');
        var drawerAuth = document.getElementById('drawerAuthRow');
        var drawerWalletLnk = document.getElementById('drawerLinkWallet') || document.getElementById('mobileWalletLink');
        var mobileConnect = document.getElementById('mobileConnectNavItem');

        if (!isLoggedIn) {
            if (walletNavItem) walletNavItem.style.display = 'none';
            if (walletDisplay) walletDisplay.style.display = 'none';
            if (bellWrapper) bellWrapper.style.display = 'none';
            if (userProfile) userProfile.style.display = 'none';
            if (navAuthLinks) navAuthLinks.style.display = 'flex';
            if (drawerAuth) drawerAuth.style.display = 'flex';
            if (drawerWallet) drawerWallet.style.display = 'none';
            if (drawerConnect) drawerConnect.style.display = 'none';
            if (drawerWalletLnk) drawerWalletLnk.style.display = 'none';
            if (mobileConnect) mobileConnect.style.display = 'none';
            return;
        }

        if (navAuthLinks) navAuthLinks.style.display = 'none';
        if (bellWrapper) bellWrapper.style.display = '';
        if (userProfile) userProfile.style.display = '';
        if (drawerAuth) drawerAuth.style.display = 'none';
        if (walletNavItem) walletNavItem.style.display = '';

        var initEl = document.getElementById('navUserInitials') || document.querySelector('.user-avatar-nav');
        var nameEl = document.getElementById('navUserName') || document.querySelector('.user-name-nav');
        if (initEl) initEl.textContent = initials || 'U';
        if (nameEl) nameEl.textContent = userName;

        if (isConnected) {
            if (connectBtn) {
                connectBtn.style.display = 'none';
                connectBtn.classList.add('hidden');
            }
            if (walletLink) walletLink.style.display = 'inline-flex';
            if (walletDisplay) walletDisplay.style.display = 'flex';
            if (ddDisconnect) ddDisconnect.style.display = '';
            if (drawerConnect) drawerConnect.style.display = 'none';
            if (drawerWallet) drawerWallet.style.display = 'flex';
            if (drawerWalletLnk) drawerWalletLnk.style.display = '';
            if (mobileConnect) mobileConnect.style.display = 'none';

            var short = shortAddress(address);
            var addrEl = document.getElementById('navWalletAddress');
            var balEl = document.getElementById('navWalletBalance');
            var netEl = document.getElementById('navNetworkLabel') || document.getElementById('navWalletNetwork');
            var dAddr = document.getElementById('drawerWalletAddress');
            var dMeta = document.getElementById('drawerWalletMeta');
            if (addrEl) addrEl.textContent = short || '0x742d...3a8f';
            if (balEl) balEl.textContent = balance;
            if (netEl) netEl.textContent = network;
            if (dAddr) dAddr.textContent = short;
            if (dMeta) dMeta.textContent = balance + ' · ' + network;
            if (walletDisplay) {
                walletDisplay.setAttribute('aria-label', 'Wallet: ' + short + ' on ' + network);
            }
        } else {
            if (connectBtn) {
                connectBtn.style.display = 'inline-flex';
                connectBtn.classList.remove('hidden');
            }
            if (walletLink) walletLink.style.display = 'none';
            if (walletDisplay) walletDisplay.style.display = 'none';
            if (ddDisconnect) ddDisconnect.style.display = 'none';
            if (drawerConnect) drawerConnect.style.display = 'block';
            if (drawerWallet) drawerWallet.style.display = 'none';
            if (drawerWalletLnk) drawerWalletLnk.style.display = 'none';
            if (mobileConnect) mobileConnect.style.display = '';
        }
    };

    /* ─── Active state from body[data-nav-active] ─────────── */
    window.setNavActive = function setNavActive() {
        var active = document.body.dataset.navActive;
        if (!active) return;

        document.querySelectorAll('.nav-link.active, .nav-dropdown-trigger.is-active-route').forEach(function (el) {
            el.classList.remove('active', 'is-active-route');
            el.removeAttribute('aria-current');
        });

        var page = location.pathname.split('/').pop();

        if (active === 'dashboard') {
            var dash = document.getElementById('navLinkDashboard') ||
                document.querySelector('.nav-links a[href*="dashboard-enhanced"]');
            if (dash) { dash.classList.add('active'); dash.setAttribute('aria-current', 'page'); }
        } else if (active === 'wallet') {
            var wl = document.getElementById('walletNavLink');
            if (wl) { wl.classList.add('active'); wl.setAttribute('aria-current', 'page'); }
        } else if (active === 'transact') {
            var tb = document.getElementById('navDdTransactBtn');
            if (tb) tb.classList.add('is-active-route');
            var menu = document.getElementById('navDdTransactMenu');
            if (menu) {
                var match = menu.querySelector('a[href="' + page + '"]') ||
                    menu.querySelector('a[href*="' + page + '"]');
                if (match) match.setAttribute('aria-current', 'page');
            }
        } else if (active === 'centres') {
            var ct = document.getElementById('navLinkCentres') ||
                document.querySelector('.nav-links a[href*="explore-centres"]');
            if (ct) { ct.classList.add('active'); ct.setAttribute('aria-current', 'page'); }
        }
    };

    /* ─── Dropdown toggles ────────────────────────────────── */
    function closeNavDropdowns() {
        document.querySelectorAll('.nav-dropdown-item').forEach(function (item) {
            item.classList.remove('open');
            var btn = item.querySelector('.nav-dropdown-trigger');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    }

    function initNavDropdowns() {
        document.querySelectorAll('.nav-dropdown-item').forEach(function (item) {
            var btn = item.querySelector('.nav-dropdown-trigger');
            if (!btn) return;

            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                var open = !item.classList.contains('open');
                closeNavDropdowns();
                if (open) {
                    item.classList.add('open');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });

            btn.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    btn.click();
                }
                if (e.key === 'ArrowDown' && item.classList.contains('open')) {
                    e.preventDefault();
                    var first = item.querySelector('.nav-dropdown-menu a');
                    if (first) first.focus();
                }
            });

            var menu = item.querySelector('.nav-dropdown-menu');
            if (menu) {
                menu.addEventListener('keydown', function (e) {
                    var items = Array.from(menu.querySelectorAll('a'));
                    var idx = items.indexOf(document.activeElement);
                    if (e.key === 'ArrowDown') {
                        e.preventDefault();
                        items[(idx + 1) % items.length].focus();
                    }
                    if (e.key === 'ArrowUp') {
                        e.preventDefault();
                        items[(idx - 1 + items.length) % items.length].focus();
                    }
                    if (e.key === 'Escape') {
                        closeNavDropdowns();
                        btn.focus();
                    }
                });
            }
        });

        document.addEventListener('click', function (e) {
            if (!e.target.closest('.nav-dropdown-item')) closeNavDropdowns();
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') closeNavDropdowns();
    });

    /* ─── Mobile drawer accordions (user profile + notifications) ─ */
    function measureMobileAccordionHeight(dropdown) {
        var prevMax = dropdown.style.maxHeight;
        dropdown.style.maxHeight = 'none';
        var height = dropdown.scrollHeight;
        dropdown.style.maxHeight = prevMax;
        return height;
    }

    function setMobileAccordionOpen(dropdown, chevron, open, immediate) {
        if (!dropdown) return;
        if (open) {
            dropdown.classList.add('open');
            dropdown.style.maxHeight = measureMobileAccordionHeight(dropdown) + 'px';
            if (chevron) chevron.classList.add('open');
        } else if (immediate) {
            dropdown.classList.remove('open');
            dropdown.style.maxHeight = '';
            if (chevron) chevron.classList.remove('open');
        } else {
            if (!dropdown.classList.contains('open')) {
                dropdown.style.maxHeight = '';
                if (chevron) chevron.classList.remove('open');
                return;
            }
            dropdown.style.maxHeight = measureMobileAccordionHeight(dropdown) + 'px';
            requestAnimationFrame(function () {
                dropdown.style.maxHeight = '0';
                dropdown.classList.remove('open');
                if (chevron) chevron.classList.remove('open');
            });
        }
    }

    function closeMobileUserDropdown(immediate) {
        setMobileAccordionOpen(
            document.getElementById('mobileUserDropdown'),
            document.getElementById('mobileUserChevron'),
            false,
            immediate
        );
    }

    function closeMobileNotificationDropdown(immediate) {
        setMobileAccordionOpen(
            document.getElementById('mobileNotificationDropdown'),
            document.getElementById('mobileNotifChevron'),
            false,
            immediate
        );
    }

    window.closeMobileDrawerAccordions = function closeMobileDrawerAccordions() {
        closeMobileUserDropdown(true);
        closeMobileNotificationDropdown(true);
    };

    window.toggleMobileUserDropdown = function toggleMobileUserDropdown() {
        var dropdown = document.getElementById('mobileUserDropdown');
        var chevron = document.getElementById('mobileUserChevron');
        if (!dropdown) return;
        var opening = !dropdown.classList.contains('open');
        if (opening) closeMobileNotificationDropdown(true);
        setMobileAccordionOpen(dropdown, chevron, opening);
    };

    window.toggleMobileNotificationPanel = function toggleMobileNotificationPanel() {
        var dropdown = document.getElementById('mobileNotificationDropdown');
        var chevron = document.getElementById('mobileNotifChevron');
        if (!dropdown) return;
        var opening = !dropdown.classList.contains('open');
        if (opening) closeMobileUserDropdown(true);
        setMobileAccordionOpen(dropdown, chevron, opening);
    };

    function initMobileDrawerAccordionReset() {
        var menu = document.querySelector('.mobile-menu');
        if (!menu) return;
        var observer = new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                if (m.attributeName === 'class' && !menu.classList.contains('active')) {
                    closeMobileDrawerAccordions();
                }
            });
        });
        observer.observe(menu, { attributes: true, attributeFilter: ['class'] });
    }

    document.addEventListener('DOMContentLoaded', function () {
        syncNavAuthState();
        setNavActive();
        initNavDropdowns();
        initMobileDrawerAccordionReset();
    });

    window.addEventListener('storage', syncNavAuthState);

    /** Prefer shared wallet-auth modal when script is loaded on the page */
    window.openConnectModal = function openConnectModalFromNav() {
        if (typeof window.openWalletAuthModal === 'function') {
            window.openWalletAuthModal({ intent: 'connect' });
            return;
        }
    };
})();
