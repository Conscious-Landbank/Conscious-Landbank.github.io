// Check which step to show based on URL params
        const urlParams = new URLSearchParams(window.location.search);
        const step = urlParams.get('step');
        const verified = urlParams.get('verified');

        if (step === 'details' && verified === 'true') {
            // Show step 3 (name & password)
            document.getElementById('stepEmail').style.display = 'none';
            document.getElementById('stepDetails').style.display = 'block';
        } else {
            // Show step 1 (email entry)
            document.getElementById('stepEmail').style.display = 'block';
            document.getElementById('stepDetails').style.display = 'none';
        }

        // ========================================
        // STEP 1: EMAIL & PASSWORD SUBMISSION
        // ========================================

        const emailForm = document.getElementById('emailForm');
        const emailInput = document.getElementById('emailInput');
        const passwordStep1Input = document.getElementById('signupPasswordStep1');
        const continueEmailBtn = document.getElementById('continueEmailBtn');

        // Real-time email validation
        if (emailInput) {
            // Track if user clicked on alternative signup options
            let clickedAlternative = false;
            
            // Listen for clicks on wallet/social buttons
            document.addEventListener('mousedown', function(e) {
                // Check if click is on a wallet or social button
                const target = e.target.closest('a.btn-secondary, button.btn-secondary');
                if (target && (target.href || target.onclick)) {
                    clickedAlternative = true;
                    // Reset after a short delay
                    setTimeout(() => { clickedAlternative = false; }, 100);
                }
            });
            
            emailInput.addEventListener('blur', function() {
                // Only validate if user didn't click on al