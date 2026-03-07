# 🐛 KYC Banner Still Showing - Debug Guide

**Issue:** After completing KYC, the KYC banner still shows instead of the wallet banner.

---

## 🔍 **DEBUGGING STEPS**

### **Step 1: Check Browser Console**

1. **Open dashboard:**
   ```
   http://localhost:8000/dashboard-enhanced.html
   ```

2. **Open browser console** (F12 or Cmd+Option+I)

3. **Look for debug logs:**
   ```
   🔍 Dashboard Banner Logic:
     KYC Status: verified (or null/other)
     Has Wallet: false
     WalletPrompt loaded: true
   ```

---

### **Step 2: Check localStorage**

**Run in console:**
```javascript
console.log('KYC Status:', localStorage.getItem('kycStatus'));
console.log('Has Wallet:', localStorage.getItem('walletAddress'));
console.log('KYC Dismissed:', localStorage.getItem('kycAlertDismissed'));
```

**Expected after KYC completion:**
- `kycStatus`: `"verified"`
- `walletAddress`: `null` (if no wallet created yet)
- `kycAlertDismissed`: `null` or `"true"`

---

### **Step 3: Manual Fix (If Needed)**

If `kycStatus` is NOT set to `"verified"`, manually set it:

```javascript
localStorage.setItem('kycStatus', 'verified');
localStorage.removeItem('kycAlertDismissed');
location.reload();
```

**Expected Result:**
- ✅ KYC banner disappears
- ✅ Wallet banner appears (gradient banner at top)

---

## 🔧 **POSSIBLE ISSUES & FIXES**

### **Issue 1: `kycStatus` Not Set**

**Cause:** KYC completion didn't call `updateKYCStatus('verified')`

**Fix:** Manually set it (see Step 3 above)

**Permanent Fix:** Verify in `kyc-verify.html` that line 1263 is being executed:
```javascript
if (randomOutcome === 'success') {
    updateKYCStatus('verified');
}
```

---

### **Issue 2: `wallet-prompt.js` Not Loading**

**Symptoms in console:**
```
WalletPrompt loaded: false
❌ WalletPrompt not loaded!
```

**Fix:**
1. Check if `wallet-prompt.js` exists in root directory
2. Check browser network tab for 404 errors
3. Verify script tag in `dashboard-enhanced.html`:
   ```html
   <script src="wallet-prompt.js"></script>
   ```

---

### **Issue 3: `kycAlertDismissed` Flag Blocking**

**Cause:** User previously dismissed KYC banner, flag is still set

**Fix:**
```javascript
localStorage.removeItem('kycAlertDismissed');
location.reload();
```

---

### **Issue 4: Browser Cache**

**Symptoms:** Old JavaScript is running

**Fix:**
1. Hard refresh: **Cmd+Shift+R** (Mac) or **Ctrl+Shift+R** (Windows)
2. Clear cache and reload
3. Open in incognito/private window

---

## ✅ **VERIFICATION CHECKLIST**

After completing KYC and going to dashboard, verify:

- [ ] Console shows: `✅ KYC verified - hiding KYC banner`
- [ ] Console shows: `💳 No wallet found - showing wallet banner`
- [ ] KYC banner (`id="kycAlert"`) is **NOT visible**
- [ ] Wallet banner appears with:
  - 💳 Icon
  - "Create Your Wallet" title
  - "Create Wallet" button
  - Green-to-blue gradient background

---

## 🧪 **QUICK TEST SCRIPT**

Run this in console to simulate KYC completion:

```javascript
// Simulate KYC completion
localStorage.setItem('kycStatus', 'verified');
localStorage.setItem('kycLevel', 'tier1');
localStorage.setItem('kycVerifiedDate', new Date().toISOString());
localStorage.setItem('reusableKYC', 'enabled');
localStorage.removeItem('walletAddress');
localStorage.removeItem('kycAlertDismissed');

// Reload page
location.reload();
```

**Expected After Reload:**
- ✅ KYC banner hidden
- ✅ Wallet banner shown
- ✅ Console logs show correct logic

---

## 📊 **BANNER STATE TABLE**

| kycStatus | walletAddress | kycAlertDismissed | Expected Banner |
|-----------|---------------|-------------------|-----------------|
| `null` | `null` | `null` | 🔒 KYC Banner |
| `null` | `null` | `"true"` | ❌ No banner |
| `"verified"` | `null` | `any` | 💳 Wallet Banner |
| `"verified"` | `"0x..."` | `any` | ✅ No banner |

---

## 🔍 **INSPECT KYC BANNER**

In browser console:
```javascript
const kycAlert = document.getElementById('kycAlert');
console.log('KYC Alert exists:', !!kycAlert);
console.log('KYC Alert display:', kycAlert?.style.display);
console.log('KYC Alert computed display:', window.getComputedStyle(kycAlert).display);
```

If `display` is NOT `"none"`, the banner is visible.

---

## 🚀 **COMPLETE FIX SEQUENCE**

1. **Complete KYC** on `kyc-verify.html`
2. **Click "Go to Dashboard"**
3. **Check console** for debug logs
4. **If banner still shows:**
   ```javascript
   localStorage.setItem('kycStatus', 'verified');
   localStorage.removeItem('kycAlertDismissed');
   location.reload();
   ```
5. **Verify wallet banner appears**

---

## 📝 **UPDATED CODE**

### **Dashboard Logic (Lines 1452-1480)**

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const kycStatus = localStorage.getItem('kycStatus');
    const hasWallet = !!localStorage.getItem('walletAddress');
    const kycAlert = document.getElementById('kycAlert');
    
    // Debug logging (NEW)
    console.log('🔍 Dashboard Banner Logic:');
    console.log('  KYC Status:', kycStatus);
    console.log('  Has Wallet:', hasWallet);
    console.log('  WalletPrompt loaded:', typeof WalletPrompt !== 'undefined');
    
    if (kycStatus === 'verified') {
        // KYC is done, hide KYC banner
        console.log('✅ KYC verified - hiding KYC banner');
        if (kycAlert) {
            kycAlert.style.display = 'none';
        }
        
        // Clear the dismissed flag (NEW)
        localStorage.removeItem('kycAlertDismissed');
        
        // Show wallet creation banner if no wallet exists
        if (!hasWallet) {
            console.log('💳 No wallet found - showing wallet banner');
            if (typeof WalletPrompt !== 'undefined') {
                WalletPrompt.showDashboardBanner();
            } else {
                console.error('❌ WalletPrompt not loaded!');
            }
        }
    } else {
        // KYC not verified yet
        console.log('⚠️ KYC not verified - showing KYC banner');
        if (localStorage.getItem('kycAlertDismissed') === 'true') {
            console.log('🔕 KYC banner dismissed by user');
            if (kycAlert) {
                kycAlert.style.display = 'none';
            }
        }
    }
});
```

---

## 🎯 **NEXT STEPS**

1. **Refresh dashboard** (hard refresh: Cmd+Shift+R)
2. **Check console** for debug logs
3. **Report back** what the console shows
4. **If still not working**, run the manual fix script above

---

**Date:** January 21, 2026  
**Status:** ⏳ **DEBUGGING IN PROGRESS**
