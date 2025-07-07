// Sign Up Form Validation JavaScript

document.addEventListener('DOMContentLoaded', function () {
    // Get form elements
    const form = document.querySelector('.needs-validation');
    const fullName = document.getElementById('fullName');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirmPassword');
    const terms = document.getElementById('terms');
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = document.getElementById('successMessage');

    // Password toggle functionality
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');

    // Password strength indicator
    const passwordStrength = document.getElementById('passwordStrength');

    // Initialize validation
    initializeValidation();

    function initializeValidation() {
        // Real-time validation for each field
        fullName.addEventListener('input', validateFullName);
        email.addEventListener('input', validateEmail);
        password.addEventListener('input', function() {
            validatePassword();
            checkPasswordStrength();
            if (confirmPassword.value) {
                validateConfirmPassword();
            }
        });
        confirmPassword.addEventListener('input', validateConfirmPassword);
        terms.addEventListener('change', validateTerms);

        // Password toggle functionality
        togglePassword.addEventListener('click', function() {
            togglePasswordVisibility(password, togglePassword);
        });

        toggleConfirmPassword.addEventListener('click', function() {
            togglePasswordVisibility(confirmPassword, toggleConfirmPassword);
        });

        // Terms modal accept button
        document.getElementById('acceptTerms').addEventListener('click', function() {
            terms.checked = true;
            validateTerms();
        });

        // Form submission
        form.addEventListener('submit', handleFormSubmit);
    }

    // Individual field validation functions
    function validateFullName() {
        const value = fullName.value.trim();
        const isValid = value.length >= 2 && /^[a-zA-Z\s]+$/.test(value);
        
        setFieldValidation(fullName, isValid);
        return isValid;
    }

    function validateEmail() {
        const value = email.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isValid = emailRegex.test(value);
        
        setFieldValidation(email, isValid);
        return isValid;
    }

    function validatePassword() {
        const value = password.value;
        const isValid = value.length >= 8;
        
        setFieldValidation(password, isValid);
        return isValid;
    }

    function validateConfirmPassword() {
        const isValid = confirmPassword.value === password.value && confirmPassword.value !== '';
        
        if (confirmPassword.value !== password.value && confirmPassword.value !== '') {
            confirmPassword.setCustomValidity('Hmm, the passwords don\'t match. Give it another try!');
        } else {
            confirmPassword.setCustomValidity('');
        }
        
        setFieldValidation(confirmPassword, isValid);
        return isValid;
    }

    function validateTerms() {
        const isValid = terms.checked;
        setFieldValidation(terms, isValid);
        return isValid;
    }

    // Set field validation state
    function setFieldValidation(field, isValid) {
        if (isValid) {
            field.classList.remove('is-invalid');
            field.classList.add('is-valid');
        } else {
            field.classList.remove('is-valid');
            field.classList.add('is-invalid');
        }
    }

    // Password strength checker
    function checkPasswordStrength() {
        const value = password.value;
        let strength = 0;
        
        // Check various criteria
        if (value.length >= 8) strength++;
        if (/[a-z]/.test(value)) strength++;
        if (/[A-Z]/.test(value)) strength++;
        if (/\d/.test(value)) strength++;
        if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(value)) strength++;

        // Update strength indicator
        passwordStrength.className = 'password-strength mt-2';
        
        if (value.length === 0) {
            passwordStrength.style.width = '0%';
            passwordStrength.className += '';
        } else if (strength <= 2) {
            passwordStrength.className += ' strength-weak';
        } else if (strength <= 4) {
            passwordStrength.className += ' strength-medium';
        } else {
            passwordStrength.className += ' strength-strong';
        }
    }

    // Toggle password visibility
    function togglePasswordVisibility(passwordField, toggleButton) {
        const icon = toggleButton.querySelector('i');
        
        if (passwordField.type === 'password') {
            passwordField.type = 'text';
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            passwordField.type = 'password';
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    }

    // Form submission handler
    function handleFormSubmit(event) {
        event.preventDefault();
        event.stopPropagation();

        // Validate all fields
        const isFullNameValid = validateFullName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isTermsValid = validateTerms();

        const isFormValid = isFullNameValid && isEmailValid && isPasswordValid && 
                           isConfirmPasswordValid && isTermsValid;

        if (isFormValid) {
            // Show loading state
            showLoadingState();
            
            // Simulate form submission
            setTimeout(() => {
                hideLoadingState();
                showSuccessMessage();
                resetForm();
            }, 2000);
        } else {
            // Show validation errors
            form.classList.add('was-validated');
            
            // Focus on first invalid field
            const firstInvalidField = form.querySelector('.is-invalid');
            if (firstInvalidField) {
                firstInvalidField.focus();
            }
        }
    }

    // Show loading state
    function showLoadingState() {
        submitButton.disabled = true;
        submitButton.classList.add('btn-loading');
        submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating your awesome account...';
    }

    // Hide loading state
    function hideLoadingState() {
        submitButton.disabled = false;
        submitButton.classList.remove('btn-loading');
        submitButton.innerHTML = '<i class="fas fa-rocket"></i> Let\'s Get Started! 🚀';
    }

    // Show success message
    function showSuccessMessage() {
        successMessage.classList.remove('d-none');
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('d-none');
        }, 5000);
    }

    // Reset form
    function resetForm() {
        form.reset();
        form.classList.remove('was-validated');
        
        // Remove validation classes
        const fields = [fullName, email, password, confirmPassword, terms];
        fields.forEach(field => {
            field.classList.remove('is-valid', 'is-invalid');
        });
        
        // Reset password strength indicator
        passwordStrength.className = 'password-strength mt-2';
        passwordStrength.style.width = '0%';
    }

    // Email availability checker (simulated)
    function checkEmailAvailability() {
        const emailValue = email.value.trim();
        
        if (emailValue && validateEmail()) {
            // Simulate API call to check email availability
            setTimeout(() => {
                // For demo purposes, consider some emails as taken
                const takenEmails = ['test@example.com', 'admin@test.com', 'user@demo.com'];
                
                if (takenEmails.includes(emailValue.toLowerCase())) {
                    email.setCustomValidity('Oops! Someone already snagged that email. Got another one?');
                    setFieldValidation(email, false);
                } else {
                    email.setCustomValidity('');
                    setFieldValidation(email, true);
                }
            }, 500);
        }
    }

    // Debounced email availability check
    let emailCheckTimeout;
    email.addEventListener('input', function() {
        clearTimeout(emailCheckTimeout);
        emailCheckTimeout = setTimeout(checkEmailAvailability, 1000);
    });

    // Form data collection for submission
    function getFormData() {
        return {
            fullName: fullName.value.trim(),
            email: email.value.trim(),
            password: password.value,
            termsAccepted: terms.checked,
            timestamp: new Date().toISOString()
        };
    }

    // Additional utility functions
    
    // Escape HTML to prevent XSS
    function escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    // Validate form on page load if fields have values
    function validateExistingValues() {
        if (fullName.value) validateFullName();
        if (email.value) validateEmail();
        if (password.value) {
            validatePassword();
            checkPasswordStrength();
        }
        if (confirmPassword.value) validateConfirmPassword();
        if (terms.checked) validateTerms();
    }

    // Call validation for existing values
    validateExistingValues();

    // Add keyboard navigation support
    form.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && event.target.type !== 'submit') {
            event.preventDefault();
            const formElements = Array.from(form.elements);
            const currentIndex = formElements.indexOf(event.target);
            const nextElement = formElements[currentIndex + 1];
            
            if (nextElement && nextElement.type !== 'submit') {
                nextElement.focus();
            }
        }
    });

    // Console log for debugging (remove in production)
    console.log('🎉 Sign Up Form is ready to welcome new friends! Let\'s create some awesome accounts!');
});
