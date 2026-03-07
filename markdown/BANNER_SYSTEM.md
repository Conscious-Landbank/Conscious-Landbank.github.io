# 🎯 Banner System - KYC & Wallet Reminders

## Overview
Progressive reminder system that guides users through KYC verification and wallet creation in the correct order.

---

## 📊 Banner Priority System

### Priority Order:
```
1. ✅ KYC Banner (shows first if not verified)
   ↓
2. 💳 Wallet Banner (shows only after KYC is verified)
   ↓
3. No banners (both completed)
```

---

## 🎨 Banner Designs

### 1. KYC Banner (Green-Blue Gradient)
**Appears when:** User is logged in but KYC not verified

**Design:**
- Icon: ✅ 
- Title: "Complete KYC Verification"
- Description: "Verify your identity to unlock donations, purchases, and transfers. Takes only 5 minutes!"
- Button: "Verify Identity" → Links to `kyc-verify.html?return=dashboard`
- Dismissible: Yes (stored in `localStorage.kycBannerDismissed`)

**Conditions:**
- `kycStatus !== 'verified'`
- `!localStorage.getItem('kycBannerDismissed')`

---

### 2. Wallet Banner (Green-Cyan Gradient)
**Appears when:** KYC verified but no wallet created

**Design:**
- Icon: 💳
- Title: "Create Your Wallet"
- Description: "Unlock full features: receive donations, track impact, and earn rewards"
- Button: "Create Wallet" → Links to wallet creation
- Dismissible: Yes (stored in `localStorage.walletBannerDismissed`)

**Conditions:**
- `kycStatus === 'verified'` (KYC must be done first!)
- `!localStorage.getItem('walletAddress')` (no wallet)
- `!localStorage.getItem('walletBannerDismissed')`

---

## 📁 Implementation Files

### kyc-modal.js
```javascript
KYCModal.showDashboardBanner()    // Show KYC banner
KYCModal.dismissBanner()          // Dismiss KYC banner
```

**Key Methods:**
- `showDashboardBanner()` - Creates and injects KYC banner
- `dismissBanner()` - Removes banner and sets `kycBannerDismissed`

### wallet-prompt.js
```javascript
WalletPrompt.showDashboardBanner()  // Show wallet banner (after KYC)
WalletPrompt.dismissBanner()        // Dismiss wallet banner
```

**Key Methods:**
- `showDashboardBanner()` - Creates and injects wallet banner (only if KYC verified)
- `dismissBanner()` - Removes banner and sets `walletBannerDismissed`

---

## 🔧 Usage in Pages

### Dashboard (dashboard.html)
```javascript
// On page load
KYCModal.showDashboardBanner();      // Check and show KYC banner
WalletPrompt.showDashboardBanner();  // Check and show wallet banner (if KYC done)
```

The logic automatically handles:
- Showing KYC banner first if not verified
- Hiding wallet banner until KYC is done
- Respecting dismiss preferences

---

## 🎯 User Flow Examples

### Example 1: New User (No KYC, No Wallet)
```
1. User logs in to dashboard
2. ✅ KYC Banner appears (green-blue)
3. 💳 Wallet Banner does NOT appear (KYC required first)
4. User clicks "Verify Identity"
5. Completes KYC
6. Returns to dashboard
7. ✅ KYC Banner disappears (verified)
8. 💳 Wallet Banner appears (green-cyan)
```

### Example 2: User with KYC, No Wallet
```
1. User logs in to dashboard
2. ✅ KYC Banner does NOT appear (already verified)
3. 💳 Wallet Banner appears
4. User can dismiss or create wallet
```

### Example 3: User Dismisses Banner
```
1. User sees banner
2. Clicks X to dismiss
3. Banner disappears
4. Banner won't show again (stored in localStorage)
5. User can still access features via other entry points
```

---

## 📋 LocalStorage Keys

| Key | Values | Purpose |
|-----|--------|---------|
| `kycStatus` | `'verified'`, `'pending'`, etc. | Track KYC verification status |
| `kycBannerDismissed` | `'true'` or null | User dismissed KYC banner |
| `walletAddress` | `'0x...'` or null | User has wallet |
| `walletBannerDismissed` | `'true'` or null | User dismissed wallet banner |

---

## 🎨 CSS Classes

### KYC Banner
- `.kyc-banner` - Main container
- `.kyc-banner-content` - Content wrapper
- `.kyc-banner-icon` - Icon (✅)
- `.kyc-banner-text` - Text container
- `.kyc-banner-title` - "Complete KYC Verification"
- `.kyc-banner-description` - Description text
- `.kyc-banner-actions` - Button container
- `.kyc-banner-btn` - Main CTA button
- `.kyc-banner-dismiss` - Dismiss (X) button

### Wallet Banner
- `.wallet-banner` - Main container
- `.wallet-banner-content` - Content wrapper
- `.wallet-banner-icon` - Icon (💳)
- `.wallet-banner-text` - Text container
- `.wallet-banner-title` - "Create Your Wallet"
- `.wallet-banner-description` - Description text
- `.wallet-banner-actions` - Button container
- `.wallet-banner-btn` - Main CTA button
- `.wallet-banner-dismiss` - Dismiss (X) button

---

## ✨ Features

### ✅ Smooth Animations
- Slide down animation on appear
- Slide up animation on dismiss
- Rotate animation on dismiss button hover
- Button hover lift effect

### ✅ Responsive Design
- Desktop: Full-width banner with horizontal layout
- Mobile: Stacked layout, full-width buttons
- Tablet: Hybrid layout

### ✅ Accessibility
- `aria-label` on dismiss buttons
- Keyboard accessible
- High contrast text
- Focus states

### ✅ Visual Polish
- Gradient backgrounds with overlay effects
- Decorative radial gradient in corner
- Smooth transitions
- White CTA buttons for high contrast

---

## 🧪 Testing Checklist

### Test 1: New User Flow
```javascript
// Clear everything
localStorage.clear();

// Expected: KYC banner shows, wallet banner does NOT show
```

### Test 2: KYC Verified User
```javascript
localStorage.setItem('kycStatus', 'verified');
localStorage.removeItem('walletAddress');

// Expected: KYC banner does NOT show, wallet banner DOES show
```

### Test 3: Both Complete
```javascript
localStorage.setItem('kycStatus', 'verified');
localStorage.setItem('walletAddress', '0x123...');

// Expected: Neither banner shows
```

### Test 4: Dismiss KYC Banner
```javascript
localStorage.clear();
// Open dashboard, dismiss KYC banner
// Expected: Banner disappears and doesn't come back
```

---

## 🔄 Reset Banners

To reset dismissed banners (for testing):
```javascript
localStorage.removeItem('kycBannerDismissed');
localStorage.removeItem('walletBannerDismissed');
```

---

## 📊 Tracking Events

Both banner systems include tracking for:
- Banner shown
- Banner dismissed
- CTA clicked

These can be connected to analytics later.

---

## 🎯 Key Principles

1. **KYC Always First** - Wallet banner never shows until KYC is verified
2. **Dismissible** - Users can dismiss and access features through other entry points
3. **Persistent Reminder** - Unless dismissed, banner shows on every dashboard visit
4. **Non-Blocking** - Banners are informative, not blocking (users can still navigate)
5. **Progressive** - Guide users through the correct order naturally

---

## 🚀 Future Enhancements

Potential improvements:
- [ ] Show progress indicator (Step 1/2)
- [ ] Add "Remind me later" option (temporary dismiss)
- [ ] Show different message if KYC is pending
- [ ] Add animation between banner transitions
- [ ] Track conversion rates for each banner
