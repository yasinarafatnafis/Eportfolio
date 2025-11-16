// Main JavaScript file for Yasin Arafat Nafis Portfolio
// Handles all interactive functionality and animations

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu();
    initTypedText();
    initSkillBars();
    initSkillFilter();
    initScrollAnimations();
    initFormValidation();
    
    console.log('Portfolio initialized successfully');
});

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');
            }
        });
    }
}

// Typed Text Animation for Hero Section
function initTypedText() {
    // Initialize name typing
    if (document.getElementById('typed-name')) {
        new Typed('#typed-name', {
            strings: ['Yasin Arafat Nafis'],
            typeSpeed: 80,
            backSpeed: 50,
            startDelay: 500,
            showCursor: true,
            cursorChar: '|',
            onComplete: function() {
                // Start role typing after name is complete
                if (document.getElementById('typed-role')) {
                    setTimeout(() => {
                        new Typed('#typed-role', {
                            strings: [
                                'Software Developer',
                                'Computer Science Graduate',
                                'Problem Solver',
                                'Team Player'
                            ],
                            typeSpeed: 60,
                            backSpeed: 40,
                            backDelay: 2000,
                            startDelay: 300,
                            loop: true,
                            showCursor: true,
                            cursorChar: '|'
                        });
                    }, 1000);
                }
            }
        });
    }
}

// Skill Progress Bars Animation
function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                
                setTimeout(() => {
                    bar.style.width = width;
                }, 200);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });
}

// Skills Filter Functionality
function initSkillFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const skillItems = document.querySelectorAll('.skill-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter skills
            skillItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });
}

// Scroll Animations
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.card-hover, .section-card, .project-card, .certificate-card');
    
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
    
    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Form Validation and Submission
function initFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        // Real-time validation
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                clearFieldError(this);
            });
        });
        
        // Form submission
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField(input)) {
                    isValid = false;
                }
            });
            
            if (isValid) {
                handleFormSubmission(this);
            }
        });
    });
}

// Field Validation
function validateField(field) {
    const value = field.value.trim();
    const type = field.type;
    const required = field.hasAttribute('required');
    
    clearFieldError(field);
    
    // Required field validation
    if (required && !value) {
        showFieldError(field, 'This field is required');
        return false;
    }
    
    // Email validation
    if (type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            showFieldError(field, 'Please enter a valid email address');
            return false;
        }
    }
    
    // Phone validation
    if (type === 'tel' && value) {
        const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
        if (!phoneRegex.test(value.replace(/[\s\-\(\)]/g, ''))) {
            showFieldError(field, 'Please enter a valid phone number');
            return false;
        }
    }
    
    // Minimum length validation
    const minLength = field.getAttribute('minlength');
    if (minLength && value.length < parseInt(minLength)) {
        showFieldError(field, `Minimum ${minLength} characters required`);
        return false;
    }
    
    return true;
}

// Show field error
function showFieldError(field, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-red-600 text-sm mt-1';
    errorDiv.textContent = message;
    
    field.classList.add('border-red-500');
    field.parentNode.appendChild(errorDiv);
}

// Clear field error
function clearFieldError(field) {
    field.classList.remove('border-red-500');
    const errorDiv = field.parentNode.querySelector('.field-error');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Handle form submission
function handleFormSubmission(form) {
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    // Show loading state
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        // Show success message
        showSuccessMessage(form);
        
        // Reset form after delay
        setTimeout(() => {
            form.reset();
            hideSuccessMessage(form);
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 3000);
    }, 2000);
}

// Show success message
function showSuccessMessage(form) {
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message bg-green-50 border-l-4 border-green-400 p-4 rounded-lg mt-4';
    successDiv.innerHTML = `
        <div class="flex items-center">
            <i class="fas fa-check-circle text-green-500 text-xl mr-3"></i>
            <div>
                <h4 class="text-green-800 font-semibold">Message Sent Successfully!</h4>
                <p class="text-green-700 text-sm">Thank you for reaching out. I'll get back to you within 24 hours.</p>
            </div>
        </div>
    `;
    
    form.appendChild(successDiv);
    
    // Animate in
    setTimeout(() => {
        successDiv.style.opacity = '1';
        successDiv.style.transform = 'translateY(0)';
    }, 100);
}

// Hide success message
function hideSuccessMessage(form) {
    const successDiv = form.querySelector('.success-message');
    if (successDiv) {
        successDiv.remove();
    }
}

// Smooth scrolling for anchor links
document.addEventListener('click', function(e) {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('nav');
    if (window.scrollY > 50) {
        navbar.classList.add('bg-white/95');
        navbar.classList.remove('bg-white/90');
    } else {
        navbar.classList.add('bg-white/90');
        navbar.classList.remove('bg-white/95');
    }
});

// Utility function for coming soon features
function showComingSoon() {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-md mx-4 text-center">
            <i class="fas fa-clock text-4xl text-blue-600 mb-4"></i>
            <h3 class="text-xl font-semibold text-gray-900 mb-2">Coming Soon!</h3>
            <p class="text-gray-600 mb-6">This feature will be available shortly. Thank you for your patience.</p>
            <button onclick="this.parentElement.parentElement.remove()" 
                    class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                OK
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Remove modal when clicking outside
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Add loading states for buttons
document.addEventListener('click', function(e) {
    if (e.target.matches('button') && !e.target.type === 'submit') {
        const button = e.target;
        const originalText = button.innerHTML;
        
        // Don't add loading state to certain buttons
        if (button.onclick || button.getAttribute('onclick')) {
            return;
        }
        
        // Add loading state
        button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
        button.disabled = true;
        
        // Reset after 2 seconds
        setTimeout(() => {
            button.innerHTML = originalText;
            button.disabled = false;
            showComingSoon();
        }, 1000);
    }
});

// Print functionality for CV page
function printCV() {
    window.print();
}

// Add print styles dynamically
const printStyles = `
    @media print {
        nav, footer, .no-print {
            display: none !important;
        }
        body {
            font-size: 12pt;
            line-height: 1.4;
        }
        .section-card {
            break-inside: avoid;
            margin-bottom: 20px;
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = printStyles;
document.head.appendChild(styleSheet);

// Performance optimization: Lazy load images
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if images with data-src exist
if (document.querySelectorAll('img[data-src]').length > 0) {
    initLazyLoading();
}

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key to close modals
    if (e.key === 'Escape') {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            if (modal.style.display === 'block') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Tab navigation enhancement
    if (e.key === 'Tab') {
        const focusableElements = document.querySelectorAll(
            'a[href], button, textarea, input[type="text"], input[type="email"], input[type="tel"], select'
        );
        
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
        }
    }
});

// Add CSS custom properties for dynamic theming
const root = document.documentElement;
root.style.setProperty('--primary-color', '#3b82f6');
root.style.setProperty('--secondary-color', '#8b5cf6');
root.style.setProperty('--success-color', '#10b981');
root.style.setProperty('--warning-color', '#f59e0b');
root.style.setProperty('--error-color', '#ef4444');

// Console welcome message
console.log('%c👋 Welcome to Yasin Arafat Nafis Portfolio!', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
console.log('%cBuilt with modern web technologies and love for clean code.', 'color: #6b7280; font-size: 14px;');
console.log('%cFeel free to explore the source code and reach out for collaboration!', 'color: #6b7280; font-size: 14px;');

// Export functions for global access
window.showComingSoon = showComingSoon;
window.printCV = printCV;