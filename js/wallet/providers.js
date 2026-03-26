/**
 * Wallet Providers
 * MetaMask and WalletConnect connection wrappers
 */

const WALLET_RELOAD_DELAY_MS = 420;
const WALLET_TOAST_ACCOUNT_MS = 5800;
const WALLET_TOAST_CHAIN_MS = 5800;
const WALLET_TOAST_DISCONNECT_MS = 6000;

function normalizeChainIdHex(chainId) {
    if (chainId == null || chainId === '') return '';
    if (typeof chainId === 'number' && Number.isFinite(chainId)) {
        return '0x' + chainId.toString(16);
    }
    const s = String(chainId).toLowerCase().trim();
    if (s.startsWith('0x')) return s;
    const n = parseInt(s, 10);
    if (!Number.isNaN(n)) return '0x' + n.toString(16);
    return s;
}

function chainLabelFromId(chainId) {
    const hex = normalizeChainIdHex(chainId);
    const map = {
        '0x1': 'Ethereum',
        '0x5': 'Goerli',
        '0xaa36a7': 'Sepolia',
        '0x2105': 'Base'
    };
    return map[hex] || `Network (${hex})`;
}

function truncateWalletAddress(addr) {
    if (!addr || typeof addr !== 'string') return '';
    const a = addr.trim();
    if (a.length < 12) return a;
    return a.slice(0, 6) + '…' + a.slice(-4);
}

function scheduleWalletReload() {
    setTimeout(() => window.location.reload(), WALLET_RELOAD_DELAY_MS);
}

function notifyWalletAccountChanged(address) {
    if (typeof window.showToast !== 'function') return;
    window.showToast(
        { title: 'Wallet updated', detail: 'Connected as ' + truncateWalletAddress(address) },
        'info',
        WALLET_TOAST_ACCOUNT_MS
    );
}

function notifyWalletChainChanged(chainId) {
    if (typeof window.showToast !== 'function') return;
    window.showToast(
        { title: 'Network updated', detail: chainLabelFromId(chainId) },
        'info',
        WALLET_TOAST_CHAIN_MS
    );
}

function notifyWalletDisconnected() {
    if (typeof window.showToast !== 'function') return;
    window.showToast(
        { title: 'Wallet disconnected', detail: 'Reconnect to use on-chain features.' },
        'warning',
        WALLET_TOAST_DISCONNECT_MS
    );
}

// MetaMask Provider with graceful fallback
class MetaMaskProvider {
    constructor() {
        this.provider = null;
        this.address = null;
        this.chainId = null;
        this._handlingDisconnect = false;
    }

    async connect() {
        // Try real MetaMask connection
        if (typeof window.ethereum !== 'undefined' && window.ethereum.isMetaMask) {
            try {
                // Request account access
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts'
                });

                // Get current chain ID
                const chainId = await window.ethereum.request({
                    method: 'eth_chainId'
                });

                this.provider = window.ethereum;
                this.address = accounts[0];
                this.chainId = chainId;

                // Setup event listeners
                this.setupListeners();

                console.log('✅ MetaMask connected:', this.address, 'on chain', chainId);

                return {
                    address: this.address,
                    chainId: this.chainId,
                    provider: this.provider,
                    isDemo: false
                };
            } catch (error) {
                // User rejected connection (code 4001)
                if (error.code === 4001) {
                    console.log('❌ User rejected MetaMask connection');
                    throw error; // Allow retry
                }

                // Other errors - fall through to demo mode
                console.log('⚠️ MetaMask error, falling back to demo:', error.message);
            }
        }

        // Fallback: Demo mode (always succeeds)
        console.log('🎭 MetaMask not available, using demo mode');
        const demoAddress = '0x' + Math.random().toString(16).substr(2, 40);

        return {
            address: demoAddress,
            chainId: '0x1', // Ethereum mainnet
            provider: null,
            isDemo: true
        };
    }

    setupListeners() {
        if (!this.provider) return;
        if (this.provider._uneraWalletSwitchListenersAttached) return;
        this.provider._uneraWalletSwitchListenersAttached = true;

        // Account changed
        this.provider.on('accountsChanged', (accounts) => {
            console.log('Account changed:', accounts[0]);
            if (accounts.length === 0) {
                this.handleDisconnect();
            } else {
                this.address = accounts[0];
                localStorage.setItem('walletAddress', this.address);
                notifyWalletAccountChanged(accounts[0]);
                scheduleWalletReload();
            }
        });

        // Chain changed
        this.provider.on('chainChanged', (chainId) => {
            console.log('Chain changed:', chainId);
            this.chainId = normalizeChainIdHex(chainId);
            notifyWalletChainChanged(chainId);
            localStorage.setItem('walletChainId', this.chainId);
            scheduleWalletReload();
        });

        // Disconnected
        this.provider.on('disconnect', () => {
            console.log('MetaMask disconnected');
            this.handleDisconnect();
        });
    }

    handleDisconnect() {
        if (this._handlingDisconnect) return;
        this._handlingDisconnect = true;
        notifyWalletDisconnected();
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('walletProvider');
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletChainId');
        scheduleWalletReload();
    }

    async signMessage(message) {
        if (!this.provider) {
            throw new Error('Cannot sign message in demo mode');
        }

        try {
            const signature = await this.provider.request({
                method: 'personal_sign',
                params: [message, this.address]
            });
            return signature;
        } catch (error) {
            console.error('Signing error:', error);
            throw error;
        }
    }

    async switchNetwork(chainId) {
        if (!this.provider) {
            throw new Error('Cannot switch network in demo mode');
        }

        try {
            await this.provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId }]
            });
        } catch (error) {
            // Network not added to MetaMask
            if (error.code === 4902) {
                throw new Error('NETWORK_NOT_ADDED');
            }
            throw error;
        }
    }

    async addNetwork(networkConfig) {
        if (!this.provider) {
            throw new Error('Cannot add network in demo mode');
        }

        await this.provider.request({
            method: 'wallet_addEthereumChain',
            params: [networkConfig]
        });
    }
}

// WalletConnect Provider with graceful fallback
class WalletConnectProviderWrapper {
    constructor() {
        this.provider = null;
        this.address = null;
        this.chainId = null;
        this._wcListenersAttached = false;
        this._handlingDisconnect = false;
    }

    async connect() {
        try {
            // Try real WalletConnect
            console.log('🔗 Initializing WalletConnect...');

            this.provider = new window.WalletConnectProvider.default({
                rpc: {
                    1: 'https://eth.llamarpc.com',
                    8453: 'https://mainnet.base.org',
                    11155111: 'https://rpc.sepolia.org'
                },
                qrcode: true,
                qrcodeModalOptions: {
                    mobileLinks: [
                        'rainbow',
                        'metamask',
                        'trust',
                        'argent',
                        'imtoken',
                        'pillar'
                    ]
                }
            });

            // Enable with timeout (60 seconds)
            const timeout = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Connection timeout')), 60000)
            );

            const accounts = await Promise.race([this.provider.enable(), timeout]);

            this.address = accounts[0];
            this.chainId = '0x' + this.provider.chainId.toString(16);

            // Setup event listeners
            this.setupListeners();

            console.log('✅ WalletConnect connected:', this.address, 'on chain', this.chainId);

            return {
                address: this.address,
                chainId: this.chainId,
                provider: this.provider,
                isDemo: false
            };
        } catch (error) {
            // User closed modal, timeout, or other error
            console.log('🎭 WalletConnect not available, using demo mode:', error.message);
            const demoAddress = '0x' + Math.random().toString(16).substr(2, 40);

            return {
                address: demoAddress,
                chainId: '0x1', // Ethereum mainnet
                provider: null,
                isDemo: true
            };
        }
    }

    setupListeners() {
        if (!this.provider) return;
        if (this._wcListenersAttached) return;
        this._wcListenersAttached = true;

        // Account changed
        this.provider.on('accountsChanged', (accounts) => {
            console.log('WalletConnect account changed:', accounts[0]);
            if (accounts.length === 0) {
                this.handleDisconnect();
            } else {
                this.address = accounts[0];
                localStorage.setItem('walletAddress', this.address);
                notifyWalletAccountChanged(accounts[0]);
                scheduleWalletReload();
            }
        });

        // Chain changed
        this.provider.on('chainChanged', (chainId) => {
            console.log('WalletConnect chain changed:', chainId);
            this.chainId = normalizeChainIdHex(chainId);
            notifyWalletChainChanged(chainId);
            localStorage.setItem('walletChainId', this.chainId);
            scheduleWalletReload();
        });

        // Disconnected
        this.provider.on('disconnect', () => {
            console.log('WalletConnect disconnected');
            this.handleDisconnect();
        });
    }

    handleDisconnect() {
        if (this._handlingDisconnect) return;
        this._handlingDisconnect = true;
        notifyWalletDisconnected();
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('walletProvider');
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletChainId');
        scheduleWalletReload();
    }

    async disconnect() {
        if (this.provider) {
            await this.provider.disconnect();
        }
        this.handleDisconnect();
    }

    async signMessage(message) {
        if (!this.provider) {
            throw new Error('Cannot sign message in demo mode');
        }

        try {
            const signature = await this.provider.request({
                method: 'personal_sign',
                params: [message, this.address]
            });
            return signature;
        } catch (error) {
            console.error('Signing error:', error);
            throw error;
        }
    }
}

/**
 * When the page uses window.ethereum directly (e.g. wallet-enhanced.html) without
 * calling MetaMaskProvider.connect(), still attach switch/disconnect toasts once.
 */
(function attachMetaMaskSwitchToastsIfNeeded() {
    function run() {
        const eth = typeof window !== 'undefined' && window.ethereum;
        if (!eth || !eth.isMetaMask) return;
        if (eth._uneraWalletSwitchListenersAttached) return;
        const p = new MetaMaskProvider();
        p.provider = eth;
        try {
            p.address = eth.selectedAddress || localStorage.getItem('walletAddress');
            p.chainId = eth.chainId || localStorage.getItem('walletChainId');
        } catch (e) {
            /* ignore */
        }
        p.setupListeners();
    }
    if (typeof document === 'undefined') return;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', run);
    } else {
        run();
    }
})();
