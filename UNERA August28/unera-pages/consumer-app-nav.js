/**
 * Huma V2 - Consumer app navigation system
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

    function hasDualSessionNav() {
        var display = document.getElementById('navWalletDisplay');
        return !!(display && display.querySelector('.nav-wallet-session-connected'));
    }

    function getWalletSessionConnected() {
        return localStorage.getItem('walletConnected') === 'true' ||
            !!localStorage.getItem('walletAddress');
    }

    function getPrimaryBoundWalletShort() {
        try {
            var bound = JSON.parse(localStorage.getItem('boundWallets') || '[]');
            if (!bound.length) return '';
            var primary = bound.find(function (w) { return w.isPrimary; }) || bound[0];
            var a = primary.address || '';
            if (a.length < 10) return a;
            return a.slice(0, 6) + '...' + a.slice(-4);
        } catch (e) {
            return '';
        }
    }

    function getWalletStatusChipCopy(connected) {
        if (connected) {
            var live = localStorage.getItem('walletAddress') || '';
            return live.length > 10 ? live.slice(0, 6) + '...' + live.slice(-4) : (live || 'Connected');
        }
        var saved = getPrimaryBoundWalletShort();
        return saved ? ('Saved · ' + saved + ' · Not connected') : 'No wallet connected';
    }

    function syncNavWalletFields(address, balance, network) {
        var short = shortAddress(address);
        var addrEl = document.getElementById('navWalletAddress');
        var balEl = document.getElementById('navWalletBalance');
        var netEl = document.getElementById('navNetworkLabel') || document.getElementById('navWalletNetwork');
        var dAddr = document.getElementById('drawerWalletAddress');
        var dBal = document.getElementById('drawerWalletBalance');
        var dNet = document.getElementById('drawerWalletNetwork');
        var dMeta = document.getElementById('drawerWalletMeta');
        if (addrEl) addrEl.textContent = short || '0x742d...3a8f';
        if (balEl) balEl.textContent = balance;
        if (netEl) netEl.textContent = network;
        if (dAddr) dAddr.textContent = short;
        if (dBal) dBal.textContent = balance;
        if (dNet) dNet.textContent = network;
        if (dMeta) dMeta.textContent = balance + ' · ' + network;
    }

    var NAV_CONNECT_MENU_SVG =
        '<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
        '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>' +
        '</svg>';

    var SESSION_ONLY_MENU_IDS = [
        'switchWalletItem', 'disconnectWalletItem',
        'switchWalletItemMobile', 'disconnectWalletItemMobile'
    ];

    function isMyWalletMenuLink(el) {
        if (!el || el.tagName !== 'A') return false;
        var href = el.getAttribute('href') || '';
        if (href.indexOf('wallet-enhanced') !== -1) return true;
        return el.textContent.replace(/\s+/g, ' ').trim() === 'My Wallet';
    }

    function setMenuItemVisible(el, visible) {
        if (!el) return;
        el.style.display = visible ? '' : 'none';
        if (!visible) {
            el.setAttribute('aria-hidden', 'true');
            el.hidden = true;
        } else {
            el.removeAttribute('aria-hidden');
            el.hidden = false;
        }
    }

    function ensureNavConnectMenuItem(show) {
        var desktop = document.getElementById('desktopMenuContainer');
        var mobileContent = document.querySelector('#mobileUserDropdown .mobile-user-dropdown-content');

        [desktop, mobileContent].forEach(function (container) {
            if (!container) return;

            var legacyDivider = container.querySelector('[data-nav-connect-divider="true"]');
            if (legacyDivider) legacyDivider.remove();

            if (!show) {
                var stale = container.querySelector('[data-nav-connect-menu="true"]');
                if (stale) stale.remove();
                return;
            }

            var logoutLink = container.querySelector('a[onclick*="logout"]');
            if (!logoutLink) return;

            var existing = container.querySelector('[data-nav-connect-menu="true"]');
            if (existing && existing.nextElementSibling === logoutLink) return;
            if (existing) existing.remove();

            var itemClass = container.id === 'desktopMenuContainer'
                ? 'dropdown-item-nav'
                : 'mobile-dropdown-item';

            var link = document.createElement('a');
            link.href = '#';
            link.className = itemClass;
            link.setAttribute('data-nav-connect-menu', 'true');
            link.setAttribute('id', container.id === 'desktopMenuContainer'
                ? 'navConnectMenuItemDesktop' : 'navConnectMenuItemMobile');
            link.setAttribute('aria-label', 'Connect wallet');
            link.innerHTML = NAV_CONNECT_MENU_SVG + ' Connect wallet';
            link.addEventListener('click', function (e) {
                e.preventDefault();
                if (typeof openConnectModal === 'function') openConnectModal();
            });

            container.insertBefore(link, logoutLink);
        });
    }

    function patchUserMenuItemsForSession(connected) {
        SESSION_ONLY_MENU_IDS.forEach(function (id) {
            setMenuItemVisible(document.getElementById(id), connected);
        });

        document.querySelectorAll(
            '#desktopMenuContainer a.dropdown-item-nav, ' +
            '#mobileUserDropdown a.mobile-dropdown-item'
        ).forEach(function (el) {
            if (isMyWalletMenuLink(el)) {
                setMenuItemVisible(el, connected);
            }
        });

        ensureNavConnectMenuItem(!connected);
    }

    function patchMobileDisconnectedChrome(connected) {
        var copy = getWalletStatusChipCopy(connected);

        // Top drawer wallet row is retired - the wallet now lives in the profile accordion. Keep hidden.
        var drawerWallet = document.getElementById('drawerWalletRow');
        if (drawerWallet) drawerWallet.style.display = 'none';

        // Wallet-status pill inside the mobile profile accordion (mirrors the desktop dropdown header).
        var chip = document.getElementById('mobileWalletStatusChip');
        var chipText = document.getElementById('mobileDropdownWalletAddress');
        if (chip) chip.dataset.state = connected ? 'connected' : 'disconnected';
        if (chipText) chipText.textContent = copy;

        var content = document.querySelector('#mobileUserDropdown .mobile-user-dropdown-content');
        if (!content) return;

        content.querySelectorAll('.mobile-dropdown-section').forEach(function (section) {
            var title = section.querySelector('.mobile-dropdown-section-title');
            if (title && title.textContent.trim().toUpperCase() === 'NETWORK') {
                section.setAttribute('data-session-section', 'network');
                if (connected) {
                    section.removeAttribute('hidden');
                    section.style.display = '';
                } else {
                    section.hidden = true;
                    section.style.display = 'none';
                }
            }
        });
    }

    // Copy the connected wallet address from the mobile profile wallet pill
    window.copyMobileWalletAddress = function copyMobileWalletAddress(btn) {
        if (!btn || btn.dataset.state !== 'connected') return;
        var txt = (document.getElementById('mobileDropdownWalletAddress') || {}).textContent || '';
        var addr = (txt.split('·')[0] || txt).trim();
        if (!addr) return;
        if (typeof window.copyToClipboard === 'function') { window.copyToClipboard(addr, 'Wallet address'); return; }
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(addr);
    };

    function patchDropdownHeaderStatusChip(connected) {
        var chip = document.getElementById('dropdownWalletStatusChip');
        var chipText = document.getElementById('dropdownWalletStatusText');
        var legacyAddr = document.getElementById('dropdownWalletAddress');
        var copy = getWalletStatusChipCopy(connected);
        if (chip) chip.dataset.state = connected ? 'connected' : 'disconnected';
        if (chipText) chipText.textContent = copy;
        if (legacyAddr) legacyAddr.textContent = connected ? copy : '';
    }

    window.applyNavWalletSession = function applyNavWalletSession() {
        if (!hasDualSessionNav()) return;

        var connected = getWalletSessionConnected();
        var display = document.getElementById('navWalletDisplay');
        if (!display) return;

        document.body.dataset.walletSession = connected ? 'connected' : 'disconnected';

        var connectedBlock = display.querySelector('.nav-wallet-session-connected');
        var disconnectedBlock = display.querySelector('.nav-wallet-session-disconnected');
        var connectBtn = document.getElementById('navConnectBtn');
        var walletLink = document.getElementById('walletNavLink');

        display.dataset.walletSession = connected ? 'connected' : 'disconnected';
        display.style.display = 'flex';
        display.setAttribute('aria-label', connected
            ? ('Wallet: ' + (document.getElementById('navWalletAddress')?.textContent || '') +
               ' on ' + (document.getElementById('navNetworkLabel')?.textContent || ''))
            : 'Account menu, wallet not connected');

        if (connectedBlock) connectedBlock.hidden = !connected;
        if (disconnectedBlock) disconnectedBlock.hidden = connected;

        if (connectBtn) connectBtn.style.display = connected ? 'none' : 'inline-flex';
        if (walletLink) walletLink.style.display = connected ? 'inline-flex' : 'none';

        if (connected) {
            var live = localStorage.getItem('walletAddress') || '';
            var balance = localStorage.getItem('walletBalance') || '2,500.00 hUSD';
            var _rawNetwork = localStorage.getItem('walletNetwork') || localStorage.getItem('selectedNetwork') ||
                JSON.stringify({ id: 'base', label: 'Base', color: '#0052FF' });
            var network;
            try {
                var _parsedNet = JSON.parse(_rawNetwork);
                network = (_parsedNet && _parsedNet.label) ? _parsedNet.label : _rawNetwork;
            } catch (e) {
                network = _rawNetwork;
            }
            syncNavWalletFields(live, balance, network);
        }

        patchDropdownHeaderStatusChip(connected);
        patchMobileDisconnectedChrome(connected);
        patchUserMenuItemsForSession(connected);

        var drawerConnect = document.getElementById('drawerConnectRow');
        if (drawerConnect) {
            drawerConnect.style.display = 'none';
            drawerConnect.hidden = true;
            drawerConnect.setAttribute('aria-hidden', 'true');
        }

        if (connected && typeof applyUnsupportedNetworkState === 'function') {
            applyUnsupportedNetworkState();
        }
    };

    function initNavWalletSessionMenuHooks() {
        if (!hasDualSessionNav()) return;

        var mobileMenu = document.getElementById('mobileUserMenu');
        var desktopMenu = document.getElementById('desktopMenuContainer');
        if (typeof MutationObserver !== 'undefined') {
            var patchQueued = false;
            var observer = new MutationObserver(function () {
                if (patchQueued) return;
                patchQueued = true;
                requestAnimationFrame(function () {
                    patchQueued = false;
                    patchUserMenuItemsForSession(getWalletSessionConnected());
                });
            });
            if (mobileMenu) observer.observe(mobileMenu, { childList: true, subtree: true });
            if (desktopMenu) observer.observe(desktopMenu, { childList: true, subtree: true });
        }

        var origToggleMobileUser = window.toggleMobileUserDropdown;
        if (typeof origToggleMobileUser === 'function') {
            window.toggleMobileUserDropdown = function () {
                origToggleMobileUser.apply(this, arguments);
                applyNavWalletSession();
            };
        }
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
        var _rawNetwork = localStorage.getItem('walletNetwork') || localStorage.getItem('selectedNetwork') ||
            JSON.stringify({ id: 'base', label: 'Base', color: '#0052FF' });
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
        var ddSwitch = document.getElementById('switchWalletItem');
        var ddSwitchMobile = document.getElementById('switchWalletItemMobile');

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

        if (hasDualSessionNav()) {
            if (isConnected) {
                syncNavWalletFields(address, balance, network);
                if (ddDisconnect) ddDisconnect.style.display = '';
                if (ddSwitch) ddSwitch.style.display = '';
                if (ddSwitchMobile) ddSwitchMobile.style.display = '';
            } else {
                if (ddDisconnect) ddDisconnect.style.display = 'none';
                if (ddSwitch) ddSwitch.style.display = 'none';
                if (ddSwitchMobile) ddSwitchMobile.style.display = 'none';
            }
            applyNavWalletSession();
            return;
        }

        if (isConnected) {
            if (connectBtn) {
                connectBtn.style.display = 'none';
                connectBtn.classList.add('hidden');
            }
            if (walletLink) walletLink.style.display = 'inline-flex';
            if (walletDisplay) walletDisplay.style.display = 'flex';
            if (ddDisconnect) ddDisconnect.style.display = '';
            if (ddSwitch) ddSwitch.style.display = '';
            if (ddSwitchMobile) ddSwitchMobile.style.display = '';
            if (drawerConnect) drawerConnect.style.display = 'none';
            if (drawerWallet) drawerWallet.style.display = 'flex';
            if (drawerWalletLnk) drawerWalletLnk.style.display = '';
            if (mobileConnect) mobileConnect.style.display = 'none';

            var short = shortAddress(address);
            var addrEl = document.getElementById('navWalletAddress');
            var balEl = document.getElementById('navWalletBalance');
            var netEl = document.getElementById('navNetworkLabel') || document.getElementById('navWalletNetwork');
            var dAddr = document.getElementById('drawerWalletAddress');
            var dBal = document.getElementById('drawerWalletBalance');
            var dNet = document.getElementById('drawerWalletNetwork');
            var dMeta = document.getElementById('drawerWalletMeta');
            if (addrEl) addrEl.textContent = short || '0x742d...3a8f';
            if (balEl) balEl.textContent = balance;
            if (netEl) netEl.textContent = network;
            if (dAddr) dAddr.textContent = short;
            if (dBal) dBal.textContent = balance;
            if (dNet) dNet.textContent = network;
            if (dMeta) dMeta.textContent = balance + ' · ' + network;
            if (walletDisplay) {
                walletDisplay.setAttribute('aria-label', 'Wallet: ' + short + ' on ' + network);
            }
            if (typeof applyUnsupportedNetworkState === 'function') applyUnsupportedNetworkState();
        } else {
            if (connectBtn) {
                connectBtn.style.display = 'inline-flex';
                connectBtn.classList.remove('hidden');
            }
            if (walletLink) walletLink.style.display = 'none';
            if (walletDisplay) walletDisplay.style.display = 'none';
            if (ddDisconnect) ddDisconnect.style.display = 'none';
            if (ddSwitch) ddSwitch.style.display = 'none';
            if (ddSwitchMobile) ddSwitchMobile.style.display = 'none';
            if (drawerConnect) drawerConnect.style.display = 'block';
            if (drawerWallet) drawerWallet.style.display = 'none';
            if (drawerWalletLnk) drawerWalletLnk.style.display = 'none';
            if (mobileConnect) mobileConnect.style.display = 'none';
        }
    };

    /* ─── Active state from body[data-nav-active] ─────────── */
    window.setNavActive = function setNavActive() {
        var active = document.body.dataset.navActive;

        document.querySelectorAll('.nav-link.active, .nav-dropdown-trigger.is-active-route').forEach(function (el) {
            el.classList.remove('active', 'is-active-route');
            el.removeAttribute('aria-current');
        });

        if (active) {
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
            } else if (active === 'centers') {
                var ct = document.getElementById('navLinkDashboard') ||
                    document.querySelector('.nav-links a[href*="dashboard-enhanced"]');
                if (ct) { ct.classList.add('active'); ct.setAttribute('aria-current', 'page'); }
            }
        }

        setUserMenuActive(document.body.dataset.userMenuActive || active || '');
    };

    function setUserMenuActive(activePage) {
        document.querySelectorAll(
            '#desktopMenuContainer .dropdown-item-nav, #mobileUserDropdown .mobile-dropdown-item'
        ).forEach(function (el) {
            el.classList.remove('active');
            el.removeAttribute('aria-current');
        });

        if (!activePage) return;

        function markActive(selector) {
            document.querySelectorAll(selector).forEach(function (el) {
                el.classList.add('active');
                el.setAttribute('aria-current', 'page');
            });
        }

        if (activePage === 'centers' || activePage === 'dashboard') {
            markActive('#desktopMenuContainer a[href*="dashboard-enhanced"], #mobileUserDropdown a[href*="dashboard-enhanced"]');
        } else if (activePage === 'wallet') {
            markActive('#desktopMenuContainer a[href*="wallet-enhanced"], #mobileUserDropdown a[href*="wallet-enhanced"]');
        } else if (activePage === 'account-settings') {
            var settings = document.getElementById('menuLinkAccountSettings');
            if (settings) { settings.classList.add('active'); settings.setAttribute('aria-current', 'page'); }
        } else if (activePage === 'address-book') {
            var ab = document.getElementById('menuLinkAddressBook');
            if (ab) { ab.classList.add('active'); ab.setAttribute('aria-current', 'page'); }
        }
    }

    /* ─── User menu (desktop dropdown + mobile accordion) ─── */
    var USER_MENU_ITEMS = [
        { section: 'ACCOUNT', items: [
            { label: 'My Profile', href: 'account-settings.html', icon: 'profile' },
            { label: 'Account Settings', href: 'account-settings.html', icon: 'settings', id: 'menuLinkAccountSettings' },
        ]},
        { divider: true },
        { label: 'My Wallet', href: 'wallet-enhanced.html', icon: 'wallet' },
        { label: 'Address Book', href: 'payee-management.html', icon: 'addressbook', id: 'menuLinkAddressBook' },
        { label: 'Dashboard', href: 'dashboard-enhanced.html', icon: 'dashboard' },
        { divider: true },
        { label: 'Switch wallet', action: 'switchWalletFromNav', id: 'switchWalletItem', icon: 'switch', hideByDefault: true },
        { label: 'Disconnect Wallet', action: 'disconnectWallet', id: 'disconnectWalletItem', icon: 'disconnect', hideByDefault: true },
        { label: 'Log Out', action: 'logout', icon: 'logout' },
    ];

    var MENU_ICONS = {
        profile: '<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>',
        settings: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
        wallet: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
        addressbook: '<path stroke-linecap="round" stroke-linejoin="round" d="M4 19.5V5a2 2 0 012-2h13v18H6a2 2 0 01-2-2zM4 19.5A2.5 2.5 0 016.5 17H19"/><circle cx="11" cy="9.5" r="1.8"/><path stroke-linecap="round" stroke-linejoin="round" d="M8 14c0-1.7 1.3-3 3-3s3 1.3 3 3"/>',
        dashboard: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
        centers: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
        switch: '<path stroke-linecap="round" stroke-linejoin="round" d="M17 1l4 4-4 4"/><path stroke-linecap="round" stroke-linejoin="round" d="M3 11V9a4 4 0 014-4h14"/><path stroke-linecap="round" stroke-linejoin="round" d="M7 23l-4-4 4-4"/><path stroke-linecap="round" stroke-linejoin="round" d="M21 13v2a4 4 0 01-4 4H3"/>',
        disconnect: '<path stroke-linecap="round" stroke-linejoin="round" d="M13 7a4 4 0 11-8 0 4 4 0 018 0zM9 14a6 6 0 00-6 6v1h12v-1a6 6 0 00-6-6zM21 12h-6"/>',
        logout: '<path stroke-linecap="round" stroke-linejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>',
    };

    function getNavBase() {
        return document.body.dataset.navBase || '';
    }

    function resolveMenuHref(href) {
        return getNavBase() + href;
    }

    function isUserMenuItemActive(item, activePage) {
        if (activePage === 'centers' && item.label === 'Dashboard') return true;
        if (activePage === 'dashboard' && item.label === 'Dashboard') return true;
        if (activePage === 'wallet' && item.label === 'My Wallet') return true;
        if (activePage === 'account-settings' && item.label === 'Account Settings') return true;
        return false;
    }

    /* Product network allowlist: mainnet + testnet demo chains.
     * Removed from product demo: polygon, arbitrum, optimism, bnb - restore when multi-chain ships. */
    var PRODUCT_NETWORKS = [
        { id: 'ethereum', label: 'Ethereum', color: '#627EEA', chainId: '1' },
        { id: 'base', label: 'Base', color: '#0052FF', chainId: '8453' },
        { id: 'sepolia', label: 'Sepolia', color: '#627EEA', chainId: '11155111', testnet: true },
        { id: 'base-sepolia', label: 'Base Sepolia', color: '#0052FF', chainId: '84532', testnet: true }
    ];
    var PRODUCT_NETWORK_IDS = PRODUCT_NETWORKS.map(function (n) { return n.id; });
    var SUPPORTED_CHAIN_IDS = PRODUCT_NETWORKS.map(function (n) { return n.chainId; });
    var REMOVED_PRODUCT_CHAIN_IDS = ['polygon', 'arbitrum', 'optimism', 'bnb'];

    var MOBILE_NETWORK_ICONS = {
        ethereum: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#627EEA"/><path d="M10 3.5L6 10.2l4 2.3 4-2.3L10 3.5z" fill="white" opacity="0.8"/><path d="M6 10.2l4 5.8 4-5.8-4 2.3-4-2.3z" fill="white"/></svg>',
        base: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#0052FF"/><path d="M10 3C6.13 3 3 6.13 3 10s3.13 7 7 7c3.63 0 6.64-2.76 6.97-6.3H10V9h7.97c-.36-3.88-3.61-7-7.97-7V3z" fill="white"/></svg>',
        sepolia: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#627EEA" opacity="0.5"/><path d="M10 3.5L6 10.2l4 2.3 4-2.3L10 3.5z" fill="white" opacity="0.8"/><path d="M6 10.2l4 5.8 4-5.8-4 2.3-4-2.3z" fill="white"/></svg>',
        'base-sepolia': '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#0052FF" opacity="0.5"/><path d="M10 4.5C7 4.5 4.5 7 4.5 10S7 15.5 10 15.5c2.6 0 4.8-1.7 5.4-4H10V10h7c0 3.9-3.1 7-7 7s-7-3.1-7-7 3.1-7 7-7c1.8 0 3.4.7 4.6 1.8l-1.4 1.4C12.3 5.4 11.2 4.5 10 4.5z" fill="white"/></svg>'
    };

    function getSelectedNetworkFromStorage() {
        var raw = localStorage.getItem('selectedNetwork') || localStorage.getItem('walletNetwork') || '';
        if (!raw) return { id: 'base', label: 'Base', color: '#0052FF' };
        try {
            var parsed = JSON.parse(raw);
            if (parsed && parsed.id) return parsed;
            if (parsed && parsed.label) return { id: '', label: parsed.label, color: parsed.color || '' };
        } catch (e) {
            return { id: '', label: raw, color: '' };
        }
        return { id: 'base', label: 'Base', color: '#0052FF' };
    }

    function isProductNetwork(chainId) {
        return PRODUCT_NETWORK_IDS.indexOf(chainId) !== -1;
    }

    function getWalletNetworkDropdown() {
        return document.getElementById('walletNetworkDropdown') || document.getElementById('networkDropdown');
    }

    function getNetworkDropdownTrigger() {
        return document.querySelector('.nav-network-badge');
    }

    function renderMobileNetworkOptionsHtml() {
        var stored = getSelectedNetworkFromStorage();
        return PRODUCT_NETWORKS.map(function (net) {
            var activeClass = stored.id === net.id ? ' active' : '';
            return '<div class="mobile-network-option mobile-dropdown-item' + activeClass + '" data-chain-id="' + net.id +
                '" data-chain-label="' + net.label + '" data-chain-color="' + net.color +
                '" onclick="switchNetwork(\'' + net.id + '\',\'' + net.label + '\',\'' + net.color + '\',this)">' +
                (MOBILE_NETWORK_ICONS[net.id] || '') + net.label + '</div>';
        }).join('');
    }

    window.renderUserMenu = function renderUserMenu(variant, options) {
        var opts = options || {};
        var activePage = opts.activePage || '';
        var walletConnected = localStorage.getItem('walletConnected') === 'true';

        function renderItem(item, itemClass) {
            var iconSvg = item.icon
                ? '<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' +
                    (MENU_ICONS[item.icon] || '') + '</svg>'
                : '';
            var hideStyle = item.hideByDefault && !walletConnected ? ' style="display: none;"' : '';
            var activeClass = isUserMenuItemActive(item, activePage) ? ' active' : '';
            if (item.action) {
                var actionId = '';
                if (item.label === 'Disconnect Wallet') {
                    actionId = itemClass === 'mobile-dropdown-item' ? 'disconnectWalletItemMobile' : 'disconnectWalletItem';
                } else if (item.label === 'Switch wallet') {
                    actionId = itemClass === 'mobile-dropdown-item' ? 'switchWalletItemMobile' : 'switchWalletItem';
                } else if (item.id) {
                    actionId = item.id;
                }
                var idStr = actionId ? ' id="' + actionId + '"' : '';
                return '<a href="#" class="' + itemClass + activeClass + '"' + idStr + hideStyle +
                    ' onclick="' + item.action + '(); return false;">' + iconSvg + ' ' + item.label + '</a>';
            }
            var idAttr = item.id ? ' id="' + item.id + '"' : '';
            return '<a href="' + resolveMenuHref(item.href) + '" class="' + itemClass + activeClass + '"' +
                idAttr + hideStyle + '>' + iconSvg + ' ' + item.label + '</a>';
        }

        if (variant === 'desktop') {
            var html = '';
            USER_MENU_ITEMS.forEach(function (entry) {
                if (entry.divider) {
                    html += '<div class="dropdown-divider-nav"></div>';
                } else if (entry.section) {
                    html += '<div class="dropdown-section-nav"><div class="dropdown-section-title-nav">' +
                        entry.section + '</div>';
                    entry.items.forEach(function (item) {
                        html += renderItem(item, 'dropdown-item-nav');
                    });
                    html += '</div>';
                } else {
                    html += renderItem(entry, 'dropdown-item-nav');
                }
            });
            return html;
        }

        if (variant === 'mobile') {
            var menuHtml = '';
            USER_MENU_ITEMS.forEach(function (entry) {
                if (entry.divider) {
                    menuHtml += '<div class="mobile-dropdown-divider"></div>';
                } else if (entry.section) {
                    menuHtml += '<div class="mobile-dropdown-section"><div class="mobile-dropdown-section-title">' +
                        entry.section + '</div>';
                    entry.items.forEach(function (item) {
                        menuHtml += renderItem(item, 'mobile-dropdown-item');
                    });
                    menuHtml += '</div>';
                } else {
                    menuHtml += renderItem(entry, 'mobile-dropdown-item');
                }
            });
            return (
                '<div class="mobile-user-profile">' +
                    '<div class="mobile-user-profile-header" onclick="toggleMobileUserDropdown()">' +
                        '<div class="mobile-user-info">' +
                            '<div class="mobile-user-avatar">JS</div>' +
                            '<div class="mobile-user-details">' +
                                '<div class="mobile-user-name">Jane Smith</div>' +
                                '<div class="mobile-user-email">jane@example.com</div>' +
                            '</div>' +
                        '</div>' +
                        '<svg class="mobile-user-chevron" id="mobileUserChevron" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">' +
                            '<path d="M6 9l6 6 6-6"/>' +
                        '</svg>' +
                    '</div>' +
                    '<div class="mobile-user-dropdown" id="mobileUserDropdown">' +
                        '<div class="mobile-user-dropdown-content">' +
                            '<div class="mobile-wallet-profile">' +
                                '<div class="mobile-wallet-chips">' +
                                    '<span class="dropdown-chip dropdown-chip--level">Regular User</span>' +
                                    '<span class="dropdown-chip dropdown-chip--verified" data-verified="true">' +
                                        '<svg viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="m344-60-76-128-144-32 14-148-98-112 98-112-14-148 144-32 76-128 136 58 136-58 76 128 144 32-14 148 98 112-98 112 14 148-144 32-76 128-136-58-136 58Zm94-278 226-226-56-58-170 170-86-84-56 56 142 142Z"/></svg>' +
                                        '<span class="dropdown-chip-verified-text">Verified</span>' +
                                    '</span>' +
                                '</div>' +
                                '<button type="button" class="dropdown-wallet-addr-nav mobile-wallet-status-pill" id="mobileWalletStatusChip" data-state="disconnected" aria-live="polite" onclick="if(window.copyMobileWalletAddress)window.copyMobileWalletAddress(this)">' +
                                    '<span class="dropdown-wallet-addr-icon" aria-hidden="true">🦊</span>' +
                                    '<span class="dropdown-wallet-addr-text" id="mobileDropdownWalletAddress">No wallet connected</span>' +
                                    '<svg class="dropdown-wallet-copy" viewBox="0 -960 960 960" fill="currentColor" aria-hidden="true"><path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-520h80v520h440v80H200Zm160-240v-480 480Z"/></svg>' +
                                '</button>' +
                            '</div>' +
                            '<div class="mobile-dropdown-section">' +
                                '<div class="mobile-dropdown-section-title">Network</div>' +
                                renderMobileNetworkOptionsHtml() +
                                '<div class="mobile-dropdown-divider"></div>' +
                            '</div>' +
                            menuHtml +
                        '</div>' +
                    '</div>' +
                '</div>'
            );
        }
        return '';
    };

    function hydrateUserMenus() {
        var menuOpts = {
            activePage: document.body.dataset.userMenuActive || document.body.dataset.navActive || '',
        };
        var desktop = document.getElementById('desktopMenuContainer');
        if (desktop) desktop.innerHTML = renderUserMenu('desktop', menuOpts);
        var mobile = document.getElementById('mobileUserMenu');
        if (mobile) mobile.innerHTML = renderUserMenu('mobile', menuOpts);
    }

    /* ─── User dropdown (avatar + wallet address triggers) ─ */
    function setUserDropdownOpen(open) {
        var dropdown = document.getElementById('userDropdown');
        var walletTrigger = document.querySelector('.nav-wallet-trigger');
        if (dropdown) dropdown.classList.toggle('show', open);
        if (walletTrigger) walletTrigger.setAttribute('aria-expanded', String(open));
    }

    window.toggleUserDropdown = function toggleUserDropdown(event) {
        if (event) event.stopPropagation();
        if (typeof closeNotificationPanel === 'function') closeNotificationPanel();
        if (typeof closeNetworkDropdown === 'function') closeNetworkDropdown();
        var dropdown = document.getElementById('userDropdown');
        if (!dropdown) return;
        setUserDropdownOpen(!dropdown.classList.contains('show'));
    };

    window.switchWalletFromNav = function switchWalletFromNav() {
        setUserDropdownOpen(false);
        var mobile = document.getElementById('mobileUserDropdown');
        var chevron = document.getElementById('mobileUserChevron');
        if (mobile) {
            mobile.classList.remove('open');
            mobile.style.maxHeight = '';
        }
        if (chevron) chevron.classList.remove('open');
        window.openConnectModal();
    };

    window.handleUserMenuTriggerKey = function handleUserMenuTriggerKey(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleUserDropdown(event);
        } else if (event.key === 'Escape') {
            setUserDropdownOpen(false);
            event.currentTarget.focus();
        }
    };

    function initUserDropdownOutsideClick() {
        document.addEventListener('click', function (event) {
            var navWalletDisplay = document.getElementById('navWalletDisplay');
            var userDropdown = document.getElementById('userDropdown');
            if (userDropdown && userDropdown.classList.contains('show') &&
                navWalletDisplay && !navWalletDisplay.contains(event.target)) {
                setUserDropdownOpen(false);
            }
        });
    }

    function initUserDropdownAriaSync() {
        var userDropdown = document.getElementById('userDropdown');
        if (!userDropdown || typeof MutationObserver === 'undefined') return;
        var observer = new MutationObserver(function () {
            var walletTrigger = document.querySelector('.nav-wallet-trigger');
            if (walletTrigger) {
                walletTrigger.setAttribute('aria-expanded', String(userDropdown.classList.contains('show')));
            }
        });
        observer.observe(userDropdown, { attributes: true, attributeFilter: ['class'] });
    }

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

    function closeMobileTransactAccordion(immediate) {
        setMobileAccordionOpen(
            document.getElementById('mobileTransactSubmenu'),
            document.getElementById('mobileTransactChevron'),
            false,
            immediate
        );
        var btn = document.getElementById('mobileTransactAccordionBtn');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    }

    window.toggleMobileTransactAccordion = function toggleMobileTransactAccordion() {
        var panel = document.getElementById('mobileTransactSubmenu');
        var chevron = document.getElementById('mobileTransactChevron');
        var btn = document.getElementById('mobileTransactAccordionBtn');
        if (!panel) return;
        var opening = !panel.classList.contains('open');
        setMobileAccordionOpen(panel, chevron, opening);
        if (btn) btn.setAttribute('aria-expanded', String(opening));
    };

    window.closeMobileDrawerAccordions = function closeMobileDrawerAccordions() {
        closeMobileUserDropdown(true);
        closeMobileNotificationDropdown(true);
        closeMobileTransactAccordion(true);
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
                if (m.attributeName !== 'class') return;
                if (!menu.classList.contains('active')) {
                    closeMobileDrawerAccordions();
                } else {
                    openMobileTransactAccordionDefault();
                }
            });
        });
        observer.observe(menu, { attributes: true, attributeFilter: ['class'] });
    }

    function createMobileTransactChevron() {
        var chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        chevron.setAttribute('class', 'mobile-nav-accordion-chevron');
        chevron.setAttribute('id', 'mobileTransactChevron');
        chevron.setAttribute('width', '20');
        chevron.setAttribute('height', '20');
        chevron.setAttribute('viewBox', '0 0 24 24');
        chevron.setAttribute('fill', 'none');
        chevron.setAttribute('stroke', 'currentColor');
        chevron.setAttribute('stroke-width', '2');
        chevron.setAttribute('aria-hidden', 'true');
        var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M6 9l6 6 6-6');
        chevron.appendChild(path);
        return chevron;
    }

    function openMobileTransactAccordionDefault() {
        var panel = document.getElementById('mobileTransactSubmenu');
        var chevron = document.getElementById('mobileTransactChevron');
        var trigger = document.getElementById('mobileTransactAccordionBtn');
        if (!panel || !trigger) return;
        setMobileAccordionOpen(panel, chevron, true);
        trigger.setAttribute('aria-expanded', 'true');
    }

    function initMobileTransactAccordion() {
        if (document.getElementById('mobileTransactAccordion')) {
            openMobileTransactAccordionDefault();
            return;
        }

        var navLinks = document.querySelector('.mobile-nav-links');
        if (!navLinks) return;

        var labels = navLinks.querySelectorAll('li.mobile-nav-section-label');
        var label = null;
        labels.forEach(function (el) {
            if (el.textContent.trim() === 'TRANSACT') label = el;
        });
        if (!label) return;

        var subItems = [];
        var next = label.nextElementSibling;
        while (next && next.querySelector('a.mobile-nav-sub')) {
            subItems.push(next);
            next = next.nextElementSibling;
        }
        if (subItems.length === 0) return;

        var accordionItem = document.createElement('li');
        accordionItem.className = 'mobile-nav-accordion-item';
        accordionItem.id = 'mobileTransactAccordion';

        var trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'mobile-nav-section-label mobile-nav-accordion-trigger';
        trigger.id = 'mobileTransactAccordionBtn';
        trigger.setAttribute('aria-expanded', 'false');
        trigger.setAttribute('aria-controls', 'mobileTransactSubmenu');

        var labelText = document.createElement('span');
        labelText.textContent = 'TRANSACT';
        trigger.appendChild(labelText);
        trigger.appendChild(createMobileTransactChevron());

        var panel = document.createElement('ul');
        panel.className = 'mobile-nav-accordion-panel';
        panel.id = 'mobileTransactSubmenu';
        panel.setAttribute('role', 'list');

        subItems.forEach(function (item) {
            panel.appendChild(item);
        });

        accordionItem.appendChild(trigger);
        accordionItem.appendChild(panel);
        label.replaceWith(accordionItem);

        trigger.addEventListener('click', function () {
            toggleMobileTransactAccordion();
        });

        trigger.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleMobileTransactAccordion();
            }
        });

        openMobileTransactAccordionDefault();
    }

    /* ─── Network switcher (3-part pill - separate network badge) ─── */
    function isSelectedNetworkSupported(selected) {
        if (selected.id && isProductNetwork(selected.id)) return true;
        if (selected.label === 'Ethereum' || selected.label === 'Base' ||
            selected.label === 'Sepolia' || selected.label === 'Base Sepolia') return true;
        var numericChain = localStorage.getItem('chainId') || '';
        if (numericChain) return SUPPORTED_CHAIN_IDS.indexOf(String(numericChain)) !== -1;
        if (selected.id || (selected.label && selected.label !== 'Base')) return false;
        return true;
    }

    window.applyUnsupportedNetworkState = function applyUnsupportedNetworkState() {
        var badge = document.querySelector('.nav-network-badge');
        var netLabel = document.getElementById('navNetworkLabel');
        var selected = getSelectedNetworkFromStorage();
        var supported = isSelectedNetworkSupported(selected);
        var netText = supported ? (selected.label || 'Base') : 'Unsupported network';
        if (badge) badge.classList.toggle('is-unsupported', !supported);
        if (netLabel) netLabel.textContent = netText;
        if (badge) badge.setAttribute('aria-label', 'Switch network, currently ' + netText);
        var drawerNet = document.getElementById('drawerWalletNetwork');
        if (drawerNet && !supported) drawerNet.textContent = 'Unsupported network';
    };

    window.closeNetworkDropdown = function closeNetworkDropdown() {
        var dropdown = getWalletNetworkDropdown();
        var badge = document.querySelector('.nav-network-badge');
        if (dropdown) dropdown.classList.remove('show');
        if (badge) {
            badge.classList.remove('open');
            badge.setAttribute('aria-expanded', 'false');
        }
    };

    window.toggleNetworkDropdown = function toggleNetworkDropdown(event) {
        if (event) event.stopPropagation();
        if (typeof closeNotificationPanel === 'function') closeNotificationPanel();
        setUserDropdownOpen(false);
        var badge = getNetworkDropdownTrigger();
        if (!badge) return;
        var dropdown = getWalletNetworkDropdown();
        if (!dropdown) return;
        var isOpen = dropdown.classList.toggle('show');
        badge.classList.toggle('open', isOpen);
        badge.setAttribute('aria-expanded', String(isOpen));
        if (isOpen) {
            var firstOption = dropdown.querySelector('.network-option-nav');
            if (firstOption) firstOption.focus();
        }
    };

    window.switchNetwork = function switchNetwork(chainId, label, chainColor, optionEl) {
        document.querySelectorAll('.network-option-nav').forEach(function (el) {
            el.classList.remove('active');
            el.setAttribute('aria-selected', 'false');
        });
        var desktopMatch = document.querySelector('.network-option-nav[data-chain-id="' + chainId + '"]');
        if (desktopMatch) {
            desktopMatch.classList.add('active');
            desktopMatch.setAttribute('aria-selected', 'true');
        } else if (optionEl && optionEl.classList.contains('network-option-nav')) {
            optionEl.classList.add('active');
            optionEl.setAttribute('aria-selected', 'true');
        }

        document.querySelectorAll('.mobile-network-option').forEach(function (el) {
            el.classList.remove('active');
        });
        var mobileMatch = document.querySelector('.mobile-network-option[data-chain-id="' + chainId + '"]');
        if (mobileMatch) mobileMatch.classList.add('active');

        var netLabel = document.getElementById('navNetworkLabel');
        if (netLabel) netLabel.textContent = label;

        var navIcon = document.getElementById('navNetworkIcon');
        if (navIcon && chainColor) navIcon.style.color = chainColor;

        var badge = document.querySelector('.nav-network-badge');
        if (badge) badge.setAttribute('aria-label', 'Switch network, currently ' + label);

        var drawerNet = document.getElementById('drawerWalletNetwork');
        if (drawerNet) drawerNet.textContent = label;

        closeNetworkDropdown();

        var netMeta = PRODUCT_NETWORKS.filter(function (n) { return n.id === chainId; })[0];
        try {
            localStorage.setItem('selectedNetwork', JSON.stringify({
                id: chainId,
                label: label,
                color: chainColor,
                chainId: netMeta ? netMeta.chainId : ''
            }));
            if (netMeta && netMeta.chainId) localStorage.setItem('chainId', netMeta.chainId);
        } catch (e) { /* ignore */ }

        applyUnsupportedNetworkState();
        if (typeof syncNavAuthState === 'function') syncNavAuthState();
    };

    window.handleNetworkBadgeKey = function handleNetworkBadgeKey(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleNetworkDropdown(event);
        } else if (event.key === 'Escape') {
            closeNetworkDropdown();
            event.currentTarget.focus();
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            var dropdown = getWalletNetworkDropdown();
            var badge = event.currentTarget;
            if (dropdown && !dropdown.classList.contains('show')) {
                badge.classList.add('open');
                badge.setAttribute('aria-expanded', 'true');
                dropdown.classList.add('show');
            }
            var firstOption = dropdown && dropdown.querySelector('.network-option-nav');
            if (firstOption) firstOption.focus();
        }
    };

    window.handleNetworkOptionKey = function handleNetworkOptionKey(event) {
        var dropdown = getWalletNetworkDropdown();
        var options = dropdown ? Array.from(dropdown.querySelectorAll('.network-option-nav')) : [];
        var idx = options.indexOf(event.currentTarget);
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.currentTarget.click();
        } else if (event.key === 'Escape') {
            event.preventDefault();
            closeNetworkDropdown();
            var trigger = getNetworkDropdownTrigger();
            if (trigger) trigger.focus();
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            var next = options[idx + 1];
            if (next) next.focus();
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (idx === 0) {
                var triggerUp = getNetworkDropdownTrigger();
                if (triggerUp) triggerUp.focus();
            } else {
                options[idx - 1].focus();
            }
        }
    };

    window.copyNavWalletAddress = function copyNavWalletAddress() {
        var addr = localStorage.getItem('walletAddress') || '';
        if (addr && navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(addr).catch(function () { /* ignore */ });
        }
        closeNetworkDropdown();
    };

    function pruneNetworkDropdownOptions() {
        document.querySelectorAll('.network-option-nav').forEach(function (opt) {
            var id = opt.getAttribute('data-chain-id');
            if (REMOVED_PRODUCT_CHAIN_IDS.indexOf(id) !== -1) opt.remove();
        });
    }

    function pruneMobileNetworkOptions() {
        document.querySelectorAll('.mobile-network-option').forEach(function (opt) {
            var id = opt.getAttribute('data-chain-id');
            if (PRODUCT_NETWORK_IDS.indexOf(id) === -1) opt.remove();
        });
    }

    function cleanupChunkEMergeArtifacts() {
        var mergedTrigger = document.getElementById('navWalletNetworkTrigger');
        if (mergedTrigger) mergedTrigger.remove();

        var dropdown = getWalletNetworkDropdown();
        if (dropdown) {
            dropdown.querySelectorAll('[data-consumer-nav-wallet-section], .wallet-network-dropdown-wallet, .network-dropdown-divider-nav').forEach(function (el) {
                el.remove();
            });
            dropdown.removeAttribute('data-wallet-network-dropdown');
        }

        var walletTrigger = document.querySelector('.nav-wallet-trigger');
        if (walletTrigger) {
            walletTrigger.removeAttribute('aria-hidden');
            if (!walletTrigger.getAttribute('onclick')) {
                walletTrigger.setAttribute('onclick', 'toggleUserDropdown(event)');
            }
            if (!walletTrigger.getAttribute('onkeydown')) {
                walletTrigger.setAttribute('onkeydown', 'handleUserMenuTriggerKey(event)');
            }
        }

        var networkBadge = document.querySelector('.nav-network-badge');
        if (networkBadge) {
            networkBadge.removeAttribute('aria-hidden');
            if (!networkBadge.getAttribute('onclick')) {
                networkBadge.setAttribute('onclick', 'toggleNetworkDropdown(event)');
            }
            if (!networkBadge.getAttribute('onkeydown')) {
                networkBadge.setAttribute('onkeydown', 'handleNetworkBadgeKey(event)');
            }
        }

        var addrEl = document.getElementById('navWalletAddress');
        if (addrEl) {
            addrEl.classList.remove('nav-wallet-network-address');
            if (!addrEl.closest('.nav-wallet-trigger') && !addrEl.closest('.nav-wallet-info')) {
                var info = document.querySelector('.nav-wallet-info.nav-wallet-trigger, .nav-wallet-info');
                if (info) {
                    var row = info.querySelector('.nav-wallet-address-row');
                    if (row) row.insertBefore(addrEl, row.firstChild);
                    else info.insertBefore(addrEl, info.firstChild);
                }
            }
        }

        var netEl = document.getElementById('navNetworkLabel');
        if (netEl) {
            netEl.classList.remove('nav-wallet-network-name');
            if (!netEl.closest('.nav-network-badge')) {
                var badge = document.querySelector('.nav-network-badge');
                if (badge) {
                    var icon = badge.querySelector('.nav-network-icon');
                    if (icon && icon.nextSibling) badge.insertBefore(netEl, icon.nextSibling);
                    else badge.appendChild(netEl);
                }
            }
        }
    }

    function restoreNetworkFromStorage() {
        var stored = getSelectedNetworkFromStorage();
        if (!stored.id || !isProductNetwork(stored.id)) {
            applyUnsupportedNetworkState();
            return;
        }
        var desktopMatch = document.querySelector('.network-option-nav[data-chain-id="' + stored.id + '"]');
        if (desktopMatch) {
            switchNetwork(
                stored.id,
                stored.label || desktopMatch.getAttribute('data-chain-label'),
                stored.color || desktopMatch.getAttribute('data-chain-color'),
                desktopMatch
            );
        }
    }

    function initNetworkDropdownOutsideClick() {
        document.addEventListener('click', function (event) {
            var display = document.getElementById('navWalletDisplay');
            var dropdown = getWalletNetworkDropdown();
            if (dropdown && dropdown.classList.contains('show') &&
                display && !display.contains(event.target)) {
                closeNetworkDropdown();
            }
        });
    }

    window.initConsumerNavWalletNetwork = function initConsumerNavWalletNetwork() {
        cleanupChunkEMergeArtifacts();
        pruneNetworkDropdownOptions();
        pruneMobileNetworkOptions();
        restoreNetworkFromStorage();
        applyUnsupportedNetworkState();
    };

    function injectDrawerWalletRowStyles() {
        if (document.getElementById('consumer-nav-drawer-wallet-styles')) return;
        var style = document.createElement('style');
        style.id = 'consumer-nav-drawer-wallet-styles';
        style.textContent = [
            '.mobile-drawer-wallet-row{display:flex;align-items:center;gap:0.5rem;padding:0.5rem 0.875rem;margin:0 0 0.75rem;',
            'background:color-mix(in srgb,var(--brand-cloud-blue) 40%,var(--brand-white));border-radius:10px;border:1px solid var(--border-subtle)}',
            '.drawer-wallet-info{flex:1;min-width:0;display:flex;flex-direction:column;gap:0.25rem}',
            '#drawerWalletAddress{color:var(--brand-deep-blue)!important;font-size:0.8rem;font-weight:600;line-height:1.2}',
            '.drawer-wallet-meta-row{display:flex;align-items:baseline;justify-content:space-between;gap:0.5rem;width:100%}',
            '#drawerWalletBalance{color:var(--text-secondary)!important;font-size:0.7rem;line-height:1.3;flex:1;min-width:0;',
            'overflow:hidden;text-overflow:ellipsis;white-space:nowrap}',
            '#drawerWalletNetwork{color:var(--text-secondary)!important;font-size:0.7rem;line-height:1.3;text-align:right;',
            'flex-shrink:0;font-weight:500}'
        ].join('');
        document.head.appendChild(style);
    }

    function stripDrawerWalletInlineColors(el) {
        if (!el || !el.style) return;
        el.style.removeProperty('color');
        el.style.removeProperty('font-size');
        el.style.removeProperty('font-weight');
    }

    function migrateDrawerWalletMetaRow(info) {
        if (!info || info.querySelector('.drawer-wallet-meta-row')) return;
        var legacyMeta = document.getElementById('drawerWalletMeta');
        if (!legacyMeta) return;

        var balance = '';
        var network = '';
        var parts = legacyMeta.textContent.split('·');
        if (parts.length >= 2) {
            balance = parts[0].trim();
            network = parts.slice(1).join('·').trim();
        } else {
            balance = legacyMeta.textContent.trim();
        }

        var metaRow = document.createElement('div');
        metaRow.className = 'drawer-wallet-meta-row';

        var balSpan = document.createElement('span');
        balSpan.id = 'drawerWalletBalance';
        balSpan.textContent = balance;

        var netSpan = document.createElement('span');
        netSpan.id = 'drawerWalletNetwork';
        netSpan.textContent = network;

        metaRow.appendChild(balSpan);
        metaRow.appendChild(netSpan);
        legacyMeta.replaceWith(metaRow);
    }

    function normalizeDrawerWalletRow() {
        var row = document.getElementById('drawerWalletRow');
        if (!row) return;
        row.querySelectorAll('button').forEach(function (btn) {
            if ((btn.getAttribute('onclick') || '').indexOf('disconnectWallet') !== -1) btn.remove();
        });
        var addr = document.getElementById('drawerWalletAddress');
        var info = addr && addr.parentElement;
        if (info) {
            info.classList.add('drawer-wallet-info');
            migrateDrawerWalletMetaRow(info);
        }
        stripDrawerWalletInlineColors(addr);
        stripDrawerWalletInlineColors(document.getElementById('drawerWalletBalance'));
        stripDrawerWalletInlineColors(document.getElementById('drawerWalletNetwork'));
        stripDrawerWalletInlineColors(document.getElementById('drawerWalletMeta'));
    }

    document.addEventListener('DOMContentLoaded', function () {
        injectDrawerWalletRowStyles();
        normalizeDrawerWalletRow();
        hydrateUserMenus();
        initConsumerNavWalletNetwork();
        initNavWalletSessionMenuHooks();
        syncNavAuthState();
        applyNavWalletSession();
        setNavActive();
        initNavDropdowns();
        initUserDropdownOutsideClick();
        initUserDropdownAriaSync();
        initNetworkDropdownOutsideClick();
        initMobileTransactAccordion();
        initMobileDrawerAccordionReset();
    });

    window.addEventListener('storage', function () {
        syncNavAuthState();
        applyNavWalletSession();
    });

    /** Prefer shared wallet-auth modal when script is loaded on the page */
    window.openConnectModal = function openConnectModalFromNav() {
        if (typeof window.openWalletAuthModal === 'function') {
            window.openWalletAuthModal({ intent: 'connect' });
            return;
        }
        if (typeof window.showWalletSelectionModal === 'function') {
            window.showWalletSelectionModal();
            return;
        }
        var modal = document.getElementById('connectModal');
        if (modal) {
            window._connectScenario = 'happy';
            modal.querySelectorAll('.scenario-pill').forEach(function (p) {
                p.classList.toggle('active', p.getAttribute('data-scenario') === 'happy');
            });
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            modal.setAttribute('aria-hidden', 'false');
            var closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 100);
        }
    };
})();
