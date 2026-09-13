(function () {
    'use strict';

    const OUTCOME_MODAL_ID = 'walletConnectNotifier';
    const defaultCheckSvg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 -960 960 960" fill="currentColor"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>';

    /** Dashboard-equivalent notifier; never touches window.showNotification */
    function wcNotify(message, type, title, options) {
        title = title !== undefined && title !== '' ? title : 'Success';
        options = options || {};
        const modal = document.getElementById(OUTCOME_MODAL_ID);
        if (!modal) return;

        const icon = document.getElementById('wcNotifierIcon');
        const messageEl = document.getElementById('wcNotifierMessage');
        const titleEl = document.getElementById('wcNotifierTitle');
        const footer = modal.querySelector('.modal-footer');

        if (titleEl) titleEl.textContent = title;
        if (messageEl) {
            if (options.useHtml) {
                messageEl.innerHTML = message;
                messageEl.classList.add('impact-detail-wrapper');
            } else {
                messageEl.textContent = message;
                messageEl.classList.remove('impact-detail-wrapper');
            }
        }

        if (icon) {
            if (options.icon) {
                icon.className = 'notification-icon impact-style';
                icon.innerHTML = options.icon;
            } else {
                icon.className = 'notification-icon';
                if (type === 'error') icon.classList.add('error');
                else if (type === 'warning') icon.classList.add('warning');
                else if (type === 'info') icon.classList.add('info');
                icon.innerHTML = defaultCheckSvg;
            }
        }

        const existing = footer && footer.querySelector('.notification-action-btn');
        if (existing) existing.remove();

        if (options.actionLabel && options.actionFn && footer) {
            const actionBtn = document.createElement('button');
            actionBtn.type = 'button';
            actionBtn.className = 'btn btn-primary notification-action-btn';
            actionBtn.textContent = options.actionLabel;
            actionBtn.onclick = function () {
                closeWCOutcomeModal();
                options.actionFn();
            };
            footer.insertBefore(actionBtn, footer.firstChild);
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        setTimeout(function () {
            var primaryBtn = footer && footer.querySelector('.notification-action-btn');
            if (!primaryBtn && modal) primaryBtn = modal.querySelector('.modal-close');
            if (primaryBtn) primaryBtn.focus();
        }, 100);
    }

    function closeWCOutcomeModal() {
        const modal = document.getElementById(OUTCOME_MODAL_ID);
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
        const actionBtn = modal.querySelector('.notification-action-btn');
        if (actionBtn) actionBtn.remove();
    }

    window._connectScenario = 'happy';

    const EXTENSION_WALLETS = ['metamask', 'brave', 'ledger'];
    const INSTALL_LINKS = {
        metamask: 'https://metamask.io/download/',
        walletconnect: 'https://walletconnect.com/',
        coinbase: 'https://www.coinbase.com/wallet/downloads',
        brave: 'https://brave.com/download/',
        ledger: 'https://www.ledger.com/ledger-live'
    };

    const _walletCardCache = new Map();

    function setConnectScenario(scenario, btn) {
        window._connectScenario = scenario;
        document.querySelectorAll('#connectModal .scenario-pill').forEach(function (p) {
            p.classList.remove('active');
        });
        if (btn) btn.classList.add('active');
        _applyNotInstalledState(scenario === 'not-installed');
    }

    function _applyNotInstalledState(active) {
        var grid = document.querySelector('#connectModal .wallet-grid');
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
                    var link = INSTALL_LINKS[provider] || 'https://metamask.io/download/';
                    var lbl = nameEl.textContent;
                    nameEl.insertAdjacentHTML(
                        'afterend',
                        '<span class="wallet-not-installed-label">Not installed</span>' +
                            '<button type="button" class="wallet-install-btn" aria-label="Install ' +
                            lbl +
                            '" onclick="window.open(\'' +
                            link +
                            '\', \'_blank\')">Install ↗</button>'
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

    function openConnectModal() {
        var modal = document.getElementById('connectModal');
        if (!modal) return;

        window._connectScenario = 'happy';
        document.querySelectorAll('#connectModal .scenario-pill').forEach(function (p) {
            p.classList.remove('active');
        });
        var happyPill = modal.querySelector('.scenario-pill[data-scenario="happy"]');
        if (happyPill) happyPill.classList.add('active');

        _applyNotInstalledState(false);

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        modal.setAttribute('aria-hidden', 'false');
        var closeBtn = modal.querySelector('.modal-close');
        if (closeBtn) setTimeout(function () { closeBtn.focus(); }, 100);
    }

    function closeConnectModal(event) {
        var modal = document.getElementById('connectModal');
        if (!modal) return;
        if (event && event.target !== modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modal.setAttribute('aria-hidden', 'true');
    }

    function _forceCloseConnectModal() {
        var modal = document.getElementById('connectModal');
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modal.setAttribute('aria-hidden', 'true');
    }

    /** Apply CONNECT/WALLET visibility from demo localStorage (optional on load) */
    function applyNavConnectedFromDemoStorage() {
        if (localStorage.getItem('walletConnected') !== 'true') return;
        var nc = document.getElementById('navConnectBtnSC');
        var wl = document.getElementById('walletNavLinkSC');
        if (nc && wl) {
            nc.classList.add('wc-dash-hidden');
            nc.style.display = 'none';
            wl.style.display = 'inline-block';
        }
    }

    function handleWalletConnect(provider) {
        var providerNames = {
            metamask: 'MetaMask',
            walletconnect: 'WalletConnect',
            coinbase: 'Coinbase Wallet',
            brave: 'Brave Wallet',
            ledger: 'Ledger'
        };

        var name = providerNames[provider] || provider;
        var modalBody = document.querySelector('#connectModal .modal-body');
        if (!modalBody) return;
        var originalContent = modalBody.innerHTML;

        modalBody.innerHTML =
            '<div class="modal-loading">' +
            '<div class="spinner"></div>' +
            '<p>Connecting to ' +
            name +
            '...</p>' +
            '</div>';

        setTimeout(function () {
            modalBody.innerHTML = originalContent;

            var scenario = window._connectScenario || 'happy';

            if (scenario === 'wrong-network') {
                _forceCloseConnectModal();
                wcNotify(
                    name +
                        ' is connected to an unsupported network. Unera requires Base or Sepolia — switch your wallet to the correct network and try again.',
                    'warning',
                    'Wrong Network',
                    {
                        actionLabel: 'Switch to Base (Simulated)',
                        actionFn: openConnectModal
                    }
                );
                return;
            }

            if (scenario === 'not-installed' && EXTENSION_WALLETS.indexOf(provider) !== -1) {
                _forceCloseConnectModal();
                wcNotify(
                    name +
                        " isn't installed in this browser. Install it to continue, then come back and connect.",
                    'error',
                    'Wallet Not Found',
                    {
                        actionLabel: 'Install ' + name,
                        actionFn: function () {
                            window.open(INSTALL_LINKS[provider] || 'https://metamask.io/download/', '_blank');
                            openConnectModal();
                        }
                    }
                );
                return;
            }

            if (scenario === 'user-rejected') {
                _forceCloseConnectModal();
                wcNotify(
                    'You declined the connection request in ' +
                        name +
                        ". No action was taken — you can try again whenever you're ready.",
                    'warning',
                    'Connection Declined',
                    {
                        actionLabel: 'Try Again',
                        actionFn: openConnectModal
                    }
                );
                return;
            }

            _forceCloseConnectModal();

            var demoAddress = '0x742d35Cc6634C0532925a3b844Bc9e7595f3a8f';
            var shortAddress =
                demoAddress.substring(0, 6) + '...' + demoAddress.substring(demoAddress.length - 4);

            var navLegacy = document.getElementById('navConnectBtn');
            var wlLegacy = document.getElementById('walletNavLink');
            var navSC = document.getElementById('navConnectBtnSC');
            var wlSC = document.getElementById('walletNavLinkSC');

            if (navSC && wlSC) {
                navSC.classList.add('wc-dash-hidden');
                navSC.style.display = 'none';
                wlSC.style.display = 'inline-block';
            } else if (navLegacy && wlLegacy) {
                navLegacy.classList.add('wc-dash-hidden');
                wlLegacy.style.display = 'inline-block';
            }

            var dropdownWallet = document.getElementById('dropdownWalletAddress');
            if (dropdownWallet) dropdownWallet.textContent = shortAddress;
            var mobileDropdownWallet = document.getElementById('mobileDropdownWalletAddress');
            if (mobileDropdownWallet) mobileDropdownWallet.textContent = shortAddress;

            var disconnectItem = document.getElementById('disconnectWalletItem');
            if (disconnectItem) disconnectItem.style.display = 'flex';
            var disconnectItemMobile = document.getElementById('disconnectWalletItemMobile');
            if (disconnectItemMobile) disconnectItemMobile.style.display = 'flex';

            localStorage.setItem('walletConnected', 'true');
            localStorage.setItem('walletAddress', demoAddress);
            localStorage.setItem('walletProvider', provider);

            window.dispatchEvent(
                new CustomEvent('unera-stablecoin-wallet-demo-connected', {
                    detail: { address: demoAddress, provider: provider }
                })
            );

            wcNotify(name + ' connected successfully!', 'success', 'Success', {});
        }, 1500);
    }

    window.openConnectModal = openConnectModal;
    window.closeConnectModal = closeConnectModal;
    window.setConnectScenario = setConnectScenario;
    window.handleWalletConnect = handleWalletConnect;
    window.closeWCOutcomeModal = closeWCOutcomeModal;

    document.addEventListener('DOMContentLoaded', applyNavConnectedFromDemoStorage);
})();
