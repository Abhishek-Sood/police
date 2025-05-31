// Smooth scrolling for navigation
function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});


// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.feature-card, .about-text, .contact-item');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });
});

// Keyboard accessibility
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            closeModal(activeModal.id);
        }
    }
});

// Add some visual feedback for form interactions
document.addEventListener('DOMContentLoaded', () => {
    const inputs = document.querySelectorAll('input, textarea, select');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            input.parentElement.classList.remove('focused');
            if (input.value) {
                input.parentElement.classList.add('filled');
            } else {
                input.parentElement.classList.remove('filled');
            }
        });
    });
});


// Add loading states for buttons
function addLoadingState(button, loadingText) {
    const originalText = button.innerHTML;
    button.innerHTML = `<i class="fas fa-spinner fa-spin"></i> ${loadingText}`;
    button.disabled = true;
    
    return () => {
        button.innerHTML = originalText;
        button.disabled = false;
    };
}

// Enhanced form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Add real-time form validation
document.addEventListener('DOMContentLoaded', () => {
    const emailInputs = document.querySelectorAll('input[type="email"]');
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    emailInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validateEmail(input.value)) {
                input.style.borderColor = '#ff4757';
                showFieldError(input, 'Please enter a valid email address');
            } else {
                input.style.borderColor = '#e0e0e0';
                hideFieldError(input);
            }
        });
    });
    
    passwordInputs.forEach(input => {
        input.addEventListener('blur', () => {
            if (input.value && !validatePassword(input.value)) {
                input.style.borderColor = '#ff4757';
                showFieldError(input, 'Password must be at least 6 characters long');
            } else {
                input.style.borderColor = '#e0e0e0';
                hideFieldError(input);
            }
        });
    });
});

function showFieldError(input, message) {
    hideFieldError(input); // Remove existing error
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.style.color = '#ff4757';
    errorDiv.style.fontSize = '14px';
    errorDiv.style.marginTop = '5px';
    errorDiv.textContent = message;
    
    input.parentElement.appendChild(errorDiv);
}

function hideFieldError(input) {
    const existingError = input.parentElement.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
}
