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
            } else if (active === 'centres') {
                var ct = document.getElementById('navLinkCentres') ||
                    document.querySelector('.nav-links a[href*="explore-centres"]');
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

        if (activePage === 'centres') {
            var centres = document.getElementById('menuLinkCentres');
            if (centres) { centres.classList.add('active'); centres.setAttribute('aria-current', 'page'); }
        } else if (activePage === 'dashboard') {
            markActive('#desktopMenuContainer a[href*="dashboard-enhanced"], #mobileUserDropdown a[href*="dashboard-enhanced"]');
        } else if (activePage === 'wallet') {
            markActive('#desktopMenuContainer a[href*="wallet-enhanced"], #mobileUserDropdown a[href*="wallet-enhanced"]');
        } else if (activePage === 'account-settings') {
            var settings = document.getElementById('menuLinkAccountSettings');
            if (settings) { settings.classList.add('active'); settings.setAttribute('aria-current', 'page'); }
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
        { label: 'Dashboard', href: 'dashboard-enhanced.html', icon: 'dashboard' },
        { label: 'Centres', href: 'explore-centres.html', icon: 'centres', id: 'menuLinkCentres' },
        { divider: true },
        { label: 'Switch wallet', action: 'switchWalletFromNav', id: 'switchWalletItem', icon: 'switch', hideByDefault: true },
        { label: 'Disconnect Wallet', action: 'disconnectWallet', id: 'disconnectWalletItem', icon: 'disconnect', hideByDefault: true },
        { label: 'Log Out', action: 'logout', icon: 'logout' },
    ];

    var MENU_ICONS = {
        profile: '<path stroke-linecap="round" stroke-linejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>',
        settings: '<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
        wallet: '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>',
        dashboard: '<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>',
        centres: '<path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>',
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
        if (activePage === 'centres' && item.label === 'Centres') return true;
        if (activePage === 'dashboard' && item.label === 'Dashboard') return true;
        if (activePage === 'wallet' && item.label === 'My Wallet') return true;
        if (activePage === 'account-settings' && item.label === 'Account Settings') return true;
        return false;
    }

    /* E4 — Product network allowlist: Ethereum + Base only.
     * Removed from product demo: polygon, arbitrum, optimism, bnb — restore when multi-chain ships. */
    var PRODUCT_NETWORKS = [
        { id: 'ethereum', label: 'Ethereum', color: '#627EEA', chainId: '1' },
        { id: 'base', label: 'Base', color: '#0052FF', chainId: '8453' }
    ];
    var PRODUCT_NETWORK_IDS = PRODUCT_NETWORKS.map(function (n) { return n.id; });
    var SUPPORTED_CHAIN_IDS = PRODUCT_NETWORKS.map(function (n) { return n.chainId; });
    var REMOVED_PRODUCT_CHAIN_IDS = ['polygon', 'arbitrum', 'optimism', 'bnb'];

    var MOBILE_NETWORK_ICONS = {
        ethereum: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#627EEA"/><path d="M10 3.5L6 10.2l4 2.3 4-2.3L10 3.5z" fill="white" opacity="0.8"/><path d="M6 10.2l4 5.8 4-5.8-4 2.3-4-2.3z" fill="white"/></svg>',
        base: '<svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true"><circle cx="10" cy="10" r="10" fill="#0052FF"/><path d="M10 3C6.13 3 3 6.13 3 10s3.13 7 7 7c3.63 0 6.64-2.76 6.97-6.3H10V9h7.97c-.36-3.88-3.61-7-7.97-7V3z" fill="white"/></svg>'
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
        return document.getElementById('navWalletNetworkTrigger') || document.querySelector('.nav-network-badge');
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
                            '<div class="mobile-wallet-badge">' +
                                '<svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">' +
                                    '<rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/>' +
                                '</svg>' +
                                '<span id="mobileDropdownWalletAddress">0x742d...3a8f</span>' +
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

    /* ─── Merged wallet · network control — Chunk E §E1–E5 ─── */
    function isSelectedNetworkSupported(selected) {
        if (selected.id && isProductNetwork(selected.id)) return true;
        if (selected.label === 'Ethereum' || selected.label === 'Base') return true;
        var numericChain = localStorage.getItem('chainId') || '';
        if (numericChain) return SUPPORTED_CHAIN_IDS.indexOf(String(numericChain)) !== -1;
        if (selected.id || (selected.label && selected.label !== 'Base')) return false;
        return true;
    }

    window.applyUnsupportedNetworkState = function applyUnsupportedNetworkState() {
        var trigger = document.getElementById('navWalletNetworkTrigger');
        var netLabel = document.getElementById('navNetworkLabel');
        var selected = getSelectedNetworkFromStorage();
        var supported = isSelectedNetworkSupported(selected);
        if (trigger) trigger.classList.toggle('is-unsupported', !supported);
        if (netLabel) {
            netLabel.textContent = supported ? (selected.label || 'Base') : 'Unsupported network';
        }
        if (trigger) {
            var addr = (document.getElementById('navWalletAddress') || {}).textContent || '';
            var netText = supported ? (selected.label || 'Base') : 'Unsupported network';
            trigger.setAttribute('aria-label', 'Wallet and network, ' + addr + ' on ' + netText);
        }
        var drawerNet = document.getElementById('drawerWalletNetwork');
        if (drawerNet && !supported) drawerNet.textContent = 'Unsupported network';
    };

    window.closeNetworkDropdown = function closeNetworkDropdown() {
        var dropdown = getWalletNetworkDropdown();
        var trigger = document.getElementById('navWalletNetworkTrigger');
        var badge = document.querySelector('.nav-network-badge');
        if (dropdown) dropdown.classList.remove('show');
        if (trigger) {
            trigger.classList.remove('open');
            trigger.setAttribute('aria-expanded', 'false');
        }
        if (badge) {
            badge.classList.remove('open');
            badge.setAttribute('aria-expanded', 'false');
        }
    };

    window.toggleWalletNetworkDropdown = function toggleWalletNetworkDropdown(event) {
        if (event) event.stopPropagation();
        if (typeof closeNotificationPanel === 'function') closeNotificationPanel();
        setUserDropdownOpen(false);
        var trigger = document.getElementById('navWalletNetworkTrigger');
        var dropdown = getWalletNetworkDropdown();
        if (!dropdown) return;
        var isOpen = dropdown.classList.toggle('show');
        if (trigger) {
            trigger.classList.toggle('open', isOpen);
            trigger.setAttribute('aria-expanded', String(isOpen));
        }
        if (isOpen) {
            var firstOption = dropdown.querySelector('.wallet-network-action-btn, .network-option-nav');
            if (firstOption) firstOption.focus();
        }
    };

    window.toggleNetworkDropdown = function toggleNetworkDropdown(event) {
        if (event) event.stopPropagation();
        if (typeof closeNotificationPanel === 'function') closeNotificationPanel();
        setUserDropdownOpen(false);
        var trigger = getNetworkDropdownTrigger();
        if (!trigger) return;
        if (trigger.id === 'navWalletNetworkTrigger') {
            toggleWalletNetworkDropdown(event);
            return;
        }
        var dropdown = getWalletNetworkDropdown();
        if (!dropdown) return;
        var isOpen = dropdown.classList.toggle('show');
        trigger.classList.toggle('open', isOpen);
        trigger.setAttribute('aria-expanded', String(isOpen));
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

        var trigger = getNetworkDropdownTrigger();
        if (trigger) {
            trigger.setAttribute('aria-label', 'Wallet and network on ' + label);
        }
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

    window.handleWalletNetworkTriggerKey = function handleWalletNetworkTriggerKey(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleWalletNetworkDropdown(event);
        } else if (event.key === 'Escape') {
            closeNetworkDropdown();
            event.currentTarget.focus();
        } else if (event.key === 'ArrowDown') {
            event.preventDefault();
            var dropdown = getWalletNetworkDropdown();
            var trigger = event.currentTarget;
            if (dropdown && !dropdown.classList.contains('show')) {
                dropdown.classList.add('show');
                trigger.classList.add('open');
                trigger.setAttribute('aria-expanded', 'true');
            }
            var firstOption = dropdown && dropdown.querySelector('.wallet-network-action-btn, .network-option-nav');
            if (firstOption) firstOption.focus();
        }
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

    function enhanceWalletNetworkDropdown() {
        var dropdown = getWalletNetworkDropdown();
        if (!dropdown || dropdown.querySelector('[data-consumer-nav-wallet-section]')) return;

        var walletSection = document.createElement('div');
        walletSection.className = 'wallet-network-dropdown-wallet';
        walletSection.setAttribute('data-consumer-nav-wallet-section', '');
        walletSection.innerHTML =
            '<div class="network-dropdown-header-nav">Wallet</div>' +
            '<button type="button" class="wallet-network-action-btn" onclick="copyNavWalletAddress()">Copy address</button>' +
            '<a href="#" class="wallet-network-action-btn" onclick="switchWalletFromNav(); return false;">Switch wallet</a>' +
            '<a href="#" class="wallet-network-action-btn" id="walletNetworkDisconnect" onclick="if(typeof disconnectWallet===\'function\'){disconnectWallet();} return false;">Disconnect</a>';

        var divider = document.createElement('div');
        divider.className = 'network-dropdown-divider-nav';

        dropdown.insertBefore(divider, dropdown.firstChild);
        dropdown.insertBefore(walletSection, dropdown.firstChild);
    }

    window.upgradeNavWalletNetworkTrigger = function upgradeNavWalletNetworkTrigger() {
        var display = document.getElementById('navWalletDisplay');
        if (!display || display.querySelector('.nav-wallet-network-trigger')) return false;

        var walletTrigger = display.querySelector('.nav-wallet-trigger');
        var networkBadge = display.querySelector('.nav-network-badge');
        if (!walletTrigger && !networkBadge) return false;

        var addrEl = document.getElementById('navWalletAddress');
        var netEl = document.getElementById('navNetworkLabel');
        var addr = addrEl ? addrEl.textContent.trim() : '0x742d…3a8f';
        var net = netEl ? netEl.textContent.trim() : 'Base';

        var dropdown = getWalletNetworkDropdown();
        var dropdownId = dropdown ? (dropdown.id || 'networkDropdown') : 'networkDropdown';

        var btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'nav-wallet-network-trigger';
        btn.id = 'navWalletNetworkTrigger';
        btn.setAttribute('aria-haspopup', 'true');
        btn.setAttribute('aria-expanded', 'false');
        btn.setAttribute('aria-controls', dropdownId);
        btn.setAttribute('aria-label', 'Wallet and network, ' + addr + ' on ' + net);

        if (addrEl) {
            addrEl.classList.add('nav-wallet-network-address');
            btn.appendChild(addrEl);
        } else {
            var addrSpan = document.createElement('span');
            addrSpan.className = 'nav-wallet-network-address';
            addrSpan.id = 'navWalletAddress';
            addrSpan.textContent = addr;
            btn.appendChild(addrSpan);
        }

        var sep = document.createElement('span');
        sep.className = 'nav-wallet-network-sep';
        sep.setAttribute('aria-hidden', 'true');
        sep.textContent = '·';
        btn.appendChild(sep);

        if (netEl) {
            netEl.classList.add('nav-wallet-network-name');
            btn.appendChild(netEl);
        } else {
            var netSpan = document.createElement('span');
            netSpan.className = 'nav-wallet-network-name';
            netSpan.id = 'navNetworkLabel';
            netSpan.textContent = net;
            btn.appendChild(netSpan);
        }

        var chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        chevron.setAttribute('class', 'nav-wallet-chevron');
        chevron.setAttribute('viewBox', '0 0 24 24');
        chevron.setAttribute('fill', 'none');
        chevron.setAttribute('stroke', 'currentColor');
        chevron.setAttribute('stroke-width', '2.5');
        chevron.setAttribute('stroke-linecap', 'round');
        chevron.setAttribute('stroke-linejoin', 'round');
        chevron.setAttribute('aria-hidden', 'true');
        var chevronPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        chevronPath.setAttribute('d', 'M6 9l6 6 6-6');
        chevron.appendChild(chevronPath);
        btn.appendChild(chevron);

        btn.addEventListener('click', toggleWalletNetworkDropdown);
        btn.addEventListener('keydown', handleWalletNetworkTriggerKey);

        var avatar = display.querySelector('.nav-wallet-avatar, .nav-wallet-icon-badge, .user-avatar-nav');
        if (avatar && avatar.parentElement === display) {
            avatar.parentElement.insertBefore(btn, avatar.nextSibling);
        } else if (walletTrigger) {
            walletTrigger.parentElement.insertBefore(btn, walletTrigger);
        } else {
            display.appendChild(btn);
        }

        if (walletTrigger) {
            walletTrigger.removeAttribute('onclick');
            walletTrigger.removeAttribute('onkeydown');
            walletTrigger.setAttribute('aria-hidden', 'true');
        }
        if (networkBadge) {
            networkBadge.removeAttribute('onclick');
            networkBadge.removeAttribute('onkeydown');
            networkBadge.setAttribute('aria-hidden', 'true');
        }

        if (dropdown && dropdown.id === 'networkDropdown') {
            dropdown.setAttribute('data-wallet-network-dropdown', 'true');
        }

        applyUnsupportedNetworkState();
        return true;
    };

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
        upgradeNavWalletNetworkTrigger();
        pruneNetworkDropdownOptions();
        enhanceWalletNetworkDropdown();
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
        syncNavAuthState();
        setNavActive();
        initNavDropdowns();
        initUserDropdownOutsideClick();
        initUserDropdownAriaSync();
        initNetworkDropdownOutsideClick();
        initMobileTransactAccordion();
        initMobileDrawerAccordionReset();
    });

    window.addEventListener('storage', syncNavAuthState);

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
