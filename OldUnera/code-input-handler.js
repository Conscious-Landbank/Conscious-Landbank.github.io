/**
 * Reusable Code Input Handler for OTP/Verification Codes
 * Provides auto-advance, backspace navigation, and paste support
 * 
 * Usage:
 *   initCodeInputs('.code-digit'); // Initialize all code inputs
 *   initCodeInputs('#myForm .code-digit'); // Initialize specific inputs
 */

function initCodeInputs(selector = '.code-digit') {
    const inputs = document.querySelectorAll(selector);
    
    if (!inputs || inputs.length === 0) {
        console.warn('No code inputs found with selector:', selector);
        return;
    }
    
    // Auto-focus first input
    if (inputs[0]) {
        inputs[0].focus();
    }
    
    inputs.forEach((input, index) => {
        // Handle input event - auto-advance
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            
            // Only allow numeric input
            if (!/^\d*$/.test(value)) {
                e.target.value = '';
                return;
            }
            
            // Keep only first character if multiple entered
            if (value.length > 1) {
                e.target.value = value.charAt(0);
            }
            
            // Add filled state
            if (e.target.value) {
                e.target.classList.add('filled');
                
                // Auto-advance to next input
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                    inputs[index + 1].select(); // Select any existing content
                }
            } else {
                e.target.classList.remove('filled');
            }
        });
        
        // Handle keydown - backspace navigation
        input.addEventListener('keydown', (e) => {
            // Backspace - move to previous input if current is empty
            if (e.key === 'Backspace') {
                if (!e.target.value && index > 0) {
                    e.preventDefault();
                    inputs[index - 1].focus();
                    inputs[index - 1].select();
                }
            }
            
            // Arrow left - move to previous input
            if (e.key === 'ArrowLeft' && index > 0) {
                e.preventDefault();
                inputs[index - 1].focus();
                inputs[index - 1].select();
            }
            
            // Arrow right - move to next input
            if (e.key === 'ArrowRight' && index < inputs.length - 1) {
                e.preventDefault();
                inputs[index + 1].focus();
                inputs[index + 1].select();
            }
        });
        
        // Handle paste event
        input.addEventListener('paste', (e) => {
            e.preventDefault();
            const pastedData = e.clipboardData.getData('text').replace(/\D/g, '');
            
            if (pastedData.length > 0) {
                // Fill inputs starting from current position
                pastedData.split('').forEach((char, i) => {
                    if (index + i < inputs.length) {
                        inputs[index + i].value = char;
                        inputs[index + i].classList.add('filled');
                    }
                });
                
                // Focus the last filled input or next empty one
                const nextIndex = Math.min(index + pastedData.length, inputs.length - 1);
                inputs[nextIndex].focus();
            }
        });
        
        // Clear error state on focus
        input.addEventListener('focus', () => {
            inputs.forEach(inp => inp.classList.remove('error'));
        });
        
        // Select all content on focus for easy replacement
        input.addEventListener('focus', (e) => {
            e.target.select();
        });
        
        // Prevent non-numeric keyboard input
        input.addEventListener('keypress', (e) => {
            if (!/^\d$/.test(e.key) && e.key !== 'Enter') {
                e.preventDefault();
            }
        });
    });
    
    console.log(`✅ Code input handler initialized for ${inputs.length} inputs`);
}

/**
 * Get the code value from code inputs
 */
function getCodeValue(selector = '.code-digit') {
    const inputs = document.querySelectorAll(selector);
    return Array.from(inputs).map(input => input.value).join('');
}

/**
 * Clear all code inputs
 */
function clearCodeInputs(selector = '.code-digit') {
    const inputs = document.querySelectorAll(selector);
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('filled', 'error');
    });
    if (inputs[0]) {
        inputs[0].focus();
    }
}

/**
 * Set error state on code inputs
 */
function setCodeInputError(selector = '.code-digit') {
    const inputs = document.querySelectorAll(selector);
    inputs.forEach(input => {
        input.classList.add('error');
    });
}

// Auto-initialize on DOM load if .code-digit elements exist
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        const codeInputs = document.querySelectorAll('.code-digit');
        if (codeInputs.length > 0) {
            initCodeInputs('.code-digit');
        }
    });
} else {
    // DOM already loaded
    const codeInputs = document.querySelectorAll('.code-digit');
    if (codeInputs.length > 0) {
        initCodeInputs('.code-digit');
    }
}
