# 🧪 Wallet Access Verification Guide

## ✅ How to Test All Entry Points

### 🔐 **IMPORTANT: Login First!**

**Some entry points only appear when logged in.** Follow these steps:

---

## Step 1️⃣: Simulate Login

Open browser console (F12) and run:
```javascript
localStorage.setItem('isLoggedIn', 'true');
localStorage.setItem('userName', 'Test User');
localStorage.setItem('userEmail', 'test@unera.com');
localStorage.setItem('userInitials', 'TU');
localStorage.setItem('walletAddress', '0x742d...3a8f');
location.reload();
```

**OR** use the Quick Login Button on instructions.html:
1. Go to: http://localhost:8000/HTML_files/instructions.html
2. Scroll to bottom
3. Click "🔐 Quick Login (Test)"
4. Page reloads - you're now "logged in"

---

## Step 2️⃣: Test Entry Points

### ✅ Test 1: Landing Page Navigation
**URL:** http://localhost:8000/HTML_files/index.html

**What to check:**
- [ ] Look at top navigation bar
- [ ] Should see: "How It Works | Impact | Centres | Dashboard | **Wallet**"
- [ ] **Wallet** link should be visible (after login)
- [ ] Click "Wallet" → Should navigate to wallet page

**Expected result:** ✅ Wallet link visible and working

**If NOT visible:** You're not logged in (see Step 1)

---

### ✅ Test 2: Landing Page Profile Dropdown
**URL:** http://localhost:8000/HTML_files/index.html

**What to check:**
- [ ] Look at top-right corner
- [ ] Should see user avatar with initials (e.g., "TU" or "JS")
- [ ] Click the avatar
- [ ] Dropdown menu appears
- [ ] Should see these items:
  - My Profile
  - Account Settings
  - **My Wallet** ← NEW!
  - Dashboard
  - [divider]
  - Log Out
- [ ] Click "My Wallet" → Should navigate to wallet page

**Expected result:** ✅ "My Wallet" in dropdown, clicking works

---

### ✅ Test 3: Dashboard Top Navigation
**URL:** http://localhost:8000/HTML_files/dashboard.html

**What to check:**
- [ ] Look at top navigation bar
- [ ] Should see: "DASHBOARD | **WALLET** | IMPACT | CENTRES | PORTFOLIO"
- [ ] **WALLET** should be second item (after DASHBOARD)
- [ ] Click "WALLET" → Should navigate to wallet page

**Expected result:** ✅ WALLET link visible and working

**Note:** Dashboard assumes you're logged in, so link always shows

---

### ✅ Test 4: Dashboard Quick Actions Card
**URL:** http://localhost:8000/HTML_files/dashboard.html

**What to check:**
- [ ] Scroll down to "Quick Actions" section (below balance cards)
- [ ] First card should be **highlighted** with:
  - Gradient background (light green-blue)
  - Green border (2px solid)
  - Wallet icon
  - Title: "**My Wallet**" (in green text)
  - Description: "View balances & transactions"
- [ ] Card should stand out from other cards
- [ ] Click the card → Should navigate to wallet page

**Expected result:** ✅ Wallet card is first, highlighted, and working

**Visual check:**
```
╔═══════════════════════════════╗  ← Green border
║  💳 (gradient icon)          ║  ← Gradient background
║  My Wallet (green text)      ║
║  View balances & transactions║
╚═══════════════════════════════╝
```

---

### ✅ Test 5: Wallet Modal Scrollbar
**URL:** http://localhost:8000/HTML_files/wallet.html

**What to check:**
- [ ] Page loads successfully
- [ ] See 5 balance cards at top
- [ ] See transaction list below
- [ ] Click any transaction item (e.g., "Received from Alice Johnson")
- [ ] Modal pops up with transaction details
- [ ] **Check modal right edge:**
  - [ ] NO visible scrollbar ❌
  - [ ] Clean, professional look ✅
- [ ] **But try scrolling inside modal:**
  - [ ] If content is long, should still scroll smoothly
  - [ ] Scrollbar just isn't visible

**Expected result:** ✅ No scrollbar visible, but modal is scrollable

**Visual check:**
```
┌─────────────────────────────┐
│ Transaction Details      [X]│ ← No scrollbar here!
├─────────────────────────────┤
│ Transaction ID: TX-...      │
│ Date & Time: ...            │
│ Status: Completed           │
│ From: ...                   │
│ To: ...                     │ ← Clean right edge
│ Amount: ...                 │
│ Fee: ...                    │
└─────────────────────────────┘
```

---

## 📊 Verification Checklist

### Overall Test Results:
- [ ] ✅ Test 1: Landing page nav link (with login)
- [ ] ✅ Test 2: Landing page dropdown (with login)
- [ ] ✅ Test 3: Dashboard top nav
- [ ] ✅ Test 4: Dashboard quick action card (highlighted)
- [ ] ✅ Test 5: Modal has no scrollbar (but is scrollable)

### All 5 entry points working?
- [ ] YES - Everything works! 🎉
- [ ] NO - See troubleshooting below

---

## 🔧 Troubleshooting

### Issue: "Wallet link not showing on landing page"
**Cause:** Not logged in  
**Fix:** Run Step 1 (simulate login) first

### Issue: "Profile dropdown doesn't show"
**Cause:** Not logged in  
**Fix:** Run Step 1 (simulate login) first

### Issue: "Dashboard links work, but landing page doesn't"
**Cause:** Login state lost or not set  
**Fix:** Check browser console:
```javascript
console.log(localStorage.getItem('isLoggedIn')); // Should be 'true'
```

### Issue: "Modal still has scrollbar"
**Cause:** Browser CSS not loading properly  
**Fix:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Issue: "Can't scroll in modal"
**Cause:** Shouldn't happen - modal is scrollable  
**Fix:** Check if transaction has enough content to scroll

---

## 🎯 Quick Test Script

Run this in browser console on any page:
```javascript
// Quick test: Check if wallet is accessible
console.log('=== WALLET ACCESS TEST ===');
console.log('Logged in:', localStorage.getItem('isLoggedIn'));
console.log('Dashboard link exists:', !!document.getElementById('dashboardLink'));
console.log('Wallet link exists:', !!document.getElementById('walletLink'));
console.log('User profile exists:', !!document.getElementById('userProfileNav'));
console.log('');
console.log('To login, run:');
console.log('localStorage.setItem("isLoggedIn", "true"); location.reload();');
```

---

## ✅ Expected Test Results Summary

| Entry Point | Page | Requires Login | Should Work |
|-------------|------|----------------|-------------|
| Nav link | index.html | YES ✅ | ✅ |
| Profile dropdown | index.html | YES ✅ | ✅ |
| Nav link | dashboard.html | NO | ✅ |
| Quick action | dashboard.html | NO | ✅ |
| Modal no scrollbar | wallet.html | NO | ✅ |

**Total entry points:** 5  
**Expected working:** 5/5 ✅

---

## 🚀 Test Scenarios

### Scenario A: First-Time User
1. Visit index.html (not logged in)
2. **Expected:** No wallet link (login required)
3. Simulate login (Step 1)
4. Reload page
5. **Expected:** Wallet link appears! ✅

### Scenario B: Logged-In User on Dashboard
1. Visit dashboard.html (assumes logged in)
2. **Expected:** See "WALLET" in nav ✅
3. **Expected:** See highlighted "My Wallet" card ✅
4. Click either one
5. **Expected:** Navigate to wallet.html ✅

### Scenario C: Checking Transaction Details
1. Visit wallet.html directly
2. Scroll to transaction list
3. Click "Received from Alice Johnson"
4. **Expected:** Modal opens ✅
5. **Expected:** No scrollbar on modal ✅
6. Try to scroll inside modal
7. **Expected:** Scrolls smoothly (if content is long) ✅

---

## 📸 Visual Verification

### Landing Page (Logged In)
```
┌─────────────────────────────────────────────────┐
│ UNERA  How It Works | Impact | Centres |       │
│        Dashboard | Wallet 👤 [TU ▼]             │
└─────────────────────────────────────────────────┘
                         ↑        ↑
                    New link  Dropdown
```

### Dashboard Top Nav
```
┌─────────────────────────────────────────────────┐
│ UNERA  DASHBOARD | WALLET | IMPACT | CENTRES |  │
│        PORTFOLIO                        👤 [JS ▼]│
└─────────────────────────────────────────────────┘
                     ↑
                  New link
```

### Dashboard Quick Actions
```
┌──────────────────┐ ┌──────────────────┐
│ 💳 My Wallet     │ │ 💳 Buy Stable... │
│ View balances &  │ │ hCAD, hUSD...    │
│ transactions     │ │                  │
└──────────────────┘ └──────────────────┘
    ↑ Highlighted!      Normal card
```

### Wallet Modal (No Scrollbar)
```
   ┌───────────────────────────┐
   │ Transaction Details    [X]│
   ├───────────────────────────┤
   │ Transaction ID: TX-...    │
   │ Date & Time: Jan 15...    │ } Clean
   │ Status: Completed         │ } right
   │ From: Your hCAD Wallet    │ } edge!
   │ To: Nairobi HC            │ } No
   │ Amount: 250.00 hCAD       │ } scrollbar
   │ Fee: 0.50 hCAD            │ }
   │ HUMA Earned: 25 HUMA      │ }
   │ Reference: Monthly...     │ }
   └───────────────────────────┘
          ↑ But scrollable if needed
```

---

## 🎉 Success Criteria

### All tests pass when:
✅ Wallet link appears in nav (after login)  
✅ "My Wallet" in profile dropdown (after login)  
✅ "WALLET" shows in dashboard nav  
✅ Wallet card is first and highlighted in quick actions  
✅ Modal opens without scrollbar  
✅ Modal is still scrollable  
✅ All links navigate to wallet.html correctly  

---

## 📝 Notes

- **Login simulation** is for testing only
- In production, actual auth system will set these values
- Dashboard assumes user is authenticated
- Wallet page works without login (direct access)
- Modal scrollbar fix applies to all modals on wallet page

---

## 🆘 Need Help?

If any test fails:
1. Check browser console for errors (F12)
2. Verify you're using correct URLs
3. Ensure local server is running on port 8000
4. Try hard refresh (Ctrl+Shift+R)
5. Check localStorage in console: `localStorage`

---

*Test guide created: January 15, 2026*  
*All 5 entry points should be functional*  
*Happy testing! 🚀*
