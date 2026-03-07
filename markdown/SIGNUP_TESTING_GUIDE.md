# Signup Flow Testing Guide

## Quick Testing Instructions

### Test 1: Complete Signup Flow (Happy Path)

1. **Navigate to** `http://localhost:8080/signup_2.html`

2. **Step 1 - Create Account:**
   - Enter email: `test@example.com`
   - Enter password: `Test123!@#` (meets requirements: 8+ chars, number, special character)
   - Click "Continue"
   - ✅ Should redirect to email verification page

3. **Step 2 - Verify Email:**
   - Enter any 6-digit code (e.g., `123456`)
   - ✅ Code auto-advances as you type
   - ✅ Auto-submits when all 6 digits are entered
   - ✅ Should show "Verified!" and redirect to Step 3

4. **Step 3 - Complete Profile:**
   - Enter First Name: `John`
   - Enter Last Name: `Doe`
   - Select Country: Should auto-detect (or select manually)
   - Check "I agree to Terms..." checkbox
   - Click "Create Account"
   - ✅ Should show "Account Created!"
   - ✅ Should redirect to 2FA setup page
   - ✅ Can skip and access dashboard

### Test 2: Email Verification Enforcement

1. **Start signup but don't verify email:**
   - Navigate to `http://localhost:8080/signup_2.html`
   - Enter email: `unverified@example.com`
   - Enter password: `Test123!@#`
   - Click "Continue"
   - **DO NOT** enter verification code
   - Close browser tab

2. **Try to login without verification:**
   - Navigate to `http://localhost:8080/login_2.html`
   - Enter email: `unverified@example.com`
   - Enter password: `Test123!@#`
   - Click "Sign In"
   - ✅ Should show alert: "Your email is not verified..."
   - ✅ Should redirect to email verification page
   - ✅ Header should say "Verify Your Email"

3. **Verify email from login:**
   - Enter any 6-digit code (e.g., `123456`)
   - Click "Verify & Continue"
   - ✅ Should show "Verified!"
   - ✅ Should redirect to dashboard (or 2FA if enabled)

### Test 3: Password Validation

1. **Navigate to** `http://localhost:8080/signup_2.html`

2. **Test weak passwords (should fail):**
   - Enter email: `test2@example.com`
   - Try password: `test` → ❌ "Password must be at least 8 characters"
   - Try password: `testtest` → ❌ "Password must contain at least one number"
   - Try password: `testtest1` → ❌ "Password must contain at least one special character"
   - Try password: `Test123!@#` → ✅ Should pass

### Test 4: Field Validation

1. **Test Step 1 validations:**
   - Invalid email format → ❌ Error message
   - Empty email → ❌ Error message
   - Empty password → ❌ Error message
   - Weak password → ❌ Error message

2. **Test Step 3 validations:**
   - Empty first name → ❌ "First name is required"
   - Name with numbers → ❌ "First name can only contain letters"
   - No country selected → ❌ "Please select your country"
   - Terms not accepted → ❌ Alert message

### Test 5: Navigation & Back Button

1. **Test back navigation:**
   - Start signup → Step 1
   - Click Continue → Step 2 (verification)
   - Click "Back" or "Change email" → ✅ Should return to Step 1
   - Enter code → Step 3
   - ✅ Browser back button should work

### Test 6: Resend Code

1. **Navigate to verification page:**
   - Start signup flow → reach Step 2
   - Wait for 30 seconds
   - ✅ "Resend Code" button should become enabled
   - Click "Resend Code"
   - ✅ Should show "Code Sent!"
   - ✅ All digits should clear
   - ✅ Timer should restart (30s)

### Test 7: Country Auto-Detection

1. **Navigate to Step 3:**
   - Complete Steps 1 & 2
   - Reach Step 3 (Complete Profile)
   - ✅ Country dropdown should have a pre-selected value
   - ✅ Value should match your timezone/location
   - ✅ Can change country manually

### Test 8: Step Indicators

1. **Check step progression:**
   - Step 1 header → ✅ "Step 1 of 3 • Start your impact journey"
   - Step 2 header → ✅ "Step 2 of 3 • We sent a 6-digit code to:"
   - Step 3 header → ✅ "✓ Email verified • Step 3 of 3"

---

## Browser Console Testing

Open Browser DevTools (F12) → Console tab

### Check localStorage values:

**After Step 1:**
```javascript
localStorage.getItem('signupEmail') // Should show your email
localStorage.getItem('signupPassword') // Should show your password
localStorage.getItem('emailVerified') // Should be 'false'
```

**After Step 2:**
```javascript
localStorage.getItem('emailVerified') // Should be 'true'
localStorage.getItem('verificationCode') // Should show the code
```

**After Step 3:**
```javascript
localStorage.getItem('userFirstName') // Should show first name
localStorage.getItem('userLastName') // Should show last name
localStorage.getItem('userCountry') // Should show country code
localStorage.getItem('accountLevel') // Should be 'Level 1 - Registered'
localStorage.getItem('isLoggedIn') // Should be 'true'
```

### Simulate unverified email:

1. Complete Step 1 but skip Step 2
2. In console, run:
```javascript
localStorage.setItem('emailVerified', 'false')
```
3. Try to login → should trigger verification resend

### Clear all data and restart:

```javascript
localStorage.clear()
location.reload()
```

---

## Visual Checks

### Step 1 (signup_2.html):
- ✅ Email input field
- ✅ Password input field (with show/hide toggle)
- ✅ "Continue" button
- ✅ Social login buttons (Google, Apple, Microsoft)
- ✅ "Already have an account? Log in" link
- ✅ Header shows "Step 1 of 3"

### Step 2 (verify-email.html):
- ✅ Six digit input boxes
- ✅ Email address displayed
- ✅ "Verify & Continue" button
- ✅ "Resend Code" button (disabled for 30s)
- ✅ Timer countdown
- ✅ "Change email" and "Need help?" links
- ✅ Header shows "Step 2 of 3"

### Step 3 (signup_2.html?step=details):
- ✅ First Name input
- ✅ Last Name input
- ✅ Country dropdown (with many countries)
- ✅ Terms & Privacy checkbox
- ✅ "Create Account" button
- ✅ "Already have an account? Log in" link
- ✅ Header shows "Step 3 of 3" and "✓ Email verified"

---

## Expected Behavior Summary

| Action | Expected Result |
|--------|----------------|
| Submit Step 1 with valid data | Redirect to verify-email.html |
| Submit Step 1 with invalid email | Show error message |
| Submit Step 1 with weak password | Show password requirements error |
| Enter 6th digit in verification | Auto-submit verification |
| Submit valid verification code | Redirect to Step 3 |
| Submit Step 3 without terms | Show alert "Please accept terms" |
| Submit Step 3 with valid data | Create account and redirect to 2FA |
| Login with unverified email | Resend code and redirect to verification |
| Login with verified email | Access dashboard (or 2FA) |
| Click "Resend Code" before 30s | Button disabled |
| Click "Resend Code" after 30s | Send new code and restart timer |

---

## Common Issues & Solutions

### Issue: Password field not showing
**Solution:** Clear browser cache and reload

### Issue: Country not auto-detected
**Solution:** This is normal - timezone mapping is basic. User can select manually.

### Issue: Verification code not working
**Solution:** In demo mode, any 6-digit code works. In production, verify with backend.

### Issue: Redirect not working after verification
**Solution:** Check if localStorage has correct values. Use console commands above.

### Issue: Can't access dashboard without verification
**Solution:** This is the correct behavior! Must verify email first.

---

## Production Checklist

Before deploying to production:

- [ ] Replace localStorage with secure backend API calls
- [ ] Implement real email sending service
- [ ] Add server-side validation for all fields
- [ ] Implement token-based verification codes with expiry
- [ ] Add rate limiting for resend code functionality
- [ ] Use secure password hashing (never store plain text)
- [ ] Implement IP-based geolocation for country detection
- [ ] Add CSRF protection
- [ ] Add reCAPTCHA or similar bot protection
- [ ] Implement email bounce handling
- [ ] Add monitoring and logging
- [ ] Test with real email addresses
- [ ] Test on multiple devices and browsers
- [ ] Verify accessibility compliance

---

## Contact

If you encounter any issues during testing, please document:
1. What step you were on
2. What action you took
3. What you expected to happen
4. What actually happened
5. Browser and OS version
6. Console error messages (if any)
