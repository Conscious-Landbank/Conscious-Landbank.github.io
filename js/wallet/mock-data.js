/**
 * Mock Data Layer (Prototype Only)
 * 
 * Purpose: Fast, reliable data for demos and presentations
 * Frontend team will replace with real RPC calls and backend APIs
 */

// Mock Token Balances
const MOCK_BALANCES = {
    eth: '0.5234',
    tokens: [
        { 
            symbol: 'USDC', 
            balance: '100.00', 
            address: '0xA0b8...eB48',
            name: 'USD Coin',
            logo: '💵'
        },
        { 
            symbol: 'USDT', 
            balance: '50.00', 
            address: '0xdAC1...1ec7',
            name: 'Tether USD',
            logo: '💵'
        },
        { 
            symbol: 'DAI', 
            balance: '25.50', 
            address: '0x6B17...1d0F',
            name: 'Dai Stablecoin',
            logo: '💵'
        }
    ]
};

// Mock Transaction History
const MOCK_TRANSACTIONS = [
    {
        hash: '0xabc123def456789abcdef0123456789abcdef012',
        type: 'receive',
        token: 'USDC',
        amount: '50.00',
        from: '0x1234567890abcdef1234567890abcdef12345678',
        to: 'CURRENT_WALLET',
        timestamp: Date.now() - 3600000, // 1 hour ago
        network: 'Ethereum',
        status: 'confirmed'
    },
    {
        hash: '0xdef456789abc012345def6789abc012345def678',
        type: 'send',
        token: 'ETH',
        amount: '0.1',
        from: 'CURRENT_WALLET',
        to: '0x87654321fedcba0987654321fedcba0987654321',
        timestamp: Date.now() - 86400000, // 1 day ago
        network: 'Ethereum',
        status: 'confirmed'
    },
    {
        hash: '0x789abc012def345678abc90123def45678abc901',
        type: 'receive',
        token: 'USDT',
        amount: '25.00',
        from: '0xabcdef0123456789abcdef0123456789abcdef01',
        to: 'CURRENT_WALLET',
        timestamp: Date.now() - 172800000, // 2 days ago
        network: 'Ethereum',
        status: 'confirmed'
    },
    {
        hash: '0x345def678abc901234def567abc8901234def567',
        type: 'send',
        token: 'DAI',
        amount: '10.25',
        from: 'CURRENT_WALLET',
        to: '0x0123456789abcdef0123456789abcdef01234567',
        timestamp: Date.now() - 259200000, // 3 days ago
        network: 'Ethereum',
        status: 'confirmed'
    },
    {
        hash: '0x901def234abc567890def123abc4567890def123',
        type: 'receive',
        token: 'ETH',
        amount: '0.05',
        from: '0xfedcba9876543210fedcba9876543210fedcba98',
        to: 'CURRENT_WALLET',
        timestamp: Date.now() - 432000000, // 5 days ago
        network: 'Ethereum',
        status: 'confirmed'
    },
    {
        hash: '0x567abc890def123456abc789def0123456abc789',
        type: 'approve',
        token: 'USDC',
        amount: '1000.00',
        from: 'CURRENT_WALLET',
        to: '0x1111111254eeb25477b68fb85ed929f73a960582', // 1inch router
        timestamp: Date.now() - 604800000, // 7 days ago
        network: 'Ethereum',
        status: 'confirmed'
    }
];

// Get mock balances with simulated loading delay
function getMockBalances(address, network) {
    console.log('[MOCK] Fetching balances for', address, 'on', network);
    
    return new Promise(resolve => {
        // Simulate network delay (800ms)
        setTimeout(() => {
            resolve(MOCK_BALANCES);
        }, 800);
    });
}

// Get mock transaction history with simulated loading delay
function getMockTransactionHistory(address, network) {
    console.log('[MOCK] Fetching transaction history for', address, 'on', network);
    
    return new Promise(resolve => {
        // Replace CURRENT_WALLET placeholder with actual address
        const transactions = MOCK_TRANSACTIONS.map(tx => ({
            ...tx,
            from: tx.from === 'CURRENT_WALLET' ? address : tx.from,
            to: tx.to === 'CURRENT_WALLET' ? address : tx.to
        }));
        
        // Simulate network delay (1s)
        setTimeout(() => {
            resolve(transactions);
        }, 1000);
    });
}

// Mock wallet binding (simulates backend response)
function getMockWalletBinding(email) {
    console.log('[MOCK] Fetching wallet bindings for', email);
    
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({
                email: email || 'jane@example.com',
                wallets: [
                    {
                        address: localStorage.getItem('walletAddress'),
                        provider: localStorage.getItem('walletProvider'),
                        boundAt: new Date().toISOString(),
                        verified: localStorage.getItem('walletProvider') === 'walletconnect'
                    }
                ]
            });
        }, 500);
    });
}

// Format transaction for display
function formatTransaction(tx) {
    const timeAgo = getTimeAgo(tx.timestamp);
    const shortFrom = tx.from.substring(0, 6) + '...' + tx.from.substring(38);
    const shortTo = tx.to.substring(0, 6) + '...' + tx.to.substring(38);
    const shortHash = tx.hash.substring(0, 10) + '...' + tx.hash.substring(58);
    
    return {
        ...tx,
        shortFrom,
        shortTo,
        shortHash,
        timeAgo,
        explorerUrl: `https://etherscan.io/tx/${tx.hash}`
    };
}

// Helper: Get human-readable time ago
function getTimeAgo(timestamp) {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return Math.floor(seconds / 60) + ' minutes ago';
    if (seconds < 86400) return Math.floor(seconds / 3600) + ' hours ago';
    if (seconds < 604800) return Math.floor(seconds / 86400) + ' days ago';
    return Math.floor(seconds / 604800) + ' weeks ago';
}

/*
 * REAL RPC IMPLEMENTATION (For Frontend Team)
 * 
 * Uncomment and use these functions for production:
 * 
 * async function getRealEthBalance(address, providerUrl) {
 *   const provider = new ethers.providers.JsonRpcProvider(providerUrl);
 *   const balance = await provider.getBalance(address);
 *   return ethers.utils.formatEther(balance);
 * }
 * 
 * async function getRealTokenBalance(tokenAddress, walletAddress, decimals, providerUrl) {
 *   const provider = new ethers.providers.JsonRpcProvider(providerUrl);
 *   const contract = new ethers.Contract(
 *     tokenAddress,
 *     ['function balanceOf(address) view returns (uint256)'],
 *     provider
 *   );
 *   const balance = await contract.balanceOf(walletAddress);
 *   return ethers.utils.formatUnits(balance, decimals);
 * }
 * 
 * async function getRealTransactionHistory(address, network) {
 *   // Call backend API endpoint
 *   const response = await fetch(`/api/transactions?address=${address}&network=${network}`);
 *   return await response.json();
 * }
 */
