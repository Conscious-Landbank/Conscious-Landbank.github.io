/**
 * Comprehensive Form Validation System
 * Following WCAG AAA accessibility standards and industry best practices
 * Based on research from leading fintech and web3 platforms
 */

const ValidationRules = {
    email: {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: 'Please enter a valid email address',
        examples: ['user@example.com']
    },
    phone: {
        pattern: /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/,
        message: 'Please enter a valid phone number',
        examples: ['+1 (555) 123-4567', '555-123-4567']
    },
    name: {
        pattern: /^[a-zA-Z\s'-]{2,50}$/,
        message: 'Name must be 2-50 characters and contain only letters, spaces, hyphens, and apostrophes',
        minLength: 2,
        maxLength: 50
    },
    password: {
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-zA-Z\d@$!%*?&#]{8,}$/,
        message: 'Password must be at least 8 characters with uppercase, lowercase, number, and special character',
        strengthCheck: true
    },
    walletAddress: {
        pattern: /^(0x)?[0-9a-fA-F]{40}$/,
        ensPattern: /^[a-z0-9-]+\.eth$/,
        message: 'Please enter a valid Ethereum address (0x...) or ENS name (.eth)',
        examples: ['0x742d35Cc6634C0532925a3b844Bc9e7595f3a8f', 'vitalik.eth']
    },
    amount: {
        min: 0.01,
        max: 1000000,
        pattern: /^\d+(\.\d{1,2})?$/,
        message: 'Please enter a valid amount (max 2 decimal places)',
    },
    cardNumber: {
        pattern: /^[0-9]{13,19}$/,
        message: 'Please enter a valid card number (13-19 digits)',
        luhnCheck: true
    },
    cvv: {
        pattern: /^[0-9]{3,4}$/,
        message: 'Please enter a valid CVV (3-4 digits)'
    },
    expiryDate: {
        pattern: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
        message: 'Please enter expiry date in MM/YY format',
        futureCheck: true
    },
    postalCode: {
        pattern: /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/,  // Canadian
        usPattern: /^\d{5}(-\d{4})?$/,  // US
        message: 'Please enter a valid postal/ZIP code'
    }
};

class FormValidator {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.errors = {};
        this.init();
    }

    init() {
        if (!this.form) return;

        // Add validation on blur for all inputs
        const inputs = this.form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearError(input));
            
            // Add ARIA attributes for accessibility
            if (!input.getAttribute('aria-describedby')) {
                const errorId = `${input.id || input.name}-error`;
                input.setAttribute('aria-describedby', errorId);
            }
        });

        // Prevent form submission if invalid
        this.form.addEventListener('submit', (e) => {
            if (!this.validateAll()) {
                e.preventDefault();
                this.focusFirstError();
            }
        });
    }

    validateField(input) {
        const value = input.value.trim();
        const type = input.getAttribute('data-validate') || input.type;
        const required = input.hasAttribute('required');
        
        // Clear previous error
        this.clearError(input);

        // Check if empty and required
        if (required && !value) {
            this.showError(input, `${this.getFieldLabel(input)} is required`);
            return false;
        }

        // Skip validation if empty and not required
        if (!value && !required) {
            return true;
        }

        // Type-specific validation
        switch (type) {
            case 'email':
                return this.validateEmail(input, value);
            case 'phone':
            case 'tel':
                return this.validatePhone(input, value);
            case 'password':
                return this.validatePassword(input, value);
            case 'wallet-address':
                return this.validateWalletAddress(input, value);
            case 'amount':
            case 'number':
                return this.validateAmount(input, value);
            case 'card-number':
                return this.validateCardNumber(input, value);
            case 'cvv':
                return this.validateCVV(input, value);
            case 'expiry':
                return this.validateExpiry(input, value);
            case 'text':
                return this.validateText(input, value);
            default:
                return true;
        }
    }

    validateEmail(input, value) {
        if (!ValidationRules.email.pattern.test(value)) {
            this.showError(input, ValidationRules.email.message);
            return false;
        }
        return true;
    }

    validatePhone(input, value) {
        // Remove formatting characters for validation
        const cleanPhone = value.replace(/[\s\-\(\)\.]/g, '');
        if (cleanPhone.length < 10 || cleanPhone.length > 15) {
            this.showError(input, ValidationRules.phone.message);
            return false;
        }
        return true;
    }

    validatePassword(input, value) {
        const rules = ValidationRules.password;
        
        if (value.length < rules.minLength) {
            this.showError(input, `Password must be at least ${rules.minLength} characters`);
            return false;
        }

        if (!rules.pattern.test(value)) {
            this.showError(input, rules.message);
            return false;
        }

        // Show password strength
        this.showPasswordStrength(input, value);
        return true;
    }

    validateWalletAddress(input, value) {
        const rules = ValidationRules.walletAddress;
        const isEthAddress = rules.pattern.test(value.replace(/^0x/, ''));
        const isENS = rules.ensPattern.test(value.toLowerCase());
        
        if (!isEthAddress && !isENS) {
            this.showError(input, rules.message);
            return false;
        }
        return true;
    }

    validateAmount(input, value) {
        const amount = parseFloat(value);
        const min = parseFloat(input.getAttribute('min')) || ValidationRules.amount.min;
        const max = parseFloat(input.getAttribute('max')) || ValidationRules.amount.max;
        
        if (isNaN(amount)) {
            this.showError(input, 'Please enter a valid number');
            return false;
        }

        if (amount < min) {
            this.showError(input, `Amount must be at least ${min}`);
            return false;
        }

        if (amount > max) {
            this.showError(input, `Amount cannot exceed ${max}`);
            return false;
        }

        if (!ValidationRules.amount.pattern.test(value)) {
            this.showError(input, ValidationRules.amount.message);
            return false;
        }

        return true;
    }

    validateCardNumber(input, value) {
        const cleanValue = value.replace(/\s/g, '');
        
        if (!ValidationRules.cardNumber.pattern.test(cleanValue)) {
            this.showError(input, ValidationRules.cardNumber.message);
            return false;
        }

        // Luhn algorithm check
        if (!this.luhnCheck(cleanValue)) {
            this.showError(input, 'Invalid card number');
            return false;
        }

        return true;
    }

    validateCVV(input, value) {
        if (!ValidationRules.cvv.pattern.test(value)) {
            this.showError(input, ValidationRules.cvv.message);
            return false;
        }
        return true;
    }

    validateExpiry(input, value) {
        if (!ValidationRules.expiryDate.pattern.test(value)) {
            this.showError(input, ValidationRules.expiryDate.message);
            return false;
        }

        // Check if date is in the future
        const [month, year] = value.split('/');
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const now = new Date();
        
        if (expiry < now) {
            this.showError(input, 'Card has expired');
            return false;
        }

        return true;
    }

    validateText(input, value) {
        const minLength = parseInt(input.getAttribute('minlength')) || 0;
        const maxLength = parseInt(input.getAttribute('maxlength')) || Infinity;
        
        if (value.length < minLength) {
            this.showError(input, `Must be at least ${minLength} characters`);
            return false;
        }

        if (value.length > maxLength) {
            this.showError(input, `Cannot exceed ${maxLength} characters`);
            return false;
        }

        return true;
    }

    luhnCheck(cardNumber) {
        let sum = 0;
        let isEven = false;

        for (let i = cardNumber.length - 1; i >= 0; i--) {
            let digit = parseInt(cardNumber.charAt(i));

            if (isEven) {
                digit *= 2;
                if (digit > 9) {
                    digit -= 9;
                }
            }

            sum += digit;
            isEven = !isEven;
        }

        return (sum % 10) === 0;
    }

    showPasswordStrength(input, password) {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (password.length >= 12) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[@$!%*?&#]/.test(password)) strength++;

        const strengthText = ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][Math.min(strength - 1, 4)];
        const strengthColor = ['#F97316', '#F59E0B', '#EAB308', '#10B981', '#059669'][Math.min(strength - 1, 4)];

        // Find or create strength indicator
        let strengthDiv = input.parentElement.querySelector('.password-strength');
        if (!strengthDiv) {
            strengthDiv = document.createElement('div');
            strengthDiv.className = 'password-strength';
            strengthDiv.style.cssText = 'margin-top: 0.5rem; font-size: 0.813rem; font-weight: 600;';
            input.parentElement.appendChild(strengthDiv);
        }

        strengthDiv.textContent = `Strength: ${strengthText}`;
        strengthDiv.style.color = strengthColor;
    }

    showError(input, message) {
        const errorId = input.getAttribute('aria-describedby') || `${input.id || input.name}-error`;
        let errorDiv = document.getElementById(errorId);

        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.id = errorId;
            errorDiv.className = 'input-error';
            errorDiv.setAttribute('role', 'alert');
            errorDiv.style.cssText = 'color: #DC2626; font-size: 0.813rem; margin-top: 0.5rem; display: flex; align-items: start; gap: 0.375rem;';
            
            const icon = document.createElement('span');
            icon.innerHTML = '⚠️';
            icon.style.flexShrink = '0';
            errorDiv.appendChild(icon);
            
            const text = document.createElement('span');
            text.textContent = message;
            errorDiv.appendChild(text);
            
            input.parentElement.appendChild(errorDiv);
        } else {
            errorDiv.querySelector('span:last-child').textContent = message;
            errorDiv.style.display = 'flex';
        }

        // Update input styling
        input.style.borderColor = '#DC2626';
        input.setAttribute('aria-invalid', 'true');
        
        // Store error
        this.errors[input.name || input.id] = message;
    }

    clearError(input) {
        const errorId = input.getAttribute('aria-describedby') || `${input.id || input.name}-error`;
        const errorDiv = document.getElementById(errorId);

        if (errorDiv) {
            errorDiv.style.display = 'none';
        }

        // Reset input styling
        input.style.borderColor = '';
        input.removeAttribute('aria-invalid');
        
        // Remove from errors
        delete this.errors[input.name || input.id];
    }

    validateAll() {
        const inputs = this.form.querySelectorAll('input:not([disabled]), textarea:not([disabled]), select:not([disabled])');
        let isValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });

        return isValid;
    }

    focusFirstError() {
        const firstError = this.form.querySelector('[aria-invalid="true"]');
        if (firstError) {
            firstError.focus();
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    getFieldLabel(input) {
        const label = this.form.querySelector(`label[for="${input.id}"]`);
        return label ? label.textContent.replace('*', '').trim() : 'This field';
    }
}

// Auto-formatting helpers
function formatCardNumber(input) {
    let value = input.value.replace(/\s/g, '');
    let formatted = value.match(/.{1,4}/g)?.join(' ') || value;
    input.value = formatted;
}

function formatExpiry(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    input.value = value;
}

function formatPhone(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 10) value = value.substring(0, 10);
    
    if (value.length >= 6) {
        value = `(${value.substring(0, 3)}) ${value.substring(3, 6)}-${value.substring(6)}`;
    } else if (value.length >= 3) {
        value = `(${value.substring(0, 3)}) ${value.substring(3)}`;
    }
    
    input.value = value;
}

// Export for use in HTML pages
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FormValidator, ValidationRules, formatCardNumber, formatExpiry, formatPhone };
}
