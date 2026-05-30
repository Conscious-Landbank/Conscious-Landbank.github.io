(function () {
    'use strict';

    var DEMO_ADDRESS = '0x742d35Cc6634C0532925a3b844Bc9e7595f3a8f';
    var DEMO_WC_URI = 'wc:unera-demo-session@2?relay-protocol=irn&symKey=demo';
    var OUTCOME_ID = 'walletAuthOutcomeModal';
    var AUTH_MODAL_ID = 'walletAuthModal';
    var QR_MODAL_ID = 'walletConnectQrModal';

    var defaultCheckSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 -960 960 960" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>';

    var PROVIDER_NAMES = {
        metamask: 'MetaMask',
        walletconnect: 'WalletConnect',
        coinbase: 'Coinbase Wallet',
        brave: 'Brave Wallet',
        ledger: 'Ledger'
    };

    var EXTENSION_WALLETS = ['metamask', 'brave', 'ledger'];
    var EXTENSION_STEP_WALLETS = ['metamask', 'coinbase', 'brave'];

    var INSTALL_LINKS = {
        metamask: 'https://metamask.io/download/',
        walletconnect: 'https://walletconnect.com/',
        coinbase: 'https://www.coinbase.com/wallet/downloads',
        brave: 'https://brave.com/download/',
        ledger: 'https://www.ledger.com/ledger-live'
    };

    var EXTENSION_ICONS = {
        metamask: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M20.3 5.1L13.5 9.9l1.3-3L20.3 5.1z" fill="#E17726"/><path d="M3.7 5.1l6.7 4.9-1.2-3.1L3.7 5.1z" fill="#E27625"/></svg>',
        coinbase: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" fill="#0052FF"/><path d="M8 12h8" stroke="white" stroke-width="2"/></svg>',
        brave: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l2 9 8 6 8-6 2-9-10-5z" fill="#FB542B"/></svg>'
    };

    var _walletCardCache = new Map();
    var _activeProvider = null;
    var _toastTimer = null;

    window._walletAuthScenario = 'happy';
    window._walletAuthIntent = 'login';
    window._walletAuthReturnTo = null;

    function getScenarioFromUrl() {
        var params = new URLSearchParams(window.location.search);
        var s = params.get('demoScenario');
        if (s && ['happy', 'wrong-network', 'not-installed', 'user-rejected'].indexOf(s) !== -1) {
            return s;
        }
        return null;
    }

    function showToast(message) {
        var el = document.getElementById('walletAuthToast');
        if (!el) return;
        el.textContent = message;
        el.classList.add('show');
        if (_toastTimer) clearTimeout(_toastTimer);
        _toastTimer = setTimeout(function () {
            el.classList.remove('show');
        }, 2800);
    }

    function walletAuthNotify(message, type, title, options) {
        title = title !== undefined && title !== '' ? title : 'Success';
        options = options || {};
        var modal = document.getElementById(OUTCOME_ID);
        if (!modal) return;

        var icon = document.getElementById('walletAuthOutcomeIcon');
        var messageEl = document.getElementById('walletAuthOutcomeMessage');
        var titleEl = document.getElementById('walletAuthOutcomeTitle');
        var footer = document.getElementById('walletAuthOutcomeFooter');

        if (titleEl) titleEl.textContent = title;
        if (messageEl) messageEl.textContent = message;

        if (icon) {
            icon.className = 'wallet-auth-outcome-icon';
            if (type === 'error') icon.classList.add('error');
            else if (type === 'warning') icon.classList.add('warning');
            icon.innerHTML = defaultCheckSvg;
        }

        if (footer) {
            var existing = footer.querySelector('.wallet-auth-action-btn');
            if (existing) existing.remove();
            if (options.actionLabel && options.actionFn) {
                var actionBtn = document.createElement('button');
                actionBtn.type = 'button';
                actionBtn.className = 'wallet-auth-action-btn';
                actionBtn.textContent = options.actionLabel;
                actionBtn.onclick = function () {
                    closeWalletAuthOutcomeModal();
                    options.actionFn();
                };
                footer.insertBefore(actionBtn, footer.firstChild);
            }
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeWalletAuthOutcomeModal() {
        var modal = document.getElementById(OUTCOME_ID);
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        var footer = document.getElementById('walletAuthOutcomeFooter');
        if (footer) {
            var actionBtn = footer.querySelector('.wallet-auth-action-btn');
            if (actionBtn) actionBtn.remove();
        }
        if (!isAnyWalletModalOpen()) {
            document.body.style.overflow = '';
        }
    }

    function isAnyWalletModalOpen() {
        var auth = document.getElementById(AUTH_MODAL_ID);
        var qr = document.getElementById(QR_MODAL_ID);
        var out = document.getElementById(OUTCOME_ID);
        return (auth && auth.classList.contains('active')) ||
            (qr && qr.classList.contains('active')) ||
            (out && out.classList.contains('active'));
    }

    function setWalletAuthScenario(scenario, btn) {
        window._walletAuthScenario = scenario;
        document.querySelectorAll('#walletAuthModal .scenario-pill').forEach(function (p) {
            p.classList.remove('active');
        });
        if (btn) btn.classList.add('active');
        applyNotInstalledState(scenario === 'not-installed');
    }

    function applyNotInstalledState(active) {
        var grid = document.getElementById('walletAuthGrid');
        if (!grid) return;

        grid.querySelectorAll('.wallet-option-card').forEach(function (card) {
            var provider = card.dataset.provider;
            var isExtension = EXTENSION_WALLETS.indexOf(provider) !== -1;

            if (active && isExtension) {
                if (!_walletCardCache.has(provider)) {
                    _walletCardCache.set(provider, card.innerHTML);
                }
                card.classList.add('not-installed');
                var nameEl = card.querySelector('.wallet-name');
                if (nameEl && !card.querySelector('.wallet-not-installed-label')) {
                    var link = INSTALL_LINKS[provider] || INSTALL_LINKS.metamask;
                    var lbl = nameEl.textContent;
                    nameEl.insertAdjacentHTML(
                        'afterend',
                        '<span class="wallet-not-installed-label">Not installed</span>' +
                            '<button type="button" class="wallet-install-btn" aria-label="Install ' + lbl + '" ' +
                            'onclick="window.open(\'' + link + '\', \'_blank\')">Install</button>'
                    );
                }
            } else {
                card.classList.remove('not-installed');
                if (_walletCardCache.has(provider)) {
                    card.innerHTML = _walletCardCache.get(provider);
                }
            }
        });
    }

    function showWalletAuthStep(step) {
        ['walletAuthStepPicker', 'walletAuthStepExtension', 'walletAuthStepLoading'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.hidden = true;
        });
        if (step === 'picker') {
            var p = document.getElementById('walletAuthStepPicker');
            if (p) p.hidden = false;
        } else if (step === 'extension') {
            var e = document.getElementById('walletAuthStepExtension');
            if (e) e.hidden = false;
        } else if (step === 'loading') {
            var l = document.getElementById('walletAuthStepLoading');
            if (l) l.hidden = false;
        }
    }

    function showWalletAuthPickerStep() {
        showWalletAuthStep('picker');
    }

    function openWalletAuthModal(options) {
        options = options || {};
        var intent = options.intent || 'login';
        window._walletAuthIntent = intent;
        window._walletAuthReturnTo = options.returnTo || null;

        var urlScenario = getScenarioFromUrl();
        window._walletAuthScenario = urlScenario || 'happy';

        var modal = document.getElementById(AUTH_MODAL_ID);
        if (!modal) return;

        if (intent === 'login' || intent === 'signup') {
            var already = localStorage.getItem('isLoggedIn') === 'true';
            if (already && intent === 'login') {
                window.location.href = resolveWalletAuthRedirect('login');
                return;
            }
        }

        document.querySelectorAll('#walletAuthModal .scenario-pill').forEach(function (p) {
            p.classList.remove('active');
            if (p.dataset.scenario === window._walletAuthScenario) {
                p.classList.add('active');
            }
        });
        if (!modal.querySelector('.scenario-pill.active')) {
            var happy = modal.querySelector('.scenario-pill[data-scenario="happy"]');
            if (happy) happy.classList.add('active');
            window._walletAuthScenario = 'happy';
        }

        applyNotInstalledState(window._walletAuthScenario === 'not-installed');
        showWalletAuthPickerStep();

        var title = document.getElementById('walletAuthTitle');
        var desc = document.getElementById('walletAuthDesc');
        if (intent === 'connect') {
            if (title) title.textContent = 'Connect. Contribute. Change lives.';
            if (desc) desc.textContent = 'Unera is your gateway to impact. Select a supported wallet to authenticate and continue.';
        } else if (intent === 'signup') {
            if (title) title.textContent = 'Sign up with your wallet';
            if (desc) desc.textContent = 'Create your UNERA account by connecting a supported wallet.';
        } else {
            if (title) title.textContent = 'Log in with your wallet';
            if (desc) desc.textContent = 'Unera is your gateway to impact. Select a supported wallet to authenticate and continue.';
        }

        modal.classList.add('active');
        modal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        var closeBtn = document.getElementById('walletAuthCloseBtn');
        if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 100);
    }

    function closeWalletAuthModal() {
        var modal = document.getElementById(AUTH_MODAL_ID);
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        if (!isAnyWalletModalOpen()) {
            document.body.style.overflow = '';
        }
        showWalletAuthPickerStep();
    }

    function openWalletConnectQrModal() {
        var qr = document.getElementById(QR_MODAL_ID);
        if (!qr) return;
        qr.classList.add('active');
        qr.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        var list = document.getElementById('wcWalletBrowseList');
        var browseBtn = document.getElementById('wcBrowseWalletsBtn');
        if (list) list.hidden = true;
        if (browseBtn) browseBtn.setAttribute('aria-expanded', 'false');
    }

    function closeWalletConnectQrModal() {
        var qr = document.getElementById(QR_MODAL_ID);
        if (!qr) return;
        qr.classList.remove('active');
        qr.setAttribute('aria-hidden', 'true');
        if (document.getElementById(AUTH_MODAL_ID) &&
            document.getElementById(AUTH_MODAL_ID).classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else if (!isAnyWalletModalOpen()) {
            document.body.style.overflow = '';
        }
    }

    function toggleWalletConnectBrowseList() {
        var list = document.getElementById('wcWalletBrowseList');
        var btn = document.getElementById('wcBrowseWalletsBtn');
        if (!list) return;
        var open = list.hidden;
        list.hidden = !open;
        if (btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
    }

    function copyWalletConnectDemoLink() {
        var uri = DEMO_WC_URI;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(uri).then(function () {
                showToast('Link copied');
            }).catch(function () {
                showToast('Copy failed — try again');
            });
        } else {
            showToast('Link: ' + uri);
        }
    }

    function showExtensionSteps(provider) {
        _activeProvider = provider;
        var name = PROVIDER_NAMES[provider] || provider;
        var iconEl = document.getElementById('walletExtensionIcon');
        var nameEl = document.getElementById('walletExtensionName');
        var signNote = document.getElementById('walletExtensionSignNote');
        if (iconEl) iconEl.innerHTML = EXTENSION_ICONS[provider] || '';
        if (nameEl) nameEl.textContent = name;
        if (signNote) {
            signNote.hidden = window._walletAuthIntent === 'connect';
        }
        showWalletAuthStep('extension');
        setTimeout(function () {
            runWalletAuthFlow(provider);
        }, 800);
    }

    function handleWalletAuth(provider) {
        _activeProvider = provider;
        if (provider === 'walletconnect') {
            openWalletConnectQrModal();
            return;
        }
        if (EXTENSION_STEP_WALLETS.indexOf(provider) !== -1) {
            showExtensionSteps(provider);
            return;
        }
        runWalletAuthFlow(provider);
    }

    function simulateWalletConnectQrSuccess() {
        closeWalletConnectQrModal();
        runWalletAuthFlow('walletconnect');
    }

    function runWalletAuthFlow(provider) {
        var name = PROVIDER_NAMES[provider] || provider;
        var loadingText = document.getElementById('walletAuthLoadingText');
        var intent = window._walletAuthIntent;

        if (loadingText) {
            if (intent === 'connect') {
                loadingText.textContent = 'Connecting to ' + name + '…';
            } else {
                loadingText.textContent = 'Connecting to ' + name + '…';
            }
        }
        showWalletAuthStep('loading');

        setTimeout(function () {
            var scenario = window._walletAuthScenario || 'happy';

            if (scenario === 'wrong-network') {
                closeWalletAuthModal();
                closeWalletConnectQrModal();
                walletAuthNotify(
                    name + ' is connected to an unsupported network. Unera requires Base or Sepolia — switch your wallet to the correct network and try again.',
                    'warning',
                    'Wrong Network',
                    {
                        actionLabel: 'Try Again',
                        actionFn: function () { openWalletAuthModal({ intent: intent }); }
                    }
                );
                showWalletAuthPickerStep();
                return;
            }

            if (scenario === 'not-installed' && EXTENSION_WALLETS.indexOf(provider) !== -1) {
                closeWalletAuthModal();
                walletAuthNotify(
                    name + " isn't installed in this browser. Install it to continue, then come back and connect.",
                    'error',
                    'Wallet Not Found',
                    {
                        actionLabel: 'Install ' + name,
                        actionFn: function () {
                            window.open(INSTALL_LINKS[provider] || INSTALL_LINKS.metamask, '_blank');
                            openWalletAuthModal({ intent: intent });
                        }
                    }
                );
                showWalletAuthPickerStep();
                return;
            }

            if (scenario === 'user-rejected') {
                closeWalletAuthModal();
                closeWalletConnectQrModal();
                walletAuthNotify(
                    'You declined the connection request in ' + name + ". No action was taken — you can try again whenever you're ready.",
                    'warning',
                    'Connection Declined',
                    {
                        actionLabel: 'Try Again',
                        actionFn: function () { openWalletAuthModal({ intent: intent }); }
                    }
                );
                showWalletAuthPickerStep();
                return;
            }

            if (intent !== 'connect') {
                if (loadingText) loadingText.textContent = 'Approve the sign-in request in your wallet…';
                setTimeout(function () {
                    finishWalletAuthSuccess(provider, name);
                }, 1200);
                return;
            }

            finishWalletAuthSuccess(provider, name);
        }, 1500);
    }

    function applyWalletStorage(provider) {
        localStorage.setItem('walletConnected', 'true');
        localStorage.setItem('walletAddress', DEMO_ADDRESS);
        localStorage.setItem('walletProvider', provider);
        localStorage.setItem('walletBalance', '292.22559 CTC');
        localStorage.setItem('walletNetwork', 'Polygon');
    }

    function applyAuthStorage(intent, provider) {
        applyWalletStorage(provider);
        if (intent === 'login' || intent === 'signup') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('unera_user', JSON.stringify({
                email: '',
                name: 'Wallet User',
                authMethod: 'wallet'
            }));
            localStorage.setItem('userName', 'Wallet User');
            if (intent === 'signup') {
                localStorage.setItem('isNewUser', 'true');
            }
        }
    }

    function syncNavAfterConnect() {
        var shortAddress = DEMO_ADDRESS.substring(0, 6) + '...' + DEMO_ADDRESS.substring(DEMO_ADDRESS.length - 4);

        var navConnect = document.getElementById('navConnectBtn');
        var walletLink = document.getElementById('walletNavLink');
        if (navConnect && walletLink) {
            navConnect.style.display = 'none';
            navConnect.classList.add('hidden');
            walletLink.style.display = 'inline-block';
        }

        var dropdownWallet = document.getElementById('dropdownWalletAddress');
        if (dropdownWallet) dropdownWallet.textContent = shortAddress;
        var mobileDropdownWallet = document.getElementById('mobileDropdownWalletAddress');
        if (mobileDropdownWallet) mobileDropdownWallet.textContent = shortAddress;

        var disconnectItem = document.getElementById('disconnectWalletItem');
        if (disconnectItem) disconnectItem.style.display = 'flex';
        var disconnectItemMobile = document.getElementById('disconnectWalletItemMobile');
        if (disconnectItemMobile) disconnectItemMobile.style.display = 'flex';

        if (typeof window.syncNavAuthState === 'function') {
            window.syncNavAuthState();
        }
        if (typeof window.updateWalletLinkState === 'function') {
            window.updateWalletLinkState();
        }
        if (typeof window.updateAuthUI === 'function') {
            window.updateAuthUI();
        }

        window.dispatchEvent(new CustomEvent('unera-wallet-auth-success', {
            detail: { address: DEMO_ADDRESS, provider: provider, intent: window._walletAuthIntent }
        }));
    }

    function resolveWalletAuthRedirect(intent) {
        if (window._walletAuthReturnTo) {
            return window._walletAuthReturnTo;
        }
        if (intent === 'signup') {
            return 'setup-2fa.html?from=wallet';
        }
        if (intent === 'login') {
            if (localStorage.getItem('2faEnabled') === 'true') {
                return 'verify-2fa.html?from=wallet';
            }
            return 'dashboard-enhanced.html?welcome=back';
        }
        return 'dashboard-enhanced.html';
    }

    function finishWalletAuthSuccess(provider, name) {
        var intent = window._walletAuthIntent || 'login';
        applyAuthStorage(intent, provider);
        syncNavAfterConnect();

        closeWalletAuthModal();
        closeWalletConnectQrModal();
        showWalletAuthPickerStep();

        if (intent === 'connect') {
            walletAuthNotify(name + ' connected successfully!', 'success', 'Success', {});
            return;
        }

        var redirect = resolveWalletAuthRedirect(intent);
        if (intent === 'signup') {
            showToast('Wallet connected. Securing your account…');
        } else {
            showToast('Welcome back. Redirecting…');
        }
        setTimeout(function () {
            window.location.href = redirect;
        }, 600);
    }

    function initWalletAuthFromUrl() {
        var params = new URLSearchParams(window.location.search);
        if (params.get('walletAuth') === 'open') {
            var intent = params.get('intent') || 'login';
            openWalletAuthModal({ intent: intent });
        }
    }

    function bindWalletAuthEvents() {
        var authModal = document.getElementById(AUTH_MODAL_ID);
        if (authModal) {
            authModal.addEventListener('click', function (e) {
                if (e.target === authModal) closeWalletAuthModal();
            });
        }
        var qrModal = document.getElementById(QR_MODAL_ID);
        if (qrModal) {
            qrModal.addEventListener('click', function (e) {
                if (e.target === qrModal) closeWalletConnectQrModal();
            });
        }
        var outcomeModal = document.getElementById(OUTCOME_ID);
        if (outcomeModal) {
            outcomeModal.addEventListener('click', function (e) {
                if (e.target === outcomeModal) closeWalletAuthOutcomeModal();
            });
        }
        var closeBtn = document.getElementById('walletAuthCloseBtn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeWalletAuthModal);
        }

        document.addEventListener('keydown', function (e) {
            if (e.key !== 'Escape') return;
            var qr = document.getElementById(QR_MODAL_ID);
            if (qr && qr.classList.contains('active')) {
                closeWalletConnectQrModal();
                return;
            }
            var out = document.getElementById(OUTCOME_ID);
            if (out && out.classList.contains('active')) {
                closeWalletAuthOutcomeModal();
                return;
            }
            var auth = document.getElementById(AUTH_MODAL_ID);
            if (auth && auth.classList.contains('active')) {
                closeWalletAuthModal();
            }
        });
    }

    window.openWalletAuthModal = openWalletAuthModal;
    window.closeWalletAuthModal = closeWalletAuthModal;
    window.handleWalletAuth = handleWalletAuth;
    window.setWalletAuthScenario = setWalletAuthScenario;
    window.closeWalletAuthOutcomeModal = closeWalletAuthOutcomeModal;
    window.openWalletConnectQrModal = openWalletConnectQrModal;
    window.closeWalletConnectQrModal = closeWalletConnectQrModal;
    window.copyWalletConnectDemoLink = copyWalletConnectDemoLink;
    window.toggleWalletConnectBrowseList = toggleWalletConnectBrowseList;
    window.simulateWalletConnectQrSuccess = simulateWalletConnectQrSuccess;
    window.showWalletAuthPickerStep = showWalletAuthPickerStep;
    window.resolveWalletAuthRedirect = resolveWalletAuthRedirect;

    window.openConnectModal = function () {
        openWalletAuthModal({ intent: 'connect' });
    };
    window.closeConnectModal = function (event) {
        if (event && event.target && event.target.id !== AUTH_MODAL_ID) return;
        closeWalletAuthModal();
    };
    window.handleWalletConnect = function (provider) {
        handleWalletAuth(provider);
    };
    window.setConnectScenario = function (scenario, btn) {
        setWalletAuthScenario(scenario, btn);
    };
    window.closeWCOutcomeModal = closeWalletAuthOutcomeModal;

    document.addEventListener('DOMContentLoaded', function () {
        bindWalletAuthEvents();
        initWalletAuthFromUrl();
        var urlScenario = getScenarioFromUrl();
        if (urlScenario) {
            var authModal = document.getElementById(AUTH_MODAL_ID);
            if (authModal) authModal.classList.remove('wallet-auth-modal--production');
        }
    });
})();
