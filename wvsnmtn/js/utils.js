// ===========================
// WVS & MTN — Global Utilities
// Common functions for all pages
// ===========================

/**
 * Toggle mobile menu visibility
 */
function toggleMenu() {
  const menu = document.getElementById('mobileMenu');
  if (menu) {
    menu.classList.toggle('open');
  }
}

/**
 * Initialize navbar scroll effect on all pages
 */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/**
 * Close mobile menu when clicking on a link
 */
function closeMenuOnLink() {
  const navLinks = document.querySelectorAll('.mobile-menu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const menu = document.getElementById('mobileMenu');
      if (menu) {
        menu.classList.remove('open');
      }
    });
  });
}

/**
 * Initialize all global utilities on page load
 */
document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  closeMenuOnLink();
});

/**
 * Handle keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
  // Close menu on Escape
  if (e.key === 'Escape') {
    const menu = document.getElementById('mobileMenu');
    if (menu) {
      menu.classList.remove('open');
    }
  }
});

/**
 * Smooth scroll to element by ID
 */
function smoothScrollTo(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

/**
 * Check if device is mobile
 */
function isMobile() {
  return window.innerWidth <= 768;
}

/**
 * Debounce function for performance
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Add loading state to button
 */
function setButtonLoading(button, isLoading = true) {
  if (!button) return;
  
  if (isLoading) {
    button.setAttribute('data-original-text', button.textContent);
    button.disabled = true;
    button.style.opacity = '0.7';
    button.textContent = 'Loading...';
  } else {
    button.textContent = button.getAttribute('data-original-text') || 'Submit';
    button.disabled = false;
    button.style.opacity = '1';
  }
}

/**
 * Show notification toast
 */
function showNotification(message, type = 'info', duration = 3000) {
  let toast = document.getElementById('notification-toast');
  
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'notification-toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  
  toast.textContent = message;
  toast.className = `toast ${type} show`;
  toast.style.display = 'block';
  
  setTimeout(() => {
    toast.classList.remove('show');
    toast.style.display = 'none';
  }, duration);
}

/**
 * Format currency to PHP
 */
function formatPHP(amount) {
  return '₱' + parseFloat(amount).toLocaleString('en-PH', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  });
}

/**
 * Validate email
 */
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

/**
 * Validate phone (Philippine format)
 */
function validatePhone(phone) {
  const re = /^(\+63|0)?9\d{9}$/;
  return re.test(phone.replace(/\s|-/g, ''));
}

// Log initialization
console.log('✓ Global utilities loaded');
