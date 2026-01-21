# 🔐 AUTHENTICATION FLOW - COMPREHENSIVE IMPROVEMENT PLAN

**Based on Boss Feedback + Coinbase Research**  
**Date:** January 21, 2026  
**Status:** 🎯 READY FOR IMPLEMENTATION

---

## 📋 **EXECUTIVE SUMMARY**

### **Boss's Requirements:**
✅ **Email-first registration** (following Coinbase model)  
✅ **Updated flow:** Email → Email Verification → Name → 2FA (optional/skip) → KYC (optional/skip)  
✅ **KYC skip:** Users can access dashboard with limited functions + warning  
✅ **Follow Coinbase closely** for best practices

---

## 🏦 **COINBASE REGISTRATION ANALYSIS**

### **Coinbase's Actual Flow (2026):**

```
1. ENTER EMAIL
   ↓
2. VERIFY EMAIL (Code sent to email)
   ↓
3. CREATE PASSWORD
   ↓
4. ENTER LEGAL NAME (First Name + Last Name - must match ID)
   ↓
5. ADD PHONE NUMBER + SMS VERIFICATION
   ↓
6. SET UP 2FA (MANDATORY - not optional)
   ├─ SMS codes
   ├─ Authenticator app (Google/Microsoft/Duo)
   ├─ Security keys (YubiKey)
   └─ Passkeys/Push notifications
   ↓
7. ENTER PERSONAL INFO (DOB, address, citizenship, SSN)
   ↓
8. UPLOAD GOVERNMENT ID (Driver's license, passport, etc.)
   ↓
9. SELFIE VERIFICATION (Face match to ID)
   ↓
10. WAIT FOR APPROVAL (~24 hours)
    ↓
11. DASHBOARD ACCESS (Full features unlocked after approval)
```

### **Key Coinbase Features:**

#### **1. Email Verification:**
- Sends code from `no-reply@coinbase.com`
- 6-digit verification code
- Resend option if not received
- Must verify before proceeding

#### **2. Legal Name Collection:**
- **First Name** and **Last Name** fields
- Must match government-issued ID exactly
- If only one name: First Name + dash (-) in Last Name
- No shortcuts or nicknames allowed

#### **3. 2FA (Two-Factor Authentication):**
- **MANDATORY** (cannot skip during signup)
- Multiple methods supported:
  - SMS text messages
  - Authenticator apps (TOTP)
  - Hardware security keys
  - Passkeys/push notifications
- Recommends enabling multiple backup methods
- Trusted contacts for recovery

#### **4. KYC/Identity Verification:**
- Government-issued ID required (driver's license, passport, state ID)
- Proof of address (utility bill, bank statement - last 3 months)
- Selfie with good lighting, no hats/glasses
- **Until KYC complete:**
  - Trading disabled
  - Withdrawals disabled
  - Deposits limited
  - Account "restricted" status
- Approval time: ~24 hours (can take longer)

#### **5. Restricted Dashboard Experience:**
- Clear messaging: "Identity verification required"
- Shows what's locked: "Complete verification to trade"
- Prominent CTA: "Verify Identity"
- Can explore interface but cannot transact

---

## 🎯 **UNERA'S UPDATED AUTHENTICATION FLOW**

### **Boss's Specified Flow:**

```
1. ENTER EMAIL
   ↓
2. VERIFY EMAIL VIA CODE (6-digit code sent to email)
   ↓
3. ENTER NAME (First Name + Last Name)
   ↓
4. CREATE PASSWORD
   ↓
5. 2FA SETUP (OPTIONAL - Can Skip)
   ├─ SMS/Email code
   ├─ Authenticator app
   └─ Can skip → "Set up later in settings"
   ↓
6. KYC VERIFICATION (OPTIONAL - Can Skip)
   ├─ Identity documents
   ├─ Selfie verification
   └─ Can skip → Go to dashboard with warnings
   ↓
7. DASHBOARD ACCESS
   ├─ If KYC skipped: Limited features + warning banner
   └─ If KYC complete: Full access
```

### **Key Differences from Coinbase:**

| Feature | Coinbase | UNERA (Boss Request) |
|---------|----------|---------------------|
| **Email verification** | ✅ Required | ✅ Required |
| **Name collection** | ✅ Required (legal name) | ✅ Required |
| **Password** | ✅ Required | ✅ Required |
| **2FA** | 🔴 MANDATORY | 🟡 Optional (can skip) |
| **Phone verification** | ✅ Required (SMS) | ❓ TBD - recommend optional |
| **KYC** | 🔴 Blocks features until done | 🟡 Optional (limited dashboard) |
| **Dashboard access** | After KYC approval | Immediate (with restrictions) |

---

## 🚀 **DETAILED IMPLEMENTATION PLAN**

---

## **STEP 1: SIGNUP PAGE REDESIGN**

### **File:** `signup_2.html`

### **Current State:**
```
❌ Name + Email + Password all on one screen
❌ No email verification step
❌ No 2FA setup
❌ Redirects directly to KYC
```

### **New Flow (Multi-Step):**

```html
SCREEN 1: EMAIL ENTRY
┌────────────────────────────────────┐
│  Join UNERA                        │
│  Start your impact journey         │
│                                    │
│  📧 Email Address                  │
│  ┌──────────────────────────────┐ │
│  │ your@email.com               │ │
│  └──────────────────────────────┘ │
│                                    │
│  [Continue with Email]             │
│                                    │
│  Or sign up with:                  │
│  [Google] [Apple] [Microsoft]      │
│                                    │
│  Already have an account? Log in   │
└────────────────────────────────────┘

SCREEN 2: EMAIL VERIFICATION
┌────────────────────────────────────┐
│  Verify your email                 │
│  We sent a code to:                │
│  your@email.com (Change)           │
│                                    │
│  Enter 6-digit code:               │
│  ┌──┬──┬──┬──┬──┬──┐              │
│  │  │  │  │  │  │  │              │
│  └──┴──┴──┴──┴──┴──┘              │
│                                    │
│  Didn't receive it?                │
│  [Resend Code] (Available in 30s)  │
│                                    │
│  [Verify & Continue]               │
└────────────────────────────────────┘

SCREEN 3: NAME & PASSWORD
┌────────────────────────────────────┐
│  Create your account               │
│  ✓ Email verified                  │
│                                    │
│  First Name *                      │
│  ┌──────────────────────────────┐ │
│  │ John                         │ │
│  └──────────────────────────────┘ │
│                                    │
│  Last Name *                       │
│  ┌──────────────────────────────┐ │
│  │ Doe                          │ │
│  └──────────────────────────────┘ │
│                                    │
│  Password *                        │
│  ┌──────────────────────────────┐ │
│  │ ••••••••••  [👁]             │ │
│  └──────────────────────────────┘ │
│  Password strength: Strong ✓       │
│                                    │
│  ☑ I agree to Terms & Privacy     │
│                                    │
│  [Create Account]                  │
└────────────────────────────────────┘

SCREEN 4: 2FA SETUP (OPTIONAL)
┌────────────────────────────────────┐
│  🔒 Secure your account            │
│  Enable two-factor authentication  │
│                                    │
│  Recommended for:                  │
│  ✓ Extra account security          │
│  ✓ Protect your funds              │
│  ✓ Prevent unauthorized access     │
│                                    │
│  Choose a method:                  │
│  ┌────────────────────────────┐   │
│  │ 📱 SMS Text Message        │   │
│  │ Get codes via text         │   │
│  └────────────────────────────┘   │
│  ┌────────────────────────────┐   │
│  │ 📧 Email Codes             │   │
│  │ Get codes via email        │   │
│  └────────────────────────────┘   │
│  ┌────────────────────────────┐   │
│  │ 🔐 Authenticator App       │   │
│  │ Google/Microsoft Auth      │   │
│  └────────────────────────────┘   │
│                                    │
│  [Enable 2FA]                      │
│  [Skip for Now] ← Allow skip       │
│                                    │
│  💡 You can set this up later      │
│     in your account settings       │
└────────────────────────────────────┘

SCREEN 5: KYC SETUP (OPTIONAL)
┌────────────────────────────────────┐
│  🎯 Verify your identity           │
│  Unlock all features               │
│                                    │
│  Why verify?                       │
│  ✓ Full wallet access              │
│  ✓ Higher transaction limits       │
│  ✓ Withdraw to bank               │
│  ✓ Complete donation history       │
│                                    │
│  What you'll need:                 │
│  📱 Government-issued ID            │
│  📸 Selfie for verification         │
│  ⏱️ Takes ~2 minutes               │
│                                    │
│  [Start Verification]              │
│  [Skip - Do This Later]            │
│                                    │
│  ⚠️ Some features will be limited  │
│     until verification is complete │
└────────────────────────────────────┘

SCREEN 6A: DASHBOARD (KYC SKIPPED)
┌────────────────────────────────────┐
│  ⚠️ Complete verification to       │
│     unlock all features            │
│  [Verify Identity Now] [Later]     │
│────────────────────────────────────│
│  Welcome, John! 🎉                 │
│                                    │
│  Your Impact Dashboard             │
│  ┌──────────────────────────────┐ │
│  │ Total Balance: $0.00 🔒      │ │
│  │ (Verification required)       │ │
│  └──────────────────────────────┘ │
│                                    │
│  🔒 Add Funds - Locked             │
│  🔒 Send Money - Locked            │
│  🔒 Donate - Locked                │
│  ✓ Explore Centres - Available    │
└────────────────────────────────────┘

SCREEN 6B: DASHBOARD (KYC COMPLETE)
┌────────────────────────────────────┐
│  Welcome, John! 🎉                 │
│  ✓ Account verified                │
│                                    │
│  Your Impact Dashboard             │
│  ┌──────────────────────────────┐ │
│  │ Total Balance: $0.00         │ │
│  └──────────────────────────────┘ │
│                                    │
│  ✓ Add Funds - Available          │
│  ✓ Send Money - Available         │
│  ✓ Donate - Available             │
│  ✓ Explore Centres - Available    │
└────────────────────────────────────┘
```

---

## **STEP 2: LOGIN PAGE UPDATES**

### **File:** `login_2.html`

### **Current State:**
```
✅ Email + Password login
❌ No 2FA verification after password
❌ No "Trust this device" option
❌ No recent login notifications
```

### **New Enhanced Flow:**

```html
SCREEN 1: LOGIN
┌────────────────────────────────────┐
│  Welcome Back                      │
│  Continue your impact journey      │
│                                    │
│  📧 Email Address                  │
│  ┌──────────────────────────────┐ │
│  │ your@email.com               │ │
│  └──────────────────────────────┘ │
│                                    │
│  🔒 Password                       │
│  ┌──────────────────────────────┐ │
│  │ ••••••••••  [👁]             │ │
│  └──────────────────────────────┘ │
│                                    │
│  ☐ Remember me                     │
│  Forgot password?                  │
│                                    │
│  [Sign In]                         │
│                                    │
│  Or continue with:                 │
│  [Google] [Apple] [MetaMask]       │
│                                    │
│  Don't have an account? Sign up    │
└────────────────────────────────────┘

SCREEN 2: 2FA VERIFICATION (If enabled)
┌────────────────────────────────────┐
│  🔒 Two-Factor Authentication      │
│  Enter the code from your          │
│  authenticator app or SMS          │
│                                    │
│  Enter 6-digit code:               │
│  ┌──┬──┬──┬──┬──┬──┐              │
│  │  │  │  │  │  │  │              │
│  └──┴──┴──┴──┴──┴──┘              │
│                                    │
│  ☐ Trust this device for 30 days   │
│                                    │
│  [Verify & Continue]               │
│                                    │
│  Having trouble?                   │
│  [Use backup code] [Contact support]│
└────────────────────────────────────┘

SCREEN 3: KYC REMINDER (If not verified)
┌────────────────────────────────────┐
│  ⚠️ Action Required                │
│  Your account has limited access   │
│                                    │
│  Complete identity verification to: │
│  ✓ Add funds to wallet             │
│  ✓ Make donations                  │
│  ✓ Send money                      │
│  ✓ View complete history           │
│                                    │
│  [Verify Identity Now]             │
│  [Remind Me Later]                 │
│                                    │
│  This will only take 2 minutes     │
└────────────────────────────────────┘
```

---

## **STEP 3: EMAIL VERIFICATION SYSTEM**

### **New Files Needed:**

#### **A. `verify-email.html`** (Sent after signup)
```html
<!DOCTYPE html>
<html>
<head>
    <title>Verify Your Email - UNERA</title>
</head>
<body>
    <div class="email-verification">
        <div class="success-icon">✓</div>
        <h1>Check Your Email</h1>
        <p>We sent a 6-digit verification code to:</p>
        <p class="email-highlight">your@email.com</p>
        
        <div class="code-input-group">
            <input type="text" maxlength="1" class="code-digit" id="digit1">
            <input type="text" maxlength="1" class="code-digit" id="digit2">
            <input type="text" maxlength="1" class="code-digit" id="digit3">
            <input type="text" maxlength="1" class="code-digit" id="digit4">
            <input type="text" maxlength="1" class="code-digit" id="digit5">
            <input type="text" maxlength="1" class="code-digit" id="digit6">
        </div>
        
        <button class="btn-primary" onclick="verifyCode()">
            Verify & Continue
        </button>
        
        <div class="resend-section">
            <p>Didn't receive the code?</p>
            <button class="btn-secondary" id="resendBtn" onclick="resendCode()">
                Resend Code
            </button>
            <p class="timer" id="resendTimer">Resend available in 30s</p>
        </div>
        
        <div class="help-links">
            <a href="#" onclick="changeEmail()">Change email address</a>
            <a href="#">Need help?</a>
        </div>
    </div>
    
    <script>
        // Auto-focus and auto-advance between digits
        const digits = document.querySelectorAll('.code-digit');
        
        digits.forEach((digit, index) => {
            digit.addEventListener('input', (e) => {
                if (e.target.value && index < 5) {
                    digits[index + 1].focus();
                }
                
                // Auto-submit when all 6 digits entered
                if (index === 5 && e.target.value) {
                    verifyCode();
                }
            });
            
            digit.addEventListener('keydown', (e) => {
                if (e.key === 'Backspace' && !e.target.value && index > 0) {
                    digits[index - 1].focus();
                }
            });
        });
        
        // Resend timer
        let countdown = 30;
        const resendBtn = document.getElementById('resendBtn');
        const resendTimer = document.getElementById('resendTimer');
        
        const timer = setInterval(() => {
            countdown--;
            resendTimer.textContent = `Resend available in ${countdown}s`;
            
            if (countdown === 0) {
                clearInterval(timer);
                resendBtn.disabled = false;
                resendTimer.style.display = 'none';
            }
        }, 1000);
        
        function verifyCode() {
            const code = Array.from(digits).map(d => d.value).join('');
            
            if (code.length !== 6) {
                alert('Please enter all 6 digits');
                return;
            }
            
            // Simulate API call
            console.log('Verifying code:', code);
            
            // Show loading
            document.querySelector('.btn-primary').classList.add('loading');
            
            setTimeout(() => {
                // Success! Go to next step (name & password)
                window.location.href = 'signup_2.html?step=name&verified=true';
            }, 1500);
        }
        
        function resendCode() {
            // Simulate sending new code
            alert('New code sent to your email!');
            
            // Reset timer
            countdown = 30;
            resendBtn.disabled = true;
            resendTimer.style.display = 'block';
            
            const timer = setInterval(() => {
                countdown--;
                resendTimer.textContent = `Resend available in ${countdown}s`;
                
                if (countdown === 0) {
                    clearInterval(timer);
                    resendBtn.disabled = false;
                    resendTimer.style.display = 'none';
                }
            }, 1000);
        }
        
        function changeEmail() {
            if (confirm('Go back and change your email address?')) {
                window.location.href = 'signup_2.html?step=email';
            }
        }
    </script>
</body>
</html>
```

#### **B. Email Template (Backend):**
```html
Subject: Verify your UNERA account

<!DOCTYPE html>
<html>
<body style="font-family: 'Inter', sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(135deg, #10B981 0%, #0EA5E9 100%); padding: 40px; text-align: center; border-radius: 12px 12px 0 0;">
        <img src="logo.png" alt="UNERA" style="width: 60px; height: 60px;">
        <h1 style="color: white; margin: 20px 0 0 0;">Verify Your Email</h1>
    </div>
    
    <div style="background: white; padding: 40px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
        <p style="font-size: 16px; color: #374151; margin-bottom: 20px;">
            Hi there! 👋
        </p>
        
        <p style="font-size: 16px; color: #374151; margin-bottom: 30px;">
            Welcome to UNERA! To complete your registration, please verify your email address by entering this code:
        </p>
        
        <div style="background: #F3F4F6; padding: 30px; text-align: center; border-radius: 12px; margin-bottom: 30px;">
            <div style="font-size: 36px; font-weight: 700; letter-spacing: 8px; color: #10B981; font-family: 'Courier New', monospace;">
                123456
            </div>
        </div>
        
        <p style="font-size: 14px; color: #6B7280; margin-bottom: 20px;">
            This code will expire in <strong>10 minutes</strong>.
        </p>
        
        <p style="font-size: 14px; color: #6B7280; margin-bottom: 30px;">
            If you didn't request this code, please ignore this email or contact support if you have concerns.
        </p>
        
        <div style="border-top: 1px solid #E5E7EB; padding-top: 30px; margin-top: 30px;">
            <p style="font-size: 14px; color: #9CA3AF; text-align: center;">
                Questions? <a href="https://unera.io/support" style="color: #10B981;">Contact Support</a>
            </p>
            
            <p style="font-size: 12px; color: #9CA3AF; text-align: center; margin-top: 20px;">
                UNERA - Impact That Never Stops<br>
                © 2026 UNERA. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>
```

---

## **STEP 4: 2FA SETUP (OPTIONAL)**

### **New Files:**

#### **A. `setup-2fa.html`** (During signup OR in settings)
```html
<!DOCTYPE html>
<html>
<head>
    <title>Enable Two-Factor Authentication - UNERA</title>
</head>
<body>
    <div class="auth-container">
        <div class="auth-card">
            <div class="auth-header">
                <div class="icon-large">🔒</div>
                <h1>Secure Your Account</h1>
                <p>Two-factor authentication adds an extra layer of security</p>
            </div>
            
            <!-- Method Selection -->
            <div class="2fa-methods">
                <h3>Choose a Method:</h3>
                
                <!-- SMS Method -->
                <div class="method-card" onclick="select2FAMethod('sms')">
                    <div class="method-icon">📱</div>
                    <div class="method-info">
                        <h4>SMS Text Message</h4>
                        <p>Get codes via text message</p>
                    </div>
                    <div class="method-badge recommended">Recommended</div>
                </div>
                
                <!-- Email Method -->
                <div class="method-card" onclick="select2FAMethod('email')">
                    <div class="method-icon">📧</div>
                    <div class="method-info">
                        <h4>Email Codes</h4>
                        <p>Get codes via email</p>
                    </div>
                </div>
                
                <!-- Authenticator App Method -->
                <div class="method-card" onclick="select2FAMethod('app')">
                    <div class="method-icon">🔐</div>
                    <div class="method-info">
                        <h4>Authenticator App</h4>
                        <p>Google Authenticator, Microsoft Authenticator</p>
                    </div>
                    <div class="method-badge">Most Secure</div>
                </div>
            </div>
            
            <!-- SMS Setup (if SMS selected) -->
            <div id="smsSetup" class="setup-section" style="display: none;">
                <h3>Enter Your Phone Number</h3>
                <div class="phone-input-group">
                    <select class="country-code">
                        <option value="+1">🇺🇸 +1</option>
                        <option value="+44">🇬🇧 +44</option>
                        <option value="+86">🇨🇳 +86</option>
                        <option value="+81">🇯🇵 +81</option>
                        <!-- Add more countries -->
                    </select>
                    <input type="tel" placeholder="(555) 123-4567" id="phoneNumber">
                </div>
                <button class="btn-primary" onclick="sendSMSCode()">Send Code</button>
            </div>
            
            <!-- Authenticator App Setup -->
            <div id="appSetup" class="setup-section" style="display: none;">
                <h3>Scan QR Code</h3>
                <ol>
                    <li>Download Google Authenticator or Microsoft Authenticator</li>
                    <li>Tap "+" to add an account</li>
                    <li>Scan this QR code:</li>
                </ol>
                
                <div class="qr-code-container">
                    <img src="qr-code-placeholder.png" alt="QR Code" class="qr-code">
                </div>
                
                <p class="manual-code">
                    Can't scan? Enter this code manually:<br>
                    <code>JBSWY3DPEHPK3PXP</code>
                </p>
                
                <div class="form-group">
                    <label>Enter the 6-digit code from your app:</label>
                    <div class="code-input-group">
                        <input type="text" maxlength="1" class="code-digit">
                        <input type="text" maxlength="1" class="code-digit">
                        <input type="text" maxlength="1" class="code-digit">
                        <input type="text" maxlength="1" class="code-digit">
                        <input type="text" maxlength="1" class="code-digit">
                        <input type="text" maxlength="1" class="code-digit">
                    </div>
                </div>
                
                <button class="btn-primary" onclick="verify2FASetup()">
                    Enable 2FA
                </button>
            </div>
            
            <!-- Backup Codes (After setup) -->
            <div id="backupCodes" class="setup-section" style="display: none;">
                <h3>⚠️ Save Your Backup Codes</h3>
                <p>Keep these in a safe place. You can use them to log in if you lose access to your phone.</p>
                
                <div class="backup-codes-grid">
                    <code>1A2B-3C4D-5E6F</code>
                    <code>7G8H-9I0J-1K2L</code>
                    <code>3M4N-5O6P-7Q8R</code>
                    <code>9S0T-1U2V-3W4X</code>
                    <code>5Y6Z-7A8B-9C0D</code>
                    <code>1E2F-3G4H-5I6J</code>
                </div>
                
                <div class="backup-actions">
                    <button class="btn-secondary" onclick="downloadBackupCodes()">
                        📥 Download Codes
                    </button>
                    <button class="btn-secondary" onclick="printBackupCodes()">
                        🖨️ Print Codes
                    </button>
                </div>
                
                <label class="checkbox-label">
                    <input type="checkbox" id="backedUpCheckbox">
                    I have saved these codes in a safe place
                </label>
                
                <button class="btn-primary" onclick="complete2FASetup()">
                    Continue to Dashboard
                </button>
            </div>
            
            <!-- Skip Option -->
            <div class="skip-section">
                <button class="btn-text" onclick="skip2FA()">
                    Skip for Now →
                </button>
                <p class="skip-note">
                    💡 You can enable 2FA later in Account Settings
                </p>
            </div>
        </div>
    </div>
</body>
</html>
```

---

## **STEP 5: KYC WITH SKIP OPTION**

### **Updated:** `kyc-verify.html`

```html
<!-- Add Skip Option & Clear Messaging -->
<div class="kyc-container">
    <div class="kyc-header">
        <h1>🎯 Verify Your Identity</h1>
        <p>Unlock all UNERA features</p>
        
        <!-- Progress indicator -->
        <div class="kyc-progress">
            <span class="progress-step active">1. Upload ID</span>
            <span class="progress-step">2. Selfie</span>
            <span class="progress-step">3. Review</span>
        </div>
    </div>
    
    <!-- Benefits Section -->
    <div class="kyc-benefits">
        <h3>Why verify?</h3>
        <div class="benefit-grid">
            <div class="benefit-item">
                <div class="benefit-icon">✓</div>
                <div class="benefit-text">Full wallet access</div>
            </div>
            <div class="benefit-item">
                <div class="benefit-icon">✓</div>
                <div class="benefit-text">Higher transaction limits</div>
            </div>
            <div class="benefit-item">
                <div class="benefit-icon">✓</div>
                <div class="benefit-text">Withdraw to bank</div>
            </div>
            <div class="benefit-item">
                <div class="benefit-icon">✓</div>
                <div class="benefit-text">Complete donation history</div>
            </div>
        </div>
    </div>
    
    <!-- Quick Info -->
    <div class="kyc-info">
        <h4>What you'll need:</h4>
        <ul>
            <li>📱 Government-issued ID (Driver's license, Passport, or State ID)</li>
            <li>📸 Selfie for verification</li>
            <li>⏱️ Takes about 2 minutes</li>
        </ul>
    </div>
    
    <!-- Action Buttons -->
    <div class="kyc-actions">
        <button class="btn-primary" onclick="startKYC()">
            Start Verification
        </button>
        
        <button class="btn-secondary" onclick="skipKYC()">
            Skip - Do This Later
        </button>
    </div>
    
    <!-- Warning for Skip -->
    <div class="skip-warning">
        <div class="warning-icon">⚠️</div>
        <div class="warning-text">
            <strong>Limited Access:</strong> Without verification, you won't be able to add funds, make donations, or send money. You can still explore the platform.
        </div>
    </div>
</div>

<script>
function skipKYC() {
    // Show confirmation
    if (confirm('Skip identity verification? You can complete this later in your account settings.\n\nNote: Some features will be disabled until you verify.')) {
        // Set skipped flag in user profile
        localStorage.setItem('kycStatus', 'skipped');
        
        // Redirect to dashboard with limited access
        window.location.href = 'dashboard-enhanced.html?kyc=skipped';
    }
}

function startKYC() {
    // Start KYC flow
    window.location.href = 'kyc-verify.html?step=upload';
}
</script>
```

---

## **STEP 6: DASHBOARD WITH KYC WARNING**

### **Updated:** `dashboard-enhanced.html`

```html
<!-- Add Warning Banner at Top -->
<div id="kycWarningBanner" class="warning-banner" style="display: none;">
    <div class="banner-content">
        <div class="banner-icon">⚠️</div>
        <div class="banner-text">
            <strong>Complete verification to unlock all features</strong>
            <p>Add funds, make donations, and access your full wallet</p>
        </div>
        <div class="banner-actions">
            <button class="btn-primary-small" onclick="goToKYC()">
                Verify Identity
            </button>
            <button class="btn-text-small" onclick="dismissKYCBanner()">
                Later
            </button>
        </div>
    </div>
</div>

<!-- Disable Features with Lock Icons -->
<div class="quick-actions">
    <!-- Add Money - LOCKED if KYC not done -->
    <div class="action-card locked" onclick="showKYCRequired()">
        <div class="action-icon">
            <span>💰</span>
            <span class="lock-badge">🔒</span>
        </div>
        <h3>Add Money</h3>
        <p>Verification required</p>
    </div>
    
    <!-- Donate - LOCKED if KYC not done -->
    <div class="action-card locked" onclick="showKYCRequired()">
        <div class="action-icon">
            <span>❤️</span>
            <span class="lock-badge">🔒</span>
        </div>
        <h3>Donate</h3>
        <p>Verification required</p>
    </div>
    
    <!-- Send - LOCKED if KYC not done -->
    <div class="action-card locked" onclick="showKYCRequired()">
        <div class="action-icon">
            <span>📤</span>
            <span class="lock-badge">🔒</span>
        </div>
        <h3>Send</h3>
        <p>Verification required</p>
    </div>
    
    <!-- Explore - ALWAYS AVAILABLE -->
    <div class="action-card" onclick="window.location.href='explore-centres.html'">
        <div class="action-icon">✨</div>
        <h3>Explore Centres</h3>
        <p>Browse projects</p>
    </div>
</div>

<script>
// Check KYC status on page load
document.addEventListener('DOMContentLoaded', function() {
    const kycStatus = localStorage.getItem('kycStatus') || 'not-started';
    
    if (kycStatus === 'skipped' || kycStatus === 'not-started') {
        // Show warning banner
        document.getElementById('kycWarningBanner').style.display = 'flex';
        
        // Lock features
        lockFeatures();
    } else if (kycStatus === 'pending') {
        // Show "verification in progress" banner
        showVerificationPendingBanner();
    }
});

function lockFeatures() {
    // Add lock badges and disable click handlers
    const lockedCards = document.querySelectorAll('.action-card.locked');
    lockedCards.forEach(card => {
        card.style.opacity = '0.6';
        card.style.cursor = 'not-allowed';
    });
}

function showKYCRequired() {
    // Show modal
    const modal = `
        <div class="modal-overlay" onclick="closeModal()">
            <div class="modal-content" onclick="event.stopPropagation()">
                <div class="modal-icon">🔒</div>
                <h2>Verification Required</h2>
                <p>To use this feature, please complete identity verification.</p>
                
                <div class="modal-benefits">
                    <p><strong>Takes only 2 minutes:</strong></p>
                    <ul>
                        <li>✓ Upload government ID</li>
                        <li>✓ Take a quick selfie</li>
                        <li>✓ Get approved in ~24 hours</li>
                    </ul>
                </div>
                
                <div class="modal-actions">
                    <button class="btn-primary" onclick="goToKYC()">
                        Verify Now
                    </button>
                    <button class="btn-secondary" onclick="closeModal()">
                        Maybe Later
                    </button>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modal);
}

function goToKYC() {
    window.location.href = 'kyc-verify.html';
}

function dismissKYCBanner() {
    document.getElementById('kycWarningBanner').style.display = 'none';
    // Set a "dismissed" flag so we don't show it again this session
    sessionStorage.setItem('kycBannerDismissed', 'true');
}

function closeModal() {
    document.querySelector('.modal-overlay').remove();
}
</script>

<style>
/* Warning Banner Styles */
.warning-banner {
    position: sticky;
    top: 60px; /* Below nav */
    z-index: 100;
    background: linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%);
    border: 2px solid #F59E0B;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    box-shadow: 0 4px 12px rgba(245, 158, 11, 0.15);
}

.banner-content {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
}

.banner-icon {
    font-size: 2rem;
    flex-shrink: 0;
}

.banner-text {
    flex: 1;
}

.banner-text strong {
    font-size: 1rem;
    color: #92400E;
    display: block;
    margin-bottom: 0.25rem;
}

.banner-text p {
    font-size: 0.875rem;
    color: #B45309;
    margin: 0;
}

.banner-actions {
    display: flex;
    gap: 0.75rem;
    flex-shrink: 0;
}

.btn-primary-small {
    padding: 0.625rem 1.25rem;
    background: var(--gradient-primary);
    color: white;
    border: none;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
}

.btn-primary-small:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}

.btn-text-small {
    padding: 0.625rem 1.25rem;
    background: transparent;
    color: #92400E;
    border: none;
    font-weight: 500;
    cursor: pointer;
    text-decoration: underline;
}

/* Locked Card Styles */
.action-card.locked {
    position: relative;
    opacity: 0.6;
    cursor: not-allowed;
}

.lock-badge {
    position: absolute;
    top: -8px;
    right: -8px;
    background: white;
    border-radius: 50%;
    padding: 4px;
    font-size: 1.25rem;
    box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}

/* Modal Styles */
.modal-overlay {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 1000;
    padding: 1rem;
    animation: fadeIn 0.3s;
}

.modal-content {
    background: white;
    border-radius: 24px;
    padding: 2.5rem;
    max-width: 480px;
    width: 100%;
    text-align: center;
    animation: scaleIn 0.3s;
}

.modal-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
}

.modal-content h2 {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    color: var(--text-primary);
}

.modal-content p {
    color: var(--text-secondary);
    margin-bottom: 1.5rem;
}

.modal-benefits {
    background: var(--neutral-50);
    padding: 1.5rem;
    border-radius: 12px;
    margin-bottom: 2rem;
    text-align: left;
}

.modal-benefits ul {
    margin-top: 0.75rem;
    padding-left: 1.5rem;
}

.modal-benefits li {
    margin-bottom: 0.5rem;
    color: var(--text-secondary);
}

.modal-actions {
    display: flex;
    gap: 1rem;
}

.modal-actions button {
    flex: 1;
    height: 52px;
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes scaleIn {
    from {
        transform: scale(0.9);
        opacity: 0;
    }
    to {
        transform: scale(1);
        opacity: 1;
    }
}

/* Mobile Responsive */
@media (max-width: 768px) {
    .warning-banner {
        flex-direction: column;
        text-align: center;
    }
    
    .banner-content {
        flex-direction: column;
    }
    
    .banner-actions {
        width: 100%;
        flex-direction: column;
    }
    
    .banner-actions button {
        width: 100%;
    }
}
</style>
```

---

## **STEP 7: IMPLEMENTATION CHECKLIST**

### **Phase 1: Core Flow (High Priority)** ⏱️ 4-5 hours

- [ ] **1. Multi-step signup form**
  - [ ] Screen 1: Email entry
  - [ ] Screen 2: Email verification (6-digit code)
  - [ ] Screen 3: Name (First + Last) + Password
  - [ ] Screen 4: 2FA setup (with skip option)
  - [ ] Screen 5: KYC prompt (with skip option)

- [ ] **2. Email verification system**
  - [ ] Create `verify-email.html`
  - [ ] 6-digit code input with auto-advance
  - [ ] Resend code functionality (30s timer)
  - [ ] Email template design
  - [ ] Backend API for code generation/validation

- [ ] **3. 2FA setup (optional)**
  - [ ] Create `setup-2fa.html`
  - [ ] SMS method setup
  - [ ] Authenticator app setup (QR code)
  - [ ] Email code method
  - [ ] Backup codes generation
  - [ ] Skip option with clear messaging

- [ ] **4. KYC with skip option**
  - [ ] Update `kyc-verify.html` with skip button
  - [ ] Add benefits section
  - [ ] Add warning message for skip
  - [ ] Set kycStatus flag in localStorage

- [ ] **5. Dashboard restrictions**
  - [ ] Warning banner for unverified users
  - [ ] Lock icons on restricted features
  - [ ] Modal popup explaining verification need
  - [ ] "Verify Now" CTA throughout dashboard

### **Phase 2: Login Enhancements** ⏱️ 2-3 hours

- [ ] **6. Login with 2FA**
  - [ ] Check if user has 2FA enabled
  - [ ] Show 2FA verification screen after password
  - [ ] 6-digit code input
  - [ ] "Trust this device" checkbox
  - [ ] Backup code option

- [ ] **7. KYC reminder on login**
  - [ ] Check KYC status
  - [ ] Show reminder modal if not verified
  - [ ] "Verify Now" or "Later" options

### **Phase 3: Settings & Management** ⏱️ 2-3 hours

- [ ] **8. Account Settings page**
  - [ ] Enable/disable 2FA
  - [ ] View KYC status
  - [ ] Re-initiate KYC if failed
  - [ ] View active sessions
  - [ ] Change password

### **Phase 4: Polish & Testing** ⏱️ 2-3 hours

- [ ] **9. Design consistency**
  - [ ] Match dashboard/wallet design system
  - [ ] Consistent button styles
  - [ ] Consistent messaging tone
  - [ ] Mobile responsive

- [ ] **10. Error handling**
  - [ ] Invalid email code
  - [ ] Invalid 2FA code
  - [ ] KYC upload errors
  - [ ] Network errors

- [ ] **11. User testing**
  - [ ] Test complete signup flow
  - [ ] Test 2FA skip path
  - [ ] Test KYC skip path
  - [ ] Test restricted dashboard
  - [ ] Test login with 2FA

---

## **TOTAL ESTIMATED TIME:** 10-14 hours

---

## **KEY DIFFERENCES FROM COINBASE**

| Feature | Coinbase | UNERA (Your Product) | Rationale |
|---------|----------|---------------------|-----------|
| **2FA** | 🔴 MANDATORY | 🟡 Optional (can skip) | Boss requested optional to reduce friction |
| **Phone Verification** | ✅ Required | ❓ Recommend optional | Reduce signup barriers |
| **KYC Blocking** | 🔴 Hard block | 🟡 Soft block (limited dashboard) | Boss requested users can skip |
| **Dashboard Access** | After KYC approval | Immediate (with warnings) | Better UX, encourage completion later |

---

## **COINBASE-INSPIRED BEST PRACTICES TO ADOPT**

### **1. Clear Legal Name Collection**
✅ **DO:**
- Separate "First Name" and "Last Name" fields
- Show example: "Must match your government-issued ID"
- Validate format (no numbers, special characters)

❌ **DON'T:**
- Single "Full Name" field
- Allow nicknames
- Skip validation

### **2. Email Verification with Code**
✅ **DO:**
- 6-digit code (easy to type)
- 30-second resend timer
- Auto-advance between digits
- Clear expiration time (10 minutes)

❌ **DON'T:**
- Long verification links
- No resend option
- Unlimited attempts

### **3. 2FA with Multiple Methods**
✅ **DO:**
- Offer SMS, Email, Authenticator app
- Generate backup codes
- Show QR code for easy setup
- Explain why it's important

❌ **DON'T:**
- Only one method
- No backup options
- Force it without explanation

### **4. KYC with Clear Benefits**
✅ **DO:**
- List what users unlock
- Show estimated time (2 minutes)
- Explain requirements upfront
- Allow skip with clear warning

❌ **DON'T:**
- Hard block without explanation
- Surprise users with requirements
- No skip option

### **5. Restricted Dashboard Experience**
✅ **DO:**
- Prominent warning banner
- Lock icons on disabled features
- Clear "Verify Now" CTAs
- Allow exploration of interface

❌ **DON'T:**
- Completely block dashboard
- Hide what users are missing
- No path to verification

---

## **SECURITY CONSIDERATIONS**

### **Rate Limiting:**
```javascript
// Prevent brute force on verification codes
const MAX_ATTEMPTS = 5;
const LOCKOUT_TIME = 15 * 60 * 1000; // 15 minutes

let attempts = 0;
let lockoutEnd = null;

function verifyCode(code) {
    if (lockoutEnd && Date.now() < lockoutEnd) {
        const minutesLeft = Math.ceil((lockoutEnd - Date.now()) / 60000);
        alert(`Too many attempts. Try again in ${minutesLeft} minutes.`);
        return;
    }
    
    if (attempts >= MAX_ATTEMPTS) {
        lockoutEnd = Date.now() + LOCKOUT_TIME;
        alert('Too many failed attempts. Account locked for 15 minutes.');
        return;
    }
    
    // Verify code with backend
    fetch('/api/verify-email', {
        method: 'POST',
        body: JSON.stringify({ code }),
        headers: { 'Content-Type': 'application/json' }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            // Reset attempts
            attempts = 0;
            lockoutEnd = null;
            // Continue to next step
            window.location.href = 'signup_2.html?step=name';
        } else {
            attempts++;
            alert(`Invalid code. ${MAX_ATTEMPTS - attempts} attempts remaining.`);
        }
    });
}
```

### **Code Expiration:**
```javascript
// Email verification codes expire after 10 minutes
const CODE_EXPIRY = 10 * 60 * 1000; // 10 minutes

function generateVerificationCode(email) {
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + CODE_EXPIRY;
    
    // Store in database
    saveVerificationCode(email, code, expiresAt);
    
    // Send email
    sendVerificationEmail(email, code);
}

function validateCode(email, code) {
    const storedData = getVerificationCode(email);
    
    if (!storedData) {
        return { valid: false, error: 'No code found' };
    }
    
    if (Date.now() > storedData.expiresAt) {
        return { valid: false, error: 'Code expired. Request a new one.' };
    }
    
    if (storedData.code !== code) {
        return { valid: false, error: 'Invalid code' };
    }
    
    return { valid: true };
}
```

---

## **NEXT STEPS**

### **1. Approve This Plan**
Review the proposed flow and confirm:
- ✅ Email → Verify → Name → 2FA (skip) → KYC (skip)
- ✅ Dashboard access with restrictions
- ✅ Warning banners for unverified users

### **2. I'll Implement**
Once approved, I'll create:
- Multi-step signup form
- Email verification system
- 2FA setup (optional)
- Updated KYC with skip
- Dashboard restrictions & warnings

### **3. You Test**
- Complete signup flow
- Test skip options
- Verify dashboard restrictions
- Test login with 2FA

### **4. Deploy**
- Push to GitHub Pages
- Site live at https://conscious-landbank.github.io/

---

## **SUMMARY**

✅ **Email-first registration** (Coinbase model)  
✅ **Clear flow:** Email → Verify → Name → 2FA → KYC  
✅ **Optional 2FA** (can skip, unlike Coinbase)  
✅ **Optional KYC** (limited dashboard, not blocked)  
✅ **Warning system** for unverified users  
✅ **Follows Coinbase best practices** where appropriate

**Estimated Implementation:** 10-14 hours  
**Your Review Time:** ~30-60 minutes

---

**Ready to implement?** Let me know and I'll start building! 🚀
