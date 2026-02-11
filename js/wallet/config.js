/**
 * Wallet Configuration
 * Network configs, RPC URLs, and supported token lists
 */

// Supported Networks
const NETWORKS = {
    ethereum: {
        chainId: '0x1',
        chainIdDecimal: 1,
        chainName: 'Ethereum Mainnet',
        rpcUrls: ['https://eth.llamarpc.com', 'https://rpc.ankr.com/eth'],
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        blockExplorerUrls: ['https://etherscan.io']
    },
    sepolia: {
        chainId: '0xaa36a7',
        chainIdDecimal: 11155111,
        chainName: 'Sepolia Testnet',
        rpcUrls: ['https://rpc.sepolia.org', 'https://ethereum-sepolia-rpc.publicnode.com'],
        nativeCurrency: { name: 'Sepolia ETH', symbol: 'SEP', decimals: 18 },
        blockExplorerUrls: ['https://sepolia.etherscan.io']
    },
    base: {
        chainId: '0x2105',
        chainIdDecimal: 8453,
        chainName: 'Base',
        rpcUrls: ['https://mainnet.base.org', 'https://base.llamarpc.com'],
        nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
        blockExplorerUrls: ['https://basescan.org']
    }
};

// Hardcoded Token Lists (Frontend-only - no backend API)
const TOKEN_LISTS = {
    ethereum: [
        { 
            address: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48', 
            symbol: 'USDC', 
            decimals: 6, 
            name: 'USD Coin',
            logo: '💵'
        },
        { 
            address: '0xdAC17F958D2ee523a2206206994597C13D831ec7', 
            symbol: 'USDT', 
            decimals: 6, 
            name: 'Tether USD',
            logo: '💵'
        },
        { 
            address: '0x6B175474E89094C44Da98b954EedeAC495271d0F', 
            symbol: 'DAI', 
            decimals: 18, 
            name: 'Dai Stablecoin',
            logo: '💵'
        }
    ],
    sepolia: [
        { 
            address: '0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238', 
            symbol: 'USDC', 
            decimals: 6, 
            name: 'USD Coin',
            logo: '💵'
        }
    ],
    base: [
        { 
            address: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913', 
            symbol: 'USDC', 
            decimals: 6, 
            name: 'USD Coin',
            logo: '💵'
        }
    ]
};

// Helper: Get network by chain ID
function getNetworkByChainId(chainId) {
    for (const [key, network] of Object.entries(NETWORKS)) {
        if (network.chainId === chainId) {
            return { key, ...network };
        }
    }
    return null;
}

// Helper: Get supported chain IDs
function getSupportedChainIds() {
    return Object.values(NETWORKS).map(n => n.chainId);
}

// Helper: Get token list for network
function getTokensForNetwork(networkKey) {
    return TOKEN_LISTS[networkKey] || [];
}
