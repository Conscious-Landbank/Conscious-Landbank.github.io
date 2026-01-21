/**
 * UNERA Authentication Enhancements
 * Complete JavaScript for Phase 1 & 2 UX Improvements
 * 
 * Features:
 * - Loading states for wallet connections
 * - Rate limiting with lockout
 * - Magic link login
 * - Biometric authentication prompts
 * - Mobile optimizations
 * - Enhanced error handling
 * 
 * Usage: Include this script in login_2.html and signup_2.html
 * <script src="auth-enhancements.js"></script>
 */

// ========================================
// CONFIGURATION
// ========================================

const AUTH_CONFIG = {
    MAX_LOGIN_ATTEMPTS: 5,
    LOCKOUT_DURATION: 15 * 60 * 1000, // 15 minutes
    MAGIC_LINK_EXPIRY: 15 * 60 * 1000, // 15 minutes
    RATE_LIMIT_COOLDOWN: 30 * 1000, // 30 seconds
};

// ========================================
// STATE MANAGEMENT
// ========================================

const authState = {
    loginAttempts: parseInt(localStorage.getItem('loginAttempts') || '0'),
    lockoutTime: parseInt(localStorage.getItem('lockoutTime') || '0'),
    lastAttemptTime: parseInt(localStorage.getItem('lastAttemptTime') || '0'),
};

// ========================================
// LOADING STATES
// ========================================

/**
 * Show loading state on button
 * @param {HTMLElement} button - The button element
 * @param {string} loadingText - Text to show while loading
 */
function showButtonLoading(button, loadingText = 'Loading...') {
    if (!button) return;
    
    button.dataset.originalText = button.innerHTML;
    button.disabled = true;
    button.classList.add('btn-loading');
    
    button.innerHTML = `
        <span class="spinner" style="
            display: inline-block;
            width: 18px;
            height: 18px;
            border: 2px solid rgba(255,255,255,0.3);
            border-top-color: white;
            border-radius: 50%;
            animation: spin 0.6s linear infinite;
            margin-right: 0.5rem;
        "></span>
        ${loadingText}
    `;
}

/**
 * Hide loading state and restore button
 * @param {HTMLElement} button - The button element
 */
function hideButtonLoading(button) {
    if (!button || !button.dataset.originalText) return;
    
    button.disabled = false;
    button.classList.remove('btn-loading');
    button.innerHTML = button.dataset.originalText;
    delete button.dataset.originalText;
}

/**
 * Enhanced wallet connection with loading states
 * @param {HTMLElement} button - The wallet button clicked
 * @param {string} walletType - Type of wallet (metamask, walletconnect, coinbase)
 */
async function connectWalletWithLoading(button, walletType) {
    const walletNames = {
        metamask: 'MetaMask',
        walletconnect: 'WalletConnect',
        coinbase: 'Coinbase Wallet'
    };
    
    showButtonLoading(button, `Connecting to ${walletNames[walletType]}...`);
    
    try {
        // Simulate wallet connection (replace with actual Web3 logic)
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check if wallet exists
        if (walletType === 'metamask' && !window.ethereum) {
            throw new Error('MetaMask not installed. Please install MetaMask extension.');
        }
        
        // Simulate successful connection
        console.log(`✅ ${walletNames[walletType]} connected successfully`);
        
        // Store auth
        localStorage.setItem('authMethod', 'wallet');
        localStorage.setItem('walletType', walletType);
        
        // Redirect to dashboard
        window.location.href = 'dashboard-enhanced.html';
        
    } catch (error) {
        hideButtonLoading(button);
        showToast(error.message || `Failed to connect ${walletNames[walletType]}. Please try again.`, 'error');
    }
}

// ========================================
// RATE LIMITING
// ========================================

/**
 * Check if user is locked out
 * @returns {boolean} True if locked out
 */
function isLockedOut() {
    const now = Date.now();
    
    if (authState.lockoutTime && now < authState.lockoutTime) {
        return true;
    }
    
    // Clear expired lockout
    if (authState.lockoutTime && now >= authState.lockoutTime) {
        authState.loginAttempts = 0;
        authState.lockoutTime = 0;
        localStorage.setItem('loginAttempts', '0');
        localStorage.setItem('lockoutTime', '0');
        hideLockoutBanner();
    }
    
    return false;
}

/**
 * Record failed login attempt
 */
function recordFailedAttempt() {
    authState.loginAttempts++;
    authState.lastAttemptTime = Date.now();
    
    localStorage.setItem('loginAttempts', authState.loginAttempts.toString());
    localStorage.setItem('lastAttemptTime', authState.lastAttemptTime.toString());
    
    if (authState.loginAttempts >= AUTH_CONFIG.MAX_LOGIN_ATTEMPTS) {
        authState.lockoutTime = Date.now() + AUTH_CONFIG.LOCKOUT_DURATION;
        localStorage.setItem('lockoutTime', authState.lockoutTime.toString());
        showLockoutBanner();
    }
}

/**
 * Reset login attempts on successful login
 */
function resetLoginAttempts() {
    authState.loginAttempts = 0;
    authState.lockoutTime = 0;
    localStorage.setItem('loginAttempts', '0');
    localStorage.setItem('lockoutTime', '0');
    hideLockoutBanner();
}

/**
 * Show lockout banner
 */
function showLockoutBanner() {
    let banner = document.getElementById('lockoutBanner');
    
    if (!banner) {
        // Create banner if it doesn't exist
        banner = document.createElement('div');
        banner.id = 'lockoutBanner';
        banner.className = 'lockout-banner';
        banner.innerHTML = `
            <div style="font-size: 2rem; flex-shrink: 0;">🔒</div>
            <div>
                <div style="font-weight: 600; color: #EF4444; margin-bottom: 0.25rem;">
                    Account Temporarily Locked
                </div>
                <div style="font-size: 0.875rem; color: #1F2937;">
                    Too many failed login attempts. Please try again in 
                    <strong id="lockoutTimer">15:00</strong>
                </div>
            </div>
        `;
        
        // Insert before form
        const form = document.querySelector('.email-panel form') || document.querySelector('form');
        if (form) {
            form.parentNode.insertBefore(banner, form);
        }
    }
    
    banner.style.display = 'flex';
    updateLockoutTimer();
}

/**
 * Hide lockout banner
 */
function hideLockoutBanner() {
    const banner = document.getElementById('lockoutBanner');
    if (banner) {
        banner.style.display = 'none';
    }
}

/**
 * Update lockout timer display
 */
function updateLockoutTimer() {
    const timerElement = document.getElementById('lockoutTimer');
    if (!timerElement) return;
    
    const updateInterval = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.max(0, authState.lockoutTime - now);
        
        if (timeLeft <= 0) {
            clearInterval(updateInterval);
            hideLockoutBanner();
            return;
        }
        
        const minutes = Math.floor(timeLeft / 1000 / 60);
        const seconds = Math.floor((timeLeft / 1000) % 60);
        timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }, 1000);
}

/**
 * Enhanced login validation with rate limiting
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<boolean>} True if login successful
 */
async function validateLoginWithRateLimit(email, password) {
    // Check lockout
    if (isLockedOut()) {
        const timeLeft = Math.ceil((authState.lockoutTime - Date.now()) / 1000 / 60);
        showToast(`Too many attempts. Please try again in ${timeLeft} minutes.`, 'error');
        return false;
    }
    
    // Simulate authentication (replace with actual API call)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate random success/failure for demo
    const success = Math.random() > 0.7; // 30% success rate for demo
    
    if (success) {
        resetLoginAttempts();
        return true;
    } else {
        recordFailedAttempt();
        const remaining = AUTH_CONFIG.MAX_LOGIN_ATTEMPTS - authState.loginAttempts;
        
        if (remaining > 0) {
            showToast(`Invalid credentials. ${remaining} attempt${remaining !== 1 ? 's' : ''} remaining.`, 'error');
        }
        
        return false;
    }
}

// ========================================
// MAGIC LINK
// ========================================

/**
 * Send magic link to email
 * @param {string} email - User email
 */
async function sendMagicLink(email) {
    if (!email || !validateEmail(email)) {
        showToast('Please enter a valid email address', 'error');
        return false;
    }
    
    const button = event.target;
    showButtonLoading(button, 'Sending magic link...');
    
    try {
        // Generate token
        const token = generateSecureToken();
        const expiry = Date.now() + AUTH_CONFIG.MAGIC_LINK_EXPIRY;
        
        // Store magic link data
        const magicLinkData = {
            email,
            token,
            expiry,
            created: Date.now()
        };
        
        localStorage.setItem('magicLink_' + token, JSON.stringify(magicLinkData));
        
        // Simulate sending email
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        console.log(`📧 Magic link sent to: ${email}`);
        console.log(`🔗 Link: ${window.location.origin}/auth/magic/${token}`);
        
        // Redirect to confirmation page
        window.location.href = `magic-link-sent.html?email=${encodeURIComponent(email)}`;
        
        return true;
    } catch (error) {
        hideButtonLoading(button);
        showToast('Failed to send magic link. Please try again.', 'error');
        return false;
    }
}

/**
 * Verify magic link token
 * @param {string} token - Magic link token
 * @returns {boolean} True if valid
 */
function verifyMagicLink(token) {
    const data = localStorage.getItem('magicLink_' + token);
    if (!data) return false;
    
    const magicLinkData = JSON.parse(data);
    const now = Date.now();
    
    if (now > magicLinkData.expiry) {
        localStorage.removeItem('magicLink_' + token);
        return false;
    }
    
    // Valid - clean up and authenticate
    localStorage.removeItem('magicLink_' + token);
    localStorage.setItem('authMethod', 'magic-link');
    localStorage.setItem('userEmail', magicLinkData.email);
    
    return true;
}

// ========================================
// BIOMETRIC AUTHENTICATION
// ========================================

/**
 * Check if biometric authentication is supported
 * @returns {Promise<boolean>} True if supported
 */
async function checkBiometricSupport() {
    if (!window.PublicKeyCredential) {
        return false;
    }
    
    try {
        const available = await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
        return available;
    } catch {
        return false;
    }
}

/**
 * Show biometric setup prompt
 */
async function showBiometricPrompt() {
    const supported = await checkBiometricSupport();
    if (!supported) return;
    
    const dontShowAgain = localStorage.getItem('biometricPromptDismissed');
    if (dontShowAgain) return;
    
    // Create modal if doesn't exist
    let modal = document.getElementById('biometricModal');
    if (!modal) {
        modal = createBiometricModal();
        document.body.appendChild(modal);
    }
    
    modal.style.display = 'flex';
}

/**
 * Create biometric modal HTML
 * @returns {HTMLElement} Modal element
 */
function createBiometricModal() {
    const modal = document.createElement('div');
    modal.id = 'biometricModal';
    modal.className = 'modal';
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0,0,0,0.5);
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        backdrop-filter: blur(4px);
    `;
    
    modal.innerHTML = `
        <div class="modal-content" style="
            background: white;
            border-radius: 1.5rem;
            padding: 2rem;
            max-width: 420px;
            margin: 1rem;
            text-align: center;
        ">
            <div style="font-size: 4rem; margin-bottom: 1rem;">
                👆
            </div>
            <h3 style="font-size: 1.5rem; font-weight: 700; margin-bottom: 0.75rem; color: #1F2937;">
                Enable Quick Login?
            </h3>
            <p style="color: #6B7280; margin-bottom: 2rem; line-height: 1.6;">
                Use Face ID or fingerprint to sign in faster and more securely next time.
            </p>
            
            <button onclick="enableBiometric()" class="submit-btn" style="
                width: 100%;
                padding: 1rem;
                background: linear-gradient(135deg, #10B981 0%, #0EA5E9 100%);
                border: none;
                border-radius: 0.75rem;
                color: white;
                font-weight: 600;
                cursor: pointer;
                margin-bottom: 0.75rem;
            ">
                Enable Face ID/Touch ID
            </button>
            
            <button onclick="closeBiometricModal()" class="btn-secondary" style="
                width: 100%;
                padding: 0.875rem;
                background: white;
                border: 1.5px solid rgba(0,0,0,0.1);
                border-radius: 0.75rem;
                color: #1F2937;
                font-weight: 500;
                cursor: pointer;
            ">
                Maybe Later
            </button>
            
            <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid rgba(0,0,0,0.1);">
                <label style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.875rem; color: #6B7280; cursor: pointer;">
                    <input type="checkbox" id="dontAskAgain" style="cursor: pointer;">
                    Don't ask again
                </label>
            </div>
        </div>
    `;
    
    return modal;
}

/**
 * Enable biometric authentication
 */
async function enableBiometric() {
    try {
        const userEmail = localStorage.getItem('userEmail') || 'user@unera.com';
        const userName = localStorage.getItem('userName') || 'UNERA User';
        
        // Create credential
        const credential = await navigator.credentials.create({
            publicKey: {
                challenge: crypto.getRandomValues(new Uint8Array(32)),
                rp: {
                    name: "UNERA",
                    id: window.location.hostname
                },
                user: {
                    id: crypto.getRandomValues(new Uint8Array(16)),
                    name: userEmail,
                    displayName: userName
                },
                pubKeyCredParams: [
                    {type: "public-key", alg: -7}, // ES256
                    {type: "public-key", alg: -257} // RS256
                ],
                authenticatorSelection: {
                    authenticatorAttachment: "platform",
                    userVerification: "required"
                },
                timeout: 60000
            }
        });
        
        // Store credential ID
        localStorage.setItem('biometricEnabled', 'true');
        localStorage.setItem('biometricCredentialId', JSON.stringify(Array.from(new Uint8Array(credential.rawId))));
        
        closeBiometricModal();
        showToast('✓ Biometric login enabled successfully!', 'success');
        
        // Trigger haptic feedback
        triggerHaptic('success');
        
    } catch (error) {
        console.error('Biometric setup failed:', error);
        showToast('Failed to enable biometric login. Please try again.', 'error');
    }
}

/**
 * Close biometric modal
 */
function closeBiometricModal() {
    const modal = document.getElementById('biometricModal');
    const dontAskAgain = document.getElementById('dontAskAgain');
    
    if (dontAskAgain && dontAskAgain.checked) {
        localStorage.setItem('biometricPromptDismissed', 'true');
    }
    
    if (modal) {
        modal.style.display = 'none';
    }
}

/**
 * Login with biometric
 */
async function loginWithBiometric() {
    try {
        const credentialId = JSON.parse(localStorage.getItem('biometricCredentialId'));
        if (!credentialId) {
            showToast('Biometric not set up. Please login with password first.', 'error');
            return false;
        }
        
        const credential = await navigator.credentials.get({
            publicKey: {
                challenge: crypto.getRandomValues(new Uint8Array(32)),
                allowCredentials: [{
                    id: new Uint8Array(credentialId),
                    type: 'public-key'
                }],
                timeout: 60000,
                userVerification: "required"
            }
        });
        
        // Credential verified - authenticate user
        console.log('✅ Biometric authentication successful');
        localStorage.setItem('authMethod', 'biometric');
        
        // Redirect to dashboard
        window.location.href = 'dashboard-enhanced.html';
        
        return true;
    } catch (error) {
        console.error('Biometric login failed:', error);
        showToast('Biometric authentication failed. Please use password.', 'error');
        return false;
    }
}

// ========================================
// MOBILE OPTIMIZATIONS
// ========================================

/**
 * Trigger haptic feedback (mobile only)
 * @param {string} type - Type of feedback (success, error, warning)
 */
function triggerHaptic(type = 'light') {
    if (!window.navigator.vibrate) return;
    
    const patterns = {
        light: [10],
        success: [10, 50, 10],
        error: [10, 50, 10, 50, 10],
        warning: [50, 30, 50]
    };
    
    window.navigator.vibrate(patterns[type] || patterns.light);
}

/**
 * Detect if mobile device
 * @returns {boolean} True if mobile
 */
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Make CTA sticky on mobile
 */
function makeCtaSticky() {
    if (!isMobile()) return;
    
    const submitBtn = document.querySelector('.submit-btn');
    if (!submitBtn) return;
    
    const originalParent = submitBtn.parentElement;
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY > 100;
        
        if (scrolled && !submitBtn.classList.contains('sticky-cta')) {
            submitBtn.classList.add('sticky-cta');
            submitBtn.style.cssText = `
                position: fixed;
                bottom: 0;
                left: 0;
                right: 0;
                margin: 0;
                border-radius: 0;
                z-index: 100;
                box-shadow: 0 -4px 16px rgba(0,0,0,0.15);
            `;
        } else if (!scrolled && submitBtn.classList.contains('sticky-cta')) {
            submitBtn.classList.remove('sticky-cta');
            submitBtn.style.cssText = '';
        }
    });
}

// ========================================
// UTILITY FUNCTIONS
// ========================================

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

/**
 * Validate phone format
 * @param {string} phone - Phone to validate
 * @returns {boolean} True if valid
 */
function validatePhone(phone) {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phone.replace(/[\s\-\(\)]/g, ''));
}

/**
 * Generate secure token
 * @returns {string} Random token
 */
function generateSecureToken() {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

/**
 * Show toast notification
 * @param {string} message - Message to show
 * @param {string} type - Type (success, error, warning, info)
 */
function showToast(message, type = 'info') {
    // Remove existing toast
    const existingToast = document.querySelector('.toast-notification');
    if (existingToast) {
        existingToast.remove();
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    const colors = {
        success: '#10B981',
        error: '#EF4444',
        warning: '#F59E0B',
        info: '#0EA5E9'
    };
    
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    
    toast.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: white;
        color: ${colors[type]};
        padding: 1rem 1.5rem;
        border-radius: 0.75rem;
        box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        border-left: 4px solid ${colors[type]};
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        animation: slideIn 0.3s ease-out;
    `;
    
    toast.innerHTML = `
        <div style="font-size: 1.25rem;">${icons[type]}</div>
        <div style="color: #1F2937;">${message}</div>
    `;
    
    document.body.appendChild(toast);
    
    // Trigger haptic
    triggerHaptic(type === 'success' ? 'success' : type === 'error' ? 'error' : 'light');
    
    // Auto remove after 4 seconds
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
    
    .lockout-banner {
        display: flex;
        align-items: center;
        gap: 1rem;
        padding: 1.25rem;
        background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(245, 158, 11, 0.1) 100%);
        border: 1.5px solid rgba(239, 68, 68, 0.3);
        border-radius: 0.75rem;
        margin-bottom: 1.5rem;
    }
`;
document.head.appendChild(style);

// ========================================
// INITIALIZATION
// ========================================

// Check lockout status on page load
document.addEventListener('DOMContentLoaded', () => {
    if (isLockedOut()) {
        showLockoutBanner();
    }
    
    // Make CTA sticky on mobile
    if (isMobile()) {
        makeCtaSticky();
    }
    
    // Check for biometric on page load (for returning users)
    const biometricEnabled = localStorage.getItem('biometricEnabled');
    if (biometricEnabled && isMobile()) {
        // Show biometric login option
        console.log('Biometric login available');
    }
});

// Export functions for global use
window.connectWalletWithLoading = connectWalletWithLoading;
window.validateLoginWithRateLimit = validateLoginWithRateLimit;
window.sendMagicLink = sendMagicLink;
window.verifyMagicLink = verifyMagicLink;
window.showBiometricPrompt = showBiometricPrompt;
window.enableBiometric = enableBiometric;
window.closeBiometricModal = closeBiometricModal;
window.loginWithBiometric = loginWithBiometric;
window.showToast = showToast;
window.triggerHaptic = triggerHaptic;

console.log('✅ UNERA Auth Enhancements loaded');
