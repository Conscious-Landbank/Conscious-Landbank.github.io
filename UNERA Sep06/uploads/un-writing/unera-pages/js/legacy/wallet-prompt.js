/**
 * Wallet Prompt System
 * Reusable component for prompting users to create a wallet before transactions
 */

const WalletPrompt = {
    /**
     * Check if user has a wallet
     * @returns {boolean}
     */
    hasWallet() {
        return !!localStorage.getItem('walletAddress');
    },

    /**
     * Check if this is user's first time on a specific page
     * @param {string} page - Page identifier (convert, donate, send)
     * @returns {boolean}
     */
    isFirstVisit(page) {
        const key = `visited_${page}`;
        const hasVisited = localStorage.getItem(key);
        if (!hasVisited) {
            localStorage.setItem(key, 'true');
            return true;
        }
        return false;
    },

    /**
     * Show wallet creation modal
     * @param {Object} options - Configuration options
     */
    showModal(options) {
        const {
            title = '💳 Connect Wallet',
            message = 'Connect your wallet to continue with this action.',
            benefits = [],
            page = 'unknown',
            isFirstTime = true,
            onCreateWallet = null,
            onDismiss = null
        } = options;

        // Create modal HTML
        const modalHTML = `
            <div id="walletPromptModal" class="wallet-prompt-modal" role="dialog" aria-labelledby="walletPromptTitle" aria-modal="true">
                <div class="wallet-prompt-overlay" onclick="WalletPrompt.closeModal('${page}')"></div>
                <div class="wallet-prompt-content">
                    <button class="wallet-prompt-close" onclick="WalletPrompt.closeModal('${page}')" aria-label="Close modal">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <line x1="18" y1="6" x2="6" y2="18"/>
                            <line x1="6" y1="6" x2="18" y2="18"/>
                        </svg>
                    </button>
                    
                    <div class="wallet-prompt-icon">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="url(#walletGradient)" stroke-width="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                            <line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                        <svg width="0" height="0" style="position: absolute;">
                            <defs>
                                <linearGradient id="walletGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" style="stop-color:#10B981;stop-opacity:1" />
                                    <stop offset="100%" style="stop-color:#0EA5E9;stop-opacity:1" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>
                    
                    <h2 id="walletPromptTitle" class="wallet-prompt-title">${title}</h2>
                    <p class="wallet-prompt-message">${message}</p>
                    
                    ${isFirstTime ? `
                        <div class="wallet-prompt-first-time">
                            <div class="wallet-prompt-badge">
                                First time here?
                            </div>
                            <p class="wallet-prompt-first-time-text">
                                Welcome! To get started, you'll need to connect your wallet (MetaMask or WalletConnect). 
                                This is your secure digital account that only you control.
                            </p>
                        </div>
                    ` : ''}
                    
                    ${benefits.length > 0 ? `
                        <div class="wallet-prompt-benefits">
                            <div class="wallet-prompt-benefits-title">✨ What You'll Get</div>
                            <ul class="wallet-prompt-benefits-list">
                                ${benefits.map(benefit => `<li>${benefit}</li>`).join('')}
                            </ul>
                        </div>
                    ` : ''}
                    
                    <div class="wallet-prompt-features">
                        <div class="wallet-prompt-feature">
                            <span class="wallet-prompt-feature-icon">⏱️</span>
                            <div class="wallet-prompt-feature-text">
                                <div class="wallet-prompt-feature-label">Quick Setup</div>
                                <div class="wallet-prompt-feature-value">3-5 minutes</div>
                            </div>
                        </div>
                        <div class="wallet-prompt-feature">
                            <span class="wallet-prompt-feature-icon">🔒</span>
                            <div class="wallet-prompt-feature-text">
                                <div class="wallet-prompt-feature-label">Your Control</div>
                                <div class="wallet-prompt-feature-value">Your keys only</div>
                            </div>
                        </div>
                        <div class="wallet-prompt-feature">
                            <span class="wallet-prompt-feature-icon">✓</span>
                            <div class="wallet-prompt-feature-text">
                                <div class="wallet-prompt-feature-label">Secure</div>
                                <div class="wallet-prompt-feature-value">Bank-level</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="wallet-prompt-actions">
                        <button class="wallet-prompt-btn wallet-prompt-btn-primary" onclick="WalletPrompt.createWallet('${page}')">
                            Connect Wallet Now
                        </button>
                        <button class="wallet-prompt-btn wallet-prompt-btn-secondary" onclick="WalletPrompt.closeModal('${page}')">
                            I'll do this later
                        </button>
                    </div>
                    
                    <div class="wallet-prompt-footer">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                        </svg>
                        Your data is encrypted and never shared
                    </div>
                </div>
            </div>
        `;

        // Inject styles if not already present
        if (!document.getElementById('walletPromptStyles')) {
            const styles = document.createElement('style');
            styles.id = 'walletPromptStyles';
            styles.textContent = `
                .wallet-prompt-modal {
                    position: fixed;
                    inset: 0;
                    z-index: 10000;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    animation: walletPromptFadeIn 0.3s ease-out;
                }
                
                @keyframes walletPromptFadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
                
                .wallet-prompt-overlay {
                    position: absolute;
                    inset: 0;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                }
                
                .wallet-prompt-content {
                    position: relative;
                    background: white;
                    border-radius: 1.5rem;
                    padding: 3rem 2.5rem;
                    max-width: 540px;
                    width: calc(100% - 2rem);
                    max-height: 90vh;
                    overflow-y: auto;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                    animation: walletPromptSlideUp 0.3s ease-out;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                
                .wallet-prompt-content::-webkit-scrollbar {
                    display: none;
                }
                
                @keyframes walletPromptSlideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
                
                .wallet-prompt-close {
                    position: absolute;
                    top: 1.5rem;
                    right: 1.5rem;
                    width: 36px;
                    height: 36px;
                    border: none;
                    background: rgba(0, 0, 0, 0.05);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: #6B7280;
                }
                
                .wallet-prompt-close:hover {
                    background: rgba(0, 0, 0, 0.1);
                    transform: rotate(90deg);
                }
                
                .wallet-prompt-icon {
                    width: 96px;
                    height: 96px;
                    margin: 0 auto 1.5rem;
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(14, 165, 233, 0.1) 100%);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 0 12px rgba(16, 185, 129, 0.05);
                }
                
                .wallet-prompt-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.875rem;
                    font-weight: 700;
                    text-align: center;
                    color: #1F2937;
                    margin-bottom: 0.75rem;
                    line-height: 1.2;
                }
                
                .wallet-prompt-message {
                    text-align: center;
                    color: #6B7280;
                    font-size: 1rem;
                    line-height: 1.6;
                    margin-bottom: 1.5rem;
                }
                
                .wallet-prompt-first-time {
                    background: linear-gradient(135deg, rgba(245, 158, 11, 0.08) 0%, rgba(249, 115, 22, 0.08) 100%);
                    border: 1.5px solid rgba(245, 158, 11, 0.3);
                    border-radius: 1rem;
                    padding: 1.25rem;
                    margin-bottom: 1.5rem;
                }
                
                .wallet-prompt-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    background: linear-gradient(135deg, #F59E0B 0%, #F97316 100%);
                    color: white;
                    padding: 0.5rem 1rem;
                    border-radius: 2rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                    margin-bottom: 0.75rem;
                }
                
                .wallet-prompt-first-time-text {
                    color: #1F2937;
                    font-size: 0.938rem;
                    line-height: 1.6;
                    margin: 0;
                }
                
                .wallet-prompt-benefits {
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%);
                    border: 1.5px solid rgba(16, 185, 129, 0.2);
                    border-radius: 1rem;
                    padding: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                
                .wallet-prompt-benefits-title {
                    font-weight: 600;
                    color: #10B981;
                    font-size: 0.938rem;
                    margin-bottom: 0.75rem;
                }
                
                .wallet-prompt-benefits-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }
                
                .wallet-prompt-benefits-list li {
                    color: #1F2937;
                    font-size: 0.938rem;
                    line-height: 1.8;
                    padding-left: 1.5rem;
                    position: relative;
                    text-align: left;
                }
                
                .wallet-prompt-benefits-list li::before {
                    content: '✓';
                    position: absolute;
                    left: 0;
                    color: #10B981;
                    font-weight: bold;
                }
                
                .wallet-prompt-features {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1rem;
                    margin-bottom: 2rem;
                }
                
                .wallet-prompt-feature {
                    text-align: center;
                }
                
                .wallet-prompt-feature-icon {
                    font-size: 1.5rem;
                    display: block;
                    margin-bottom: 0.5rem;
                }
                
                .wallet-prompt-feature-label {
                    font-size: 0.75rem;
                    color: #6B7280;
                    margin-bottom: 0.25rem;
                }
                
                .wallet-prompt-feature-value {
                    font-size: 0.875rem;
                    font-weight: 600;
                    color: #1F2937;
                }
                
                .wallet-prompt-actions {
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                    margin-bottom: 1.5rem;
                }
                
                .wallet-prompt-btn {
                    width: 100%;
                    padding: 1rem 2rem;
                    border-radius: 0.75rem;
                    font-weight: 600;
                    font-size: 1rem;
                    border: none;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    font-family: 'Inter', sans-serif;
                }
                
                .wallet-prompt-btn-primary {
                    background: linear-gradient(135deg, #10B981 0%, #0EA5E9 100%);
                    color: white;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                }
                
                .wallet-prompt-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
                }
                
                .wallet-prompt-btn-secondary {
                    background: white;
                    color: #6B7280;
                    border: 2px solid #E5E7EB;
                }
                
                .wallet-prompt-btn-secondary:hover {
                    background: #F3F4F6;
                    border-color: #D1D5DB;
                }
                
                .wallet-prompt-footer {
                    text-align: center;
                    font-size: 0.813rem;
                    color: #9CA3AF;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                }
                
                @media (max-width: 640px) {
                    .wallet-prompt-content {
                        padding: 2rem 1.5rem;
                    }
                    
                    .wallet-prompt-title {
                        font-size: 1.5rem;
                    }
                    
                    .wallet-prompt-features {
                        grid-template-columns: 1fr;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        // Remove existing modal if present
        const existingModal = document.getElementById('walletPromptModal');
        if (existingModal) {
            existingModal.remove();
        }

        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.style.overflow = 'hidden';

        // Store callback if provided
        if (onCreateWallet) {
            window._walletPromptCallback = onCreateWallet;
        }
        if (onDismiss) {
            window._walletPromptDismissCallback = onDismiss;
        }

        // Track analytics
        this._trackEvent('wallet_prompt_shown', { page, isFirstTime });
    },

    /**
     * Close the modal
     * @param {string} page - Page identifier
     */
    closeModal(page) {
        const modal = document.getElementById('walletPromptModal');
        if (modal) {
            modal.style.animation = 'walletPromptFadeOut 0.2s ease-out forwards';
            setTimeout(() => {
                modal.remove();
                document.body.style.overflow = '';
            }, 200);
        }

        // Call dismiss callback if exists
        if (window._walletPromptDismissCallback) {
            window._walletPromptDismissCallback();
            delete window._walletPromptDismissCallback;
        }

        this._trackEvent('wallet_prompt_dismissed', { page });
    },

    /**
     * Navigate to wallet connection (UPDATED: replaced creation with connect flow)
     * @param {string} returnPage - Page to return to after wallet connection
     */
    createWallet(returnPage) {
        // TEMPORARILY HIDDEN: Wallet creation flow
        // Now using Connect Wallet flow (Uniswap-style)
        
        // Store return page for after wallet connection
        localStorage.setItem('walletConnectionReturn', returnPage);
        
        // Track event
        this._trackEvent('wallet_connection_started', { from: returnPage });
        
        // Open connect wallet modal instead of navigating to creation page
        if (typeof openWalletModal === 'function') {
            openWalletModal();
        } else {
            // Fallback: redirect to wallet page which has the connect button
            window.location.href = 'wallet-enhanced.html';
        }
    },

    /**
     * Check wallet and show prompt if needed
     * @param {Object} options - Configuration options
     * @returns {boolean} - True if has wallet, false if prompt shown
     */
    checkAndPrompt(options) {
        if (this.hasWallet()) {
            return true;
        }

        // Show wallet creation suggestion (optional - user can dismiss)
        const { page } = options;
        const isFirstTime = this.isFirstVisit(page);
        
        this.showModal({
            ...options,
            isFirstTime
        });

        return false;
    },

    /**
     * Show dashboard banner for wallet creation
     * Only shows if KYC is already verified (KYC banner takes priority)
     */
    showDashboardBanner() {
        // Don't show if user already has wallet or dismissed the banner
        if (this.hasWallet() || localStorage.getItem('walletBannerDismissed')) {
            return;
        }

        // Priority: KYC banner shows first, wallet banner shows after KYC is verified
        const kycStatus = localStorage.getItem('kycStatus');
        if (kycStatus !== 'verified') {
            return; // Don't show wallet banner until KYC is verified
        }

        const bannerHTML = `
            <div id="walletBanner" class="wallet-banner">
                <div class="wallet-banner-content">
                    <div class="wallet-banner-icon">💳</div>
                    <div class="wallet-banner-text">
                        <div class="wallet-banner-title">Connect Your Wallet</div>
                        <div class="wallet-banner-description">Connect MetaMask or WalletConnect to unlock full features and track your impact</div>
                    </div>
                    <div class="wallet-banner-actions">
                        <button class="wallet-banner-btn" onclick="toggleConnectDropdown()">
                            Connect Wallet
                        </button>
                        <button class="wallet-banner-dismiss" onclick="WalletPrompt.dismissBanner()" aria-label="Dismiss banner">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="18" y1="6" x2="6" y2="18"/>
                                <line x1="6" y1="6" x2="18" y2="18"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;

        // Inject banner styles if not already present
        if (!document.getElementById('walletBannerStyles')) {
            const styles = document.createElement('style');
            styles.id = 'walletBannerStyles';
            styles.textContent = `
                .wallet-banner {
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(14, 165, 233, 0.95) 100%);
                    padding: 1.25rem 2rem;
                    animation: walletBannerSlideDown 0.5s ease-out;
                    position: relative;
                    overflow: hidden;
                    z-index: 10;
                    margin-top: 0;
                    pointer-events: none;
                }
                
                .wallet-banner::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -10%;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
                    pointer-events: none;
                }
                
                @keyframes walletBannerSlideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .wallet-banner-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    position: relative;
                    z-index: 1;
                    pointer-events: auto;
                }
                
                .wallet-banner-icon {
                    font-size: 2.5rem;
                    flex-shrink: 0;
                }
                
                .wallet-banner-text {
                    flex: 1;
                }
                
                .wallet-banner-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.25rem;
                }
                
                .wallet-banner-description {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.9);
                    line-height: 1.5;
                }
                
                .wallet-banner-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .wallet-banner-btn {
                    background: white;
                    color: #10B981;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    border: none;
                    pointer-events: auto;
                    font-weight: 600;
                    font-size: 0.938rem;
                    min-height: 46px;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-family: 'Inter', sans-serif;
                    white-space: nowrap;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                }
                
                .wallet-banner-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .wallet-banner-dismiss {
                    width: 32px;
                    height: 32px;
                    border: none;
                    background: rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    color: white;
                    flex-shrink: 0;
                    pointer-events: auto;
                }
                
                .wallet-banner-dismiss:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: rotate(90deg);
                }
                
                @media (max-width: 768px) {
                    .wallet-banner {
                        padding: 1rem;
                    }
                    
                    .wallet-banner-content {
                        flex-wrap: wrap;
                        gap: 1rem;
                    }
                    
                    .wallet-banner-icon {
                        font-size: 2rem;
                    }
                    
                    .wallet-banner-title {
                        font-size: 1rem;
                    }
                    
                    .wallet-banner-description {
                        font-size: 0.813rem;
                    }
                    
                    .wallet-banner-actions {
                        width: 100%;
                        justify-content: space-between;
                    }
                    
                    .wallet-banner-btn {
                        flex: 1;
                        font-size: 0.875rem;
                        padding: 0.688rem 1.25rem;
                        min-height: 44px;
                    }
                }
            `;
            document.head.appendChild(styles);
        }

        // Find insertion point (after nav or at top of main content)
        const nav = document.querySelector('.nav');
        const main = document.querySelector('main, .main-container, .dashboard-container');
        
        if (nav && nav.nextElementSibling) {
            nav.insertAdjacentHTML('afterend', bannerHTML);
        } else if (main) {
            main.insertAdjacentHTML('beforebegin', bannerHTML);
        } else {
            document.body.insertAdjacentHTML('afterbegin', bannerHTML);
        }

        this._trackEvent('wallet_banner_shown', { page: 'dashboard' });
    },

    /**
     * Dismiss the dashboard banner
     */
    dismissBanner() {
        localStorage.setItem('walletBannerDismissed', 'true');
        const banner = document.getElementById('walletBanner');
        if (banner) {
            banner.style.animation = 'walletBannerSlideUp 0.3s ease-out forwards';
            setTimeout(() => banner.remove(), 300);
        }
        
        // Add slideUp animation
        if (!document.getElementById('walletBannerSlideUp')) {
            const style = document.createElement('style');
            style.id = 'walletBannerSlideUp';
            style.textContent = `
                @keyframes walletBannerSlideUp {
                    from {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    to {
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                }
            `;
            document.head.appendChild(style);
        }

        this._trackEvent('wallet_banner_dismissed', {});
    },

    /**
     * Track analytics event (placeholder for integration with analytics service)
     * @param {string} eventName
     * @param {Object} properties
     */
    _trackEvent(eventName, properties) {
        // Integration point for Google Analytics, Mixpanel, etc.
        console.log(`[WalletPrompt] ${eventName}`, properties);
        
        // Example: Google Analytics
        // if (typeof gtag !== 'undefined') {
        //     gtag('event', eventName, properties);
        // }
        
        // Example: Mixpanel
        // if (typeof mixpanel !== 'undefined') {
        //     mixpanel.track(eventName, properties);
        // }
    }
};

// Auto-initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Check if returning from wallet creation
    const urlParams = new URLSearchParams(window.location.search);
    const returnedFrom = urlParams.get('from');
    
    if (returnedFrom === 'wallet-creation') {
        const returnPage = localStorage.getItem('walletCreationReturn');
        localStorage.removeItem('walletCreationReturn');
        
        // Show success message
        if (returnPage) {
            const successMessage = document.createElement('div');
            successMessage.style.cssText = `
                position: fixed;
                top: 2rem;
                right: 2rem;
                background: linear-gradient(135deg, #10B981 0%, #0EA5E9 100%);
                color: white;
                padding: 1rem 1.5rem;
                border-radius: 0.75rem;
                box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
                font-weight: 600;
                z-index: 10000;
                animation: slideInRight 0.3s ease-out;
            `;
            successMessage.textContent = '✓ Wallet created successfully!';
            document.body.appendChild(successMessage);
            
            setTimeout(() => {
                successMessage.style.animation = 'slideOutRight 0.3s ease-out forwards';
                setTimeout(() => successMessage.remove(), 300);
            }, 3000);
        }
    }
});
