# 🧪 KYC Testing Guide

## Quick Start Testing

### 1️⃣ **Test KYC Modal Trigger**

**Steps:**
1. Open `dashboard.html` in browser
2. Make sure you're NOT verified (localStorage should be empty or kycStatus = 'not_started')
3. Click any of these buttons:
   - "Make a Donation"
   - "Buy Stablecoins"  
   - "Send Stablecoins"

**Expected Result:**
✅ KYC modal appears with:
- Shield icon with gradient
- "Verify to [Action]" title
- Stats (5 min, 95% instant, bank-level)
- Benefits list (3 items)
- "Start Verification" button
- "I'll do this later" button
- Privacy footer

---

### 2️⃣ **Test Verification Flow**

**Steps:**
1. Click "Start Verification" in modal
2. Should redirect to `kyc-verify.html`
3. See intro screen with benefits
4. Click "Start Verification" button
5. Sumsub SDK should load (iframe)

**Expected Result:**
✅ Intro screen shows:
- Large icon with pulse animation
- Benefits grid (4 items)
- Info box with unlock list
- Start button

✅ Sumsub SDK:
- Embedded iframe
- Custom brand colors
- Document upload flow

**Note:** In demo, Sumsub SDK will use mock token. For production, you need real Sumsub API keys.

---

### 3️⃣ **Test Verification States**

#### **Simulate Success:**
```javascript
// Open browser console on kyc-verify.html
// After submitting to Sumsub, manually trigger success:
showStatus('success');
```

**Expected:**
✅ Success screen with:
- Green checkmark icon (animated)
- "Verification Successful!" title
- Status details (Verified, Tier 1, $1,000 limit)
- "Go to Dashboard" button
- "Make Your First Donation" button

✅ LocalStorage updated:
```javascript
localStorage.getItem('kycStatus') // 'verified'
localStorage.getItem('kycLevel') // 'tier1'
```

✅ Dashboard shows:
- Green badge: "✓ Verified"
- No KYC modal when clicking Donate/Buy/Send

---

#### **Simulate Pending:**
```javascript
// Open browser console on kyc-verify.html
showStatus('pending');
```

**Expected:**
✅ Pending screen with:
- Yellow clock icon
- "Verification Submitted" title
- Status: "⏳ Under Review"
- Estimated time: 1-24 hours
- "What happens next?" info box

✅ Dashboard shows:
- Yellow badge: "⏳ Verification Pending"
- KYC modal still appears (can't transact yet)

---

#### **Simulate Rejection:**
```javascript
// Open browser console on kyc-verify.html
showStatus('rejected', {
  reviewResult: {
    rejectLabels: ['BLURRY_DOCUMENT']
  }
});
```

**Expected:**
✅ Rejection screen with:
- Red X icon
- "Verification Incomplete" title
- Issue reason: "BLURRY_DOCUMENT"
- Common reasons list
- "Try Again" button

---

### 4️⃣ **Test Dashboard Badge**

**Steps:**
1. Open `dashboard.html`
2. Check hero section for badge

**Test Scenarios:**

**A) Not Verified:**
```javascript
// Clear localStorage
localStorage.clear();
// Refresh page
```
**Expected:** Red badge "⚠️ Verification Required" (clickable)

**B) Verified:**
```javascript
localStorage.setItem('kycStatus', 'verified');
localStorage.setItem('kycLevel', 'tier1');
// Refresh page
```
**Expected:** Green badge "✓ Verified" (non-clickable)

**C) Pending:**
```javascript
localStorage.setItem('kycStatus', 'pending');
// Refresh page
```
**Expected:** Yellow badge "⏳ Verification Pending" (non-clickable)

---

### 5️⃣ **Test Transaction Flows**

#### **A) Donate Flow**

**Steps:**
1. Clear localStorage: `localStorage.clear()`
2. Open `dashboard.html`
3. Click "Make a Donation"

**Expected:**
✅ KYC modal appears
✅ Click "I'll do this later" → Returns to dashboard
✅ Click "Start Verification" → Redirects to kyc-verify.html

**After Verification:**
1. Set verified status:
```javascript
localStorage.setItem('kycStatus', 'verified');
localStorage.setItem('kycLevel', 'tier1');
```
2. Click "Make a Donation"

**Expected:**
✅ No modal → Goes directly to `donate.html`
✅ Can complete donation flow

---

#### **B) Convert Flow**

**Steps:**
1. Clear localStorage
2. Open `dashboard.html`
3. Click "Buy Stablecoins"

**Expected:**
✅ KYC modal: "Verify to Buy Stablecoins"
✅ Benefits list:
  - Purchase hCAD, hUSD, hEUR
  - Instant conversions
  - Secure transactions

**After Verification:**
✅ Goes directly to `convert.html` (no modal)

---

#### **C) Send Flow**

**Steps:**
1. Clear localStorage
2. Open `dashboard.html`
3. Click "Send Stablecoins"

**Expected:**
✅ KYC modal: "Verify to Send Funds"
✅ Benefits list:
  - Send funds globally
  - Low transaction fees
  - Fast & secure transfers

**After Verification:**
✅ Goes directly to `send.html` (no modal)

---

### 6️⃣ **Test Mobile Responsive**

**Steps:**
1. Open Chrome DevTools (F12)
2. Toggle device toolbar (Ctrl+Shift+M)
3. Select iPhone 12 Pro or similar

**Test:**
- ✅ KYC modal: Should be full-width, scrollable
- ✅ kyc-verify.html: Stacked layout, large touch targets
- ✅ Stats grid: Single column on mobile
- ✅ Buttons: Full width, 44px minimum height
- ✅ Text: Readable (16px minimum)
- ✅ Icons: Visible and clear

---

### 7️⃣ **Test Accessibility**

#### **Keyboard Navigation:**
```
1. Tab through KYC modal
   ✅ Can reach close button
   ✅ Can reach "Start Verification"
   ✅ Can reach "I'll do this later"
   
2. Press Esc
   ✅ Modal closes
   
3. Tab through kyc-verify.html
   ✅ Can navigate all elements
   ✅ Focus visible on all interactive elements
```

#### **Screen Reader:**
```
1. Enable VoiceOver (Mac) or NVDA (Windows)
2. Navigate KYC modal
   ✅ All text announced correctly
   ✅ Button labels clear
   ✅ Close button: "Close modal"
   
3. Navigate kyc-verify.html
   ✅ Heading hierarchy correct
   ✅ Alt text on icons
   ✅ ARIA labels on interactive elements
```

#### **Color Contrast:**
```
Use Chrome DevTools Lighthouse:
1. Open kyc-verify.html
2. DevTools → Lighthouse → Accessibility
3. Run audit

✅ Target: 100% accessibility score
✅ All contrast ratios meet WCAG AAA (7:1)
```

---

### 8️⃣ **Test Error Scenarios**

#### **Scenario 1: Exit During Verification**
```
1. Start verification (kyc-verify.html)
2. Click "Exit" button
3. Confirm exit

Expected:
✅ Confirmation dialog: "Are you sure?"
✅ Returns to dashboard
✅ Badge shows "⚠️ Verification Required"
✅ Can resume later
```

#### **Scenario 2: Expired ID**
```
1. Start verification
2. In console: showStatus('rejected', { 
     reviewResult: { rejectLabels: ['EXPIRED_DOCUMENT'] } 
   })

Expected:
✅ Rejection screen
✅ Clear message: "ID expired - use current document"
✅ "Try Again" button works
```

#### **Scenario 3: Multiple Rejections**
```
1. Reject → Try Again
2. Reject → Try Again  
3. Reject → Try Again

Expected:
✅ No limit on retries
✅ Each attempt starts fresh
✅ Previous errors cleared
```

---

### 9️⃣ **Test LocalStorage Persistence**

**Steps:**
```javascript
// 1. Set verified status
localStorage.setItem('kycStatus', 'verified');
localStorage.setItem('kycLevel', 'tier1');
localStorage.setItem('kycVerifiedDate', new Date().toISOString());

// 2. Close browser tab
// 3. Reopen dashboard.html

Expected:
✅ Still shows "✓ Verified" badge
✅ No KYC modal on transaction attempts
✅ Data persists across sessions

// 4. Clear specific item
localStorage.removeItem('kycStatus');
// Refresh page

Expected:
✅ Badge shows "⚠️ Verification Required"
✅ KYC modal appears again
```

---

### 🔟 **Test Performance**

#### **Page Load Speed:**
```
1. Open Chrome DevTools → Network
2. Reload kyc-verify.html
3. Check metrics:

Expected:
✅ DOMContentLoaded: < 1s
✅ Load: < 2s
✅ First Contentful Paint: < 1s
✅ Largest Contentful Paint: < 2.5s
```

#### **Modal Animation:**
```
1. Click "Donate" (unverified)
2. Watch modal appear

Expected:
✅ Smooth fade-in (300ms)
✅ No jank or stuttering
✅ Backdrop blur effect smooth
```

#### **Sumsub SDK Load:**
```
1. kyc-verify.html → Start Verification
2. Time how long SDK takes to load

Expected:
✅ SDK iframe loads in < 3s
✅ Spinner or loading state shown
✅ No layout shift when SDK appears
```

---

## Automated Test Commands

### **Quick Test Script:**
```javascript
// Run in browser console on dashboard.html

// Test 1: Check KYC Modal Component Loaded
console.log('KYC Modal Loaded:', typeof KYCModal !== 'undefined' ? '✅' : '❌');

// Test 2: Check Methods Exist
console.log('isVerified:', typeof KYCModal.isVerified === 'function' ? '✅' : '❌');
console.log('getStatus:', typeof KYCModal.getStatus === 'function' ? '✅' : '❌');
console.log('checkAndProceed:', typeof KYCModal.checkAndProceed === 'function' ? '✅' : '❌');

// Test 3: Check Status Functions
localStorage.clear();
console.log('Status (cleared):', KYCModal.getStatus() === 'not_started' ? '✅' : '❌');
console.log('isVerified (not verified):', KYCModal.isVerified() === false ? '✅' : '❌');

localStorage.setItem('kycStatus', 'verified');
console.log('Status (verified):', KYCModal.getStatus() === 'verified' ? '✅' : '❌');
console.log('isVerified (verified):', KYCModal.isVerified() === true ? '✅' : '❌');

// Test 4: Show Modal
KYCModal.show('donate');
setTimeout(() => {
  const modal = document.getElementById('kycModal');
  console.log('Modal exists:', modal !== null ? '✅' : '❌');
  console.log('Modal visible:', modal && modal.querySelector('.kyc-modal-overlay.show') ? '✅' : '❌');
  KYCModal.hide();
}, 500);
```

---

## Production Checklist

Before deploying to production:

### **Backend Integration:**
- [ ] Set up Sumsub account
- [ ] Get API keys (App Token, Secret Key)
- [ ] Implement `/api/kyc/init` endpoint
- [ ] Implement `/api/kyc/webhook` endpoint
- [ ] Add webhook signature verification
- [ ] Set up database schema for KYC status
- [ ] Configure email notifications

### **Frontend:**
- [ ] Replace mock access token with real API call
- [ ] Add error handling for API failures
- [ ] Add retry logic for network errors
- [ ] Configure production Sumsub URLs
- [ ] Test with real documents
- [ ] Add analytics tracking (Google Analytics, Mixpanel)

### **Security:**
- [ ] Enable HTTPS (SSL certificate)
- [ ] Add CSRF protection
- [ ] Implement rate limiting on API endpoints
- [ ] Sanitize all user inputs
- [ ] Add Content Security Policy headers
- [ ] Enable CORS only for trusted domains
- [ ] Audit all localStorage usage (no sensitive data)

### **Compliance:**
- [ ] Privacy policy updated (mention Sumsub)
- [ ] Terms of service updated (KYC requirement)
- [ ] Data retention policy documented
- [ ] GDPR consent flow (if EU users)
- [ ] Right to deletion process
- [ ] Audit trail for all KYC events

### **Testing:**
- [ ] E2E tests (Cypress, Playwright)
- [ ] Unit tests for KYCModal component
- [ ] Integration tests for API endpoints
- [ ] Load testing (100+ concurrent verifications)
- [ ] Security testing (penetration test)
- [ ] Accessibility audit (WCAG AAA)
- [ ] Cross-browser testing (Chrome, Firefox, Safari, Edge)
- [ ] Mobile device testing (iOS, Android)

### **Monitoring:**
- [ ] Set up error tracking (Sentry, Rollbar)
- [ ] Add performance monitoring (New Relic, DataDog)
- [ ] Configure uptime monitoring (Pingdom, UptimeRobot)
- [ ] Track conversion funnel (signup → KYC → verified)
- [ ] Monitor approval rates (target: >90%)
- [ ] Track completion times (target: <7 min)
- [ ] Set up alerts for failures

---

## Common Issues & Solutions

### **Issue 1: Modal Not Appearing**
```
Symptoms: Click donate/buy/send, no modal
Debug:
1. Check console for errors
2. Verify kyc-modal.js is loaded
3. Check localStorage: KYCModal.getStatus()
4. Try: KYCModal.show('donate') in console

Solution:
- Ensure <script src="kyc-modal.js"> is before </body>
- Clear browser cache
- Check for JavaScript errors
```

### **Issue 2: Sumsub SDK Not Loading**
```
Symptoms: Blank iframe, SDK doesn't appear
Debug:
1. Check network tab for SDK script
2. Verify access token is generated
3. Check console for SDK errors

Solution:
- Ensure internet connection (SDK is external)
- Check Sumsub API keys are valid
- Verify SDK script URL is correct
```

### **Issue 3: LocalStorage Not Persisting**
```
Symptoms: Status resets on page reload
Debug:
1. Check browser settings (cookies/storage allowed)
2. Open DevTools → Application → Local Storage
3. Verify domain matches

Solution:
- Enable third-party cookies
- Check if in private/incognito mode
- Use sessionStorage as fallback
```

### **Issue 4: Badge Not Showing**
```
Symptoms: No badge on dashboard
Debug:
1. Check #kycStatusBadge element exists
2. Verify KYCModal.showStatusBadge() is called
3. Check console for errors

Solution:
- Ensure DOMContentLoaded fires before init
- Verify badge container ID is correct
- Check CSS is not hiding badge
```

---

## Support Resources

### **Sumsub Documentation:**
- Web SDK: https://developers.sumsub.com/api-reference/#web-sdk
- API Reference: https://developers.sumsub.com/api-reference/
- Webhooks: https://developers.sumsub.com/api-reference/#webhooks

### **Standards Reference:**
- WCAG AAA: https://www.w3.org/WAI/WCAG2AAA-Conformance
- NNG Heuristics: https://www.nngroup.com/articles/ten-usability-heuristics/
- Apple HIG: https://developer.apple.com/design/human-interface-guidelines/

### **Regulatory:**
- FinCEN: https://www.fincen.gov/
- FINTRAC: https://www.fintrac-canafe.gc.ca/
- GDPR: https://gdpr.eu/

---

**Testing Status:** ✅ Ready for QA

**Next:** Deploy to staging environment and run full regression tests.

🎉 **Happy Testing!**
