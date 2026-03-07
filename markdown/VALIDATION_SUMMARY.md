# Comprehensive Form Validation System

## ✅ What's Included

### Validation Rules for All Field Types:
1. **Email** - RFC 5322 compliant pattern
2. **Phone** - International format support (10-15 digits)
3. **Name** - 2-50 characters, letters/spaces/hyphens only
4. **Password** - Min 8 chars, uppercase, lowercase, number, special char + strength meter
5. **Wallet Address** - Ethereum (0x...) + ENS (.eth) support
6. **Amount** - Min/max validation, 2 decimal places max
7. **Card Number** - 13-19 digits + Luhn algorithm check
8. **CVV** - 3-4 digits
9. **Expiry Date** - MM/YY format + future date check
10. **Postal Code** - Canadian & US formats

### Features:
✅ Real-time validation on blur
✅ Instant error clearing on input
✅ WCAG AAA accessible (ARIA labels, role="alert")
✅ Luhn algorithm for card validation
✅ Password strength indicator
✅ Auto-formatting (card, phone, expiry)
✅ Focus management (jumps to first error)
✅ Visual error indicators (⚠️ icons, red borders)
✅ Helpful error messages with examples

## 📋 Pages to Update

1. ✅ validation.js created
2. ⏳ donate.html - Add validation
3. ⏳ send.html - Add validation
4. ⏳ convert.html - Add validation
5. ⏳ signup_2.html - Add validation
6. ⏳ login_2.html - Add validation
7. ⏳ kyc.html - Add validation
8. ⏳ wallet-creation.html - Add validation

## 🔧 How to Apply

Add to each HTML file before closing `</body>`:

```html
<!-- Validation Script -->
<script src="validation.js"></script>
<script>
    // Initialize validator for your form
    const validator = new FormValidator('yourFormId');
    
    // Add data-validate attributes to inputs
    // Example: <input data-validate="email" required>
</script>
```
