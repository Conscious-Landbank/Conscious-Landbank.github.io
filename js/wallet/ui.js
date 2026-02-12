/**
 * Wallet UI Helpers
 * Functions to update UI elements, show notifications, and manage loading states
 */

// Show toast notification
function showNotification(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `wallet-toast wallet-toast-${type}`;
    toast.textContent = message;
    
    // Apply styles
    Object.assign(toast.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '16px 24px',
        borderRadius: '8px',
        backgroundColor: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6',
        color: '#FFFFFF',
        fontSize: '14px',
        fontWeight: '500',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        zIndex: '10000',
        opacity: '0',
        transform: 'translateY(-10px)',
        transition: 'all 0.3s ease'
    });
    
    document.body.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateY(0)';
    }, 10);
    
    // Remove after 3 seconds
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => document.body.removeChild(toast), 300);
    }, 3000);
}

// Show loading state
function showLoading(message = 'Loading...') {
    const overlay = document.createElement('div');
    overlay.id = 'walletLoadingOverlay';
    overlay.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        ">
            <div style="
                background: white;
                padding: 32px 48px;
                border-radius: 12px;
                text-align: center;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            ">
                <div style="
                    width: 40px;
                    height: 40px;
                    border: 4px solid #E5E7EB;
                    border-top-color: #10B981;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 16px;
                "></div>
                <div style="
                    font-size: 16px;
                    font-weight: 500;
                    color: #1F2937;
                ">${message}</div>
            </div>
        </div>
    `;
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(overlay);
}

// Hide loading state
function hideLoading() {
    const overlay = document.getElementById('walletLoadingOverlay');
    if (overlay) {
        overlay.remove();
    }
}

// Update wallet display in navigation
function updateWalletDisplay(address, provider) {
    const shortAddress = address.substring(0, 6) + '...' + address.substring(address.length - 4);
    
    // Hide connect button
    const connectBtn = document.getElementById('navConnectBtn');
    if (connectBtn) {
        connectBtn.style.display = 'none';
    }
    
    // Show wallet link
    const walletLink = document.getElementById('walletNavLink');
    if (walletLink) {
        walletLink.style.display = 'inline-block';
    }
    
    // Update user profile if exists
    const userProfile = document.getElementById('userProfile');
    if (userProfile) {
        // Find or create wallet badge in user dropdown
        const walletBadge = document.querySelector('.user-wallet-badge');
        if (walletBadge) {
            walletBadge.textContent = shortAddress;
        }
    }
    
    console.log('✅ UI updated for connected wallet');
}

// Update network badge
function updateNetworkBadge(chainId) {
    const network = getNetworkByChainId(chainId);
    if (!network) return;
    
    const badge = document.getElementById('networkBadge');
    if (!badge) return;
    
    const indicator = badge.querySelector('.network-indicator');
    const name = badge.querySelector('.network-name');
    
    if (indicator && name) {
        name.textContent = network.chainName;
        
        // Color based on network
        let color = '#10B981'; // Ethereum green
        if (network.key === 'sepolia') color = '#F59E0B'; // Testnet orange
        if (network.key === 'base') color = '#0EA5E9'; // Base blue
        
        indicator.style.backgroundColor = color;
        badge.style.display = 'flex';
    }
}

// Update balance display
function updateBalanceDisplay(balances) {
    // Update ETH balance
    const ethBalanceEl = document.getElementById('ethBalance');
    if (ethBalanceEl && balances.eth) {
        ethBalanceEl.textContent = parseFloat(balances.eth).toFixed(4);
    }
    
    // Update token balances
    const tokenBalancesContainer = document.getElementById('tokenBalances');
    if (tokenBalancesContainer && balances.tokens) {
        tokenBalancesContainer.innerHTML = balances.tokens.map(token => `
            <div class="balance-card token-card">
                <div class="token-info">
                    <span class="token-logo">${token.logo || '💰'}</span>
                    <div>
                        <div class="balance-label">${token.symbol}</div>
                        <div class="token-name">${token.name}</div>
                    </div>
                </div>
                <div class="balance-value">${parseFloat(token.balance).toFixed(2)}</div>
            </div>
        `).join('');
    }
}

// Update transaction history display
function updateTransactionDisplay(transactions) {
    const container = document.getElementById('transactionHistoryContainer');
    if (!container) return;
    
    if (transactions.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: #9CA3AF;">
                <div style="font-size: 48px; margin-bottom: 16px;">📭</div>
                <div style="font-size: 16px; font-weight: 500; margin-bottom: 8px;">No transactions yet</div>
                <div style="font-size: 14px;">Your transaction history will appear here</div>
            </div>
        `;
        return;
    }
    
    container.innerHTML = transactions.map(tx => {
        const formatted = formatTransaction(tx);
        const typeIcon = tx.type === 'receive' ? '↓' : tx.type === 'send' ? '↑' : '✓';
        const typeColor = tx.type === 'receive' ? '#10B981' : tx.type === 'send' ? '#EF4444' : '#3B82F6';
        
        return `
            <div class="transaction-row">
                <div class="transaction-type" style="color: ${typeColor};">
                    <span style="font-size: 20px;">${typeIcon}</span>
                    <span>${tx.type.charAt(0).toUpperCase() + tx.type.slice(1)}</span>
                </div>
                <div class="transaction-token">
                    ${tx.amount} ${tx.token}
                </div>
                <div class="transaction-address">
                    ${tx.type === 'receive' ? 'From' : 'To'}: ${formatted.shortTo}
                </div>
                <div class="transaction-time">${formatted.timeAgo}</div>
                <div class="transaction-link">
                    <a href="${formatted.explorerUrl}" target="_blank" style="color: #10B981; text-decoration: none;">
                        View ↗
                    </a>
                </div>
            </div>
        `;
    }).join('');
}

// Show error modal
function showErrorModal(title, message, onRetry = null) {
    const modal = document.createElement('div');
    modal.id = 'walletErrorModal';
    modal.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
        " onclick="document.getElementById('walletErrorModal').remove()">
            <div style="
                background: white;
                padding: 32px;
                border-radius: 12px;
                max-width: 400px;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
            " onclick="event.stopPropagation()">
                <div style="
                    font-size: 48px;
                    text-align: center;
                    margin-bottom: 16px;
                ">⚠️</div>
                <h3 style="
                    font-size: 20px;
                    font-weight: 600;
                    color: #1F2937;
                    margin-bottom: 12px;
                    text-align: center;
                ">${title}</h3>
                <p style="
                    font-size: 14px;
                    color: #6B7280;
                    margin-bottom: 24px;
                    text-align: center;
                    line-height: 1.6;
                ">${message}</p>
                <div style="
                    display: flex;
                    gap: 12px;
                    justify-content: center;
                ">
                    ${onRetry ? `
                        <button onclick="document.getElementById('walletErrorModal').remove(); (${onRetry.toString()})()" style="
                            padding: 12px 24px;
                            background: #10B981;
                            color: white;
                            border: none;
                            border-radius: 8px;
                            font-weight: 500;
                            cursor: pointer;
                        ">Try Again</button>
                    ` : ''}
                    <button onclick="document.getElementById('walletErrorModal').remove()" style="
                        padding: 12px 24px;
                        background: #F3F4F6;
                        color: #1F2937;
                        border: none;
                        border-radius: 8px;
                        font-weight: 500;
                        cursor: pointer;
                    ">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Error messages for common wallet errors
const ERROR_MESSAGES = {
    4001: {
        title: 'Connection Rejected',
        message: 'You rejected the wallet connection request. Click "Try Again" to reconnect.'
    },
    4100: {
        title: 'Unauthorized',
        message: 'The requested account is not authorized. Please check your wallet settings.'
    },
    4200: {
        title: 'Unsupported Method',
        message: 'This operation is not supported by your wallet.'
    },
    4900: {
        title: 'Disconnected',
        message: 'Your wallet is disconnected. Please reconnect to continue.'
    },
    4901: {
        title: 'Wrong Network',
        message: 'Your wallet is not connected to the correct network.'
    },
    'UNSUPPORTED_NETWORK': {
        title: 'Unsupported Network',
        message: 'Please switch to Ethereum Mainnet, Base, or Sepolia in your wallet.'
    },
    'NETWORK_NOT_ADDED': {
        title: 'Network Not Found',
        message: 'This network is not configured in your wallet. Would you like to add it?'
    },
    'CONNECTION_TIMEOUT': {
        title: 'Connection Timeout',
        message: 'The connection request timed out. Please try again.'
    }
};

// Handle connection error with retry callback
function handleConnectionError(error, retryCallback = null) {
    const errorInfo = ERROR_MESSAGES[error.code] || ERROR_MESSAGES[error.message] || {
        title: 'Connection Failed',
        message: error.message || 'Failed to connect wallet. Please try again.'
    };
    
    // Pass retry callback to modal
    showErrorModal(errorInfo.title, errorInfo.message, retryCallback);
    console.error('Wallet connection error:', error);
}
