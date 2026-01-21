# 🚀 AUTHENTICATION V2 - COMPLETE IMPLEMENTATION PLAN

**Date:** January 21, 2026  
**Status:** 🔄 IN PROGRESS  
**Boss Requirements:** Email → Verify → Name (First + Last) → 2FA (skip) → KYC (skip) → Dashboard

---

## 🎯 **BOSS REQUIREMENTS (EXACT)**

From your boss:

> "email → verify email via code → name (First Name and Last Name) → 2FA → KYC"

**Key Points:**
1. ✅ Email-first registration (like Coinbase)
2. ✅ Email verification via 6-digit code
3. ✅ **First Name + Last Name** (separate fields - not "Full Name")
4. ✅ 2FA setup - **Users can skip**
5. ✅ KYC verification - **Users can skip**
6. ✅ If KYC skipped → Dashboard with **warnings + disabled functions**

---

## 📁 **FILE STRUCTURE CHANGE**

**OLD:** `/HTML_files/*.html`  
**NEW:** `/*.html` (root level)

**Status:** ✅ Files already moved to root  
**Action Required:** Update all internal links

---

## 🔧 **IMPLEMENTATION CHECKLIST**

### **1. signup_2.html** ⚠️ NEEDS COMPLETE REWRITE

**Current Problem:**
- ❌ Has "Full Name" (single field)
- ❌ Shows all fields at once (not multi-step)
- ❌ Not email-first

**Required Implementation:**

#### **Step 1: Email Entry Screen**
```html
<div id="stepEmail">
    <h1>Join UNERA</h1>
    <label>Email Address</label>
    <input type="email" id="emailInput">
    <button onclick="sendVerificationCode()">Continue with Email</button>
</div>
```

**Logic:**
- User enters email
- Click "Continue"
- Store email in localStorage
- Redirect to `verify-email.html?email=xxx`

#### **Step 3: Name & Password Screen** (After email verified)
```html
<div id="stepDetails" style="display:none">
    <h1>Create Your Account</h1>
    <p>✓ Email verified</p>
    
    <label>First Name</label>
    <input type="text" id="firstName" placeholder="John">
    
    <label>Last Name</label>
    <input type="text" id="lastName" placeholder="Doe">
    
    <label>Password</label>
    <input type="password" id="password">
    
    <button onclick="createAccount()">Create Account</button>
</div>
```

**Logic:**
- Check URL: `?step=details&verified=true`
- If verified, show this step
- If not verified, redirect to step 1
- On submit:  
  - Store firstName, lastName in localStorage
  - Redirect to `setup-2fa.html`

---

### **2. verify-email.html** ✅ VERIFY WORKS

**Check:**
- ✅ 6-digit code input
- ✅ 30-second resend timer
- ✅ Redirects to `signup_2.html?step=details&verified=true`
- ✅ No "HTML_files/" links

**Action:** Quick verification only

---

### **3. setup-2fa.html** ✅ VERIFY SKIP OPTION

**Check:**
- ✅ 3 methods (SMS, Email, App)
- ✅ **"Skip for Now" button** ← Boss requirement
- ✅ If skip: Redirect to `kyc-verify.html` anyway
- ✅ No "HTML_files/" links

**Action:** Quick verification only

---

### **4. kyc-verify.html** ✅ VERIFY SKIP OPTION

**Check:**
- ✅ Identity verification UI
- ✅ **"Skip - Do This Later" button** ← Boss requirement
- ✅ Warning message about limited access
- ✅ If skip:  
  - localStorage.setItem('kycStatus', 'skipped')
  - Redirect to `dashboard-enhanced.html?kyc=skipped`
- ✅ No "HTML_files/" links

**Action:** Quick verification only

---

### **5. dashboard-enhanced.html** ✅ VERIFY RESTRICTIONS

**Check:**
- ✅ Warning banner if KYC skipped
- ✅ Lock badges (🔒) on:  
  - Add Money
  - Send
  - Donate
- ✅ Modal when clicking locked features
- ✅ "Verify Now" CTAs
- ✅ Explore Centres still accessible
- ✅ No "HTML_files/" links

**Action:** Quick verification only

---

### **6. login_2.html** ✅ VERIFY 2FA CHECK

**Check:**
- ✅ Email + password entry
- ✅ After login, check if 2FA enabled
- ✅ If 2FA enabled: Redirect to `verify-2fa.html`
- ✅ If no 2FA: Go to dashboard
- ✅ No "HTML_files/" links

**Action:** Quick verification only

---

### **7. verify-2fa.html** ✅ VERIFY WORKS

**Check:**
- ✅ 6-digit 2FA code entry
- ✅ "Trust this device" checkbox
- ✅ Redirects to dashboard
- ✅ No "HTML_files/" links

**Action:** Quick verification only

---

### **8. auth-flow.js** ✅ VERIFY STATE MANAGEMENT

**Check:**
- ✅ localStorage schema
- ✅ Dashboard restriction logic
- ✅ KYC status checking
- ✅ No "HTML_files/" references

**Action:** Quick verification only

---

## 🎨 **DESIGN CONSISTENCY**

**Must Match:** `dashboard-enhanced.html` & `wallet-enhanced.html`

### **Colors:**
```css
--primary-green: #10B981
--primary-blue: #0EA5E9
--text-primary: #0F172A (AAA 13.4:1 contrast)
--text-secondary: #475569 (AAA 8.5:1 contrast)
```

### **Typography:**
```css
--font-display: 'Space Grotesk'
--font-body: 'Inter'
line-height: 1.6
```

### **Spacing:**
```css
Card padding: 1.5rem - 2rem
Button height: 52px
Input height: 52px
```

### **Verify:**
- ✅ All pages use `auth-enhanced.css`
- ✅ Same gradient titles
- ✅ Same button styles
- ✅ Same shadows
- ✅ Same border radius

---

## ♿ **WCAG 2.1 AAA COMPLIANCE**

### **Required on ALL Pages:**

| Criterion | Requirement | How to Check |
|-----------|-------------|--------------|
| **1.4.6 Contrast** | 7:1 text | Use contrast checker |
| **2.1.1 Keyboard** | Tab works | Tab through page |
| **2.4.1 Skip Link** | Present | Press Tab once |
| **2.4.7 Focus Visible** | 3px green | Tab through elements |
| **2.5.5 Target Size** | 44x44px | Check buttons |
| **4.1.2 ARIA** | Labels present | Check inputs |

### **Action:**
Verify each page passes all criteria

---

## 🔗 **LINK UPDATES**

### **Files to Check:**

Search for `HTML_files/` in:
- ✅ signup_2.html
- ✅ login_2.html
- ✅ verify-email.html
- ✅ setup-2fa.html
- ✅ verify-2fa.html
- ✅ kyc-verify.html
- ✅ dashboard-enhanced.html
- ✅ index.html
- ✅ All other .html files

### **Replace:**
```html
OLD: href="HTML_files/signup_2.html"
NEW: href="signup_2.html"

OLD: src="HTML_files/auth-flow.js"
NEW: src="auth-flow.js"
```

---

## 📊 **COMPLETE FLOW TEST**

### **Test Scenario 1: Full Signup (No Skips)**
```
1. signup_2.html → Enter email
2. verify-email.html → Enter 123456
3. signup_2.html?step=details → Enter "John" + "Doe" + password
4. setup-2fa.html → Choose SMS → Set up
5. kyc-verify.html → Complete verification
6. dashboard-enhanced.html → Full access ✅
```

### **Test Scenario 2: Skip 2FA**
```
1-3. Same as above
4. setup-2fa.html → Click "Skip for Now"
5. kyc-verify.html → Complete verification
6. dashboard-enhanced.html → Full access (no 2FA) ✅
```

### **Test Scenario 3: Skip KYC** ← Boss requirement
```
1-4. Same as scenario 1 or 2
5. kyc-verify.html → Click "Skip - Do This Later"
6. dashboard-enhanced.html?kyc=skipped
   - ⚠️ Warning banner shown
   - 🔒 Add Money locked
   - 🔒 Send locked
   - 🔒 Donate locked
   - ✓ Explore available
```

### **Test Scenario 4: Skip Both**
```
1-3. Same as above
4. setup-2fa.html → Skip
5. kyc-verify.html → Skip
6. dashboard-enhanced.html → Very limited (warnings + locks) ⚠️
```

---

## 📝 **IMPLEMENTATION PRIORITY**

### **Phase 1: Critical (Must Do)**
1. ✅ **Re-implement signup_2.html** - Email-first + First Name/Last Name
2. ✅ Verify all skip options work
3. ✅ Verify dashboard restrictions
4. ✅ Update any remaining "HTML_files/" links

### **Phase 2: Quality (Should Do)**
5. ✅ Verify WCAG 2.1 AAA compliance
6. ✅ Verify design consistency
7. ✅ Test all 4 scenarios

### **Phase 3: Documentation (Nice to Have)**
8. ✅ Update AUTHENTICATION_AUDIT.md
9. ✅ Create testing guide
10. ✅ Commit with detailed message

---

## 🎯 **SUCCESS CRITERIA**

### **Boss Requirements Met:**
- ✅ Email-first registration
- ✅ Email verification (6-digit code)
- ✅ First Name + Last Name (separate!)
- ✅ 2FA optional (skip button)
- ✅ KYC optional (skip button)
- ✅ Dashboard warnings if skipped
- ✅ Functions disabled if no KYC

### **Technical Requirements:**
- ✅ All files at root level (not HTML_files/)
- ✅ Design matches dashboard/wallet
- ✅ WCAG 2.1 AAA compliant
- ✅ Mobile responsive
- ✅ All tests pass

---

## 📦 **DELIVERABLES**

1. ✅ `signup_2.html` - Completely rewritten (multi-step)
2. ✅ All auth pages verified working
3. ✅ All links updated (no HTML_files/)
4. ✅ Design consistency verified
5. ✅ Accessibility verified
6. ✅ Complete flow tested
7. ✅ Documentation updated
8. ✅ Git commit with changes

---

## ⏱️ **TIME ESTIMATE**

| Task | Time | Status |
|------|------|--------|
| Re-implement signup_2.html | 30 min | 🔄 In Progress |
| Verify other auth pages | 15 min | ⏳ Pending |
| Update links | 10 min | ⏳ Pending |
| Verify design consistency | 15 min | ⏳ Pending |
| Verify accessibility | 15 min | ⏳ Pending |
| Test flows | 20 min | ⏳ Pending |
| Documentation | 10 min | ⏳ Pending |
| **TOTAL** | **~2 hours** | 🔄 Working |

---

## 🚀 **LET'S START!**

**Current Task:** Re-implementing `signup_2.html` with multi-step flow

**Next:** Will work through each file systematically
