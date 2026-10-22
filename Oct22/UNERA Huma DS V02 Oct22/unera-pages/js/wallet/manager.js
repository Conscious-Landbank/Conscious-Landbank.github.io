/**
 * Wallet Manager
 * Centralized wallet state management and orchestration
 */

class WalletManager {
    constructor() {
        this.walletState = {
            connected: false,
            address: null,
            chainId: null,
            provider: null,
            providerType: null, // 'metamask' | 'walletconnect'
            isDemo: false,
            balances: {},
            transactions: []
        };
        
        // Load from localStorage if exists
        this.loadFromStorage();
    }

    async connectWallet(providerType) {
        try {
            console.log(`Connecting to ${providerType}...`);
            
            let result;
            
            if (providerType === 'metamask') {
                const provider = new MetaMaskProvider();
                result = await provider.connect();
                this.metamaskProvider = provider;
            } else if (providerType === 'walletconnect') {
                const provider = new WalletConnectProviderWrapper();
                result = await provider.connect();
                this.walletConnectProvider = provider;
            } else {
                throw new Error('Unknown provider type');
            }
            
            // Update state
            this.walletState = {
                connected: true,
                address: result.address,
                chainId: result.chainId,
                provider: result.provider,
                providerType: providerType,
                isDemo: result.isDemo,
                balances: {},
                transactions: []
            };
            
            // Validate network
            this.validateNetwork(result.chainId);
            
            // Save to storage
            this.saveToStorage();
            
            // Fetch balances (mock data for prototype)
            await this.fetchBalances();
            
            // Fetch transaction history (mock data for prototype)
            await this.fetchTransactionHistory();
            
            return result;
            
        } catch (error) {
            console.error('Connection error:', error);
            this.handleError(error);
            throw error;
        }
    }

    validateNetwork(chainId) {
        const supportedChainIds = getSupportedChainIds();
        
        if (!supportedChainIds.includes(chainId)) {
            const network = getNetworkByChainId(chainId);
            const networkName = network ? network.chainName : 'Unknown';
            
            console.warn('Unsupported network:', networkName, chainId);
            throw {
                code: 'UNSUPPORTED_NETWORK',
                message: `Unsupported network: ${networkName}. Please switch to Ethereum, Base, or Sepolia.`,
                chainId
            };
        }
        
        console.log('Network validated:', chainId);
    }

    async fetchBalances() {
        try {
            // PROTOTYPE: Using mock data
            // Frontend team: Replace with real RPC calls
            const network = getNetworkByChainId(this.walletState.chainId);
            const balances = await getMockBalances(this.walletState.address, network?.key || 'ethereum');
            
            this.walletState.balances = balances;
            this.saveToStorage();
            
            console.log('Balances fetched:', balances);
            
        } catch (error) {
            console.error('Error fetching balances:', error);
            // Use default mock balances on error
            this.walletState.balances = { eth: '0.00', tokens: [] };
        }
    }

    async fetchTransactionHistory() {
        try {
            // PROTOTYPE: Using mock data
            // Frontend team: Replace with backend API call
            const network = getNetworkByChainId(this.walletState.chainId);
            const transactions = await getMockTransactionHistory(this.walletState.address, network?.key || 'ethereum');
            
            this.walletState.transactions = transactions;
            this.saveToStorage();
            
            console.log('Transaction history fetched:', transactions.length, 'transactions');
            
        } catch (error) {
            console.error('Error fetching transaction history:', error);
            this.walletState.transactions = [];
        }
    }

    disconnect() {
        console.log('Disconnecting wallet...');
        
        // Call provider-specific disconnect
        if (this.walletState.providerType === 'walletconnect' && this.walletConnectProvider) {
            this.walletConnectProvider.disconnect();
        }
        
        // Clear state
        this.walletState = {
            connected: false,
            address: null,
            chainId: null,
            provider: null,
            providerType: null,
            isDemo: false,
            balances: {},
            transactions: []
        };
        
        // Clear storage
        this.clearStorage();
        
        console.log('Wallet disconnected');
    }

    saveToStorage() {
        try {
            localStorage.setItem('walletAddress', this.walletState.address || '');
            localStorage.setItem('walletProvider', this.walletState.providerType || '');
            localStorage.setItem('walletConnected', this.walletState.connected ? 'true' : 'false');
            localStorage.setItem('walletChainId', this.walletState.chainId || '');
            localStorage.setItem('walletIsDemo', this.walletState.isDemo ? 'true' : 'false');
            localStorage.setItem('walletBalances', JSON.stringify(this.walletState.balances));
            localStorage.setItem('walletTransactions', JSON.stringify(this.walletState.transactions));
            localStorage.setItem('walletConnectedTimestamp', new Date().toISOString());
        } catch (error) {
            console.error('Error saving to storage:', error);
        }
    }

    loadFromStorage() {
        try {
            const address = localStorage.getItem('walletAddress');
            const provider = localStorage.getItem('walletProvider');
            const connected = localStorage.getItem('walletConnected') === 'true';
            const chainId = localStorage.getItem('walletChainId');
            const isDemo = localStorage.getItem('walletIsDemo') === 'true';
            
            if (connected && address) {
                this.walletState.connected = connected;
                this.walletState.address = address;
                this.walletState.chainId = chainId;
                this.walletState.providerType = provider;
                this.walletState.isDemo = isDemo;
                
                // Load balances and transactions
                try {
                    this.walletState.balances = JSON.parse(localStorage.getItem('walletBalances') || '{}');
                    this.walletState.transactions = JSON.parse(localStorage.getItem('walletTransactions') || '[]');
                } catch (e) {
                    this.walletState.balances = {};
                    this.walletState.transactions = [];
                }
            }
        } catch (error) {
            console.error('Error loading from storage:', error);
        }
    }

    clearStorage() {
        localStorage.removeItem('walletAddress');
        localStorage.removeItem('walletProvider');
        localStorage.removeItem('walletConnected');
        localStorage.removeItem('walletChainId');
        localStorage.removeItem('walletIsDemo');
        localStorage.removeItem('walletBalances');
        localStorage.removeItem('walletTransactions');
        localStorage.removeItem('walletConnectedTimestamp');
    }

    handleError(error) {
        console.error('Wallet error:', error);
        
        // Log specific error types
        if (error.code) {
            console.error('Error code:', error.code);
        }
        if (error.message) {
            console.error('Error message:', error.message);
        }
    }

    getState() {
        return this.walletState;
    }

    isConnected() {
        return this.walletState.connected && this.walletState.address;
    }

    getAddress() {
        return this.walletState.address;
    }

    getShortAddress() {
        if (!this.walletState.address) return '';
        const addr = this.walletState.address;
        return addr.substring(0, 6) + '...' + addr.substring(addr.length - 4);
    }

    getChainId() {
        return this.walletState.chainId;
    }

    getNetwork() {
        return getNetworkByChainId(this.walletState.chainId);
    }

    getBalances() {
        return this.walletState.balances;
    }

    getTransactions() {
        return this.walletState.transactions;
    }
}
