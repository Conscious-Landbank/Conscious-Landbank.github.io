/**
 * KYC Modal Component
 * Reusable modal for prompting users to complete KYC verification
 * Based on research from Coinbase, Stripe, Binance best practices
 */

const KYCModal = {
    /**
     * Check if user has completed KYC
     * @returns {boolean}
     */
    isVerified() {
        const kycStatus = localStorage.getItem('kycStatus');
        return kycStatus === 'verified';
    },

    /**
     * Get current KYC status
     * @returns {string} - 'not_started', 'pending', 'verified', 'rejected'
     */
    getStatus() {
        return localStorage.getItem('kycStatus') || 'not_started';
    },

    /**
     * Get KYC verification level
     * @returns {string} - 'tier0', 'tier1', 'tier2', 'tier3'
     */
    getLevel() {
        return localStorage.getItem('kycLevel') || 'tier0';
    },

    /**
     * Check if action requires KYC and trigger modal if needed
     * @param {string} action - 'donate', 'convert', 'send', 'withdraw'
     * @param {number} amount - Transaction amount (optional)
     * @param {function} callback - Function to call if KYC is verified
     * @returns {boolean} - true if can proceed, false if KYC required
     */
    checkAndProceed(action, amount, callback) {
        const status = this.getStatus();
        const level = this.getLevel();

        // Check if KYC is required for this action
        if (this.requiresKYC(action, amount, level)) {
            this.show(action);
            return false;
        }

        // KYC verified, proceed with action
        if (callback) callback();
        return true;
    },

    /**
     * Determine if action requires KYC based on rules
     * @param {string} action
     * @param {number} amount
     * @param {string} level
     * @returns {boolean}
     */
    requiresKYC(action, amount, level) {
        // Tier 1 (Basic) required for:
        // - Any donation
        // - Any stablecoin purchase
        // - Any send
        if (level === 'tier0') {
            return ['donate', 'convert', 'send'].includes(action);
        }

        // Tier 2 (Enhanced) required for:
        // - Donations > $1000/month
        // - Withdrawals to fiat
        if (level === 'tier1') {
            if (action === 'withdraw') return true;
            if (amount && amount > 1000) return true;
        }

        return false;
    },

    /**
     * Show KYC modal
     * @param {string} action - The action user was attempting
     */
    show(action) {
        const modal = this.createModal(action);
        document.body.appendChild(modal);
        document.body.classList.add('modal-open');
        
        // Animate in
        setTimeout(() => {
            modal.querySelector('.kyc-modal-overlay').classList.add('show');
        }, 10);
    },

    /**
     * Hide KYC modal
     */
    hide() {
        const modal = document.getElementById('kycModal');
        if (modal) {
            modal.querySelector('.kyc-modal-overlay').classList.remove('show');
            setTimeout(() => {
                modal.remove();
                document.body.classList.remove('modal-open');
            }, 300);
        }
    },

    /**
     * Create modal HTML
     * @param {string} action
     * @returns {HTMLElement}
     */
    createModal(action) {
        const container = document.createElement('div');
        container.id = 'kycModal';
        
        const actionMessages = {
            donate: {
                title: 'Verify to Donate',
                description: 'To comply with financial regulations, we need to verify your identity before you can make donations.',
                benefits: [
                    'Donate up to $1,000/month',
                    'Track your endless impact',
                    'Support Humanity Centres globally'
                ]
            },
            convert: {
                title: 'Verify to Buy Stablecoins',
                description: 'Identity verification is required for cryptocurrency purchases to prevent fraud and comply with regulations.',
                benefits: [
                    'Purchase hCAD, hUSD, hEUR',
                    'Instant conversions',
                    'Secure transactions'
                ]
            },
            send: {
                title: 'Verify to Send Funds',
                description: 'For your security and regulatory compliance, we need to verify your identity before enabling fund transfers.',
                benefits: [
                    'Send funds globally',
                    'Low transaction fees',
                    'Fast and secure transfers'
                ]
            }
        };

        const message = actionMessages[action] || actionMessages.donate;

        container.innerHTML = `
            <div class="kyc-modal-overlay">
                <div class="kyc-modal-content">
                    <button class="kyc-modal-close" onclick="KYCModal.hide()" aria-label="Close modal">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </button>

                    <div class="kyc-modal-icon">
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                        </svg>
                    </div>

                    <h2 class="kyc-modal-title">${message.title}</h2>
                    <p class="kyc-modal-description">${message.description}</p>

                    <div class="kyc-modal-stats">
                        <div class="kyc-stat">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                            </svg>
                            <span><strong>5 minutes</strong><br>average time</span>
                        </div>
                        <div class="kyc-stat">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                            </svg>
                            <span><strong>95% instant</strong><br>approval rate</span>
                        </div>
                        <div class="kyc-stat">
                            <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                            </svg>
                            <span><strong>Bank-level</strong><br>encryption</span>
                        </div>
                    </div>

                    <div class="kyc-modal-benefits">
                        <div class="kyc-benefits-title">✨ What You'll Unlock</div>
                        ${message.benefits.map(benefit => `
                            <div class="kyc-benefit-item">
                                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
                                </svg>
                                ${benefit}
                            </div>
                        `).join('')}
                    </div>

                    <div class="kyc-modal-actions">
                        <button class="kyc-btn-primary" onclick="KYCModal.startVerification()">
                            Start Verification
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                            </svg>
                        </button>
                        <button class="kyc-btn-secondary" onclick="KYCModal.hide()">I'll do this later</button>
                    </div>

                    <div class="kyc-modal-footer">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                        </svg>
                        Your data is encrypted and never shared without consent. <a href="#">Privacy Policy</a>
                    </div>
                </div>
            </div>
        `;

        // Add styles if not already present
        if (!document.getElementById('kycModalStyles')) {
            const styles = document.createElement('style');
            styles.id = 'kycModalStyles';
            styles.textContent = this.getStyles();
            document.head.appendChild(styles);
        }

        return container;
    },

    /**
     * Start verification flow
     */
    startVerification() {
        window.location.href = 'kyc-verify.html';
    },

    /**
     * Get modal styles
     * @returns {string}
     */
    getStyles() {
        return `
            .kyc-modal-overlay {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.5);
                backdrop-filter: blur(4px);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                padding: 1.5rem;
                opacity: 0;
                transition: opacity 0.3s ease;
            }

            .kyc-modal-overlay.show {
                opacity: 1;
            }

            .kyc-modal-content {
                background: white;
                border-radius: 1.25rem;
                padding: 3rem;
                max-width: 540px;
                width: 100%;
                position: relative;
                box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                max-height: 90vh;
                overflow-y: auto;
                scrollbar-width: none;
                -ms-overflow-style: none;
            }

            .kyc-modal-content::-webkit-scrollbar {
                display: none;
            }

            .kyc-modal-close {
                position: absolute;
                top: 1.5rem;
                right: 1.5rem;
                background: rgba(0, 0, 0, 0.04);
                border: none;
                border-radius: 0.5rem;
                width: 36px;
                height: 36px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s;
                color: #6B7280;
            }

            .kyc-modal-close:hover {
                background: rgba(0, 0, 0, 0.08);
                color: #1F2937;
            }

            .kyc-modal-icon {
                width: 80px;
                height: 80px;
                margin: 0 auto 1.5rem;
                background: linear-gradient(135deg, #10B981 0%, #0EA5E9 100%);
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                animation: kycPulse 2s ease-in-out infinite;
            }

            @keyframes kycPulse {
                0%, 100% { transform: scale(1); box-shadow: 0 4px 20px rgba(16, 185, 129, 0.3); }
                50% { transform: scale(1.05); box-shadow: 0 6px 30px rgba(16, 185, 129, 0.5); }
            }

            .kyc-modal-icon svg {
                width: 40px;
                height: 40px;
                stroke: white;
            }

            .kyc-modal-title {
                font-family: 'Space Grotesk', sans-serif;
                font-size: 1.75rem;
                font-weight: 700;
                color: #1F2937;
                text-align: center;
                margin-bottom: 0.75rem;
            }

            .kyc-modal-description {
                font-size: 1rem;
                color: #6B7280;
                text-align: center;
                line-height: 1.6;
                margin-bottom: 2rem;
            }

            .kyc-modal-stats {
                display: grid;
                grid-template-columns: repeat(3, 1fr);
                gap: 1rem;
                margin-bottom: 2rem;
                padding: 1.5rem;
                background: linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(14, 165, 233, 0.05) 100%);
                border-radius: 0.875rem;
            }

            .kyc-stat {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 0.5rem;
                text-align: center;
            }

            .kyc-stat svg {
                color: #10B981;
                flex-shrink: 0;
            }

            .kyc-stat span {
                font-size: 0.813rem;
                line-height: 1.4;
                color: #6B7280;
            }

            .kyc-stat strong {
                color: #1F2937;
                font-weight: 600;
            }

            .kyc-modal-benefits {
                background: #F3F4F6;
                border-radius: 0.875rem;
                padding: 1.5rem;
                margin-bottom: 2rem;
            }

            .kyc-benefits-title {
                font-weight: 600;
                color: #1F2937;
                margin-bottom: 1rem;
                font-size: 0.938rem;
            }

            .kyc-benefit-item {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                margin-bottom: 0.75rem;
                font-size: 0.875rem;
                color: #1F2937;
            }

            .kyc-benefit-item:last-child {
                margin-bottom: 0;
            }

            .kyc-benefit-item svg {
                color: #10B981;
                flex-shrink: 0;
            }

            .kyc-modal-actions {
                display: flex;
                flex-direction: column;
                gap: 0.75rem;
                margin-bottom: 1.5rem;
            }

            .kyc-btn-primary {
                background: linear-gradient(135deg, #10B981 0%, #0EA5E9 100%);
                color: white;
                padding: 1rem 2rem;
                font-size: 1rem;
                font-weight: 600;
                border: none;
                border-radius: 0.75rem;
                cursor: pointer;
                transition: all 0.2s;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 0.5rem;
                box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
            }

            .kyc-btn-primary:hover {
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(16, 185, 129, 0.4);
            }

            .kyc-btn-secondary {
                background: white;
                color: #6B7280;
                padding: 0.875rem 2rem;
                font-size: 0.938rem;
                font-weight: 500;
                border: 1px solid rgba(0, 0, 0, 0.1);
                border-radius: 0.75rem;
                cursor: pointer;
                transition: all 0.2s;
            }

            .kyc-btn-secondary:hover {
                border-color: rgba(0, 0, 0, 0.2);
                color: #1F2937;
            }

            .kyc-modal-footer {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                justify-content: center;
                font-size: 0.75rem;
                color: #9CA3AF;
                line-height: 1.5;
                text-align: center;
            }

            .kyc-modal-footer svg {
                flex-shrink: 0;
                width: 14px;
                height: 14px;
            }

            .kyc-modal-footer a {
                color: #10B981;
                text-decoration: none;
                font-weight: 500;
            }

            .kyc-modal-footer a:hover {
                text-decoration: underline;
            }

            @media (max-width: 640px) {
                .kyc-modal-content {
                    padding: 2rem 1.5rem;
                }

                .kyc-modal-title {
                    font-size: 1.5rem;
                }

                .kyc-modal-stats {
                    grid-template-columns: 1fr;
                    gap: 1rem;
                }

                .kyc-stat {
                    flex-direction: row;
                    text-align: left;
                }
            }
        `;
    },

    /**
     * Show KYC status badge in dashboard
     * @param {string} containerId - ID of container element
     */
    showStatusBadge(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const status = this.getStatus();
        const level = this.getLevel();

        let badgeHTML = '';

        if (status === 'verified') {
            badgeHTML = `
                <div class="kyc-status-badge verified">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                    Verified
                </div>
            `;
        } else if (status === 'pending') {
            badgeHTML = `
                <div class="kyc-status-badge pending">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    Verification Pending
                </div>
            `;
        } else {
            badgeHTML = `
                <div class="kyc-status-badge not-verified">
                    <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                    </svg>
                    Verification Required
                </div>
            `;
        }

        container.innerHTML = badgeHTML;

        // Add badge styles
        if (!document.getElementById('kycBadgeStyles')) {
            const styles = document.createElement('style');
            styles.id = 'kycBadgeStyles';
            styles.textContent = `
                .kyc-status-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.5rem 1rem;
                    border-radius: 0.5rem;
                    font-size: 0.875rem;
                    font-weight: 600;
                }

                .kyc-status-badge.verified {
                    background: rgba(16, 185, 129, 0.1);
                    color: var(--stone-white);
                }

                .kyc-status-badge.pending {
                    background: rgba(245, 158, 11, 0.1);
                    color: #D97706;
                }

                .kyc-status-badge.not-verified {
                    background: rgba(239, 68, 68, 0.1);
                    color: #DC2626;
                }
            `;
            document.head.appendChild(styles);
        }
    },

    /**
     * Show dashboard banner for KYC verification
     */
    showDashboardBanner() {
        const status = this.getStatus();
        
        // Don't show banner if already verified or dismissed
        if (status === 'verified' || localStorage.getItem('kycBannerDismissed')) {
            return;
        }

        const bannerHTML = `
            <div id="kycBanner" class="kyc-banner">
                <div class="kyc-banner-content">
                    <div class="kyc-banner-icon">✅</div>
                    <div class="kyc-banner-text">
                        <div class="kyc-banner-title">Complete KYC Verification</div>
                        <div class="kyc-banner-description">Verify your identity to unlock donations, purchases, and transfers. Takes only 5 minutes!</div>
                    </div>
                    <div class="kyc-banner-actions">
                        <button class="kyc-banner-btn" onclick="window.location.href='kyc-verify.html?return=dashboard'">
                            Verify Identity
                        </button>
                        <button class="kyc-banner-dismiss" onclick="KYCModal.dismissBanner()" aria-label="Dismiss banner">
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
        if (!document.getElementById('kycBannerStyles')) {
            const styles = document.createElement('style');
            styles.id = 'kycBannerStyles';
            styles.textContent = `
                .kyc-banner {
                    background: linear-gradient(135deg, rgba(16, 185, 129, 0.95) 0%, rgba(59, 130, 246, 0.95) 100%);
                    padding: 1.25rem 2rem;
                    animation: kycBannerSlideDown 0.5s ease-out;
                    position: relative;
                    overflow: hidden;
                }
                
                .kyc-banner::before {
                    content: '';
                    position: absolute;
                    top: -50%;
                    right: -10%;
                    width: 300px;
                    height: 300px;
                    background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
                    pointer-events: none;
                }
                
                @keyframes kycBannerSlideDown {
                    from {
                        opacity: 0;
                        transform: translateY(-100%);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .kyc-banner-content {
                    max-width: 1400px;
                    margin: 0 auto;
                    display: flex;
                    align-items: center;
                    gap: 1.5rem;
                    position: relative;
                    z-index: 1;
                }
                
                .kyc-banner-icon {
                    font-size: 2.5rem;
                    flex-shrink: 0;
                }
                
                .kyc-banner-text {
                    flex: 1;
                }
                
                .kyc-banner-title {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: 1.125rem;
                    font-weight: 700;
                    color: white;
                    margin-bottom: 0.25rem;
                }
                
                .kyc-banner-description {
                    font-size: 0.875rem;
                    color: rgba(255, 255, 255, 0.9);
                    line-height: 1.5;
                }
                
                .kyc-banner-actions {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                }
                
                .kyc-banner-btn {
                    background: white;
                    color: #10B981;
                    padding: 0.75rem 1.5rem;
                    border-radius: 0.5rem;
                    border: none;
                    font-weight: 600;
                    font-size: 0.938rem;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    font-family: 'Inter', sans-serif;
                    white-space: nowrap;
                }
                
                .kyc-banner-btn:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
                }
                
                .kyc-banner-dismiss {
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
                }
                
                .kyc-banner-dismiss:hover {
                    background: rgba(255, 255, 255, 0.3);
                    transform: rotate(90deg);
                }
                
                @media (max-width: 768px) {
                    .kyc-banner {
                        padding: 1rem;
                    }
                    
                    .kyc-banner-content {
                        flex-wrap: wrap;
                        gap: 1rem;
                    }
                    
                    .kyc-banner-icon {
                        font-size: 2rem;
                    }
                    
                    .kyc-banner-title {
                        font-size: 1rem;
                    }
                    
                    .kyc-banner-description {
                        font-size: 0.813rem;
                    }
                    
                    .kyc-banner-actions {
                        width: 100%;
                        justify-content: space-between;
                    }
                    
                    .kyc-banner-btn {
                        flex: 1;
                        font-size: 0.875rem;
                        padding: 0.688rem 1.25rem;
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
    },

    /**
     * Dismiss the dashboard banner
     */
    dismissBanner() {
        localStorage.setItem('kycBannerDismissed', 'true');
        const banner = document.getElementById('kycBanner');
        if (banner) {
            banner.style.animation = 'kycBannerSlideUp 0.3s ease-out';
            setTimeout(() => banner.remove(), 300);
        }
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KYCModal;
}
