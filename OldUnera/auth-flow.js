/**
 * UNERA Authentication Flow Manager
 * Handles signup flow, 2FA, KYC status, and dashboard restrictions
 * 
 * Usage: Include in all auth pages and dashboard
 * <script src="auth-flow.js"></script>
 */

// ========================================
// AUTHENTICATION STATE MANAGEMENT
// ========================================

const AuthFlow = {
    // Get current user state
    getState() {
        return {
            // Email verification
            email: localStorage.getItem('signupEmail') || null,
            emailVerified: localStorage.getItem('emailVerified') === 'true',
            
            // User info
            firstName: localStorage.getItem('userFirstName') || null,
            lastName: localStorage.getItem('userLastName') || null,
            fullName: localStorage.getItem('userName') || null,
            
            // 2FA status
            twoFAEnabled: localStorage.getItem('2faEnabled') === 'true',
            twoFAMethod: localStorage.getItem('2faMethod') || null,
            twoFASkipped: localStorage.getItem('2faSkipped') === 'true',
            
            // KYC status
            kycStatus: localStorage.getItem('kycStatus') || 'not-started', // 'not-started', 'skipped', 'pending', 'completed'
            kycSkippedDate: localStorage.getItem('kycSkippedDate') || null,
            
            // Login state
            isLoggedIn: localStorage.getItem('isLoggedIn') === 'true',
            loginTimestamp: localStorage.getItem('loginTimestamp') || null,
            
            // Session
            sessionToken: localStorage.getItem('sessionToken') || null
        };
    },
    
    // Update state
    setState(key, value) {
        localStorage.setItem(key, value);
    },
    
    // Clear all auth data (logout)
    clearState() {
        const keys = [
            'signupEmail', 'emailVerified', 'userFirstName', 'userLastName', 'userName',
            '2faEnabled', '2faMethod', '2faSkipped', 
            'kycStatus', 'kycSkippedDate',
            'isLoggedIn', 'loginTimestamp', 'sessionToken'
        ];
        keys.forEach(key => localStorage.removeItem(key));
    },
    
    // Check if user can access a feature
    canAccess(feature) {
        const state = this.getState();
        
        switch(feature) {
            case 'add-money':
            case 'send':
            case 'donate':
            case 'withdraw':
                // Requires completed KYC
                return state.kycStatus === 'completed';
                
            case 'wallet':
            case 'explore':
                // Always accessible
                return true;
                
            default:
                return false;
        }
    }
};

// ========================================
// DASHBOARD RESTRICTIONS
// ========================================

const DashboardRestrictions = {
    // Initialize restrictions on dashboard load
    init() {
        const state = AuthFlow.getState();
        const urlParams = new URLSearchParams(window.location.search);
        
        console.log('📊 Dashboard State:', state);
        
        // Show KYC banner if not completed
        if (state.kycStatus !== 'completed') {
            this.showKYCBanner(state.kycStatus);
        } else {
            this.hideKYCBanner();
        }
        
        // Lock features if KYC not completed
        if (state.kycStatus !== 'completed') {
            this.lockFeatures();
        }
        
        // Show welcome message if coming from signup
        if (urlParams.get('welcome') === 'true') {
            this.showWelcomeMessage();
        }
    },
    
    // Show KYC warning banner
    showKYCBanner(status) {
        const banner = document.getElementById('kycAlert');
        if (!banner) return;
        
        banner.style.display = 'flex';
        
        // Update message based on status
        const titleEl = banner.querySelector('.alert-title');
        const descEl = banner.querySelector('.alert-description');
        
        if (status === 'skipped') {
            titleEl.textContent = '⚠️ Complete Verification to Unlock All Features';
            descEl.textContent = 'Add funds, make donations, and send money by verifying your identity (takes 2 minutes)';
        } else if (status === 'pending') {
            titleEl.textContent = '⏳ Verification in Progress';
            descEl.textContent = 'We\'re reviewing your documents. You\'ll be notified within 24 hours.';
            // Hide "Verify Now" button for pending
            const ctaBtn = banner.querySelector('.alert-cta');
            if (ctaBtn) ctaBtn.style.display = 'none';
        } else {
            titleEl.textContent = '🔒 Complete Your Verification';
            descEl.textContent = 'Verify your identity to unlock full features and increase transaction limits';
        }
    },
    
    // Hide KYC banner
    hideKYCBanner() {
        const banner = document.getElementById('kycAlert');
        if (banner) {
            banner.style.display = 'none';
        }
    },
    
    // Lock features
    lockFeatures() {
        const restrictedActions = [
            { selector: 'a[href="add-money.html"]', title: 'Add Money', feature: 'add-money' },
            { selector: 'a[href*="send"]', title: 'Send', feature: 'send' },
            { selector: 'a[href*="donate"]', title: 'Donate', feature: 'donate' }
        ];
        
        restrictedActions.forEach(action => {
            const elements = document.querySelectorAll(action.selector);
            elements.forEach(el => {
                // Add lock badge
                if (!el.querySelector('.lock-badge')) {
                    const lockBadge = document.createElement('div');
                    lockBadge.className = 'lock-badge';
                    lockBadge.innerHTML = '🔒';
                    lockBadge.setAttribute('aria-label', 'Locked - verification required');
                    el.appendChild(lockBadge);
                }
                
                // Add locked class
                el.classList.add('locked');
                
                // Change opacity
                el.style.opacity = '0.6';
                el.style.cursor = 'not-allowed';
                
                // Update description
                const desc = el.querySelector('.action-card-desc');
                if (desc) {
                    desc.textContent = 'Verification required';
                    desc.style.color = 'var(--warning)';
                }
                
                // Prevent navigation
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showVerificationRequiredModal(action.title);
                });
            });
        });
    },
    
    // Show verification required modal
    showVerificationRequiredModal(featureName) {
        const modal = document.createElement('div');
        modal.className = 'kyc-modal-overlay';
        modal.innerHTML = `
            <div class="kyc-modal-content" onclick="event.stopPropagation()">
                <div class="kyc-modal-icon">🔒</div>
                <h2 class="kyc-modal-title">Verification Required</h2>
                <p class="kyc-modal-text">
                    To use <strong>${featureName}</strong>, please complete identity verification.
                </p>
                
                <div class="kyc-modal-benefits">
                    <p style="font-weight: 600; margin-bottom: 0.75rem;">Takes only 2 minutes:</p>
                    <ul style="text-align: left; padding-left: 1.5rem; line-height: 1.8;">
                        <li>Upload government-issued ID</li>
                        <li>Take a quick selfie</li>
                        <li>Get approved in ~24 hours</li>
                    </ul>
                </div>
                
                <div class="kyc-modal-actions">
                    <button class="btn-primary" onclick="window.location.href='kyc-verify.html'" style="flex: 1;">
                        Verify Now
                    </button>
                    <button class="btn-secondary" onclick="DashboardRestrictions.closeModal()" style="flex: 1;">
                        Maybe Later
                    </button>
                </div>
            </div>
        `;
        
        modal.addEventListener('click', () => this.closeModal());
        document.body.appendChild(modal);
        
        // Focus trap
        setTimeout(() => {
            modal.querySelector('.btn-primary').focus();
        }, 100);
    },
    
    // Close modal
    closeModal() {
        const modal = document.querySelector('.kyc-modal-overlay');
        if (modal) {
            modal.remove();
        }
    },
    
    // Show welcome message
    showWelcomeMessage() {
        const toast = document.createElement('div');
        toast.className = 'welcome-toast';
        toast.innerHTML = `
            <div class="toast-icon">🎉</div>
            <div class="toast-content">
                <div class="toast-title">Welcome to UNERA!</div>
                <div class="toast-text">Your account has been created successfully</div>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            toast.classList.add('slideOut');
            setTimeout(() => toast.remove(), 300);
        }, 5000);
    }
};

// ========================================
// SIGNUP FLOW MANAGER
// ========================================

const SignupFlow = {
    // Track current step
    currentStep: 1,
    
    // Steps configuration
    steps: {
        1: { name: 'email', next: 'verify-email.html' },
        2: { name: 'verify', next: 'signup_2.html?step=details&verified=true' },
        3: { name: 'details', next: 'setup-2fa.html' },
        4: { name: '2fa', next: 'kyc-verify.html?from=signup' },
        5: { name: 'kyc', next: 'dashboard-enhanced.html?welcome=true' }
    },
    
    // Initialize signup flow
    init(step) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentStep = urlParams.get('step');
        
        if (currentStep === 'details') {
            // Check if email was verified
            if (localStorage.getItem('emailVerified') !== 'true') {
                window.location.href = 'signup_2.html';
                return;
            }
            this.showDetailsForm();
        } else {
            this.showEmailForm();
        }
    },
    
    // Show email form (step 1)
    showEmailForm() {
        console.log('📧 Step 1: Email Entry');
    },
    
    // Show details form (step 3)
    showDetailsForm() {
        console.log('👤 Step 3: Name & Password Entry');
        
        // Pre-fill email if available
        const email = localStorage.getItem('signupEmail');
        if (email) {
            const emailInput = document.getElementById('signupEmail');
            if (emailInput) {
                emailInput.value = email;
                emailInput.disabled = true;
            }
        }
    },
    
    // Proceed to next step
    nextStep(currentStepName) {
        console.log(`✅ Step ${currentStepName} complete`);
        
        // Get next URL based on current step
        const stepConfig = Object.values(this.steps).find(s => s.name === currentStepName);
        if (stepConfig) {
            window.location.href = stepConfig.next;
        }
    }
};

// ========================================
// LOGIN FLOW MANAGER
// ========================================

const LoginFlow = {
    // Check if 2FA verification is needed
    async checkAnd Verify2FA() {
        const state = AuthFlow.getState();
        
        if (state.twoFAEnabled) {
            // Show 2FA verification screen
            window.location.href = 'verify-2fa.html';
            return false; // Don't proceed to dashboard yet
        }
        
        return true; // Can proceed to dashboard
    },
    
    // Check KYC status and show reminder
    checkKYCStatus() {
        const state = AuthFlow.getState();
        
        if (state.kycStatus !== 'completed') {
            // Show KYC reminder modal after a delay
            setTimeout(() => {
                this.showKYCReminder();
            }, 2000);
        }
    },
    
    // Show KYC reminder modal
    showKYCReminder() {
        const state = AuthFlow.getState();
        
        if (sessionStorage.getItem('kycReminderDismissed') === 'true') {
            return; // Don't show again this session
        }
        
        const modal = document.createElement('div');
        modal.className = 'kyc-modal-overlay';
        modal.innerHTML = `
            <div class="kyc-modal-content" onclick="event.stopPropagation()">
                <div class="kyc-modal-icon">🎯</div>
                <h2 class="kyc-modal-title">Complete Your Profile</h2>
                <p class="kyc-modal-text">
                    Unlock all features by completing identity verification
                </p>
                
                <div class="kyc-modal-benefits" style="background: rgba(16, 185, 129, 0.05); padding: 1.5rem; border-radius: 12px; margin: 1.5rem 0;">
                    <p style="font-weight: 600; margin-bottom: 0.75rem;">What you'll unlock:</p>
                    <ul style="text-align: left; padding-left: 1.5rem; line-height: 1.8;">
                        <li>✓ Add funds to your wallet</li>
                        <li>✓ Make donations to centres</li>
                        <li>✓ Send money to anyone</li>
                        <li>✓ Withdraw to your bank account</li>
                    </ul>
                    <p style="margin-top: 1rem; color: var(--text-secondary);">
                        ⏱️ Takes only 2 minutes
                    </p>
                </div>
                
                <div class="kyc-modal-actions">
                    <button class="btn-primary" onclick="window.location.href='kyc-verify.html'" style="flex: 1;">
                        Verify Now
                    </button>
                    <button class="btn-secondary" onclick="LoginFlow.dismissKYCReminder()" style="flex: 1;">
                        Later
                    </button>
                </div>
            </div>
        `;
        
        modal.addEventListener('click', () => this.dismissKYCReminder());
        document.body.appendChild(modal);
    },
    
    // Dismiss KYC reminder
    dismissKYCReminder() {
        sessionStorage.setItem('kycReminderDismissed', 'true');
        const modal = document.querySelector('.kyc-modal-overlay');
        if (modal) modal.remove();
    }
};

// ========================================
// PROTECTED ROUTES
// ========================================

function checkAuth() {
    const state = AuthFlow.getState();
    const currentPage = window.location.pathname.split('/').pop();
    
    // List of protected pages
    const protectedPages = [
        'dashboard-enhanced.html',
        'wallet-enhanced.html',
        'add-money.html',
        'send-enhanced.html',
        'donate.html',
        'withdraw.html'
    ];
    
    // Check if current page is protected
    if (protectedPages.includes(currentPage)) {
        if (!state.isLoggedIn) {
            // Not logged in - redirect to login
            console.log('🔒 Protected page - redirecting to login');
            window.location.href = `login_2.html?redirect=${encodeURIComponent(currentPage)}`;
            return false;
        }
    }
    
    return true;
}

// ========================================
// DISMISS ALERT FUNCTION
// ========================================

function dismissAlert() {
    const banner = document.getElementById('kycAlert');
    if (banner) {
        banner.style.display = 'none';
        sessionStorage.setItem('kycBannerDismissed', 'true');
    }
}

// ========================================
// AUTO-INITIALIZE ON PAGE LOAD
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    
    console.log('🔐 Auth Flow Manager Loaded');
    console.log('📄 Current Page:', currentPage);
    
    // Initialize based on page type
    if (currentPage === 'dashboard-enhanced.html') {
        // Check auth first
        if (checkAuth()) {
            DashboardRestrictions.init();
        }
    } else if (currentPage === 'login_2.html') {
        // Check if already logged in
        if (AuthFlow.getState().isLoggedIn) {
            window.location.href = 'dashboard-enhanced.html';
        }
    } else if (currentPage === 'signup_2.html') {
        SignupFlow.init();
    }
    
    // Log current state for debugging
    const state = AuthFlow.getState();
    console.log('👤 Auth State:', {
        email: state.email,
        emailVerified: state.emailVerified,
        name: state.fullName,
        twoFA: state.twoFAEnabled ? `Enabled (${state.twoFAMethod})` : 'Disabled',
        kyc: state.kycStatus,
        loggedIn: state.isLoggedIn
    });
});

// ========================================
// DEMO MODE HELPERS
// ========================================

// For testing - simulate user states
window.AuthFlowDemo = {
    // Simulate complete KYC
    completeKYC() {
        localStorage.setItem('kycStatus', 'completed');
        console.log('✅ KYC marked as completed');
        window.location.reload();
    },
    
    // Simulate skipped KYC
    skipKYC() {
        localStorage.setItem('kycStatus', 'skipped');
        console.log('⏭️ KYC marked as skipped');
        window.location.reload();
    },
    
    // Simulate pending KYC
    pendingKYC() {
        localStorage.setItem('kycStatus', 'pending');
        console.log('⏳ KYC marked as pending');
        window.location.reload();
    },
    
    // Enable 2FA
    enable2FA() {
        localStorage.setItem('2faEnabled', 'true');
        localStorage.setItem('2faMethod', 'sms');
        console.log('✅ 2FA enabled');
    },
    
    // Login user
    login() {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('loginTimestamp', new Date().toISOString());
        localStorage.setItem('userFirstName', 'John');
        localStorage.setItem('userLastName', 'Doe');
        localStorage.setItem('userName', 'John Doe');
        localStorage.setItem('signupEmail', 'john@example.com');
        console.log('✅ User logged in');
        window.location.reload();
    },
    
    // Logout user
    logout() {
        AuthFlow.clearState();
        console.log('🚪 User logged out');
        window.location.href = 'login_2.html';
    },
    
    // Reset everything
    reset() {
        AuthFlow.clearState();
        sessionStorage.clear();
        console.log('🔄 All state cleared');
        window.location.reload();
    },
    
    // Show current state
    showState() {
        console.table(AuthFlow.getState());
    }
};

console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #10B981;');
console.log('%c🔐 UNERA Auth Flow Manager Ready', 'font-weight: bold; font-size: 14px; color: #10B981;');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #10B981;');
console.log('');
console.log('%cTesting Commands (open console):', 'font-weight: bold; color: #0EA5E9;');
console.log('  AuthFlowDemo.showState()    - View current auth state');
console.log('  AuthFlowDemo.login()        - Simulate login');
console.log('  AuthFlowDemo.completeKYC()  - Mark KYC as complete');
console.log('  AuthFlowDemo.skipKYC()      - Mark KYC as skipped (restricted)');
console.log('  AuthFlowDemo.pendingKYC()   - Mark KYC as pending');
console.log('  AuthFlowDemo.enable2FA()    - Enable 2FA');
console.log('  AuthFlowDemo.logout()       - Logout user');
console.log('  AuthFlowDemo.reset()        - Clear all data');
console.log('');
console.log('%c━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━', 'color: #10B981;');
